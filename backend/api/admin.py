# admin.py
from django.contrib import admin
from .models import CourseType, AssessmentType, SpecialValue, Class, Student, Assessment

class AssessmentTypeInline(admin.TabularInline):
    model = AssessmentType
    extra = 1

@admin.register(CourseType)
class CourseTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    inlines = [AssessmentTypeInline]

@admin.register(AssessmentType)
class AssessmentTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'course_type', 'data_type', 'display_order')
    list_filter = ('course_type', 'data_type')

@admin.register(SpecialValue)
class SpecialValueAdmin(admin.ModelAdmin):
    list_display = ('code', 'description', 'include_in_average')

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('class_name', 'course', 'teacher_one', 'teacher_two', 'is_active')

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'first_name', 'last_name', 'current_class', 'is_active')
    search_fields = ('student_id', 'first_name', 'last_name')
    list_filter = ('current_class', 'is_active')

@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'assessment_type', 'week', 'value', 'normalized_value')
    list_filter = ('assessment_type', 'week', 'student__current_class')
    search_fields = ('student__first_name', 'student__last_name', 'student__student_id')