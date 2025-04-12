import { StudentDataProps } from "@/types/student";
import { Modal } from "@/components/modal/Modal";
import CreateStudentForm from "@/components/forms/CreateStudentForm";

interface ActionPanelProps {
  classId: number;
  handleStudentAdded: (newStudent: StudentDataProps) => Promise<void>;
}

export const ClassPageActionPanel = ({
  ...props
}: ActionPanelProps) => {
    const modalId = 'add_new_student_modal';
    const onSuccess = () => {
        const modal = document.getElementById(
            modalId
          ) as HTMLDialogElement;
          if (modal) modal.close();
    };

  return (
    <>
      <div className="grid grid-flow-col bg-base-300 items-center my-2 gap-4 rounded-lg">
        <Modal
          buttonType="success"
          ModalBoxChild={
            <CreateStudentForm
              classId={props.classId}
              handleStudentAdded={props.handleStudentAdded}
              onSuccess={onSuccess}
            />
          }
          modalId={modalId}
        >
          <h4 className="text-nowrap">Add New Student</h4>
        </Modal>
      </div>
    </>
  );
};
