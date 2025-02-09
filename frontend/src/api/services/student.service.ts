import { api } from "@/api/config";
import { StudentType } from "@/types/student";

const BASE_ENDPOINT = "api/student";

export const updateStudent = (id: number, studentData: Partial<StudentType>) => 
  api.put<{ success: boolean }>(`${BASE_ENDPOINT}/${id}`, studentData);

// export const deleteStudent = (id: number) =>
//   api.delete<{ success: boolean }>(`${BASE_ENDPOINT}/${id}`);
