import SubmitButton from "@/components/common/buttons/Submit";
import { useClassForm } from "@/hooks/useClassForm";
import { useCourseTypes } from "@/hooks/useCourseTypes";

interface CreateClassFormProps {
  getClasses: () => void;
}

const CreateClassForm = ({ getClasses }: CreateClassFormProps) => {
  const {
    courseTypes,
    loading: loadingCourseTypes,
    error: courseTypesError,
  } = useCourseTypes();
  const { error, submitAction } = useClassForm({
    onSuccess: getClasses,
    mode: "create",
  });

  if (loadingCourseTypes) {
    return <div>Loading course types...</div>;
  }

  if (courseTypesError) {
    return (
      <div className="text-red-500">
        Error loading course types: {courseTypesError}
      </div>
    );
  }

  const courseTypeItems = courseTypes || defaultCourseTypes;

  return (
    <>
      <form
        action={submitAction}
        className="grid grid-cols-4 p-4 bg-violet-100"
      >
        {error && <p className="error">{error}</p>}
        <label htmlFor="course" className="self-center">
          Course:
        </label>
        <select className="border-2" id="course" name="course" required>
          {defaultCourses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
        <label htmlFor="courseType" className="self-center">
          Course Type:
        </label>
        <select
          className="border-2 p-2 rounded"
          id="courseType"
          name="courseType"
          required
        >
          <option value="">Select course</option>
          {courseTypeItems.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
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

const defaultCourses = ["Extreme English", "General English"];

const defaultCourseTypes = [
  {
    id: 1,
    name: "GGGCambridge",
    description: "Cambridge English exams",
  },
  {
    id: 2,
    name: "IELTS/EAP",
    description: "IELTS preparation",
  },
  {
    id: 3,
    name: "General English",
    description: "For GE classes",
  },
  {
    id: 4,
    name: "Business English",
    description: "For business English classes",
  },
  {
    id: 5,
    name: "Foundation",
    description: "For Extreme English Foundation classes",
  },
  {
    id: 6,
    name: "Excel",
    description: "For Extreme English Excel classes",
  },
];
