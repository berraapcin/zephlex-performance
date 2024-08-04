import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyB_DadiPKlPLIt3sw_uPFr6i3KxI1WDiIs",
  authDomain: "algo-senti.firebaseapp.com",
  projectId: "algo-senti",
  storageBucket: "algo-senti.appspot.com",
  messagingSenderId: "109562175983",
  appId: "1:109562175983:web:66ed44b4c1feae44dbd61a",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const fireStore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
