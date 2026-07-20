import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const historyList = document.getElementById("historyList");

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    location.href = "index.html";
    return;
  }

  historyList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "withdraws"));

  let found = false;

  snapshot.forEach((doc) => {

    const data = doc.data();

    if (data.uid === user.uid) {

      found = true;

      historyList.innerHTML += `
        <div class="balance-card">
          <p><b>Amount:</b> ${data.amount} Coins</p>
          <p><b>Method:</b> ${data.method}</p>
          <p><b>Number:</b> ${data.number}</p>
          <p><b>Status:</b> ${data.status}</p>
          <p><b>Date:</b> ${data.createdAt}</p>
        </div>
        <br>
      `;
    }

  });

  if (!found) {
    historyList.innerHTML = "<p>No withdraw history found.</p>";
  }

});
