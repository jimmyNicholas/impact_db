import { AssessmentType } from "@/types/assessment";
import { StudentType } from "@/types/student";

interface FocusPointProps {
  students: StudentType[];
  assessment_types: AssessmentType[];
}

export const FocusPoint = ({ assessment_types, students }: FocusPointProps) => {
  /* 
        `assessment_types` is an array of the different assesments for the class.
        For example in GE the seven assessment types are G, V, L, R, W, S, and P.
        This allows new (and existing) classes to access the assessment names before 
        any data has been entered. 
    */
  console.log({ assessment_types });

  /* 
        `students` is an array of the different students in our class.
        The most useful part for you will be the `students[index].assessments`.
        It has all the tests they have done with things like week, value and assessment name.
    */
  console.log({ students });

  return (
    <div className=" grid justify-center items-center bg-base-300 my-2 rounded-lg">
      Focus Point
    </div>
  );
};
