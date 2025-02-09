import { useActionState } from "react";
import api from "@/api/config";
import SubmitButton from "@/components/common/buttons/Submit";


interface CreateStudentFormProps {
  classId: number;
  getClass: () => void;
}

const CreateStudentForm = ({ classId, getClass }: CreateStudentFormProps) => {
  const [error, submitAction] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      try {
        const studentId = formData.get("studentId") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const nickname = formData.get("nickname") as string;
        if (!studentId || !firstName || !lastName) {
          return "Please fill in all fields";
        }

        const res = await api.post("/api/student/", {
          student_id: studentId,
          first_name: firstName,
          last_name: lastName,
          nickname: nickname,
          current_class: classId,
        });
        if (res.status === 201) {
          getClass();
          return null;
        }

        return "Failed to create student";
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
    <form action={submitAction}>
      <h1>Create New Student</h1>
      {error && <p className="error">{error}</p>}
      {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}:</label>
            <input
              className="border-2"
              id={field.id}
              name={field.id}
              required={field.required}
            />
            <br />
          </div>
        ))}
      <SubmitButton label={"Create Student"} />
    </form>
  );
};

export default CreateStudentForm;
