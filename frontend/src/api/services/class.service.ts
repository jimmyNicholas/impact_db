import { api } from "@/api/config";
import { ClassType } from "@/types/class";

const BASE_ENDPOINT = "api/class";

export const getClasses = () => 
    api.get<ClassType[]>(BASE_ENDPOINT);

export const getClass = (className: string) =>
    api.get<ClassType[]>(`${BASE_ENDPOINT}/${className}`).then(classes => classes[0]);

export const createClass = (classData: Partial<ClassType>) =>
  api.post<ClassType>(BASE_ENDPOINT, classData);

export const updateClass = (id: number, classData: Partial<ClassType>) => 
  api.put<{ success: boolean }>(`${BASE_ENDPOINT}/${id}`, classData);

export const deleteClass = (id: number) =>
  api.delete<{ success: boolean }>(`${BASE_ENDPOINT}/${id}`);
