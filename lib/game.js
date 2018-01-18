import Ball from "./ball.js";

class Game {
  constructor(ctx) {
    this.ball = new Ball(ctx);
  }
}

export default Game;
