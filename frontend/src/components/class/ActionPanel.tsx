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
        <button
          className="p-2 bg-green-400 rounded-xl min-w-40"
          onClick={showAddStudentForm}
        >
          {studentFormShown ? "Hide Form" : "Add New Student"}
        </button>
      </div>
    </>
  );
};

export default ActionPanel;
