import { api } from "@/api/config";
import { AssessmentFilters, AssessmentType, CreateAssessmentType } from "@/types/assessment";

const BASE_ENDPOINT = "api/assessment";

// Create a new assessment
export const createAssessment = async (assessmentData: CreateAssessmentType): Promise<boolean> => {
  return api.post<boolean>(BASE_ENDPOINT + '/', assessmentData);
};

// Update an existing assessment
export const updateAssessment = async (id: number, assessmentData: Partial<CreateAssessmentType>): Promise<boolean> => {
  return api.patch<boolean>(`${BASE_ENDPOINT}/${id}/`, assessmentData);
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