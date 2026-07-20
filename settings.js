import { auth } from "./firebase.js";

import {
signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

window.logout = async function () {

    await signOut(auth);

    alert("✅ Logged Out");

    location.href = "index.html";

};