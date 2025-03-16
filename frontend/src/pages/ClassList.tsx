import { deleteClass, getClasses } from "@/api/services/class.service";
import CreateClassForm from "@/components/forms/CreateClassForm";
import { transformToSlug } from "@/components/navigation/classSearch";
import NavTop from "@/components/navigation/nav-top";
import { DataTable } from "@/components/tables/data-table";
import { StudentType } from "@/types/student";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

interface ClassRowType {
  id: number;
  course: string;
  class_name: string;
  teacher_one: string;
  teacher_two: string;
  students: StudentType[];
}

const ClassList = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });
  console.log(classes);

  const columns: ColumnDef<ClassRowType, unknown>[] = [
    {
      accessorKey: "course",
      header: "Course",
    },
    {
      accessorKey: "class_name",
      header: "Class",
    },
    {
      accessorKey: "teacher_one",
      header: "Mon-Wed Teacher",
    },
    {
      accessorKey: "teacher_two",
      header: "Thu-Fri Teacher",
    },
    {
      accessorKey: "students",
      header: "Students",
      cell: ({ row }) => <div>{row.original.students.length}</div>,
    },
    {
      id: "view",
      cell: ({ row }) => {
        const slug = transformToSlug(row.original.class_name);
        return (
          <div className="py-1 text-center cursor-pointer rounded-lg bg-green-300 hover:bg-green-200">
            <Link to={`/class/${slug}`}>View</Link>
          </div>
        );
      },
    },
    {
      id: "delete",
      cell: ({ row }) => (
        <div
          className="py-1 text-center cursor-pointer rounded-lg bg-red-300 hover:bg-red-200"
          onClick={() => deleteClass(row.original.id)}
        >
          Del
        </div>
      ),
    },
  ];

  return (
    <div>
      <NavTop />
      <CreateClassForm getClasses={getClasses} />
      <div className="grid gap-2 p-4 bg-blue-200">
        <DataTable columns={columns} data={classes} />
      </div>
    </div>
  );
};

export default ClassList;
