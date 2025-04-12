// import { ColumnDef } from "@tanstack/react-table";
// import { DataTable } from "./data-table";
// import { Button } from "../DEL_button/Button";
// import { useEffect, useState } from "react";

// interface ResultItem {
//   skill: string;
// }

// interface createResultColumns {
//   startWeek: number;
//   endWeek: number;
//   showResultCols: (skill: string, week: number) => void;
//   selectedCells: Array<{ skill: string; week: number }>;
// }

// interface ClassResultsProps {
//   results: ResultItem[];
//   showResultCols: (skill: string, week: number) => void;
//   selectedCells: Array<{ skill: string; week: number }>;
// }

// const ResultsTable = ({
//   results,
//   showResultCols,
//   selectedCells,
// }: ClassResultsProps) => {
//   const [resultColumns, setResultColumns] = useState<
//     ColumnDef<ResultItem, unknown>[]
//   >([]);

//   const createResultColumns = ({
//     startWeek,
//     endWeek,
//     showResultCols,
//     selectedCells,
//   }: createResultColumns): ColumnDef<ResultItem, unknown>[] => {
//     const dataCells: ColumnDef<ResultItem, unknown>[] = [];

//     for (let week = startWeek; week < endWeek; week++) {
//       const key = `week_${week}`;
//       const header = week.toString();
//       dataCells.push({
//         accessorKey: key,
//         header: header,
//         cell: ({ row }) => {
//           const value = row.original[key as keyof ResultItem] || "-";
//           const skill = row.original.skill;

//           const isSelected = selectedCells.some(
//             (item) => item.skill === skill && item.week === week
//           );

//           return (
//             <Button
//               label={value.toString()}
//               size="sm"
//               variant={isSelected ? "primary" : "secondary"}
//               onClick={() => {
//                 showResultCols(skill, week);
//               }}
//             ></Button>
//           );
//         },
//       });
//     }

//     return [
//       {
//         accessorKey: "skill",
//         header: "Week",
//       },
//       ...dataCells,
//     ];
//   };

//   useEffect(() => {
//     setResultColumns(
//       createResultColumns({
//         startWeek: 1,
//         endWeek: 10,
//         showResultCols,
//         selectedCells,
//       })
//     );
//   }, [showResultCols, selectedCells]);

//   const foundationSkills = [
//     "Grammar",
//     "Vocabulary",
//     "Listening",
//     "Speaking",
//     "Reading",
//     "Writing",
//   ];
//   const skillMap = new Map(results.map((item) => [item.skill, item]));
//   const completeResults: ResultItem[] = foundationSkills.map((skill) => {
//     if (skillMap.has(skill)) {
//       return skillMap.get(skill)!;
//     }

//     return {
//       skill: skill,
//       week_1: "-" as const,
//       week_2: "-" as const,
//     };
//   });

//   return (
//     <>
//       {resultColumns && results && (
//         <DataTable columns={resultColumns} data={completeResults} />
//       )}
//     </>
//   );
// };

// export default ResultsTable;
