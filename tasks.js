import { auth, db } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    currentUser = user;
});

window.claimTask = async function(reward) {

    if (!currentUser) {
        alert("Please Login First");
        return;
    }

    const ref = doc(db, "users", currentUser.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    let balance = snap.data().balance || 0;

    balance += reward;

    await updateDoc(ref, {
        balance: balance
    });

    alert("🎉 Task Completed! +" + reward + " Coins");
};