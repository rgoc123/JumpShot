/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

width = 260;
height = 450;
keyLeft = false;
keyRight = false;

window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyLifted, false);

gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = width;
gameCanvas.height = height;
ctx = gameCanvas.getContext("2d");

let jumpShot = new Game();
jumpShot.startScreen();

function checkKeyPressed (event) {
  switch(event.keyCode) {
    case 37:
      keyLeft = true;
      break;
    case 39:
      keyRight = true;
      break;
    case 13:
      jumpShot.startGame();
      break;
  }
}

function checkKeyLifted (event) {
  keyLeft = false;
  keyRight = false;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Ball = __webpack_require__(2);
const Platform = __webpack_require__(3);
const Hoop = __webpack_require__(7);

class Game {

  constructor() {
    this.image = new Image();
    this.image.src = "./assets/court.jpg";
    this.level = 1;
    this.lastPoints = 0;
    this.numPlatforms = 6;
    this.platforms = [];
    this.platformWidth = 70;
    this.platformHeight = 10;
    this.points = 0;
    this.gLoop = null;
    this.ball = new Ball();
    this.hoop = null;
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
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(this.image, 0, 0, 260, 450);
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

  createHoop() {
    this.hoop = new Hoop();
    this.hoop.render();
  }

  updateHoop() {
    if (this.hoop.Y - 20 > height || this.hoop.hit) {
      this.hoop.hit = false;
      this.hoop.X = Math.random() * width;
      this.hoop.Y = 0 - 20;
    } else {
      this.hoop.Y += dY;
    }
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
    // this.clear();

    ctx.fillStyle = "White";
    ctx.font = "20px Courier New";
    ctx.fillText("SCORE: " + this.points, 2, 15);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
    if (this.X > 0) {
      this.setPos(this.X - 10, this.Y);
    }
  }

  moveRight() {
    if (this.X < width - this.width) {
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Platform {
  constructor(game, x, y) {
    this.game = game;
    this.X = Math.floor(x);
    this.Y = y;
    this.hasCollided = false;
    this.width = (70 / this.game.level);
    this.height = 10;
  }

  render() {
    ctx.fillStyle = "#ac1406";
    ctx.fillRect(this.X, this.Y, this.width, this.height);
    return this;
  }

}

module.exports = Platform;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map