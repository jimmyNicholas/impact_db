import {
  ClassDataProvider,
  useClassDataContext,
} from "@/features/class/context/ClassDataContext";
import { ClassPageActionPanel } from "./_components/class-page-action-panel/ClassPageActionPanel";
import { StudentDataProps, StudentType } from "@/types/student";
import { useParams } from "react-router-dom";
import { StudentTable } from "@/features/class/components/StudentTable";
import { CreateAssessmentType } from "@/types/assessment";
import { FocusPoint } from "@/components/focus-point/FocusPoint";
import { ClassPageInfoPanel } from "./_components/class-page-info-panel/ClassPageInfoPanel";
import { ClassPageInfoPanelProps } from "./_components/class-page-info-panel/class-page-info-panel-interface";

export const ClassPage: React.FC = () => {
  const { className: slugParam } = useParams<string>();

  return (
    <ClassDataProvider classSlug={slugParam!}>
      <ClassPageContent />
    </ClassDataProvider>
  );
};

export const ClassPageContent = () => {
  const {
    classData,
    isLoading,
    error,
    studentCount,
    addStudent,
    updateStudent,
    deleteStudent,
    addAssessment,
    updateAssessment,
    refetchClass,
  } = useClassDataContext();

  if (isLoading) return <div className="p-4">Loading class data...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!classData) return <div className="p-4">Class not found</div>;

  const infoPanelProps: ClassPageInfoPanelProps = {
    course: classData.course,
    className: classData.class_name,
    teacherOne: classData.teacher_one,
    teacherTwo: classData.teacher_two,
    studentNumber: studentCount,
  };

  const handleStudentAdded = async (
    newStudent: StudentDataProps
  ): Promise<void> => {
    await addStudent(newStudent);
    refetchClass();
  };

  const handleStudentUpdated = async (
    id: number,
    studentData: Partial<StudentType>
  ): Promise<void> => {
    await updateStudent(id, studentData);
    refetchClass();
  };

  const handleStudentDeleted = async (id: number): Promise<void> => {
    await deleteStudent(id), refetchClass();
  };

  const handleAssessmentAdded = async (
    assessmentData: CreateAssessmentType
  ): Promise<void> => {
    await addAssessment(assessmentData);
    refetchClass();
  };

  const handleAssessmentUpdated = async (
    id: number,
    assessmentData: Partial<CreateAssessmentType>
  ): Promise<void> => {
    await updateAssessment(id, assessmentData);
    refetchClass();
  };

  return (
    <div className="grid grid-flow-row">
      {classData && (
        <div className="grid grid-cols-[50%_auto_auto] gap-4 px-2">
          <ClassPageInfoPanel {...infoPanelProps} />
          <ClassPageActionPanel
            classId={classData.id}
            handleStudentAdded={handleStudentAdded}
          />
          <FocusPoint
            assessment_types={classData.assessment_types}
            students={classData.students}
          />
        </div>
      )}

      <div className="grid grid-flow-row gap-2 px-4">
        {classData && (
          <StudentTable
            students={classData.students}
            assessmentTypes={classData.assessment_types}
            onStudentUpdate={handleStudentUpdated}
            onStudentDelete={handleStudentDeleted}
            onAssessmentAdd={handleAssessmentAdded}
            onAssessmentUpdate={handleAssessmentUpdated}
          />
        )}
      </div>
    </div>
  );
};
