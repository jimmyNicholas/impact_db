from django.db import models
from django.utils.text import slugify
from django.core.validators import RegexValidator

class CourseType(models.Model):
    """Defines a type of course (e.g., Cambridge, IELTS, Business English)"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Class(models.Model):
    course = models.CharField(max_length=50)
    class_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=60, unique=True, blank=True)
    course_type = models.ForeignKey(
        CourseType, 
        on_delete=models.CASCADE, 
        related_name='classes',
    )
    teacher_one = models.CharField(max_length=50, blank=True)
    teacher_two = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.class_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.class_name
    
    @property
    def assessment_types(self):
        return AssessmentType.objects.filter(course_type=self.course_type)

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
    end_date = models.DateField(null=True)
    overall_reading = models.CharField(max_length=1, blank=True)
    overall_writing = models.CharField(max_length=1, blank=True)
    overall_speaking = models.CharField(max_length=1, blank=True)
    overall_listening = models.CharField(max_length=1, blank=True)
    participation = models.TextField(blank=True)
    teacher_comments = models.TextField(blank=True)
    level_up = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.student_id} {self.first_name} {self.last_name}"

class AssessmentType(models.Model):
    """Defines types of assessments available for different courses"""
    DATA_TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('letter', 'Letter Grade'),
        ('task', 'Task Completion'),
    ]
    
    name = models.CharField(max_length=50)  # e.g., "Grammar", "Writing Task 1"
    course_type = models.ForeignKey(CourseType, on_delete=models.CASCADE, related_name='assessment_types')
    data_type = models.CharField(max_length=20, choices=DATA_TYPE_CHOICES)
    display_order = models.PositiveSmallIntegerField(default=0)
    
    def __str__(self):
        return f"{self.course_type.name} - {self.name}"

class Assessment(models.Model):
    """Individual assessment result for a student"""
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='assessments')
    assessment_type = models.ForeignKey(AssessmentType, on_delete=models.CASCADE)
    week = models.PositiveSmallIntegerField()
    value = models.CharField(max_length=10)  # Stores raw value (could be "87", "B+", "Abs")
    normalized_value = models.FloatField(null=True, blank=True)  # For calculations
    date_assessed = models.DateField(auto_now_add=True)
    
    class Meta:
        unique_together = ['student', 'assessment_type', 'week']
        
    def __str__(self):
        return f"{self.student.first_name} - {self.assessment_type.name} Week {self.week}: {self.value}"

class SpecialValue(models.Model):
    """Defines special assessment values like "NA", "Abs", etc."""
    code = models.CharField(max_length=10)  # "NA", "Abs", etc.
    description = models.CharField(max_length=100)  # "Not assessed", "Absent", etc.
    include_in_average = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.code} - {self.description}"