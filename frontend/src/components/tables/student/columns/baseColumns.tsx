import { StudentType } from "@/types/student";
import { ColumnDef } from "@tanstack/react-table";
import { createSelectionColumn } from "../../column/columnHelpers";

export const studentColumns: ColumnDef<StudentType, unknown>[] = [
  // Selection column
  createSelectionColumn<StudentType>(),
  // ID and Full Name columns
  {
    accessorKey: "student_id",
    header: "ID",
    id: "ID",
    enableHiding: false,
  },
  {
    id: "fullName",
    accessorFn: (row) => ({
      firstName: row.first_name,
      lastName: row.last_name,
      nickname: row.nickname,
    }),
    header: "Full Name",
    cell: ({ getValue }) => {
      const value = getValue() as {
        firstName: string;
        lastName: string;
        nickname: string;
      };
      return (
        <div>
          {value.firstName} {value.lastName}
          {value.nickname && (
            <span className="text-gray-500 ml-2">({value.nickname})</span>
          )}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) =>
      new Date(row.getValue("start_date")).toLocaleDateString(),
  },
  {
    accessorKey: "participation",
    header: "Participation",
  },
  {
    accessorKey: "teacher_comments",
    header: "Comments",
  },
  {
    accessorKey: "level_up",
    header: "Level Up",
  },
  
];
