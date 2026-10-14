import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/tasks");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña (mínimo 6 caracteres)" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrarme</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
};