// NAVIGATION (buttons fix)
function playGame(game) {
  window.location.href = "games/" + game;
}

function randomGame() {
  const games = ["flappy.html", "reaction.html", "click.html"];
  let g = games[Math.floor(Math.random() * games.length)];
  window.location.href = "games/" + g;
}

// LOGIN (TEMP FIX VERSION)
function login() {
  let name = prompt("Enter your name:");
  if (name) {
    localStorage.setItem("user", name);
    document.getElementById("user").innerText = "👋 " + name;
  }
}

// LOAD USER
window.onload = function () {
  let user = localStorage.getItem("user");
  if (user) {
    document.getElementById("user").innerText = "👋 " + user;
  }
};

// GLOBAL LEADERBOARD (LOCAL VERSION)
function saveScoreGlobal(score) {
  let user = localStorage.getItem("user") || "Guest";

  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.push({ name: user, score: score });

  localStorage.setItem("scores", JSON.stringify(scores));
}

function loadLeaderboard() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.sort((a, b) => b.score - a.score);

  let html = "";

  scores.slice(0, 10).forEach(s => {
    html += s.name + " - " + s.score + "<br>";
  });

  document.getElementById("leaderboard").innerHTML = html;
}
