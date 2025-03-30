from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Assessment, AssessmentType, Class, CourseType, Student, SpecialValue

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CourseTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseType
        fields = ['id', 'name', 'description']

class AssessmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentType
        fields = ['id', 'name', 'course_type', 'data_type', 'display_order']

class SpecialValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialValue
        fields = ['id', 'code', 'description', 'include_in_average']

class AssessmentSerializer(serializers.ModelSerializer):
    assessment_type_name = serializers.CharField(source='assessment_type.name', read_only=True)
    student_id = serializers.CharField(source='student.student_id', read_only=True)
    first_name = serializers.CharField(source='student.first_name', read_only=True)
    last_name = serializers.CharField(source='student.last_name', read_only=True)
    nickname = serializers.CharField(source='student.nickname', required=False, allow_blank=True, read_only=True)
    
    class Meta:
        model = Assessment
        fields = [
            'id', 'student', 'student_id', 'first_name', 'last_name', 'nickname',
            'assessment_type', 'assessment_type_name', 'week', 'value', 
            'normalized_value', 'date_assessed'
        ]
        
    def create(self, validated_data):
        # Before creating, check if value needs normalization
        value = validated_data.get('value')
        if value and validated_data.get('normalized_value') is None:
            try:
                validated_data['normalized_value'] = float(value)
            except (ValueError, TypeError):
                # Handle letter grades or special codes
                pass
                
        return Assessment.objects.create(**validated_data)

class StudentSerializer(serializers.ModelSerializer):
    assessments = AssessmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Student
        fields = [
            "id", "student_id", "first_name", "last_name", "nickname",
            "current_class", "start_date", "participation",
            "teacher_comments", "level_up", "is_active", "assessments",
            "overall_reading", "overall_writing", "overall_speaking", "overall_listening"
        ]

class ClassSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)
    course_type_name = serializers.CharField(source='course_type.name', read_only=True)
    assessment_types = AssessmentTypeSerializer(many=True, read_only=True)

    class Meta:
        model = Class
        fields = [
            "id", "course", "class_name", "course_type", "course_type_name",
            "teacher_one", "teacher_two", "is_active", "students", "assessment_types",
        ]

class MatrixSerializer(serializers.Serializer):
    """Serializes assessment data into a matrix format for UI display"""
    skill = serializers.CharField()
    week_1 = serializers.CharField(required=False, allow_null=True)
    week_2 = serializers.CharField(required=False, allow_null=True)
    week_3 = serializers.CharField(required=False, allow_null=True)
    week_4 = serializers.CharField(required=False, allow_null=True)
    week_5 = serializers.CharField(required=False, allow_null=True)
    week_6 = serializers.CharField(required=False, allow_null=True)
    week_7 = serializers.CharField(required=False, allow_null=True)
    week_8 = serializers.CharField(required=False, allow_null=True)
    week_9 = serializers.CharField(required=False, allow_null=True)
    week_10 = serializers.CharField(required=False, allow_null=True)
    
    @classmethod
    def create_from_assessments(cls, assessments, max_weeks=10):
        """Transforms a queryset of assessments into matrix rows"""
        # Group assessments by skill
        skills = {}
        for assessment in assessments:
            skill = assessment.assessment_type.name
            if skill not in skills:
                skills[skill] = {f'week_{i}': None for i in range(1, max_weeks+1)}
            
            skills[skill][f'week_{assessment.week}'] = assessment.value
            
        # Convert to rows
        rows = []
        for skill, weeks in skills.items():
            rows.append({'skill': skill, **weeks})

        return rows