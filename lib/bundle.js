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

let platform = {
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.fillRect(350, 400, 100, 5);
    ctx.closePath();
  }
};

platform.draw();

const collision = () => {

  if ((ball.x > 350) && (ball.x < 450) && (((ball.y + 25) > 400) && ((ball.y + 25) < 403))) {
    ball.up = true;
    ball.down = false;
  }
};

const jump = () => {
  if (ball.up === true) {
    if (ball.y > 25) {
      ball.y -= ball.velocity;
      clear();
      ball.draw();
      platform.draw();
    } else {
      ball.up = false;
      ball.down = true;
    }
  } else if (ball.down === true) {
    collision();
    if (ball.y < 475) {
      ball.y += ball.velocity;
      clear();
      ball.draw();
      platform.draw();
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
      ball.x -= 10;
      clear();
      ball.draw();
      platform.draw();
      break;
    //up
    case 38:
      ball.up = true;
      setInterval(() => jump(), 10);
      break;
    //right
    case 39:
      ball.x += 10;
      clear();
      ball.draw();
      platform.draw();
      break;
    //down
    case 40:
      setInterval(() => fall(), 10);
      break;
  }
};

window.addEventListener("keydown", whatKey, false);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball_js__ = __webpack_require__(2);


class Game {
  constructor() {
    this.ball = new __WEBPACK_IMPORTED_MODULE_0__ball_js__["a" /* default */](this);
  }

  
}

/* unused harmony default export */ var _unused_webpack_default_export = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map