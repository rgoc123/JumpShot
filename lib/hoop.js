class Hoop {
  constructor() {
    this.X = Math.random() * width;
    this.Y = Math.random() * height;
    this.hit = false;
    this.image = new Image();
    this.image.src = "./assets/hoop.png";
  }

  render() {
    ctx.drawImage(this.image, 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);
  }
}

module.exports = Hoop;
