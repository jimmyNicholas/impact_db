import { api } from "@/api/config";
import { StudentDataProps, StudentType } from "@/types/student";

const BASE_ENDPOINT = "api/student";

export const createStudent = (
  studentData: StudentDataProps
): Promise<boolean> => {
  return api.post<boolean>(`${BASE_ENDPOINT}/`, studentData);
};

export const updateStudent = (
  id: number,
  studentData: Partial<StudentType>
): Promise<boolean> => {
  return api.put<boolean>(`${BASE_ENDPOINT}/${id}/`, studentData);
};

export const deleteStudent = (id: number): Promise<boolean> => {
  return api.delete<boolean>(`${BASE_ENDPOINT}/${id}/`);
};

// for testing purposes only
export const exportStudent = (id: number, fileName: string) => {
  api
    .get(`${"api/export/" + id + "/"}`, { responseType: "blob" })
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
