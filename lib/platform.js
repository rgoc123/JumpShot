let Platform = function (game, x, y) {
  this.game = game;
  this.X = Math.floor(x);
  this.Y = y;
  this.hasCollided = false;
  this.width = (70 / this.game.level);
  this.height = 10;
};

Platform.prototype.render = function () {
    ctx.fillStyle = "#ac1406";
    ctx.fillRect(this.X, this.Y, this.width, this.height);
    return this;
  };

module.exports = Platform;
