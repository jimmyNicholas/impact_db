import { useEffect, useState } from "react";
import {
  resultColumns,
  ResultType,
} from "@/pages/ResultsTable/results-columns";
//import { DataTable } from "@/components/tables/dataTable";
import { ClassType } from "@/types/class";
//import { getClassData } from "@/api/classApi";
//import { ClassDataTable } from "./ClassTable/class-data-table";
import { getClass } from "@/api/services/class.service";
//import StudentTable from "@/components/tables/StudentTable/page";
//import { StudentResultsTable } from "@/components/tables/StudentResultsTable/page";
import ResultsTable from "@/components/students/page"

export default function FullClass() {
  const className = "Foundation 1";
  const [classData, setClassData] = useState<ClassType | undefined>();
  const [tableData, setTableData] = useState<ResultType[]>([]);

  useEffect(() => {
    getClass(className).then((res) => {
      setClassData(res);
    });
  }, [className]);

  useEffect(() => {
    if (classData != null) {
      const completeData = initializeCompleteDataset(classData);
      setTableData(completeData);
    }
  }, [classData]);

  return (
    <div className="container mx-auto py-10">
      {/* {/* {classData ? (
        <div className="grid grid-flow-col bg-slate-400 p-4">
          <h1>
            {"Course: "} {classData.course}
          </h1>

          <h1>
            {"Class: "} {classData.class_name}
          </h1>
          <h1>
            {"Teachers: "}{" "}
            {classData.teacher_one + " and " + classData.teacher_two}
          </h1>

          <h1>
            {"Students:"} {classData.students.length}
          </h1>
        </div>
      ) : null} */}
      <ResultsTable />
      {/* {tableData ? (
        <DataTable columns={resultColumns} data={tableData} />
      ) : null} */}
    </div>
  );
}

const initializeCompleteDataset = (
  classData: ClassType,
  weekCount: number = 10
): ResultType[] => {
  const allResults: ResultType[] = [];
  let nextId =
    Math.max(
      ...classData.students.flatMap((student) =>
        student.results.map((result) => result.id)
      )
    ) + 1;

  classData.students.forEach((student) => {
    const weeks = Array.from({ length: weekCount }, (_, i) =>
      (i + 1).toString()
    );

    weeks.forEach((week) => {
      const existingResult = student.results.find((r) => r.week === week);

      if (existingResult) {
        allResults.push(existingResult);
      } else {
        allResults.push({
          id: nextId++,
          student_id: student.student_id,
          first_name: student.first_name,
          last_name: student.last_name,
          nickname: student.nickname,
          week,
          grammar: null,
          vocabulary: null,
          reading: null,
          writing: null,
          speaking: null,
          listening: null,
          pronunciation: null,
        });
      }
    });
  });

  return allResults;
};
