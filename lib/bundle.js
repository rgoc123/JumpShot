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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);


let gameCanvas = document.getElementById('game-canvas');
gameCanvas.width = 500;
gameCanvas.height = 500;
let ctx = gameCanvas.getContext("2d");

const clear = () => {
  ctx.fillStyle = "white";
  ctx.rect(0, 0, 500, 500);
  ctx.fill();
};

let ball = {
  x: 30,
  y: 475,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
  velocity: 3,
  up: false,
  down: false
};

ball.draw();

const jump = () => {
  if (ball.up === true) {
    if (ball.y > 250) {
      ball.y -= ball.velocity;
      ball.draw();
      clear();
    } else {
      ball.up = false;
      ball.down = true;
    }
  } else if (ball.down === true) {
    if (ball.y < 475) {
      ball.y += ball.velocity;
      ball.draw();
      clear();
    } else {
      ball.up = true;
      ball.down = false;
    }
  }
};

const whatKey = (event) => {
  switch (event.keyCode) {
    //left
    case 37:
      ball.x -= 5;
      ball.draw();
      clear();
      break;
    //up
    case 38:
      ball.up = true;
      setInterval(() => jump(), 10);
      break;
    //right
    case 39:
      ball.x += 5;
      ball.draw();
      clear();
      break;
    //down
    case 40:
      setInterval(() => fall(), 10);
      break;
  }
};

// const gameLoop = () => {
//   whatKey();
//   clear();
//   ball.draw();
// };

// gameLoop();

window.addEventListener("keydown", whatKey, false);

// let jumpShot = new Game(ctx);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball_js__ = __webpack_require__(2);


class Game {
  constructor(ctx) {
    this.ball = new __WEBPACK_IMPORTED_MODULE_0__ball_js__["a" /* default */](ctx);
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map