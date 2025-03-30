import { createContext, useContext, useMemo, ReactNode, JSX } from "react";
import { useClassData } from "../hooks/useClassData";
import { useStudentUpdates } from "../hooks/useStudentUpdates";
import { useAssessmentUpdates } from "../hooks/useAssessmentUpdates";
import { ClassType } from "@/types/class";
import { StudentDataProps, StudentType } from "@/types/student";
import { CreateAssessmentType } from "@/types/assessment";

interface ClassDataContextValue {
  // Data
  classData: ClassType | undefined;

  // Status
  isLoading: boolean;
  error: Error | null;
  isStudentOperationPending: boolean;
  isAssessmentOperationPending: boolean;

  // Derived data
  studentCount: number;

  // Operations
  refetchClass: () => Promise<any>;
  addStudent: (studentData: StudentDataProps) => Promise<boolean>;
  updateStudent: (
    id: number,
    studentData: Partial<StudentType>
  ) => Promise<boolean>;
  deleteStudent: (studentId: number) => Promise<boolean>;
  addAssessment: (assessmentData: CreateAssessmentType) => Promise<boolean>;
  updateAssessment: (
    id: number,
    assessmentData: Partial<CreateAssessmentType>
  ) => Promise<boolean>;
}

interface ClassDataProviderProps {
  classSlug: string;
  children: ReactNode;
}

const ClassDataContext = createContext<ClassDataContextValue | undefined>(
  undefined
);

export const useClassDataContext = (): ClassDataContextValue => {
  const context = useContext(ClassDataContext);
  if (context === undefined) {
    throw new Error(
      "useClassDataContext must be used within a ClassDataProvider"
    );
  }

  return context;
};

export const ClassDataProvider = ({
  classSlug,
  children,
}: ClassDataProviderProps): JSX.Element => {
  const { classData, error, isLoading, refetchClass } = useClassData(classSlug);

  const {
    addStudent,
    updateStudent,
    deleteStudent,
    isStudentOperationPending,
  } = useStudentUpdates(refetchClass);

  const { addAssessment, updateAssessment, isAssessmentOperationPending } =
    useAssessmentUpdates(refetchClass);

  const studentCount = useMemo(
    () => classData?.students?.length || 0,
    [classData]
  );

  const contextValue = useMemo<ClassDataContextValue>(
    () => ({
      // Data
      classData,

      // Status
      isLoading,
      error,
      isStudentOperationPending,
      isAssessmentOperationPending,

      // Derived data
      studentCount,

      // Operations
      refetchClass,
      addStudent,
      updateStudent,
      deleteStudent,
      addAssessment,
      updateAssessment,
    }),
    [
      classData,
      isLoading,
      error,
      isStudentOperationPending,
      isAssessmentOperationPending,
      studentCount,
      refetchClass,
      addStudent,
      updateStudent,
      deleteStudent,
      addAssessment,
      updateAssessment,
    ]
  );

  return (
    <ClassDataContext.Provider value={contextValue}>
      {children}
    </ClassDataContext.Provider>
  );
};
