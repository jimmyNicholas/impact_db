// import { useNavigate, useParams } from "react-router-dom";
// import { ClassType } from "@/types/class";
// import api from "@/api/config";
// import { useCallback, useEffect, useState } from "react";
// import CreateStudentForm from "@/components/forms/CreateStudentForm";
// import SubmitButton from "@/components/common/buttons/Submit";
// import { useStudentOperations } from "@/hooks/useStudentOperations";
// import { courseChoices } from "@/lib/classFields";
// //import useClassApi from "@/api/useClassApi";
// import ClassTable from "@/components/tables/ClassTable";
// import StudentTable from "@/components/tables/StudentTable";
// //import useResultApi from "@/api/useResultApi";
// import ResultTable from "@/components/tables/ResultTable";

// function Class() {
//   const { className } = useParams();
//   //const [classData, setClassData] = useState<ClassType | null>(null);
//   //const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   //const [showForm, setShowForm] = useState(false);
//   //const [editingId, setEditingId] = useState<number | null>(null);

//   const { classData, getClassData } = useClassApi();
//   const { results, getResults } = useResultApi();

//   console.log(classData);
//   console.log(results);

//   useEffect(() => {
//     getClassData(className);
//     getResults(className)
//   }, [className]);

//   // const getClass = () => {
//   //   api
//   //     .get(`/api/class/${className}`)
//   //     .then((res) => res.data)
//   //     .then((data) => {
//   //       setClassData(data[0]);
//   //       console.log(data);
//   //     })
//   //     .catch((err: Error) => alert(err))
//   //     .finally(() => setLoading(false));
//   // };

//   // const { error, submitAction } = useStudentOperations({
//   //   onSuccess: getClassData(className),
//   //   setEditingId,
//   // });

//   //if (loading) return <div>Loading...</div>;
//   if (!classData) return <div>No class data found</div>;

//   const deleteStudent = (id: number) => {
//     api
//       .delete(`/api/student/${id}/`)
//       .then((res) => {
//         if (res.status === 204) console.log("student deleted");
//         else console.log("Failed to delete student.");
//         getClassData(className);
//       })
//       .catch((error) => alert(error));
//   };

//   // const getStudent = async (id: number) => {
//   //   try {
//   //     const res = await api.get(`/api/student/${id}/`);
//   //     return res.data;
//   //   } catch (error) {
//   //     console.error('Error fetching student:', error);
//   //     throw error;
//   //   }
//   // };

//   // const deleteStudent = async (id: number) => {
//   //   try {
//   //     const res = await api.delete(`/api/student/${id}/`);
//   //     if (res.status === 204) {
//   //       console.log("student deleted");
//   //       getClass();
//   //     } else {
//   //       console.log("Failed to delete student.");
//   //     }
//   //   } catch (error) {
//   //     alert(error);
//   //   }
//   // };

//   const handleNavigation = (
//     id: string,
//     e: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     e.preventDefault();
//     navigate(`/student/${id}`);
//   };

//   return (
//     <div>
//       <div className="h-20">
//         <ClassTable classes={[classData]} />
//       </div>

//       <StudentTable students={classData.students} />
//       <ResultTable className={className}/>
//       {/* {classData ? (
//         <div> */}
//       {/* <div className="border-2 grid grid-flow-col text-center">
//             {editingId === classData.id ? (
//               <form action={submitAction} className="contents">
//                 {error && <p className="error">{error}</p>}
//                 <div>
//                   <select
//                     name="course"
//                     defaultValue={classData.course}
//                     className="border-2 w-full"
//                     required
//                   >
//                     {courseChoices.map((course, index) => (
//                       <option key={index} value={course}>
//                         {course}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     name="className"
//                     defaultValue={classData.class_name}
//                     className="border-2 w-full"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-1">
//                   <input
//                     type="text"
//                     name="teacherOne"
//                     defaultValue={classData.teacher_one}
//                     className="border-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     name="teacherTwo"
//                     defaultValue={classData.teacher_two}
//                     className="border-2 w-full"
//                   />
//                 </div>
//                 <div>
//                   <p>Students: {classData.students.length}</p>
//                 </div>
//                 <SubmitButton label="Save" />
//                 <button type="button" onClick={() => setEditingId(null)}>
//                   Cancel
//                 </button>
//               </form>
//             ) : (
//               <>
//                 <p>{classData.course}</p>
//                 <p>{classData.class_name}</p>
//                 <p>
//                   {classData.teacher_one} {classData.teacher_two ? "and" : ""}{" "}
//                   {classData.teacher_two}
//                 </p>
//                 <p>Students: {classData.students.length}</p>
//                 <button onClick={() => setEditingId(classData.id)}>Edit</button>
//               </>
//             )}
//           </div> */}

//       {/* Students */}
//       {/* <div className="space-y-4 ">
//             {classData.students.map((student) => (
//               <div
//                 key={student.student_id}
//                 className="border rounded-lg grid grid-flow-col"
//               >
//                 <p>{student.student_id}</p>
//                 <p>
//                   {student.first_name} {student.last_name}{" "}
//                   {student.nickname ? `(${student.nickname})` : ""}
//                 </p>
//                 <button
//                   className="border p-2 rounded-lg"
//                   onClick={(e) => handleNavigation(student.student_id, e)}
//                 >
//                   Go
//                 </button>
//                 <button
//                   className="border p-2 rounded-lg"
//                   onClick={() => deleteStudent(student.id)}
//                 >
//                   Del
//                 </button>
//               </div>
//             ))}
//           </div> */}
//       {/* </div>
//       ) : (
//         <p>no data</p>
//       )} */}
//       {/* <div className="grid space-y-4">
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-blue-500 hover:bg-blue-600"
//         >
//           {showForm ? "Hide Form" : "Create New Student"}
//         </button>

//         {showForm && (
//           <CreateStudentForm classId={classData.id} getClass={getClass} />
//         )}
//       </div> */}
//     </div>
//   );
// }

// export default Class;
