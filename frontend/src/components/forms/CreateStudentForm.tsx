import { useActionState } from "react";
import { createStudent } from "@/api/services/student.service";
import TextInput from "../input/textInput";
import { Button } from "../button/Button";

interface CreateStudentFormProps {
  classId: number;
  onSuccess: () => void;
}

const CreateStudentForm = ({ classId, onSuccess }: CreateStudentFormProps) => {
  const [error, submitAction] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      try {
        const studentId = formData.get("studentId") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const nickname = formData.get("nickname") as string;
        const startDate = formData.get("startDate") as string;
        if (!studentId || !firstName || !lastName || !startDate) {
          return "Please fill in all fields";
        }

        createStudent({
          student_id: studentId,
          first_name: firstName,
          last_name: lastName,
          nickname: nickname,
          start_date: startDate,
          current_class: classId,
        });

        // if (res) {
        //   //getClass();
        //   onSuccess();
        //   return null;
        // }
        onSuccess();
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
    <div className="p-4 bg-slate-200 border rounded-lg">
      <form action={submitAction}>
        {error && <p className="error">{error}</p>}
        <div className="grid grid-cols-6 gap-1">
          {fields.map((field) => (
            <TextInput
              key={field.id}
              id={field.id}
              label={field.label}
              required={field.required}
            />
          ))}
          <input
            name={'startDate'}
            id={'startDate'}
            type={'date'}
            required={true}
          />
          <Button type="submit" variant="success" label="Add Student" />
        </div>
      </form>
    </div>
  );
};

export default CreateStudentForm;
