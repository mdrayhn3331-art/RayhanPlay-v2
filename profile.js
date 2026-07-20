import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    location.href = "index.html";
    return;
  }

  document.getElementById("email").innerText = user.email;
  document.getElementById("uid").innerText = user.uid;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();

    document.getElementById("balance").innerText =
      (data.balance || 0) + " Coins";

    document.getElementById("joinDate").innerText =
      data.createdAt || "Unknown";
  }

});

window.logout = async function () {

  await signOut(auth);

  alert("Logged Out Successfully");

  location.href = "index.html";

};
