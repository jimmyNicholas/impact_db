import { ColumnDef } from '@tanstack/react-table';
import { StudentRowType } from "@/types/student";

export const statusColumns: ColumnDef<StudentRowType, unknown>[] = [
    {
      accessorKey: 'start_date',
      header: 'Start Date',
      cell: ({ row }) => new Date(row.getValue('start_date')).toLocaleDateString(),
    },
    {
      accessorKey: 'participation',
      header: 'Participation',
    },
    {
      accessorKey: 'teacher_comments',
      header: 'Comments',
    },
    {
      accessorKey: 'level_up',
      header: 'Level Up',
    },
  ];