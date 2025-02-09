import { ColumnDef, Row } from "@tanstack/react-table";
import EditableCell from "@/components/tables/StudentTable/components/EditableCell";
import { createResult, updateResult } from "@/api/services/result.service";
import { DropdownFilterHeader } from "@/components/tables/StudentTable/components/headerFilters";
import { StudentRowType } from "@/types/student";

interface SaveParams {
    row: Row<StudentRowType>;
    column: keyof StudentRowType;
    value: string;
  }

const skills = [
  "grammar",
  "vocabulary",
  "reading",
  "writing",
  "speaking",
  "listening",
  "pronunciation",
] as const;

export const resultColumns: ColumnDef<StudentRowType, unknown>[] = [
    {
      accessorKey: "week",
      header: ({ column }) => (
        <div className="flex">
          {DropdownFilterHeader(column, "Week")}
        </div>
      ),
      filterFn: 'equals',
    },
    ...skills.map((skill) => ({
      accessorKey: skill,
      header: String(skill[0]).toUpperCase() + String(skill).slice(1),
      cell: ({ row }: { row: Row<StudentRowType> } ) => {
        const value = row.original[skill as keyof StudentRowType];
        return (
          <EditableCell
            initialValue={value?.toString() || ""}
            row={row}
            column={skill}
            onSave={async ({ row, column, value }: SaveParams) => {
              const basePayload = {
                student_id: row.original.student_id,
                week: row.original.week,
                [column]: value,
              };
  
              try {
                let success;
                if (row.original[column] === null) {
                  const createPayload = {
                    ...basePayload,
                    first_name: row.original.first_name,
                    last_name: row.original.last_name,
                    nickname: row.original.nickname,
                  };
                  success = await createResult(createPayload);
                } else if (!row.original.id) {
                  success = await updateResult(row.original.id, basePayload);
                }
  
                if (!success) {
                  throw new Error("Failed to save changes");
                }
                return true;
              } catch (error) {
                console.error("Error saving result:", error);
                throw error;
              }
            }}
          />
        );
      },
    })),
  ];
