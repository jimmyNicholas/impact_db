import { ColumnDef, Row } from "@tanstack/react-table";
import { Editable } from "../cell/Editable";
import { useState } from "react";

interface createEditableColumnProps<T> {
  header: string;
  id: string;
  getValue: (row: Row<T>) => string;
  onSave: (newValue: string) => void;
}

const createEditableColumn = <T,>({
  header,
  id,
  getValue, // Function to get the current value
  onSave, // Function to handle saves
}: createEditableColumnProps<T>): ColumnDef<T, unknown> => {
  return {
    header,
    id,
    cell: ({ row }) => {
      const initialValue = getValue(row);
      const [isEditing, setIsEditing] = useState(false);

      return (
        <Editable onSave={onSave}>
          {!isEditing ? (
            <Editable.Display
              value={value}
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <>
              <Editable.Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => {
                  handleAssessment(value);
                  setIsEditing(false);
                }}
              />
            </>
          )}
        </Editable>
      );
    },
  };
};
