import { createContext, useContext } from "react";
import { useCollection } from "../hooks/useCollection";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { data: tasks, loading, error, getDocuments, addDocument, updateDocument, deleteDocument } = useCollection("tasks");

  const fetchTasks = () => {
    if (user) getDocuments(user.uid);
  };

  const addTask = async (title) => {
    if (!user) return;
    await addDocument({ title, completed: false, userId: user.uid });
    fetchTasks();
  };

  const toggleTask = async (id, currentStatus) => {
    await updateDocument(id, { completed: !currentStatus });
    fetchTasks();
  };

  const editTask = async (id, newTitle) => {
    await updateDocument(id, { title: newTitle });
    fetchTasks();
  };

  const removeTask = async (id) => {
    await deleteDocument(id);
    fetchTasks();
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, addTask, toggleTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}