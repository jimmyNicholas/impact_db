import api from "@/api/api";
import { ClassType, updateClassProps } from "@/types/class";
import { useState } from "react";

export interface ClassApiHooksType {
  classes: ClassType[] | [];
  getClasses: () => void;
  deleteClass: (id: number) => boolean;
  updateClass: (id: number, data: any) => boolean;
}

const useClassApi = () => {
  const [classData, setClassData] = useState<ClassType | null>(null);
  const [classes, setClasses] = useState<ClassType[]>([]);

  const getClassData = (className: string | unknown) => {
    api
      .get(`/api/class/${className}`)
      .then((res) => res.data)
      .then((data) => {
        setClassData(data[0]);
        console.log(data);
      })
      .catch((err: Error) => alert(err))
      //.finally(() => setLoading(false));
  };

  const getClasses = () => {
    api
      .get("/api/class/")
      .then((res) => res.data)
      .then((data) => {
        setClasses(data);
      })
      .catch((err) => alert(err));
  };

  const deleteClass = (id: number) => {
    api
      .delete(`/api/class/${id}/`)
      .then((res) => {
        if (res.status === 204) console.log("class deleted");
        else console.log("Failed to delete class.");
        getClasses();
        return true;
      })
      .catch((error) => {
        alert(error);
        return false;
      });
  };

  const updateClass = async (id: number, data: updateClassProps) => {
    try {
      const res = await api.put(`/api/class/${id}/`, data);

      if (!res) {
        throw new Error("Failed to update class");
      }

      getClasses();
      return true;
    } catch (error) {
      console.error("Error updating class:", error);
      return false;
      //setRows(createRows(classes));
    }
  };

  return {
    classData,
    getClassData,
    classes,
    getClasses,
    deleteClass,
    updateClass,
  };
};

export default useClassApi;
