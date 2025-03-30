from urllib.parse import unquote
from django.contrib.auth.models import User
from django.db import models
from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import (
    AssessmentSerializer,
    AssessmentTypeSerializer,
    CourseTypeSerializer,
    ClassSerializer,
    MatrixSerializer,
    SpecialValueSerializer,
    StudentSerializer,
    UserSerializer,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Assessment, AssessmentType, Class, CourseType, SpecialValue, Student
from .document_service import service
from django.http import FileResponse, HttpResponse

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CourseTypeViewSet(viewsets.ModelViewSet):
    queryset = CourseType.objects.all()
    serializer_class = CourseTypeSerializer
    permission_classes = [IsAuthenticated]

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'
    
    def get_queryset(self):
        if "class_name" in self.kwargs:
            class_name = unquote(self.kwargs["class_name"])
            return Class.objects.filter(class_name=class_name)
        return Class.objects.all()
    
    def get_object(self):
        lookup_value = self.kwargs[self.lookup_field]
        
        # Try to interpret as an ID first
        if lookup_value.isdigit():
            return get_object_or_404(Class, id=lookup_value)
            
        # Otherwise use as a slug
        return get_object_or_404(Class, slug=lookup_value)
    
    @action(detail=True, methods=['get'])
    def matrix(self, request, slug=None):
        """Return class average matrix"""
        class_obj = self.get_object()
        
        # Get all assessments for this class with numeric values
        assessments = Assessment.objects.filter(
            student__current_class=class_obj,
            normalized_value__isnull=False
        )
        
        # Get max week for this class
        max_week = assessments.aggregate(models.Max('week'))['week__max'] or 10
        
        # Group by skill and week, then average
        averages = {}
        for assessment in assessments:
            key = (assessment.assessment_type.name, assessment.week)
            if key not in averages:
                averages[key] = {'sum': 0, 'count': 0}
            
            averages[key]['sum'] += assessment.normalized_value
            averages[key]['count'] += 1
        
        # Create pseudo-assessments for the matrix serializer
        class PseudoAssessment:
            def __init__(self, assessment_type_name, week, value):
                self.assessment_type = type('obj', (object,), {'name': assessment_type_name})
                self.week = week
                self.value = value
                
        pseudo_assessments = []
        for (skill, week), data in averages.items():
            if data['count'] > 0:
                avg = round(data['sum'] / data['count'], 1)
                pseudo_assessments.append(
                    PseudoAssessment(skill, week, str(avg))
                )
        
        # Transform to matrix format
        matrix_data = MatrixSerializer.create_from_assessments(pseudo_assessments, max_week)
        return Response(matrix_data)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if "student_id" in self.kwargs:
            return Student.objects.filter(student_id=self.kwargs["student_id"])
        return Student.objects.all()
    
    @action(detail=True, methods=['get'])
    def matrix(self, request, pk=None):
        """Return assessment data in matrix format for a specific student"""
        student = self.get_object()
        assessments = Assessment.objects.filter(student=student)
        
        # Get max week number for this student
        max_week = assessments.aggregate(models.Max('week'))['week__max'] or 10
        
        # Transform to matrix format
        matrix_data = MatrixSerializer.create_from_assessments(assessments, max_week)
        return Response(matrix_data)

class AssessmentTypeViewSet(viewsets.ModelViewSet):
    queryset = AssessmentType.objects.all()
    serializer_class = AssessmentTypeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        course_type_id = self.request.query_params.get('course_type')
        if course_type_id:
            return AssessmentType.objects.filter(course_type_id=course_type_id)
        return AssessmentType.objects.all()

class SpecialValueViewSet(viewsets.ModelViewSet):
    queryset = SpecialValue.objects.all()
    serializer_class = SpecialValueSerializer
    permission_classes = [IsAuthenticated]

class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Assessment.objects.all()
        
        student_id = self.request.query_params.get('student_id')
        class_id = self.request.query_params.get('class_id')
        skill = self.request.query_params.get('skill')
        week = self.request.query_params.get('week')
        
        if student_id:
            queryset = queryset.filter(student__student_id=student_id)
            
        if class_id:
            queryset = queryset.filter(student__current_class_id=class_id)
            
        if skill:
            queryset = queryset.filter(assessment_type__name=skill)
            
        if week:
            queryset = queryset.filter(week=week)
            
        return queryset
    
    def create(self, request, *args, **kwargs):
        # Handle value normalization before creating
        data = request.data.copy()
        
        # Try to normalize the value if it's a percentage
        value = data.get('value')
        if value and 'normalized_value' not in data:
            try:
                data['normalized_value'] = float(value)
            except (ValueError, TypeError):
                # For letter grades or special values, we'll leave normalized_value empty
                pass
                
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['get'])
    def skill_details(self, request):
        """Return all student results for a particular skill and week"""
        class_id = request.query_params.get('class_id')
        skill = request.query_params.get('skill')
        week = request.query_params.get('week')
        
        if not all([class_id, skill, week]):
            return Response({"error": "class_id, skill, and week are required"}, status=400)
            
        try:
            assessment_type = AssessmentType.objects.get(name=skill)
        except AssessmentType.DoesNotExist:
            return Response({"error": f"Assessment type '{skill}' not found"}, status=404)
            
        assessments = Assessment.objects.filter(
            student__current_class_id=class_id,
            assessment_type=assessment_type,
            week=week
        ).select_related('student')
        
        serializer = self.get_serializer(assessments, many=True)
        return Response(serializer.data)
    
class exportStudentRecord(APIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk): 
        student = get_object_or_404(Student, pk=pk)
        class_data = Class.objects.get(class_name=student.current_class)
        assessments = Assessment.objects.filter(student=student)
        

        context = {
            "course": class_data.course,
            "class_name": class_data.class_name,
            "course_type_name": class_data.course_type.name,
            "teacher_one": class_data.teacher_one,
            "teacher_two": class_data.teacher_two,

            "student_id": student.student_id,
            "student_name": student.first_name + ' ' + student.last_name,
            "nickname": '(' + student.nickname + ')' if student.nickname != '' else '',
            "start_date": student.start_date,
            "participation": student.participation,
            "teacher_comments": student.teacher_comments,
            "level_up": student.level_up,
            "ROA": student.overall_reading,
            "WOA": student.overall_writing,
            "SOA": student.overall_speaking,
            "LOA": student.overall_listening,
        }

        for item in assessments:
            skill_id = item.assessment_type.name[0]
            week = str(item.week)
            context[skill_id + week] = item.value

        file_path = service.export_docx(context)
        return FileResponse(
            open(file_path, 'rb'),
            as_attachment=True,
            filename="generated_doc.docx"
        )