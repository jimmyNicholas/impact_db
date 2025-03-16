import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    label: string;
}

const SubmitButton = ({label}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button className="bg-green-300 rounded-lg" type="submit" disabled={pending}>
      {label}
    </button>
  );
};

export default SubmitButton;
