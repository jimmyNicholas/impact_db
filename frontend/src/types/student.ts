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
}

export interface updateStudentProps {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
}