import { AssessmentType } from "@/types/assessment";
import { StudentType } from "@/types/student";
import { createEditableColumn } from "@/widgets/data-table/utils/column";
import { ColumnDef, Row } from "@tanstack/react-table";

export interface SkillColumnsProps {
  visibleWeek: string;
  assessmentTypes: AssessmentType[];
  onAssessmentAdd: (data: {
    student: number;
    assessment_type: number;
    week: number;
    value: string;
  }) => void;
  onAssessmentUpdate: (
    id: number,
    data: {
      student: number;
      assessment_type: number;
      week: number;
      value: string;
    }
  ) => void;
}

export const createSkillColumns = ({
  visibleWeek,
  assessmentTypes,
  onAssessmentAdd,
  onAssessmentUpdate,
}: SkillColumnsProps): ColumnDef<StudentType, unknown>[] => {
  const getAssessmentValue = (
    row: Row<StudentType>,
    columnId: string
  ): string => {
    const assessment = row.original.assessments.find(
      (assessment) =>
        assessment.week === parseInt(visibleWeek) &&
        assessment.assessment_type_name === columnId
    );
    return assessment ? assessment.value : "-";
  };

  const handleAssessmentSave = (
    value: string,
    row: Row<StudentType>,
    columnId: string
  ) => {
    const assessment = row.original.assessments.find(
      (assessment) =>
        assessment.week === parseInt(visibleWeek) &&
        assessment.assessment_type_name === columnId
    );
    const hasAssessment = assessment !== undefined;

    const assessmentType = assessmentTypes.find(
      (type) => type.name === columnId
    );
    const assessmentTypeId = assessmentType ? assessmentType.id : undefined;

    if (!assessmentTypeId) {
      console.error(`Assessment type with name ${columnId} not found`);
      return;
    }

    if (!hasAssessment) {
      onAssessmentAdd({
        student: row.original.id,
        assessment_type: assessmentTypeId,
        week: parseInt(visibleWeek),
        value: value,
      });
    } else {
      onAssessmentUpdate(assessment.id, {
        student: row.original.id,
        assessment_type: assessment.assessment_type,
        week: assessment.week,
        value: value,
      });
    }
  };

  const skillColumnDefs = [
    { id: "Grammar", header: "G" },
    { id: "Vocabulary", header: "V" },
    { id: "Reading", header: "R" },
    { id: "Writing", header: "W" },
    { id: "Speaking", header: "S" },
    { id: "Listening", header: "L" },
    { id: "Pronunciation", header: "P" },
  ];

  return skillColumnDefs.map((skill) => {
    return createEditableColumn<StudentType>({
      ...skill,
      type: "grade",
      handleSave: handleAssessmentSave,
      getValue: getAssessmentValue,
    });
  });
};
