interface ModalProps {
  children: React.ReactNode;
  buttonType: "success";
  buttonStyle?: "";
  ModalBoxChild: React.ReactNode;
  modalId: string;
}

export const Modal = ({ ...props }: ModalProps) => {
  return (
    <div className="collapse bg-base-300 p-4">
      <button
        className={`btn btn-${props.buttonType} ${props.buttonStyle} rounded-lg`}
        onClick={() => {
          const modal = document.getElementById(
            props.modalId
          ) as HTMLDialogElement;
          if (modal) modal.showModal();
        }}
      >
        {props.children}
      </button>
      <dialog id={props.modalId} className="modal">
        <div className="modal-box max-w-3xl">
            {props.ModalBoxChild}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
