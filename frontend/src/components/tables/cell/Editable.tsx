export interface EditableProps {
  onSave: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
}

interface DisplayProps {
  value: string | number;
  formatter?: (value: string | number) => string;
  onClick?: () => void;
}

interface InputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (newValue: string) => void;
  type?: "text" | "number";
  maxChars?: number;
}

interface ActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export const Editable: React.FC<EditableProps> & {
  Display: React.FC<DisplayProps>;
  Input: React.FC<InputProps>;
  Actions: React.FC<ActionsProps>;
} = ({ children, className = "", width=40 }) => {
  const containerClass = `border-2 text-center relative overflow-hidden ${className}`;
  const style = width ? { width } : undefined;

  return (
    <div className={containerClass} style={style}>
      {children}
    </div>
  );
};

Editable.Display = ({ value, formatter, onClick }: DisplayProps) => {
  const displayValue = formatter ? formatter(value) : value;
  return <span onClick={onClick}>{displayValue}</span>;
};

Editable.Input = ({
  value,
  onChange,
  onBlur,
  type = "text",
  maxChars = 3,
}: InputProps) => {

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

Editable.Actions = ({ onSave, onCancel }: ActionsProps) => {
  return (
    <div className="actions">
      <button onClick={onSave}>✓</button>
      <button onClick={onCancel}>✗</button>
    </div>
  );
};
