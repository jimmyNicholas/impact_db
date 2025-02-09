"use client";

import { useEffect, useState } from "react";
import type { Row } from "@tanstack/react-table";
import { StudentRowType } from "@/components/students/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditableCellProps {
  initialValue: string;
  row: Row<StudentRowType>;
  column: keyof StudentRowType;
  onSave: (params: {
    row: Row<StudentRowType>;
    column: keyof StudentRowType;
    value: string;
    originalData: StudentRowType;
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: {
      row: Row<StudentRowType>;
      column: keyof StudentRowType;
      value: string;
      originalData: StudentRowType;
    }) => {
      console.log('Mutation started with params:', params);
      const result = await onSave(params);
      console.log('Mutation completed with result:', result);
      return result;
    },
    onSuccess: () => {
      console.log('Mutation succeeded, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ["class"] });
    },
    onError: (error) => {
      console.error('Mutation failed:', error);
    }
  });

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleClick = () => {
    setEditing(true);
  };

  //   const handleBlur = () => {
  //     setEditing(false)
  //     if (value !== initialValue) {
  //       onSave({
  //         row,
  //         column,
  //         value,
  //         originalData: row.original,
  //       })
  //     }
  //   }

  const handleBlur = async () => {
    setEditing(false);
    if (value !== initialValue) {
      try {
        await mutation.mutateAsync({
          row,
          column,
          value,
          originalData: row.original,
        });
      } catch (error) {
        // Revert to initial value on error
        setValue(initialValue);
        console.error("Failed to save:", error);
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
      {mutation.isPending ? "Saving..." : value || "-"}
    </div>
  );
};

export default EditableCell;
