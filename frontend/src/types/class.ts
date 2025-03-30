import { StudentType } from "@/types/student";
import { AssessmentType } from "./assessment";

export interface ClassType {
  id: number;
  course: string;
  class_name: string;
  course_type: number;
  course_type_name: string;
  teacher_one: string;
  teacher_two: string;
  students: StudentType[];
  is_active: Boolean;
  assessment_types: AssessmentType[];
}

/*
{
  "id": 1,
  "course": "Extreme English",
  "class_name": "Foundation 1",
  "course_type": 5,
  "course_type_name": "Foundation",
  "teacher_one": "Jimmy",
  "teacher_two": "Tristan",
  "is_active": true,
  "students": [
    {
      "id": 1,
      "student_id": "20202",
      "first_name": "Buck",
      "last_name": "Chase",
      "nickname": "",
      "current_class": 1,
      "start_date": "2025-03-14",
      "participation": "",
      "teacher_comments": "",
      "level_up": "",
      "is_active": true,
      "assessments": [
        {
          "id": 1,
          "student": 1,
          "student_id": "20202",
          "first_name": "Buck",
          "last_name": "Chase",
          "nickname": "",
          "assessment_type": 25,
          "assessment_type_name": "Grammar",
          "week": 1,
          "value": "80",
          "normalized_value": 80,
          "date_assessed": "2025-03-14"
        },
        {
          "id": 3,
          "student": 1,
          "student_id": "20202",
          "first_name": "Buck",
          "last_name": "Chase",
          "nickname": "",
          "assessment_type": 26,
          "assessment_type_name": "Vocabulary",
          "week": 1,
          "value": "68",
          "normalized_value": 68,
          "date_assessed": "2025-03-14"
        }
      ]
    },
    {
      "id": 2,
      "student_id": "21212",
      "first_name": "Joe",
      "last_name": "Doe",
      "nickname": "Joey",
      "current_class": 1,
      "start_date": "2025-03-14",
      "participation": "",
      "teacher_comments": "",
      "level_up": "",
      "is_active": true,
      "assessments": [
        {
          "id": 2,
          "student": 2,
          "student_id": "21212",
          "first_name": "Joe",
          "last_name": "Doe",
          "nickname": "Joey",
          "assessment_type": 25,
          "assessment_type_name": "Grammar",
          "week": 1,
          "value": "67",
          "normalized_value": 67,
          "date_assessed": "2025-03-14"
        },
        {
          "id": 4,
          "student": 2,
          "student_id": "21212",
          "first_name": "Joe",
          "last_name": "Doe",
          "nickname": "Joey",
          "assessment_type": 26,
          "assessment_type_name": "Vocabulary",
          "week": 1,
          "value": "89",
          "normalized_value": 89,
          "date_assessed": "2025-03-14"
        }
      ]
    },
    {
      "id": 8,
      "student_id": "23432",
      "first_name": "Mary",
      "last_name": "Congo",
      "nickname": "May",
      "current_class": 1,
      "start_date": "2025-03-15",
      "participation": "",
      "teacher_comments": "",
      "level_up": "",
      "is_active": true,
      "assessments": [
        {
          "id": 5,
          "student": 8,
          "student_id": "23432",
          "first_name": "Mary",
          "last_name": "Congo",
          "nickname": "May",
          "assessment_type": 25,
          "assessment_type_name": "Grammar",
          "week": 2,
          "value": "96",
          "normalized_value": 96,
          "date_assessed": "2025-03-15"
        },
        {
          "id": 6,
          "student": 8,
          "student_id": "23432",
          "first_name": "Mary",
          "last_name": "Congo",
          "nickname": "May",
          "assessment_type": 28,
          "assessment_type_name": "Reading",
          "week": 3,
          "value": "A",
          "normalized_value": 80,
          "date_assessed": "2025-03-15"
        }
      ]
    },
    {
      "id": 11,
      "student_id": "23456",
      "first_name": "Jay",
      "last_name": "Panko",
      "nickname": "",
      "current_class": 1,
      "start_date": "2025-03-15",
      "participation": "",
      "teacher_comments": "",
      "level_up": "",
      "is_active": true,
      "assessments": []
    },
    {
      "id": 12,
      "student_id": "27878",
      "first_name": "This",
      "last_name": "Guy",
      "nickname": "",
      "current_class": 1,
      "start_date": "2025-03-27",
      "participation": "",
      "teacher_comments": "",
      "level_up": "",
      "is_active": true,
      "assessments": []
    },
    {
      "id": 13,
      "student_id": "27979",
      "first_name": "Knew",
      "last_name": "Stu",
      "nickname": "",
      "current_class": 1,
      "start_date": "2025-03-16",
      "participation": "",
      "teacher_comments": "",
      "level_up": "",
      "is_active": true,
      "assessments": []
    }
  ]
}
*/

export interface ClassProps {
  classProp: ClassType;
  onDelete: (id: number) => void;
  handleNavigation: (
    className: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export interface updateClassProps {
  id: number;
  course: string;
  class_name: string;
  course_type: number;
  course_type_name: string;
  teacher_one: string;
  teacher_two: string;
}