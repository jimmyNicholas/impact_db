//import useClassApi from "@/api/useClassApi";
import { useEffect, useState } from "react";
import { ResultType } from "@/pages/ResultsTable/results-columns";
import { DataTable } from "@/components/tables/dataTable"
import { ClassType } from "@/types/class";
import { getClass } from "@/api/services/class.service";
//import allColumns from "@/components/tables/StudentTable/columns/index";
import { basicInfoColumns, statusColumns, resultColumns } from "@/components/tables/StudentTable/columns";

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

export default function StudentTable() {
  const className = "Foundation 1";
  const [classData, setClassData] = useState<ClassType | undefined>();
  const [tableData, setTableData] = useState<ResultType[]>([]);

  console.log(classData);

  useEffect(() => {
    getClass(className).then((res) => {
      setClassData(res);
    });
  }, [className]);

  useEffect(() => {
    if (classData) {
      const completeData = initializeCompleteDataset(classData);
      setTableData(completeData);
    }
  }, [classData]);
  //console.log(allColumns);
  

  return (
    <div className="container mx-auto">
      {tableData ? (
        <DataTable columns={[...basicInfoColumns, ...resultColumns]} data={tableData} />
      ) : null}
    </div>
  );
}
