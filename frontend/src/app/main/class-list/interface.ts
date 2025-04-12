import { StudentType } from "@/types/student";

export interface ClassRowType {
    id: number;
    course: string;
    class_name: string;
    teacher_one: string;
    teacher_two: string;
    students: StudentType[];
  }