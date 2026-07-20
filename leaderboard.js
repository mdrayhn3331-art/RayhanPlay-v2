import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadLeaderboard() {

  const list = document.getElementById("leaderboardList");

  list.innerHTML = "";

  const q = query(
    collection(db, "users"),
    orderBy("balance", "desc"),
    limit(10)
  );

  const snap = await getDocs(q);

  let rank = 1;

  snap.forEach((doc) => {

    const user = doc.data();

    list.innerHTML += `
      <div style="padding:10px;border-bottom:1px solid #333;">
        <b>#${rank}</b><br>
        ${user.email}<br>
        💰 ${user.balance} Coins
      </div>
    `;

    rank++;

  });

}

loadLeaderboard();