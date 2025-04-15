import { StudentType } from "@/types/student";
import { createEditableColumn } from "@/widgets/data-table/utils/column";
import { ColumnDef, Row } from "@tanstack/react-table";

export interface OverallColumnsProps {
  onStudentUpdate: (id: number, studentData: Partial<StudentType>) => void;
}

export const createOverallColumns = ({
  onStudentUpdate,
}: OverallColumnsProps): ColumnDef<StudentType, unknown>[] => {
  const getStudentValue = (
    row: Row<StudentType>,
    columnId: string,
  ): string => {
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

  type OverallColumnDef = {
    id: string;
    header: string;
    type?: "default" | "grade" | "date" | "text-field";
    columns: {id: string, header: string, meta?: {className: string}}[];
  };

  const baseBodyStyle = "bg-primary-content/50";

  const overallColumnDefs: OverallColumnDef[] = [
    {
        id: "Overall", 
        header: "Overall", 
        columns: [ 
          {
            id: "overall_reading",
            header: "R",
            meta: {
              className: baseBodyStyle, 
            },
          },
          {
            id: "overall_writing",
            header: "W",
            meta: {
              className: baseBodyStyle, 
            },
          },
          {
            id: "overall_speaking",
            header: "S",
            meta: {
              className: baseBodyStyle, 
            },
          },
          {
            id: "overall_listening",
            header: "L",
            meta: {
              className: baseBodyStyle, 
            },
          },
        ],
      },
  ];
  const result: ColumnDef<StudentType, unknown>[] = [];
  
  overallColumnDefs.forEach((def) => {
    const childColumns = def.columns.map(childDef => 
      createEditableColumn<StudentType>({
        ...childDef,
        type: 'grade',
        handleSave: handleStudentSave,
        getValue: getStudentValue,
      })
    );
    
    result.push(...childColumns);
  });
  console.log(result);
  
  return result;
}