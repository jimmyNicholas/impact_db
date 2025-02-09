import { ColumnDef } from "@tanstack/react-table";
import { StudentRowType } from "@/types/student";
import { basicInfoColumns } from "./basicInfoColumns";
//import { statusColumns } from "./statusColumns";
import { resultColumns } from "./resultColumns";

export { basicInfoColumns } from "./basicInfoColumns";
export { statusColumns } from "./statusColumns";
export { resultColumns } from "./resultColumns";

export const allColumns: ColumnDef<StudentRowType>[] = [
  ...basicInfoColumns,
  //...statusColumns,
  ...resultColumns,
];

export default allColumns;