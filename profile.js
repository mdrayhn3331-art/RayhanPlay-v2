import { auth, db } from "./firebase.js";

import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user)=>{

    if(!user){

        location.href="index.html";
        return;

    }

    document.getElementById("userEmail").innerText=user.email;

    document.getElementById("userId").innerText=user.uid;

    const snap=await getDoc(doc(db,"users",user.uid));

    if(snap.exists()){

        document.getElementById("userBalance").innerText=snap.data().balance+" Coins";

    }

});

window.logout=async function(){

    await signOut(auth);

    location.href="index.html";

}