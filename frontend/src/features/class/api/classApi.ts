import { api } from "@/api/config";
import { ClassType } from "@/types/class";

const BASE_ENDPOINT = "api/class";

export const getClasses = () => 
    api.get<ClassType[]>(BASE_ENDPOINT);

export const getClass = async (className: string) => {
  const response = await api.get<ClassType>(`${BASE_ENDPOINT}/${className}/`);
  if (!response) {
    throw new Error(`Class '${className}' not found`);
  }  
  return response;
};

export const getClassResults = async (className: string) => {
  const response = await api.get<any>(`${BASE_ENDPOINT}/${className}/matrix/`);
  if (!response) {
    throw new Error(`Class '${className}' not found`);
  }  
  return response;
};


export const createClass = (classData: Partial<ClassType>) =>
  api.post<ClassType>(BASE_ENDPOINT, classData);

export const updateClass = (id: number, classData: Partial<ClassType>) => 
  api.put<{ success: boolean }>(`${BASE_ENDPOINT}/${id}`, classData);

export const deleteClass = (id: number) =>
  api.delete<{ success: boolean }>(`${BASE_ENDPOINT}/${id}/`);
