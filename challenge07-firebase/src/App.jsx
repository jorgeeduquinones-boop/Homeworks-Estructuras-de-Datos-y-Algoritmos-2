import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TaskPage } from "./pages/TaskPage";
import "./styles/App.scss";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {user && (
        <nav style={{ background: "#212529", color: "#fff", padding: "10px 20px", display: "flex", justifyContent: "space-between" }}>
          <span>Usuario: {user.email}</span>
          <button onClick={logout} style={{ background: "#dc3545", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
            Cerrar Sesión
          </button>
        </nav>
      )}
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/tasks" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/tasks" />} />
        <Route path="/tasks" element={user ? <TaskPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/tasks" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;