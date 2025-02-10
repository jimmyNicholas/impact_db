import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/students/data-table";
import { useMemo, useState } from "react";
import { ClassType } from "@/types/class";
import { columns } from "@/components/students/columns";
import { StudentRowType } from "@/types/studentRow";

const initializeCompleteDataset = (
  classData: ClassType,
  selectedWeek: string
): StudentRowType[] => {
  return classData.students.map((student) => {
    const weeklyResult =
      student.results.find((result) => result.week === selectedWeek) || null;
    const { results, current_class, ...filteredStudent } = student;
    return {
      ...filteredStudent,
      week: selectedWeek,
      resultId: weeklyResult?.id || null,
      grammar: weeklyResult?.grammar || null,
      vocabulary: weeklyResult?.vocabulary || null,
      reading: weeklyResult?.reading || null,
      writing: weeklyResult?.writing || null,
      speaking: weeklyResult?.speaking || null,
      listening: weeklyResult?.listening || null,
      pronunciation: weeklyResult?.pronunciation || null,
    };
  });
};

interface ClassTableProps {
  classData: ClassType,
}

export default function ClassTable({classData}: ClassTableProps) {
  const [selectedWeek, setSelectedWeek] = useState("1");

  const tableData = useMemo(
    () => (classData ? initializeCompleteDataset(classData, selectedWeek) : []),
    [classData, selectedWeek]
  );

  const weeks = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  return (
    <div className="container mx-auto py-10">
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
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
