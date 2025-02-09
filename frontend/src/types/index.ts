export interface ClassType {
    id: number
    course: string
    class_name: string
    teacher_one: string
    teacher_two: string
    is_active: boolean
    students: StudentType[]
  }
  
  export interface StudentType {
    id: number
    student_id: string
    first_name: string
    last_name: string
    nickname: string
    current_class: number
    start_date: string
    participation: string
    teacher_comments: string
    level_up: string
    is_active: boolean
    results: ResultType[]
  }
  
  export interface ResultType {
    id: number
    student_id: string
    first_name: string
    last_name: string
    nickname: string
    week: string
    grammar: string | null
    vocabulary: string | null
    reading: string | null
    writing: string | null
    speaking: string | null
    listening: string | null
    pronunciation: string | null
  }
  
  export interface StudentRowType {
    id: number
    student_id: string
    first_name: string
    last_name: string
    nickname: string
    results: Record<string, ResultType>
  }
  
  export interface StudentBase {
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
    is_active: boolean;
  }
  
  export interface WeeklyResult {
    id: number;
    student_id: string;
    week: string;
    grammar: string | null;
    vocabulary: string | null;
    reading: string | null;
    writing: string | null;
    speaking: string | null;
    listening: string | null;
    pronunciation: string | null;
  }
  
  export interface StudentResultRow extends StudentBase {
    weeklyResult: WeeklyResult | null;
  }