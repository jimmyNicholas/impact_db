"use client"

import { ColumnDef } from "@tanstack/react-table";
import {StudentRowType} from '@/types/studentRow';
import { skillColumns } from "@/components/REFERENCE_ONLY_students/skillColumns";
import { Checkbox } from "../ui/checkbox";

const baseColumns: ColumnDef<StudentRowType, unknown>[] = [
  // Selection column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="flex items-center"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="flex items-center"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ID and Full Name columns
  {
    accessorKey: "student_id",
    header: "ID",
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
  },
];

// Status columns
const statusColumns: ColumnDef<StudentRowType, unknown>[] = [
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => new Date(row.getValue("start_date")).toLocaleDateString(),
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

export const getVisibleColumns = (showStatus: boolean, showResults: boolean): ColumnDef<StudentRowType, unknown>[] => {
  const columns = [...baseColumns];
  if (showStatus) columns.push(...statusColumns);
  if (showResults) columns.push(...skillColumns);
  return columns;
};

export { baseColumns, statusColumns, skillColumns };
