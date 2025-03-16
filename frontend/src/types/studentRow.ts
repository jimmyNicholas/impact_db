import { StudentType } from "./student";


export type StudentRowType = StudentType & {
  [key: string]: any;
};