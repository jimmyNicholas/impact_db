import { ResultType } from "./result";

export interface AssessmentType {
  id: number;
  student: number;
  student_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  assessment_type: number;
  assessment_type_name: string;
  week: number;
  value: string;
  normalized_value: number;
  date_assessed: string;
}

export interface StudentType {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  current_class: string;
  start_date: Date;
  participation: string;
  teacher_comments: string;
  level_up: string;
  is_active: Boolean;
  assessments: AssessmentType[];
}

export interface updateStudentProps {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
}

export type StudentRowType = StudentType & ResultType;
