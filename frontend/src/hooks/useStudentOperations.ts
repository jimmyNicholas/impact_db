import { useActionState } from "react";
import api from "@/api/config";

interface StudentFormData {
  student_id: string;
  first_name: string;
  last_name: string;
  nickname?: string;
  current_class?: number;
}

interface StudentField {
  id: string;
  label: string;
  required: boolean;
}

interface UseStudentOperationsProps {
  classId?: number | null;
  onSuccess: () => void;
  setEditingId?: (id: number | null) => void;
}

export const STUDENT_FIELDS: StudentField[] = [
  {
    id: "studentId",
    label: "Student ID",
    required: true,
  },
  {
    id: "firstName",
    label: "First Name",
    required: true,
  },
  {
    id: "lastName",
    label: "Last Name",
    required: true,
  },
  {
    id: "nickname",
    label: "Nickname",
    required: false,
  },
];

export const useStudentOperations = ({
  classId,
  onSuccess,
  setEditingId,
}: UseStudentOperationsProps) => {
  const [error, submitAction] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      try {
        const studentId = formData.get("studentId") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const nickname = formData.get("nickname") as string;

        if (!studentId || !firstName || !lastName) {
          return "Please fill in all fields";
        }

        const data: StudentFormData = {
          student_id: studentId,
          first_name: firstName,
          last_name: lastName,
          nickname: nickname || undefined,
          current_class: classId || undefined,
        };

        const editingId = formData.get("editingId") as string;
        const isEditing = Boolean(editingId);

        const res = isEditing
          ? await api.put(`/api/student/${editingId}/`, data)
          : await api.post("/api/student/", data);

        if (res.status === (isEditing ? 200 : 201)) {
          onSuccess();
          setEditingId?.(null);
          return null;
        }

        return `Failed to ${isEditing ? "update" : "create"} student`;
      } catch (error) {
        return error instanceof Error ? error.message : "An error occurred";
      }
    },
    null
  );

  return {
    error,
    submitAction,
    STUDENT_FIELDS,
  };
};
