import { useMutation } from "@tanstack/react-query";
import {
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";
import { StudentType, StudentDataProps } from "@/types/student";

interface UseStudentUpdatesReturn {
  addStudent: (studentData: StudentDataProps) => Promise<boolean>;
  updateStudent: (
    id: number,
    studentData: Partial<StudentType>
  ) => Promise<boolean>;
  deleteStudent: (studentId: number) => Promise<boolean>;
  isAddingStudent: boolean;
  isUpdatingStudent: boolean;
  isDeletingStudent: boolean;
  isStudentOperationPending: boolean;
}

export const useStudentUpdates = (
  onSuccess: () => Promise<any>
): UseStudentUpdatesReturn => {
  const { mutateAsync: addStudentAsync, isPending: isAddingStudent } =
    useMutation({
      mutationFn: (studentData: StudentDataProps): Promise<boolean> => {
        return createStudent(studentData);
      },
      onSuccess,
    });

  const { mutateAsync: updateStudentAsync, isPending: isUpdatingStudent } =
    useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: number;
        data: Partial<StudentType>;
      }): Promise<boolean> => {
        return updateStudent(id, data);
      },
      onSuccess,
    });

  const { mutateAsync: deleteStudentAsync, isPending: isDeletingStudent } =
    useMutation({
      mutationFn: (id: number): Promise<boolean> => {
        return deleteStudent(id);
      },
      onSuccess,
    });

  const isStudentOperationPending =
    isAddingStudent || isUpdatingStudent || isDeletingStudent;

  return {
    addStudent: addStudentAsync,
    updateStudent: (id: number, studentData: Partial<StudentType>) =>
      updateStudentAsync({ id, data: studentData }),
    deleteStudent: deleteStudentAsync,
    isAddingStudent,
    isUpdatingStudent,
    isDeletingStudent,
    isStudentOperationPending,
  };
};
