class Platform {
  constructor(game, x, y) {
    this.game = game;
    this.X = Math.floor(x);
    this.Y = y;
    this.hasCollided = false;
    this.width = (70 / this.game.level);
    this.height = 5;
  }

  render() {
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(this.X, this.Y, this.width, this.height);
    return this;
  }

}

module.exports = Platform;
