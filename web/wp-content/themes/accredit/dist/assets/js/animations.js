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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery2.default;

(0, _jquery2.default)(document).ready(function () {

  var animCompass = {
    container: document.getElementById('compass'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/compass.json'
  };
  var compass = bodymovin.loadAnimation(animCompass);
  var card = document.getElementById('compass-card');
  if (card) {
    card.addEventListener('mouseover', function (event) {
      compass.play();
    });
    card.addEventListener('mouseleave', function (event) {
      compass.stop();
    });
    card.addEventListener('touchstart', function (event) {
      compass.play();
    });
    card.addEventListener('touchend', function (event) {
      compass.stop();
    });
  }

  var animBattery = {
    container: document.getElementById('battery'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/charging.json'
  };
  var battery = bodymovin.loadAnimation(animBattery);
  var card02 = document.getElementById('battery-card');
  if (card02) {
    card02.addEventListener('mouseover', function (event) {
      battery.play();
    });
    card02.addEventListener('mouseleave', function (event) {
      battery.stop();
    });
    card02.addEventListener('touchstart', function (event) {
      battery.play();
    });
    card02.addEventListener('touchend', function (event) {
      battery.stop();
    });
  }

  var animChat = {
    container: document.getElementById('chatty-chat'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/chatty-chat.json'
  };
  var chat = bodymovin.loadAnimation(animChat);
  var card03 = document.getElementById('chatty-chat-card');
  if (card03) {
    card03.addEventListener('mouseover', function (event) {
      chat.play();
    });
    card03.addEventListener('mouseleave', function (event) {
      chat.stop();
    });
    card03.addEventListener('touchstart', function (event) {
      chat.play();
    });
    card03.addEventListener('touchend', function (event) {
      chat.stop();
    });
  }

  var animHeart = {
    container: document.getElementById('heart'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/heart.json'
  };
  var heart = bodymovin.loadAnimation(animHeart);
  var card04 = document.getElementById('heart-card');
  if (card04) {
    card04.addEventListener('mouseover', function (event) {
      heart.play();
    });
    card04.addEventListener('mouseleave', function (event) {
      heart.stop();
    });
    card04.addEventListener('touchstart', function (event) {
      heart.play();
    });
    card04.addEventListener('touchend', function (event) {
      heart.stop();
    });
  }

  var animHuman = {
    container: document.getElementById('human'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/human.json'
  };
  var human = bodymovin.loadAnimation(animHuman);
  var card05 = document.getElementById('human-card');
  if (card05) {
    card05.addEventListener('mouseover', function (event) {
      human.play();
    });
    card05.addEventListener('mouseleave', function (event) {
      human.stop();
    });
    card05.addEventListener('touchstart', function (event) {
      human.play();
    });
    card05.addEventListener('touchend', function (event) {
      human.stop();
    });
  }

  var animMoon = {
    container: document.getElementById('moon'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/moon.json'
  };
  var moon = bodymovin.loadAnimation(animMoon);
  var card06 = document.getElementById('moon-card');
  if (card06) {
    card06.addEventListener('mouseover', function (event) {
      moon.play();
    });
    card06.addEventListener('mouseleave', function (event) {
      moon.stop();
    });
    card06.addEventListener('touchstart', function (event) {
      moon.play();
    });
    card06.addEventListener('touchend', function (event) {
      moon.stop();
    });
  }

  var animSun = {
    container: document.getElementById('sun'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/sun.json'
  };
  var sun = bodymovin.loadAnimation(animSun);
  var card07 = document.getElementById('sun-card');
  if (card07) {
    card07.addEventListener('mouseover', function (event) {
      sun.play();
    });
    card07.addEventListener('mouseleave', function (event) {
      sun.stop();
    });
    card07.addEventListener('touchstart', function (event) {
      sun.play();
    });
    card07.addEventListener('touchend', function (event) {
      sun.stop();
    });
  }

  var animTarget = {
    container: document.getElementById('target'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/target.json'
  };
  var target = bodymovin.loadAnimation(animTarget);
  var card08 = document.getElementById('target-card');
  if (card08) {
    card08.addEventListener('mouseover', function (event) {
      target.play();
    });
    card08.addEventListener('mouseleave', function (event) {
      target.stop();
    });
    card08.addEventListener('touchstart', function (event) {
      target.play();
    });
    card08.addEventListener('touchend', function (event) {
      target.stop();
    });
  }

  var animThought = {
    container: document.getElementById('thought'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'wp-content/themes/ms-toolkit/dist/assets/data/thoughts.json'
  };
  var thought = bodymovin.loadAnimation(animThought);
  var card09 = document.getElementById('thoughts-card');
  if (card09) {
    card09.addEventListener('mouseenter', function (event) {
      thought.play();
    });
    card09.addEventListener('mouseleave', function (event) {
      thought.stop();
    });
    card09.addEventListener('touchstart', function (event) {
      thought.play();
    });
    card09.addEventListener('touchend', function (event) {
      thought.stop();
    });
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzYxYmIxZDE3OGFlNWUxMmE3YWMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9hbmltYXRpb25zLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiYW5pbUNvbXBhc3MiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlcmVyIiwibG9vcCIsImF1dG9wbGF5IiwicGF0aCIsImNvbXBhc3MiLCJib2R5bW92aW4iLCJsb2FkQW5pbWF0aW9uIiwiY2FyZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInBsYXkiLCJzdG9wIiwiYW5pbUJhdHRlcnkiLCJiYXR0ZXJ5IiwiY2FyZDAyIiwiYW5pbUNoYXQiLCJjaGF0IiwiY2FyZDAzIiwiYW5pbUhlYXJ0IiwiaGVhcnQiLCJjYXJkMDQiLCJhbmltSHVtYW4iLCJodW1hbiIsImNhcmQwNSIsImFuaW1Nb29uIiwibW9vbiIsImNhcmQwNiIsImFuaW1TdW4iLCJzdW4iLCJjYXJkMDciLCJhbmltVGFyZ2V0IiwidGFyZ2V0IiwiY2FyZDA4IiwiYW5pbVRob3VnaHQiLCJ0aG91Z2h0IiwiY2FyZDA5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVy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QUFzQyxVQUFDQyxLQUFELEVBQVc7QUFDL0NzQixhQUFPcEIsSUFBUDtBQUNELEtBRkQ7QUFHQXFCLFdBQU94QixnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxVQUFDQyxLQUFELEVBQVc7QUFDL0NzQixhQUFPckIsSUFBUDtBQUNELEtBRkQ7QUFHQXNCLFdBQU94QixnQkFBUCxDQUF3QixVQUF4QixFQUFvQyxVQUFDQyxLQUFELEVBQVc7QUFDN0NzQixhQUFPcEIsSUFBUDtBQUNELEtBRkQ7QUFHRDs7QUFFRCxNQUFJc0IsY0FBYztBQUNoQm5DLGVBQVdILFNBQVNJLGNBQVQsQ0FBd0IsU0FBeEIsQ0FESztBQUVoQkMsY0FBVSxLQUZNO0FBR2hCQyxVQUFNLElBSFU7QUFJaEJDLGNBQVUsS0FKTTtBQUtoQkMsVUFBTTtBQUxVLEdBQWxCO0FBT0EsTUFBSStCLFVBQVU3QixVQUFVQyxhQUFWLENBQXdCMkIsV0FBeEIsQ0FBZDtBQUNBLE1BQUlFLFNBQVN4QyxTQUFTSSxjQUFULENBQXdCLGVBQXhCLENBQWI7QUFDQSxNQUFJb0MsTUFBSixFQUFZO0FBQ1ZBLFdBQU8zQixnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxVQUFDQyxLQUFELEVBQVc7QUFDL0N5QixjQUFReEIsSUFBUjtBQUNELEtBRkQ7QUFHQXlCLFdBQU8zQixnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxVQUFDQyxLQUFELEVBQVc7QUFDL0N5QixjQUFRdkIsSUFBUjtBQUNELEtBRkQ7QUFHQXdCLFdBQU8zQixnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxVQUFDQyxLQUFELEVBQVc7QUFDL0N5QixjQUFReEIsSUFBUjtBQUNELEtBRkQ7QUFHQXlCLFdBQU8zQixnQkFBUCxDQUF3QixVQUF4QixFQUFvQyxVQUFDQyxLQUFELEVBQVc7QUFDN0N5QixjQUFRdkIsSUFBUjtBQUNELEtBRkQ7QUFHRDtBQUNGLENBek5ELEUiLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNjFiYjFkMTc4YWU1ZTEyYTdhYyIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwialF1ZXJ5XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG53aW5kb3cuJCA9ICQ7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGFuaW1Db21wYXNzID0ge1xuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXBhc3MnKSxcbiAgICByZW5kZXJlcjogJ3N2ZycsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgcGF0aDogJ3dwLWNvbnRlbnQvdGhlbWVzL21zLXRvb2xraXQvZGlzdC9hc3NldHMvZGF0YS9jb21wYXNzLmpzb24nXG4gIH07XG4gIHZhciBjb21wYXNzID0gYm9keW1vdmluLmxvYWRBbmltYXRpb24oYW5pbUNvbXBhc3MpO1xuICB2YXIgY2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wYXNzLWNhcmQnKTtcbiAgaWYgKGNhcmQpIHtcbiAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgY29tcGFzcy5wbGF5KCk7XG4gICAgfSk7XG4gICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb21wYXNzLnN0b3AoKTtcbiAgICB9KTtcbiAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbXBhc3MucGxheSgpO1xuICAgIH0pO1xuICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbXBhc3Muc3RvcCgpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIGFuaW1CYXR0ZXJ5ID0ge1xuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdHRlcnknKSxcbiAgICByZW5kZXJlcjogJ3N2ZycsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgcGF0aDogJ3dwLWNvbnRlbnQvdGhlbWVzL21zLXRvb2xraXQvZGlzdC9hc3NldHMvZGF0YS9jaGFyZ2luZy5qc29uJ1xuICB9O1xuICB2YXIgYmF0dGVyeSA9IGJvZHltb3Zpbi5sb2FkQW5pbWF0aW9uKGFuaW1CYXR0ZXJ5KTtcbiAgdmFyIGNhcmQwMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXR0ZXJ5LWNhcmQnKTtcbiAgaWYgKGNhcmQwMikge1xuICAgIGNhcmQwMi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgIGJhdHRlcnkucGxheSgpO1xuICAgIH0pO1xuICAgIGNhcmQwMi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBiYXR0ZXJ5LnN0b3AoKTtcbiAgICB9KTtcbiAgICBjYXJkMDIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgYmF0dGVyeS5wbGF5KCk7XG4gICAgfSk7XG4gICAgY2FyZDAyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgICBiYXR0ZXJ5LnN0b3AoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBhbmltQ2hhdCA9IHtcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0dHktY2hhdCcpLFxuICAgIHJlbmRlcmVyOiAnc3ZnJyxcbiAgICBsb29wOiB0cnVlLFxuICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICBwYXRoOiAnd3AtY29udGVudC90aGVtZXMvbXMtdG9vbGtpdC9kaXN0L2Fzc2V0cy9kYXRhL2NoYXR0eS1jaGF0Lmpzb24nXG4gIH07XG4gIHZhciBjaGF0ID0gYm9keW1vdmluLmxvYWRBbmltYXRpb24oYW5pbUNoYXQpO1xuICB2YXIgY2FyZDAzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXR0eS1jaGF0LWNhcmQnKTtcbiAgaWYgKGNhcmQwMykge1xuICAgIGNhcmQwMy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgIGNoYXQucGxheSgpO1xuICAgIH0pO1xuICAgIGNhcmQwMy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBjaGF0LnN0b3AoKTtcbiAgICB9KTtcbiAgICBjYXJkMDMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgY2hhdC5wbGF5KCk7XG4gICAgfSk7XG4gICAgY2FyZDAzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgICBjaGF0LnN0b3AoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBhbmltSGVhcnQgPSB7XG4gICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhcnQnKSxcbiAgICByZW5kZXJlcjogJ3N2ZycsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgcGF0aDogJ3dwLWNvbnRlbnQvdGhlbWVzL21zLXRvb2xraXQvZGlzdC9hc3NldHMvZGF0YS9oZWFydC5qc29uJ1xuICB9O1xuICB2YXIgaGVhcnQgPSBib2R5bW92aW4ubG9hZEFuaW1hdGlvbihhbmltSGVhcnQpO1xuICB2YXIgY2FyZDA0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYXJ0LWNhcmQnKTtcbiAgaWYgKGNhcmQwNCkge1xuICAgIGNhcmQwNC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgIGhlYXJ0LnBsYXkoKTtcbiAgICB9KTtcbiAgICBjYXJkMDQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChldmVudCkgPT4ge1xuICAgICAgaGVhcnQuc3RvcCgpO1xuICAgIH0pO1xuICAgIGNhcmQwNC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGV2ZW50KSA9PiB7XG4gICAgICBoZWFydC5wbGF5KCk7XG4gICAgfSk7XG4gICAgY2FyZDA0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgICBoZWFydC5zdG9wKCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgYW5pbUh1bWFuID0ge1xuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWFuJyksXG4gICAgcmVuZGVyZXI6ICdzdmcnLFxuICAgIGxvb3A6IHRydWUsXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgIHBhdGg6ICd3cC1jb250ZW50L3RoZW1lcy9tcy10b29sa2l0L2Rpc3QvYXNzZXRzL2RhdGEvaHVtYW4uanNvbidcbiAgfTtcbiAgdmFyIGh1bWFuID0gYm9keW1vdmluLmxvYWRBbmltYXRpb24oYW5pbUh1bWFuKTtcbiAgdmFyIGNhcmQwNSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1hbi1jYXJkJyk7XG4gIGlmIChjYXJkMDUpIHtcbiAgICBjYXJkMDUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGV2ZW50KSA9PiB7XG4gICAgICBodW1hbi5wbGF5KCk7XG4gICAgfSk7XG4gICAgY2FyZDA1LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIGh1bWFuLnN0b3AoKTtcbiAgICB9KTtcbiAgICBjYXJkMDUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgaHVtYW4ucGxheSgpO1xuICAgIH0pO1xuICAgIGNhcmQwNS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChldmVudCkgPT4ge1xuICAgICAgaHVtYW4uc3RvcCgpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIGFuaW1Nb29uID0ge1xuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vb24nKSxcbiAgICByZW5kZXJlcjogJ3N2ZycsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgcGF0aDogJ3dwLWNvbnRlbnQvdGhlbWVzL21zLXRvb2xraXQvZGlzdC9hc3NldHMvZGF0YS9tb29uLmpzb24nXG4gIH07XG4gIHZhciBtb29uID0gYm9keW1vdmluLmxvYWRBbmltYXRpb24oYW5pbU1vb24pO1xuICB2YXIgY2FyZDA2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vb24tY2FyZCcpO1xuICBpZiAoY2FyZDA2KSB7XG4gICAgY2FyZDA2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgbW9vbi5wbGF5KCk7XG4gICAgfSk7XG4gICAgY2FyZDA2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIG1vb24uc3RvcCgpO1xuICAgIH0pO1xuICAgIGNhcmQwNi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGV2ZW50KSA9PiB7XG4gICAgICBtb29uLnBsYXkoKTtcbiAgICB9KTtcbiAgICBjYXJkMDYuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgIG1vb24uc3RvcCgpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIGFuaW1TdW4gPSB7XG4gICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VuJyksXG4gICAgcmVuZGVyZXI6ICdzdmcnLFxuICAgIGxvb3A6IHRydWUsXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgIHBhdGg6ICd3cC1jb250ZW50L3RoZW1lcy9tcy10b29sa2l0L2Rpc3QvYXNzZXRzL2RhdGEvc3VuLmpzb24nXG4gIH07XG4gIHZhciBzdW4gPSBib2R5bW92aW4ubG9hZEFuaW1hdGlvbihhbmltU3VuKTtcbiAgdmFyIGNhcmQwNyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW4tY2FyZCcpO1xuICBpZiAoY2FyZDA3KSB7XG4gICAgY2FyZDA3LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgc3VuLnBsYXkoKTtcbiAgICB9KTtcbiAgICBjYXJkMDcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChldmVudCkgPT4ge1xuICAgICAgc3VuLnN0b3AoKTtcbiAgICB9KTtcbiAgICBjYXJkMDcuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgc3VuLnBsYXkoKTtcbiAgICB9KTtcbiAgICBjYXJkMDcuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgIHN1bi5zdG9wKCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgYW5pbVRhcmdldCA9IHtcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXJnZXQnKSxcbiAgICByZW5kZXJlcjogJ3N2ZycsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgcGF0aDogJ3dwLWNvbnRlbnQvdGhlbWVzL21zLXRvb2xraXQvZGlzdC9hc3NldHMvZGF0YS90YXJnZXQuanNvbidcbiAgfTtcbiAgdmFyIHRhcmdldCA9IGJvZHltb3Zpbi5sb2FkQW5pbWF0aW9uKGFuaW1UYXJnZXQpO1xuICB2YXIgY2FyZDA4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhcmdldC1jYXJkJyk7XG4gIGlmIChjYXJkMDgpIHtcbiAgICBjYXJkMDguYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGV2ZW50KSA9PiB7XG4gICAgICB0YXJnZXQucGxheSgpO1xuICAgIH0pO1xuICAgIGNhcmQwOC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICB0YXJnZXQuc3RvcCgpO1xuICAgIH0pO1xuICAgIGNhcmQwOC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGV2ZW50KSA9PiB7XG4gICAgICB0YXJnZXQucGxheSgpO1xuICAgIH0pO1xuICAgIGNhcmQwOC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChldmVudCkgPT4ge1xuICAgICAgdGFyZ2V0LnN0b3AoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBhbmltVGhvdWdodCA9IHtcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aG91Z2h0JyksXG4gICAgcmVuZGVyZXI6ICdzdmcnLFxuICAgIGxvb3A6IHRydWUsXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgIHBhdGg6ICd3cC1jb250ZW50L3RoZW1lcy9tcy10b29sa2l0L2Rpc3QvYXNzZXRzL2RhdGEvdGhvdWdodHMuanNvbidcbiAgfTtcbiAgdmFyIHRob3VnaHQgPSBib2R5bW92aW4ubG9hZEFuaW1hdGlvbihhbmltVGhvdWdodCk7XG4gIHZhciBjYXJkMDkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhvdWdodHMtY2FyZCcpO1xuICBpZiAoY2FyZDA5KSB7XG4gICAgY2FyZDA5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgIHRob3VnaHQucGxheSgpO1xuICAgIH0pO1xuICAgIGNhcmQwOS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aG91Z2h0LnN0b3AoKTtcbiAgICB9KTtcbiAgICBjYXJkMDkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgdGhvdWdodC5wbGF5KCk7XG4gICAgfSk7XG4gICAgY2FyZDA5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aG91Z2h0LnN0b3AoKTtcbiAgICB9KTtcbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL2FuaW1hdGlvbnMuanMiXSwic291cmNlUm9vdCI6IiJ9