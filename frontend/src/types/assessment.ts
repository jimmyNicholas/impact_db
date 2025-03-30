export interface CreateAssessmentType {
  student: number;
  assessment_type: number;
  week: number;
  value: string;
}

export interface AssessmentType {
  id: number;
  name: string;
  course_type: number;
  data_type: string;
  display_order: number;
}

export interface AssessmentFilters {
  student_id?: number;
  class_id?: number;
  skill?: string;
  week?: number;
}
