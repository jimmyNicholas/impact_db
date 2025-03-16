import { useState, useEffect } from "react";
import api from "@/api/config";

interface CourseType {
  id: number;
  name: string;
  description: string;
}

export const useCourseTypes = () => {
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/course-type/");
      if (response.status === 200) {
        setCourseTypes(response.data);
      } else {
        setError("Failed to fetch course types");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseTypes();
  }, []);

  return { courseTypes, loading, error, refetch: fetchCourseTypes };
};