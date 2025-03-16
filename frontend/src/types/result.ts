export interface ResultType {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  week: string;
  grammar: string | null;
  vocabulary: string | null;
  reading: string | null;
  writing: string | null;
  speaking: string | null;
  listening: string | null;
  pronunciation: string | null;
}