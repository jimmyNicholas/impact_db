import { Button } from "@/components/z_TO_DELETE/DEL_button/Button";

interface ActionPanelProps {
  studentFormShown: boolean;
  showAddStudentForm: () => void;
}

const ActionPanel = ({
  studentFormShown,
  showAddStudentForm,

}: ActionPanelProps) => {
  return (
    <>
      <div className="grid grid-flow-col items-center bg-slate-300 p-4 my-2 gap-4 rounded-lg">
        <Button
          label={studentFormShown ? "Hide Form" : "Add New Student"}
          variant="success"
          size="xs"
          onClick={showAddStudentForm}
        />
      </div>
    </>
  );
};

export default ActionPanel;
