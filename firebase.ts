import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnfzDzA3rWdkussH73s-Jpk5N0KMWsrqM",
  authDomain: "inst-81b86.firebaseapp.com",
  projectId: "inst-81b86",
  storageBucket: "inst-81b86.appspot.com",
  messagingSenderId: "337385201351",
  appId: "1:337385201351:web:9eb5bdd1e4735a84cee8e2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth(app);
export default app;
