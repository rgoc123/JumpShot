const Ball = require('./ball.js');
const Platform = require('./platform.js');

class Game {

  constructor() {
    this.image = new Image();
    this.image.src = "./assets/court.jpg";
    this.level = 1;
    this.numPlatforms = 6;
    this.platforms = [];
    this.platformWidth = 70;
    this.platformHeight = (10 / this.level);
    // this.numClouds = 4;
    // this.clouds = [];
    // this.jewel = null;
    this.score = 0;
    this.gLoop = null;
    this.ball = new Ball();
  }

  clr() {
    ctx.fillStyle = this.image;
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(this.image, 0, 0, 260, 450);
  }

  splash() {
    let img = new Image();

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = "./assets/court.jpg";
  }

  createPlatforms() {
    let position = 0;

    for (let i = 0; i < this.numPlatforms; i++) {
      // type = Math.floor(Math.random() * 8);
      this.platforms[i] = new Platform(this, Math.random() * (width-this.platformWidth), position);
      if (position < height - this.platformHeight) {
        position += Math.floor(height / this.numPlatforms);
      }
    }
  }

  checkMove() {
    if (keyLeft) {
      this.ball.moveLeft();
    } else if (keyRight) {
      this.ball.moveRight();
    }
  }

  jumpCon() {
    let ballContext = this.ball;
    let gameContext = this;

    if (ballContext.Y > height*0.5) {
      ballContext.setPos(ballContext.X, ballContext.Y - ballContext.jumpVel);
    } else {
      // this.updateClouds(ballContext.jumpVel * 0.5);
      // this.updateJewel(ballContext.jumpVel * 0.5);

      this.platforms.forEach(function (platform, index) {
        platform.Y += ballContext.jumpVel;

        if (platform.Y > height) {
          let type = Math.floor(Math.random() * 8);

          gameContext.platforms[index] = new Platform(gameContext, Math.random() * (width - gameContext.platformWidth), platform.Y - height, type);
        }
      });
    }

    ballContext.jumpVel --;

    if (ballContext.jumpVel === 0) {
      ballContext.isJumping = false;
      ballContext.isFalling = true;
      ballContext.fallVel = 1;
    }
  }

  fallCon() {
    let ballContext = this.ball;

    if (ballContext.Y < height - ballContext.height) {
      ballContext.setPos(ballContext.X, ballContext.Y + ballContext.fallVel);
      ballContext.fallVel++;
    } else {
      ballContext.fallStop();
    }
  }

  checkPlatformCollision() {
    let gameRef = this;

    for (let i = 0; i < this.platforms.length; i++) {

      if (
          (gameRef.ball.isFalling) &&
          !(gameRef.ball.X + gameRef.ball.width < this.platforms[i].X ||
            gameRef.ball.X > this.platforms[i].X + this.platformWidth ||
            gameRef.ball.Y + gameRef.ball.height < this.platforms[i].Y ||
            gameRef.ball.Y > this.platforms[i].Y + this.platformHeight)

         ) {
            gameRef.onPlatformCollision(this.platforms[i].type);
            break;
      }
    }
  }

  onPlatformCollision() {
    this.ball.fallStop();
    this.score += 10;
  }

  gameLoop() {

    this.checkMove();
    this.clr();

    if (this.ball.isJumping) {
      this.jumpCon();
    }

    if (this.ball.isFalling) {
      this.fallCon();
    }

    this.ball.render();

    this.platforms.forEach(function(platform){
      platform.render();
    });
    this.checkPlatformCollision();

    // this.clr();

    ctx.fillStyle = "White";
    ctx.font = "20px Courier New";
    ctx.fillText("SCORE: " + this.score, 2, 15);

    if (!this.gameOver()) {
      this.gLoop = setTimeout(this.gameLoop.bind(this), 20);
    } else {
      setTimeout(this.splash.bind(this), 1000);
    }
  }

  startGame() {
    this.ball.reset();
    this.score = 0;
    this.ball.setPos(Math.floor((width-this.ball.width)/2), (height - this.ball.height)/2);
    this.createPlatforms();
    // this.createClouds();
    // this.createJewel();
    this.ball.jump();
    this.gameLoop();
  }

  gameOver() {
    if (this.ball.Y > height - this.ball.height) {
      return true;
    } else {
      return false;
    }
  }

}


module.exports = Game;
