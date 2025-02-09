// //types
// export interface StudentRowType {
//     id: number;
//     student_id: string;
//     first_name: string;
//     last_name: string;
//     nickname: string;
//     current_class: number;
//     start_date: string;
//     participation: string;
//     teacher_comments: string;
//     level_up: string;
//     is_active: boolean;
//     week: string;
//     grammar: string | null;
//     vocabulary: string | null;
//     reading: string | null;
//     writing: string | null;
//     speaking: string | null;
//     listening: string | null;
//     pronunciation: string | null;
//   }



// //page
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {columns, DataTable} from '@/components/tables/StudentTable' 
// import { useEffect, useState } from "react";
// import { getClass } from "@/api/services/class.service";
// import { ClassType } from "@/types/class";

// const initializeCompleteDataset = (
//   classData: ClassType,
//   selectedWeek: string
// ): StudentRowType[] => {
//   const ret = classData.students.map((student) => {
//     const result =
//       student.results.find((result) => result.week === selectedWeek) || null;

//     return {
//       ...student,
//       //week,
//       result
//     };
//   });
//   console.log(ret);
  
//   return ret;
// };

// export default async function ResultsTable() {
//   const className = "Foundation 1";
//   const [classData, setClassData] = useState<ClassType | undefined>();
//   const [tableData, setTableData] = useState<StudentRowType[]>([]);
//   const [selectedWeek, setSelectedWeek] = useState("1");

//   useEffect(() => {
//     getClass(className).then((res) => {
//       setClassData(res);
//     });
//   }, [className]);

//   useEffect(() => {
//     if (classData != null) {
//       const completeData = initializeCompleteDataset(classData, selectedWeek);
//       setTableData(completeData);
//     }
//   }, [classData]);

//   const weeks = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
//   return (
//     <div className="container mx-auto py-10">
//       <Select value={selectedWeek} onValueChange={setSelectedWeek}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Select week" />
//         </SelectTrigger>
//         <SelectContent>
//           {weeks.map((week) => (
//             <SelectItem key={week} value={week}>
//               Week {week}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       <DataTable columns={columns} data={tableData} />
//     </div>
//   );
// }