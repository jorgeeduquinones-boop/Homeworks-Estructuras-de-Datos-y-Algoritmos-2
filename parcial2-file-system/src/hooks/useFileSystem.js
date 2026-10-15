import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { buildTreeFromList } from "../utils/NAryTree";

export const useFileSystem = () => {
  const [nodes, setNodes] = useState([]);
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios en tiempo real desde Firestore
    const unsubscribe = onSnapshot(
      collection(db, "filesystem"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNodes(items);

        if (items.length > 0) {
          const builtTree = buildTreeFromList(items);
          setTree(builtTree);
        } else {
          setTree(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error en Snapshot de Firestore:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const createItem = async (name, type, parentId, userEmail) => {
    try {
      await addDoc(collection(db, "filesystem"), {
        name,
        type,
        parentId: parentId || null,
        createdBy: userEmail || "usuario@mail.com",
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error al guardar en Firestore:", err);
      alert("Error de Firebase: " + err.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "filesystem", id));
    } catch (err) {
      console.error("Error al eliminar en Firestore:", err);
    }
  };

  return { nodes, tree, loading, createItem, deleteItem };
};