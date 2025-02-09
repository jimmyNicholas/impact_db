import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { StudentRowType } from "@/types/student";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { ResultType } from "@/types/result";

export const SortHeader = (column: Column<StudentRowType>, label?: string) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label ? label : null}
      <ArrowUpDown
        className="h-4 w-4 "
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    </Button>
  );
};

export function TextFilterHeader(
  column: Column<StudentRowType>,
  style?: string,
  placeHolder?: string
) {
  return (
    <Input
      placeholder={placeHolder ? placeHolder : "Filter..."}
      value={(column.getFilterValue() as string) ?? ""}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className={style}
    />
  );
}

export const DropdownFilterHeader = (
  column: Column<StudentRowType> | Column<ResultType>,
  label: string
) => {
  useEffect(() => {
    if (!column.getFilterValue()) {
      column.setFilterValue("1");
    }
  }, [column]);
  return (
    <Select
      value={(column.getFilterValue() as string) ?? ""}
      onValueChange={(value) => column.setFilterValue(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {[...Array(10).keys()].map((index) => (
          <SelectItem key={index + 1} value={String(index + 1)}>
            Week {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
