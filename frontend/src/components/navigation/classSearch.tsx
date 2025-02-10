import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getClasses } from "@/api/services/class.service";
import { useQuery } from "@tanstack/react-query";

type ClassNameMap = {
  [key: string]: string;
};

const ClassSearch = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  const CLASS_NAMES = classes.reduce((acc, classData) => {
    const slug = transformToSlug(classData.class_name);
    acc[slug] = classData.class_name;
    return acc;
  }, {} as ClassNameMap);

  const SLUG_MAP = Object.entries(CLASS_NAMES).reduce((acc, [slug, name]) => {
    acc[name.toLowerCase()] = slug;
    return acc;
  }, {} as Record<string, string>);

  const getClassSlug = (className: string): string => {
    return (
      SLUG_MAP[className.toLowerCase()] ||
      className.toLowerCase().replace(/ /g, "-")
    );
  };

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const classNames = Object.values(CLASS_NAMES);

  const filteredClasses = classNames.filter((className) =>
    className.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (className: string) => {
    const slug = getClassSlug(className);
    navigate(`/class/${slug}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="flex items-center border rounded-md p-2">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search classes..."
          className="outline-none w-full"
        />
      </div>

      {isOpen && filteredClasses.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg">
          {filteredClasses.map((className) => (
            <button
              key={className}
              onClick={() => handleSelect(className)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {className}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassSearch;

export const transformToSlug = (text: string): string => {
  return text.toLowerCase().replace(/ /g, "-");
};

export const transformFromSlug = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const encodeForApi = (className: string): string => {
  return className.replace(/ /g, "%20");
};

export const transformFromSlugToApi = (slug: string): string => {
    const decodedClassName = transformFromSlug(slug);
    return  encodeForApi(decodedClassName);
}