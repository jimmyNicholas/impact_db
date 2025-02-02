from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import (
    ClassSerializer,
    UserSerializer,
    StudentSerializer,
    ResultSerializer,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Class, Student, Result


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if "class_name" in self.kwargs:
            return Class.objects.filter(class_name=self.kwargs["class_name"])
        return Class.objects.all()


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if "student_id" in self.kwargs:
            return Student.objects.filter(student_id=self.kwargs["student_id"])
        return Student.objects.all()


class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if "class_name" in self.kwargs:
            class_name = self.kwargs["class_name"]
            return Result.objects.filter(student__current_class__class_name=class_name)
        return Result.objects.all()

    def partial_update(self, request, *args, **kwargs):
        print("Received PATCH request with data:", request.data)
        return super().partial_update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
