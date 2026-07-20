import { auth } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (!user) {
        location.href = "index.html";
        return;
    }

    document.getElementById("refCode").innerText =
        user.uid.substring(0, 8).toUpperCase();

});

window.copyCode = function () {

    const code = document.getElementById("refCode").innerText;

    navigator.clipboard.writeText(code);

    alert("✅ Referral Code Copied");

};