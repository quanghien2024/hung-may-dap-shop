import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvhOJJadKwrYVZpez6Nxm2jk8EN_QMlLA",
  authDomain: "shop-59768.firebaseapp.com",
  projectId: "shop-59768",
  storageBucket: "shop-59768.firebasestorage.app",
  messagingSenderId: "11960086794",
  appId: "1:11960086794:web:5c712b8516336e7424caf3",
  measurementId: "G-KNZSELZ4ML"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
