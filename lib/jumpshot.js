import Game from "./game.js";

let gameCanvas = document.getElementById('game-canvas');
gameCanvas.width = 500;
gameCanvas.height = 500;
let ctx = gameCanvas.getContext("2d");

const clear = () => {
  ctx.fillStyle = "white";
  ctx.rect(0, 0, 500, 500);
  ctx.fill();
};

let ball = {
  x: 30,
  y: 475,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
  velocity: 3,
  up: false,
  down: false
};

ball.draw();

const jump = () => {
  if (ball.up === true) {
    if (ball.y > 250) {
      ball.y -= ball.velocity;
      ball.draw();
      clear();
    } else {
      ball.up = false;
      ball.down = true;
    }
  } else if (ball.down === true) {
    if (ball.y < 475) {
      ball.y += ball.velocity;
      ball.draw();
      clear();
    } else {
      ball.up = true;
      ball.down = false;
    }
  }
};

const whatKey = (event) => {
  switch (event.keyCode) {
    //left
    case 37:
      ball.x -= 5;
      ball.draw();
      clear();
      break;
    //up
    case 38:
      ball.up = true;
      setInterval(() => jump(), 10);
      break;
    //right
    case 39:
      ball.x += 5;
      ball.draw();
      clear();
      break;
    //down
    case 40:
      setInterval(() => fall(), 10);
      break;
  }
};

// const gameLoop = () => {
//   whatKey();
//   clear();
//   ball.draw();
// };

// gameLoop();

window.addEventListener("keydown", whatKey, false);

// let jumpShot = new Game(ctx);
