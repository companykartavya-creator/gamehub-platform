// 🔥 IMPORTS (Firebase CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE"
};

// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

let currentUser = "Guest";

// LOGIN
window.login = function () {
  signInWithPopup(auth, provider).then(result => {
    currentUser = result.user.displayName;
    document.getElementById("user").innerText = "👋 " + currentUser;
  });
};

// NAVIGATION
window.playGame = function (game) {
  window.location.href = "games/" + game;
};

window.randomGame = function () {
  const games = ["flappy.html", "reaction.html", "click.html"];
  let g = games[Math.floor(Math.random() * games.length)];
  window.location.href = "games/" + g;
};

// SAVE SCORE
window.saveScoreGlobal = async function (score) {
  await setDoc(doc(db, "scores", currentUser), {
    name: currentUser,
    score: score
  });
};

// LOAD LEADERBOARD
window.loadLeaderboard = async function () {
  const querySnapshot = await getDocs(collection(db, "scores"));
  let list = "";

  querySnapshot.forEach(doc => {
    let data = doc.data();
    list += data.name + " - " + data.score + "<br>";
  });

  document.getElementById("leaderboard").innerHTML = list;
};
