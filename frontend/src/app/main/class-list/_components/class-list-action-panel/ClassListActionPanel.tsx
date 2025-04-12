import CreateClassForm from "@/components/forms/CreateClassForm";
import { Modal } from "@/components/modal/Modal";

interface ActionPanelProps {
  refetchClasses: () => void;
}

export const ClassListActionPanel = ({ refetchClasses }: ActionPanelProps) => {
  return (
    <div className="collapse bg-base-100 border-base-300 border p-4">
      <Modal
        buttonType="success"
        ModalBoxChild={<CreateClassForm refetchClasses={refetchClasses} />}
        modalId="add_new_class_modal"
      >
        Add New Class
      </Modal>
    </div>
  );
};
