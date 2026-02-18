import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AddClinic from "./pages/AddClinic";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Super Admin */}
      <Route path="/add-clinic" element={<AddClinic />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      {/* 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
