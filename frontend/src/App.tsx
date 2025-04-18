import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
//import Register from "@/pages/Register";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/authentication/ProtectedRoute";
//import ClassDirectory from "@/pages/achive/ClassDirectory";
//import Class from "@/pages/Class"
//import Student from "@/pages/Student";
//import { ClassPage } from "./pages/ClassPage";
import { PageLayout } from "./app/main/layout";
import { ClassPage } from "./app/main/class-page/page";
import { ClassList } from "./app/main/class-list/page";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

// function RegisterAndLogout() {
//   localStorage.clear();
//   return <Register />;
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PageLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/class/" element={<ClassList />} />
          <Route path="/class/:className" element={<ClassPage />} />
        </Route>

        {/* <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} /> */}
        {/* <Route path="/register" element={<RegisterAndLogout />} /> */}
        {/* <Route path="/class/" element={<ClassDirectory />} /> */}
        {/* <Route path="/class/" element={<ClassPage />} />
        <Route path="/class/:className" element={<ClassPage />} /> */}
        {/* <Route path="/student/:studentId" element={<Student />} /> */}
        <Route path="*" element={<NotFound />}></Route>
        {/* <Route path="/FullClass/:className" element={<FullClass />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
