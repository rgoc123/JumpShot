const Game = require('./game.js');

width = 260;
height = 450;
keyLeft = false;
keyRight = false;

window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyLifted, false);

gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = width;
gameCanvas.height = height;
ctx = gameCanvas.getContext("2d");

let jumpShot = new Game();
jumpShot.splash();

function checkKeyPressed (event) {
  switch(event.keyCode) {
    case 37:
      keyLeft = true;
      break;
    case 39:
      keyRight = true;
      break;
    case 13:
      jumpShot.startGame();
      break;
  }
}

function checkKeyLifted (event) {
  keyLeft = false;
  keyRight = false;
}
