import { useState, useEffect } from "react";
import CreateClassForm from "@/components/forms/CreateClassForm";
import "react-data-grid/lib/styles.css";
import ClassApiHooks from "@/api/useClassApi";
import ClassTable from "@/components/tables/ClassTable";

function ClassDirectory() {
  const [showForm, setShowForm] = useState(false);
  //const [editingId, setEditingId] = useState<number | null>(null);

  const { classes, getClasses } = ClassApiHooks();

  useEffect(() => {
    getClasses();
  }, []);

  // useEffect(() => {
  //   setRows(createRows(classes));
  // }, [classes]);

  // const handleRowsChange = async (newRows: any, { indexes }: any) => {
  //   setRows(newRows);

  //   const changedRow = newRows[indexes[0]];
  //   const changedId = changedRow.id;

  //   const data = {
  //     course: changedRow.course,
  //     class_name: changedRow.className,
  //     teacher_one: changedRow.teacherOne,
  //     teacher_two: changedRow.teacherTwo,
  //   };

  //   try {
  //     const res = await updateClass(changedId, data);
  //     if (!res) {
  //       throw new Error("Failed to update class");
  //     }
  //     getClasses();
  //   } catch (error) {
  //     console.error("Error updating class:", error);
  //     setRows(createRows(classes));
  //   }
  // };

  // const columns = [
  //   {
  //     key: "course",
  //     name: "Course",
  //     renderEditCell: textEditor,
  //     sortable: true,
  //     width: 180,
  //   },
  //   {
  //     key: "className",
  //     name: "Class",
  //     renderEditCell: textEditor,
  //     sortable: true,
  //     width: 120,
  //   },
  //   {
  //     key: "teacherOne",
  //     name: "M-W Teacher",
  //     renderEditCell: textEditor,
  //     sortable: true,
  //     width: 180,
  //   },
  //   {
  //     key: "teacherTwo",
  //     name: "Th-F Teacher",
  //     renderEditCell: textEditor,
  //     sortable: true,
  //     width: 180,
  //   },
  //   {
  //     key: "numberOfStudents",
  //     name: "Students",
  //     sortable: true,
  //     width: 80,
  //   },
  //   {
  //     key: "view",
  //     name: "View",
  //     width: 80,
  //   },
  //   {
  //     key: "save",
  //     name: "Save",
  //     width: 80,
  //   },
  //   {
  //     key: "delete",
  //     name: "Delete",
  //     width: 80,
  //   },
  // ];

  // function rowKeyGetter(row: any) {
  //   return row.id;
  // }

  return (
    <div className="">
      {/* List of current classes */}
      {/* <div>
        <h2>Classes</h2>
        {classes.map((classProp, index) => (
          <div className="border-2 grid grid-cols-7 text-center" key={index}>
            {editingId === classProp.id ? (
              <form action={submitAction} className="contents">
                {error && <p className="error">{error}</p>}
                <div>
                  <select
                    name="course"
                    defaultValue={classProp.course}
                    className="border-2 w-full"
                    required
                  >
                    {courseChoices.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    name="className"
                    defaultValue={classProp.class_name}
                    className="border-2 w-full"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <input
                    type="text"
                    name="teacherOne"
                    defaultValue={classProp.teacher_one}
                    className="border-2 w-full"
                  />
                  <input
                    type="text"
                    name="teacherTwo"
                    defaultValue={classProp.teacher_two}
                    className="border-2 w-full"
                  />
                </div>
                <div>
                  <p>Students: {classProp.students.length}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleNavigation(classProp.class_name, e)}
                >
                  Go
                </button>
                <SubmitButton label="Save" />
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p>{classProp.course}</p>
                <p>{classProp.class_name}</p>
                <p>
                  {classProp.teacher_one} {classProp.teacher_two ? "and" : ""}{" "}
                  {classProp.teacher_two}
                </p>
                <p>Students: {classProp.students.length}</p>
                <button
                  onClick={(e) => handleNavigation(classProp.class_name, e)}
                >
                  Go
                </button>
                <button onClick={() => setEditingId(classProp.id)}>Edit</button>
                <button onClick={() => deleteClass(classProp.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
        */}
      <div className="grid space-y-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {showForm ? "Hide Form" : "Create New Class"}
        </button>

        {showForm && <CreateClassForm getClasses={getClasses} />}
      </div>

      {/* {rows ? (
        <DataGrid
          className="fill-grid"
          columns={columns}
          rows={rows}
          onRowsChange={handleRowsChange}
          rowKeyGetter={rowKeyGetter}
        />
      ) : null} */}

      <ClassTable classes={classes} />
    </div>
  );
}

export default ClassDirectory;
