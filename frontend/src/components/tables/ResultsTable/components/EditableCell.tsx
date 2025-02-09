//'use client';

import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { StudentResultRow, WeeklyResult } from "@/types";

interface EditableCellProps {
  initialValue: string;
  row: Row<StudentResultRow>;
  column: keyof WeeklyResult;
  onSave: (params: {
    row: Row<StudentResultRow>;
    column: keyof WeeklyResult;
    value: string;
  }) => Promise<boolean>;
}

const EditableCell = ({
  initialValue,
  row,
  column,
  onSave,
}: EditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = async () => {
    setEditing(false);
    if (value !== initialValue) {
      try {
        await onSave({
          row,
          column,
          value,
        });
      } catch (error) {
        console.error("Failed to save:", error);
        setValue(initialValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setValue(initialValue);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="h-8 max-w-10 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        autoFocus
      />
    );
  }

  return (
    <div
      className="h-8 max-w-10 text-left font-medium cursor-pointer flex items-center"
      onClick={handleClick}
    >
      {value || "-"}
    </div>
  );
};

export default EditableCell;