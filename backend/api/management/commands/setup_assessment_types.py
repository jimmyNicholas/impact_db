from django.core.management.base import BaseCommand
from api.models import CourseType, AssessmentType, SpecialValue

class Command(BaseCommand):
    help = 'Sets up initial assessment types and special values'

    def handle(self, *args, **options):
        self.stdout.write('Setting up special values...')
        
        # Create special values
        special_values = [
            {'code': 'NA', 'description': 'Not Assessed', 'include_in_average': False},
            {'code': 'Abs', 'description': 'Absent', 'include_in_average': False},
            {'code': 'DNS', 'description': 'Did Not Submit', 'include_in_average': False},
        ]
        
        for val in special_values:
            obj, created = SpecialValue.objects.get_or_create(code=val['code'], defaults=val)
            status = 'Created' if created else 'Already exists'
            self.stdout.write(f"  {status}: {obj.code}")
            
        self.stdout.write('Setting up course types and assessment types...')
        
        # Create course types and assessment types
        course_types = {
            'Cambridge': {
                'description': 'Cambridge English exams',
                'assessments': [
                    {'name': 'Reading', 'data_type': 'percentage', 'display_order': 1},
                    {'name': 'Writing', 'data_type': 'letter', 'display_order': 2},
                    {'name': 'Speaking', 'data_type': 'letter', 'display_order': 3},
                    {'name': 'Listening', 'data_type': 'percentage', 'display_order': 4},
                    {'name': 'Pronunciation', 'data_type': 'letter', 'display_order': 5},
                ]
            },
            'IELTS/EAP': {
                'description': 'IELTS preparation',
                'assessments': [
                    {'name': 'Listening', 'data_type': 'percentage', 'display_order': 1},
                    {'name': 'Reading', 'data_type': 'percentage', 'display_order': 2},
                    {'name': 'Writing Task 1', 'data_type': 'letter', 'display_order': 3},
                    {'name': 'Writing Task 2', 'data_type': 'letter', 'display_order': 4},
                    {'name': 'Speaking', 'data_type': 'letter', 'display_order': 5},
                    {'name': 'Pronunciation', 'data_type': 'letter', 'display_order': 6},
                ]
            },
            'Extreme English': {
                'description': 'General English program',
                'assessments': [
                    {'name': 'Grammar', 'data_type': 'percentage', 'display_order': 1},
                    {'name': 'Vocabulary', 'data_type': 'percentage', 'display_order': 2},
                    {'name': 'Reading', 'data_type': 'percentage', 'display_order': 3},
                    {'name': 'Writing', 'data_type': 'letter', 'display_order': 4},
                    {'name': 'Speaking', 'data_type': 'letter', 'display_order': 5},
                    {'name': 'Listening', 'data_type': 'percentage', 'display_order': 6},
                    {'name': 'Pronunciation', 'data_type': 'letter', 'display_order': 7},
                ]
            },
            'Business English': {
                'description': 'Business English program',
                'assessments': [
                    {'name': 'Use of English', 'data_type': 'percentage', 'display_order': 1},
                    {'name': 'Reading', 'data_type': 'percentage', 'display_order': 2},
                    {'name': 'Writing', 'data_type': 'letter', 'display_order': 3},
                    {'name': 'Speaking', 'data_type': 'letter', 'display_order': 4},
                    {'name': 'Listening', 'data_type': 'percentage', 'display_order': 5},
                    {'name': 'Pronunciation', 'data_type': 'letter', 'display_order': 6},
                ]
            }
        }
        
        for course_name, course_data in course_types.items():
            course_type, created = CourseType.objects.get_or_create(
                name=course_name,
                defaults={'description': course_data['description']}
            )
            
            status = 'Created' if created else 'Updated'
            self.stdout.write(f"  {status} course type: {course_type.name}")
            
            for assessment in course_data['assessments']:
                obj, created = AssessmentType.objects.get_or_create(
                    name=assessment['name'],
                    course_type=course_type,
                    defaults={
                        'data_type': assessment['data_type'],
                        'display_order': assessment['display_order']
                    }
                )
                
                status = 'Created' if created else 'Already exists'
                self.stdout.write(f"    {status}: {obj.name} ({obj.data_type})")
                
        self.stdout.write(self.style.SUCCESS('Setup complete!'))