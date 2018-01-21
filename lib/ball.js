class Ball {

  constructor() {
    // this.game = game;
    this.image = new Image();
    this.image.src = "./assets/basketball.png";
    this.width = 45;
    this.height = 45;
    this.X = 0;
    this.Y = 0;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVel = 0;
    this.fallVel = 0;
  }

  setPos(x, y) {
    this.X = x;
    this.Y = y;
  }

  render() {
    ctx.drawImage(this.image, 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);
  }

  jump() {
    if (!this.isJumping && !this.isFalling) {
      this.fallVel = 0;
      this.isJumping = true;
      this.jumpVel = 18;
    }
  }

  fallStop() {
    this.isFalling = false;
    this.fallVel = 0;
    this.jump();
  }

  moveLeft() {
    if (this.X > -21) {
      this.setPos(this.X - 10, this.Y);
    }
  }

  moveRight() {
    if (this.X < 282) {
      this.setPos(this.X + 10, this.Y);
    }
  }

  reset() {
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVel = 0;
    this.fallVel = 0;
  }

}

module.exports = Ball;
