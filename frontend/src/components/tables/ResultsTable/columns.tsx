//"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { StudentResultRow, WeeklyResult } from "@/types"
import EditableCell from "./components/EditableCell"
import { createResult, updateResult } from "@/api/services/result.service"
import { DropdownFilterHeader } from "./components/headerFilters"

const skills = [
  "grammar",
  "vocabulary",
  "reading",
  "writing",
  "speaking",
  "listening",
  "pronunciation",
] as const;

const createEditableCellRenderer = (field: keyof WeeklyResult) => {
  return ({ row }: { row: Row<StudentResultRow> }) => {
    const value = row.original.weeklyResult?.[field] || "";
    return (
      <EditableCell
        initialValue={value.toString()}
        row={row}
        column={field}
        onSave={async ({ row, column, value }) => {
          const basePayload = {
            student_id: row.original.student_id,
            week: row.original.weeklyResult?.week || "",
            [column]: value,
          };

          try {
            let success;
            if (!row.original.weeklyResult || row.original.weeklyResult[column] === null) {
              const createPayload = {
                ...basePayload,
                first_name: row.original.first_name,
                last_name: row.original.last_name,
                nickname: row.original.nickname,
              };
              success = await createResult(createPayload);
            } else if (row.original.weeklyResult.id) {
              success = await updateResult(row.original.weeklyResult.id, basePayload);
            }

            if (!success) {
              throw new Error("Failed to save changes");
            }
            return true;
          } catch (error) {
            console.error("Error saving result:", error);
            throw error;
          }
        }}
      />
    );
  }
}

export const columns: ColumnDef<StudentResultRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "student_id",
    header: "ID",
  },
  {
    id: "student_name",
    accessorFn: (row) => `${row.first_name} ${row.last_name} ${row.nickname ? `(${row.nickname})` : ""}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "week",
    header: ({ column }) => (
      <div className="flex">
        {DropdownFilterHeader(column, "Week")}
      </div>
    ),
    filterFn: 'equals',
  },
  ...skills.map((skill) => ({
    accessorKey: skill,
    header: String(skill[0]).toUpperCase() + String(skill).slice(1),
    cell: createEditableCellRenderer(skill as keyof WeeklyResult),
  })),
]