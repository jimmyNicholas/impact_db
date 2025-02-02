import api from "@/api/api";

interface UpdateResultsProps {
  student_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  week: string;
  grammar: string | null;
  vocabulary: string | null;
  reading: string | null;
  writing: string | null;
  speaking: string | null;
  listening: string | null;
  pronunciation: string | null;
}

export const updateResult = async (
  id: number,
  data: Partial<UpdateResultsProps>
) => {
  try {
    const res = await api.patch(`/api/result/${id}/`, data);
    if (!res) {
      throw new Error("Failed to update results");
    }
    return true;
  } catch (error) {
    console.error("Error updating result:", error);
    return false;
  }
};

interface CreateResultProps {
  student_id: string;
  week: string;
  [key: string]: any;
}

export const createResult = async (data: CreateResultProps) => {
  try {
    const res = await api.post("/api/result/", data);
    if (!res) {
      throw new Error("Failed to create result");
    }
    return res.data;
  } catch (error) {
    console.error("Error creating result:", error);
    return null;
  }
};
