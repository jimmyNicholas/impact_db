import { Row, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Trash2 } from "lucide-react";

interface ColumnGroup {
  id: string;
  title: string;
  columns: string[];
}

export interface TableControlsProps<TData> {
  table: Table<TData>;
  onExport?: (rows: Row<TData>[]) => void;
  onDelete?: (rows: Row<TData>[]) => void;
  columnGroups?: ColumnGroup[];
}

export function TableControls<TData>({
  table,
  onExport,
  onDelete,
  columnGroups = [],
}: TableControlsProps<TData>) {
  const selectedRowIds = Object.keys(table.getState().rowSelection);
  const hasSelection = selectedRowIds.length > 0;

  const toggleColumnGroup = (groupId: string, value: boolean) => {
    const group = columnGroups.find((g: ColumnGroup) => g.id === groupId);
    if (!group) return;

    group.columns.forEach((colId: string) => {
      const column = table.getColumn(colId);
      if (column) {
        column.toggleVisibility(value);
      }
    });
  };

  const isGroupVisible = (groupId: string) => {
    const group = columnGroups.find((g: ColumnGroup) => g.id === groupId);
    if (!group) return false;

    return group.columns.every((colId: string) => {
      const column = table.getColumn(colId);
      return column?.getIsVisible();
    });
  };

  return (
    <div className="flex items-center py-4 gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {columnGroups.length > 0 ? (
            <>
              <DropdownMenuLabel>Column Groups</DropdownMenuLabel>
              {columnGroups.map((group: ColumnGroup) => {
                const allVisible = isGroupVisible(group.id);

                const isPartiallyVisible =
                  !allVisible &&
                  group.columns.some((colId: string) => {
                    const column = table.getColumn(colId);
                    return column?.getIsVisible();
                  });

                return (
                  <DropdownMenuCheckboxItem
                    key={group.id}
                    checked={allVisible}
                    onCheckedChange={(value) =>
                      toggleColumnGroup(group.id, !!value)
                    }
                    className="capitalize font-medium"
                  >
                    {group.title}
                    {isPartiallyVisible && " (partial)"}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </>
          ) : (
            table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {onExport && (
        <Button
          variant="outline"
          className={!hasSelection ? "opacity-50 cursor-not-allowed" : ""}
          disabled={!hasSelection}
          onClick={() => onExport(table.getSelectedRowModel().rows)}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      )}

      {onDelete && (
        <Button
          variant="destructive"
          className={!hasSelection ? "opacity-50 cursor-not-allowed" : ""}
          disabled={!hasSelection}
          onClick={() => onDelete(table.getSelectedRowModel().rows)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      )}
    </div>
  );
}
