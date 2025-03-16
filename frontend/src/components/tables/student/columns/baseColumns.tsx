import { StudentType } from "@/types/student";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const studentColumns: ColumnDef<StudentType, unknown>[] = [
    // Selection column
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="flex items-center"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="flex items-center"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // ID and Full Name columns
    {
      accessorKey: "student_id",
      header: "ID",
    },
    {
      id: "fullName",
      accessorFn: (row) => ({
        firstName: row.first_name,
        lastName: row.last_name,
        nickname: row.nickname,
      }),
      header: "Full Name",
      cell: ({ getValue }) => {
        const value = getValue() as {
          firstName: string;
          lastName: string;
          nickname: string;
        };
        return (
          <div>
            {value.firstName} {value.lastName}
            {value.nickname && (
              <span className="text-gray-500 ml-2">({value.nickname})</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) =>
        new Date(row.getValue("start_date")).toLocaleDateString(),
    },
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
  ];

