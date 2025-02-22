from pyclbr import Class
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Class, Student, Result


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ResultSerializer(serializers.ModelSerializer):
    student_id = serializers.CharField(source="student.student_id")
    first_name = serializers.CharField(source="student.first_name")
    last_name = serializers.CharField(source="student.last_name")
    nickname = serializers.CharField(source="student.nickname")

    class Meta:
        model = Result
        fields = [
            "id",
            "student_id",
            "first_name",
            "last_name",
            "nickname",
            "week",
            "grammar",
            "vocabulary",
            "reading",
            "writing",
            "speaking",
            "listening",
            "pronunciation",
        ]

    # student_id = serializers.IntegerField(source='student.student_id')
    # first_name = serializers.CharField(source='student.first_name')
    # last_name = serializers.CharField(source='student.last_name')
    # nickname = serializers.CharField(source='student.nickname')
    # skill = serializers.CharField(source='assessment.skill')
    # week = serializers.CharField(source='assessment.week')

    # class Meta:
    #     model = Result
    #     fields = [
    #         'student_id',
    #         'first_name',
    #         'last_name',
    #         'nickname',
    #         'week',
    #         'skill',
    #         'grade'
    #     ]


class StudentSerializer(serializers.ModelSerializer):
    results = ResultSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = [
            "id",
            "student_id",
            "first_name",
            "last_name",
            "nickname",
            "current_class",
            "start_date",
            "participation",
            "teacher_comments",
            "level_up",
            "is_active",
            "results",
        ]

    def create(self, validated_data):
        return Student.objects.create(**validated_data)

    def get_class_name(self, obj):
        return obj.current_class.class_name if obj.current_class else None


class ClassSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)

    class Meta:
        model = Class
        fields = [
            "id",
            "course",
            "class_name",
            "teacher_one",
            "teacher_two",
            "is_active",
            "students",
        ]

    def create(self, validated_data):
        return Class.objects.create(**validated_data)
