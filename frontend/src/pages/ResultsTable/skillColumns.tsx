import { ColumnDef } from "@tanstack/react-table";
import { ResultType } from "./results-columns";
import EditableCell from "../../components/tables/StudentTable/components/EditableCell";
import { createResult, updateResult } from "@/api/services/result.service";

const skills = [
  "grammar",
  "vocabulary",
  "reading",
  "writing",
  "speaking",
  "listening",
  "pronunciation",
] as const;

export const skillColumns: ColumnDef<ResultType>[] = skills.map((skill) => {
  return {
    accessorKey: skill,
    header: String(skill[0]).toUpperCase() + String(skill).slice(1),
    cell: ({ row }) => {
      const value = row.original[skill as keyof ResultType];
      return (
        <EditableCell
          initialValue={value?.toString() || ""}
          row={row}
          column={skill}
          onSave={async ({ row, column, value }) => {
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
  };
});
