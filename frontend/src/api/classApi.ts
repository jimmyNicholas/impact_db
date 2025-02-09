import api from "@/api/config";

export const getClassData = async (className: string | unknown) => {
  return api
    .get(`/api/class/${className}`)
    .then((res) => res.data[0])
    .catch((err: Error) => {
      alert(err);
      throw err;
    });
};

export const getClasses = async () => {
  return api
    .get("/api/class/")
    .then((res) => res.data)
    .catch((err: Error) => {
      alert(err.message);
      throw err;
    });
};

export const deleteClass = async (id: number) => {
  return api
    .delete(`/api/class/${id}/`)
    .catch((err) => {
    alert(err.message);
    throw err;
  });
};

export interface updateClassProps {
  id: number;
  course: string;
  class_name: string;
  teacher_one: string;
  teacher_two: string;
}

export const updateClass = async (id: number, data: updateClassProps) => {
  return api.put(`/api/class/${id}/`, data).catch((err: Error) => {
    alert(err.message);
    throw err;
  });
};
