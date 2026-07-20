import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const requestList = document.getElementById("requestList");

async function loadRequests() {

  requestList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "withdraws"));

  querySnapshot.forEach((item) => {

    const data = item.data();

    requestList.innerHTML += `
      <div class="card">
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Amount:</b> ${data.amount}</p>

        <button onclick="approve('${item.id}')">✅ Approve</button>

        <button onclick="reject('${item.id}')">❌ Reject</button>
      </div>
    `;

  });

}

window.approve = async function(id) {

  await updateDoc(doc(db, "withdraws", id), {
    status: "Approved"
  });

  alert("Withdraw Approved");

  loadRequests();

}

window.reject = async function(id) {

  await deleteDoc(doc(db, "withdraws", id));

  alert("Withdraw Rejected");

  loadRequests();

}

loadRequests();
