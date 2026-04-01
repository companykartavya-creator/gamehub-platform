// IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 APNA CONFIG YAHAN PASTE KAR
const firebaseConfig = {
  apiKey: "AIzaSyDAc_qZ24aJyeKmt4O0APmmKYaN8Ukf5xQ",
  authDomain: "gamehub-29519.firebaseapp.com",
  projectId: "gamehub-29519",
  storageBucket: "gamehub-29519.firebasestorage.app",
  messagingSenderId: "778815045155",
  appId: "1:778815045155:web:5f05b137874eb0c4d77b96",
  measurementId: "G-MLT78GCJ3Y"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

let currentUser = "Guest";

// LOGIN
window.loginGoogle = function () {
  signInWithPopup(auth, provider).then(result => {
    currentUser = result.user.displayName;
    document.getElementById("user").innerText = "👋 " + currentUser;
  });
};

// SAVE SCORE
window.saveScoreGlobal = async function (score) {
  await setDoc(doc(db, "scores", currentUser), {
    name: currentUser,
    score: score
  });
};

// LOAD LEADERBOARD
window.loadLeaderboardGlobal = async function () {
  const querySnapshot = await getDocs(collection(db, "scores"));

  let list = "";
  querySnapshot.forEach(doc => {
    let d = doc.data();
    list += d.name + " - " + d.score + "<br>";
  });

  document.getElementById("leaderboard").innerHTML = list;
};
