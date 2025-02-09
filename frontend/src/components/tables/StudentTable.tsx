// //types
// export interface StudentRowType {
//   id: number;
//   student_id: string;
//   first_name: string;
//   last_name: string;
//   nickname: string;
//   current_class: number;
//   start_date: string;
//   participation: string;
//   teacher_comments: string;
//   level_up: string;
//   is_active: boolean;
//   week: string;
//   grammar: string | null;
//   vocabulary: string | null;
//   reading: string | null;
//   writing: string | null;
//   speaking: string | null;
//   listening: string | null;
//   pronunciation: string | null;
// }

// // columns
// import { ColumnDef } from "@tanstack/react-table";

// export const columns: ColumnDef<StudentRowType, unknown>[] = [
//   {
//     accessorKey: "student_id",
//     header: "ID",
//   },
//   {
//     id: "fullName",
//     accessorFn: (row) => ({
//       firstName: row.first_name,
//       lastName: row.last_name,
//       nickname: row.nickname,
//     }),
//     header: "Full Name",
//     cell: ({ getValue }) => {
//       const value = getValue() as {
//         firstName: string;
//         lastName: string;
//         nickname: string;
//       };
//       return (
//         <div>
//           {value.firstName} {value.lastName}
//           {value.nickname && (
//             <span className="text-gray-500 ml-2">({value.nickname})</span>
//           )}
//         </div>
//       );
//     },
//     filterFn: (row, columnId, filterValue) => {
//       if (!filterValue) return true;
//       const value = row.getValue(columnId) as {
//         firstName: string;
//         lastName: string;
//         nickname: string;
//       };
//       const searchValue = String(filterValue).toLowerCase();
//       return !!(
//         value.firstName.toLowerCase().includes(searchValue) ||
//         value.lastName.toLowerCase().includes(searchValue) ||
//         (value.nickname && value.nickname.toLowerCase().includes(searchValue))
//       );
//     },
//   },
//   {
//     accessorKey: "start_date",
//     header: "Start Date",
//     cell: ({ row }) =>
//       new Date(row.getValue("start_date")).toLocaleDateString(),
//   },
//   {
//     accessorKey: "participation",
//     header: "Participation",
//   },
//   {
//     accessorKey: "teacher_comments",
//     header: "Comments",
//   },
//   {
//     accessorKey: "level_up",
//     header: "Level Up",
//   },
// ];


// import {
//   //ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }