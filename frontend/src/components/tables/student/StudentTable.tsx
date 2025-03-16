import { StudentType } from "@/types/student";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTable } from "../data-table";
import EditableCell from "../components/EditableCell";
import { StudentRowType } from "@/types/studentRow";
import {
  AssessmentType,
  createAssessment,
  getAllAssessmentTypes,
  updateAssessment,
} from "@/api/services/assessment.service";
import { useEffect, useState } from "react";
import { studentColumns } from "./columns/baseColumns";

interface AssessmentData {
  value: string;
  normalizedValue: number;
  dateAssessed: string;
}

interface Assessment {
  id: number;
  assessment_type_name: string;
  assessment_type: number | { id: number };
  assessment_type_id?: number;
  week: number;
  value: string;
  normalized_value: number;
  date_assessed: string;
}

interface StudentTableProps {
  students: StudentType[];
  selectedCells: Array<{ skill: string; week: number }>;
}

const StudentTable = ({ students, selectedCells }: StudentTableProps) => {
  console.log(students, selectedCells);
  const [assessmentTypes, setAssessmentTypes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessmentTypes = async () => {
      try {
        setLoading(true);
        const assessmentTypes = await getAllAssessmentTypes();

        // Create a mapping from skill name to ID
        const typeMap = assessmentTypes.reduce((acc: Record<string, number>, type: AssessmentType) => {
          acc[type.name] = type.id;
          acc[type.name.toLowerCase()] = type.id;
          return acc;
        }, {});
        
        setAssessmentTypes(typeMap);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch assessment types:", err);
        setError("Failed to load assessment types. Some features may not work correctly.");
        setLoading(false);
      }
    };
    
    fetchAssessmentTypes();
  }, []);

  const handleSaveAssessment = async (params: {
    row: Row<StudentRowType>;
    column: keyof StudentRowType;
    value: string;
    originalData: StudentRowType;
  }) => {
    try {
      const columnId = params.column.toString();
      const [skill, weekStr] = columnId.split("_");
      const week = parseInt(weekStr, 10);
      const studentId = params.originalData.id;
      
      const matchingAssessment = params.originalData.assessments?.find(
        (a: Assessment) => a.assessment_type_name === skill
      ) as Assessment | undefined;

      let assessmentTypeId: number | undefined;

      if (matchingAssessment) {
        // Option 1: assessment_type might be an object with an id
        if (typeof matchingAssessment.assessment_type === 'object' && 
            matchingAssessment.assessment_type !== null &&
            'id' in matchingAssessment.assessment_type) {
          assessmentTypeId = matchingAssessment.assessment_type.id;
        } 
        // Option 2: assessment_type might be the ID directly
        else if (typeof matchingAssessment.assessment_type === 'number') {
          assessmentTypeId = matchingAssessment.assessment_type;
        }
        // Option 3: assessment_type_id might be available
        else if ('assessment_type_id' in matchingAssessment) {
          assessmentTypeId = matchingAssessment.assessment_type_id;
        }
      }

      if (!assessmentTypeId) {
        assessmentTypeId = assessmentTypes[skill];
      }

      if (!assessmentTypeId && params.value !== '-') {
        console.error(`Missing assessment_type ID for skill: ${skill}`);
        return false;
      }

      // Check if this is a new assessment or an update to an existing one
      const existingAssessment = params.originalData.assessments?.find(
        (a: Assessment) => a.assessment_type_name === skill && a.week === week
      ) as Assessment | undefined;

      if (existingAssessment) {
        // For existing assessments, use the ID to update
        await updateAssessment(existingAssessment.id, { 
          value: params.value 
        });
      } else if (params.value !== '-') {
        // For new assessments, create a new record with the correct field names
        await createAssessment({
          student: studentId,
          assessment_type: assessmentTypeId as number,
          week: week,
          value: params.value
        });
      }

      return true;
    } catch (error) {
      console.error("Error saving assessment:", error);
      return false;
    }
  };
  
  const selectedColumns: ColumnDef<StudentType, unknown>[] = selectedCells.map(
    ({ skill, week }) => {
      const columnId = `${skill}_${week}`;

      return {
        id: `${skill}_${week}`,
        header: `${skill.charAt(0)}${week}`,
        accessorFn: (row) => {
          const assessment = row.assessments.find(
            (a) => a.assessment_type_name === skill && a.week === week
          );

          return assessment
            ? {
                value: assessment.value,
                normalizedValue: assessment.normalized_value,
                dateAssessed: assessment.date_assessed,
              }
            : null;
        },
        cell: ({ getValue, row }) => {
          const assessmentData = getValue() as AssessmentData | null;

          if (assessmentData) {
            return (
              <div className="text-center">
                <EditableCell
                  initialValue={assessmentData.value}
                  row={row as Row<StudentRowType>}
                  column={columnId as keyof StudentRowType}
                  onSave={handleSaveAssessment}
                />
              </div>
            );
          }

          if (loading) {
            return <div className="text-center text-gray-400">Loading...</div>;
          }

          if (error && !assessmentTypes[skill]) {
            return <div className="text-center text-red-400">Error</div>;
          }

          return (
            <div className="text-center">
              <EditableCell
                initialValue={"-"}
                row={row as Row<StudentRowType>}
                column={columnId as keyof StudentRowType}
                onSave={handleSaveAssessment}
              />
            </div>
          );
        },
      };
    }
  );
  
  const updatedColumns = [...studentColumns, ...selectedColumns];

  return (
    <>{students && <DataTable columns={updatedColumns} data={students} />}</>
  );
};

export default StudentTable;
