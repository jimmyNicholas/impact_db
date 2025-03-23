export interface EditableProps {
  onSave: (value: string) => void;
  children: React.ReactNode;
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
}

interface ActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export const Editable: React.FC<EditableProps> & {
  Display: React.FC<DisplayProps>;
  Input: React.FC<InputProps>;
  Actions: React.FC<ActionsProps>;
} = ({ children }) => {
  return <div className="border-2 w-10 text-center">{children}</div>;
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
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur ? (e) => onBlur(e.target.value) : () => {}}
      max={4}
      className="w-8"
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
