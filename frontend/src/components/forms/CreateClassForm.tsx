import SubmitButton from "@/components/common/buttons/Submit";
import { useClassForm } from "@/hooks/useClassForm";

interface CreateClassFormProps {
  getClasses: () => void;
}

const CreateClassForm = ({ getClasses }: CreateClassFormProps) => {
  const courses = ["Extreme English", "General English"];

  const { error, submitAction } = useClassForm({ 
    onSuccess: getClasses, 
    mode: 'create' 
  });

  return (
    <>
      <h1>Create New Class</h1>
      <form action={submitAction} className="grid grid-cols-4">
        {error && <p className="error">{error}</p>}
        <label htmlFor="course">Course:</label>
        <select className="border-2" id="course" name="course" required>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
        <label htmlFor="className">Class:</label>
        <input className="border-2" id="className" name="className" required />
        <label htmlFor="teacherOne">Teacher One:</label>
        <input className="border-2" id="teacherOne" name="teacherOne" />
        <label htmlFor="teacherTwo">Teacher Two:</label>
        <input className="border-2" id="teacherTwo" name="teacherTwo" />
        <SubmitButton label={"Create Class"} />
      </form>
    </>
  );
};

export default CreateClassForm;
