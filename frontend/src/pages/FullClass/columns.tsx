"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownFilterHeader,
  SortHeader,
  TextFilterHeader,
} from "./headerFilters";
import { skillColumns } from "./skillColumns";

export interface ResultType {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  week: string;
  grammar: string | null;
  vocabulary: string | null;
  reading: string | null;
  writing: string | null;
  speaking: string | null;
  listening: string | null;
  pronunciation: string | null;
}

export const columns: ColumnDef<ResultType>[] = [
  {
    accessorKey: "student_id",
    header: ({ column }) => (
      <div className="flex">
        {SortHeader(column)}
        {TextFilterHeader(column, "max-w-24", "Search ID...")}
      </div>
    ),
  },
  {
    id: "fullName",
    accessorFn: (row) => ({
      firstName: row.first_name,
      lastName: row.last_name,
      nickname: row.nickname,
    }),
    header: ({ column }) => (
      <div className="flex">
        {SortHeader(column)}
        {TextFilterHeader(column, "max-w-64", "Search names...")}
      </div>
    ),
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
    accessorKey: "week",
    header: ({ column }) => (
      <div className="flex">{DropdownFilterHeader(column, "Week")}</div>
    ),
    filterFn: 'equals',
  },
  ...skillColumns,
];
