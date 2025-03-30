export interface EditableProps {
  onSave: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  align?: "text-left" | "text-center" | "text-right";
  noOverflow?: boolean;
}

interface DisplayProps {
  value: string | number;
  formatter?: (value: string | number) => string;
  onClick?: () => void;
}

interface InputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (newValue: string) => void;
  type: "text" | "date" | 'textarea';
  maxChars?: number;
}

interface ActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export const EditableCell: React.FC<EditableProps> & {
  Display: React.FC<DisplayProps>;
  Input: React.FC<InputProps>;
  Actions: React.FC<ActionsProps>;
} = ({ children, className = "w-32", align = "text-center", noOverflow = false}) => {
    const overflowClass = noOverflow ? "overflow-hidden" : "overflow-visible";
    const containerClass = `border-2 relative ${align} ${overflowClass} ${className}`;

  return (
    <div className={containerClass}>
      {children}
    </div>
  );
};

EditableCell.Display = ({ value, formatter, onClick }: DisplayProps) => {
  const displayValue = formatter ? formatter(value) : value;
  return <span onClick={onClick}>{displayValue}</span>;
};

EditableCell.Input = ({
  value,
  onChange,
  onBlur,
  type,
  maxChars,
}: InputProps) => {

    if (type === 'textarea') {
        return (
          <textarea
            value={value}
            onChange={onChange}
            onBlur={onBlur ? (e) => onBlur(e.target.value) : () => {}}
            maxLength={maxChars}
            rows={4}
            cols={18}
            className="w-full h-full box-border px-1 py-1 text-left text-wrap"
          />
        );
      }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur ? (e) => onBlur(e.target.value) : () => {}}
      maxLength={maxChars}
      className="w-full box-border px-1 py-0"
    />
  );
};

EditableCell.Actions = ({ onSave, onCancel }: ActionsProps) => {
  return (
    <div className="actions">
      <button onClick={onSave}>✓</button>
      <button onClick={onCancel}>✗</button>
    </div>
  );
};
