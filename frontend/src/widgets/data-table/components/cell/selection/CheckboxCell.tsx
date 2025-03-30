import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxProps {
  checked: boolean | 'indeterminate';
  onCheckedChange: (value: boolean) => void;
  ariaLabel: string;
}

export const CheckboxCell: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  ariaLabel,
}: CheckboxProps) => {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => onCheckedChange(!!value)}
      aria-label={ariaLabel}
      className="flex items-center"
    />
  );
};
