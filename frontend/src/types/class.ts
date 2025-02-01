import { StudentType } from "@/types/student";

export interface ClassType {
  id: number;
  course: string;
  class_name: string;
  teacher_one: string;
  teacher_two: string;
  students: StudentType[];
  is_active: Boolean;
}

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
  teacher_one: string;
  teacher_two: string;
}