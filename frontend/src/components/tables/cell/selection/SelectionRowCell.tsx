import { Row } from "@tanstack/react-table";
import { CheckboxCell } from "../checkbox/CheckboxCell";

export interface SelectionHeaderCellProps {
  row: Row<any>;
}

export const SelectionRowCell: React.FC<SelectionHeaderCellProps> = ({
  row,
}) => {
  return (
    <CheckboxCell
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      ariaLabel="Select row"
    />
  );
};
