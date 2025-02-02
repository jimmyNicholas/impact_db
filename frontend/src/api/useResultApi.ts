import api from "@/api/api";
import { useState } from "react";

interface updateResultsProps {
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

const useResultApi = () => {
    const [results, setResults] = useState();

    const getResults = (className: string | unknown) => {
        api
          .get(`/api/results/${className}`)
          .then((res) => res.data)
          .then((data) => {
            setResults(data);
            console.log(data);
          })
          .catch((err) => alert(err));
      };

      const updateResults = async (id: number, data: updateResultsProps) => {
        try {
          const res = await api.put(`/api/results/${id}/`, data);
    
          if (!res) {
            throw new Error("Failed to update results");
          }
    
          //getResults();
          return true;
        } catch (error) {
          console.error("Error updating class:", error);
          return false;
          //setRows(createRows(classes));
        }
      };

    return {
        results,
        getResults,
        updateResults,
    }
}

export default useResultApi;

/*
{
  "student_id": 20000,
  "first_name": "Jane",
  "last_name": "Doe",
  "nickname": "Jay",
  "week": "1",
  "skill": "Listening",
  "grade": "80"
}
*/