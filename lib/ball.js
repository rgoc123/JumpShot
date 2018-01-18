class Ball {
  constructor(game) {
    this.x = 30;
    this.y = 475;
    this.radius = 25;
    this.color = 'blue';
    this.velocity = 3;
    this.up = false;
    this.down = false;
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}


export default Ball;
