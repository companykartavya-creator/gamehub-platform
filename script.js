// 🔥 IMPORTS (Firebase CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDAc_qZ24aJyeKmt4O0APmmKYaN8Ukf5xQ",
    authDomain: "gamehub-29519.firebaseapp.com",
    projectId: "gamehub-29519",
    storageBucket: "gamehub-29519.firebasestorage.app",
    messagingSenderId: "778815045155",
    appId: "1:778815045155:web:5f05b137874eb0c4d77b96",
    measurementId: "G-MLT78GCJ3Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

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
