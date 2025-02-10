import { getClass } from "@/api/services/class.service";
import { useParams } from "react-router-dom";
import ClassTable from "@/components/students/page";
import { useQuery } from "@tanstack/react-query";
import ClassSearch, { transformFromSlugToApi } from "@/components/navigation/classSearch";

export default function Class() {
  
  const { className: slugParam } = useParams();
  if (!slugParam) return <div>Class name is required</div>;
  const apiClassName = transformFromSlugToApi(slugParam);

  const {
    data: classData,
    status,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["class", apiClassName!],
    queryFn: () => getClass(apiClassName!),
    enabled: !!apiClassName,
  });


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto py-10">
      <ClassSearch/>
      {classData ? (
        <div className="grid grid-flow-col bg-slate-400 p-4">
          <h1>
            {"Course: "} {classData.course}
          </h1>

          <h1>
            {"Class: "} {classData.class_name}
          </h1>
          <h1>
            {"Teachers: "}{" "}
            {classData.teacher_one + " and " + classData.teacher_two}
          </h1>

          <h1>
            {"Students:"} {classData.students.length}
          </h1>
        </div>
      ) : null}

      {classData ? <ClassTable classData={classData} /> : null}
    </div>
  );
}
