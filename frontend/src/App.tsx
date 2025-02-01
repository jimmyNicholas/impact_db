import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/authentication/ProtectedRoute";
import ClassDirectory from "@/pages/ClassDirectory";
import Class from "@/pages/Class"
import Student from "@/pages/Student";
import FullClass from "./pages/FullClass";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/class/" element={<ClassDirectory />} />
        <Route path="/class/:className" element={<Class />} />
        <Route path="/student/:studentId" element={<Student />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/FullClass" element={<FullClass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
