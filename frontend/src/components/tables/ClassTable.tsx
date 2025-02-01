import ClassApiHooks from "@/api/useClassApi";
import { ClassType, updateClassProps } from "@/types/class";
import { JSX, useCallback, useEffect, useState } from "react";
import DataGrid, { RowsChangeData, textEditor } from "react-data-grid";
import { useNavigate } from "react-router-dom";

interface ClassTableProps {
  classes: ClassType[];
}

interface ClassRow {
  id: number;
  course: string;
  className: string;
  teacherOne: string;
  teacherTwo: string;
  numberOfStudents: number;
  view: JSX.Element;
  delete: JSX.Element;
  //save?: JSX.Element;
}

const ClassTable: React.FC<ClassTableProps> = ({ classes }) => {
  const [rows, setRows] = useState<ClassRow[]>([]);

  const { getClasses, deleteClass, updateClass } = ClassApiHooks();

  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (className: string, e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigate(`/class/${className}`);
    },
    []
  );

  const createRows = (classes: ClassType[]) => {
    const rows = [];

    for (let i = 0; i < classes.length; i++) {
      const { id, course, class_name, teacher_one, teacher_two, students } =
        classes[i];
      rows.push({
        id,
        course,
        className: class_name,
        teacherOne: teacher_one,
        teacherTwo: teacher_two,
        numberOfStudents: students.length,
        view: (
          <button onClick={(e) => handleNavigation(class_name, e)}>Go</button>
        ),
        //save: <SubmitButton label="Save" />,
        delete: <button onClick={() => deleteClass(id)}>Delete</button>,
      });
    }

    return rows;
  };

  const handleRowsChange = async (
    newRows: ClassRow[],
    data: RowsChangeData<NoInfer<ClassRow>, unknown>
  ) => {
    setRows(newRows);

    const { indexes } = data;
    const changedRow = newRows[indexes[0]];

    const newData: updateClassProps = {
      id: changedRow.id,
      course: changedRow.course,
      class_name: changedRow.className,
      teacher_one: changedRow.teacherOne,
      teacher_two: changedRow.teacherTwo,
    };

    try {
      const res = await updateClass(newData.id, newData);
      if (!res) {
        throw new Error("Failed to update class");
      }
      getClasses();
    } catch (error) {
      console.error("Error updating class:", error);
      if (classes) setRows(createRows(classes));
    }
  };

  useEffect(() => {
    setRows(createRows(classes));
  }, [classes]);

  return (
    <>
      {rows ? (
        <DataGrid
          //className="fill-grid h-20"
          columns={columns}
          rows={rows}
          onRowsChange={handleRowsChange}
          rowKeyGetter={rowKeyGetter}
        />
      ) : null}
    </>
  );
};

const columns = [
  {
    key: "course",
    name: "Course",
    renderEditCell: textEditor,
    sortable: true,
    width: 180,
  },
  {
    key: "className",
    name: "Class",
    renderEditCell: textEditor,
    sortable: true,
    width: 120,
  },
  {
    key: "teacherOne",
    name: "M-W Teacher",
    renderEditCell: textEditor,
    sortable: true,
    width: 180,
  },
  {
    key: "teacherTwo",
    name: "Th-F Teacher",
    renderEditCell: textEditor,
    sortable: true,
    width: 180,
  },
  {
    key: "numberOfStudents",
    name: "Students",
    sortable: true,
    width: 80,
  },
  {
    key: "view",
    name: "View",
    width: 80,
  },
//   {
//     key: "save",
//     name: "Save",
//     width: 80,
//   },
  {
    key: "delete",
    name: "Delete",
    width: 80,
  },
];

function rowKeyGetter(row: ClassRow) {
  return row.id;
}

export default ClassTable;
