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

export const exportStudent = () => {
  api
    .get("api/export/", { responseType: "blob" })
    .then((response: any) => {
      console.log("Response type:", typeof response.data);

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `student_file.docx`;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error: Error) => {
      console.error("Error downloading file:", error);
    });
};
