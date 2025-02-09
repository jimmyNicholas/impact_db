"use client"

import { ColumnDef } from "@tanstack/react-table";
import {StudentRowType} from '@/components/students/types';
import { skillColumns } from "@/components/students/skillColumns";

export const columns: ColumnDef<StudentRowType, unknown>[] = [
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
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const value = row.getValue(columnId) as {
        firstName: string;
        lastName: string;
        nickname: string;
      };
      const searchValue = String(filterValue).toLowerCase();
      return !!(
        value.firstName.toLowerCase().includes(searchValue) ||
        value.lastName.toLowerCase().includes(searchValue) ||
        (value.nickname && value.nickname.toLowerCase().includes(searchValue))
      );
    },
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
//   {
//     accessorKey: "grammar",
//     header: "G!",
//   },
  ...skillColumns,
];