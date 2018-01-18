class Ball {
  constructor(ctx) {
    this.width = 40;
    this.height = 40;
    this.ctx = ctx;
  }

  render(ctx) {
    this.ctx.arc(
      0,
      0,
      5,
      0,
      2 * Math.PI,
      false
    );
  }
}


export default Ball;
