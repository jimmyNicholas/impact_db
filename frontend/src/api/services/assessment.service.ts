import { api } from "@/api/config";

const BASE_ENDPOINT = "api/assessment";

// Interface for creating a new assessment
export interface CreateAssessmentPayload {
  student: number;        
  assessment_type: number; 
  week: number;
  value: string;
}

export interface AssessmentType {
    id: number;
    name: string;
  }
  

export interface AssessmentFilters {
  student_id?: number;
  class_id?: number;
  skill?: string;
  week?: number;
}

// Create a new assessment
export const createAssessment = async (assessmentData: CreateAssessmentPayload) => {
  return api.post(BASE_ENDPOINT + '/', assessmentData);
};

// Update an existing assessment
export const updateAssessment = async (id: number, assessmentData: Partial<CreateAssessmentPayload>) => {
  return api.patch(`${BASE_ENDPOINT}/${id}/`, assessmentData);
};

// Get all assessment types
export const getAllAssessmentTypes = async (): Promise<AssessmentType[]> => {
    return api.get<AssessmentType[]>('api/assessment-type/');
  };

// Get assessments with filters
export const getAssessments = async (filters: AssessmentFilters) => {
  return api.get(BASE_ENDPOINT + '/', { params: filters });
};

// Get assessment by ID
export const getAssessmentById = async (id: number) => {
  return api.get(`${BASE_ENDPOINT}/${id}/`);
};

// Get assessments by assessment type (skill)
export const getAssessmentsByType = async (assessmentTypeId: number) => {
  return api.get(`${BASE_ENDPOINT}/?assessment_type=${assessmentTypeId}`);
};

// Special endpoint to get skill details
export const getSkillDetails = async (params: {
  class_id: number;
  skill: string;
  week: number;
}) => {
  return api.get(`${BASE_ENDPOINT}/skill_details/`, { params });
};