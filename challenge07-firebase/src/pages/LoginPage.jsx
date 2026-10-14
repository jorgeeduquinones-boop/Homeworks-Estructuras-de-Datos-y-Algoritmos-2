import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/tasks");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión (Firebase)</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
};