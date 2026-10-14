import { useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDocuments = async (userId = null) => {
    setLoading(true);
    setError(null);
    try {
      let q = collection(db, collectionName);
      if (userId) {
        q = query(collection(db, collectionName), where("userId", "==", userId));
      }
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setData(docs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addDocument = async (docData) => {
    setLoading(true);
    try {
      const ref = await addDoc(collection(db, collectionName), {
        ...docData,
        createdAt: serverTimestamp()
      });
      return ref;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (id, docData) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, docData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getDocuments, addDocument, updateDocument, deleteDocument };
};