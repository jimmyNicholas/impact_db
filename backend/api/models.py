from django.db import models
from django.core.validators import RegexValidator


class Class(models.Model):
    course = models.CharField(max_length=50)
    class_name = models.CharField(max_length=50)
    teacher_one = models.CharField(max_length=50, blank=True)
    teacher_two = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.class_name


class Student(models.Model):
    student_id = models.CharField(
        max_length=5,
        validators=[
            RegexValidator(
                regex="^2[0-9]{4}$",
                message="Number must be between 20000 and 29999",
            ),
        ],
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    nickname = models.CharField(max_length=50, blank=True)
    current_class = models.ForeignKey(
        Class, on_delete=models.CASCADE, related_name="students"
    )
    start_date = models.DateField(null=True)
    participation = models.TextField(blank=True)
    teacher_comments = models.TextField(blank=True)
    level_up = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.student_id} {self.first_name} {self.last_name}"


class Result(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="results"
    )
    week = models.CharField(max_length=2)
    grammar = models.CharField(max_length=3, null=True, blank=True)
    vocabulary = models.CharField(max_length=3, null=True, blank=True)
    reading = models.CharField(max_length=3, null=True, blank=True)
    writing = models.CharField(max_length=3, null=True, blank=True)
    speaking = models.CharField(max_length=3, null=True, blank=True)
    listening = models.CharField(max_length=3, null=True, blank=True)
    pronunciation = models.CharField(max_length=3, null=True, blank=True)

    def __str__(self):
        return f"Week {self.week} - {self.student.student_id}"
