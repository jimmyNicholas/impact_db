import api from "@/api/api";
import { updateStudentProps } from "@/types/student";

const useStudentApi = () => {
  const deleteStudent = (id: number) => {
    api
      .delete(`/api/student/${id}/`)
      .then((res) => {
        if (res.status === 204) console.log("student deleted");
        else console.log("Failed to delete student.");
        //getClassData(className);
      })
      .catch((error) => alert(error));
  };

  const updateStudent = async (id: number, data: updateStudentProps) => {
    try {
      const res = await api.put(`/api/class/${id}/`, data);

      if (!res) {
        throw new Error("Failed to update student");
      }

      //getClasses();
      return true;
    } catch (error) {
      console.error("Error updating student:", error);
      return false;
      //setRows(createRows(classes));
    }
  };

  return {
    deleteStudent,
    updateStudent,
  };
};

export default useStudentApi;
