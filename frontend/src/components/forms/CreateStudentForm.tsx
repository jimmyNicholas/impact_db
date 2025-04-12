import { useActionState } from "react";
import { StudentDataProps } from "@/types/student";

interface CreateStudentFormProps {
  classId: number;
  handleStudentAdded: (newStudent: StudentDataProps) => Promise<void>;
  onSuccess: () => void;
}

const CreateStudentForm = ({
  classId,
  handleStudentAdded,
  onSuccess,
}: CreateStudentFormProps) => {

  const [error, submitAction] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      try {
        const studentId = formData.get("studentId") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const nickname = formData.get("nickname") as string;
        const startDate = formData.get("startDate") as string;
        console.log(formData, studentId);
        
        if (!studentId || !firstName || !lastName || !startDate) {
          return "Please fill in all fields";
        }

        await handleStudentAdded({
          student_id: studentId,
          first_name: firstName,
          last_name: lastName,
          nickname: nickname,
          start_date: startDate,
          current_class: classId,
        }).then(onSuccess);

        return null;
      } catch (error) {
        return error instanceof Error ? error.message : "An error occurred";
      }
    },
    null
  );

  const fields = [
    {
      id: "studentId",
      label: "Student ID",
      required: true,
    },
    {
      id: "firstName",
      label: "First Name",
      required: true,
    },
    {
      id: "lastName",
      label: "Last Name",
      required: true,
    },
    {
      id: "nickname",
      label: "Nickname",
      required: false,
    },
  ];

  return (
    <div className="p-2 bg-slate-200 border rounded-lg mx-4">
      <form action={submitAction}>
        {error && <p className="error">{error}</p>}
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box grid grid-cols-3">
          <legend className="fieldset-legend">Add New Student</legend>

          {fields.map((field) => (
            <input
              key={field.id}
              name={field.id}
              id={field.id}
              placeholder={field.label}
              required={field.required}
              className="input"
            />
          ))}

          <input
            name={"startDate"}
            id={"startDate"}
            type={"date"}
            required={true}
            className="input"
          />

          <button className="btn btn-success w-full" type="submit">
            Create
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateStudentForm;
