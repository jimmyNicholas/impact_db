import { tryCatch } from "@/api/try-catch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getClass } from "../api/classApi";
import { ClassType } from "@/types/class";

interface UseClassDataReturn {
  classData: ClassType | undefined;
  status: 'pending' | 'error' | 'success';
  error: Error | null;
  isLoading: boolean;
  refetchClass: () => Promise<any>;
}

export const useClassData = (classSlug: string): UseClassDataReturn => {
  const queryClient = useQueryClient();

  const {
    data: classData,
    status,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["class", classSlug],
    queryFn: async (): Promise<ClassType> => {
      if (!classSlug) throw new Error("Class slug is required");
      const result = await tryCatch(getClass(classSlug));
      if (result.error) {
        throw result.error;
      }

      if (!result.data) {
        throw new Error("Class not found");
      }
      return result.data;
    },
    enabled: !!classSlug,
  });

  const refetchClass = (): Promise<any> => {
    if (classSlug) {
        queryClient.invalidateQueries({ queryKey: ['class', classSlug] });
      }
    return refetch();
  };

  return {
    classData,
    status,
    error: error as Error | null,
    isLoading,
    refetchClass,
  };
};
