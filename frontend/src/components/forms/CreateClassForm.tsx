import { useClassForm } from "@/hooks/useClassForm";
import { useCourseTypes } from "@/hooks/useCourseTypes";

interface CreateClassFormProps {
  refetchClasses: () => void;
}

const CreateClassForm = ({ refetchClasses }: CreateClassFormProps) => {
  const {
    courseTypes,
    loading: loadingCourseTypes,
    error: courseTypesError,
  } = useCourseTypes();

  const { submitAction } = useClassForm({
    onSuccess: () => {
      refetchClasses();
      const modal = document.getElementById(
        "add_new_class_modal"
      ) as HTMLDialogElement;
      if (modal) modal.close();
    },
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
      <form action={submitAction}>
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box grid grid-cols-3">
        <legend className="fieldset-legend">Add New Class</legend>

        <select className="select w-full" id="course" name="course" required>
          <option value="">Select Course</option>
          {defaultCourses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          className="select w-full"
          id="courseType"
          name="courseType"
          required
        >
          <option value="">Select course type</option>
          {courseTypeItems.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <input
          className="input w-full"
          id="className"
          name="className"
          placeholder="Class Name"
          required
        />

        <input
          className="input w-full"
          id="teacherOne"
          name="teacherOne"
          placeholder="Mon-Wed Teacher"
        />

        <input
          className="input w-full"
          id="teacherTwo"
          name="teacherTwo"
          placeholder="Thurs-Fri Teacher"
        />

        <button className="btn btn-success w-full" type="submit">Create</button>
       
      </fieldset>
      </form>
    </>
  );
};

export default CreateClassForm;

const defaultCourses = ["Extreme English", "General English"];

const defaultCourseTypes = [
  {
    id: 1,
    name: "Cambridge",
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
