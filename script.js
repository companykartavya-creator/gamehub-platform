function playGame(game) {
  window.location.href = "games/" + game;
}

function randomGame() {
  const games = ["flappy.html", "reaction.html", "click.html"];
  let g = games[Math.floor(Math.random() * games.length)];
  window.location.href = "games/" + g;
}
