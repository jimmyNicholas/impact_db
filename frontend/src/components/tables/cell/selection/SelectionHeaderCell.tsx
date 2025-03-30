import { Table } from "@tanstack/react-table";
import { CheckboxCell } from "../checkbox/CheckboxCell";

export interface SelectionHeaderCellProps {
  table: Table<any>;
}

export const SelectionHeaderCell: React.FC<SelectionHeaderCellProps> = ({
  table,
}) => {
  return (
    <CheckboxCell
      checked={table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      ariaLabel="Select all"
    />
  );
};
