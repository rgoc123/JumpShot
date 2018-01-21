const Ball = require('./ball.js');
const Platform = require('./platform.js');

class Game {

  constructor() {
    this.image = new Image();
    this.image.src = "./assets/court.jpg";
    this.ball = new Ball();
    this.level = 1;
    this.points = 0;
    this.lastPoints = 0;
    this.platforms = [];
    this.numPlatforms = 6;
    this.platformWidth = 70;
    this.platformHeight = 10;
    this.gLoop = null;
  }

  startScreen() {
    let img = new Image();

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = "./assets/court.jpg";
  }

  clear() {
    ctx.fillStyle = this.image;
    ctx.drawImage(this.image, 0, 0, 260, 450);
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
      this.platforms.forEach(function (platform, index) {
        platform.Y += ballContext.jumpVel;

        if (platform.Y > height) {
          let type = Math.floor(Math.random() * 8);

          gameContext.platforms[index] = new Platform(gameContext, Math.random() * (width - gameContext.platformWidth), platform.Y - height);
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

  createPlatforms() {
    let position = 0;

    for (let i = 0; i < this.numPlatforms; i++) {
      this.platforms[i] = new Platform(this, Math.random() * (width-this.platformWidth), position);
      if (position < height - this.platformHeight) {
        position += Math.floor(height / this.numPlatforms);
      }
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
           if (this.platforms[i].hasCollided === false) {
             this.points += 10;
           }
            gameRef.onPlatformCollision(i);
            break;
      }
    }
  }

  onPlatformCollision(i) {
    this.ball.fallStop();
    this.platforms[i].hasCollided = true;
  }

  changeLevel() {
    if (this.points - this.lastPoints === 200) {
      this.level += 1;
      this.platformWidth /= this.level;
      this.lastPoints = this.points;
    }
  }

  gameLoop() {

    this.checkMove();
    this.clear();

    if (this.ball.isJumping) {
      this.jumpCon();
    }

    if (this.ball.isFalling) {
      this.fallCon();
    }

    this.ball.render();

    this.checkPlatformCollision();

    this.platforms.forEach(platform => {
      platform.render();
    });

    this.changeLevel();

    ctx.fillStyle = "Red";
    ctx.font = "20px Courier New";
    ctx.fillText("LEVEL: " + this.level, 2, 15);

    ctx.fillStyle = "Red";
    ctx.font = "20px Courier New";
    ctx.fillText("POINTS: " + this.points, 2, 30);

    if (!this.gameOver()) {
      this.gLoop = setTimeout(this.gameLoop.bind(this), 20);
    } else {
      setTimeout(this.startScreen.bind(this), 1000);
      this.level = 1;
      this.platformWidth = 70;
      this.lastPoints = 0;
    }
  }

  startGame() {
    this.ball.reset();
    this.points = 0;
    this.ball.setPos(Math.floor((width-this.ball.width)/2), (height - this.ball.height)/2);
    this.createPlatforms();
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
