export interface StudentRowType {
    id: number;
    student_id: string;
    first_name: string;
    last_name: string;
    nickname: string;
    start_date: string | Date;
    participation: string;
    teacher_comments: string;
    level_up: string;
    is_active: Boolean;
    resultId: number | null;
    week: string;
    grammar: string | null;
    vocabulary: string | null;
    reading: string | null;
    writing: string | null;
    speaking: string | null;
    listening: string | null;
    pronunciation: string | null;
  }