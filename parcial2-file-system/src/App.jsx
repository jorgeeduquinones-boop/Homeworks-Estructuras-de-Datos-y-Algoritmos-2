import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useFileSystem } from "./hooks/useFileSystem";
import { TreeNodeView } from "./components/TreeNodeView";
import "./styles/App.scss";

function App() {
  const { user, login, signup, logout } = useContext(AuthContext);
  const { tree, loading, createItem, deleteItem } = useFileSystem();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [rootName, setRootName] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) await signup(email, password);
      else await login(email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateRoot = async (e) => {
    e.preventDefault();
    if (!rootName.trim()) return;

    try {
      await createItem(rootName, "folder", null, user?.email || "anonimo@mail.com");
      setRootName("");
    } catch (error) {
      alert("Error en Firestore: " + error.message);
    }
  };

  return (
    <div>
      {/* Encabezado */}
      <header className="app-header">
        <h2> Parcial 2: Explorador con Árbol N-ario</h2>
        {user ? (
          <div>
            <span>{user.email}</span>
            <button onClick={logout} style={{ marginLeft: "15px" }}>Cerrar Sesión</button>
          </div>
        ) : (
          <span>Modo Lectura (Inicia sesión para crear o modificar)</span>
        )}
      </header>

      {/* Formulario de Autenticación */}
      {!user && (
        <div className="auth-card">
          <h3>{isRegistering ? "Registro" : "Iniciar Sesión"}</h3>
          <form onSubmit={handleAuth}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isRegistering ? "Crear Cuenta" : "Ingresar"}</button>
          </form>
          <p
            style={{ cursor: "pointer", color: "#2980b9", marginTop: "10px" }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </p>
        </div>
      )}

      {/* Contenedor del Explorador */}
      <main className="tree-container">
        <h3>Sistema Jerárquico de Archivos y Carpetas</h3>

        {loading ? (
          <p>Cargando estructura desde Firebase...</p>
        ) : tree ? (
          <TreeNodeView
            node={tree}
            onCreate={(name, type, parentId) => createItem(name, type, parentId, user?.email)}
            onDelete={deleteItem}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>El sistema de archivos está vacío en este momento.</p>
            {user && (
              <form onSubmit={handleCreateRoot} style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
                <input
                  type="text"
                  placeholder="Nombre de la carpeta raíz"
                  value={rootName}
                  onChange={(e) => setRootName(e.target.value)}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                  required
                />
                <button
                  type="submit"
                  style={{ padding: "8px 16px", background: "#27ae60", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  + Crear Carpeta Raíz
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      {/* Easter Egg */}
      
    </div>
  );
}

export default App;