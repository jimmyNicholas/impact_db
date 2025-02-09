import useResultApi from "@/api/useResultApi";
import { ResultType } from "@/types/result";
import { useEffect, useState } from "react";
import { textEditor } from "react-data-grid";
import {
  FilterableGrid,
  TextFilter,
  SelectFilter,
  matchers,
  type FilterDefinition,
} from "@/components/tables/archive/FilteredHeader";
import useClassApi from "@/api/useClassApi";
import { ClassType } from "@/types/class";

interface Row {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  nickname: string;
  week: string;
  G?: string;
  V?: string;
  R?: string;
  W?: string;
  S?: string;
  L?: string;
  P?: string;
}

interface ResultTableProps {
  className: string | undefined;
}

const ResultTable: React.FC<ResultTableProps> = ({ className }) => {
  const [rows, setRows] = useState<Row[]>([]);

  const { classData, getClassData } = useClassApi();
  const { results, getResults } = useResultApi();

  useEffect(() => {
    getClassData(className);
    getResults(className);
    console.log(classData);
    //console.log(results);
  }, [className]);

  const createRows = (classData: ClassType | null, results: ResultType[]) => {
    const allStudents = classData?.students || [];

    const emptyRows = allStudents.flatMap((student) =>
      Array.from({ length: 10 }, (_, i) => ({
        id: 0,
        studentId: student.student_id,
        firstName: student.first_name,
        lastName: student.last_name,
        nickname: student.nickname,
        week: (i + 1).toString(),
        G: "",
        V: "",
        R: "",
        W: "",
        S: "",
        L: "",
        P: "",
      }))
    );

    const groupedRows = emptyRows.reduce((acc, row) => {
      const key = `${row.studentId}-${row.week}`;
      acc[key] = row;
      return acc;
    }, {} as Record<string, Row>);

    results.forEach((result) => {
      const key = `${result.student_id}-${result.week}`;
      if (groupedRows[key]) {
        groupedRows[key] = {
          ...groupedRows[key],
          id: result.id,
          G: result.grammar || "",
          V: result.vocabulary || "",
          R: result.reading || "",
          W: result.writing || "",
          S: result.speaking || "",
          L: result.listening || "",
          P: result.pronunciation || "",
        };
      }
    });

    return Object.values(groupedRows);
  };

  const columns = [
    {
      key: "studentId",
      name: "ID",
      sortable: true,
      width: 80,
    },
    {
      key: "firstName",
      name: "First Name",
      sortable: true,
      width: 150,
    },
    {
      key: "lastName",
      name: "Last Name",
      sortable: true,
      width: 150,
    },
    {
      key: "nickname",
      name: "Nickname",
      sortable: true,
      width: 120,
    },
    {
      key: "week",
      name: "Week",
      width: 80,
      sortable: true,
    },
    {
      key: "G",
      name: "G",
      width: 60,
      renderEditCell: textEditor,
      editable: true,
    },
    {
      key: "V",
      name: "V",
      width: 60,
      renderEditCell: textEditor,
      editable: true,
    },
    {
      key: "R",
      name: "R",
      width: 60,
      renderEditCell: textEditor,
      editable: true,
    },
    {
      key: "W",
      name: "W",
      width: 60,
      renderEditCell: textEditor,
      editable: true,
    },
    {
      key: "S",
      name: "S",
      width: 60,
      renderEditCell: textEditor,
      editable: true,
    },
    {
      key: "L",
      name: "L",
      width: 60,
      renderEditCell: textEditor,
      editable: true,
    },
    {
      key: "P",
      name: "P",
      width: 60,
      renderEditCell: textEditor,
      editable: true,
    },
  ];

  useEffect(() => {
    if (!results) return;
    const rows = createRows(classData, results);
    setRows(rows);
  }, [results]);

  const filterDefinitions: FilterDefinition<(typeof rows)[0]>[] = [
    {
      key: "studentId",
      component: TextFilter,
      matcher: (row, value) => matchers.text(row, value, "studentId"),
    },
    {
      key: "firstName",
      component: TextFilter,
      matcher: (row, value) => matchers.text(row, value, "firstName"),
    },
    {
      key: "lastName",
      component: TextFilter,
      matcher: (row, value) => matchers.text(row, value, "lastName"),
    },
    {
      key: "nickname",
      component: TextFilter,
      matcher: (row, value) => matchers.text(row, value, "nickname"),
    },
    {
      key: "week",
      component: TextFilter,
      matcher: (row, value) => matchers.text(row, value, "week"),
    },
    {
      key: "skill",
      component: (props) => (
        <SelectFilter
          {...props}
          options={[
            { label: "Grammar", value: "Grammar" },
            { label: "Listening", value: "Listening" },
            { label: "Pronunciation", value: "Pronunciation" },
            { label: "Reading", value: "Reading" },
            { label: "Speaking", value: "Speaking" },
            { label: "Vocabulary", value: "Vocabulary" },
            { label: "Writing", value: "Writing" },
          ]}
        />
      ),
      matcher: (row, value) => matchers.exact(row, value, "skill"),
    },
  ];

  return (
    <>
      <FilterableGrid
        columns={columns}
        rows={rows}
        filterDefinitions={filterDefinitions}
        defaultFilters={{ status: "Active" }}
      />
    </>
  );
};

export default ResultTable;
