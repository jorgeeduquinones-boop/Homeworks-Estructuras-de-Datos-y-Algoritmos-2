import { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const TaskPage = () => {
  const { tasks, fetchTasks, addTask, toggleTask, editTask, removeTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = async (id) => {
    if (!editingTitle.trim()) return;
    await editTask(id, editingTitle);
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <div className="task-container">
      <h2>Mis Tareas</h2>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 15px", background: "#198754", color: "#fff", border: "none" }}>
          Agregar
        </button>
      </form>

      <div>
        {tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            {editingId === task.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                style={{ flex: 1, padding: "5px", marginRight: "10px" }}
              />
            ) : (
              <span>{task.title}</span>
            )}

            <div className="actions">
              {editingId === task.id ? (
                <button onClick={() => handleSaveEdit(task.id)} style={{ background: "#198754", color: "#fff" }}>
                  Guardar
                </button>
              ) : (
                <>
                  <button onClick={() => toggleTask(task.id, task.completed)}>
                    {task.completed ? "Desmarcar" : "Completar"}
                  </button>
                  <button onClick={() => handleStartEdit(task)}>
                    Editar
                  </button>
                  <button onClick={() => removeTask(task.id)} style={{ background: "#dc3545", color: "#fff" }}>
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};