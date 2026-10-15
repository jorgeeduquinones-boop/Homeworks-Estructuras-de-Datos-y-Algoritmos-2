import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB68y1iPqsWUavXIPmVRsVdviuJdz77WPU",
  authDomain: "parcial2-a0a39.firebaseapp.com",
  projectId: "parcial2-a0a39",
  storageBucket: "parcial2-a0a39.firebasestorage.app",
  messagingSenderId: "311364385358",
  appId: "1:311364385358:web:6fb16d6f70fc9b8992211f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);