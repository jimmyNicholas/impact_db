import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/tables/data-table";
import { useMemo, useState } from "react";
import { ClassType } from "@/types/class";
import {
  baseColumns,
  //statusColumns,
  //skillColumns,
} from "@/components/REFERENCE_ONLY_students/columns";
import { StudentRowType } from "@/types/studentRow";
//import { Checkbox } from "@radix-ui/react-checkbox";
//import RecordOfResults from "../records/recordOfResult";

const resultColumns = [
  {
    accessorKey: "skill",
    header: "Week",
  },
  {
    accessorKey: "week_1",
    header: "1",
  },
  {
    accessorKey: "week_2",
    header: "2",
  },
  {
    accessorKey: "week_3",
    header: "3",
  },
  {
    accessorKey: "week_4",
    header: "4",
  },
  {
    accessorKey: "week_5",
    header: "5",
  },
  {
    accessorKey: "week_6",
    header: "6",
  },
  {
    accessorKey: "week_7",
    header: "7",
  },
  {
    accessorKey: "week_8",
    header: "8",
  },
  {
    accessorKey: "week_9",
    header: "9",
  },
  {
    accessorKey: "week_10",
    header: "10",
  },
];

const resultsData = [
  {
    skill: "Grammar",
    week_1: 88,
    week_2: 69,
    week_3: 75,
    week_4: 88,
  },
  {
    skill: "Vocabulary",
    week_1: 94,
    week_2: 94,
    week_3: 94,
    week_4: 100,
  },
  {
    skill: "Listening",
    week_1: 54,
    week_2: "NA",
    week_3: 42,
    week_4: "NA",
  },
  {
    skill: "Reading",
    week_1: "NA",
    week_2: 50,
    week_3: "NA",
    week_4: 60,
  },
  {
    skill: "Writing",
    week_1: 88,
    week_2: 69,
    week_3: 75,
    week_4: 88,
  },
  {
    skill: "Speaking",
    week_1: 94,
    week_2: 94,
    week_3: 94,
    week_4: 100,
  },
  {
    skill: "Pronunciation",
    week_1: 54,
    week_2: "NA",
    week_3: 42,
    week_4: "NA",
  },
];

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
  classData: ClassType;
}

export default function ClassTable({ classData }: ClassTableProps) {
  const [selectedWeek, setSelectedWeek] = useState("1");

  const [showStatus, setShowStatus] = useState(true);
  const [showResults, setShowResults] = useState(true);

  const visibleColumns = useMemo(() => {
    const columns = [...baseColumns];
    //if (showStatus) columns.push(...statusColumns);
    //if (showResults) columns.push(...skillColumns);
    return columns;
  }, [showStatus, showResults]);

  const tableData = useMemo(
    () => (classData ? initializeCompleteDataset(classData, selectedWeek) : []),
    [classData, selectedWeek]
  );

  const weeks = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  console.log(classData.students);

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-flow-col">
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

        {/* <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="show-status" 
              checked={showStatus}
              onCheckedChange={(checked) => setShowStatus(!!checked)}
            />
            <label 
              htmlFor="show-status"
              className={`p-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${showStatus ? "bg-green-300" : "bg-red-300"}`}
            >
              Show Status
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="show-results" 
              checked={showResults}
              onCheckedChange={(checked) => setShowResults(!!checked)}
            />
            <label
              htmlFor="show-results"
              className={`p-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${showResults ? "bg-green-300" : "bg-red-300"}`}
            >
              Show Results
            </label>
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <DataTable columns={visibleColumns} data={tableData} />
        <DataTable columns={resultColumns} data={resultsData} />
        {/* <RecordOfResults /> */}
      </div>
    </div>
  );
}
