import api from "@/api/api";
import { useState } from "react";

const useResultApi = () => {
    const [results, setResults] = useState();

    const getResults = (className: string | unknown) => {
        api
          .get(`/api/result/${className}`)
          .then((res) => res.data)
          .then((data) => {
            setResults(data);
            console.log(data);
          })
          .catch((err) => alert(err));
      };

    return {
        results,
        getResults,
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