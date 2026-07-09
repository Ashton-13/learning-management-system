import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CourseListPage from "./pages/CourseListPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={<CourseListPage />}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/student" element={
          <ProtectedRoute allowedRole={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
        <Route 
        path="/teacher" 
        element={
          <ProtectedRoute allowedRole={["teacher", "admin"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />
        <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;