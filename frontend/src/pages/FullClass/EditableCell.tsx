import { type Row } from '@tanstack/react-table';
import { useState } from 'react';
import { ResultType } from './columns';

interface EditableCellProps {
  initialValue: string;
  row: Row<ResultType>;
  column: keyof ResultType;
  onSave: (params: { 
    row: Row<ResultType>; 
    column: keyof ResultType; 
    value: string;
    originalData: ResultType;
  }) => void;
}

const EditableCell = ({ initialValue, row, column, onSave }: EditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    if (value !== initialValue) {
      onSave?.({ 
        row, 
        column, 
        value,
        originalData: row.original
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
    if (e.key === 'Escape') {
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
      {value}
    </div>
  );
};

export default EditableCell;