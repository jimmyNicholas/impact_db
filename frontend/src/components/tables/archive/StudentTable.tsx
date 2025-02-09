import useStudentApi from "@/api/useStudentApi";
import { StudentType, updateStudentProps } from "@/types/student";
import { JSX, useEffect, useState } from "react";
import DataGrid, { RowsChangeData, textEditor } from "react-data-grid";
import { useNavigate } from "react-router-dom";

interface StudentTableProps {
  students: StudentType[];
}

interface StudentRow {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  nickname: string;
  view: JSX.Element;
  delete: JSX.Element;
  //save?: JSX.Element;
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  const [rows, setRows] = useState<StudentRow[]>([]);

  //const { getClassData, deleteClass, updateClass } = ClassApiHooks();

  const { deleteStudent, updateStudent } = useStudentApi();

  const navigate = useNavigate();

  const handleNavigation = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    navigate(`/student/${id}`);
  };

  const createRows = (students: StudentType[]) => {
    const rows = [];

    for (let i = 0; i < students.length; i++) {
      const { id, student_id, first_name, last_name, nickname } = students[i];
      rows.push({
        id,
        studentId: student_id,
        firstName: first_name,
        lastName: last_name,
        nickname,

        view: (
          <button className='bg-green-600 p-2 m-2' onClick={(e) => handleNavigation(student_id, e)}>Go</button>
        ),
        //save: <SubmitButton label="Save" />,
        delete: <button className='bg-red-600 p-2 m-2' onClick={() => deleteStudent(id)}>Delete</button>,
      });
    }

    return rows;
  };

  const handleRowsChange = async (
    newRows: StudentRow[],
    data: RowsChangeData<NoInfer<StudentRow>, unknown>
  ) => {
    setRows(newRows);

    const { indexes } = data;
    const changedRow = newRows[indexes[0]];

    const newData: updateStudentProps = {
      id: changedRow.id,
      student_id: changedRow.studentId,
      first_name: changedRow.firstName,
      last_name: changedRow.lastName,
      nickname: changedRow.nickname,
    };

    try {
      const res = await updateStudent(newData.id, newData);
      if (!res) {
        throw new Error("Failed to update class");
      }
      //getClasses();
    } catch (error) {
      console.error("Error updating class:", error);
      if (students) setRows(createRows(students));
    }
  };

  useEffect(() => {
    setRows(createRows(students));
  }, [students]);

  return (
    <>
      {rows ? (
        <DataGrid
          className="fill-grid"
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
    key: "studentId",
    name: "ID",
    renderEditCell: textEditor,
    sortable: true,
    width: 120,
  },
  {
    key: "firstName",
    name: "First Name",
    renderEditCell: textEditor,
    sortable: true,
    width: 150,
  },
  {
    key: "lastName",
    name: "Last Name",
    renderEditCell: textEditor,
    sortable: true,
    width: 150,
  },
  {
    key: "nickname",
    name: "Nickname",
    renderEditCell: textEditor,
    sortable: true,
    width: 120,
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

function rowKeyGetter(row: StudentRow) {
  return row.id;
}

export default StudentTable;
