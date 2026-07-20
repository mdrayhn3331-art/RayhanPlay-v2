import { auth, db } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    collection,
    addDoc,email: currentUser.email,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    currentUser = user;
});

window.submitWithdraw = async function () {

    if (!currentUser) {
        alert("Please Login");
        return;
    }

    const amount = Number(document.getElementById("amount").value);
    const number = document.getElementById("number").value;
    const method = document.getElementById("method").value;
    if (!method || !number) {
    alert("Please select payment method and enter your number");
    return;
    }
    const ref = doc(db, "users", currentUser.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const balance = snap.data().balance || 0;

    if (amount < 10000) {
        alert("Minimum 10000 Coins");
        return;
    }

    if (balance < amount) {
        alert("Insufficient Balance");
        return;
    }

    await addDoc(collection(db, "withdraws"), {
        uid: currentUser.uid,
        method: method,
        number: number,
        amount: amount,
        status: "Pending",
        createdAt: new Date().toISOString()
    });


    alert("✅ Withdraw Request Submitted");
};
