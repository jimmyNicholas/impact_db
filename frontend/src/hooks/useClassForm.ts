import { useActionState } from "react";
import api from "@/api/config";

interface ClassFormData {
  course: string;
  class_name: string;
  course_type: number;
  teacher_one: string;
  teacher_two: string;
}

interface UseClassFormProps {
  onSuccess: () => void;
  setEditingId?: (id: number | null) => void;
  mode: "create" | "edit";
  editingId?: number | null;
}

export const useClassForm = ({
  onSuccess,
  setEditingId,
  mode,
  editingId,
}: UseClassFormProps) => {
  const [error, submitAction] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      try {
        const course = formData.get("course") as string;
        const className = formData.get("className") as string;
        const courseTypeId = formData.get("courseType") as string;
        const teacherOne = formData.get("teacherOne") as string;
        const teacherTwo = formData.get("teacherTwo") as string;

        if (!course || !className) {
          return "Please fill in all fields";
        }

        const data: ClassFormData = {
          course,
          class_name: className,
          course_type: parseInt(courseTypeId, 10),
          teacher_one: teacherOne,
          teacher_two: teacherTwo,
        };

        const res =
          mode === "create"
            ? await api.post("/api/class/", data)
            : await api.put(`/api/class/${editingId}/`, data);

        if (res.status === (mode === "create" ? 201 : 200)) {
          onSuccess();
          setEditingId?.(null);
          return null;
        }

        return `Failed to ${mode} class`;
      } catch (error) {
        return error instanceof Error ? error.message : "An error occurred";
      }
    },
    null
  );

  return { error, submitAction };
};
