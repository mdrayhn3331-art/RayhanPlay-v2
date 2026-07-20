import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

let balance = 0;
let currentUser = null;

// Balance Update
function updateBalance() {
    document.getElementById("balance").innerText = balance + " Coins";
}

// Load User Data
onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    currentUser = user;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {

        balance = snap.data().balance || 0;

        updateBalance();

    }

});

// Daily Bonus
window.dailyBonus = async function () {

    if (!currentUser) {
        alert("Please Login First");
        return;
    }

    balance += 5;

    updateBalance();

    await updateDoc(doc(db, "users", currentUser.uid), {
        balance: balance
    });

    alert("🎁 +5 Coins Added");

};

// Tasks
window.tasks = async function () {

    if (!currentUser) return;

    balance += 10;

    updateBalance();

    await updateDoc(doc(db, "users", currentUser.uid), {
        balance: balance
    });

    alert("📋 Task Reward +10 Coins");

};

// Referral
window.referral = function () {

    if (!currentUser) {
        alert("Please Login");
        return;
    }

    alert("👥 Your Referral ID:\n\n" + currentUser.uid);

};

// Withdraw
window.withdraw = function () {

    if (balance < 10000) {

        alert("❌ Minimum 10000 Coins Required");

        return;

    }

    alert("✅ Withdraw Request Submitted");

};