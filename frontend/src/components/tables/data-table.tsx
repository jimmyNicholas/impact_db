"use client";

import {
  ColumnDef,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { exportStudent } from "@/api/services/student.service";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  options?: {
    selectable?: boolean;
  };
  actions?: {
    handleRowDelete?: (row: any[]) => void;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  options,
  actions,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    teacher_comments: false,
    level_up: false,
    participation: false,
    start_date: false,
    overall_reading: false,
    overall_writing: false,
    overall_listening: false,
    overall_speaking: false,
  });

  const [additionalVisibilty, setAdditionalVisibility] = useState(false);
  const [overallVisibility, setOverallVisibility] = useState(false);

  useEffect(() => {
    console.log(columnVisibility);
    setColumnVisibility({
      teacher_comments: additionalVisibilty,
      level_up: additionalVisibilty,
      participation: additionalVisibilty,
      start_date: additionalVisibilty,
      overall_reading: overallVisibility,
      overall_writing: overallVisibility,
      overall_listening: overallVisibility,
      overall_speaking: overallVisibility,
    });
  }, [additionalVisibilty, overallVisibility]);

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    debugTable: true,
  });

  const exportFile = () => {
    const rows = table.getSelectedRowModel().rows;

    rows.map((row: any) => {
      const { student_id, first_name, last_name, nickname } = row.original;
      const fileName =
        [student_id, first_name, last_name].join(" ") +
        (nickname && nickname.trim() !== "" ? ` (${nickname})` : "") +
        ".docx";
      exportStudent(row.original.id, fileName);
    });
  };

  return (
    <div>
      <div className="grid grid-flow-col gap-2">
        {options?.selectable && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Columns</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    const columnTitle = column.columnDef.header?.toString();
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {columnTitle}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => setOverallVisibility((prev) => !prev)}
              className="border-2"
            >
              Overall Results
            </button>
            <button
              onClick={() => setAdditionalVisibility((prev) => !prev)}
              className="border-2"
            >
              Additional Information
            </button>

            <button onClick={exportFile} className="border-2">
              Export
            </button>
            {/* {actions?.handleRowDelete && ( */}
            <Button
              variant="destructive"
              //disabled={!isStudentSelected}
              onClick={() =>
                actions?.handleRowDelete?.(
                  table.getSelectedRowModel().rows || []
                )
              }
            >
              Delete
            </Button>

            {/* )} */}
          </>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
