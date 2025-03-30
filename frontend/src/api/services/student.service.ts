import { api } from "@/api/config";
import { StudentType } from "@/types/student";

const BASE_ENDPOINT = "api/student";

interface StudentDataProps {
  student_id: string;
  first_name: string;
  last_name: string;
  nickname?: string;
  start_date: string;
  current_class: number;
}
export const createStudent = (studentData: StudentDataProps) => {
  api.post<{ success: boolean }>(`${BASE_ENDPOINT}/`, studentData);
};

export const updateStudent = (id: number, studentData: Partial<StudentType>) =>
  api.put<{ success: boolean }>(`${BASE_ENDPOINT}/${id}`, studentData);

export const deleteStudent = (id: number) =>
  api.delete<{ success: boolean }>(`${BASE_ENDPOINT}/${id}/`);

// for testing purposes only
export const exportStudent = (id: number, fileName: string) => {
  api
    .get(`${'api/export/' + id + '/'}`, { responseType: "blob" })
    .then((response: any) => { 
      const url = window.URL.createObjectURL(response);
      const a = document.createElement("a");
      
      a.href = url;
      a.download = fileName;
      
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 500);
    })
    .catch((error: Error) => {
      console.error("Error downloading file:", error);
    });
};
