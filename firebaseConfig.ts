import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwIRSkEQi31OWd4mL0UL6gLx5Cn4g8GC8",
  authDomain: "breakbuddy-d499b.firebaseapp.com",
  projectId: "breakbuddy-d499b",
  storageBucket: "breakbuddy-d499b.firebasestorage.app",
  messagingSenderId: "123496114819",
  appId: "1:123496114819:web:6982c2283791c5236249b6",
  measurementId: "G-DXF3PW3RD5",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
