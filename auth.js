import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Register
window.register = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email এবং Password লিখুন");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      balance: 0,
      referral: 0,
      createdAt: new Date().toISOString()
    });

    alert("✅ Registration Successful!");

  } catch (error) {
    alert(error.message);
  }
};

// Login
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login Successful!");

  } catch (error) {
    alert(error.message);
  }
};

// Logout
window.logout = async function () {
  await signOut(auth);
  alert("Logged Out");
};