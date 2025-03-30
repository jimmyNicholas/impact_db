import { useMutation } from '@tanstack/react-query';
import { 
  createAssessment, 
  updateAssessment,
} from "../api/assessmentApi"
import { CreateAssessmentType } from '@/types/assessment';

interface UseAssessmentUpdatesReturn {
  addAssessment: (assessmentData: CreateAssessmentType) => Promise<boolean>;
  updateAssessment: (id: number, assessmentData: Partial<CreateAssessmentType>) => Promise<boolean>;
  isAddingAssessment: boolean;
  isUpdatingAssessment: boolean;
  isAssessmentOperationPending: boolean;
}

export function useAssessmentUpdates(
  onSuccess: () => Promise<any>
): UseAssessmentUpdatesReturn {

  const {
    mutateAsync: addAssessmentAsync,
    isPending: isAddingAssessment
  } = useMutation({
    mutationFn: (assessmentData: CreateAssessmentType): Promise<boolean> => {
      return createAssessment(assessmentData);
    },
    onSuccess
  });


  const {
    mutateAsync: updateAssessmentAsync,
    isPending: isUpdatingAssessment
  } = useMutation({
    mutationFn: ({ id, assessmentData}: { id: number; assessmentData: Partial<CreateAssessmentType> }): Promise<boolean> => {
      return updateAssessment(id, assessmentData);
    },
    onSuccess
  });

  const isAssessmentOperationPending = 
    isAddingAssessment || isUpdatingAssessment;

  return {
    addAssessment: addAssessmentAsync,
    updateAssessment: (id: number, assessmentData: Partial<CreateAssessmentType>) => 
       updateAssessmentAsync({ id, assessmentData }),
    isAddingAssessment,
    isUpdatingAssessment,
    isAssessmentOperationPending
  };
}