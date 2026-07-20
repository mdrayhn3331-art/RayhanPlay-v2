// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyACAOr-EjvJYt5ymOSFB5RQwC5iKwtGfJE",
  authDomain: "rayhanplay-d6a0c.firebaseapp.com",
  projectId: "rayhanplay-d6a0c",
  storageBucket: "rayhanplay-d6a0c.firebasestorage.app",
  messagingSenderId: "392868504542",
  appId: "1:392868504542:web:06807d3404aa977115734f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("✅ Firebase Connected Successfully!");