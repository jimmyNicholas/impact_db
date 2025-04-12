import ClassSearch from "./classSearch";
import { Link } from "react-router-dom";

const NavTop = () => {
  return (
    <div className="flex h-14 w-full px-4 bg-indigo-50">
      <div className="p-4 w-1/5 grid justify-center items-center">
        <Link to={`/`}>
          <img
            src="/logo-impact-english-college.png"
            alt="Impact Logo"
            className="h-8 w-auto"
          />
        </Link>
      </div>
      <div className="w-4/5 flex flex-row items-center justify-between">
        <ClassSearch />
        <h1>Teacher Profile</h1>
      </div>
    </div>
  );
};

export default NavTop;
