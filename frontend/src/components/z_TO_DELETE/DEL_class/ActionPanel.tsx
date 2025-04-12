// import { StudentDataProps } from "@/types/student";
// //import { Button } from "../button/Button";
// import CreateStudentForm from "../forms/CreateStudentForm";
// import { Modal } from "../modal/Modal";

// interface ActionPanelProps {
//   classId: number;
//   handleStudentAdded: (newStudent: StudentDataProps) => Promise<void>;
// }

// const ActionPanel = ({
//   ...props
// }: ActionPanelProps) => {
//   return (
//     <>
//       <div className="grid grid-flow-col items-center bg-slate-300 my-2 gap-4 rounded-lg">
//         <Modal
//           buttonType="success"
//           ModalBoxChild={
   
//             <CreateStudentForm
//               classId={props.classId}
//               handleStudentAdded={props.handleStudentAdded}
//             />
//           }
//           modalId='add_new_student_modal'
//         >
//           Add New Student
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default ActionPanel;
