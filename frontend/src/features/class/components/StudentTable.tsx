import { AssessmentType, CreateAssessmentType } from "@/types/assessment";
import { StudentType } from "@/types/student";
import { DataTable } from "@/widgets/data-table/components/DataTable";
import {
  ColumnDef,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { createSkillColumns } from "./columns/skillColumns";
import { createOverviewColumns } from "./columns/overviewColumns";
import { createBaseColumns } from "./columns/baseColumns";
import { createOverallColumns } from "./columns/overallColumns";
import { exportStudent } from "../api/studentApi";

interface StudentTableProps {
  students: StudentType[];
  assessmentTypes: AssessmentType[];
  onStudentUpdate: (id: number, studentData: Partial<StudentType>) => void;
  onStudentDelete: (id: number) => void;
  onAssessmentAdd: (assessmentData: CreateAssessmentType) => Promise<void>;
  onAssessmentUpdate: (
    id: number,
    assessmentData: CreateAssessmentType
  ) => Promise<void>;
}

export const StudentTable = ({
  students,
  assessmentTypes,
  onStudentUpdate,
  onStudentDelete,
  onAssessmentAdd,
  onAssessmentUpdate,
}: StudentTableProps) => {
  const [visibleWeek, setVisibleWeek] = useState<string>("1");

  const handleExport = (rows: Row<StudentType>[]): void => {
    for (const row of rows) {
      const { id, student_id, first_name, last_name, nickname } = row.original;
      const formattedNickname = nickname !== "" ? `(${nickname})` : "";
      const fileName = `${student_id} ${first_name} ${last_name} ${formattedNickname}.docx`;
      exportStudent(id, fileName);
    }
  };

  const handleDeleteStudents = (rows: Row<StudentType>[]): void => {
    for (const row of rows) {
      onStudentDelete(row.original.id);
    }
  };

  const baseColumns = createBaseColumns();
  const overallColumns = createOverallColumns({ onStudentUpdate });
  const overviewColumns = createOverviewColumns({ onStudentUpdate });
  const skillColumns = createSkillColumns({
    visibleWeek,
    assessmentTypes,
    onAssessmentAdd,
    onAssessmentUpdate,
  });

  const visibleWeekInput = (
    <div className="flex items-center gap-2">
      <h1>Week</h1>
      <input
        className="w-12 border-2 text-center text-base-content"
        type="number"
        min={1}
        max={10}
        value={visibleWeek}
        onChange={(e) => setVisibleWeek(e.target.value)}
      ></input>
    </div>
  );

  const columns: ColumnDef<StudentType>[] = [
    ...baseColumns,
    {
      id: "Overall",
      header: () => (
        <span className="grid p-2 justify-center bg-base-content text-base-100">Overall</span>
      ),
      columns: overallColumns,
    },
    {
      id: "Overview",
      header: () => (
        <span className="grid p-2 justify-center bg-base-content text-base-100">Overview</span>
      ),
      columns: overviewColumns,
    },
    {
      id: "Results",
      header: () => (
        <span className="grid grid-flow-col gap-4 p-2 justify-center items-center bg-base-content text-base-100">
          {visibleWeekInput}Results
        </span>
      ),

      columns: skillColumns,
    },
  ];

  const columnGroups = [
    {
      id: "overall",
      title: "Overall Scores",
      columns: overallColumns.map((col) => col.id as string),
      defaultVisible: true,
    },
    {
      id: "overview",
      title: "Overview",
      columns: overviewColumns.map((col) => col.id as string),
      defaultVisible: false,
    },
    {
      id: "skills",
      title: "Skill Results",
      columns: skillColumns.map((col) => col.id as string),
      defaultVisible: true,
    },
  ];

  const initialColumnVisibility: VisibilityState = {};

  columnGroups.forEach((group) => {
    group.columns.forEach((colId) => {
      initialColumnVisibility[colId] = group.defaultVisible ?? true;
    });
  });

  const initialColumnSorting: SortingState = [
    {
      id: "ID",
      desc: false,
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={students}
        onExport={handleExport}
        onDelete={handleDeleteStudents}
        columnGroups={columnGroups}
        initialStates={{
          columnVisibility: initialColumnVisibility,
          sorting: initialColumnSorting,
        }}
      />
    </>
  );
};
