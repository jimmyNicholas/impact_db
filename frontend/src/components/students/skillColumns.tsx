import { ColumnDef } from "@tanstack/react-table";
import { StudentRowType } from "@/components/students/types";
import EditableCell from "@/components/students/components/EditableCell";
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

export const skillColumns: ColumnDef<StudentRowType, unknown>[] = skills.map(
  (skill) => {
    return {
      accessorKey: skill,
      header: String(skill[0]).toUpperCase() + String(skill).slice(1),
      cell: ({ row }) => {
        const value = row.original[skill as keyof StudentRowType];
        return (
          <EditableCell
            initialValue={value?.toString() || ""}
            row={row}
            column={skill}
            onSave={async ({ row, column, value }) => {
              const basePayload = {
                student_id: row.original.student_id,
                week: row.original.week,
                [column]: value || null,
              };
              //console.log(basePayload);

              console.log("Current row data:", row.original);
              console.log("Updating column:", column);
              console.log("New value:", value);

              try {
                //const resultId = row.original.id;

                if (row.original.resultId) {
                  await updateResult(row.original.id, basePayload);
                } else {
                  const createPayload = {
                    ...basePayload,
                    first_name: row.original.first_name,
                    last_name: row.original.last_name,
                    ...(row.original.nickname &&
                    row.original.nickname.trim() !== ""
                      ? { nickname: row.original.nickname }
                      : {}),
                  };
                  await createResult(createPayload);
                }

                return true;
              } catch (error) {
                console.error("Error saving result:", error);
                throw error;
              }

              //   try {
              //     if (row.original[column] === null) {
              //       const createPayload = {
              //         ...basePayload,
              //         first_name: row.original.first_name,
              //         last_name: row.original.last_name,
              //         nickname: row.original.nickname,
              //       };
              //       console.log('creating result: ' + createPayload);

              //       await createResult(createPayload);
              //     } else if (!row.original.id) {
              //         console.log('updating result: ' + basePayload);
              //       await updateResult(row.original.id, basePayload);
              //     }
              //   } catch (error) {
              //     console.error("Error saving result:", error);
              //     throw error;
              //   }
            }}
          />
        );
      },
    };
  }
);
