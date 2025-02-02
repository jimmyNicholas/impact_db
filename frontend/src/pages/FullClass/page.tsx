import useClassApi from "@/api/useClassApi";
import { useEffect, useState } from "react";
import { columns, ResultType } from "./columns";
import { DataTable } from "./data-table";
import { ClassType } from "@/types/class";

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

export default function FullClass() {
  const className = "Foundation 1";
  const { classData, getClassData } = useClassApi();
  const [tableData, setTableData] = useState<ResultType[]>([]);
  //const { results, getResults } = useResultApi();

  console.log(classData);
  //console.log(results);

  useEffect(() => {
    getClassData(className);
    //getResults(className);
  }, [className]);

  useEffect(() => {
    if (classData) {
      const completeData = initializeCompleteDataset(classData);
      setTableData(completeData);
    }
  }, [classData]);

  return (
    <div className="container mx-auto py-10">
      {tableData ? <DataTable columns={columns} data={tableData} /> : null}
    </div>
  );
}
