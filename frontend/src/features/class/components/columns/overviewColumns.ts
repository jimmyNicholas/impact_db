import { StudentType } from "@/types/student";
import { createEditableColumn } from "@/widgets/data-table/utils/column";
import { ColumnDef, Row } from "@tanstack/react-table";

export interface OverviewColumnsProps {
  onStudentUpdate: (id: number, studentData: Partial<StudentType>) => void;
}

export const createOverviewColumns = ({
  onStudentUpdate,
}: OverviewColumnsProps): ColumnDef<StudentType, unknown>[] => {
  const getStudentValue = (row: Row<StudentType>, columnId: string): string => {
    const student = row.original as Record<string, any>;
    return student[columnId]?.toString() || "-";
  };

  const handleStudentSave = (
    value: string,
    row: Row<StudentType>,
    columnId: string
  ) => {

    const { student_id, first_name, last_name, current_class } = row.original;
    const updateData: Partial<StudentType> = {
      student_id,
      first_name,
      last_name,
      current_class,
      [columnId]: value,
    };
    onStudentUpdate(row.original.id, updateData);
  };

  type OverviewColumnDef = {
    id: string;
    header: string;
    type?: "default" | "grade" | "date" | "text-field";
  };

  const overviewColumnDefs: OverviewColumnDef[] = [
    {
      id: "start_date",
      header: "Start Date",
      type: "date",
    },
    {
      id: "participation",
      header: "Participation",
    },
    {
      id: "level_up",
      header: "Level Up",
      
    },
    {
      id: "teacher_comments",
      header: "Comments",
      type: "text-field",
    },
  ];

  return overviewColumnDefs.map((item) => {
    return createEditableColumn<StudentType>({
      ...item,
      handleSave: handleStudentSave,
      getValue: getStudentValue,
    });
  });
};
