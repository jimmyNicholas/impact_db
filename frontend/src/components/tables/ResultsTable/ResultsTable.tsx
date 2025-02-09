//"use client"

import { useEffect, useState } from "react"
import { getClass } from "@/api/services/class.service"
import { DataTable } from "./DataTable"
import { columns } from "./columns"
import { StudentBase, StudentResultRow, WeeklyResult } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClassData {
  id: number;
  course: string;
  class_name: string;
  teacher_one: string;
  teacher_two: string;
  is_active: boolean;
  students: StudentBase[];
  weekly_results: WeeklyResult[];
}

export function ResultsTable() {
  const className = "Foundation 1"
  const [classData, setClassData] = useState<ClassData | undefined>()
  const [tableData, setTableData] = useState<StudentResultRow[]>([])
  const [selectedWeek, setSelectedWeek] = useState("1")

  useEffect(() => {
    getClass(className).then((res) => {
      setClassData(res)
    })
  }, [])

  useEffect(() => {
    if (classData) {
      const completeData = initializeCompleteDataset(classData, selectedWeek)
      setTableData(completeData)
    }
  }, [classData, selectedWeek])

  const initializeCompleteDataset = (classData: ClassData, week: string): StudentResultRow[] => {
    return classData.students.map((student) => {
      const weeklyResult = classData.weekly_results.find(
        result => result.student_id === student.student_id && result.week === week
      ) || null;
      return {
        ...student,
        weeklyResult,
      };
    });
  };

  const weeks = Array.from({ length: 10 }, (_, i) => (i + 1).toString())

  return (
    <div className="space-y-4">
      <Select value={selectedWeek} onValueChange={setSelectedWeek}>
        <SelectTrigger className="w-[180px]">
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
      <DataTable 
        columns={columns} 
        data={tableData} 
        selectedWeek={selectedWeek}
        setData={setTableData}
      />
    </div>
  )
}