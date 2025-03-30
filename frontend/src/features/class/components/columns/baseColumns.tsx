import { Button } from "@/components/ui/button";
import { StudentType } from "@/types/student";
import { createSelectionColumn } from "@/widgets/data-table/utils/column";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const createBaseColumns = (): ColumnDef<StudentType, unknown>[] => {
  return [
    createSelectionColumn<StudentType>(),
    {
      accessorKey: "student_id",
      id: "ID",
      enableHiding: false,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "first_name",
      id: "firstName",
      enableHiding: false,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {"Given Name(s)"}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "last_name",
      id: "lastName",
      enableHiding: false,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {"Surname(s)"}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "nickname",
      header: "Nickname",
      id: "nickname",
      enableHiding: false,
    },
    // {
    //   id: "fullName",
    //   accessorFn: (row) => ({
    //     firstName: row.first_name,
    //     lastName: row.last_name,
    //     nickname: row.nickname,
    //   }),
    //   header: "Full Name",
    //   cell: ({ getValue }) => {
    //     const value = getValue() as {
    //       firstName: string;
    //       lastName: string;
    //       nickname: string;
    //     };
    //     return (
    //       <div>
    //         {value.firstName} {value.lastName}
    //         {value.nickname && (
    //           <span className="text-gray-500 ml-2">({value.nickname})</span>
    //         )}
    //       </div>
    //     );
    //   },
    //   enableHiding: false,
    // },
  ];
};
