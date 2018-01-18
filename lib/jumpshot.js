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

let platform = {
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.fillRect(350, 400, 100, 5);
    ctx.closePath();
  }
};

platform.draw();

const collision = () => {

  if ((ball.x > 350) && (ball.x < 450) && (((ball.y + 25) > 400) && ((ball.y + 25) < 403))) {
    ball.up = true;
    ball.down = false;
  }
};

const jump = () => {
  if (ball.up === true) {
    if (ball.y > 25) {
      ball.y -= ball.velocity;
      clear();
      ball.draw();
      platform.draw();
    } else {
      ball.up = false;
      ball.down = true;
    }
  } else if (ball.down === true) {
    collision();
    if (ball.y < 475) {
      ball.y += ball.velocity;
      clear();
      ball.draw();
      platform.draw();
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
      ball.x -= 10;
      clear();
      ball.draw();
      platform.draw();
      break;
    //up
    case 38:
      ball.up = true;
      setInterval(() => jump(), 10);
      break;
    //right
    case 39:
      ball.x += 10;
      clear();
      ball.draw();
      platform.draw();
      break;
    //down
    case 40:
      setInterval(() => fall(), 10);
      break;
  }
};

window.addEventListener("keydown", whatKey, false);
