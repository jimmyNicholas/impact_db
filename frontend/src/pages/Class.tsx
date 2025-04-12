import { getClass } from "@/api/services/class.service";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CreateStudentForm from "@/components/forms/CreateStudentForm";
import { useCallback, useEffect, useState } from "react";
import ClassList from "./ClassList";
import StudentTable from "@/components/tables/student/StudentTable";
import ResultsTable from "@/components/tables/DEL_ResultsTable";
import InfoPanel from "@/components/z_TO_DELETE/DEL_class/InfoPanel";
import { getClassResults } from "@/api/services/class.service";
import ActionPanel from "@/components/z_TO_DELETE/DEL_class/ActionPanel";
import NavTop from "@/components/navigation/nav-top";
import { exportStudent } from "@/api/services/student.service";

export default function Class() {
  const queryClient = useQueryClient();
  const { className: slugParam } = useParams();
  const [studentFormShown, setStudentFormShown] = useState(false);
  const [refreshPage, setRefreshPage] = useState(0);
  const [selectedCells, setSelectedCells] = useState<
    Array<{ skill: string; week: number }>
  >([]);

  const showAddStudentForm = (): void => setStudentFormShown(!studentFormShown);

  const showResultCols = useCallback(
    (skill: string, week: number) => {
      if (
        selectedCells.some((item) => item.skill === skill && item.week === week)
      ) {
        setSelectedCells(
          selectedCells.filter(
            (item) => !(item.skill === skill && item.week === week)
          )
        );
      } else {
        setSelectedCells([...selectedCells, { skill, week }]);
      }
      console.log(selectedCells);
    },
    [selectedCells]
  );

  const refreshClass = () => {
    queryClient.invalidateQueries({ queryKey: ["class", slugParam!] });
    setRefreshPage(refreshPage + 1);
  };

  const {
    data: classData,
    //status,
    error,
    //isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["class", slugParam!],
    queryFn: async () => {
      const result = await getClass(slugParam!);
      if (!result) {
        throw new Error("Class not found");
      }
      return result;
    },
    enabled: !!slugParam,
  });

  const {
    data: classResults,
    //status,
    //error,
    //isFetching,
    //isLoading,
  } = useQuery({
    queryKey: ["classResults", slugParam!],
    queryFn: async () => {
      const result = await getClassResults(slugParam!);
      if (!result) {
        throw new Error("Class not found");
      }
      return result;
    },
    enabled: !!slugParam,
  });

  useEffect(() => {}, [refreshPage]);

  if (!slugParam) return <ClassList />;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  if (!classData) return <div>Loading...</div>;
  const infoPanelProps = {
    course: classData.course,
    className: classData.class_name,
    teacherOne: classData.teacher_one,
    teacherTwo: classData.teacher_two,
    studentNumber: classData.students.length,
  };  
  console.log(classData.students);
  
  return (
    <div className="">
      <NavTop />
      <div className="grid grid-flow-col gap-2 mx-4">
        {classData && <InfoPanel {...infoPanelProps} />}
        <ActionPanel
          studentFormShown={studentFormShown}
          showAddStudentForm={showAddStudentForm}
        />
      </div>
      {studentFormShown && (
        <CreateStudentForm classId={classData.id} onSuccess={refreshClass} />
      )}
      <div className="grid grid-flow-row  gap-2 m-4">
        {classData && (
          <StudentTable
            students={classData.students}
            selectedCells={selectedCells}
            onSuccess={refreshClass}
          />
        )}
        {/* {classResults && (
          <ResultsTable
            results={classResults}
            showResultCols={showResultCols}
            selectedCells={selectedCells}
          />
        )} */}
      </div>
    </div>
  );
}
