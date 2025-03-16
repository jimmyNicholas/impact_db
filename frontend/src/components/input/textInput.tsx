interface FieldProps {
  id: string;
  required?: boolean;
  label?: string;
}

const TextInput = (props: FieldProps) => {
  return (
    <input
      key={props.id}
      className="border-2 h-full"
      id={props.id}
      name={props.id}
      required={props.required}
      placeholder={props.label}
    />
  );
};

export default TextInput;
