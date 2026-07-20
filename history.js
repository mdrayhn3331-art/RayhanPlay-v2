import { auth, db } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, async(user)=>{

if(!user)return;

const q=query(
collection(db,"withdraws"),
where("uid","==",user.uid)
);

const snap=await getDocs(q);

const list=document.getElementById("historyList");

list.innerHTML="";

snap.forEach(doc=>{

const data=doc.data();

list.innerHTML+=`

<div class="balance-card">

<h3>${data.method}</h3>

<p>${data.amount} Coins</p>

<p>Status : ${data.status}</p>

</div>

`;

});

});