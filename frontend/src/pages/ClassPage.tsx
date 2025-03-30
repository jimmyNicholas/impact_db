import {
  ClassDataProvider,
  useClassDataContext,
} from "@/features/class/context/ClassDataContext";
import ActionPanel from "@/components/class/ActionPanel";
import InfoPanel, { InfoPanelProps } from "@/components/class/InfoPanel";
import CreateStudentForm from "@/components/forms/CreateStudentForm";
import NavTop from "@/components/navigation/nav-top";
import { StudentDataProps, StudentType } from "@/types/student";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { StudentTable } from "@/features/class/components/StudentTable";
import { CreateAssessmentType } from "@/types/assessment";

export const ClassPage: React.FC = () => {
  const { className: slugParam } = useParams<string>();

  return (
    <ClassDataProvider classSlug={slugParam!}>
      <ClassPageContent />
    </ClassDataProvider>
  );
};

export const ClassPageContent = () => {
  const [studentFormShown, setStudentFormShown] = useState<boolean>(false);
  const showAddStudentForm = (): void => setStudentFormShown(!studentFormShown);

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

  const infoPanelProps: InfoPanelProps = {
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
    setStudentFormShown(false);
  };

  const handleStudentUpdated = async (
    id: number,
    studentData: Partial<StudentType>
  ): Promise<void> => {
    await updateStudent(id, studentData);
    refetchClass();
  };

  const handleStudentDeleted = async (
    id: number,
  ): Promise<void> => {
    await deleteStudent(id),
    refetchClass();
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
      <NavTop />
      <div className="grid grid-flow-col gap-2 mx-4">
        {classData && <InfoPanel {...infoPanelProps} />}
        <ActionPanel
          studentFormShown={studentFormShown}
          showAddStudentForm={showAddStudentForm}
        />
      </div>
      {studentFormShown && (
        <CreateStudentForm
          classId={classData.id}
          handleStudentAdded={handleStudentAdded}
        />
      )}
      <div className="grid grid-flow-row gap-2 mx-4">
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
