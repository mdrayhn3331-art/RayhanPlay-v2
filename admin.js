import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const requestList = document.getElementById("requestList");

async function loadRequests() {

  requestList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "withdraws"));

  snapshot.forEach((item) => {

    const data = item.data();

    requestList.innerHTML += `
      <div class="card">
        <h3>${data.email || "Unknown User"}</h3>
        <p>Method: ${data.method}</p>
        <p>Number: ${data.number}</p>
        <p>Amount: ${data.amount} Coins</p>
        <p>Status: ${data.status}</p>

        ${
          data.status === "Pending"
            ? `
              <button onclick="approve('${item.id}')">✅ Approve</button>
              <button onclick="reject('${item.id}')">❌ Reject</button>
            `
            : ""
        }

        <hr>
      </div>
    `;
  });

}

window.approve = async function(id) {

  const withdrawRef = doc(db, "withdraws", id);
  const withdrawSnap = await getDoc(withdrawRef);

  if (!withdrawSnap.exists()) return;

  await updateDoc(withdrawRef, {
    status: "Approved"
  });

  alert("Withdraw Approved");
  loadRequests();

}

window.reject = async function(id) {

  const withdrawRef = doc(db, "withdraws", id);

  await updateDoc(withdrawRef, {
    status: "Rejected"
  });

  alert("Withdraw Rejected");
  loadRequests();

}

loadRequests();
