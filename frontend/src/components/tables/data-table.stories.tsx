import type { Meta, StoryObj } from "@storybook/react";

import { DataTable } from "./data-table";
import { Checkbox } from "../ui/checkbox";

const meta = {
  component: DataTable,
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
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
      {
        accessorKey: "col_1",
        header: "Col 1",
      },
      {
        accessorKey: "col_2",
        header: "Col 2",
      },
    ],
    data: [
      {
        col_1: 'row 1',
        col_2: 'row 1' 
      },
      {
        col_1: 'row 2',
        col_2: 'row 2' 
      },
      {
        col_1: 'row 3',
        col_2: 'row 3' 
      }
    ],
  },
};

export const StudentTable: Story = {
  args: {
    columns: [
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
      {
        accessorKey: "student_id",
        header: "ID",
      },
      {
        id: "fullName",
        accessorFn: (row: any) => ({
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
    ],
    data: [
      {
        id: 1,
        student_id: "20000",
        first_name: "Jane",
        last_name: "Doe",
        nickname: "J",
        current_class: 1,
        start_date: "2025-01-13",
        participation: "",
        teacher_comments: "",
        level_up: "",
        is_active: true,
        results: [
          {
            id: 1,
            student_id: "20000",
            first_name: "Jane",
            last_name: "Doe",
            nickname: "J",
            week: "1",
            grammar: "45",
            vocabulary: "55",
            reading: "67",
            writing: "B",
            speaking: "B",
            listening: null,
            pronunciation: null,
          },
          {
            id: 3,
            student_id: "20000",
            first_name: "Jane",
            last_name: "Doe",
            nickname: "J",
            week: "2",
            grammar: null,
            vocabulary: null,
            reading: null,
            writing: "C",
            speaking: null,
            listening: null,
            pronunciation: null,
          },
        ],
      },
      {
        id: 2,
        student_id: "23030",
        first_name: "Dave",
        last_name: "Spice",
        nickname: "",
        current_class: 1,
        start_date: "2025-01-06",
        participation: "",
        teacher_comments: "",
        level_up: "",
        is_active: true,
        results: [
          {
            id: 2,
            student_id: "23030",
            first_name: "Dave",
            last_name: "Spice",
            nickname: "",
            week: "1",
            grammar: null,
            vocabulary: "50",
            reading: null,
            writing: null,
            speaking: null,
            listening: null,
            pronunciation: null,
          },
        ],
      },
      {
        id: 3,
        student_id: "24245",
        first_name: "Lu",
        last_name: "Ra",
        nickname: "La La",
        current_class: 1,
        start_date: '2025-02-14',
        participation: "",
        teacher_comments: "",
        level_up: "",
        is_active: true,
        results: [],
      },
      {
        id: 4,
        student_id: "22334",
        first_name: "Earl",
        last_name: "Set",
        nickname: "",
        current_class: 1,
        start_date: '2025-02-14',
        participation: "",
        teacher_comments: "",
        level_up: "",
        is_active: true,
        results: [],
      },
    ],
  },
};

export const ResultsTable: Story = {
  args: {
    columns: [
      {
        accessorKey: "skill",
        header: "Week",
      },
      {
        accessorKey: "week_1",
        header: "1",
      },
      {
        accessorKey: "week_2",
        header: "2",
      },
      {
        accessorKey: "week_3",
        header: "3",
      },
      {
        accessorKey: "week_4",
        header: "4",
      },
      {
        accessorKey: "week_5",
        header: "5",
      },
      {
        accessorKey: "week_6",
        header: "6",
      },
      {
        accessorKey: "week_7",
        header: "7",
      },
      {
        accessorKey: "week_8",
        header: "8",
      },
      {
        accessorKey: "week_9",
        header: "9",
      },
      {
        accessorKey: "week_10",
        header: "10",
      },
    ],
    data: [
      {
        skill: "Grammar",
        week_1: 88,
        week_2: 69,
        week_3: 75,
        week_4: 88,
      },
      {
        skill: "Vocabulary",
        week_1: 94,
        week_2: 94,
        week_3: 94,
        week_4: 100,
      },
      {
        skill: "Listening",
        week_1: 54,
        week_2: "NA",
        week_3: 42,
        week_4: "NA",
      },
      {
        skill: "Reading",
        week_1: "NA",
        week_2: 50,
        week_3: "NA",
        week_4: 60,
      },
      {
        skill: "Writing",
        week_1: 88,
        week_2: 69,
        week_3: 75,
        week_4: 88,
      },
      {
        skill: "Speaking",
        week_1: 94,
        week_2: 94,
        week_3: 94,
        week_4: 100,
      },
      {
        skill: "Pronunciation",
        week_1: 54,
        week_2: "NA",
        week_3: 42,
        week_4: "NA",
      },
    ],
  },
};
