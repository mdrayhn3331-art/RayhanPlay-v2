import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadWithdraws() {

    const list = document.getElementById("withdrawList");

    list.innerHTML = "";

    const snap = await getDocs(collection(db, "withdraws"));

    snap.forEach((doc) => {

        const data = doc.data();

        list.innerHTML += `
            <div class="balance-card">
                <h3>${data.method}</h3>
                <p>Number: ${data.number}</p>
                <p>Amount: ${data.amount} Coins</p>
                <p>Status: ${data.status}</p>
            </div>
        `;

    });

}

loadWithdraws();