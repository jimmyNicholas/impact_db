import { ColumnDef } from "@tanstack/react-table";
import { SelectionHeaderCell } from "../cell/selection/SelectionHeaderCell";
import { SelectionRowCell } from "../cell/selection/SelectionRowCell";

export function createSelectionColumn<T>(): ColumnDef<T, unknown> {
  return {
    id: "select",
    header: ({ table }) => <SelectionHeaderCell table={table} />,
    cell: ({ row }) => <SelectionRowCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  };
}
