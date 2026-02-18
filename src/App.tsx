import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AddClinic from "./pages/AddClinic";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* 🔐 Protected Super Admin */}
      <Route
        path="/add-clinic"
        element={
          <ProtectedRoute>
            <AddClinic />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
