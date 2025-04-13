import { ColumnDef, Row } from "@tanstack/react-table";
import { SelectionHeaderCell } from "@/widgets/data-table/components/cell/selection/SelectionHeaderCell";
import { SelectionRowCell } from "@/widgets/data-table/components/cell/selection/SelectionRowCell";
import { useEffect, useState } from "react";
import { EditableCell } from "@/widgets/data-table/components/EditableCell"

export const createSelectionColumn = <T,>(style: string): ColumnDef<T, unknown> => {
  return {
    id: "select",
    meta: {
      className: style, 
    },
    header: ({ table }) => <SelectionHeaderCell table={table} />,
    cell: ({ row }) => <SelectionRowCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  };
}

export interface createEditableColumnProps<T> {
  header: string,
  id: string,
  type?: 'default' | 'grade' | 'date' | 'text-field' | undefined;
  handleSave: (value: string, row: Row<T>, columnId: string) => void;
  getValue: (row: Row<T>, columnId: string) => string;
  meta?: { className?: string };
}

export const createEditableColumn = <T,>({
    header,
    id,
    type = 'default',
    handleSave,
    getValue,
    meta,
  }: createEditableColumnProps<T>): ColumnDef<T, unknown> => {

    const formatDate = (value: string | number): string => {
      if (typeof value === 'string') {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString();
        }
      }
      return String(value);
    };

    const inputVarients = {
      'default': {
        type: "text" as const,
        className: 'w-24',
      },
      'grade': {
          maxChars: 3,
          type: "text" as const,
          className: 'w-10',
      },
      'date': {
          type: "date" as const,
          className: 'w-48',
          formatter: formatDate,
      },
      'text-field': {
          maxChars: 1000,
          type: "textarea" as const,
          className: 'w-64',
          align: 'text-left' as const,
          noOverflow: true
      },
    };
  
    const variant = inputVarients[type];

    return {
      header,
      id,
      meta,
      cell: ({ row, column }) => {
        
        const initialValue = getValue(row, column.id);
        const [value, setValue] = useState(initialValue);
        const [isEditing, setIsEditing] = useState<boolean>(false);

        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        const onSave = () => {
          handleSave(value, row, column.id)
          setIsEditing(false)
        }

        return (
          <EditableCell onSave={onSave} className={'className' in variant ? variant.className : ''}>
            {!isEditing ? (
              <EditableCell.Display
                value={value}
                formatter={'formatter' in variant ? variant.formatter : undefined}
                onClick={() => setIsEditing(true)}
              />
            ) : (
              <>
                <EditableCell.Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onSave}
                  type={variant.type}
                  maxChars={'maxChars' in variant ? variant.maxChars : undefined}
                />
              </>
            )}
          </EditableCell>
        );
      },
    };
  };