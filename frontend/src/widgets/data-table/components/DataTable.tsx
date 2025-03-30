"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef, flexRender, Row, SortingState, VisibilityState } from "@tanstack/react-table";
import { useTableState } from "@/widgets/data-table/hooks/useTableState";
import { TableControls } from "@/widgets/data-table/components/TableControls";

export interface ColumnGroup {
  id: string;
  title: string;
  columns: string[];
  defaultVisible?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  borderClassName?: string;
}

export interface InitialStates {
    columnVisibility?: VisibilityState;
    sorting?: SortingState;
}

export interface DataTableProps<TData extends Record<string, any>> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onExport?: (rows: Row<TData>[]) => void;
  onDelete?: (rows: Row<TData>[]) => void;
  idField?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  columnGroups?: ColumnGroup[];
  initialStates?: InitialStates;
  //initialColumnVisibility?: VisibilityState;
}

export function DataTable<TData extends Record<string, any>>({
  data,
  columns,
  onExport,
  onDelete,
  children,
  columnGroups = [],
  initialStates = {},
}: DataTableProps<TData>) {
  const { table } = useTableState(data, columns, initialStates);

  return (
    <div>
      <div className="grid grid-flow-col justify-between">
        <TableControls
          table={table}
          onExport={onExport}
          onDelete={onDelete}
          columnGroups={columnGroups}
        />
        {children}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={'text-nowrap'}
                      >
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
              );
            })}
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
