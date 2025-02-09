//"use client";

import { getClass } from "@/api/services/class.service";
import { DataTable } from "@/components/tables/StudentResultsTable/dataTable";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import type { ClassType, StudentRowType, ResultType } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StudentResultsTable() {
  const className = "Foundation 1";
  const [classData, setClassData] = useState<ClassType | undefined>();
  const [tableData, setTableData] = useState<StudentRowType[]>([]);
  const [selectedWeek, setSelectedWeek] = useState("1");

  const weeks = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  useEffect(() => {
    getClass(className).then((res) => {
      setClassData(res);
    });
  }, []);

  useEffect(() => {
    if (classData) {
      const completeData = initializeCompleteDataset(classData);
      setTableData(completeData);
    }
  }, [classData]);
  console.log(tableData);

  const initializeCompleteDataset = (classData: ClassType): StudentRowType[] => {
    return classData.students.map((student) => ({
      id: student.id,
      student_id: student.student_id,
      first_name: student.first_name,
      last_name: student.last_name,
      nickname: student.nickname,
      results: student.results.reduce(
        (acc, result) => {
          acc[result.week] = result
          return acc
        },
        {} as Record<string, ResultType>,
      ),
    }))
  }

  return (
    <div>
      <Select value={selectedWeek} onValueChange={setSelectedWeek}>
        <SelectTrigger className="w-[180px] mb-4">
          <SelectValue placeholder="Select week" />
        </SelectTrigger>
        <SelectContent>
          {weeks.map((week) => (
            <SelectItem key={week} value={week}>
              Week {week}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DataTable columns={columns} data={tableData} selectedWeek={selectedWeek} setData={setTableData} />
    </div>
  );
}
/*
const initializeCompleteDataset = (
  classData: ClassType,
  weekCount = 10
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
*/
// const initializeCompleteDataset = (classData: ClassType): StudentRowType[] => {
//   return classData.students.map((student) => ({
//     id: student.id,
//     student_id: student.student_id,
//     first_name: student.first_name,
//     last_name: student.last_name,
//     nickname: student.nickname,
//     results: student.results.reduce((acc, result) => {
//       acc[result.week] = result;
//       return acc;
//     }, {} as Record<string, ResultType>),
//   }));
// };
