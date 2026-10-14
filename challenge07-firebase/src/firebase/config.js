import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcbaDPIQ06dO2OxiMwtNB7MAGvLuEOKrc",
  authDomain: "challenge07-app.firebaseapp.com",
  projectId: "challenge07-app",
  storageBucket: "challenge07-app.firebasestorage.app",
  messagingSenderId: "443113847534",
  appId: "1:443113847534:web:f85e220b75014661fc51ff"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };