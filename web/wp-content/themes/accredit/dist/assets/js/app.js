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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitionend = exports.GetYoDigits = exports.rtl = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Core Foundation Utilities, utilized in a number of places.

/**
 * Returns a boolean for RTL support
 */
function rtl() {
  return (0, _jquery2.default)('html').attr('dir') === 'rtl';
}

/**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
function GetYoDigits(length, namespace) {
  length = length || 6;
  return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
}

function transitionend($elem) {
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  };
  var elem = document.createElement('div'),
      end;

  for (var t in transitions) {
    if (typeof elem.style[t] !== 'undefined') {
      end = transitions[t];
    }
  }
  if (end) {
    return end;
  } else {
    end = setTimeout(function () {
      $elem.triggerHandler('transitionend', [$elem]);
    }, 1);
    return 'transitionend';
  }
}

exports.rtl = rtl;
exports.GetYoDigits = GetYoDigits;
exports.transitionend = transitionend;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)
var Plugin = function () {
  function Plugin(element, options) {
    _classCallCheck(this, Plugin);

    this._setup(element, options);
    var pluginName = getPluginName(this);
    this.uuid = (0, _foundationUtil.GetYoDigits)(6, pluginName);

    if (!this.$element.attr('data-' + pluginName)) {
      this.$element.attr('data-' + pluginName, this.uuid);
    }
    if (!this.$element.data('zfPlugin')) {
      this.$element.data('zfPlugin', this);
    }
    /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */
    this.$element.trigger('init.zf.' + pluginName);
  }

  _createClass(Plugin, [{
    key: 'destroy',
    value: function destroy() {
      this._destroy();
      var pluginName = getPluginName(this);
      this.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
      /**
       * Fires when the plugin has been destroyed.
       * @event Plugin#destroyed
       */
      .trigger('destroyed.zf.' + pluginName);
      for (var prop in this) {
        this[prop] = null; //clean up script to prep for garbage collection.
      }
    }
  }]);

  return Plugin;
}();

// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580


function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getPluginName(obj) {
  if (typeof obj.constructor.name !== 'undefined') {
    return hyphenate(obj.constructor.name);
  } else {
    return hyphenate(obj.className);
  }
}

exports.Plugin = Plugin;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaQuery = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default set of media queries
var defaultQueries = {
  'default': 'only screen',
  landscape: 'only screen and (orientation: landscape)',
  portrait: 'only screen and (orientation: portrait)',
  retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
};

// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
var matchMedia = window.matchMedia || function () {
  'use strict';

  // For browsers that support matchMedium api such as IE 9 and webkit

  var styleMedia = window.styleMedia || window.media;

  // For those that don't support matchMedium
  if (!styleMedia) {
    var style = document.createElement('style'),
        script = document.getElementsByTagName('script')[0],
        info = null;

    style.type = 'text/css';
    style.id = 'matchmediajs-test';

    script && script.parentNode && script.parentNode.insertBefore(style, script);

    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
    info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;

    styleMedia = {
      matchMedium: function matchMedium(media) {
        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        }

        // Test if media query is true or false
        return info.width === '1px';
      }
    };
  }

  return function (media) {
    return {
      matches: styleMedia.matchMedium(media || 'all'),
      media: media || 'all'
    };
  };
}();

var MediaQuery = {
  queries: [],

  current: '',

  /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
  _init: function _init() {
    var self = this;
    var $meta = (0, _jquery2.default)('meta.foundation-mq');
    if (!$meta.length) {
      (0, _jquery2.default)('<meta class="foundation-mq">').appendTo(document.head);
    }

    var extractedStyles = (0, _jquery2.default)('.foundation-mq').css('font-family');
    var namedQueries;

    namedQueries = parseStyleToObject(extractedStyles);

    for (var key in namedQueries) {
      if (namedQueries.hasOwnProperty(key)) {
        self.queries.push({
          name: key,
          value: 'only screen and (min-width: ' + namedQueries[key] + ')'
        });
      }
    }

    this.current = this._getCurrentSize();

    this._watcher();
  },


  /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
  atLeast: function atLeast(size) {
    var query = this.get(size);

    if (query) {
      return matchMedia(query).matches;
    }

    return false;
  },


  /**
   * Checks if the screen matches to a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
   */
  is: function is(size) {
    size = size.trim().split(' ');
    if (size.length > 1 && size[1] === 'only') {
      if (size[0] === this._getCurrentSize()) return true;
    } else {
      return this.atLeast(size[0]);
    }
    return false;
  },


  /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
  get: function get(size) {
    for (var i in this.queries) {
      if (this.queries.hasOwnProperty(i)) {
        var query = this.queries[i];
        if (size === query.name) return query.value;
      }
    }

    return null;
  },


  /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
  _getCurrentSize: function _getCurrentSize() {
    var matched;

    for (var i = 0; i < this.queries.length; i++) {
      var query = this.queries[i];

      if (matchMedia(query.value).matches) {
        matched = query;
      }
    }

    if ((typeof matched === 'undefined' ? 'undefined' : _typeof(matched)) === 'object') {
      return matched.name;
    } else {
      return matched;
    }
  },


  /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
  _watcher: function _watcher() {
    var _this = this;

    (0, _jquery2.default)(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', function () {
      var newSize = _this._getCurrentSize(),
          currentSize = _this.current;

      if (newSize !== currentSize) {
        // Change the current media query
        _this.current = newSize;

        // Broadcast the media query change on the window
        (0, _jquery2.default)(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
      }
    });
  }
};

// Thank you: https://github.com/sindresorhus/query-string
function parseStyleToObject(str) {
  var styleObject = {};

  if (typeof str !== 'string') {
    return styleObject;
  }

  str = str.trim().slice(1, -1); // browsers re-quote string style values

  if (!str) {
    return styleObject;
  }

  styleObject = str.split('&').reduce(function (ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = parts[0];
    var val = parts[1];
    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});

  return styleObject;
}

exports.MediaQuery = MediaQuery;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keyboard = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyCodes = {
  9: 'TAB',
  13: 'ENTER',
  27: 'ESCAPE',
  32: 'SPACE',
  35: 'END',
  36: 'HOME',
  37: 'ARROW_LEFT',
  38: 'ARROW_UP',
  39: 'ARROW_RIGHT',
  40: 'ARROW_DOWN'
};

var commands = {};

// Functions pulled out to be referenceable from internals
function findFocusable($element) {
  if (!$element) {
    return false;
  }
  return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
    if (!(0, _jquery2.default)(this).is(':visible') || (0, _jquery2.default)(this).attr('tabindex') < 0) {
      return false;
    } //only have visible elements and those that have a tabindex greater or equal 0
    return true;
  });
}

function parseKey(event) {
  var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();

  // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events
  key = key.replace(/\W+/, '');

  if (event.shiftKey) key = 'SHIFT_' + key;
  if (event.ctrlKey) key = 'CTRL_' + key;
  if (event.altKey) key = 'ALT_' + key;

  // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)
  key = key.replace(/_$/, '');

  return key;
}

var Keyboard = {
  keys: getKeyCodes(keyCodes),

  /**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */
  parseKey: parseKey,

  /**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */
  handleKey: function handleKey(event, component, functions) {
    var commandList = commands[component],
        keyCode = this.parseKey(event),
        cmds,
        command,
        fn;

    if (!commandList) return console.warn('Component not defined!');

    if (typeof commandList.ltr === 'undefined') {
      // this component does not differentiate between ltr and rtl
      cmds = commandList; // use plain list
    } else {
      // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
      if ((0, _foundationUtil.rtl)()) cmds = _jquery2.default.extend({}, commandList.ltr, commandList.rtl);else cmds = _jquery2.default.extend({}, commandList.rtl, commandList.ltr);
    }
    command = cmds[keyCode];

    fn = functions[command];
    if (fn && typeof fn === 'function') {
      // execute function  if exists
      var returnValue = fn.apply();
      if (functions.handled || typeof functions.handled === 'function') {
        // execute function when event was handled
        functions.handled(returnValue);
      }
    } else {
      if (functions.unhandled || typeof functions.unhandled === 'function') {
        // execute function when event was not handled
        functions.unhandled();
      }
    }
  },


  /**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */

  findFocusable: findFocusable,

  /**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */

  register: function register(componentName, cmds) {
    commands[componentName] = cmds;
  },


  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
  //
  /**
   * Traps the focus in the given element.
   * @param  {jQuery} $element  jQuery object to trap the foucs into.
   */
  trapFocus: function trapFocus($element) {
    var $focusable = findFocusable($element),
        $firstFocusable = $focusable.eq(0),
        $lastFocusable = $focusable.eq(-1);

    $element.on('keydown.zf.trapfocus', function (event) {
      if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
        event.preventDefault();
        $firstFocusable.focus();
      } else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
        event.preventDefault();
        $lastFocusable.focus();
      }
    });
  },

  /**
   * Releases the trapped focus from the given element.
   * @param  {jQuery} $element  jQuery object to release the focus for.
   */
  releaseFocus: function releaseFocus($element) {
    $element.off('keydown.zf.trapfocus');
  }
};

/*
 * Constants for easier comparing.
 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
 */
function getKeyCodes(kcs) {
  var k = {};
  for (var kc in kcs) {
    k[kcs[kc]] = kcs[kc];
  }return k;
}

exports.Keyboard = Keyboard;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Triggers = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MutationObserver = function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] + 'MutationObserver' in window) {
      return window[prefixes[i] + 'MutationObserver'];
    }
  }
  return false;
}();

var triggers = function triggers(el, type) {
  el.data(type).split(' ').forEach(function (id) {
    (0, _jquery2.default)('#' + id)[type === 'close' ? 'trigger' : 'triggerHandler'](type + '.zf.trigger', [el]);
  });
};

var Triggers = {
  Listeners: {
    Basic: {},
    Global: {}
  },
  Initializers: {}
};

Triggers.Listeners.Basic = {
  openListener: function openListener() {
    triggers((0, _jquery2.default)(this), 'open');
  },
  closeListener: function closeListener() {
    var id = (0, _jquery2.default)(this).data('close');
    if (id) {
      triggers((0, _jquery2.default)(this), 'close');
    } else {
      (0, _jquery2.default)(this).trigger('close.zf.trigger');
    }
  },
  toggleListener: function toggleListener() {
    var id = (0, _jquery2.default)(this).data('toggle');
    if (id) {
      triggers((0, _jquery2.default)(this), 'toggle');
    } else {
      (0, _jquery2.default)(this).trigger('toggle.zf.trigger');
    }
  },
  closeableListener: function closeableListener(e) {
    e.stopPropagation();
    var animation = (0, _jquery2.default)(this).data('closable');

    if (animation !== '') {
      _foundationUtil.Motion.animateOut((0, _jquery2.default)(this), animation, function () {
        (0, _jquery2.default)(this).trigger('closed.zf');
      });
    } else {
      (0, _jquery2.default)(this).fadeOut().trigger('closed.zf');
    }
  },
  toggleFocusListener: function toggleFocusListener() {
    var id = (0, _jquery2.default)(this).data('toggle-focus');
    (0, _jquery2.default)('#' + id).triggerHandler('toggle.zf.trigger', [(0, _jquery2.default)(this)]);
  }
};

// Elements with [data-open] will reveal a plugin that supports it when clicked.
Triggers.Initializers.addOpenListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
  $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
};

// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
Triggers.Initializers.addCloseListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
  $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
};

// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
Triggers.Initializers.addToggleListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
  $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
};

// Elements with [data-closable] will respond to close.zf.trigger events.
Triggers.Initializers.addCloseableListener = function ($elem) {
  $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
  $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
};

// Elements with [data-toggle-focus] will respond to coming in and out of focus
Triggers.Initializers.addToggleFocusListener = function ($elem) {
  $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
  $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
};

// More Global/complex listeners and triggers
Triggers.Listeners.Global = {
  resizeListener: function resizeListener($nodes) {
    if (!MutationObserver) {
      //fallback for IE 9
      $nodes.each(function () {
        (0, _jquery2.default)(this).triggerHandler('resizeme.zf.trigger');
      });
    }
    //trigger all listening elements and signal a resize event
    $nodes.attr('data-events', "resize");
  },
  scrollListener: function scrollListener($nodes) {
    if (!MutationObserver) {
      //fallback for IE 9
      $nodes.each(function () {
        (0, _jquery2.default)(this).triggerHandler('scrollme.zf.trigger');
      });
    }
    //trigger all listening elements and signal a scroll event
    $nodes.attr('data-events', "scroll");
  },
  closeMeListener: function closeMeListener(e, pluginId) {
    var plugin = e.namespace.split('.')[0];
    var plugins = (0, _jquery2.default)('[data-' + plugin + ']').not('[data-yeti-box="' + pluginId + '"]');

    plugins.each(function () {
      var _this = (0, _jquery2.default)(this);
      _this.triggerHandler('close.zf.trigger', [_this]);
    });
  }

  // Global, parses whole document.
};Triggers.Initializers.addClosemeListener = function (pluginName) {
  var yetiBoxes = (0, _jquery2.default)('[data-yeti-box]'),
      plugNames = ['dropdown', 'tooltip', 'reveal'];

  if (pluginName) {
    if (typeof pluginName === 'string') {
      plugNames.push(pluginName);
    } else if ((typeof pluginName === 'undefined' ? 'undefined' : _typeof(pluginName)) === 'object' && typeof pluginName[0] === 'string') {
      plugNames.concat(pluginName);
    } else {
      console.error('Plugin names must be strings');
    }
  }
  if (yetiBoxes.length) {
    var listeners = plugNames.map(function (name) {
      return 'closeme.zf.' + name;
    }).join(' ');

    (0, _jquery2.default)(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
  }
};

function debounceGlobalListener(debounce, trigger, listener) {
  var timer = void 0,
      args = Array.prototype.slice.call(arguments, 3);
  (0, _jquery2.default)(window).off(trigger).on(trigger, function (e) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      listener.apply(null, args);
    }, debounce || 10); //default time to emit scroll event
  });
}

Triggers.Initializers.addResizeListener = function (debounce) {
  var $nodes = (0, _jquery2.default)('[data-resize]');
  if ($nodes.length) {
    debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
  }
};

Triggers.Initializers.addScrollListener = function (debounce) {
  var $nodes = (0, _jquery2.default)('[data-scroll]');
  if ($nodes.length) {
    debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
  }
};

Triggers.Initializers.addMutationEventsListener = function ($elem) {
  if (!MutationObserver) {
    return false;
  }
  var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]');

  //element callback
  var listeningElementsMutation = function listeningElementsMutation(mutationRecordsList) {
    var $target = (0, _jquery2.default)(mutationRecordsList[0].target);

    //trigger the event handler for the element depending on type
    switch (mutationRecordsList[0].type) {
      case "attributes":
        if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
        }
        if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('resizeme.zf.trigger', [$target]);
        }
        if (mutationRecordsList[0].attributeName === "style") {
          $target.closest("[data-mutate]").attr("data-events", "mutate");
          $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        }
        break;

      case "childList":
        $target.closest("[data-mutate]").attr("data-events", "mutate");
        $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        break;

      default:
        return false;
      //nothing
    }
  };

  if ($nodes.length) {
    //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
    for (var i = 0; i <= $nodes.length - 1; i++) {
      var elementObserver = new MutationObserver(listeningElementsMutation);
      elementObserver.observe($nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
    }
  }
};

Triggers.Initializers.addSimpleListeners = function () {
  var $document = (0, _jquery2.default)(document);

  Triggers.Initializers.addOpenListener($document);
  Triggers.Initializers.addCloseListener($document);
  Triggers.Initializers.addToggleListener($document);
  Triggers.Initializers.addCloseableListener($document);
  Triggers.Initializers.addToggleFocusListener($document);
};

Triggers.Initializers.addGlobalListeners = function () {
  var $document = (0, _jquery2.default)(document);
  Triggers.Initializers.addMutationEventsListener($document);
  Triggers.Initializers.addResizeListener();
  Triggers.Initializers.addScrollListener();
  Triggers.Initializers.addClosemeListener();
};

Triggers.init = function ($, Foundation) {
  if (typeof $.triggersInitialized === 'undefined') {
    var $document = $(document);

    if (document.readyState === "complete") {
      Triggers.Initializers.addSimpleListeners();
      Triggers.Initializers.addGlobalListeners();
    } else {
      $(window).on('load', function () {
        Triggers.Initializers.addSimpleListeners();
        Triggers.Initializers.addGlobalListeners();
      });
    }

    $.triggersInitialized = true;
  }

  if (Foundation) {
    Foundation.Triggers = Triggers;
    // Legacy included to be backwards compatible for now.
    Foundation.IHearYou = Triggers.Initializers.addGlobalListeners;
  }
};

exports.Triggers = Triggers;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Motion = exports.Move = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Motion module.
 * @module foundation.motion
 */

var initClasses = ['mui-enter', 'mui-leave'];
var activeClasses = ['mui-enter-active', 'mui-leave-active'];

var Motion = {
  animateIn: function animateIn(element, animation, cb) {
    animate(true, element, animation, cb);
  },

  animateOut: function animateOut(element, animation, cb) {
    animate(false, element, animation, cb);
  }
};

function Move(duration, elem, fn) {
  var anim,
      prog,
      start = null;
  // console.log('called');

  if (duration === 0) {
    fn.apply(elem);
    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    return;
  }

  function move(ts) {
    if (!start) start = ts;
    // console.log(start, ts);
    prog = ts - start;
    fn.apply(elem);

    if (prog < duration) {
      anim = window.requestAnimationFrame(move, elem);
    } else {
      window.cancelAnimationFrame(anim);
      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    }
  }
  anim = window.requestAnimationFrame(move);
}

/**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */
function animate(isIn, element, animation, cb) {
  element = (0, _jquery2.default)(element).eq(0);

  if (!element.length) return;

  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

  // Set up the animation
  reset();

  element.addClass(animation).css('transition', 'none');

  requestAnimationFrame(function () {
    element.addClass(initClass);
    if (isIn) element.show();
  });

  // Start the animation
  requestAnimationFrame(function () {
    element[0].offsetWidth;
    element.css('transition', '').addClass(activeClass);
  });

  // Clean up the animation when it finishes
  element.one((0, _foundationUtil.transitionend)(element), finish);

  // Hides the element (for out animations), resets the element, and runs a callback
  function finish() {
    if (!isIn) element.hide();
    reset();
    if (cb) cb.apply(element);
  }

  // Resets transitions and removes motion-specific classes
  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
  }
}

exports.Move = Move;
exports.Motion = Motion;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box = undefined;

var _foundationUtil = __webpack_require__(1);

var Box = {
  ImNotTouchingYou: ImNotTouchingYou,
  OverlapArea: OverlapArea,
  GetDimensions: GetDimensions,
  GetOffsets: GetOffsets,
  GetExplicitOffsets: GetExplicitOffsets

  /**
   * Compares the dimensions of an element to a container and determines collision events with container.
   * @function
   * @param {jQuery} element - jQuery object to test for collisions.
   * @param {jQuery} parent - jQuery object to use as bounding container.
   * @param {Boolean} lrOnly - set to true to check left and right values only.
   * @param {Boolean} tbOnly - set to true to check top and bottom values only.
   * @default if no parent object passed, detects collisions with `window`.
   * @returns {Boolean} - true if collision free, false if a collision in any direction.
   */
};function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
  return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
};

function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
  var eleDims = GetDimensions(element),
      topOver,
      bottomOver,
      leftOver,
      rightOver;
  if (parent) {
    var parDims = GetDimensions(parent);

    bottomOver = parDims.height + parDims.offset.top - (eleDims.offset.top + eleDims.height);
    topOver = eleDims.offset.top - parDims.offset.top;
    leftOver = eleDims.offset.left - parDims.offset.left;
    rightOver = parDims.width + parDims.offset.left - (eleDims.offset.left + eleDims.width);
  } else {
    bottomOver = eleDims.windowDims.height + eleDims.windowDims.offset.top - (eleDims.offset.top + eleDims.height);
    topOver = eleDims.offset.top - eleDims.windowDims.offset.top;
    leftOver = eleDims.offset.left - eleDims.windowDims.offset.left;
    rightOver = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
  }

  bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
  topOver = Math.min(topOver, 0);
  leftOver = Math.min(leftOver, 0);
  rightOver = Math.min(rightOver, 0);

  if (lrOnly) {
    return leftOver + rightOver;
  }
  if (tbOnly) {
    return topOver + bottomOver;
  }

  // use sum of squares b/c we care about overlap area.
  return Math.sqrt(topOver * topOver + bottomOver * bottomOver + leftOver * leftOver + rightOver * rightOver);
}

/**
 * Uses native methods to return an object of dimension values.
 * @function
 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
 * @returns {Object} - nested object of integer pixel values
 * TODO - if element is window, return only those values.
 */
function GetDimensions(elem) {
  elem = elem.length ? elem[0] : elem;

  if (elem === window || elem === document) {
    throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
  }

  var rect = elem.getBoundingClientRect(),
      parRect = elem.parentNode.getBoundingClientRect(),
      winRect = document.body.getBoundingClientRect(),
      winY = window.pageYOffset,
      winX = window.pageXOffset;

  return {
    width: rect.width,
    height: rect.height,
    offset: {
      top: rect.top + winY,
      left: rect.left + winX
    },
    parentDims: {
      width: parRect.width,
      height: parRect.height,
      offset: {
        top: parRect.top + winY,
        left: parRect.left + winX
      }
    },
    windowDims: {
      width: winRect.width,
      height: winRect.height,
      offset: {
        top: winY,
        left: winX
      }
    }
  };
}

/**
 * Returns an object of top and left integer pixel values for dynamically rendered elements,
 * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
 * you don't know alignment, but generally from
 * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
 * @function
 * @param {jQuery} element - jQuery object for the element being positioned.
 * @param {jQuery} anchor - jQuery object for the element's anchor point.
 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
 * TODO alter/rewrite to work with `em` values as well/instead of pixels
 */
function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
  console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5");
  switch (position) {
    case 'top':
      return (0, _foundationUtil.rtl)() ? GetExplicitOffsets(element, anchor, 'top', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'top', 'right', vOffset, hOffset, isOverflow);
    case 'bottom':
      return (0, _foundationUtil.rtl)() ? GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
    case 'center top':
      return GetExplicitOffsets(element, anchor, 'top', 'center', vOffset, hOffset, isOverflow);
    case 'center bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'center', vOffset, hOffset, isOverflow);
    case 'center left':
      return GetExplicitOffsets(element, anchor, 'left', 'center', vOffset, hOffset, isOverflow);
    case 'center right':
      return GetExplicitOffsets(element, anchor, 'right', 'center', vOffset, hOffset, isOverflow);
    case 'left bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow);
    case 'right bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
    // Backwards compatibility... this along with the reveal and reveal full
    // classes are the only ones that didn't reference anchor
    case 'center':
      return {
        left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2 + hOffset,
        top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - ($eleDims.height / 2 + vOffset)
      };
    case 'reveal':
      return {
        left: ($eleDims.windowDims.width - $eleDims.width) / 2 + hOffset,
        top: $eleDims.windowDims.offset.top + vOffset
      };
    case 'reveal full':
      return {
        left: $eleDims.windowDims.offset.left,
        top: $eleDims.windowDims.offset.top
      };
      break;
    default:
      return {
        left: (0, _foundationUtil.rtl)() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset : $anchorDims.offset.left + hOffset,
        top: $anchorDims.offset.top + $anchorDims.height + vOffset
      };

  }
}

function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
  var $eleDims = GetDimensions(element),
      $anchorDims = anchor ? GetDimensions(anchor) : null;

  var topVal, leftVal;

  // set position related attribute

  switch (position) {
    case 'top':
      topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
      break;
    case 'bottom':
      topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
      break;
    case 'left':
      leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
      break;
    case 'right':
      leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
      break;
  }

  // set alignment related attribute
  switch (position) {
    case 'top':
    case 'bottom':
      switch (alignment) {
        case 'left':
          leftVal = $anchorDims.offset.left + hOffset;
          break;
        case 'right':
          leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
          break;
        case 'center':
          leftVal = isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2 + hOffset;
          break;
      }
      break;
    case 'right':
    case 'left':
      switch (alignment) {
        case 'bottom':
          topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
          break;
        case 'top':
          topVal = $anchorDims.offset.top + vOffset;
          break;
        case 'center':
          topVal = $anchorDims.offset.top + vOffset + $anchorDims.height / 2 - $eleDims.height / 2;
          break;
      }
      break;
  }
  return { top: topVal, left: leftVal };
}

exports.Box = Box;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nest = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nest = {
  Feather: function Feather(menu) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';

    menu.attr('role', 'menubar');

    var items = menu.find('li').attr({ 'role': 'menuitem' }),
        subMenuClass = 'is-' + type + '-submenu',
        subItemClass = subMenuClass + '-item',
        hasSubClass = 'is-' + type + '-submenu-parent',
        applyAria = type !== 'accordion'; // Accordions handle their own ARIA attriutes.

    items.each(function () {
      var $item = (0, _jquery2.default)(this),
          $sub = $item.children('ul');

      if ($sub.length) {
        $item.addClass(hasSubClass);
        $sub.addClass('submenu ' + subMenuClass).attr({ 'data-submenu': '' });
        if (applyAria) {
          $item.attr({
            'aria-haspopup': true,
            'aria-label': $item.children('a:first').text()
          });
          // Note:  Drilldowns behave differently in how they hide, and so need
          // additional attributes.  We should look if this possibly over-generalized
          // utility (Nest) is appropriate when we rework menus in 6.4
          if (type === 'drilldown') {
            $item.attr({ 'aria-expanded': false });
          }
        }
        $sub.addClass('submenu ' + subMenuClass).attr({
          'data-submenu': '',
          'role': 'menu'
        });
        if (type === 'drilldown') {
          $sub.attr({ 'aria-hidden': true });
        }
      }

      if ($item.parent('[data-submenu]').length) {
        $item.addClass('is-submenu-item ' + subItemClass);
      }
    });

    return;
  },
  Burn: function Burn(menu, type) {
    var //items = menu.find('li'),
    subMenuClass = 'is-' + type + '-submenu',
        subItemClass = subMenuClass + '-item',
        hasSubClass = 'is-' + type + '-submenu-parent';

    menu.find('>li, .menu, .menu > li').removeClass(subMenuClass + ' ' + subItemClass + ' ' + hasSubClass + ' is-submenu-item submenu is-active').removeAttr('data-submenu').css('display', '');
  }
};

exports.Nest = Nest;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onImagesLoaded = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Runs a callback function when images are fully loaded.
 * @param {Object} images - Image(s) to check if loaded.
 * @param {Func} callback - Function to execute when image is fully loaded.
 */
function onImagesLoaded(images, callback) {
  var self = this,
      unloaded = images.length;

  if (unloaded === 0) {
    callback();
  }

  images.each(function () {
    // Check if image is loaded
    if (this.complete && this.naturalWidth !== undefined) {
      singleImageLoaded();
    } else {
      // If the above check failed, simulate loading on detached element.
      var image = new Image();
      // Still count image as loaded if it finalizes with an error.
      var events = "load.zf.images error.zf.images";
      (0, _jquery2.default)(image).one(events, function me(event) {
        // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
        (0, _jquery2.default)(this).off(events, me);
        singleImageLoaded();
      });
      image.src = (0, _jquery2.default)(this).attr('src');
    }
  });

  function singleImageLoaded() {
    unloaded--;
    if (unloaded === 0) {
      callback();
    }
  }
}

exports.onImagesLoaded = onImagesLoaded;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(4);

var _foundationUtil2 = __webpack_require__(8);

var _foundationUtil3 = __webpack_require__(1);

var _foundation = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 */

var AccordionMenu = function (_Plugin) {
  _inherits(AccordionMenu, _Plugin);

  function AccordionMenu() {
    _classCallCheck(this, AccordionMenu);

    return _possibleConstructorReturn(this, (AccordionMenu.__proto__ || Object.getPrototypeOf(AccordionMenu)).apply(this, arguments));
  }

  _createClass(AccordionMenu, [{
    key: '_setup',

    /**
     * Creates a new instance of an accordion menu.
     * @class
     * @name AccordionMenu
     * @fires AccordionMenu#init
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, AccordionMenu.defaults, this.$element.data(), options);
      this.className = 'AccordionMenu'; // ie9 back compat

      this._init();

      _foundationUtil.Keyboard.register('AccordionMenu', {
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ARROW_RIGHT': 'open',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'close',
        'ESCAPE': 'closeAll'
      });
    }

    /**
     * Initializes the accordion menu by hiding all nested menus.
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      _foundationUtil2.Nest.Feather(this.$element, 'accordion');

      var _this = this;

      this.$element.find('[data-submenu]').not('.is-active').slideUp(0); //.find('a').css('padding-left', '1rem');
      this.$element.attr({
        'role': 'tree',
        'aria-multiselectable': this.options.multiOpen
      });

      this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
      this.$menuLinks.each(function () {
        var linkId = this.id || (0, _foundationUtil3.GetYoDigits)(6, 'acc-menu-link'),
            $elem = (0, _jquery2.default)(this),
            $sub = $elem.children('[data-submenu]'),
            subId = $sub[0].id || (0, _foundationUtil3.GetYoDigits)(6, 'acc-menu'),
            isActive = $sub.hasClass('is-active');

        if (_this.options.submenuToggle) {
          $elem.addClass('has-submenu-toggle');
          $elem.children('a').after('<button id="' + linkId + '" class="submenu-toggle" aria-controls="' + subId + '" aria-expanded="' + isActive + '" title="' + _this.options.submenuToggleText + '"><span class="submenu-toggle-text">' + _this.options.submenuToggleText + '</span></button>');
        } else {
          $elem.attr({
            'aria-controls': subId,
            'aria-expanded': isActive,
            'id': linkId
          });
        }
        $sub.attr({
          'aria-labelledby': linkId,
          'aria-hidden': !isActive,
          'role': 'group',
          'id': subId
        });
      });
      this.$element.find('li').attr({
        'role': 'treeitem'
      });
      var initPanes = this.$element.find('.is-active');
      if (initPanes.length) {
        var _this = this;
        initPanes.each(function () {
          _this.down((0, _jquery2.default)(this));
        });
      }
      this._events();
    }

    /**
     * Adds event handlers for items within the menu.
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this;

      this.$element.find('li').each(function () {
        var $submenu = (0, _jquery2.default)(this).children('[data-submenu]');

        if ($submenu.length) {
          if (_this.options.submenuToggle) {
            (0, _jquery2.default)(this).children('.submenu-toggle').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
              _this.toggle($submenu);
            });
          } else {
            (0, _jquery2.default)(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
              e.preventDefault();
              _this.toggle($submenu);
            });
          }
        }
      }).on('keydown.zf.accordionmenu', function (e) {
        var $element = (0, _jquery2.default)(this),
            $elements = $element.parent('ul').children('li'),
            $prevElement,
            $nextElement,
            $target = $element.children('[data-submenu]');

        $elements.each(function (i) {
          if ((0, _jquery2.default)(this).is($element)) {
            $prevElement = $elements.eq(Math.max(0, i - 1)).find('a').first();
            $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)).find('a').first();

            if ((0, _jquery2.default)(this).children('[data-submenu]:visible').length) {
              // has open sub menu
              $nextElement = $element.find('li:first-child').find('a').first();
            }
            if ((0, _jquery2.default)(this).is(':first-child')) {
              // is first element of sub menu
              $prevElement = $element.parents('li').first().find('a').first();
            } else if ($prevElement.parents('li').first().children('[data-submenu]:visible').length) {
              // if previous element has open sub menu
              $prevElement = $prevElement.parents('li').find('li:last-child').find('a').first();
            }
            if ((0, _jquery2.default)(this).is(':last-child')) {
              // is last element of sub menu
              $nextElement = $element.parents('li').first().next('li').find('a').first();
            }

            return;
          }
        });

        _foundationUtil.Keyboard.handleKey(e, 'AccordionMenu', {
          open: function open() {
            if ($target.is(':hidden')) {
              _this.down($target);
              $target.find('li').first().find('a').first().focus();
            }
          },
          close: function close() {
            if ($target.length && !$target.is(':hidden')) {
              // close active sub of this item
              _this.up($target);
            } else if ($element.parent('[data-submenu]').length) {
              // close currently open sub
              _this.up($element.parent('[data-submenu]'));
              $element.parents('li').first().find('a').first().focus();
            }
          },
          up: function up() {
            $prevElement.focus();
            return true;
          },
          down: function down() {
            $nextElement.focus();
            return true;
          },
          toggle: function toggle() {
            if (_this.options.submenuToggle) {
              return false;
            }
            if ($element.children('[data-submenu]').length) {
              _this.toggle($element.children('[data-submenu]'));
              return true;
            }
          },
          closeAll: function closeAll() {
            _this.hideAll();
          },
          handled: function handled(preventDefault) {
            if (preventDefault) {
              e.preventDefault();
            }
            e.stopImmediatePropagation();
          }
        });
      }); //.attr('tabindex', 0);
    }

    /**
     * Closes all panes of the menu.
     * @function
     */

  }, {
    key: 'hideAll',
    value: function hideAll() {
      this.up(this.$element.find('[data-submenu]'));
    }

    /**
     * Opens all panes of the menu.
     * @function
     */

  }, {
    key: 'showAll',
    value: function showAll() {
      this.down(this.$element.find('[data-submenu]'));
    }

    /**
     * Toggles the open/close state of a submenu.
     * @function
     * @param {jQuery} $target - the submenu to toggle
     */

  }, {
    key: 'toggle',
    value: function toggle($target) {
      if (!$target.is(':animated')) {
        if (!$target.is(':hidden')) {
          this.up($target);
        } else {
          this.down($target);
        }
      }
    }

    /**
     * Opens the sub-menu defined by `$target`.
     * @param {jQuery} $target - Sub-menu to open.
     * @fires AccordionMenu#down
     */

  }, {
    key: 'down',
    value: function down($target) {
      var _this = this;

      if (!this.options.multiOpen) {
        this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element).add($target)));
      }

      $target.addClass('is-active').attr({ 'aria-hidden': false });

      if (this.options.submenuToggle) {
        $target.prev('.submenu-toggle').attr({ 'aria-expanded': true });
      } else {
        $target.parent('.is-accordion-submenu-parent').attr({ 'aria-expanded': true });
      }

      $target.slideDown(_this.options.slideSpeed, function () {
        /**
         * Fires when the menu is done opening.
         * @event AccordionMenu#down
         */
        _this.$element.trigger('down.zf.accordionMenu', [$target]);
      });
    }

    /**
     * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
     * @param {jQuery} $target - Sub-menu to close.
     * @fires AccordionMenu#up
     */

  }, {
    key: 'up',
    value: function up($target) {
      var _this = this;
      $target.slideUp(_this.options.slideSpeed, function () {
        /**
         * Fires when the menu is done collapsing up.
         * @event AccordionMenu#up
         */
        _this.$element.trigger('up.zf.accordionMenu', [$target]);
      });

      var $menus = $target.find('[data-submenu]').slideUp(0).addBack().attr('aria-hidden', true);

      if (this.options.submenuToggle) {
        $menus.prev('.submenu-toggle').attr('aria-expanded', false);
      } else {
        $menus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);
      }
    }

    /**
     * Destroys an instance of accordion menu.
     * @fires AccordionMenu#destroyed
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.find('[data-submenu]').slideDown(0).css('display', '');
      this.$element.find('a').off('click.zf.accordionMenu');

      if (this.options.submenuToggle) {
        this.$element.find('.has-submenu-toggle').removeClass('has-submenu-toggle');
        this.$element.find('.submenu-toggle').remove();
      }

      _foundationUtil2.Nest.Burn(this.$element, 'accordion');
    }
  }]);

  return AccordionMenu;
}(_foundation.Plugin);

AccordionMenu.defaults = {
  /**
   * Amount of time to animate the opening of a submenu in ms.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Adds a separate submenu toggle button. This allows the parent item to have a link.
   * @option
   * @example true
   */
  submenuToggle: false,
  /**
   * The text used for the submenu toggle if enabled. This is used for screen readers only.
   * @option
   * @example true
   */
  submenuToggleText: 'Toggle menu',
  /**
   * Allow the menu to have multiple open panes.
   * @option
   * @type {boolean}
   * @default true
   */
  multiOpen: true
};

exports.AccordionMenu = AccordionMenu;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(4);

var _foundationUtil2 = __webpack_require__(8);

var _foundationUtil3 = __webpack_require__(7);

var _foundationUtil4 = __webpack_require__(1);

var _foundation = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DropdownMenu module.
 * @module foundation.dropdown-menu
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.nest
 */

var DropdownMenu = function (_Plugin) {
  _inherits(DropdownMenu, _Plugin);

  function DropdownMenu() {
    _classCallCheck(this, DropdownMenu);

    return _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).apply(this, arguments));
  }

  _createClass(DropdownMenu, [{
    key: '_setup',

    /**
     * Creates a new instance of DropdownMenu.
     * @class
     * @name DropdownMenu
     * @fires DropdownMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, DropdownMenu.defaults, this.$element.data(), options);
      this.className = 'DropdownMenu'; // ie9 back compat

      this._init();

      _foundationUtil.Keyboard.register('DropdownMenu', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close'
      });
    }

    /**
     * Initializes the plugin, and calls _prepareMenu
     * @private
     * @function
     */

  }, {
    key: '_init',
    value: function _init() {
      _foundationUtil2.Nest.Feather(this.$element, 'dropdown');

      var subs = this.$element.find('li.is-dropdown-submenu-parent');
      this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');

      this.$menuItems = this.$element.find('[role="menuitem"]');
      this.$tabs = this.$element.children('[role="menuitem"]');
      this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

      if (this.options.alignment === 'auto') {
        if (this.$element.hasClass(this.options.rightClass) || (0, _foundationUtil4.rtl)() || this.$element.parents('.top-bar-right').is('*')) {
          this.options.alignment = 'right';
          subs.addClass('opens-left');
        } else {
          this.options.alignment = 'left';
          subs.addClass('opens-right');
        }
      } else {
        if (this.options.alignment === 'right') {
          subs.addClass('opens-left');
        } else {
          subs.addClass('opens-right');
        }
      }
      this.changed = false;
      this._events();
    }
  }, {
    key: '_isVertical',
    value: function _isVertical() {
      return this.$tabs.css('display') === 'block' || this.$element.css('flex-direction') === 'column';
    }
  }, {
    key: '_isRtl',
    value: function _isRtl() {
      return this.$element.hasClass('align-right') || (0, _foundationUtil4.rtl)() && !this.$element.hasClass('align-left');
    }

    /**
     * Adds event listeners to elements within the menu
     * @private
     * @function
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this,
          hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',
          parClass = 'is-dropdown-submenu-parent';

      // used for onClick and in the keyboard handlers
      var handleClickFn = function handleClickFn(e) {
        var $elem = (0, _jquery2.default)(e.target).parentsUntil('ul', '.' + parClass),
            hasSub = $elem.hasClass(parClass),
            hasClicked = $elem.attr('data-is-click') === 'true',
            $sub = $elem.children('.is-dropdown-submenu');

        if (hasSub) {
          if (hasClicked) {
            if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
              return;
            } else {
              e.stopImmediatePropagation();
              e.preventDefault();
              _this._hide($elem);
            }
          } else {
            e.preventDefault();
            e.stopImmediatePropagation();
            _this._show($sub);
            $elem.add($elem.parentsUntil(_this.$element, '.' + parClass)).attr('data-is-click', true);
          }
        }
      };

      if (this.options.clickOpen || hasTouch) {
        this.$menuItems.on('click.zf.dropdownmenu touchstart.zf.dropdownmenu', handleClickFn);
      }

      // Handle Leaf element Clicks
      if (_this.options.closeOnClickInside) {
        this.$menuItems.on('click.zf.dropdownmenu', function (e) {
          var $elem = (0, _jquery2.default)(this),
              hasSub = $elem.hasClass(parClass);
          if (!hasSub) {
            _this._hide();
          }
        });
      }

      if (!this.options.disableHover) {
        this.$menuItems.on('mouseenter.zf.dropdownmenu', function (e) {
          var $elem = (0, _jquery2.default)(this),
              hasSub = $elem.hasClass(parClass);

          if (hasSub) {
            clearTimeout($elem.data('_delay'));
            $elem.data('_delay', setTimeout(function () {
              _this._show($elem.children('.is-dropdown-submenu'));
            }, _this.options.hoverDelay));
          }
        }).on('mouseleave.zf.dropdownmenu', function (e) {
          var $elem = (0, _jquery2.default)(this),
              hasSub = $elem.hasClass(parClass);
          if (hasSub && _this.options.autoclose) {
            if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) {
              return false;
            }

            clearTimeout($elem.data('_delay'));
            $elem.data('_delay', setTimeout(function () {
              _this._hide($elem);
            }, _this.options.closingTime));
          }
        });
      }
      this.$menuItems.on('keydown.zf.dropdownmenu', function (e) {
        var $element = (0, _jquery2.default)(e.target).parentsUntil('ul', '[role="menuitem"]'),
            isTab = _this.$tabs.index($element) > -1,
            $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
            $prevElement,
            $nextElement;

        $elements.each(function (i) {
          if ((0, _jquery2.default)(this).is($element)) {
            $prevElement = $elements.eq(i - 1);
            $nextElement = $elements.eq(i + 1);
            return;
          }
        });

        var nextSibling = function nextSibling() {
          $nextElement.children('a:first').focus();
          e.preventDefault();
        },
            prevSibling = function prevSibling() {
          $prevElement.children('a:first').focus();
          e.preventDefault();
        },
            openSub = function openSub() {
          var $sub = $element.children('ul.is-dropdown-submenu');
          if ($sub.length) {
            _this._show($sub);
            $element.find('li > a:first').focus();
            e.preventDefault();
          } else {
            return;
          }
        },
            closeSub = function closeSub() {
          //if ($element.is(':first-child')) {
          var close = $element.parent('ul').parent('li');
          close.children('a:first').focus();
          _this._hide(close);
          e.preventDefault();
          //}
        };
        var functions = {
          open: openSub,
          close: function close() {
            _this._hide(_this.$element);
            _this.$menuItems.eq(0).children('a').focus(); // focus to first element
            e.preventDefault();
          },
          handled: function handled() {
            e.stopImmediatePropagation();
          }
        };

        if (isTab) {
          if (_this._isVertical()) {
            // vertical menu
            if (_this._isRtl()) {
              // right aligned
              _jquery2.default.extend(functions, {
                down: nextSibling,
                up: prevSibling,
                next: closeSub,
                previous: openSub
              });
            } else {
              // left aligned
              _jquery2.default.extend(functions, {
                down: nextSibling,
                up: prevSibling,
                next: openSub,
                previous: closeSub
              });
            }
          } else {
            // horizontal menu
            if (_this._isRtl()) {
              // right aligned
              _jquery2.default.extend(functions, {
                next: prevSibling,
                previous: nextSibling,
                down: openSub,
                up: closeSub
              });
            } else {
              // left aligned
              _jquery2.default.extend(functions, {
                next: nextSibling,
                previous: prevSibling,
                down: openSub,
                up: closeSub
              });
            }
          }
        } else {
          // not tabs -> one sub
          if (_this._isRtl()) {
            // right aligned
            _jquery2.default.extend(functions, {
              next: closeSub,
              previous: openSub,
              down: nextSibling,
              up: prevSibling
            });
          } else {
            // left aligned
            _jquery2.default.extend(functions, {
              next: openSub,
              previous: closeSub,
              down: nextSibling,
              up: prevSibling
            });
          }
        }
        _foundationUtil.Keyboard.handleKey(e, 'DropdownMenu', functions);
      });
    }

    /**
     * Adds an event handler to the body to close any dropdowns on a click.
     * @function
     * @private
     */

  }, {
    key: '_addBodyHandler',
    value: function _addBodyHandler() {
      var $body = (0, _jquery2.default)(document.body),
          _this = this;
      $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu').on('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu', function (e) {
        var $link = _this.$element.find(e.target);
        if ($link.length) {
          return;
        }

        _this._hide();
        $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu');
      });
    }

    /**
     * Opens a dropdown pane, and checks for collisions first.
     * @param {jQuery} $sub - ul element that is a submenu to show
     * @function
     * @private
     * @fires DropdownMenu#show
     */

  }, {
    key: '_show',
    value: function _show($sub) {
      var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {
        return (0, _jquery2.default)(el).find($sub).length > 0;
      }));
      var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');
      this._hide($sibs, idx);
      $sub.css('visibility', 'hidden').addClass('js-dropdown-active').parent('li.is-dropdown-submenu-parent').addClass('is-active');
      var clear = _foundationUtil3.Box.ImNotTouchingYou($sub, null, true);
      if (!clear) {
        var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
            $parentLi = $sub.parent('.is-dropdown-submenu-parent');
        $parentLi.removeClass('opens' + oldClass).addClass('opens-' + this.options.alignment);
        clear = _foundationUtil3.Box.ImNotTouchingYou($sub, null, true);
        if (!clear) {
          $parentLi.removeClass('opens-' + this.options.alignment).addClass('opens-inner');
        }
        this.changed = true;
      }
      $sub.css('visibility', '');
      if (this.options.closeOnClick) {
        this._addBodyHandler();
      }
      /**
       * Fires when the new dropdown pane is visible.
       * @event DropdownMenu#show
       */
      this.$element.trigger('show.zf.dropdownmenu', [$sub]);
    }

    /**
     * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
     * @function
     * @param {jQuery} $elem - element with a submenu to hide
     * @param {Number} idx - index of the $tabs collection to hide
     * @private
     */

  }, {
    key: '_hide',
    value: function _hide($elem, idx) {
      var $toClose;
      if ($elem && $elem.length) {
        $toClose = $elem;
      } else if (idx !== undefined) {
        $toClose = this.$tabs.not(function (i, el) {
          return i === idx;
        });
      } else {
        $toClose = this.$element;
      }
      var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

      if (somethingToClose) {
        $toClose.find('li.is-active').add($toClose).attr({
          'data-is-click': false
        }).removeClass('is-active');

        $toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');

        if (this.changed || $toClose.find('opens-inner').length) {
          var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
          $toClose.find('li.is-dropdown-submenu-parent').add($toClose).removeClass('opens-inner opens-' + this.options.alignment).addClass('opens-' + oldClass);
          this.changed = false;
        }
        /**
         * Fires when the open menus are closed.
         * @event DropdownMenu#hide
         */
        this.$element.trigger('hide.zf.dropdownmenu', [$toClose]);
      }
    }

    /**
     * Destroys the plugin.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$menuItems.off('.zf.dropdownmenu').removeAttr('data-is-click').removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
      (0, _jquery2.default)(document.body).off('.zf.dropdownmenu');
      _foundationUtil2.Nest.Burn(this.$element, 'dropdown');
    }
  }]);

  return DropdownMenu;
}(_foundation.Plugin);

/**
 * Default settings for plugin
 */


DropdownMenu.defaults = {
  /**
   * Disallows hover events from opening submenus
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,
  /**
   * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
   * @option
   * @type {boolean}
   * @default true
   */
  autoclose: true,
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 50
   */
  hoverDelay: 50,
  /**
   * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
   * @option
   * @type {boolean}
   * @default false
   */
  clickOpen: false,
  /**
   * Amount of time to delay closing a submenu on a mouseleave event.
   * @option
   * @type {number}
   * @default 500
   */

  closingTime: 500,
  /**
   * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow clicks on the body to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Allow clicks on leaf anchor links to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClickInside: true,
  /**
   * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'vertical'
   */
  verticalClass: 'vertical',
  /**
   * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'align-right'
   */
  rightClass: 'align-right',
  /**
   * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
   * @option
   * @type {boolean}
   * @default true
   */
  forceFollow: true
};

exports.DropdownMenu = DropdownMenu;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SmoothScroll = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

var _foundation = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SmoothScroll module.
 * @module foundation.smooth-scroll
 */
var SmoothScroll = function (_Plugin) {
    _inherits(SmoothScroll, _Plugin);

    function SmoothScroll() {
        _classCallCheck(this, SmoothScroll);

        return _possibleConstructorReturn(this, (SmoothScroll.__proto__ || Object.getPrototypeOf(SmoothScroll)).apply(this, arguments));
    }

    _createClass(SmoothScroll, [{
        key: '_setup',

        /**
         * Creates a new instance of SmoothScroll.
         * @class
         * @name SmoothScroll
         * @fires SmoothScroll#init
         * @param {Object} element - jQuery object to add the trigger to.
         * @param {Object} options - Overrides to the default plugin settings.
         */
        value: function _setup(element, options) {
            this.$element = element;
            this.options = _jquery2.default.extend({}, SmoothScroll.defaults, this.$element.data(), options);
            this.className = 'SmoothScroll'; // ie9 back compat

            this._init();
        }

        /**
         * Initialize the SmoothScroll plugin
         * @private
         */

    }, {
        key: '_init',
        value: function _init() {
            var id = this.$element[0].id || (0, _foundationUtil.GetYoDigits)(6, 'smooth-scroll');
            var _this = this;
            this.$element.attr({
                'id': id
            });

            this._events();
        }

        /**
         * Initializes events for SmoothScroll.
         * @private
         */

    }, {
        key: '_events',
        value: function _events() {
            var _this = this;

            // click handler function.
            var handleLinkClick = function handleLinkClick(e) {
                // exit function if the event source isn't coming from an anchor with href attribute starts with '#'
                if (!(0, _jquery2.default)(this).is('a[href^="#"]')) {
                    return false;
                }

                var arrival = this.getAttribute('href');

                _this._inTransition = true;

                SmoothScroll.scrollToLoc(arrival, _this.options, function () {
                    _this._inTransition = false;
                });

                e.preventDefault();
            };

            this.$element.on('click.zf.smoothScroll', handleLinkClick);
            this.$element.on('click.zf.smoothScroll', 'a[href^="#"]', handleLinkClick);
        }

        /**
         * Function to scroll to a given location on the page.
         * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
         * @param {Object} options - The options to use.
         * @param {Function} callback - The callback function.
         * @static
         * @function
         */

    }], [{
        key: 'scrollToLoc',
        value: function scrollToLoc(loc) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SmoothScroll.defaults;
            var callback = arguments[2];

            // Do nothing if target does not exist to prevent errors
            if (!(0, _jquery2.default)(loc).length) {
                return false;
            }

            var scrollPos = Math.round((0, _jquery2.default)(loc).offset().top - options.threshold / 2 - options.offset);

            (0, _jquery2.default)('html, body').stop(true).animate({ scrollTop: scrollPos }, options.animationDuration, options.animationEasing, function () {
                if (callback && typeof callback == "function") {
                    callback();
                }
            });
        }
    }]);

    return SmoothScroll;
}(_foundation.Plugin);

/**
 * Default settings for plugin.
 */


SmoothScroll.defaults = {
    /**
     * Amount of time, in ms, the animated scrolling should take between locations.
     * @option
     * @type {number}
     * @default 500
     */
    animationDuration: 500,
    /**
     * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
     * @option
     * @type {string}
     * @default 'linear'
     * @see {@link https://api.jquery.com/animate|Jquery animate}
     */
    animationEasing: 'linear',
    /**
     * Number of pixels to use as a marker for location changes.
     * @option
     * @type {number}
     * @default 50
     */
    threshold: 50,
    /**
     * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
     * @option
     * @type {number}
     * @default 0
     */
    offset: 0
};

exports.SmoothScroll = SmoothScroll;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _whatInput = __webpack_require__(17);

var _whatInput2 = _interopRequireDefault(_whatInput);

__webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery2.default;

// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below

// import './lib/animations';

(0, _jquery2.default)(document).foundation();

(0, _jquery2.default)(".menu-icon").on("click", function () {
	(0, _jquery2.default)(this).toggleClass("hover");
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v4.3.1
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("whatInput", [], factory);
	else if(typeof exports === 'object')
		exports["whatInput"] = factory();
	else
		root["whatInput"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  /*
	   * variables
	   */

	  // last used input type
	  var currentInput = 'initial';

	  // last used input intent
	  var currentIntent = null;

	  // cache document.documentElement
	  var doc = document.documentElement;

	  // form input types
	  var formInputs = ['input', 'select', 'textarea'];

	  var functionList = [];

	  // list of modifier keys commonly used with the mouse and
	  // can be safely ignored to prevent false keyboard detection
	  var ignoreMap = [16, // shift
	  17, // control
	  18, // alt
	  91, // Windows key / left Apple cmd
	  93 // Windows menu / right Apple cmd
	  ];

	  // list of keys for which we change intent even for form inputs
	  var changeIntentMap = [9 // tab
	  ];

	  // mapping of events to input types
	  var inputMap = {
	    keydown: 'keyboard',
	    keyup: 'keyboard',
	    mousedown: 'mouse',
	    mousemove: 'mouse',
	    MSPointerDown: 'pointer',
	    MSPointerMove: 'pointer',
	    pointerdown: 'pointer',
	    pointermove: 'pointer',
	    touchstart: 'touch'
	  };

	  // array of all used input types
	  var inputTypes = [];

	  // boolean: true if touch buffer is active
	  var isBuffering = false;

	  // boolean: true if the page is being scrolled
	  var isScrolling = false;

	  // store current mouse position
	  var mousePos = {
	    x: null,
	    y: null
	  };

	  // map of IE 10 pointer events
	  var pointerMap = {
	    2: 'touch',
	    3: 'touch', // treat pen like touch
	    4: 'mouse'
	  };

	  var supportsPassive = false;

	  try {
	    var opts = Object.defineProperty({}, 'passive', {
	      get: function get() {
	        supportsPassive = true;
	      }
	    });

	    window.addEventListener('test', null, opts);
	  } catch (e) {}

	  /*
	   * set up
	   */

	  var setUp = function setUp() {
	    // add correct mouse wheel event mapping to `inputMap`
	    inputMap[detectWheel()] = 'mouse';

	    addListeners();
	    setInput();
	  };

	  /*
	   * events
	   */

	  var addListeners = function addListeners() {
	    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
	    // can only demonstrate potential, but not actual, interaction
	    // and are treated separately
	    var options = supportsPassive ? { passive: true } : false;

	    // pointer events (mouse, pen, touch)
	    if (window.PointerEvent) {
	      doc.addEventListener('pointerdown', updateInput);
	      doc.addEventListener('pointermove', setIntent);
	    } else if (window.MSPointerEvent) {
	      doc.addEventListener('MSPointerDown', updateInput);
	      doc.addEventListener('MSPointerMove', setIntent);
	    } else {
	      // mouse events
	      doc.addEventListener('mousedown', updateInput);
	      doc.addEventListener('mousemove', setIntent);

	      // touch events
	      if ('ontouchstart' in window) {
	        doc.addEventListener('touchstart', touchBuffer, options);
	        doc.addEventListener('touchend', touchBuffer);
	      }
	    }

	    // mouse wheel
	    doc.addEventListener(detectWheel(), setIntent, options);

	    // keyboard events
	    doc.addEventListener('keydown', updateInput);
	    doc.addEventListener('keyup', updateInput);
	  };

	  // checks conditions before updating new input
	  var updateInput = function updateInput(event) {
	    // only execute if the touch buffer timer isn't running
	    if (!isBuffering) {
	      var eventKey = event.which;
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (currentInput !== value || currentIntent !== value) {
	        var activeElem = document.activeElement;
	        var activeInput = false;
	        var notFormInput = activeElem && activeElem.nodeName && formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1;

	        if (notFormInput || changeIntentMap.indexOf(eventKey) !== -1) {
	          activeInput = true;
	        }

	        if (value === 'touch' ||
	        // ignore mouse modifier keys
	        value === 'mouse' ||
	        // don't switch if the current element is a form input
	        value === 'keyboard' && eventKey && activeInput && ignoreMap.indexOf(eventKey) === -1) {
	          // set the current and catch-all variable
	          currentInput = currentIntent = value;

	          setInput();
	        }
	      }
	    }
	  };

	  // updates the doc and `inputTypes` array with new input
	  var setInput = function setInput() {
	    doc.setAttribute('data-whatinput', currentInput);
	    doc.setAttribute('data-whatintent', currentInput);

	    if (inputTypes.indexOf(currentInput) === -1) {
	      inputTypes.push(currentInput);
	      doc.className += ' whatinput-types-' + currentInput;
	    }

	    fireFunctions('input');
	  };

	  // updates input intent for `mousemove` and `pointermove`
	  var setIntent = function setIntent(event) {
	    // test to see if `mousemove` happened relative to the screen
	    // to detect scrolling versus mousemove
	    if (mousePos['x'] !== event.screenX || mousePos['y'] !== event.screenY) {
	      isScrolling = false;

	      mousePos['x'] = event.screenX;
	      mousePos['y'] = event.screenY;
	    } else {
	      isScrolling = true;
	    }

	    // only execute if the touch buffer timer isn't running
	    // or scrolling isn't happening
	    if (!isBuffering && !isScrolling) {
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (currentIntent !== value) {
	        currentIntent = value;

	        doc.setAttribute('data-whatintent', currentIntent);

	        fireFunctions('intent');
	      }
	    }
	  };

	  // buffers touch events because they frequently also fire mouse events
	  var touchBuffer = function touchBuffer(event) {
	    if (event.type === 'touchstart') {
	      isBuffering = false;

	      // set the current input
	      updateInput(event);
	    } else {
	      isBuffering = true;
	    }
	  };

	  var fireFunctions = function fireFunctions(type) {
	    for (var i = 0, len = functionList.length; i < len; i++) {
	      if (functionList[i].type === type) {
	        functionList[i].fn.call(undefined, currentIntent);
	      }
	    }
	  };

	  /*
	   * utilities
	   */

	  var pointerType = function pointerType(event) {
	    if (typeof event.pointerType === 'number') {
	      return pointerMap[event.pointerType];
	    } else {
	      // treat pen like touch
	      return event.pointerType === 'pen' ? 'touch' : event.pointerType;
	    }
	  };

	  // detect version of mouse wheel event to use
	  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
	  var detectWheel = function detectWheel() {
	    var wheelType = void 0;

	    // Modern browsers support "wheel"
	    if ('onwheel' in document.createElement('div')) {
	      wheelType = 'wheel';
	    } else {
	      // Webkit and IE support at least "mousewheel"
	      // or assume that remaining browsers are older Firefox
	      wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
	    }

	    return wheelType;
	  };

	  var objPos = function objPos(match) {
	    for (var i = 0, len = functionList.length; i < len; i++) {
	      if (functionList[i].fn === match) {
	        return i;
	      }
	    }
	  };

	  /*
	   * init
	   */

	  // don't start script unless browser cuts the mustard
	  // (also passes if polyfills are used)
	  if ('addEventListener' in window && Array.prototype.indexOf) {
	    setUp();
	  }

	  /*
	   * api
	   */

	  return {
	    // returns string: the current input type
	    // opt: 'loose'|'strict'
	    // 'strict' (default): returns the same value as the `data-whatinput` attribute
	    // 'loose': includes `data-whatintent` value if it's more current than `data-whatinput`
	    ask: function ask(opt) {
	      return opt === 'loose' ? currentIntent : currentInput;
	    },

	    // returns array: all the detected input types
	    types: function types() {
	      return inputTypes;
	    },

	    // overwrites ignored keys with provided array
	    ignoreKeys: function ignoreKeys(arr) {
	      ignoreMap = arr;
	    },

	    // attach functions to input and intent "events"
	    // funct: function to fire on change
	    // eventType: 'input'|'intent'
	    registerOnChange: function registerOnChange(fn, eventType) {
	      functionList.push({
	        fn: fn,
	        type: eventType || 'input'
	      });
	    },

	    unRegisterOnChange: function unRegisterOnChange(fn) {
	      var position = objPos(fn);

	      if (position) {
	        functionList.splice(position, 1);
	      }
	    }
	  };
	}();

/***/ }
/******/ ])
});
;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundation = __webpack_require__(19);

var _foundationUtil = __webpack_require__(1);

var _foundationUtil2 = __webpack_require__(7);

var _foundationUtil3 = __webpack_require__(9);

var _foundationUtil4 = __webpack_require__(4);

var _foundationUtil5 = __webpack_require__(3);

var _foundationUtil6 = __webpack_require__(6);

var _foundationUtil7 = __webpack_require__(8);

var _foundationUtil8 = __webpack_require__(20);

var _foundationUtil9 = __webpack_require__(21);

var _foundationUtil10 = __webpack_require__(5);

var _foundation2 = __webpack_require__(22);

var _foundation3 = __webpack_require__(10);

var _foundation4 = __webpack_require__(23);

var _foundation5 = __webpack_require__(11);

var _foundation6 = __webpack_require__(25);

var _foundation7 = __webpack_require__(26);

var _foundation8 = __webpack_require__(27);

var _foundation9 = __webpack_require__(28);

var _foundation10 = __webpack_require__(29);

var _foundation11 = __webpack_require__(31);

var _foundation12 = __webpack_require__(32);

var _foundation13 = __webpack_require__(12);

var _foundation14 = __webpack_require__(33);

var _foundation15 = __webpack_require__(34);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Tooltip } from 'foundation-sites/js/foundation.tooltip';
// import { ResponsiveAccordionTabs } from 'foundation-sites/js/foundation.responsiveAccordionTabs';


// import { Orbit } from 'foundation-sites/js/foundation.orbit';

// import { Drilldown } from 'foundation-sites/js/foundation.drilldown';

// import { Abide } from 'foundation-sites/js/foundation.abide';
_foundation.Foundation.addToJquery(_jquery2.default);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

// import { Tabs } from 'foundation-sites/js/foundation.tabs';

// import { Slider } from 'foundation-sites/js/foundation.slider';
_foundation.Foundation.rtl = _foundationUtil.rtl;
_foundation.Foundation.GetYoDigits = _foundationUtil.GetYoDigits;
_foundation.Foundation.transitionend = _foundationUtil.transitionend;

_foundation.Foundation.Box = _foundationUtil2.Box;
_foundation.Foundation.onImagesLoaded = _foundationUtil3.onImagesLoaded;
_foundation.Foundation.Keyboard = _foundationUtil4.Keyboard;
_foundation.Foundation.MediaQuery = _foundationUtil5.MediaQuery;
_foundation.Foundation.Motion = _foundationUtil6.Motion;
_foundation.Foundation.Move = _foundationUtil6.Move;
_foundation.Foundation.Nest = _foundationUtil7.Nest;
_foundation.Foundation.Timer = _foundationUtil8.Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so no // need to add it to Foundation, just init them.

_foundationUtil9.Touch.init(_jquery2.default);

_foundationUtil10.Triggers.init(_jquery2.default, _foundation.Foundation);

// Foundation.plugin(Abide, 'Abide');

_foundation.Foundation.plugin(_foundation2.Accordion, 'Accordion');

_foundation.Foundation.plugin(_foundation3.AccordionMenu, 'AccordionMenu');

// Foundation.plugin(Drilldown, 'Drilldown');

_foundation.Foundation.plugin(_foundation4.Dropdown, 'Dropdown');

_foundation.Foundation.plugin(_foundation5.DropdownMenu, 'DropdownMenu');

_foundation.Foundation.plugin(_foundation6.Equalizer, 'Equalizer');

_foundation.Foundation.plugin(_foundation7.Interchange, 'Interchange');

_foundation.Foundation.plugin(_foundation8.Magellan, 'Magellan');

_foundation.Foundation.plugin(_foundation9.OffCanvas, 'OffCanvas');

// Foundation.plugin(Orbit, 'Orbit');

_foundation.Foundation.plugin(_foundation10.ResponsiveMenu, 'ResponsiveMenu');

_foundation.Foundation.plugin(_foundation11.ResponsiveToggle, 'ResponsiveToggle');

_foundation.Foundation.plugin(_foundation12.Reveal, 'Reveal');

// Foundation.plugin(Slider, 'Slider');

_foundation.Foundation.plugin(_foundation13.SmoothScroll, 'SmoothScroll');

_foundation.Foundation.plugin(_foundation14.Sticky, 'Sticky');

// Foundation.plugin(Tabs, 'Tabs');

_foundation.Foundation.plugin(_foundation15.Toggler, 'Toggler');

// Foundation.plugin(Tooltip, 'Tooltip');

// Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');

module.exports = _foundation.Foundation;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Foundation = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

var _foundationUtil2 = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FOUNDATION_VERSION = '6.4.3';

// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation = {
  version: FOUNDATION_VERSION,

  /**
   * Stores initialized plugins.
   */
  _plugins: {},

  /**
   * Stores generated unique ids for plugin instances
   */
  _uuids: [],

  /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
  plugin: function plugin(_plugin, name) {
    // Object key to use when adding to global Foundation object
    // Examples: Foundation.Reveal, Foundation.OffCanvas
    var className = name || functionName(_plugin);
    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
    // Examples: data-reveal, data-off-canvas
    var attrName = hyphenate(className);

    // Add to the Foundation object and the plugins list (for reflowing)
    this._plugins[attrName] = this[className] = _plugin;
  },
  /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
  registerPlugin: function registerPlugin(plugin, name) {
    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
    plugin.uuid = (0, _foundationUtil.GetYoDigits)(6, pluginName);

    if (!plugin.$element.attr('data-' + pluginName)) {
      plugin.$element.attr('data-' + pluginName, plugin.uuid);
    }
    if (!plugin.$element.data('zfPlugin')) {
      plugin.$element.data('zfPlugin', plugin);
    }
    /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */
    plugin.$element.trigger('init.zf.' + pluginName);

    this._uuids.push(plugin.uuid);

    return;
  },
  /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
  unregisterPlugin: function unregisterPlugin(plugin) {
    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
    plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
    /**
     * Fires when the plugin has been destroyed.
     * @event Plugin#destroyed
     */
    .trigger('destroyed.zf.' + pluginName);
    for (var prop in plugin) {
      plugin[prop] = null; //clean up script to prep for garbage collection.
    }
    return;
  },

  /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
  reInit: function reInit(plugins) {
    var isJQ = plugins instanceof _jquery2.default;
    try {
      if (isJQ) {
        plugins.each(function () {
          (0, _jquery2.default)(this).data('zfPlugin')._init();
        });
      } else {
        var type = typeof plugins === 'undefined' ? 'undefined' : _typeof(plugins),
            _this = this,
            fns = {
          'object': function object(plgs) {
            plgs.forEach(function (p) {
              p = hyphenate(p);
              (0, _jquery2.default)('[data-' + p + ']').foundation('_init');
            });
          },
          'string': function string() {
            plugins = hyphenate(plugins);
            (0, _jquery2.default)('[data-' + plugins + ']').foundation('_init');
          },
          'undefined': function undefined() {
            this['object'](Object.keys(_this._plugins));
          }
        };
        fns[type](plugins);
      }
    } catch (err) {
      console.error(err);
    } finally {
      return plugins;
    }
  },

  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function reflow(elem, plugins) {

    // If plugins is undefined, just grab everything
    if (typeof plugins === 'undefined') {
      plugins = Object.keys(this._plugins);
    }
    // If plugins is a string, convert it to an array with one item
    else if (typeof plugins === 'string') {
        plugins = [plugins];
      }

    var _this = this;

    // Iterate through each plugin
    _jquery2.default.each(plugins, function (i, name) {
      // Get the current plugin
      var plugin = _this._plugins[name];

      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
      var $elem = (0, _jquery2.default)(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');

      // For each plugin found, initialize it
      $elem.each(function () {
        var $el = (0, _jquery2.default)(this),
            opts = {};
        // Don't double-dip on plugins
        if ($el.data('zfPlugin')) {
          console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
          return;
        }

        if ($el.attr('data-options')) {
          var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
            var opt = e.split(':').map(function (el) {
              return el.trim();
            });
            if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
          });
        }
        try {
          $el.data('zfPlugin', new plugin((0, _jquery2.default)(this), opts));
        } catch (er) {
          console.error(er);
        } finally {
          return;
        }
      });
    });
  },
  getFnName: functionName,

  addToJquery: function addToJquery($) {
    // TODO: consider not making this a jQuery function
    // TODO: need way to reflow vs. re-initialize
    /**
     * The Foundation jQuery method.
     * @param {String|Array} method - An action to perform on the current jQuery object.
     */
    var foundation = function foundation(method) {
      var type = typeof method === 'undefined' ? 'undefined' : _typeof(method),
          $noJS = $('.no-js');

      if ($noJS.length) {
        $noJS.removeClass('no-js');
      }

      if (type === 'undefined') {
        //needs to initialize the Foundation object, or an individual plugin.
        _foundationUtil2.MediaQuery._init();
        Foundation.reflow(this);
      } else if (type === 'string') {
        //an individual method to invoke on a plugin or group of plugins
        var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
        var plugClass = this.data('zfPlugin'); //determine the class of plugin

        if (plugClass !== undefined && plugClass[method] !== undefined) {
          //make sure both the class and method exist
          if (this.length === 1) {
            //if there's only one, call it directly.
            plugClass[method].apply(plugClass, args);
          } else {
            this.each(function (i, el) {
              //otherwise loop through the jQuery collection and invoke the method on each
              plugClass[method].apply($(el).data('zfPlugin'), args);
            });
          }
        } else {
          //error for no class or no method
          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
        }
      } else {
        //error for invalid argument type
        throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
      }
      return this;
    };
    $.fn.foundation = foundation;
    return $;
  }
};

Foundation.util = {
  /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
  throttle: function throttle(func, delay) {
    var timer = null;

    return function () {
      var context = this,
          args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }
};

window.Foundation = Foundation;

// Polyfill for requestAnimationFrame
(function () {
  if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
    return new Date().getTime();
  };

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function (callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
  /**
   * Polyfill for performance.now, required by rAF
   */
  if (!window.performance || !window.performance.now) {
    window.performance = {
      start: Date.now(),
      now: function now() {
        return Date.now() - this.start;
      }
    };
  }
})();
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function fNOP() {},
        fBound = function fBound() {
      return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// Polyfill to get the name of a function in IE9
function functionName(fn) {
  if (Function.prototype.name === undefined) {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = funcNameRegex.exec(fn.toString());
    return results && results.length > 1 ? results[1].trim() : "";
  } else if (fn.prototype === undefined) {
    return fn.constructor.name;
  } else {
    return fn.prototype.constructor.name;
  }
}
function parseValue(str) {
  if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
  return str;
}
// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

exports.Foundation = Foundation;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Timer(elem, options, cb) {
  var _this = this,
      duration = options.duration,
      //options is an object for easily adding features later.
  nameSpace = Object.keys(elem.data())[0] || 'timer',
      remain = -1,
      start,
      timer;

  this.isPaused = false;

  this.restart = function () {
    remain = -1;
    clearTimeout(timer);
    this.start();
  };

  this.start = function () {
    this.isPaused = false;
    // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
    clearTimeout(timer);
    remain = remain <= 0 ? duration : remain;
    elem.data('paused', false);
    start = Date.now();
    timer = setTimeout(function () {
      if (options.infinite) {
        _this.restart(); //rerun the timer.
      }
      if (cb && typeof cb === 'function') {
        cb();
      }
    }, remain);
    elem.trigger('timerstart.zf.' + nameSpace);
  };

  this.pause = function () {
    this.isPaused = true;
    //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
    clearTimeout(timer);
    elem.data('paused', true);
    var end = Date.now();
    remain = remain - (end - start);
    elem.trigger('timerpaused.zf.' + nameSpace);
  };
}

exports.Timer = Timer;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Touch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //**************************************************
//**Work inspired by multiple jquery swipe plugins**
//**Done by Yohai Ararat ***************************
//**************************************************

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Touch = {};

var startPosX,
    startPosY,
    startTime,
    elapsedTime,
    isMoving = false;

function onTouchEnd() {
  //  alert(this);
  this.removeEventListener('touchmove', onTouchMove);
  this.removeEventListener('touchend', onTouchEnd);
  isMoving = false;
}

function onTouchMove(e) {
  if (_jquery2.default.spotSwipe.preventDefault) {
    e.preventDefault();
  }
  if (isMoving) {
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    var dx = startPosX - x;
    var dy = startPosY - y;
    var dir;
    elapsedTime = new Date().getTime() - startTime;
    if (Math.abs(dx) >= _jquery2.default.spotSwipe.moveThreshold && elapsedTime <= _jquery2.default.spotSwipe.timeThreshold) {
      dir = dx > 0 ? 'left' : 'right';
    }
    // else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
    //   dir = dy > 0 ? 'down' : 'up';
    // }
    if (dir) {
      e.preventDefault();
      onTouchEnd.call(this);
      (0, _jquery2.default)(this).trigger('swipe', dir).trigger('swipe' + dir);
    }
  }
}

function onTouchStart(e) {
  if (e.touches.length == 1) {
    startPosX = e.touches[0].pageX;
    startPosY = e.touches[0].pageY;
    isMoving = true;
    startTime = new Date().getTime();
    this.addEventListener('touchmove', onTouchMove, false);
    this.addEventListener('touchend', onTouchEnd, false);
  }
}

function init() {
  this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
}

function teardown() {
  this.removeEventListener('touchstart', onTouchStart);
}

var SpotSwipe = function () {
  function SpotSwipe($) {
    _classCallCheck(this, SpotSwipe);

    this.version = '1.0.0';
    this.enabled = 'ontouchstart' in document.documentElement;
    this.preventDefault = false;
    this.moveThreshold = 75;
    this.timeThreshold = 200;
    this.$ = $;
    this._init();
  }

  _createClass(SpotSwipe, [{
    key: '_init',
    value: function _init() {
      var $ = this.$;
      $.event.special.swipe = { setup: init };

      $.each(['left', 'up', 'down', 'right'], function () {
        $.event.special['swipe' + this] = { setup: function setup() {
            $(this).on('swipe', $.noop);
          } };
      });
    }
  }]);

  return SpotSwipe;
}();

/****************************************************
 * As far as I can tell, both setupSpotSwipe and    *
 * setupTouchHandler should be idempotent,          *
 * because they directly replace functions &        *
 * values, and do not add event handlers directly.  *
 ****************************************************/

Touch.setupSpotSwipe = function ($) {
  $.spotSwipe = new SpotSwipe($);
};

/****************************************************
 * Method for adding pseudo drag events to elements *
 ***************************************************/
Touch.setupTouchHandler = function ($) {
  $.fn.addTouch = function () {
    this.each(function (i, el) {
      $(el).bind('touchstart touchmove touchend touchcancel', function () {
        //we pass the original event object because the jQuery event
        //object is normalized to w3c specs and does not provide the TouchList
        handleTouch(event);
      });
    });

    var handleTouch = function handleTouch(event) {
      var touches = event.changedTouches,
          first = touches[0],
          eventTypes = {
        touchstart: 'mousedown',
        touchmove: 'mousemove',
        touchend: 'mouseup'
      },
          type = eventTypes[event.type],
          simulatedEvent;

      if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {
        simulatedEvent = new window.MouseEvent(type, {
          'bubbles': true,
          'cancelable': true,
          'screenX': first.screenX,
          'screenY': first.screenY,
          'clientX': first.clientX,
          'clientY': first.clientY
        });
      } else {
        simulatedEvent = document.createEvent('MouseEvent');
        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0 /*left*/, null);
      }
      first.target.dispatchEvent(simulatedEvent);
    };
  };
};

Touch.init = function ($) {
  if (typeof $.spotSwipe === 'undefined') {
    Touch.setupSpotSwipe($);
    Touch.setupTouchHandler($);
  }
};

exports.Touch = Touch;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accordion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(4);

var _foundationUtil2 = __webpack_require__(1);

var _foundation = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 */

var Accordion = function (_Plugin) {
  _inherits(Accordion, _Plugin);

  function Accordion() {
    _classCallCheck(this, Accordion);

    return _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).apply(this, arguments));
  }

  _createClass(Accordion, [{
    key: '_setup',

    /**
     * Creates a new instance of an accordion.
     * @class
     * @name Accordion
     * @fires Accordion#init
     * @param {jQuery} element - jQuery object to make into an accordion.
     * @param {Object} options - a plain object with settings to override the default options.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Accordion.defaults, this.$element.data(), options);

      this.className = 'Accordion'; // ie9 back compat
      this._init();

      _foundationUtil.Keyboard.register('Accordion', {
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ARROW_DOWN': 'next',
        'ARROW_UP': 'previous'
      });
    }

    /**
     * Initializes the accordion by animating the preset active pane(s).
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var _this3 = this;

      this.$element.attr('role', 'tablist');
      this.$tabs = this.$element.children('[data-accordion-item]');

      this.$tabs.each(function (idx, el) {
        var $el = (0, _jquery2.default)(el),
            $content = $el.children('[data-tab-content]'),
            id = $content[0].id || (0, _foundationUtil2.GetYoDigits)(6, 'accordion'),
            linkId = el.id || id + '-label';

        $el.find('a:first').attr({
          'aria-controls': id,
          'role': 'tab',
          'id': linkId,
          'aria-expanded': false,
          'aria-selected': false
        });

        $content.attr({ 'role': 'tabpanel', 'aria-labelledby': linkId, 'aria-hidden': true, 'id': id });
      });
      var $initActive = this.$element.find('.is-active').children('[data-tab-content]');
      this.firstTimeInit = true;
      if ($initActive.length) {
        this.down($initActive, this.firstTimeInit);
        this.firstTimeInit = false;
      }

      this._checkDeepLink = function () {
        var anchor = window.location.hash;
        //need a hash and a relevant anchor in this tabset
        if (anchor.length) {
          var $link = _this3.$element.find('[href$="' + anchor + '"]'),
              $anchor = (0, _jquery2.default)(anchor);

          if ($link.length && $anchor) {
            if (!$link.parent('[data-accordion-item]').hasClass('is-active')) {
              _this3.down($anchor, _this3.firstTimeInit);
              _this3.firstTimeInit = false;
            };

            //roll up a little to show the titles
            if (_this3.options.deepLinkSmudge) {
              var _this = _this3;
              (0, _jquery2.default)(window).load(function () {
                var offset = _this.$element.offset();
                (0, _jquery2.default)('html, body').animate({ scrollTop: offset.top }, _this.options.deepLinkSmudgeDelay);
              });
            }

            /**
              * Fires when the zplugin has deeplinked at pageload
              * @event Accordion#deeplink
              */
            _this3.$element.trigger('deeplink.zf.accordion', [$link, $anchor]);
          }
        }
      };

      //use browser to open a tab, if it exists in this tabset
      if (this.options.deepLink) {
        this._checkDeepLink();
      }

      this._events();
    }

    /**
     * Adds event handlers for items within the accordion.
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this;

      this.$tabs.each(function () {
        var $elem = (0, _jquery2.default)(this);
        var $tabContent = $elem.children('[data-tab-content]');
        if ($tabContent.length) {
          $elem.children('a').off('click.zf.accordion keydown.zf.accordion').on('click.zf.accordion', function (e) {
            e.preventDefault();
            _this.toggle($tabContent);
          }).on('keydown.zf.accordion', function (e) {
            _foundationUtil.Keyboard.handleKey(e, 'Accordion', {
              toggle: function toggle() {
                _this.toggle($tabContent);
              },
              next: function next() {
                var $a = $elem.next().find('a').focus();
                if (!_this.options.multiExpand) {
                  $a.trigger('click.zf.accordion');
                }
              },
              previous: function previous() {
                var $a = $elem.prev().find('a').focus();
                if (!_this.options.multiExpand) {
                  $a.trigger('click.zf.accordion');
                }
              },
              handled: function handled() {
                e.preventDefault();
                e.stopPropagation();
              }
            });
          });
        }
      });
      if (this.options.deepLink) {
        (0, _jquery2.default)(window).on('popstate', this._checkDeepLink);
      }
    }

    /**
     * Toggles the selected content pane's open/close state.
     * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
     * @function
     */

  }, {
    key: 'toggle',
    value: function toggle($target) {
      if ($target.closest('[data-accordion]').is('[disabled]')) {
        console.info('Cannot toggle an accordion that is disabled.');
        return;
      }
      if ($target.parent().hasClass('is-active')) {
        this.up($target);
      } else {
        this.down($target);
      }
      //either replace or update browser history
      if (this.options.deepLink) {
        var anchor = $target.prev('a').attr('href');

        if (this.options.updateHistory) {
          history.pushState({}, '', anchor);
        } else {
          history.replaceState({}, '', anchor);
        }
      }
    }

    /**
     * Opens the accordion tab defined by `$target`.
     * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
     * @param {Boolean} firstTime - flag to determine if reflow should happen.
     * @fires Accordion#down
     * @function
     */

  }, {
    key: 'down',
    value: function down($target, firstTime) {
      var _this4 = this;

      /**
       * checking firstTime allows for initial render of the accordion
       * to render preset is-active panes.
       */
      if ($target.closest('[data-accordion]').is('[disabled]') && !firstTime) {
        console.info('Cannot call down on an accordion that is disabled.');
        return;
      }
      $target.attr('aria-hidden', false).parent('[data-tab-content]').addBack().parent().addClass('is-active');

      if (!this.options.multiExpand && !firstTime) {
        var $currentActive = this.$element.children('.is-active').children('[data-tab-content]');
        if ($currentActive.length) {
          this.up($currentActive.not($target));
        }
      }

      $target.slideDown(this.options.slideSpeed, function () {
        /**
         * Fires when the tab is done opening.
         * @event Accordion#down
         */
        _this4.$element.trigger('down.zf.accordion', [$target]);
      });

      (0, _jquery2.default)('#' + $target.attr('aria-labelledby')).attr({
        'aria-expanded': true,
        'aria-selected': true
      });
    }

    /**
     * Closes the tab defined by `$target`.
     * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
     * @fires Accordion#up
     * @function
     */

  }, {
    key: 'up',
    value: function up($target) {
      if ($target.closest('[data-accordion]').is('[disabled]')) {
        console.info('Cannot call up on an accordion that is disabled.');
        return;
      }

      var $aunts = $target.parent().siblings(),
          _this = this;

      if (!this.options.allowAllClosed && !$aunts.hasClass('is-active') || !$target.parent().hasClass('is-active')) {
        return;
      }

      $target.slideUp(_this.options.slideSpeed, function () {
        /**
         * Fires when the tab is done collapsing up.
         * @event Accordion#up
         */
        _this.$element.trigger('up.zf.accordion', [$target]);
      });

      $target.attr('aria-hidden', true).parent().removeClass('is-active');

      (0, _jquery2.default)('#' + $target.attr('aria-labelledby')).attr({
        'aria-expanded': false,
        'aria-selected': false
      });
    }

    /**
     * Destroys an instance of an accordion.
     * @fires Accordion#destroyed
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display', '');
      this.$element.find('a').off('.zf.accordion');
      if (this.options.deepLink) {
        (0, _jquery2.default)(window).off('popstate', this._checkDeepLink);
      }
    }
  }]);

  return Accordion;
}(_foundation.Plugin);

Accordion.defaults = {
  /**
   * Amount of time to animate the opening of an accordion pane.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Allow the accordion to have multiple open panes.
   * @option
   * @type {boolean}
   * @default false
   */
  multiExpand: false,
  /**
   * Allow the accordion to close all panes.
   * @option
   * @type {boolean}
   * @default false
   */
  allowAllClosed: false,
  /**
   * Allows the window to scroll to content of pane specified by hash anchor
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * Adjust the deep link scroll to make sure the top of the accordion panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * Animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * Update the browser history with the open accordion
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false
};

exports.Accordion = Accordion;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(4);

var _foundationUtil2 = __webpack_require__(1);

var _foundation = __webpack_require__(24);

var _foundationUtil3 = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dropdown module.
 * @module foundation.dropdown
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 */
var Dropdown = function (_Positionable) {
  _inherits(Dropdown, _Positionable);

  function Dropdown() {
    _classCallCheck(this, Dropdown);

    return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
  }

  _createClass(Dropdown, [{
    key: '_setup',

    /**
     * Creates a new instance of a dropdown.
     * @class
     * @name Dropdown
     * @param {jQuery} element - jQuery object to make into a dropdown.
     *        Object should be of the dropdown panel, rather than its anchor.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Dropdown.defaults, this.$element.data(), options);
      this.className = 'Dropdown'; // ie9 back compat

      // Triggers init is idempotent, just need to make sure it is initialized
      _foundationUtil3.Triggers.init(_jquery2.default);

      this._init();

      _foundationUtil.Keyboard.register('Dropdown', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ESCAPE': 'close'
      });
    }

    /**
     * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
     * @function
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var $id = this.$element.attr('id');

      this.$anchors = (0, _jquery2.default)('[data-toggle="' + $id + '"]').length ? (0, _jquery2.default)('[data-toggle="' + $id + '"]') : (0, _jquery2.default)('[data-open="' + $id + '"]');
      this.$anchors.attr({
        'aria-controls': $id,
        'data-is-focus': false,
        'data-yeti-box': $id,
        'aria-haspopup': true,
        'aria-expanded': false
      });

      this._setCurrentAnchor(this.$anchors.first());

      if (this.options.parentClass) {
        this.$parent = this.$element.parents('.' + this.options.parentClass);
      } else {
        this.$parent = null;
      }

      this.$element.attr({
        'aria-hidden': 'true',
        'data-yeti-box': $id,
        'data-resize': $id,
        'aria-labelledby': this.$currentAnchor.id || (0, _foundationUtil2.GetYoDigits)(6, 'dd-anchor')
      });
      _get(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), '_init', this).call(this);
      this._events();
    }
  }, {
    key: '_getDefaultPosition',
    value: function _getDefaultPosition() {
      // handle legacy classnames
      var position = this.$element[0].className.match(/(top|left|right|bottom)/g);
      if (position) {
        return position[0];
      } else {
        return 'bottom';
      }
    }
  }, {
    key: '_getDefaultAlignment',
    value: function _getDefaultAlignment() {
      // handle legacy float approach
      var horizontalPosition = /float-(\S+)/.exec(this.$currentAnchor.className);
      if (horizontalPosition) {
        return horizontalPosition[1];
      }

      return _get(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), '_getDefaultAlignment', this).call(this);
    }

    /**
     * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.
     * Recursively calls itself if a collision is detected, with a new position class.
     * @function
     * @private
     */

  }, {
    key: '_setPosition',
    value: function _setPosition() {
      _get(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), '_setPosition', this).call(this, this.$currentAnchor, this.$element, this.$parent);
    }

    /**
     * Make it a current anchor.
     * Current anchor as the reference for the position of Dropdown panes.
     * @param {HTML} el - DOM element of the anchor.
     * @function
     * @private
     */

  }, {
    key: '_setCurrentAnchor',
    value: function _setCurrentAnchor(el) {
      this.$currentAnchor = (0, _jquery2.default)(el);
    }

    /**
     * Adds event listeners to the element utilizing the triggers utility library.
     * @function
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this;
      this.$element.on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': this.close.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this),
        'resizeme.zf.trigger': this._setPosition.bind(this)
      });

      this.$anchors.off('click.zf.trigger').on('click.zf.trigger', function () {
        _this._setCurrentAnchor(this);
      });

      if (this.options.hover) {
        this.$anchors.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
          _this._setCurrentAnchor(this);

          var bodyData = (0, _jquery2.default)('body').data();
          if (typeof bodyData.whatinput === 'undefined' || bodyData.whatinput === 'mouse') {
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () {
              _this.open();
              _this.$anchors.data('hover', true);
            }, _this.options.hoverDelay);
          }
        }).on('mouseleave.zf.dropdown', function () {
          clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function () {
            _this.close();
            _this.$anchors.data('hover', false);
          }, _this.options.hoverDelay);
        });
        if (this.options.hoverPane) {
          this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
            clearTimeout(_this.timeout);
          }).on('mouseleave.zf.dropdown', function () {
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () {
              _this.close();
              _this.$anchors.data('hover', false);
            }, _this.options.hoverDelay);
          });
        }
      }
      this.$anchors.add(this.$element).on('keydown.zf.dropdown', function (e) {

        var $target = (0, _jquery2.default)(this),
            visibleFocusableElements = _foundationUtil.Keyboard.findFocusable(_this.$element);

        _foundationUtil.Keyboard.handleKey(e, 'Dropdown', {
          open: function open() {
            if ($target.is(_this.$anchors)) {
              _this.open();
              _this.$element.attr('tabindex', -1).focus();
              e.preventDefault();
            }
          },
          close: function close() {
            _this.close();
            _this.$anchors.focus();
          }
        });
      });
    }

    /**
     * Adds an event handler to the body to close any dropdowns on a click.
     * @function
     * @private
     */

  }, {
    key: '_addBodyHandler',
    value: function _addBodyHandler() {
      var $body = (0, _jquery2.default)(document.body).not(this.$element),
          _this = this;
      $body.off('click.zf.dropdown').on('click.zf.dropdown', function (e) {
        if (_this.$anchors.is(e.target) || _this.$anchors.find(e.target).length) {
          return;
        }
        if (_this.$element.find(e.target).length) {
          return;
        }
        _this.close();
        $body.off('click.zf.dropdown');
      });
    }

    /**
     * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
     * @function
     * @fires Dropdown#closeme
     * @fires Dropdown#show
     */

  }, {
    key: 'open',
    value: function open() {
      // var _this = this;
      /**
       * Fires to close other open dropdowns, typically when dropdown is opening
       * @event Dropdown#closeme
       */
      this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
      this.$anchors.addClass('hover').attr({ 'aria-expanded': true });
      // this.$element/*.show()*/;

      this.$element.addClass('is-opening');
      this._setPosition();
      this.$element.removeClass('is-opening').addClass('is-open').attr({ 'aria-hidden': false });

      if (this.options.autoFocus) {
        var $focusable = _foundationUtil.Keyboard.findFocusable(this.$element);
        if ($focusable.length) {
          $focusable.eq(0).focus();
        }
      }

      if (this.options.closeOnClick) {
        this._addBodyHandler();
      }

      if (this.options.trapFocus) {
        _foundationUtil.Keyboard.trapFocus(this.$element);
      }

      /**
       * Fires once the dropdown is visible.
       * @event Dropdown#show
       */
      this.$element.trigger('show.zf.dropdown', [this.$element]);
    }

    /**
     * Closes the open dropdown pane.
     * @function
     * @fires Dropdown#hide
     */

  }, {
    key: 'close',
    value: function close() {
      if (!this.$element.hasClass('is-open')) {
        return false;
      }
      this.$element.removeClass('is-open').attr({ 'aria-hidden': true });

      this.$anchors.removeClass('hover').attr('aria-expanded', false);

      /**
       * Fires once the dropdown is no longer visible.
       * @event Dropdown#hide
       */
      this.$element.trigger('hide.zf.dropdown', [this.$element]);

      if (this.options.trapFocus) {
        _foundationUtil.Keyboard.releaseFocus(this.$element);
      }
    }

    /**
     * Toggles the dropdown pane's visibility.
     * @function
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.$element.hasClass('is-open')) {
        if (this.$anchors.data('hover')) return;
        this.close();
      } else {
        this.open();
      }
    }

    /**
     * Destroys the dropdown.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.off('.zf.trigger').hide();
      this.$anchors.off('.zf.dropdown');
      (0, _jquery2.default)(document.body).off('click.zf.dropdown');
    }
  }]);

  return Dropdown;
}(_foundation.Positionable);

Dropdown.defaults = {
  /**
   * Class that designates bounding container of Dropdown (default: window)
   * @option
   * @type {?string}
   * @default null
   */
  parentClass: null,
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 250
   */
  hoverDelay: 250,
  /**
   * Allow submenus to open on hover events
   * @option
   * @type {boolean}
   * @default false
   */
  hover: false,
  /**
   * Don't close dropdown when hovering over dropdown pane
   * @option
   * @type {boolean}
   * @default false
   */
  hoverPane: false,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
  /**
   * DEPRECATED: Class applied to adjust open position.
   * @option
   * @type {string}
   * @default ''
   */
  positionClass: '',

  /**
   * Position of dropdown. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',
  /**
   * Alignment of dropdown relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow overlap of container/window. If false, dropdown will first try to position as defined by data-position and data-alignment, but reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,
  /**
   * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false,
  /**
   * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,
  /**
   * Allows a click on the body to close the dropdown.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false
};

exports.Dropdown = Dropdown;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Positionable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foundationUtil = __webpack_require__(7);

var _foundation = __webpack_require__(2);

var _foundationUtil2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITIONS = ['left', 'right', 'top', 'bottom'];
var VERTICAL_ALIGNMENTS = ['top', 'bottom', 'center'];
var HORIZONTAL_ALIGNMENTS = ['left', 'right', 'center'];

var ALIGNMENTS = {
  'left': VERTICAL_ALIGNMENTS,
  'right': VERTICAL_ALIGNMENTS,
  'top': HORIZONTAL_ALIGNMENTS,
  'bottom': HORIZONTAL_ALIGNMENTS
};

function nextItem(item, array) {
  var currentIdx = array.indexOf(item);
  if (currentIdx === array.length - 1) {
    return array[0];
  } else {
    return array[currentIdx + 1];
  }
}

var Positionable = function (_Plugin) {
  _inherits(Positionable, _Plugin);

  function Positionable() {
    _classCallCheck(this, Positionable);

    return _possibleConstructorReturn(this, (Positionable.__proto__ || Object.getPrototypeOf(Positionable)).apply(this, arguments));
  }

  _createClass(Positionable, [{
    key: '_init',

    /**
     * Abstract class encapsulating the tether-like explicit positioning logic
     * including repositioning based on overlap.
     * Expects classes to define defaults for vOffset, hOffset, position,
     * alignment, allowOverlap, and allowBottomOverlap. They can do this by
     * extending the defaults, or (for now recommended due to the way docs are
     * generated) by explicitly declaring them.
     *
     **/

    value: function _init() {
      this.triedPositions = {};
      this.position = this.options.position === 'auto' ? this._getDefaultPosition() : this.options.position;
      this.alignment = this.options.alignment === 'auto' ? this._getDefaultAlignment() : this.options.alignment;
    }
  }, {
    key: '_getDefaultPosition',
    value: function _getDefaultPosition() {
      return 'bottom';
    }
  }, {
    key: '_getDefaultAlignment',
    value: function _getDefaultAlignment() {
      switch (this.position) {
        case 'bottom':
        case 'top':
          return (0, _foundationUtil2.rtl)() ? 'right' : 'left';
        case 'left':
        case 'right':
          return 'bottom';
      }
    }

    /**
     * Adjusts the positionable possible positions by iterating through alignments
     * and positions.
     * @function
     * @private
     */

  }, {
    key: '_reposition',
    value: function _reposition() {
      if (this._alignmentsExhausted(this.position)) {
        this.position = nextItem(this.position, POSITIONS);
        this.alignment = ALIGNMENTS[this.position][0];
      } else {
        this._realign();
      }
    }

    /**
     * Adjusts the dropdown pane possible positions by iterating through alignments
     * on the current position.
     * @function
     * @private
     */

  }, {
    key: '_realign',
    value: function _realign() {
      this._addTriedPosition(this.position, this.alignment);
      this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position]);
    }
  }, {
    key: '_addTriedPosition',
    value: function _addTriedPosition(position, alignment) {
      this.triedPositions[position] = this.triedPositions[position] || [];
      this.triedPositions[position].push(alignment);
    }
  }, {
    key: '_positionsExhausted',
    value: function _positionsExhausted() {
      var isExhausted = true;
      for (var i = 0; i < POSITIONS.length; i++) {
        isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);
      }
      return isExhausted;
    }
  }, {
    key: '_alignmentsExhausted',
    value: function _alignmentsExhausted(position) {
      return this.triedPositions[position] && this.triedPositions[position].length == ALIGNMENTS[position].length;
    }

    // When we're trying to center, we don't want to apply offset that's going to
    // take us just off center, so wrap around to return 0 for the appropriate
    // offset in those alignments.  TODO: Figure out if we want to make this
    // configurable behavior... it feels more intuitive, especially for tooltips, but
    // it's possible someone might actually want to start from center and then nudge
    // slightly off.

  }, {
    key: '_getVOffset',
    value: function _getVOffset() {
      return this.options.vOffset;
    }
  }, {
    key: '_getHOffset',
    value: function _getHOffset() {
      return this.options.hOffset;
    }
  }, {
    key: '_setPosition',
    value: function _setPosition($anchor, $element, $parent) {
      if ($anchor.attr('aria-expanded') === 'false') {
        return false;
      }
      var $eleDims = _foundationUtil.Box.GetDimensions($element),
          $anchorDims = _foundationUtil.Box.GetDimensions($anchor);

      $element.offset(_foundationUtil.Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));

      if (!this.options.allowOverlap) {
        var overlaps = {};
        var minOverlap = 100000000;
        // default coordinates to how we start, in case we can't figure out better
        var minCoordinates = { position: this.position, alignment: this.alignment };
        while (!this._positionsExhausted()) {
          var overlap = _foundationUtil.Box.OverlapArea($element, $parent, false, false, this.options.allowBottomOverlap);
          if (overlap === 0) {
            return;
          }

          if (overlap < minOverlap) {
            minOverlap = overlap;
            minCoordinates = { position: this.position, alignment: this.alignment };
          }

          this._reposition();

          $element.offset(_foundationUtil.Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
        }
        // If we get through the entire loop, there was no non-overlapping
        // position available. Pick the version with least overlap.
        this.position = minCoordinates.position;
        this.alignment = minCoordinates.alignment;
        $element.offset(_foundationUtil.Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
      }
    }
  }]);

  return Positionable;
}(_foundation.Plugin);

Positionable.defaults = {
  /**
   * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',
  /**
   * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow overlap of container/window. If false, dropdown positionable first
   * try to position as defined by data-position and data-alignment, but
   * reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,
  /**
   * Number of pixels the positionable should be separated vertically from anchor
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Number of pixels the positionable should be separated horizontally from anchor
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0
};

exports.Positionable = Positionable;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Equalizer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(3);

var _foundationUtil2 = __webpack_require__(9);

var _foundationUtil3 = __webpack_require__(1);

var _foundation = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Equalizer module.
 * @module foundation.equalizer
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.imageLoader if equalizer contains images
 */

var Equalizer = function (_Plugin) {
  _inherits(Equalizer, _Plugin);

  function Equalizer() {
    _classCallCheck(this, Equalizer);

    return _possibleConstructorReturn(this, (Equalizer.__proto__ || Object.getPrototypeOf(Equalizer)).apply(this, arguments));
  }

  _createClass(Equalizer, [{
    key: '_setup',

    /**
     * Creates a new instance of Equalizer.
     * @class
     * @name Equalizer
     * @fires Equalizer#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Equalizer.defaults, this.$element.data(), options);
      this.className = 'Equalizer'; // ie9 back compat

      this._init();
    }

    /**
     * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var eqId = this.$element.attr('data-equalizer') || '';
      var $watched = this.$element.find('[data-equalizer-watch="' + eqId + '"]');

      _foundationUtil.MediaQuery._init();

      this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
      this.$element.attr('data-resize', eqId || (0, _foundationUtil3.GetYoDigits)(6, 'eq'));
      this.$element.attr('data-mutate', eqId || (0, _foundationUtil3.GetYoDigits)(6, 'eq'));

      this.hasNested = this.$element.find('[data-equalizer]').length > 0;
      this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
      this.isOn = false;
      this._bindHandler = {
        onResizeMeBound: this._onResizeMe.bind(this),
        onPostEqualizedBound: this._onPostEqualized.bind(this)
      };

      var imgs = this.$element.find('img');
      var tooSmall;
      if (this.options.equalizeOn) {
        tooSmall = this._checkMQ();
        (0, _jquery2.default)(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
      } else {
        this._events();
      }
      if (tooSmall !== undefined && tooSmall === false || tooSmall === undefined) {
        if (imgs.length) {
          (0, _foundationUtil2.onImagesLoaded)(imgs, this._reflow.bind(this));
        } else {
          this._reflow();
        }
      }
    }

    /**
     * Removes event listeners if the breakpoint is too small.
     * @private
     */

  }, {
    key: '_pauseEvents',
    value: function _pauseEvents() {
      this.isOn = false;
      this.$element.off({
        '.zf.equalizer': this._bindHandler.onPostEqualizedBound,
        'resizeme.zf.trigger': this._bindHandler.onResizeMeBound,
        'mutateme.zf.trigger': this._bindHandler.onResizeMeBound
      });
    }

    /**
     * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
     * @private
     */

  }, {
    key: '_onResizeMe',
    value: function _onResizeMe(e) {
      this._reflow();
    }

    /**
     * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
     * @private
     */

  }, {
    key: '_onPostEqualized',
    value: function _onPostEqualized(e) {
      if (e.target !== this.$element[0]) {
        this._reflow();
      }
    }

    /**
     * Initializes events for Equalizer.
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this;
      this._pauseEvents();
      if (this.hasNested) {
        this.$element.on('postequalized.zf.equalizer', this._bindHandler.onPostEqualizedBound);
      } else {
        this.$element.on('resizeme.zf.trigger', this._bindHandler.onResizeMeBound);
        this.$element.on('mutateme.zf.trigger', this._bindHandler.onResizeMeBound);
      }
      this.isOn = true;
    }

    /**
     * Checks the current breakpoint to the minimum required size.
     * @private
     */

  }, {
    key: '_checkMQ',
    value: function _checkMQ() {
      var tooSmall = !_foundationUtil.MediaQuery.is(this.options.equalizeOn);
      if (tooSmall) {
        if (this.isOn) {
          this._pauseEvents();
          this.$watched.css('height', 'auto');
        }
      } else {
        if (!this.isOn) {
          this._events();
        }
      }
      return tooSmall;
    }

    /**
     * A noop version for the plugin
     * @private
     */

  }, {
    key: '_killswitch',
    value: function _killswitch() {
      return;
    }

    /**
     * Calls necessary functions to update Equalizer upon DOM change
     * @private
     */

  }, {
    key: '_reflow',
    value: function _reflow() {
      if (!this.options.equalizeOnStack) {
        if (this._isStacked()) {
          this.$watched.css('height', 'auto');
          return false;
        }
      }
      if (this.options.equalizeByRow) {
        this.getHeightsByRow(this.applyHeightByRow.bind(this));
      } else {
        this.getHeights(this.applyHeight.bind(this));
      }
    }

    /**
     * Manually determines if the first 2 elements are *NOT* stacked.
     * @private
     */

  }, {
    key: '_isStacked',
    value: function _isStacked() {
      if (!this.$watched[0] || !this.$watched[1]) {
        return true;
      }
      return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;
    }

    /**
     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
     * @param {Function} cb - A non-optional callback to return the heights array to.
     * @returns {Array} heights - An array of heights of children within Equalizer container
     */

  }, {
    key: 'getHeights',
    value: function getHeights(cb) {
      var heights = [];
      for (var i = 0, len = this.$watched.length; i < len; i++) {
        this.$watched[i].style.height = 'auto';
        heights.push(this.$watched[i].offsetHeight);
      }
      cb(heights);
    }

    /**
     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
     * @param {Function} cb - A non-optional callback to return the heights array to.
     * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
     */

  }, {
    key: 'getHeightsByRow',
    value: function getHeightsByRow(cb) {
      var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,
          groups = [],
          group = 0;
      //group by Row
      groups[group] = [];
      for (var i = 0, len = this.$watched.length; i < len; i++) {
        this.$watched[i].style.height = 'auto';
        //maybe could use this.$watched[i].offsetTop
        var elOffsetTop = (0, _jquery2.default)(this.$watched[i]).offset().top;
        if (elOffsetTop != lastElTopOffset) {
          group++;
          groups[group] = [];
          lastElTopOffset = elOffsetTop;
        }
        groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);
      }

      for (var j = 0, ln = groups.length; j < ln; j++) {
        var heights = (0, _jquery2.default)(groups[j]).map(function () {
          return this[1];
        }).get();
        var max = Math.max.apply(null, heights);
        groups[j].push(max);
      }
      cb(groups);
    }

    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest
     * @param {array} heights - An array of heights of children within Equalizer container
     * @fires Equalizer#preequalized
     * @fires Equalizer#postequalized
     */

  }, {
    key: 'applyHeight',
    value: function applyHeight(heights) {
      var max = Math.max.apply(null, heights);
      /**
       * Fires before the heights are applied
       * @event Equalizer#preequalized
       */
      this.$element.trigger('preequalized.zf.equalizer');

      this.$watched.css('height', max);

      /**
       * Fires when the heights have been applied
       * @event Equalizer#postequalized
       */
      this.$element.trigger('postequalized.zf.equalizer');
    }

    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
     * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
     * @fires Equalizer#preequalized
     * @fires Equalizer#preequalizedrow
     * @fires Equalizer#postequalizedrow
     * @fires Equalizer#postequalized
     */

  }, {
    key: 'applyHeightByRow',
    value: function applyHeightByRow(groups) {
      /**
       * Fires before the heights are applied
       */
      this.$element.trigger('preequalized.zf.equalizer');
      for (var i = 0, len = groups.length; i < len; i++) {
        var groupsILength = groups[i].length,
            max = groups[i][groupsILength - 1];
        if (groupsILength <= 2) {
          (0, _jquery2.default)(groups[i][0][0]).css({ 'height': 'auto' });
          continue;
        }
        /**
          * Fires before the heights per row are applied
          * @event Equalizer#preequalizedrow
          */
        this.$element.trigger('preequalizedrow.zf.equalizer');
        for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
          (0, _jquery2.default)(groups[i][j][0]).css({ 'height': max });
        }
        /**
          * Fires when the heights per row have been applied
          * @event Equalizer#postequalizedrow
          */
        this.$element.trigger('postequalizedrow.zf.equalizer');
      }
      /**
       * Fires when the heights have been applied
       */
      this.$element.trigger('postequalized.zf.equalizer');
    }

    /**
     * Destroys an instance of Equalizer.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this._pauseEvents();
      this.$watched.css('height', 'auto');
    }
  }]);

  return Equalizer;
}(_foundation.Plugin);

/**
 * Default settings for plugin
 */


Equalizer.defaults = {
  /**
   * Enable height equalization when stacked on smaller screens.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeOnStack: false,
  /**
   * Enable height equalization row by row.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeByRow: false,
  /**
   * String representing the minimum breakpoint size the plugin should equalize heights on.
   * @option
   * @type {string}
   * @default ''
   */
  equalizeOn: ''
};

exports.Equalizer = Equalizer;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Interchange = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(3);

var _foundation = __webpack_require__(2);

var _foundationUtil2 = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Interchange module.
 * @module foundation.interchange
 * @requires foundation.util.mediaQuery
 */

var Interchange = function (_Plugin) {
  _inherits(Interchange, _Plugin);

  function Interchange() {
    _classCallCheck(this, Interchange);

    return _possibleConstructorReturn(this, (Interchange.__proto__ || Object.getPrototypeOf(Interchange)).apply(this, arguments));
  }

  _createClass(Interchange, [{
    key: '_setup',

    /**
     * Creates a new instance of Interchange.
     * @class
     * @name Interchange
     * @fires Interchange#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Interchange.defaults, options);
      this.rules = [];
      this.currentPath = '';
      this.className = 'Interchange'; // ie9 back compat

      this._init();
      this._events();
    }

    /**
     * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
     * @function
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      _foundationUtil.MediaQuery._init();

      var id = this.$element[0].id || (0, _foundationUtil2.GetYoDigits)(6, 'interchange');
      this.$element.attr({
        'data-resize': id,
        'id': id
      });

      this._addBreakpoints();
      this._generateRules();
      this._reflow();
    }

    /**
     * Initializes events for Interchange.
     * @function
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this3 = this;

      this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function () {
        return _this3._reflow();
      });
    }

    /**
     * Calls necessary functions to update Interchange upon DOM change
     * @function
     * @private
     */

  }, {
    key: '_reflow',
    value: function _reflow() {
      var match;

      // Iterate through each rule, but only save the last match
      for (var i in this.rules) {
        if (this.rules.hasOwnProperty(i)) {
          var rule = this.rules[i];
          if (window.matchMedia(rule.query).matches) {
            match = rule;
          }
        }
      }

      if (match) {
        this.replace(match.path);
      }
    }

    /**
     * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
     * @function
     * @private
     */

  }, {
    key: '_addBreakpoints',
    value: function _addBreakpoints() {
      for (var i in _foundationUtil.MediaQuery.queries) {
        if (_foundationUtil.MediaQuery.queries.hasOwnProperty(i)) {
          var query = _foundationUtil.MediaQuery.queries[i];
          Interchange.SPECIAL_QUERIES[query.name] = query.value;
        }
      }
    }

    /**
     * Checks the Interchange element for the provided media query + content pairings
     * @function
     * @private
     * @param {Object} element - jQuery object that is an Interchange instance
     * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
     */

  }, {
    key: '_generateRules',
    value: function _generateRules(element) {
      var rulesList = [];
      var rules;

      if (this.options.rules) {
        rules = this.options.rules;
      } else {
        rules = this.$element.data('interchange');
      }

      rules = typeof rules === 'string' ? rules.match(/\[.*?\]/g) : rules;

      for (var i in rules) {
        if (rules.hasOwnProperty(i)) {
          var rule = rules[i].slice(1, -1).split(', ');
          var path = rule.slice(0, -1).join('');
          var query = rule[rule.length - 1];

          if (Interchange.SPECIAL_QUERIES[query]) {
            query = Interchange.SPECIAL_QUERIES[query];
          }

          rulesList.push({
            path: path,
            query: query
          });
        }
      }

      this.rules = rulesList;
    }

    /**
     * Update the `src` property of an image, or change the HTML of a container, to the specified path.
     * @function
     * @param {String} path - Path to the image or HTML partial.
     * @fires Interchange#replaced
     */

  }, {
    key: 'replace',
    value: function replace(path) {
      if (this.currentPath === path) return;

      var _this = this,
          trigger = 'replaced.zf.interchange';

      // Replacing images
      if (this.$element[0].nodeName === 'IMG') {
        this.$element.attr('src', path).on('load', function () {
          _this.currentPath = path;
        }).trigger(trigger);
      }
      // Replacing background images
      else if (path.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i)) {
          path = path.replace(/\(/g, '%28').replace(/\)/g, '%29');
          this.$element.css({ 'background-image': 'url(' + path + ')' }).trigger(trigger);
        }
        // Replacing HTML
        else {
            _jquery2.default.get(path, function (response) {
              _this.$element.html(response).trigger(trigger);
              (0, _jquery2.default)(response).foundation();
              _this.currentPath = path;
            });
          }

      /**
       * Fires when content in an Interchange element is done being loaded.
       * @event Interchange#replaced
       */
      // this.$element.trigger('replaced.zf.interchange');
    }

    /**
     * Destroys an instance of interchange.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.off('resizeme.zf.trigger');
    }
  }]);

  return Interchange;
}(_foundation.Plugin);

/**
 * Default settings for plugin
 */


Interchange.defaults = {
  /**
   * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.
   * @option
   * @type {?array}
   * @default null
   */
  rules: null
};

Interchange.SPECIAL_QUERIES = {
  'landscape': 'screen and (orientation: landscape)',
  'portrait': 'screen and (orientation: portrait)',
  'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'
};

exports.Interchange = Interchange;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Magellan = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

var _foundation = __webpack_require__(2);

var _foundation2 = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Magellan module.
 * @module foundation.magellan
 * @requires foundation.smoothScroll
 */

var Magellan = function (_Plugin) {
  _inherits(Magellan, _Plugin);

  function Magellan() {
    _classCallCheck(this, Magellan);

    return _possibleConstructorReturn(this, (Magellan.__proto__ || Object.getPrototypeOf(Magellan)).apply(this, arguments));
  }

  _createClass(Magellan, [{
    key: '_setup',

    /**
     * Creates a new instance of Magellan.
     * @class
     * @name Magellan
     * @fires Magellan#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Magellan.defaults, this.$element.data(), options);
      this.className = 'Magellan'; // ie9 back compat

      this._init();
      this.calcPoints();
    }

    /**
     * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var id = this.$element[0].id || (0, _foundationUtil.GetYoDigits)(6, 'magellan');
      var _this = this;
      this.$targets = (0, _jquery2.default)('[data-magellan-target]');
      this.$links = this.$element.find('a');
      this.$element.attr({
        'data-resize': id,
        'data-scroll': id,
        'id': id
      });
      this.$active = (0, _jquery2.default)();
      this.scrollPos = parseInt(window.pageYOffset, 10);

      this._events();
    }

    /**
     * Calculates an array of pixel values that are the demarcation lines between locations on the page.
     * Can be invoked if new elements are added or the size of a location changes.
     * @function
     */

  }, {
    key: 'calcPoints',
    value: function calcPoints() {
      var _this = this,
          body = document.body,
          html = document.documentElement;

      this.points = [];
      this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
      this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));

      this.$targets.each(function () {
        var $tar = (0, _jquery2.default)(this),
            pt = Math.round($tar.offset().top - _this.options.threshold);
        $tar.targetPoint = pt;
        _this.points.push(pt);
      });
    }

    /**
     * Initializes events for Magellan.
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this,
          $body = (0, _jquery2.default)('html, body'),
          opts = {
        duration: _this.options.animationDuration,
        easing: _this.options.animationEasing
      };
      (0, _jquery2.default)(window).one('load', function () {
        if (_this.options.deepLinking) {
          if (location.hash) {
            _this.scrollToLoc(location.hash);
          }
        }
        _this.calcPoints();
        _this._updateActive();
      });

      this.$element.on({
        'resizeme.zf.trigger': this.reflow.bind(this),
        'scrollme.zf.trigger': this._updateActive.bind(this)
      }).on('click.zf.magellan', 'a[href^="#"]', function (e) {
        e.preventDefault();
        var arrival = this.getAttribute('href');
        _this.scrollToLoc(arrival);
      });

      this._deepLinkScroll = function (e) {
        if (_this.options.deepLinking) {
          _this.scrollToLoc(window.location.hash);
        }
      };

      (0, _jquery2.default)(window).on('popstate', this._deepLinkScroll);
    }

    /**
     * Function to scroll to a given location on the page.
     * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
     * @function
     */

  }, {
    key: 'scrollToLoc',
    value: function scrollToLoc(loc) {
      this._inTransition = true;
      var _this = this;

      var options = {
        animationEasing: this.options.animationEasing,
        animationDuration: this.options.animationDuration,
        threshold: this.options.threshold,
        offset: this.options.offset
      };

      _foundation2.SmoothScroll.scrollToLoc(loc, options, function () {
        _this._inTransition = false;
        _this._updateActive();
      });
    }

    /**
     * Calls necessary functions to update Magellan upon DOM change
     * @function
     */

  }, {
    key: 'reflow',
    value: function reflow() {
      this.calcPoints();
      this._updateActive();
    }

    /**
     * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
     * @private
     * @function
     * @fires Magellan#update
     */

  }, {
    key: '_updateActive',
    value: function _updateActive() /*evt, elem, scrollPos*/{
      if (this._inTransition) {
        return;
      }
      var winPos = /*scrollPos ||*/parseInt(window.pageYOffset, 10),
          curIdx;

      if (winPos + this.winHeight === this.docHeight) {
        curIdx = this.points.length - 1;
      } else if (winPos < this.points[0]) {
        curIdx = undefined;
      } else {
        var isDown = this.scrollPos < winPos,
            _this = this,
            curVisible = this.points.filter(function (p, i) {
          return isDown ? p - _this.options.offset <= winPos : p - _this.options.offset - _this.options.threshold <= winPos;
        });
        curIdx = curVisible.length ? curVisible.length - 1 : 0;
      }

      this.$active.removeClass(this.options.activeClass);
      this.$active = this.$links.filter('[href="#' + this.$targets.eq(curIdx).data('magellan-target') + '"]').addClass(this.options.activeClass);

      if (this.options.deepLinking) {
        var hash = "";
        if (curIdx != undefined) {
          hash = this.$active[0].getAttribute('href');
        }
        if (hash !== window.location.hash) {
          if (window.history.pushState) {
            window.history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        }
      }

      this.scrollPos = winPos;
      /**
       * Fires when magellan is finished updating to the new active element.
       * @event Magellan#update
       */
      this.$element.trigger('update.zf.magellan', [this.$active]);
    }

    /**
     * Destroys an instance of Magellan and resets the url of the window.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.off('.zf.trigger .zf.magellan').find('.' + this.options.activeClass).removeClass(this.options.activeClass);

      if (this.options.deepLinking) {
        var hash = this.$active[0].getAttribute('href');
        window.location.hash.replace(hash, '');
      }
      (0, _jquery2.default)(window).off('popstate', this._deepLinkScroll);
    }
  }]);

  return Magellan;
}(_foundation.Plugin);

/**
 * Default settings for plugin
 */


Magellan.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: 'linear',
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,
  /**
   * Class applied to the active locations link on the magellan container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  activeClass: 'is-active',
  /**
   * Allows the script to manipulate the url of the current page, and if supported, alter the history.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinking: false,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
};

exports.Magellan = Magellan;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OffCanvas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(4);

var _foundationUtil2 = __webpack_require__(3);

var _foundationUtil3 = __webpack_require__(1);

var _foundation = __webpack_require__(2);

var _foundationUtil4 = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.keyboard
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

var OffCanvas = function (_Plugin) {
  _inherits(OffCanvas, _Plugin);

  function OffCanvas() {
    _classCallCheck(this, OffCanvas);

    return _possibleConstructorReturn(this, (OffCanvas.__proto__ || Object.getPrototypeOf(OffCanvas)).apply(this, arguments));
  }

  _createClass(OffCanvas, [{
    key: '_setup',

    /**
     * Creates a new instance of an off-canvas wrapper.
     * @class
     * @name OffCanvas
     * @fires OffCanvas#init
     * @param {Object} element - jQuery object to initialize.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      var _this3 = this;

      this.className = 'OffCanvas'; // ie9 back compat
      this.$element = element;
      this.options = _jquery2.default.extend({}, OffCanvas.defaults, this.$element.data(), options);
      this.contentClasses = { base: [], reveal: [] };
      this.$lastTrigger = (0, _jquery2.default)();
      this.$triggers = (0, _jquery2.default)();
      this.position = 'left';
      this.$content = (0, _jquery2.default)();
      this.nested = !!this.options.nested;

      // Defines the CSS transition/position classes of the off-canvas content container.
      (0, _jquery2.default)(['push', 'overlap']).each(function (index, val) {
        _this3.contentClasses.base.push('has-transition-' + val);
      });
      (0, _jquery2.default)(['left', 'right', 'top', 'bottom']).each(function (index, val) {
        _this3.contentClasses.base.push('has-position-' + val);
        _this3.contentClasses.reveal.push('has-reveal-' + val);
      });

      // Triggers init is idempotent, just need to make sure it is initialized
      _foundationUtil4.Triggers.init(_jquery2.default);
      _foundationUtil2.MediaQuery._init();

      this._init();
      this._events();

      _foundationUtil.Keyboard.register('OffCanvas', {
        'ESCAPE': 'close'
      });
    }

    /**
     * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
     * @function
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var id = this.$element.attr('id');

      this.$element.attr('aria-hidden', 'true');

      // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)
      if (this.options.contentId) {
        this.$content = (0, _jquery2.default)('#' + this.options.contentId);
      } else if (this.$element.siblings('[data-off-canvas-content]').length) {
        this.$content = this.$element.siblings('[data-off-canvas-content]').first();
      } else {
        this.$content = this.$element.closest('[data-off-canvas-content]').first();
      }

      if (!this.options.contentId) {
        // Assume that the off-canvas element is nested if it isn't a sibling of the content
        this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;
      } else if (this.options.contentId && this.options.nested === null) {
        // Warning if using content ID without setting the nested option
        // Once the element is nested it is required to work properly in this case
        console.warn('Remember to use the nested option if using the content ID option!');
      }

      if (this.nested === true) {
        // Force transition overlap if nested
        this.options.transition = 'overlap';
        // Remove appropriate classes if already assigned in markup
        this.$element.removeClass('is-transition-push');
      }

      this.$element.addClass('is-transition-' + this.options.transition + ' is-closed');

      // Find triggers that affect this element and add aria-expanded to them
      this.$triggers = (0, _jquery2.default)(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-expanded', 'false').attr('aria-controls', id);

      // Get position by checking for related CSS class
      this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\-(left|top|right|bottom)/)[1] : this.position;

      // Add an overlay over the content if necessary
      if (this.options.contentOverlay === true) {
        var overlay = document.createElement('div');
        var overlayPosition = (0, _jquery2.default)(this.$element).css("position") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';
        overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);
        this.$overlay = (0, _jquery2.default)(overlay);
        if (overlayPosition === 'is-overlay-fixed') {
          (0, _jquery2.default)(this.$overlay).insertAfter(this.$element);
        } else {
          this.$content.append(this.$overlay);
        }
      }

      this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, 'g').test(this.$element[0].className);

      if (this.options.isRevealed === true) {
        this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split('-')[2];
        this._setMQChecker();
      }

      if (this.options.transitionTime) {
        this.$element.css('transition-duration', this.options.transitionTime);
      }

      // Initally remove all transition/position CSS classes from off-canvas content container.
      this._removeContentClasses();
    }

    /**
     * Adds event handlers to the off-canvas wrapper and the exit overlay.
     * @function
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      this.$element.off('.zf.trigger .zf.offcanvas').on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': this.close.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this),
        'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
      });

      if (this.options.closeOnClick === true) {
        var $target = this.options.contentOverlay ? this.$overlay : this.$content;
        $target.on({ 'click.zf.offcanvas': this.close.bind(this) });
      }
    }

    /**
     * Applies event listener for elements that will reveal at certain breakpoints.
     * @private
     */

  }, {
    key: '_setMQChecker',
    value: function _setMQChecker() {
      var _this = this;

      (0, _jquery2.default)(window).on('changed.zf.mediaquery', function () {
        if (_foundationUtil2.MediaQuery.atLeast(_this.options.revealOn)) {
          _this.reveal(true);
        } else {
          _this.reveal(false);
        }
      }).one('load.zf.offcanvas', function () {
        if (_foundationUtil2.MediaQuery.atLeast(_this.options.revealOn)) {
          _this.reveal(true);
        }
      });
    }

    /**
     * Removes the CSS transition/position classes of the off-canvas content container.
     * Removing the classes is important when another off-canvas gets opened that uses the same content container.
     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
     * @private
     */

  }, {
    key: '_removeContentClasses',
    value: function _removeContentClasses(hasReveal) {
      if (typeof hasReveal !== 'boolean') {
        this.$content.removeClass(this.contentClasses.base.join(' '));
      } else if (hasReveal === false) {
        this.$content.removeClass('has-reveal-' + this.position);
      }
    }

    /**
     * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
     * Beforehand any transition/position class gets removed.
     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
     * @private
     */

  }, {
    key: '_addContentClasses',
    value: function _addContentClasses(hasReveal) {
      this._removeContentClasses(hasReveal);
      if (typeof hasReveal !== 'boolean') {
        this.$content.addClass('has-transition-' + this.options.transition + ' has-position-' + this.position);
      } else if (hasReveal === true) {
        this.$content.addClass('has-reveal-' + this.position);
      }
    }

    /**
     * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
     * @param {Boolean} isRevealed - true if element should be revealed.
     * @function
     */

  }, {
    key: 'reveal',
    value: function reveal(isRevealed) {
      if (isRevealed) {
        this.close();
        this.isRevealed = true;
        this.$element.attr('aria-hidden', 'false');
        this.$element.off('open.zf.trigger toggle.zf.trigger');
        this.$element.removeClass('is-closed');
      } else {
        this.isRevealed = false;
        this.$element.attr('aria-hidden', 'true');
        this.$element.off('open.zf.trigger toggle.zf.trigger').on({
          'open.zf.trigger': this.open.bind(this),
          'toggle.zf.trigger': this.toggle.bind(this)
        });
        this.$element.addClass('is-closed');
      }
      this._addContentClasses(isRevealed);
    }

    /**
     * Stops scrolling of the body when offcanvas is open on mobile Safari and other troublesome browsers.
     * @private
     */

  }, {
    key: '_stopScrolling',
    value: function _stopScrolling(event) {
      return false;
    }

    // Taken and adapted from http://stackoverflow.com/questions/16889447/prevent-full-page-scrolling-ios
    // Only really works for y, not sure how to extend to x or if we need to.

  }, {
    key: '_recordScrollable',
    value: function _recordScrollable(event) {
      var elem = this; // called from event handler context with this as elem

      // If the element is scrollable (content overflows), then...
      if (elem.scrollHeight !== elem.clientHeight) {
        // If we're at the top, scroll down one pixel to allow scrolling up
        if (elem.scrollTop === 0) {
          elem.scrollTop = 1;
        }
        // If we're at the bottom, scroll up one pixel to allow scrolling down
        if (elem.scrollTop === elem.scrollHeight - elem.clientHeight) {
          elem.scrollTop = elem.scrollHeight - elem.clientHeight - 1;
        }
      }
      elem.allowUp = elem.scrollTop > 0;
      elem.allowDown = elem.scrollTop < elem.scrollHeight - elem.clientHeight;
      elem.lastY = event.originalEvent.pageY;
    }
  }, {
    key: '_stopScrollPropagation',
    value: function _stopScrollPropagation(event) {
      var elem = this; // called from event handler context with this as elem
      var up = event.pageY < elem.lastY;
      var down = !up;
      elem.lastY = event.pageY;

      if (up && elem.allowUp || down && elem.allowDown) {
        event.stopPropagation();
      } else {
        event.preventDefault();
      }
    }

    /**
     * Opens the off-canvas menu.
     * @function
     * @param {Object} event - Event object passed from listener.
     * @param {jQuery} trigger - element that triggered the off-canvas to open.
     * @fires OffCanvas#opened
     */

  }, {
    key: 'open',
    value: function open(event, trigger) {
      if (this.$element.hasClass('is-open') || this.isRevealed) {
        return;
      }
      var _this = this;

      if (trigger) {
        this.$lastTrigger = trigger;
      }

      if (this.options.forceTo === 'top') {
        window.scrollTo(0, 0);
      } else if (this.options.forceTo === 'bottom') {
        window.scrollTo(0, document.body.scrollHeight);
      }

      if (this.options.transitionTime && this.options.transition !== 'overlap') {
        this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);
      } else {
        this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');
      }

      /**
       * Fires when the off-canvas menu opens.
       * @event OffCanvas#opened
       */
      this.$element.addClass('is-open').removeClass('is-closed');

      this.$triggers.attr('aria-expanded', 'true');
      this.$element.attr('aria-hidden', 'false').trigger('opened.zf.offcanvas');

      this.$content.addClass('is-open-' + this.position);

      // If `contentScroll` is set to false, add class and disable scrolling on touch devices.
      if (this.options.contentScroll === false) {
        (0, _jquery2.default)('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);
        this.$element.on('touchstart', this._recordScrollable);
        this.$element.on('touchmove', this._stopScrollPropagation);
      }

      if (this.options.contentOverlay === true) {
        this.$overlay.addClass('is-visible');
      }

      if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
        this.$overlay.addClass('is-closable');
      }

      if (this.options.autoFocus === true) {
        this.$element.one((0, _foundationUtil3.transitionend)(this.$element), function () {
          if (!_this.$element.hasClass('is-open')) {
            return; // exit if prematurely closed
          }
          var canvasFocus = _this.$element.find('[data-autofocus]');
          if (canvasFocus.length) {
            canvasFocus.eq(0).focus();
          } else {
            _this.$element.find('a, button').eq(0).focus();
          }
        });
      }

      if (this.options.trapFocus === true) {
        this.$content.attr('tabindex', '-1');
        _foundationUtil.Keyboard.trapFocus(this.$element);
      }

      this._addContentClasses();
    }

    /**
     * Closes the off-canvas menu.
     * @function
     * @param {Function} cb - optional cb to fire after closure.
     * @fires OffCanvas#closed
     */

  }, {
    key: 'close',
    value: function close(cb) {
      if (!this.$element.hasClass('is-open') || this.isRevealed) {
        return;
      }

      var _this = this;

      this.$element.removeClass('is-open');

      this.$element.attr('aria-hidden', 'true')
      /**
       * Fires when the off-canvas menu opens.
       * @event OffCanvas#closed
       */
      .trigger('closed.zf.offcanvas');

      this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom');

      // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.
      if (this.options.contentScroll === false) {
        (0, _jquery2.default)('body').removeClass('is-off-canvas-open').off('touchmove', this._stopScrolling);
        this.$element.off('touchstart', this._recordScrollable);
        this.$element.off('touchmove', this._stopScrollPropagation);
      }

      if (this.options.contentOverlay === true) {
        this.$overlay.removeClass('is-visible');
      }

      if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
        this.$overlay.removeClass('is-closable');
      }

      this.$triggers.attr('aria-expanded', 'false');

      if (this.options.trapFocus === true) {
        this.$content.removeAttr('tabindex');
        _foundationUtil.Keyboard.releaseFocus(this.$element);
      }

      // Listen to transitionEnd and add class when done.
      this.$element.one((0, _foundationUtil3.transitionend)(this.$element), function (e) {
        _this.$element.addClass('is-closed');
        _this._removeContentClasses();
      });
    }

    /**
     * Toggles the off-canvas menu open or closed.
     * @function
     * @param {Object} event - Event object passed from listener.
     * @param {jQuery} trigger - element that triggered the off-canvas to open.
     */

  }, {
    key: 'toggle',
    value: function toggle(event, trigger) {
      if (this.$element.hasClass('is-open')) {
        this.close(event, trigger);
      } else {
        this.open(event, trigger);
      }
    }

    /**
     * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
     * @function
     * @private
     */

  }, {
    key: '_handleKeyboard',
    value: function _handleKeyboard(e) {
      var _this4 = this;

      _foundationUtil.Keyboard.handleKey(e, 'OffCanvas', {
        close: function close() {
          _this4.close();
          _this4.$lastTrigger.focus();
          return true;
        },
        handled: function handled() {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    }

    /**
     * Destroys the offcanvas plugin.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.close();
      this.$element.off('.zf.trigger .zf.offcanvas');
      this.$overlay.off('.zf.offcanvas');
    }
  }]);

  return OffCanvas;
}(_foundation.Plugin);

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,

  /**
   * Adds an overlay on top of `[data-off-canvas-content]`.
   * @option
   * @type {boolean}
   * @default true
   */
  contentOverlay: true,

  /**
   * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
   * @option
   * @type {?string}
   * @default null
   */
  contentId: null,

  /**
   * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
   * @option
   * @type {boolean}
   * @default null
   */
  nested: null,

  /**
   * Enable/disable scrolling of the main content when an off canvas panel is open.
   * @option
   * @type {boolean}
   * @default true
   */
  contentScroll: true,

  /**
   * Amount of time in ms the open and close transition requires. If none selected, pulls from body style.
   * @option
   * @type {number}
   * @default null
   */
  transitionTime: null,

  /**
   * Type of transition for the offcanvas menu. Options are 'push', 'detached' or 'slide'.
   * @option
   * @type {string}
   * @default push
   */
  transition: 'push',

  /**
   * Force the page to scroll to top or bottom on open.
   * @option
   * @type {?string}
   * @default null
   */
  forceTo: null,

  /**
   * Allow the offcanvas to remain open for certain breakpoints.
   * @option
   * @type {boolean}
   * @default false
   */
  isRevealed: false,

  /**
   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
   * @option
   * @type {?string}
   * @default null
   */
  revealOn: null,

  /**
   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
   * @option
   * @type {boolean}
   * @default true
   */
  autoFocus: true,

  /**
   * Class used to force an offcanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
   * @option
   * @type {string}
   * @default reveal-for-
   * @todo improve the regex testing for this.
   */
  revealClass: 'reveal-for-',

  /**
   * Triggers optional focus trapping when opening an offcanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false
};

exports.OffCanvas = OffCanvas;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(3);

var _foundationUtil2 = __webpack_require__(1);

var _foundation = __webpack_require__(2);

var _foundation2 = __webpack_require__(11);

var _foundation3 = __webpack_require__(30);

var _foundation4 = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuPlugins = {
  dropdown: {
    cssClass: 'dropdown',
    plugin: _foundation2.DropdownMenu
  },
  drilldown: {
    cssClass: 'drilldown',
    plugin: _foundation3.Drilldown
  },
  accordion: {
    cssClass: 'accordion-menu',
    plugin: _foundation4.AccordionMenu
  }
};

// import "foundation.util.triggers.js";


/**
 * ResponsiveMenu module.
 * @module foundation.responsiveMenu
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */

var ResponsiveMenu = function (_Plugin) {
  _inherits(ResponsiveMenu, _Plugin);

  function ResponsiveMenu() {
    _classCallCheck(this, ResponsiveMenu);

    return _possibleConstructorReturn(this, (ResponsiveMenu.__proto__ || Object.getPrototypeOf(ResponsiveMenu)).apply(this, arguments));
  }

  _createClass(ResponsiveMenu, [{
    key: '_setup',

    /**
     * Creates a new instance of a responsive menu.
     * @class
     * @name ResponsiveMenu
     * @fires ResponsiveMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = (0, _jquery2.default)(element);
      this.rules = this.$element.data('responsive-menu');
      this.currentMq = null;
      this.currentPlugin = null;
      this.className = 'ResponsiveMenu'; // ie9 back compat

      this._init();
      this._events();
    }

    /**
     * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
     * @function
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {

      _foundationUtil.MediaQuery._init();
      // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
      if (typeof this.rules === 'string') {
        var rulesTree = {};

        // Parse rules from "classes" pulled from data attribute
        var rules = this.rules.split(' ');

        // Iterate through every rule found
        for (var i = 0; i < rules.length; i++) {
          var rule = rules[i].split('-');
          var ruleSize = rule.length > 1 ? rule[0] : 'small';
          var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

          if (MenuPlugins[rulePlugin] !== null) {
            rulesTree[ruleSize] = MenuPlugins[rulePlugin];
          }
        }

        this.rules = rulesTree;
      }

      if (!_jquery2.default.isEmptyObject(this.rules)) {
        this._checkMediaQueries();
      }
      // Add data-mutate since children may need it.
      this.$element.attr('data-mutate', this.$element.attr('data-mutate') || (0, _foundationUtil2.GetYoDigits)(6, 'responsive-menu'));
    }

    /**
     * Initializes events for the Menu.
     * @function
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this;

      (0, _jquery2.default)(window).on('changed.zf.mediaquery', function () {
        _this._checkMediaQueries();
      });
      // $(window).on('resize.zf.ResponsiveMenu', function() {
      //   _this._checkMediaQueries();
      // });
    }

    /**
     * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
     * @function
     * @private
     */

  }, {
    key: '_checkMediaQueries',
    value: function _checkMediaQueries() {
      var matchedMq,
          _this = this;
      // Iterate through each rule and find the last matching rule
      _jquery2.default.each(this.rules, function (key) {
        if (_foundationUtil.MediaQuery.atLeast(key)) {
          matchedMq = key;
        }
      });

      // No match? No dice
      if (!matchedMq) return;

      // Plugin already initialized? We good
      if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;

      // Remove existing plugin-specific CSS classes
      _jquery2.default.each(MenuPlugins, function (key, value) {
        _this.$element.removeClass(value.cssClass);
      });

      // Add the CSS class for the new plugin
      this.$element.addClass(this.rules[matchedMq].cssClass);

      // Create an instance of the new plugin
      if (this.currentPlugin) this.currentPlugin.destroy();
      this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
    }

    /**
     * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.currentPlugin.destroy();
      (0, _jquery2.default)(window).off('.zf.ResponsiveMenu');
    }
  }]);

  return ResponsiveMenu;
}(_foundation.Plugin);

ResponsiveMenu.defaults = {};

exports.ResponsiveMenu = ResponsiveMenu;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drilldown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(4);

var _foundationUtil2 = __webpack_require__(8);

var _foundationUtil3 = __webpack_require__(1);

var _foundationUtil4 = __webpack_require__(7);

var _foundation = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 * @requires foundation.util.box
 */

var Drilldown = function (_Plugin) {
  _inherits(Drilldown, _Plugin);

  function Drilldown() {
    _classCallCheck(this, Drilldown);

    return _possibleConstructorReturn(this, (Drilldown.__proto__ || Object.getPrototypeOf(Drilldown)).apply(this, arguments));
  }

  _createClass(Drilldown, [{
    key: '_setup',

    /**
     * Creates a new instance of a drilldown menu.
     * @class
     * @name Drilldown
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Drilldown.defaults, this.$element.data(), options);
      this.className = 'Drilldown'; // ie9 back compat

      this._init();

      _foundationUtil.Keyboard.register('Drilldown', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close',
        'TAB': 'down',
        'SHIFT_TAB': 'up'
      });
    }

    /**
     * Initializes the drilldown by creating jQuery collections of elements
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      _foundationUtil2.Nest.Feather(this.$element, 'drilldown');

      if (this.options.autoApplyClass) {
        this.$element.addClass('drilldown');
      }

      this.$element.attr({
        'role': 'tree',
        'aria-multiselectable': false
      });
      this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
      this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]').attr('role', 'group');
      this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'treeitem').find('a');
      this.$element.attr('data-mutate', this.$element.attr('data-drilldown') || (0, _foundationUtil3.GetYoDigits)(6, 'drilldown'));

      this._prepareMenu();
      this._registerEvents();

      this._keyboardEvents();
    }

    /**
     * prepares drilldown menu by setting attributes to links and elements
     * sets a min height to prevent content jumping
     * wraps the element if not already wrapped
     * @private
     * @function
     */

  }, {
    key: '_prepareMenu',
    value: function _prepareMenu() {
      var _this = this;
      // if(!this.options.holdOpen){
      //   this._menuLinkEvents();
      // }
      this.$submenuAnchors.each(function () {
        var $link = (0, _jquery2.default)(this);
        var $sub = $link.parent();
        if (_this.options.parentLink) {
          $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menuitem"></li>');
        }
        $link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);
        $link.children('[data-submenu]').attr({
          'aria-hidden': true,
          'tabindex': 0,
          'role': 'group'
        });
        _this._events($link);
      });
      this.$submenus.each(function () {
        var $menu = (0, _jquery2.default)(this),
            $back = $menu.find('.js-drilldown-back');
        if (!$back.length) {
          switch (_this.options.backButtonPosition) {
            case "bottom":
              $menu.append(_this.options.backButton);
              break;
            case "top":
              $menu.prepend(_this.options.backButton);
              break;
            default:
              console.error("Unsupported backButtonPosition value '" + _this.options.backButtonPosition + "'");
          }
        }
        _this._back($menu);
      });

      this.$submenus.addClass('invisible');
      if (!this.options.autoHeight) {
        this.$submenus.addClass('drilldown-submenu-cover-previous');
      }

      // create a wrapper on element if it doesn't exist.
      if (!this.$element.parent().hasClass('is-drilldown')) {
        this.$wrapper = (0, _jquery2.default)(this.options.wrapper).addClass('is-drilldown');
        if (this.options.animateHeight) this.$wrapper.addClass('animate-height');
        this.$element.wrap(this.$wrapper);
      }
      // set wrapper
      this.$wrapper = this.$element.parent();
      this.$wrapper.css(this._getMaxDims());
    }
  }, {
    key: '_resize',
    value: function _resize() {
      this.$wrapper.css({ 'max-width': 'none', 'min-height': 'none' });
      // _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths
      this.$wrapper.css(this._getMaxDims());
    }

    /**
     * Adds event handlers to elements in the menu.
     * @function
     * @private
     * @param {jQuery} $elem - the current menu item to add handlers to.
     */

  }, {
    key: '_events',
    value: function _events($elem) {
      var _this = this;

      $elem.off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
        if ((0, _jquery2.default)(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')) {
          e.stopImmediatePropagation();
          e.preventDefault();
        }

        // if(e.target !== e.currentTarget.firstElementChild){
        //   return false;
        // }
        _this._show($elem.parent('li'));

        if (_this.options.closeOnClick) {
          var $body = (0, _jquery2.default)('body');
          $body.off('.zf.drilldown').on('click.zf.drilldown', function (e) {
            if (e.target === _this.$element[0] || _jquery2.default.contains(_this.$element[0], e.target)) {
              return;
            }
            e.preventDefault();
            _this._hideAll();
            $body.off('.zf.drilldown');
          });
        }
      });
    }

    /**
     * Adds event handlers to the menu element.
     * @function
     * @private
     */

  }, {
    key: '_registerEvents',
    value: function _registerEvents() {
      if (this.options.scrollTop) {
        this._bindHandler = this._scrollTop.bind(this);
        this.$element.on('open.zf.drilldown hide.zf.drilldown closed.zf.drilldown', this._bindHandler);
      }
      this.$element.on('mutateme.zf.trigger', this._resize.bind(this));
    }

    /**
     * Scroll to Top of Element or data-scroll-top-element
     * @function
     * @fires Drilldown#scrollme
     */

  }, {
    key: '_scrollTop',
    value: function _scrollTop() {
      var _this = this;
      var $scrollTopElement = _this.options.scrollTopElement != '' ? (0, _jquery2.default)(_this.options.scrollTopElement) : _this.$element,
          scrollPos = parseInt($scrollTopElement.offset().top + _this.options.scrollTopOffset, 10);
      (0, _jquery2.default)('html, body').stop(true).animate({ scrollTop: scrollPos }, _this.options.animationDuration, _this.options.animationEasing, function () {
        /**
          * Fires after the menu has scrolled
          * @event Drilldown#scrollme
          */
        if (this === (0, _jquery2.default)('html')[0]) _this.$element.trigger('scrollme.zf.drilldown');
      });
    }

    /**
     * Adds keydown event listener to `li`'s in the menu.
     * @private
     */

  }, {
    key: '_keyboardEvents',
    value: function _keyboardEvents() {
      var _this = this;

      this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function (e) {
        var $element = (0, _jquery2.default)(this),
            $elements = $element.parent('li').parent('ul').children('li').children('a'),
            $prevElement,
            $nextElement;

        $elements.each(function (i) {
          if ((0, _jquery2.default)(this).is($element)) {
            $prevElement = $elements.eq(Math.max(0, i - 1));
            $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
            return;
          }
        });

        _foundationUtil.Keyboard.handleKey(e, 'Drilldown', {
          next: function next() {
            if ($element.is(_this.$submenuAnchors)) {
              _this._show($element.parent('li'));
              $element.parent('li').one((0, _foundationUtil3.transitionend)($element), function () {
                $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
              });
              return true;
            }
          },
          previous: function previous() {
            _this._hide($element.parent('li').parent('ul'));
            $element.parent('li').parent('ul').one((0, _foundationUtil3.transitionend)($element), function () {
              setTimeout(function () {
                $element.parent('li').parent('ul').parent('li').children('a').first().focus();
              }, 1);
            });
            return true;
          },
          up: function up() {
            $prevElement.focus();
            // Don't tap focus on first element in root ul
            return !$element.is(_this.$element.find('> li:first-child > a'));
          },
          down: function down() {
            $nextElement.focus();
            // Don't tap focus on last element in root ul
            return !$element.is(_this.$element.find('> li:last-child > a'));
          },
          close: function close() {
            // Don't close on element in root ul
            if (!$element.is(_this.$element.find('> li > a'))) {
              _this._hide($element.parent().parent());
              $element.parent().parent().siblings('a').focus();
            }
          },
          open: function open() {
            if (!$element.is(_this.$menuItems)) {
              // not menu item means back button
              _this._hide($element.parent('li').parent('ul'));
              $element.parent('li').parent('ul').one((0, _foundationUtil3.transitionend)($element), function () {
                setTimeout(function () {
                  $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                }, 1);
              });
              return true;
            } else if ($element.is(_this.$submenuAnchors)) {
              _this._show($element.parent('li'));
              $element.parent('li').one((0, _foundationUtil3.transitionend)($element), function () {
                $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
              });
              return true;
            }
          },
          handled: function handled(preventDefault) {
            if (preventDefault) {
              e.preventDefault();
            }
            e.stopImmediatePropagation();
          }
        });
      }); // end keyboardAccess
    }

    /**
     * Closes all open elements, and returns to root menu.
     * @function
     * @fires Drilldown#closed
     */

  }, {
    key: '_hideAll',
    value: function _hideAll() {
      var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
      if (this.options.autoHeight) this.$wrapper.css({ height: $elem.parent().closest('ul').data('calcHeight') });
      $elem.one((0, _foundationUtil3.transitionend)($elem), function (e) {
        $elem.removeClass('is-active is-closing');
      });
      /**
       * Fires when the menu is fully closed.
       * @event Drilldown#closed
       */
      this.$element.trigger('closed.zf.drilldown');
    }

    /**
     * Adds event listener for each `back` button, and closes open menus.
     * @function
     * @fires Drilldown#back
     * @param {jQuery} $elem - the current sub-menu to add `back` event.
     */

  }, {
    key: '_back',
    value: function _back($elem) {
      var _this = this;
      $elem.off('click.zf.drilldown');
      $elem.children('.js-drilldown-back').on('click.zf.drilldown', function (e) {
        e.stopImmediatePropagation();
        // console.log('mouseup on back');
        _this._hide($elem);

        // If there is a parent submenu, call show
        var parentSubMenu = $elem.parent('li').parent('ul').parent('li');
        if (parentSubMenu.length) {
          _this._show(parentSubMenu);
        }
      });
    }

    /**
     * Adds event listener to menu items w/o submenus to close open menus on click.
     * @function
     * @private
     */

  }, {
    key: '_menuLinkEvents',
    value: function _menuLinkEvents() {
      var _this = this;
      this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
        // e.stopImmediatePropagation();
        setTimeout(function () {
          _this._hideAll();
        }, 0);
      });
    }

    /**
     * Opens a submenu.
     * @function
     * @fires Drilldown#open
     * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
     */

  }, {
    key: '_show',
    value: function _show($elem) {
      if (this.options.autoHeight) this.$wrapper.css({ height: $elem.children('[data-submenu]').data('calcHeight') });
      $elem.attr('aria-expanded', true);
      $elem.children('[data-submenu]').addClass('is-active').removeClass('invisible').attr('aria-hidden', false);
      /**
       * Fires when the submenu has opened.
       * @event Drilldown#open
       */
      this.$element.trigger('open.zf.drilldown', [$elem]);
    }
  }, {
    key: '_hide',


    /**
     * Hides a submenu
     * @function
     * @fires Drilldown#hide
     * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
     */
    value: function _hide($elem) {
      if (this.options.autoHeight) this.$wrapper.css({ height: $elem.parent().closest('ul').data('calcHeight') });
      var _this = this;
      $elem.parent('li').attr('aria-expanded', false);
      $elem.attr('aria-hidden', true).addClass('is-closing');
      $elem.addClass('is-closing').one((0, _foundationUtil3.transitionend)($elem), function () {
        $elem.removeClass('is-active is-closing');
        $elem.blur().addClass('invisible');
      });
      /**
       * Fires when the submenu has closed.
       * @event Drilldown#hide
       */
      $elem.trigger('hide.zf.drilldown', [$elem]);
    }

    /**
     * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
     * Prevents content jumping.
     * @function
     * @private
     */

  }, {
    key: '_getMaxDims',
    value: function _getMaxDims() {
      var maxHeight = 0,
          result = {},
          _this = this;
      this.$submenus.add(this.$element).each(function () {
        var numOfElems = (0, _jquery2.default)(this).children('li').length;
        var height = _foundationUtil4.Box.GetDimensions(this).height;
        maxHeight = height > maxHeight ? height : maxHeight;
        if (_this.options.autoHeight) {
          (0, _jquery2.default)(this).data('calcHeight', height);
          if (!(0, _jquery2.default)(this).hasClass('is-drilldown-submenu')) result['height'] = height;
        }
      });

      if (!this.options.autoHeight) result['min-height'] = maxHeight + 'px';

      result['max-width'] = this.$element[0].getBoundingClientRect().width + 'px';

      return result;
    }

    /**
     * Destroys the Drilldown Menu
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      if (this.options.scrollTop) this.$element.off('.zf.drilldown', this._bindHandler);
      this._hideAll();
      this.$element.off('mutateme.zf.trigger');
      _foundationUtil2.Nest.Burn(this.$element, 'drilldown');
      this.$element.unwrap().find('.js-drilldown-back, .is-submenu-parent-item').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
      this.$submenuAnchors.each(function () {
        (0, _jquery2.default)(this).off('.zf.drilldown');
      });

      this.$submenus.removeClass('drilldown-submenu-cover-previous invisible');

      this.$element.find('a').each(function () {
        var $link = (0, _jquery2.default)(this);
        $link.removeAttr('tabindex');
        if ($link.data('savedHref')) {
          $link.attr('href', $link.data('savedHref')).removeData('savedHref');
        } else {
          return;
        }
      });
    }
  }]);

  return Drilldown;
}(_foundation.Plugin);

Drilldown.defaults = {
  /**
   * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are
   * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.
   * @option
   * @type {boolian}
   * @default true
   */
  autoApplyClass: true,
  /**
   * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
   */
  backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
  /**
   * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
   * @option
   * @type {string}
   * @default top
   */
  backButtonPosition: 'top',
  /**
   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<div></div>'
   */
  wrapper: '<div></div>',
  /**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
  parentLink: false,
  /**
   * Allow the menu to return to root list on body click.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false,
  /**
   * Allow the menu to auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  autoHeight: false,
  /**
   * Animate the auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  animateHeight: false,
  /**
   * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
   * @option
   * @type {boolean}
   * @default false
   */
  scrollTop: false,
  /**
   * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
   * @option
   * @type {string}
   * @default ''
   */
  scrollTopElement: '',
  /**
   * ScrollTop offset
   * @option
   * @type {number}
   * @default 0
   */
  scrollTopOffset: 0,
  /**
   * Scroll animation duration
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Scroll animation easing. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @see {@link https://api.jquery.com/animate|JQuery animate}
   * @default 'swing'
   */
  animationEasing: 'swing'
  // holdOpen: false
};

exports.Drilldown = Drilldown;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveToggle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(3);

var _foundationUtil2 = __webpack_require__(6);

var _foundation = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ResponsiveToggle module.
 * @module foundation.responsiveToggle
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion
 */

var ResponsiveToggle = function (_Plugin) {
  _inherits(ResponsiveToggle, _Plugin);

  function ResponsiveToggle() {
    _classCallCheck(this, ResponsiveToggle);

    return _possibleConstructorReturn(this, (ResponsiveToggle.__proto__ || Object.getPrototypeOf(ResponsiveToggle)).apply(this, arguments));
  }

  _createClass(ResponsiveToggle, [{
    key: '_setup',

    /**
     * Creates a new instance of Tab Bar.
     * @class
     * @name ResponsiveToggle
     * @fires ResponsiveToggle#init
     * @param {jQuery} element - jQuery object to attach tab bar functionality to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = (0, _jquery2.default)(element);
      this.options = _jquery2.default.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);
      this.className = 'ResponsiveToggle'; // ie9 back compat

      this._init();
      this._events();
    }

    /**
     * Initializes the tab bar by finding the target element, toggling element, and running update().
     * @function
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      _foundationUtil.MediaQuery._init();
      var targetID = this.$element.data('responsive-toggle');
      if (!targetID) {
        console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
      }

      this.$targetMenu = (0, _jquery2.default)('#' + targetID);
      this.$toggler = this.$element.find('[data-toggle]').filter(function () {
        var target = (0, _jquery2.default)(this).data('toggle');
        return target === targetID || target === "";
      });
      this.options = _jquery2.default.extend({}, this.options, this.$targetMenu.data());

      // If they were set, parse the animation classes
      if (this.options.animate) {
        var input = this.options.animate.split(' ');

        this.animationIn = input[0];
        this.animationOut = input[1] || null;
      }

      this._update();
    }

    /**
     * Adds necessary event handlers for the tab bar to work.
     * @function
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this;

      this._updateMqHandler = this._update.bind(this);

      (0, _jquery2.default)(window).on('changed.zf.mediaquery', this._updateMqHandler);

      this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));
    }

    /**
     * Checks the current media query to determine if the tab bar should be visible or hidden.
     * @function
     * @private
     */

  }, {
    key: '_update',
    value: function _update() {
      // Mobile
      if (!_foundationUtil.MediaQuery.atLeast(this.options.hideFor)) {
        this.$element.show();
        this.$targetMenu.hide();
      }

      // Desktop
      else {
          this.$element.hide();
          this.$targetMenu.show();
        }
    }

    /**
     * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
     * @function
     * @fires ResponsiveToggle#toggled
     */

  }, {
    key: 'toggleMenu',
    value: function toggleMenu() {
      var _this3 = this;

      if (!_foundationUtil.MediaQuery.atLeast(this.options.hideFor)) {
        /**
         * Fires when the element attached to the tab bar toggles.
         * @event ResponsiveToggle#toggled
         */
        if (this.options.animate) {
          if (this.$targetMenu.is(':hidden')) {
            _foundationUtil2.Motion.animateIn(this.$targetMenu, this.animationIn, function () {
              _this3.$element.trigger('toggled.zf.responsiveToggle');
              _this3.$targetMenu.find('[data-mutate]').triggerHandler('mutateme.zf.trigger');
            });
          } else {
            _foundationUtil2.Motion.animateOut(this.$targetMenu, this.animationOut, function () {
              _this3.$element.trigger('toggled.zf.responsiveToggle');
            });
          }
        } else {
          this.$targetMenu.toggle(0);
          this.$targetMenu.find('[data-mutate]').trigger('mutateme.zf.trigger');
          this.$element.trigger('toggled.zf.responsiveToggle');
        }
      }
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.off('.zf.responsiveToggle');
      this.$toggler.off('.zf.responsiveToggle');

      (0, _jquery2.default)(window).off('changed.zf.mediaquery', this._updateMqHandler);
    }
  }]);

  return ResponsiveToggle;
}(_foundation.Plugin);

ResponsiveToggle.defaults = {
  /**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @type {string}
   * @default 'medium'
   */
  hideFor: 'medium',

  /**
   * To decide if the toggle should be animated or not.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};

exports.ResponsiveToggle = ResponsiveToggle;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reveal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(4);

var _foundationUtil2 = __webpack_require__(3);

var _foundationUtil3 = __webpack_require__(6);

var _foundation = __webpack_require__(2);

var _foundationUtil4 = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Reveal module.
 * @module foundation.reveal
 * @requires foundation.util.keyboard
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion if using animations
 */

var Reveal = function (_Plugin) {
  _inherits(Reveal, _Plugin);

  function Reveal() {
    _classCallCheck(this, Reveal);

    return _possibleConstructorReturn(this, (Reveal.__proto__ || Object.getPrototypeOf(Reveal)).apply(this, arguments));
  }

  _createClass(Reveal, [{
    key: '_setup',

    /**
     * Creates a new instance of Reveal.
     * @class
     * @name Reveal
     * @param {jQuery} element - jQuery object to use for the modal.
     * @param {Object} options - optional parameters.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Reveal.defaults, this.$element.data(), options);
      this.className = 'Reveal'; // ie9 back compat
      this._init();

      // Triggers init is idempotent, just need to make sure it is initialized
      _foundationUtil4.Triggers.init(_jquery2.default);

      _foundationUtil.Keyboard.register('Reveal', {
        'ESCAPE': 'close'
      });
    }

    /**
     * Initializes the modal by adding the overlay and close buttons, (if selected).
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      _foundationUtil2.MediaQuery._init();
      this.id = this.$element.attr('id');
      this.isActive = false;
      this.cached = { mq: _foundationUtil2.MediaQuery.current };
      this.isMobile = mobileSniff();

      this.$anchor = (0, _jquery2.default)('[data-open="' + this.id + '"]').length ? (0, _jquery2.default)('[data-open="' + this.id + '"]') : (0, _jquery2.default)('[data-toggle="' + this.id + '"]');
      this.$anchor.attr({
        'aria-controls': this.id,
        'aria-haspopup': true,
        'tabindex': 0
      });

      if (this.options.fullScreen || this.$element.hasClass('full')) {
        this.options.fullScreen = true;
        this.options.overlay = false;
      }
      if (this.options.overlay && !this.$overlay) {
        this.$overlay = this._makeOverlay(this.id);
      }

      this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'data-yeti-box': this.id,
        'data-resize': this.id
      });

      if (this.$overlay) {
        this.$element.detach().appendTo(this.$overlay);
      } else {
        this.$element.detach().appendTo((0, _jquery2.default)(this.options.appendTo));
        this.$element.addClass('without-overlay');
      }
      this._events();
      if (this.options.deepLink && window.location.hash === '#' + this.id) {
        (0, _jquery2.default)(window).one('load.zf.reveal', this.open.bind(this));
      }
    }

    /**
     * Creates an overlay div to display behind the modal.
     * @private
     */

  }, {
    key: '_makeOverlay',
    value: function _makeOverlay() {
      var additionalOverlayClasses = '';

      if (this.options.additionalOverlayClasses) {
        additionalOverlayClasses = ' ' + this.options.additionalOverlayClasses;
      }

      return (0, _jquery2.default)('<div></div>').addClass('reveal-overlay' + additionalOverlayClasses).appendTo(this.options.appendTo);
    }

    /**
     * Updates position of modal
     * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
     * @private
     */

  }, {
    key: '_updatePosition',
    value: function _updatePosition() {
      var width = this.$element.outerWidth();
      var outerWidth = (0, _jquery2.default)(window).width();
      var height = this.$element.outerHeight();
      var outerHeight = (0, _jquery2.default)(window).height();
      var left, top;
      if (this.options.hOffset === 'auto') {
        left = parseInt((outerWidth - width) / 2, 10);
      } else {
        left = parseInt(this.options.hOffset, 10);
      }
      if (this.options.vOffset === 'auto') {
        if (height > outerHeight) {
          top = parseInt(Math.min(100, outerHeight / 10), 10);
        } else {
          top = parseInt((outerHeight - height) / 4, 10);
        }
      } else {
        top = parseInt(this.options.vOffset, 10);
      }
      this.$element.css({ top: top + 'px' });
      // only worry about left if we don't have an overlay or we havea  horizontal offset,
      // otherwise we're perfectly in the middle
      if (!this.$overlay || this.options.hOffset !== 'auto') {
        this.$element.css({ left: left + 'px' });
        this.$element.css({ margin: '0px' });
      }
    }

    /**
     * Adds event handlers for the modal.
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      var _this3 = this;

      var _this = this;

      this.$element.on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': function closeZfTrigger(event, $element) {
          if (event.target === _this.$element[0] || (0, _jquery2.default)(event.target).parents('[data-closable]')[0] === $element) {
            // only close reveal when it's explicitly called
            return _this3.close.apply(_this3);
          }
        },
        'toggle.zf.trigger': this.toggle.bind(this),
        'resizeme.zf.trigger': function resizemeZfTrigger() {
          _this._updatePosition();
        }
      });

      if (this.options.closeOnClick && this.options.overlay) {
        this.$overlay.off('.zf.reveal').on('click.zf.reveal', function (e) {
          if (e.target === _this.$element[0] || _jquery2.default.contains(_this.$element[0], e.target) || !_jquery2.default.contains(document, e.target)) {
            return;
          }
          _this.close();
        });
      }
      if (this.options.deepLink) {
        (0, _jquery2.default)(window).on('popstate.zf.reveal:' + this.id, this._handleState.bind(this));
      }
    }

    /**
     * Handles modal methods on back/forward button clicks or any other event that triggers popstate.
     * @private
     */

  }, {
    key: '_handleState',
    value: function _handleState(e) {
      if (window.location.hash === '#' + this.id && !this.isActive) {
        this.open();
      } else {
        this.close();
      }
    }

    /**
     * Opens the modal controlled by `this.$anchor`, and closes all others by default.
     * @function
     * @fires Reveal#closeme
     * @fires Reveal#open
     */

  }, {
    key: 'open',
    value: function open() {
      var _this4 = this;

      // either update or replace browser history
      if (this.options.deepLink) {
        var hash = '#' + this.id;

        if (window.history.pushState) {
          if (this.options.updateHistory) {
            window.history.pushState({}, '', hash);
          } else {
            window.history.replaceState({}, '', hash);
          }
        } else {
          window.location.hash = hash;
        }
      }

      this.isActive = true;

      // Make elements invisible, but remove display: none so we can get size and positioning
      this.$element.css({ 'visibility': 'hidden' }).show().scrollTop(0);
      if (this.options.overlay) {
        this.$overlay.css({ 'visibility': 'hidden' }).show();
      }

      this._updatePosition();

      this.$element.hide().css({ 'visibility': '' });

      if (this.$overlay) {
        this.$overlay.css({ 'visibility': '' }).hide();
        if (this.$element.hasClass('fast')) {
          this.$overlay.addClass('fast');
        } else if (this.$element.hasClass('slow')) {
          this.$overlay.addClass('slow');
        }
      }

      if (!this.options.multipleOpened) {
        /**
         * Fires immediately before the modal opens.
         * Closes any other modals that are currently open
         * @event Reveal#closeme
         */
        this.$element.trigger('closeme.zf.reveal', this.id);
      }

      var _this = this;

      function addRevealOpenClasses() {
        if (_this.isMobile) {
          if (!_this.originalScrollPos) {
            _this.originalScrollPos = window.pageYOffset;
          }
          (0, _jquery2.default)('html, body').addClass('is-reveal-open');
        } else {
          (0, _jquery2.default)('body').addClass('is-reveal-open');
        }
      }
      // Motion UI method of reveal
      if (this.options.animationIn) {
        var afterAnimation = function afterAnimation() {
          _this.$element.attr({
            'aria-hidden': false,
            'tabindex': -1
          }).focus();
          addRevealOpenClasses();
          _foundationUtil.Keyboard.trapFocus(_this.$element);
        };

        if (this.options.overlay) {
          _foundationUtil3.Motion.animateIn(this.$overlay, 'fade-in');
        }
        _foundationUtil3.Motion.animateIn(this.$element, this.options.animationIn, function () {
          if (_this4.$element) {
            // protect against object having been removed
            _this4.focusableElements = _foundationUtil.Keyboard.findFocusable(_this4.$element);
            afterAnimation();
          }
        });
      }
      // jQuery method of reveal
      else {
          if (this.options.overlay) {
            this.$overlay.show(0);
          }
          this.$element.show(this.options.showDelay);
        }

      // handle accessibility
      this.$element.attr({
        'aria-hidden': false,
        'tabindex': -1
      }).focus();
      _foundationUtil.Keyboard.trapFocus(this.$element);

      addRevealOpenClasses();

      this._extraHandlers();

      /**
       * Fires when the modal has successfully opened.
       * @event Reveal#open
       */
      this.$element.trigger('open.zf.reveal');
    }

    /**
     * Adds extra event handlers for the body and window if necessary.
     * @private
     */

  }, {
    key: '_extraHandlers',
    value: function _extraHandlers() {
      var _this = this;
      if (!this.$element) {
        return;
      } // If we're in the middle of cleanup, don't freak out
      this.focusableElements = _foundationUtil.Keyboard.findFocusable(this.$element);

      if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
        (0, _jquery2.default)('body').on('click.zf.reveal', function (e) {
          if (e.target === _this.$element[0] || _jquery2.default.contains(_this.$element[0], e.target) || !_jquery2.default.contains(document, e.target)) {
            return;
          }
          _this.close();
        });
      }

      if (this.options.closeOnEsc) {
        (0, _jquery2.default)(window).on('keydown.zf.reveal', function (e) {
          _foundationUtil.Keyboard.handleKey(e, 'Reveal', {
            close: function close() {
              if (_this.options.closeOnEsc) {
                _this.close();
              }
            }
          });
        });
      }
    }

    /**
     * Closes the modal.
     * @function
     * @fires Reveal#closed
     */

  }, {
    key: 'close',
    value: function close() {
      if (!this.isActive || !this.$element.is(':visible')) {
        return false;
      }
      var _this = this;

      // Motion UI method of hiding
      if (this.options.animationOut) {
        if (this.options.overlay) {
          _foundationUtil3.Motion.animateOut(this.$overlay, 'fade-out');
        }

        _foundationUtil3.Motion.animateOut(this.$element, this.options.animationOut, finishUp);
      }
      // jQuery method of hiding
      else {
          this.$element.hide(this.options.hideDelay);

          if (this.options.overlay) {
            this.$overlay.hide(0, finishUp);
          } else {
            finishUp();
          }
        }

      // Conditionals to remove extra event listeners added on open
      if (this.options.closeOnEsc) {
        (0, _jquery2.default)(window).off('keydown.zf.reveal');
      }

      if (!this.options.overlay && this.options.closeOnClick) {
        (0, _jquery2.default)('body').off('click.zf.reveal');
      }

      this.$element.off('keydown.zf.reveal');

      function finishUp() {
        if (_this.isMobile) {
          if ((0, _jquery2.default)('.reveal:visible').length === 0) {
            (0, _jquery2.default)('html, body').removeClass('is-reveal-open');
          }
          if (_this.originalScrollPos) {
            (0, _jquery2.default)('body').scrollTop(_this.originalScrollPos);
            _this.originalScrollPos = null;
          }
        } else {
          if ((0, _jquery2.default)('.reveal:visible').length === 0) {
            (0, _jquery2.default)('body').removeClass('is-reveal-open');
          }
        }

        _foundationUtil.Keyboard.releaseFocus(_this.$element);

        _this.$element.attr('aria-hidden', true);

        /**
        * Fires when the modal is done closing.
        * @event Reveal#closed
        */
        _this.$element.trigger('closed.zf.reveal');
      }

      /**
      * Resets the modal content
      * This prevents a running video to keep going in the background
      */
      if (this.options.resetOnClose) {
        this.$element.html(this.$element.html());
      }

      this.isActive = false;
      if (_this.options.deepLink) {
        if (window.history.replaceState) {
          window.history.replaceState('', document.title, window.location.href.replace('#' + this.id, ''));
        } else {
          window.location.hash = '';
        }
      }

      this.$anchor.focus();
    }

    /**
     * Toggles the open/closed state of a modal.
     * @function
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.isActive) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: '_destroy',


    /**
     * Destroys an instance of a modal.
     * @function
     */
    value: function _destroy() {
      if (this.options.overlay) {
        this.$element.appendTo((0, _jquery2.default)(this.options.appendTo)); // move $element outside of $overlay to prevent error unregisterPlugin()
        this.$overlay.hide().off().remove();
      }
      this.$element.hide().off();
      this.$anchor.off('.zf');
      (0, _jquery2.default)(window).off('.zf.reveal:' + this.id);
    }
  }]);

  return Reveal;
}(_foundation.Plugin);

Reveal.defaults = {
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationIn: '',
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationOut: '',
  /**
   * Time, in ms, to delay the opening of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  showDelay: 0,
  /**
   * Time, in ms, to delay the closing of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  hideDelay: 0,
  /**
   * Allows a click on the body/overlay to close the modal.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Allows the modal to close if the user presses the `ESCAPE` key.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnEsc: true,
  /**
   * If true, allows multiple modals to be displayed at once.
   * @option
   * @type {boolean}
   * @default false
   */
  multipleOpened: false,
  /**
   * Distance, in pixels, the modal should push down from the top of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  vOffset: 'auto',
  /**
   * Distance, in pixels, the modal should push in from the side of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  hOffset: 'auto',
  /**
   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
   * @option
   * @type {boolean}
   * @default false
   */
  fullScreen: false,
  /**
   * Percentage of screen height the modal should push up from the bottom of the view.
   * @option
   * @type {number}
   * @default 10
   */
  btmOffsetPct: 10,
  /**
   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
   * @option
   * @type {boolean}
   * @default true
   */
  overlay: true,
  /**
   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
   * @option
   * @type {boolean}
   * @default false
   */
  resetOnClose: false,
  /**
   * Allows the modal to alter the url on open/close, and allows the use of the `back` button to close modals. ALSO, allows a modal to auto-maniacally open on page load IF the hash === the modal's user-set id.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,
  /**
   * Update the browser history with the open modal
   * @option
   * @default false
   */
  updateHistory: false,
  /**
  * Allows the modal to append to custom div.
  * @option
  * @type {string}
  * @default "body"
  */
  appendTo: "body",
  /**
   * Allows adding additional class names to the reveal overlay.
   * @option
   * @type {string}
   * @default ''
   */
  additionalOverlayClasses: ''
};

function iPhoneSniff() {
  return (/iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
  );
}

function androidSniff() {
  return (/Android/.test(window.navigator.userAgent)
  );
}

function mobileSniff() {
  return iPhoneSniff() || androidSniff();
}

exports.Reveal = Reveal;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sticky = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

var _foundationUtil2 = __webpack_require__(3);

var _foundation = __webpack_require__(2);

var _foundationUtil3 = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sticky module.
 * @module foundation.sticky
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */

var Sticky = function (_Plugin) {
  _inherits(Sticky, _Plugin);

  function Sticky() {
    _classCallCheck(this, Sticky);

    return _possibleConstructorReturn(this, (Sticky.__proto__ || Object.getPrototypeOf(Sticky)).apply(this, arguments));
  }

  _createClass(Sticky, [{
    key: '_setup',

    /**
     * Creates a new instance of a sticky thing.
     * @class
     * @name Sticky
     * @param {jQuery} element - jQuery object to make sticky.
     * @param {Object} options - options object passed when creating the element programmatically.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Sticky.defaults, this.$element.data(), options);
      this.className = 'Sticky'; // ie9 back compat

      // Triggers init is idempotent, just need to make sure it is initialized
      _foundationUtil3.Triggers.init(_jquery2.default);

      this._init();
    }

    /**
     * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
     * @function
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      _foundationUtil2.MediaQuery._init();

      var $parent = this.$element.parent('[data-sticky-container]'),
          id = this.$element[0].id || (0, _foundationUtil.GetYoDigits)(6, 'sticky'),
          _this = this;

      if ($parent.length) {
        this.$container = $parent;
      } else {
        this.wasWrapped = true;
        this.$element.wrap(this.options.container);
        this.$container = this.$element.parent();
      }
      this.$container.addClass(this.options.containerClass);

      this.$element.addClass(this.options.stickyClass).attr({ 'data-resize': id, 'data-mutate': id });
      if (this.options.anchor !== '') {
        (0, _jquery2.default)('#' + _this.options.anchor).attr({ 'data-mutate': id });
      }

      this.scrollCount = this.options.checkEvery;
      this.isStuck = false;
      (0, _jquery2.default)(window).one('load.zf.sticky', function () {
        //We calculate the container height to have correct values for anchor points offset calculation.
        _this.containerHeight = _this.$element.css("display") == "none" ? 0 : _this.$element[0].getBoundingClientRect().height;
        _this.$container.css('height', _this.containerHeight);
        _this.elemHeight = _this.containerHeight;
        if (_this.options.anchor !== '') {
          _this.$anchor = (0, _jquery2.default)('#' + _this.options.anchor);
        } else {
          _this._parsePoints();
        }

        _this._setSizes(function () {
          var scroll = window.pageYOffset;
          _this._calc(false, scroll);
          //Unstick the element will ensure that proper classes are set.
          if (!_this.isStuck) {
            _this._removeSticky(scroll >= _this.topPoint ? false : true);
          }
        });
        _this._events(id.split('-').reverse().join('-'));
      });
    }

    /**
     * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
     * @function
     * @private
     */

  }, {
    key: '_parsePoints',
    value: function _parsePoints() {
      var top = this.options.topAnchor == "" ? 1 : this.options.topAnchor,
          btm = this.options.btmAnchor == "" ? document.documentElement.scrollHeight : this.options.btmAnchor,
          pts = [top, btm],
          breaks = {};
      for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
        var pt;
        if (typeof pts[i] === 'number') {
          pt = pts[i];
        } else {
          var place = pts[i].split(':'),
              anchor = (0, _jquery2.default)('#' + place[0]);

          pt = anchor.offset().top;
          if (place[1] && place[1].toLowerCase() === 'bottom') {
            pt += anchor[0].getBoundingClientRect().height;
          }
        }
        breaks[i] = pt;
      }

      this.points = breaks;
      return;
    }

    /**
     * Adds event handlers for the scrolling element.
     * @private
     * @param {String} id - pseudo-random id for unique scroll event listener.
     */

  }, {
    key: '_events',
    value: function _events(id) {
      var _this = this,
          scrollListener = this.scrollListener = 'scroll.zf.' + id;
      if (this.isOn) {
        return;
      }
      if (this.canStick) {
        this.isOn = true;
        (0, _jquery2.default)(window).off(scrollListener).on(scrollListener, function (e) {
          if (_this.scrollCount === 0) {
            _this.scrollCount = _this.options.checkEvery;
            _this._setSizes(function () {
              _this._calc(false, window.pageYOffset);
            });
          } else {
            _this.scrollCount--;
            _this._calc(false, window.pageYOffset);
          }
        });
      }

      this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function (e, el) {
        _this._eventsHandler(id);
      });

      this.$element.on('mutateme.zf.trigger', function (e, el) {
        _this._eventsHandler(id);
      });

      if (this.$anchor) {
        this.$anchor.on('mutateme.zf.trigger', function (e, el) {
          _this._eventsHandler(id);
        });
      }
    }

    /**
     * Handler for events.
     * @private
     * @param {String} id - pseudo-random id for unique scroll event listener.
     */

  }, {
    key: '_eventsHandler',
    value: function _eventsHandler(id) {
      var _this = this,
          scrollListener = this.scrollListener = 'scroll.zf.' + id;

      _this._setSizes(function () {
        _this._calc(false);
        if (_this.canStick) {
          if (!_this.isOn) {
            _this._events(id);
          }
        } else if (_this.isOn) {
          _this._pauseListeners(scrollListener);
        }
      });
    }

    /**
     * Removes event handlers for scroll and change events on anchor.
     * @fires Sticky#pause
     * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
     */

  }, {
    key: '_pauseListeners',
    value: function _pauseListeners(scrollListener) {
      this.isOn = false;
      (0, _jquery2.default)(window).off(scrollListener);

      /**
       * Fires when the plugin is paused due to resize event shrinking the view.
       * @event Sticky#pause
       * @private
       */
      this.$element.trigger('pause.zf.sticky');
    }

    /**
     * Called on every `scroll` event and on `_init`
     * fires functions based on booleans and cached values
     * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
     * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
     */

  }, {
    key: '_calc',
    value: function _calc(checkSizes, scroll) {
      if (checkSizes) {
        this._setSizes();
      }

      if (!this.canStick) {
        if (this.isStuck) {
          this._removeSticky(true);
        }
        return false;
      }

      if (!scroll) {
        scroll = window.pageYOffset;
      }

      if (scroll >= this.topPoint) {
        if (scroll <= this.bottomPoint) {
          if (!this.isStuck) {
            this._setSticky();
          }
        } else {
          if (this.isStuck) {
            this._removeSticky(false);
          }
        }
      } else {
        if (this.isStuck) {
          this._removeSticky(true);
        }
      }
    }

    /**
     * Causes the $element to become stuck.
     * Adds `position: fixed;`, and helper classes.
     * @fires Sticky#stuckto
     * @function
     * @private
     */

  }, {
    key: '_setSticky',
    value: function _setSticky() {
      var _this = this,
          stickTo = this.options.stickTo,
          mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',
          notStuckTo = stickTo === 'top' ? 'bottom' : 'top',
          css = {};

      css[mrgn] = this.options[mrgn] + 'em';
      css[stickTo] = 0;
      css[notStuckTo] = 'auto';
      this.isStuck = true;
      this.$element.removeClass('is-anchored is-at-' + notStuckTo).addClass('is-stuck is-at-' + stickTo).css(css)
      /**
       * Fires when the $element has become `position: fixed;`
       * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`
       * @event Sticky#stuckto
       */
      .trigger('sticky.zf.stuckto:' + stickTo);
      this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
        _this._setSizes();
      });
    }

    /**
     * Causes the $element to become unstuck.
     * Removes `position: fixed;`, and helper classes.
     * Adds other helper classes.
     * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
     * @fires Sticky#unstuckfrom
     * @private
     */

  }, {
    key: '_removeSticky',
    value: function _removeSticky(isTop) {
      var stickTo = this.options.stickTo,
          stickToTop = stickTo === 'top',
          css = {},
          anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
          mrgn = stickToTop ? 'marginTop' : 'marginBottom',
          notStuckTo = stickToTop ? 'bottom' : 'top',
          topOrBottom = isTop ? 'top' : 'bottom';

      css[mrgn] = 0;

      css['bottom'] = 'auto';
      if (isTop) {
        css['top'] = 0;
      } else {
        css['top'] = anchorPt;
      }

      this.isStuck = false;
      this.$element.removeClass('is-stuck is-at-' + stickTo).addClass('is-anchored is-at-' + topOrBottom).css(css)
      /**
       * Fires when the $element has become anchored.
       * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`
       * @event Sticky#unstuckfrom
       */
      .trigger('sticky.zf.unstuckfrom:' + topOrBottom);
    }

    /**
     * Sets the $element and $container sizes for plugin.
     * Calls `_setBreakPoints`.
     * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
     * @private
     */

  }, {
    key: '_setSizes',
    value: function _setSizes(cb) {
      this.canStick = _foundationUtil2.MediaQuery.is(this.options.stickyOn);
      if (!this.canStick) {
        if (cb && typeof cb === 'function') {
          cb();
        }
      }
      var _this = this,
          newElemWidth = this.$container[0].getBoundingClientRect().width,
          comp = window.getComputedStyle(this.$container[0]),
          pdngl = parseInt(comp['padding-left'], 10),
          pdngr = parseInt(comp['padding-right'], 10);

      if (this.$anchor && this.$anchor.length) {
        this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
      } else {
        this._parsePoints();
      }

      this.$element.css({
        'max-width': newElemWidth - pdngl - pdngr + 'px'
      });

      var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
      if (this.$element.css("display") == "none") {
        newContainerHeight = 0;
      }
      this.containerHeight = newContainerHeight;
      this.$container.css({
        height: newContainerHeight
      });
      this.elemHeight = newContainerHeight;

      if (!this.isStuck) {
        if (this.$element.hasClass('is-at-bottom')) {
          var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
          this.$element.css('top', anchorPt);
        }
      }

      this._setBreakPoints(newContainerHeight, function () {
        if (cb && typeof cb === 'function') {
          cb();
        }
      });
    }

    /**
     * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
     * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
     * @param {Function} cb - optional callback function to be called on completion.
     * @private
     */

  }, {
    key: '_setBreakPoints',
    value: function _setBreakPoints(elemHeight, cb) {
      if (!this.canStick) {
        if (cb && typeof cb === 'function') {
          cb();
        } else {
          return false;
        }
      }
      var mTop = emCalc(this.options.marginTop),
          mBtm = emCalc(this.options.marginBottom),
          topPoint = this.points ? this.points[0] : this.$anchor.offset().top,
          bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,

      // topPoint = this.$anchor.offset().top || this.points[0],
      // bottomPoint = topPoint + this.anchorHeight || this.points[1],
      winHeight = window.innerHeight;

      if (this.options.stickTo === 'top') {
        topPoint -= mTop;
        bottomPoint -= elemHeight + mTop;
      } else if (this.options.stickTo === 'bottom') {
        topPoint -= winHeight - (elemHeight + mBtm);
        bottomPoint -= winHeight - mBtm;
      } else {
        //this would be the stickTo: both option... tricky
      }

      this.topPoint = topPoint;
      this.bottomPoint = bottomPoint;

      if (cb && typeof cb === 'function') {
        cb();
      }
    }

    /**
     * Destroys the current sticky element.
     * Resets the element to the top position first.
     * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this._removeSticky(true);

      this.$element.removeClass(this.options.stickyClass + ' is-anchored is-at-top').css({
        height: '',
        top: '',
        bottom: '',
        'max-width': ''
      }).off('resizeme.zf.trigger').off('mutateme.zf.trigger');
      if (this.$anchor && this.$anchor.length) {
        this.$anchor.off('change.zf.sticky');
      }
      (0, _jquery2.default)(window).off(this.scrollListener);

      if (this.wasWrapped) {
        this.$element.unwrap();
      } else {
        this.$container.removeClass(this.options.containerClass).css({
          height: ''
        });
      }
    }
  }]);

  return Sticky;
}(_foundation.Plugin);

Sticky.defaults = {
  /**
   * Customizable container template. Add your own classes for styling and sizing.
   * @option
   * @type {string}
   * @default '&lt;div data-sticky-container&gt;&lt;/div&gt;'
   */
  container: '<div data-sticky-container></div>',
  /**
   * Location in the view the element sticks to. Can be `'top'` or `'bottom'`.
   * @option
   * @type {string}
   * @default 'top'
   */
  stickTo: 'top',
  /**
   * If anchored to a single element, the id of that element.
   * @option
   * @type {string}
   * @default ''
   */
  anchor: '',
  /**
   * If using more than one element as anchor points, the id of the top anchor.
   * @option
   * @type {string}
   * @default ''
   */
  topAnchor: '',
  /**
   * If using more than one element as anchor points, the id of the bottom anchor.
   * @option
   * @type {string}
   * @default ''
   */
  btmAnchor: '',
  /**
   * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginTop: 1,
  /**
   * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginBottom: 1,
  /**
   * Breakpoint string that is the minimum screen size an element should become sticky.
   * @option
   * @type {string}
   * @default 'medium'
   */
  stickyOn: 'medium',
  /**
   * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
   * @option
   * @type {string}
   * @default 'sticky'
   */
  stickyClass: 'sticky',
  /**
   * Class applied to sticky container. Foundation defaults to `sticky-container`.
   * @option
   * @type {string}
   * @default 'sticky-container'
   */
  containerClass: 'sticky-container',
  /**
   * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
   * @option
   * @type {number}
   * @default -1
   */
  checkEvery: -1
};

/**
 * Helper function to calculate em values
 * @param Number {em} - number of em's to calculate into pixels
 */
function emCalc(em) {
  return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
}

exports.Sticky = Sticky;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toggler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(6);

var _foundation = __webpack_require__(2);

var _foundationUtil2 = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Toggler module.
 * @module foundation.toggler
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 */

var Toggler = function (_Plugin) {
  _inherits(Toggler, _Plugin);

  function Toggler() {
    _classCallCheck(this, Toggler);

    return _possibleConstructorReturn(this, (Toggler.__proto__ || Object.getPrototypeOf(Toggler)).apply(this, arguments));
  }

  _createClass(Toggler, [{
    key: '_setup',

    /**
     * Creates a new instance of Toggler.
     * @class
     * @name Toggler
     * @fires Toggler#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Toggler.defaults, element.data(), options);
      this.className = '';
      this.className = 'Toggler'; // ie9 back compat

      // Triggers init is idempotent, just need to make sure it is initialized
      _foundationUtil2.Triggers.init(_jquery2.default);

      this._init();
      this._events();
    }

    /**
     * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
     * @function
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var input;
      // Parse animation classes if they were set
      if (this.options.animate) {
        input = this.options.animate.split(' ');

        this.animationIn = input[0];
        this.animationOut = input[1] || null;
      }
      // Otherwise, parse toggle class
      else {
          input = this.$element.data('toggler');
          // Allow for a . at the beginning of the string
          this.className = input[0] === '.' ? input.slice(1) : input;
        }

      // Add ARIA attributes to triggers
      var id = this.$element[0].id;
      (0, _jquery2.default)('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-controls', id);
      // If the target is hidden, add aria-hidden
      this.$element.attr('aria-expanded', this.$element.is(':hidden') ? false : true);
    }

    /**
     * Initializes events for the toggle trigger.
     * @function
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));
    }

    /**
     * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
     * @function
     * @fires Toggler#on
     * @fires Toggler#off
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      this[this.options.animate ? '_toggleAnimate' : '_toggleClass']();
    }
  }, {
    key: '_toggleClass',
    value: function _toggleClass() {
      this.$element.toggleClass(this.className);

      var isOn = this.$element.hasClass(this.className);
      if (isOn) {
        /**
         * Fires if the target element has the class after a toggle.
         * @event Toggler#on
         */
        this.$element.trigger('on.zf.toggler');
      } else {
        /**
         * Fires if the target element does not have the class after a toggle.
         * @event Toggler#off
         */
        this.$element.trigger('off.zf.toggler');
      }

      this._updateARIA(isOn);
      this.$element.find('[data-mutate]').trigger('mutateme.zf.trigger');
    }
  }, {
    key: '_toggleAnimate',
    value: function _toggleAnimate() {
      var _this = this;

      if (this.$element.is(':hidden')) {
        _foundationUtil.Motion.animateIn(this.$element, this.animationIn, function () {
          _this._updateARIA(true);
          this.trigger('on.zf.toggler');
          this.find('[data-mutate]').trigger('mutateme.zf.trigger');
        });
      } else {
        _foundationUtil.Motion.animateOut(this.$element, this.animationOut, function () {
          _this._updateARIA(false);
          this.trigger('off.zf.toggler');
          this.find('[data-mutate]').trigger('mutateme.zf.trigger');
        });
      }
    }
  }, {
    key: '_updateARIA',
    value: function _updateARIA(isOn) {
      this.$element.attr('aria-expanded', isOn ? true : false);
    }

    /**
     * Destroys the instance of Toggler on the element.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.off('.zf.toggler');
    }
  }]);

  return Toggler;
}(_foundation.Plugin);

Toggler.defaults = {
  /**
   * Tells the plugin if the element should animated when toggled.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};

exports.Toggler = Toggler;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzYxYmIxZDE3OGFlNWUxMmE3YWMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubW90aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5ib3guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm5lc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnNtb290aFNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudG91Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5hY2NvcmRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnBvc2l0aW9uYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmVxdWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmludGVyY2hhbmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ubWFnZWxsYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyaWxsZG93bi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVUb2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXZlYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zdGlja3kuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50b2dnbGVyLmpzIl0sIm5hbWVzIjpbInJ0bCIsImF0dHIiLCJHZXRZb0RpZ2l0cyIsImxlbmd0aCIsIm5hbWVzcGFjZSIsIk1hdGgiLCJyb3VuZCIsInBvdyIsInJhbmRvbSIsInRvU3RyaW5nIiwic2xpY2UiLCJ0cmFuc2l0aW9uZW5kIiwiJGVsZW0iLCJ0cmFuc2l0aW9ucyIsImVsZW0iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJlbmQiLCJ0Iiwic3R5bGUiLCJzZXRUaW1lb3V0IiwidHJpZ2dlckhhbmRsZXIiLCJQbHVnaW4iLCJlbGVtZW50Iiwib3B0aW9ucyIsIl9zZXR1cCIsInBsdWdpbk5hbWUiLCJnZXRQbHVnaW5OYW1lIiwidXVpZCIsIiRlbGVtZW50IiwiZGF0YSIsInRyaWdnZXIiLCJfZGVzdHJveSIsInJlbW92ZUF0dHIiLCJyZW1vdmVEYXRhIiwicHJvcCIsImh5cGhlbmF0ZSIsInN0ciIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsIm9iaiIsImNvbnN0cnVjdG9yIiwibmFtZSIsImNsYXNzTmFtZSIsImRlZmF1bHRRdWVyaWVzIiwibGFuZHNjYXBlIiwicG9ydHJhaXQiLCJyZXRpbmEiLCJtYXRjaE1lZGlhIiwid2luZG93Iiwic3R5bGVNZWRpYSIsIm1lZGlhIiwic2NyaXB0IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbmZvIiwidHlwZSIsImlkIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImdldENvbXB1dGVkU3R5bGUiLCJjdXJyZW50U3R5bGUiLCJtYXRjaE1lZGl1bSIsInRleHQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsInRleHRDb250ZW50Iiwid2lkdGgiLCJtYXRjaGVzIiwiTWVkaWFRdWVyeSIsInF1ZXJpZXMiLCJjdXJyZW50IiwiX2luaXQiLCJzZWxmIiwiJG1ldGEiLCJhcHBlbmRUbyIsImhlYWQiLCJleHRyYWN0ZWRTdHlsZXMiLCJjc3MiLCJuYW1lZFF1ZXJpZXMiLCJwYXJzZVN0eWxlVG9PYmplY3QiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJ2YWx1ZSIsIl9nZXRDdXJyZW50U2l6ZSIsIl93YXRjaGVyIiwiYXRMZWFzdCIsInNpemUiLCJxdWVyeSIsImdldCIsImlzIiwidHJpbSIsInNwbGl0IiwiaSIsIm1hdGNoZWQiLCJvZmYiLCJvbiIsIm5ld1NpemUiLCJjdXJyZW50U2l6ZSIsInN0eWxlT2JqZWN0IiwicmVkdWNlIiwicmV0IiwicGFyYW0iLCJwYXJ0cyIsInZhbCIsImRlY29kZVVSSUNvbXBvbmVudCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsImtleUNvZGVzIiwiY29tbWFuZHMiLCJmaW5kRm9jdXNhYmxlIiwiZmluZCIsImZpbHRlciIsInBhcnNlS2V5IiwiZXZlbnQiLCJ3aGljaCIsImtleUNvZGUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ0b1VwcGVyQ2FzZSIsInNoaWZ0S2V5IiwiY3RybEtleSIsImFsdEtleSIsIktleWJvYXJkIiwia2V5cyIsImdldEtleUNvZGVzIiwiaGFuZGxlS2V5IiwiY29tcG9uZW50IiwiZnVuY3Rpb25zIiwiY29tbWFuZExpc3QiLCJjbWRzIiwiY29tbWFuZCIsImZuIiwiY29uc29sZSIsIndhcm4iLCJsdHIiLCIkIiwiZXh0ZW5kIiwicmV0dXJuVmFsdWUiLCJhcHBseSIsImhhbmRsZWQiLCJ1bmhhbmRsZWQiLCJyZWdpc3RlciIsImNvbXBvbmVudE5hbWUiLCJ0cmFwRm9jdXMiLCIkZm9jdXNhYmxlIiwiJGZpcnN0Rm9jdXNhYmxlIiwiZXEiLCIkbGFzdEZvY3VzYWJsZSIsInRhcmdldCIsInByZXZlbnREZWZhdWx0IiwiZm9jdXMiLCJyZWxlYXNlRm9jdXMiLCJrY3MiLCJrIiwia2MiLCJNdXRhdGlvbk9ic2VydmVyIiwicHJlZml4ZXMiLCJ0cmlnZ2VycyIsImVsIiwiZm9yRWFjaCIsIlRyaWdnZXJzIiwiTGlzdGVuZXJzIiwiQmFzaWMiLCJHbG9iYWwiLCJJbml0aWFsaXplcnMiLCJvcGVuTGlzdGVuZXIiLCJjbG9zZUxpc3RlbmVyIiwidG9nZ2xlTGlzdGVuZXIiLCJjbG9zZWFibGVMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJhbmltYXRpb24iLCJNb3Rpb24iLCJhbmltYXRlT3V0IiwiZmFkZU91dCIsInRvZ2dsZUZvY3VzTGlzdGVuZXIiLCJhZGRPcGVuTGlzdGVuZXIiLCJhZGRDbG9zZUxpc3RlbmVyIiwiYWRkVG9nZ2xlTGlzdGVuZXIiLCJhZGRDbG9zZWFibGVMaXN0ZW5lciIsImFkZFRvZ2dsZUZvY3VzTGlzdGVuZXIiLCJyZXNpemVMaXN0ZW5lciIsIiRub2RlcyIsImVhY2giLCJzY3JvbGxMaXN0ZW5lciIsImNsb3NlTWVMaXN0ZW5lciIsInBsdWdpbklkIiwicGx1Z2luIiwicGx1Z2lucyIsIm5vdCIsIl90aGlzIiwiYWRkQ2xvc2VtZUxpc3RlbmVyIiwieWV0aUJveGVzIiwicGx1Z05hbWVzIiwiY29uY2F0IiwiZXJyb3IiLCJsaXN0ZW5lcnMiLCJtYXAiLCJqb2luIiwiZGVib3VuY2VHbG9iYWxMaXN0ZW5lciIsImRlYm91bmNlIiwibGlzdGVuZXIiLCJ0aW1lciIsImFyZ3MiLCJwcm90b3R5cGUiLCJjYWxsIiwiYXJndW1lbnRzIiwiY2xlYXJUaW1lb3V0IiwiYWRkUmVzaXplTGlzdGVuZXIiLCJhZGRTY3JvbGxMaXN0ZW5lciIsImFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIiLCJsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uIiwibXV0YXRpb25SZWNvcmRzTGlzdCIsIiR0YXJnZXQiLCJhdHRyaWJ1dGVOYW1lIiwicGFnZVlPZmZzZXQiLCJjbG9zZXN0IiwiZWxlbWVudE9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwic3VidHJlZSIsImF0dHJpYnV0ZUZpbHRlciIsImFkZFNpbXBsZUxpc3RlbmVycyIsIiRkb2N1bWVudCIsImFkZEdsb2JhbExpc3RlbmVycyIsImluaXQiLCJGb3VuZGF0aW9uIiwidHJpZ2dlcnNJbml0aWFsaXplZCIsInJlYWR5U3RhdGUiLCJJSGVhcllvdSIsImluaXRDbGFzc2VzIiwiYWN0aXZlQ2xhc3NlcyIsImFuaW1hdGVJbiIsImNiIiwiYW5pbWF0ZSIsIk1vdmUiLCJkdXJhdGlvbiIsImFuaW0iLCJwcm9nIiwic3RhcnQiLCJtb3ZlIiwidHMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImlzSW4iLCJpbml0Q2xhc3MiLCJhY3RpdmVDbGFzcyIsInJlc2V0IiwiYWRkQ2xhc3MiLCJzaG93Iiwib2Zmc2V0V2lkdGgiLCJvbmUiLCJmaW5pc2giLCJoaWRlIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwicmVtb3ZlQ2xhc3MiLCJCb3giLCJJbU5vdFRvdWNoaW5nWW91IiwiT3ZlcmxhcEFyZWEiLCJHZXREaW1lbnNpb25zIiwiR2V0T2Zmc2V0cyIsIkdldEV4cGxpY2l0T2Zmc2V0cyIsInBhcmVudCIsImxyT25seSIsInRiT25seSIsImlnbm9yZUJvdHRvbSIsImVsZURpbXMiLCJ0b3BPdmVyIiwiYm90dG9tT3ZlciIsImxlZnRPdmVyIiwicmlnaHRPdmVyIiwicGFyRGltcyIsImhlaWdodCIsIm9mZnNldCIsInRvcCIsImxlZnQiLCJ3aW5kb3dEaW1zIiwibWluIiwic3FydCIsIkVycm9yIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhclJlY3QiLCJ3aW5SZWN0IiwiYm9keSIsIndpblkiLCJ3aW5YIiwicGFnZVhPZmZzZXQiLCJwYXJlbnREaW1zIiwiYW5jaG9yIiwicG9zaXRpb24iLCJ2T2Zmc2V0IiwiaE9mZnNldCIsImlzT3ZlcmZsb3ciLCJsb2ciLCIkZWxlRGltcyIsIiRhbmNob3JEaW1zIiwiYWxpZ25tZW50IiwidG9wVmFsIiwibGVmdFZhbCIsIk5lc3QiLCJGZWF0aGVyIiwibWVudSIsIml0ZW1zIiwic3ViTWVudUNsYXNzIiwic3ViSXRlbUNsYXNzIiwiaGFzU3ViQ2xhc3MiLCJhcHBseUFyaWEiLCIkaXRlbSIsIiRzdWIiLCJjaGlsZHJlbiIsIkJ1cm4iLCJvbkltYWdlc0xvYWRlZCIsImltYWdlcyIsImNhbGxiYWNrIiwidW5sb2FkZWQiLCJjb21wbGV0ZSIsIm5hdHVyYWxXaWR0aCIsInNpbmdsZUltYWdlTG9hZGVkIiwiaW1hZ2UiLCJJbWFnZSIsImV2ZW50cyIsIm1lIiwic3JjIiwiQWNjb3JkaW9uTWVudSIsImRlZmF1bHRzIiwic2xpZGVVcCIsIm11bHRpT3BlbiIsIiRtZW51TGlua3MiLCJsaW5rSWQiLCJzdWJJZCIsImlzQWN0aXZlIiwiaGFzQ2xhc3MiLCJzdWJtZW51VG9nZ2xlIiwiYWZ0ZXIiLCJzdWJtZW51VG9nZ2xlVGV4dCIsImluaXRQYW5lcyIsImRvd24iLCJfZXZlbnRzIiwiJHN1Ym1lbnUiLCJ0b2dnbGUiLCIkZWxlbWVudHMiLCIkcHJldkVsZW1lbnQiLCIkbmV4dEVsZW1lbnQiLCJtYXgiLCJmaXJzdCIsInBhcmVudHMiLCJuZXh0Iiwib3BlbiIsImNsb3NlIiwidXAiLCJjbG9zZUFsbCIsImhpZGVBbGwiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJwYXJlbnRzVW50aWwiLCJhZGQiLCJwcmV2Iiwic2xpZGVEb3duIiwic2xpZGVTcGVlZCIsIiRtZW51cyIsImFkZEJhY2siLCJyZW1vdmUiLCJEcm9wZG93bk1lbnUiLCJzdWJzIiwiJG1lbnVJdGVtcyIsIiR0YWJzIiwidmVydGljYWxDbGFzcyIsInJpZ2h0Q2xhc3MiLCJjaGFuZ2VkIiwiaGFzVG91Y2giLCJvbnRvdWNoc3RhcnQiLCJwYXJDbGFzcyIsImhhbmRsZUNsaWNrRm4iLCJoYXNTdWIiLCJoYXNDbGlja2VkIiwiY2xvc2VPbkNsaWNrIiwiY2xpY2tPcGVuIiwiZm9yY2VGb2xsb3ciLCJfaGlkZSIsIl9zaG93IiwiY2xvc2VPbkNsaWNrSW5zaWRlIiwiZGlzYWJsZUhvdmVyIiwiaG92ZXJEZWxheSIsImF1dG9jbG9zZSIsImNsb3NpbmdUaW1lIiwiaXNUYWIiLCJpbmRleCIsInNpYmxpbmdzIiwibmV4dFNpYmxpbmciLCJwcmV2U2libGluZyIsIm9wZW5TdWIiLCJjbG9zZVN1YiIsIl9pc1ZlcnRpY2FsIiwiX2lzUnRsIiwicHJldmlvdXMiLCIkYm9keSIsIiRsaW5rIiwiaWR4IiwiJHNpYnMiLCJjbGVhciIsIm9sZENsYXNzIiwiJHBhcmVudExpIiwiX2FkZEJvZHlIYW5kbGVyIiwiJHRvQ2xvc2UiLCJzb21ldGhpbmdUb0Nsb3NlIiwiU21vb3RoU2Nyb2xsIiwiaGFuZGxlTGlua0NsaWNrIiwiYXJyaXZhbCIsImdldEF0dHJpYnV0ZSIsIl9pblRyYW5zaXRpb24iLCJzY3JvbGxUb0xvYyIsImxvYyIsInNjcm9sbFBvcyIsInRocmVzaG9sZCIsInN0b3AiLCJzY3JvbGxUb3AiLCJhbmltYXRpb25EdXJhdGlvbiIsImFuaW1hdGlvbkVhc2luZyIsImZvdW5kYXRpb24iLCJ0b2dnbGVDbGFzcyIsImFkZFRvSnF1ZXJ5IiwiVGltZXIiLCJUb3VjaCIsIkFjY29yZGlvbiIsIkRyb3Bkb3duIiwiRXF1YWxpemVyIiwiSW50ZXJjaGFuZ2UiLCJNYWdlbGxhbiIsIk9mZkNhbnZhcyIsIlJlc3BvbnNpdmVNZW51IiwiUmVzcG9uc2l2ZVRvZ2dsZSIsIlJldmVhbCIsIlN0aWNreSIsIlRvZ2dsZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiRk9VTkRBVElPTl9WRVJTSU9OIiwidmVyc2lvbiIsIl9wbHVnaW5zIiwiX3V1aWRzIiwiZnVuY3Rpb25OYW1lIiwiYXR0ck5hbWUiLCJyZWdpc3RlclBsdWdpbiIsInVucmVnaXN0ZXJQbHVnaW4iLCJzcGxpY2UiLCJpbmRleE9mIiwicmVJbml0IiwiaXNKUSIsImZucyIsInBsZ3MiLCJwIiwiT2JqZWN0IiwiZXJyIiwicmVmbG93IiwiJGVsIiwib3B0cyIsInRoaW5nIiwib3B0IiwicGFyc2VWYWx1ZSIsImVyIiwiZ2V0Rm5OYW1lIiwibWV0aG9kIiwiJG5vSlMiLCJwbHVnQ2xhc3MiLCJSZWZlcmVuY2VFcnJvciIsIlR5cGVFcnJvciIsInV0aWwiLCJ0aHJvdHRsZSIsImZ1bmMiLCJkZWxheSIsImNvbnRleHQiLCJEYXRlIiwibm93IiwiZ2V0VGltZSIsInZlbmRvcnMiLCJ2cCIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJsYXN0VGltZSIsIm5leHRUaW1lIiwicGVyZm9ybWFuY2UiLCJGdW5jdGlvbiIsImJpbmQiLCJvVGhpcyIsImFBcmdzIiwiZlRvQmluZCIsImZOT1AiLCJmQm91bmQiLCJmdW5jTmFtZVJlZ2V4IiwicmVzdWx0cyIsImV4ZWMiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJuYW1lU3BhY2UiLCJyZW1haW4iLCJpc1BhdXNlZCIsInJlc3RhcnQiLCJpbmZpbml0ZSIsInBhdXNlIiwic3RhcnRQb3NYIiwic3RhcnRQb3NZIiwic3RhcnRUaW1lIiwiZWxhcHNlZFRpbWUiLCJpc01vdmluZyIsIm9uVG91Y2hFbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Ub3VjaE1vdmUiLCJzcG90U3dpcGUiLCJ4IiwidG91Y2hlcyIsInBhZ2VYIiwieSIsInBhZ2VZIiwiZHgiLCJkeSIsImRpciIsImFicyIsIm1vdmVUaHJlc2hvbGQiLCJ0aW1lVGhyZXNob2xkIiwib25Ub3VjaFN0YXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInRlYXJkb3duIiwiU3BvdFN3aXBlIiwiZW5hYmxlZCIsImRvY3VtZW50RWxlbWVudCIsInNwZWNpYWwiLCJzd2lwZSIsInNldHVwIiwibm9vcCIsInNldHVwU3BvdFN3aXBlIiwic2V0dXBUb3VjaEhhbmRsZXIiLCJhZGRUb3VjaCIsImhhbmRsZVRvdWNoIiwiY2hhbmdlZFRvdWNoZXMiLCJldmVudFR5cGVzIiwidG91Y2hzdGFydCIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwic2ltdWxhdGVkRXZlbnQiLCJNb3VzZUV2ZW50Iiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiJGNvbnRlbnQiLCIkaW5pdEFjdGl2ZSIsImZpcnN0VGltZUluaXQiLCJfY2hlY2tEZWVwTGluayIsImxvY2F0aW9uIiwiaGFzaCIsIiRhbmNob3IiLCJkZWVwTGlua1NtdWRnZSIsImxvYWQiLCJkZWVwTGlua1NtdWRnZURlbGF5IiwiZGVlcExpbmsiLCIkdGFiQ29udGVudCIsIiRhIiwibXVsdGlFeHBhbmQiLCJ1cGRhdGVIaXN0b3J5IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2VTdGF0ZSIsImZpcnN0VGltZSIsIiRjdXJyZW50QWN0aXZlIiwiJGF1bnRzIiwiYWxsb3dBbGxDbG9zZWQiLCIkaWQiLCIkYW5jaG9ycyIsIl9zZXRDdXJyZW50QW5jaG9yIiwicGFyZW50Q2xhc3MiLCIkcGFyZW50IiwiJGN1cnJlbnRBbmNob3IiLCJtYXRjaCIsImhvcml6b250YWxQb3NpdGlvbiIsIl9zZXRQb3NpdGlvbiIsImhvdmVyIiwiYm9keURhdGEiLCJ3aGF0aW5wdXQiLCJ0aW1lb3V0IiwiaG92ZXJQYW5lIiwidmlzaWJsZUZvY3VzYWJsZUVsZW1lbnRzIiwiYXV0b0ZvY3VzIiwiUG9zaXRpb25hYmxlIiwicG9zaXRpb25DbGFzcyIsImFsbG93T3ZlcmxhcCIsImFsbG93Qm90dG9tT3ZlcmxhcCIsIlBPU0lUSU9OUyIsIlZFUlRJQ0FMX0FMSUdOTUVOVFMiLCJIT1JJWk9OVEFMX0FMSUdOTUVOVFMiLCJBTElHTk1FTlRTIiwibmV4dEl0ZW0iLCJpdGVtIiwiYXJyYXkiLCJjdXJyZW50SWR4IiwidHJpZWRQb3NpdGlvbnMiLCJfZ2V0RGVmYXVsdFBvc2l0aW9uIiwiX2dldERlZmF1bHRBbGlnbm1lbnQiLCJfYWxpZ25tZW50c0V4aGF1c3RlZCIsIl9yZWFsaWduIiwiX2FkZFRyaWVkUG9zaXRpb24iLCJpc0V4aGF1c3RlZCIsIl9nZXRWT2Zmc2V0IiwiX2dldEhPZmZzZXQiLCJvdmVybGFwcyIsIm1pbk92ZXJsYXAiLCJtaW5Db29yZGluYXRlcyIsIl9wb3NpdGlvbnNFeGhhdXN0ZWQiLCJvdmVybGFwIiwiX3JlcG9zaXRpb24iLCJlcUlkIiwiJHdhdGNoZWQiLCJoYXNOZXN0ZWQiLCJpc05lc3RlZCIsImlzT24iLCJfYmluZEhhbmRsZXIiLCJvblJlc2l6ZU1lQm91bmQiLCJfb25SZXNpemVNZSIsIm9uUG9zdEVxdWFsaXplZEJvdW5kIiwiX29uUG9zdEVxdWFsaXplZCIsImltZ3MiLCJ0b29TbWFsbCIsImVxdWFsaXplT24iLCJfY2hlY2tNUSIsIl9yZWZsb3ciLCJfcGF1c2VFdmVudHMiLCJlcXVhbGl6ZU9uU3RhY2siLCJfaXNTdGFja2VkIiwiZXF1YWxpemVCeVJvdyIsImdldEhlaWdodHNCeVJvdyIsImFwcGx5SGVpZ2h0QnlSb3ciLCJnZXRIZWlnaHRzIiwiYXBwbHlIZWlnaHQiLCJoZWlnaHRzIiwibGVuIiwib2Zmc2V0SGVpZ2h0IiwibGFzdEVsVG9wT2Zmc2V0IiwiZ3JvdXBzIiwiZ3JvdXAiLCJlbE9mZnNldFRvcCIsImoiLCJsbiIsImdyb3Vwc0lMZW5ndGgiLCJsZW5KIiwicnVsZXMiLCJjdXJyZW50UGF0aCIsIl9hZGRCcmVha3BvaW50cyIsIl9nZW5lcmF0ZVJ1bGVzIiwicnVsZSIsInBhdGgiLCJTUEVDSUFMX1FVRVJJRVMiLCJydWxlc0xpc3QiLCJub2RlTmFtZSIsInJlc3BvbnNlIiwiaHRtbCIsImNhbGNQb2ludHMiLCIkdGFyZ2V0cyIsIiRsaW5rcyIsIiRhY3RpdmUiLCJwYXJzZUludCIsInBvaW50cyIsIndpbkhlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiZG9jSGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiJHRhciIsInB0IiwidGFyZ2V0UG9pbnQiLCJlYXNpbmciLCJkZWVwTGlua2luZyIsIl91cGRhdGVBY3RpdmUiLCJfZGVlcExpbmtTY3JvbGwiLCJ3aW5Qb3MiLCJjdXJJZHgiLCJpc0Rvd24iLCJjdXJWaXNpYmxlIiwiY29udGVudENsYXNzZXMiLCJiYXNlIiwicmV2ZWFsIiwiJGxhc3RUcmlnZ2VyIiwiJHRyaWdnZXJzIiwibmVzdGVkIiwiY29udGVudElkIiwidHJhbnNpdGlvbiIsImNvbnRlbnRPdmVybGF5Iiwib3ZlcmxheSIsIm92ZXJsYXlQb3NpdGlvbiIsInNldEF0dHJpYnV0ZSIsIiRvdmVybGF5IiwiaW5zZXJ0QWZ0ZXIiLCJhcHBlbmQiLCJpc1JldmVhbGVkIiwiUmVnRXhwIiwicmV2ZWFsQ2xhc3MiLCJyZXZlYWxPbiIsIl9zZXRNUUNoZWNrZXIiLCJ0cmFuc2l0aW9uVGltZSIsIl9yZW1vdmVDb250ZW50Q2xhc3NlcyIsIl9oYW5kbGVLZXlib2FyZCIsImhhc1JldmVhbCIsIl9hZGRDb250ZW50Q2xhc3NlcyIsImFsbG93VXAiLCJhbGxvd0Rvd24iLCJsYXN0WSIsIm9yaWdpbmFsRXZlbnQiLCJmb3JjZVRvIiwic2Nyb2xsVG8iLCJjb250ZW50U2Nyb2xsIiwiX3N0b3BTY3JvbGxpbmciLCJfcmVjb3JkU2Nyb2xsYWJsZSIsIl9zdG9wU2Nyb2xsUHJvcGFnYXRpb24iLCJjYW52YXNGb2N1cyIsIk1lbnVQbHVnaW5zIiwiZHJvcGRvd24iLCJjc3NDbGFzcyIsImRyaWxsZG93biIsIkRyaWxsZG93biIsImFjY29yZGlvbiIsImN1cnJlbnRNcSIsImN1cnJlbnRQbHVnaW4iLCJydWxlc1RyZWUiLCJydWxlU2l6ZSIsInJ1bGVQbHVnaW4iLCJpc0VtcHR5T2JqZWN0IiwiX2NoZWNrTWVkaWFRdWVyaWVzIiwibWF0Y2hlZE1xIiwiZGVzdHJveSIsImF1dG9BcHBseUNsYXNzIiwiJHN1Ym1lbnVBbmNob3JzIiwiJHN1Ym1lbnVzIiwiX3ByZXBhcmVNZW51IiwiX3JlZ2lzdGVyRXZlbnRzIiwiX2tleWJvYXJkRXZlbnRzIiwicGFyZW50TGluayIsImNsb25lIiwicHJlcGVuZFRvIiwid3JhcCIsIiRtZW51IiwiJGJhY2siLCJiYWNrQnV0dG9uUG9zaXRpb24iLCJiYWNrQnV0dG9uIiwicHJlcGVuZCIsIl9iYWNrIiwiYXV0b0hlaWdodCIsIiR3cmFwcGVyIiwid3JhcHBlciIsImFuaW1hdGVIZWlnaHQiLCJfZ2V0TWF4RGltcyIsImNvbnRhaW5zIiwiX2hpZGVBbGwiLCJfc2Nyb2xsVG9wIiwiX3Jlc2l6ZSIsIiRzY3JvbGxUb3BFbGVtZW50Iiwic2Nyb2xsVG9wRWxlbWVudCIsInNjcm9sbFRvcE9mZnNldCIsInBhcmVudFN1Yk1lbnUiLCJibHVyIiwibWF4SGVpZ2h0IiwicmVzdWx0IiwibnVtT2ZFbGVtcyIsInVud3JhcCIsInRhcmdldElEIiwiJHRhcmdldE1lbnUiLCIkdG9nZ2xlciIsImlucHV0IiwiYW5pbWF0aW9uSW4iLCJhbmltYXRpb25PdXQiLCJfdXBkYXRlIiwiX3VwZGF0ZU1xSGFuZGxlciIsInRvZ2dsZU1lbnUiLCJoaWRlRm9yIiwiY2FjaGVkIiwibXEiLCJpc01vYmlsZSIsIm1vYmlsZVNuaWZmIiwiZnVsbFNjcmVlbiIsIl9tYWtlT3ZlcmxheSIsImRldGFjaCIsImFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlcyIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsIm1hcmdpbiIsIl91cGRhdGVQb3NpdGlvbiIsIl9oYW5kbGVTdGF0ZSIsIm11bHRpcGxlT3BlbmVkIiwiYWRkUmV2ZWFsT3BlbkNsYXNzZXMiLCJvcmlnaW5hbFNjcm9sbFBvcyIsImFmdGVyQW5pbWF0aW9uIiwiZm9jdXNhYmxlRWxlbWVudHMiLCJzaG93RGVsYXkiLCJfZXh0cmFIYW5kbGVycyIsImNsb3NlT25Fc2MiLCJmaW5pc2hVcCIsImhpZGVEZWxheSIsInJlc2V0T25DbG9zZSIsInRpdGxlIiwiaHJlZiIsImJ0bU9mZnNldFBjdCIsImlQaG9uZVNuaWZmIiwiYW5kcm9pZFNuaWZmIiwiJGNvbnRhaW5lciIsIndhc1dyYXBwZWQiLCJjb250YWluZXIiLCJjb250YWluZXJDbGFzcyIsInN0aWNreUNsYXNzIiwic2Nyb2xsQ291bnQiLCJjaGVja0V2ZXJ5IiwiaXNTdHVjayIsImNvbnRhaW5lckhlaWdodCIsImVsZW1IZWlnaHQiLCJfcGFyc2VQb2ludHMiLCJfc2V0U2l6ZXMiLCJzY3JvbGwiLCJfY2FsYyIsIl9yZW1vdmVTdGlja3kiLCJ0b3BQb2ludCIsInJldmVyc2UiLCJ0b3BBbmNob3IiLCJidG0iLCJidG1BbmNob3IiLCJwdHMiLCJicmVha3MiLCJwbGFjZSIsImNhblN0aWNrIiwiX2V2ZW50c0hhbmRsZXIiLCJfcGF1c2VMaXN0ZW5lcnMiLCJjaGVja1NpemVzIiwiYm90dG9tUG9pbnQiLCJfc2V0U3RpY2t5Iiwic3RpY2tUbyIsIm1yZ24iLCJub3RTdHVja1RvIiwiaXNUb3AiLCJzdGlja1RvVG9wIiwiYW5jaG9yUHQiLCJhbmNob3JIZWlnaHQiLCJ0b3BPckJvdHRvbSIsInN0aWNreU9uIiwibmV3RWxlbVdpZHRoIiwiY29tcCIsInBkbmdsIiwicGRuZ3IiLCJuZXdDb250YWluZXJIZWlnaHQiLCJfc2V0QnJlYWtQb2ludHMiLCJtVG9wIiwiZW1DYWxjIiwibWFyZ2luVG9wIiwibUJ0bSIsIm1hcmdpbkJvdHRvbSIsImJvdHRvbSIsImVtIiwiZm9udFNpemUiLCJfdXBkYXRlQVJJQSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnQkFBZ0I7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFD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Qjs7Ozs7O0FBTUEzRixXQUFTO0FBUFEsQ0FBbkI7O1FBVVF1TSxPLEdBQUFBLE8iLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM2MWJiMWQxNzhhZTVlMTJhN2FjIiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqUXVlcnlcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vLyBDb3JlIEZvdW5kYXRpb24gVXRpbGl0aWVzLCB1dGlsaXplZCBpbiBhIG51bWJlciBvZiBwbGFjZXMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGZvciBSVEwgc3VwcG9ydFxuICAgKi9cbmZ1bmN0aW9uIHJ0bCgpIHtcbiAgcmV0dXJuICQoJ2h0bWwnKS5hdHRyKCdkaXInKSA9PT0gJ3J0bCc7XG59XG5cbi8qKlxuICogcmV0dXJucyBhIHJhbmRvbSBiYXNlLTM2IHVpZCB3aXRoIG5hbWVzcGFjaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXIgb2YgcmFuZG9tIGJhc2UtMzYgZGlnaXRzIGRlc2lyZWQuIEluY3JlYXNlIGZvciBtb3JlIHJhbmRvbSBzdHJpbmdzLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSAtIG5hbWUgb2YgcGx1Z2luIHRvIGJlIGluY29ycG9yYXRlZCBpbiB1aWQsIG9wdGlvbmFsLlxuICogQGRlZmF1bHQge1N0cmluZ30gJycgLSBpZiBubyBwbHVnaW4gbmFtZSBpcyBwcm92aWRlZCwgbm90aGluZyBpcyBhcHBlbmRlZCB0byB0aGUgdWlkLlxuICogQHJldHVybnMge1N0cmluZ30gLSB1bmlxdWUgaWRcbiAqL1xuZnVuY3Rpb24gR2V0WW9EaWdpdHMobGVuZ3RoLCBuYW1lc3BhY2Upe1xuICBsZW5ndGggPSBsZW5ndGggfHwgNjtcbiAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgucG93KDM2LCBsZW5ndGggKyAxKSAtIE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygzNiwgbGVuZ3RoKSkpLnRvU3RyaW5nKDM2KS5zbGljZSgxKSArIChuYW1lc3BhY2UgPyBgLSR7bmFtZXNwYWNlfWAgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25lbmQoJGVsZW0pe1xuICB2YXIgdHJhbnNpdGlvbnMgPSB7XG4gICAgJ3RyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ1dlYmtpdFRyYW5zaXRpb24nOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgJ01velRyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ09UcmFuc2l0aW9uJzogJ290cmFuc2l0aW9uZW5kJ1xuICB9O1xuICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgZW5kO1xuXG4gIGZvciAodmFyIHQgaW4gdHJhbnNpdGlvbnMpe1xuICAgIGlmICh0eXBlb2YgZWxlbS5zdHlsZVt0XSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgZW5kID0gdHJhbnNpdGlvbnNbdF07XG4gICAgfVxuICB9XG4gIGlmKGVuZCl7XG4gICAgcmV0dXJuIGVuZDtcbiAgfWVsc2V7XG4gICAgZW5kID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJGVsZW0udHJpZ2dlckhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCBbJGVsZW1dKTtcbiAgICB9LCAxKTtcbiAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQnO1xuICB9XG59XG5cbmV4cG9ydCB7cnRsLCBHZXRZb0RpZ2l0cywgdHJhbnNpdGlvbmVuZH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuY29yZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5cbi8vIEFic3RyYWN0IGNsYXNzIGZvciBwcm92aWRpbmcgbGlmZWN5Y2xlIGhvb2tzLiBFeHBlY3QgcGx1Z2lucyB0byBkZWZpbmUgQVQgTEVBU1Rcbi8vIHtmdW5jdGlvbn0gX3NldHVwIChyZXBsYWNlcyBwcmV2aW91cyBjb25zdHJ1Y3RvciksXG4vLyB7ZnVuY3Rpb259IF9kZXN0cm95IChyZXBsYWNlcyBwcmV2aW91cyBkZXN0cm95KVxuY2xhc3MgUGx1Z2luIHtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5fc2V0dXAoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBnZXRQbHVnaW5OYW1lKHRoaXMpO1xuICAgIHRoaXMudXVpZCA9IEdldFlvRGlnaXRzKDYsIHBsdWdpbk5hbWUpO1xuXG4gICAgaWYoIXRoaXMuJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkpeyB0aGlzLiRlbGVtZW50LmF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWAsIHRoaXMudXVpZCk7IH1cbiAgICBpZighdGhpcy4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpKXsgdGhpcy4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicsIHRoaXMpOyB9XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cbiAgICAgKiBAZXZlbnQgUGx1Z2luI2luaXRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoYGluaXQuemYuJHtwbHVnaW5OYW1lfWApO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBnZXRQbHVnaW5OYW1lKHRoaXMpO1xuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkucmVtb3ZlRGF0YSgnemZQbHVnaW4nKVxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAgICAgICAgICogQGV2ZW50IFBsdWdpbiNkZXN0cm95ZWRcbiAgICAgICAgICovXG4gICAgICAgIC50cmlnZ2VyKGBkZXN0cm95ZWQuemYuJHtwbHVnaW5OYW1lfWApO1xuICAgIGZvcih2YXIgcHJvcCBpbiB0aGlzKXtcbiAgICAgIHRoaXNbcHJvcF0gPSBudWxsOy8vY2xlYW4gdXAgc2NyaXB0IHRvIHByZXAgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICB9XG4gIH1cbn1cblxuLy8gQ29udmVydCBQYXNjYWxDYXNlIHRvIGtlYmFiLWNhc2Vcbi8vIFRoYW5rIHlvdTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvODk1NTU4MFxuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGdldFBsdWdpbk5hbWUob2JqKSB7XG4gIGlmKHR5cGVvZihvYmouY29uc3RydWN0b3IubmFtZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGh5cGhlbmF0ZShvYmouY29uc3RydWN0b3IubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGh5cGhlbmF0ZShvYmouY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5leHBvcnQge1BsdWdpbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnBsdWdpbi5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLy8gRGVmYXVsdCBzZXQgb2YgbWVkaWEgcXVlcmllc1xuY29uc3QgZGVmYXVsdFF1ZXJpZXMgPSB7XG4gICdkZWZhdWx0JyA6ICdvbmx5IHNjcmVlbicsXG4gIGxhbmRzY2FwZSA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpJyxcbiAgcG9ydHJhaXQgOiAnb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpJyxcbiAgcmV0aW5hIDogJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIvMSksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDE5MmRwaSksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDJkcHB4KSdcbiAgfTtcblxuXG4vLyBtYXRjaE1lZGlhKCkgcG9seWZpbGwgLSBUZXN0IGEgQ1NTIG1lZGlhIHR5cGUvcXVlcnkgaW4gSlMuXG4vLyBBdXRob3JzICYgY29weXJpZ2h0IChjKSAyMDEyOiBTY290dCBKZWhsLCBQYXVsIElyaXNoLCBOaWNob2xhcyBaYWthcywgRGF2aWQgS25pZ2h0LiBEdWFsIE1JVC9CU0QgbGljZW5zZVxubGV0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYSB8fCAoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IG1hdGNoTWVkaXVtIGFwaSBzdWNoIGFzIElFIDkgYW5kIHdlYmtpdFxuICB2YXIgc3R5bGVNZWRpYSA9ICh3aW5kb3cuc3R5bGVNZWRpYSB8fCB3aW5kb3cubWVkaWEpO1xuXG4gIC8vIEZvciB0aG9zZSB0aGF0IGRvbid0IHN1cHBvcnQgbWF0Y2hNZWRpdW1cbiAgaWYgKCFzdHlsZU1lZGlhKSB7XG4gICAgdmFyIHN0eWxlICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgIHNjcmlwdCAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdLFxuICAgIGluZm8gICAgICAgID0gbnVsbDtcblxuICAgIHN0eWxlLnR5cGUgID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZS5pZCAgICA9ICdtYXRjaG1lZGlhanMtdGVzdCc7XG5cbiAgICBzY3JpcHQgJiYgc2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0eWxlLCBzY3JpcHQpO1xuXG4gICAgLy8gJ3N0eWxlLmN1cnJlbnRTdHlsZScgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnd2luZG93LmdldENvbXB1dGVkU3R5bGUnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICBpbmZvID0gKCdnZXRDb21wdXRlZFN0eWxlJyBpbiB3aW5kb3cpICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN0eWxlLCBudWxsKSB8fCBzdHlsZS5jdXJyZW50U3R5bGU7XG5cbiAgICBzdHlsZU1lZGlhID0ge1xuICAgICAgbWF0Y2hNZWRpdW0obWVkaWEpIHtcbiAgICAgICAgdmFyIHRleHQgPSBgQG1lZGlhICR7bWVkaWF9eyAjbWF0Y2htZWRpYWpzLXRlc3QgeyB3aWR0aDogMXB4OyB9IH1gO1xuXG4gICAgICAgIC8vICdzdHlsZS5zdHlsZVNoZWV0JyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICdzdHlsZS50ZXh0Q29udGVudCcgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVzdCBpZiBtZWRpYSBxdWVyeSBpcyB0cnVlIG9yIGZhbHNlXG4gICAgICAgIHJldHVybiBpbmZvLndpZHRoID09PSAnMXB4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24obWVkaWEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWF0Y2hlczogc3R5bGVNZWRpYS5tYXRjaE1lZGl1bShtZWRpYSB8fCAnYWxsJyksXG4gICAgICBtZWRpYTogbWVkaWEgfHwgJ2FsbCdcbiAgICB9O1xuICB9XG59KSgpO1xuXG52YXIgTWVkaWFRdWVyeSA9IHtcbiAgcXVlcmllczogW10sXG5cbiAgY3VycmVudDogJycsXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtZWRpYSBxdWVyeSBoZWxwZXIsIGJ5IGV4dHJhY3RpbmcgdGhlIGJyZWFrcG9pbnQgbGlzdCBmcm9tIHRoZSBDU1MgYW5kIGFjdGl2YXRpbmcgdGhlIGJyZWFrcG9pbnQgd2F0Y2hlci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyICRtZXRhID0gJCgnbWV0YS5mb3VuZGF0aW9uLW1xJyk7XG4gICAgaWYoISRtZXRhLmxlbmd0aCl7XG4gICAgICAkKCc8bWV0YSBjbGFzcz1cImZvdW5kYXRpb24tbXFcIj4nKS5hcHBlbmRUbyhkb2N1bWVudC5oZWFkKTtcbiAgICB9XG5cbiAgICB2YXIgZXh0cmFjdGVkU3R5bGVzID0gJCgnLmZvdW5kYXRpb24tbXEnKS5jc3MoJ2ZvbnQtZmFtaWx5Jyk7XG4gICAgdmFyIG5hbWVkUXVlcmllcztcblxuICAgIG5hbWVkUXVlcmllcyA9IHBhcnNlU3R5bGVUb09iamVjdChleHRyYWN0ZWRTdHlsZXMpO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG5hbWVkUXVlcmllcykge1xuICAgICAgaWYobmFtZWRRdWVyaWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc2VsZi5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB2YWx1ZTogYG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke25hbWVkUXVlcmllc1trZXldfSlgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuX2dldEN1cnJlbnRTaXplKCk7XG5cbiAgICB0aGlzLl93YXRjaGVyKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIGlzIGF0IGxlYXN0IGFzIHdpZGUgYXMgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgaWYgaXQncyBzbWFsbGVyLlxuICAgKi9cbiAgYXRMZWFzdChzaXplKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5nZXQoc2l6ZSk7XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHJldHVybiBtYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gbWF0Y2hlcyB0byBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2ssIGVpdGhlciAnc21hbGwgb25seScgb3IgJ3NtYWxsJy4gT21pdHRpbmcgJ29ubHknIGZhbGxzIGJhY2sgdG8gdXNpbmcgYXRMZWFzdCgpIG1ldGhvZC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgYnJlYWtwb2ludCBtYXRjaGVzLCBgZmFsc2VgIGlmIGl0IGRvZXMgbm90LlxuICAgKi9cbiAgaXMoc2l6ZSkge1xuICAgIHNpemUgPSBzaXplLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgIGlmKHNpemUubGVuZ3RoID4gMSAmJiBzaXplWzFdID09PSAnb25seScpIHtcbiAgICAgIGlmKHNpemVbMF0gPT09IHRoaXMuX2dldEN1cnJlbnRTaXplKCkpIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hdExlYXN0KHNpemVbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1lZGlhIHF1ZXJ5IG9mIGEgYnJlYWtwb2ludC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gTmFtZSBvZiB0aGUgYnJlYWtwb2ludCB0byBnZXQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd8bnVsbH0gLSBUaGUgbWVkaWEgcXVlcnkgb2YgdGhlIGJyZWFrcG9pbnQsIG9yIGBudWxsYCBpZiB0aGUgYnJlYWtwb2ludCBkb2Vzbid0IGV4aXN0LlxuICAgKi9cbiAgZ2V0KHNpemUpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMucXVlcmllcykge1xuICAgICAgaWYodGhpcy5xdWVyaWVzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcbiAgICAgICAgaWYgKHNpemUgPT09IHF1ZXJ5Lm5hbWUpIHJldHVybiBxdWVyeS52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBicmVha3BvaW50IG5hbWUgYnkgdGVzdGluZyBldmVyeSBicmVha3BvaW50IGFuZCByZXR1cm5pbmcgdGhlIGxhc3Qgb25lIHRvIG1hdGNoICh0aGUgYmlnZ2VzdCBvbmUpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge1N0cmluZ30gTmFtZSBvZiB0aGUgY3VycmVudCBicmVha3BvaW50LlxuICAgKi9cbiAgX2dldEN1cnJlbnRTaXplKCkge1xuICAgIHZhciBtYXRjaGVkO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcblxuICAgICAgaWYgKG1hdGNoTWVkaWEocXVlcnkudmFsdWUpLm1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlZCA9IHF1ZXJ5O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWF0Y2hlZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBtYXRjaGVkLm5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBicmVha3BvaW50IHdhdGNoZXIsIHdoaWNoIGZpcmVzIGFuIGV2ZW50IG9uIHRoZSB3aW5kb3cgd2hlbmV2ZXIgdGhlIGJyZWFrcG9pbnQgY2hhbmdlcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfd2F0Y2hlcigpIHtcbiAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuemYubWVkaWFxdWVyeScpLm9uKCdyZXNpemUuemYubWVkaWFxdWVyeScsICgpID0+IHtcbiAgICAgIHZhciBuZXdTaXplID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKSwgY3VycmVudFNpemUgPSB0aGlzLmN1cnJlbnQ7XG5cbiAgICAgIGlmIChuZXdTaXplICE9PSBjdXJyZW50U2l6ZSkge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGN1cnJlbnQgbWVkaWEgcXVlcnlcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbmV3U2l6ZTtcblxuICAgICAgICAvLyBCcm9hZGNhc3QgdGhlIG1lZGlhIHF1ZXJ5IGNoYW5nZSBvbiB0aGUgd2luZG93XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBbbmV3U2l6ZSwgY3VycmVudFNpemVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuXG5cbi8vIFRoYW5rIHlvdTogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmdcbmZ1bmN0aW9uIHBhcnNlU3R5bGVUb09iamVjdChzdHIpIHtcbiAgdmFyIHN0eWxlT2JqZWN0ID0ge307XG5cbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICB9XG5cbiAgc3RyID0gc3RyLnRyaW0oKS5zbGljZSgxLCAtMSk7IC8vIGJyb3dzZXJzIHJlLXF1b3RlIHN0cmluZyBzdHlsZSB2YWx1ZXNcblxuICBpZiAoIXN0cikge1xuICAgIHJldHVybiBzdHlsZU9iamVjdDtcbiAgfVxuXG4gIHN0eWxlT2JqZWN0ID0gc3RyLnNwbGl0KCcmJykucmVkdWNlKGZ1bmN0aW9uKHJldCwgcGFyYW0pIHtcbiAgICB2YXIgcGFydHMgPSBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKS5zcGxpdCgnPScpO1xuICAgIHZhciBrZXkgPSBwYXJ0c1swXTtcbiAgICB2YXIgdmFsID0gcGFydHNbMV07XG4gICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleSk7XG5cbiAgICAvLyBtaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuICAgIC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcbiAgICB2YWwgPSB2YWwgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcblxuICAgIGlmICghcmV0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldFtrZXldID0gdmFsO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXRba2V5XSkpIHtcbiAgICAgIHJldFtrZXldLnB1c2godmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0W2tleV0gPSBbcmV0W2tleV0sIHZhbF07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH0sIHt9KTtcblxuICByZXR1cm4gc3R5bGVPYmplY3Q7XG59XG5cbmV4cG9ydCB7TWVkaWFRdWVyeX07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeS5qcyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICogVGhpcyB1dGlsIHdhcyBjcmVhdGVkIGJ5IE1hcml1cyBPbGJlcnR6ICpcbiAqIFBsZWFzZSB0aGFuayBNYXJpdXMgb24gR2l0SHViIC9vd2xiZXJ0eiAqXG4gKiBvciB0aGUgd2ViIGh0dHA6Ly93d3cubWFyaXVzb2xiZXJ0ei5kZS8gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IHJ0bCBhcyBSdGwgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuY29uc3Qga2V5Q29kZXMgPSB7XG4gIDk6ICdUQUInLFxuICAxMzogJ0VOVEVSJyxcbiAgMjc6ICdFU0NBUEUnLFxuICAzMjogJ1NQQUNFJyxcbiAgMzU6ICdFTkQnLFxuICAzNjogJ0hPTUUnLFxuICAzNzogJ0FSUk9XX0xFRlQnLFxuICAzODogJ0FSUk9XX1VQJyxcbiAgMzk6ICdBUlJPV19SSUdIVCcsXG4gIDQwOiAnQVJST1dfRE9XTidcbn1cblxudmFyIGNvbW1hbmRzID0ge31cblxuLy8gRnVuY3Rpb25zIHB1bGxlZCBvdXQgdG8gYmUgcmVmZXJlbmNlYWJsZSBmcm9tIGludGVybmFsc1xuZnVuY3Rpb24gZmluZEZvY3VzYWJsZSgkZWxlbWVudCkge1xuICBpZighJGVsZW1lbnQpIHtyZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuICRlbGVtZW50LmZpbmQoJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEkKHRoaXMpLmlzKCc6dmlzaWJsZScpIHx8ICQodGhpcykuYXR0cigndGFiaW5kZXgnKSA8IDApIHsgcmV0dXJuIGZhbHNlOyB9IC8vb25seSBoYXZlIHZpc2libGUgZWxlbWVudHMgYW5kIHRob3NlIHRoYXQgaGF2ZSBhIHRhYmluZGV4IGdyZWF0ZXIgb3IgZXF1YWwgMFxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VLZXkoZXZlbnQpIHtcbiAgdmFyIGtleSA9IGtleUNvZGVzW2V2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGVdIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQud2hpY2gpLnRvVXBwZXJDYXNlKCk7XG5cbiAgLy8gUmVtb3ZlIHVuLXByaW50YWJsZSBjaGFyYWN0ZXJzLCBlLmcuIGZvciBgZnJvbUNoYXJDb2RlYCBjYWxscyBmb3IgQ1RSTCBvbmx5IGV2ZW50c1xuICBrZXkgPSBrZXkucmVwbGFjZSgvXFxXKy8sICcnKTtcblxuICBpZiAoZXZlbnQuc2hpZnRLZXkpIGtleSA9IGBTSElGVF8ke2tleX1gO1xuICBpZiAoZXZlbnQuY3RybEtleSkga2V5ID0gYENUUkxfJHtrZXl9YDtcbiAgaWYgKGV2ZW50LmFsdEtleSkga2V5ID0gYEFMVF8ke2tleX1gO1xuXG4gIC8vIFJlbW92ZSB0cmFpbGluZyB1bmRlcnNjb3JlLCBpbiBjYXNlIG9ubHkgbW9kaWZpZXJzIHdlcmUgdXNlZCAoZS5nLiBvbmx5IGBDVFJMX0FMVGApXG4gIGtleSA9IGtleS5yZXBsYWNlKC9fJC8sICcnKTtcblxuICByZXR1cm4ga2V5O1xufVxuXG52YXIgS2V5Ym9hcmQgPSB7XG4gIGtleXM6IGdldEtleUNvZGVzKGtleUNvZGVzKSxcblxuICAvKipcbiAgICogUGFyc2VzIHRoZSAoa2V5Ym9hcmQpIGV2ZW50IGFuZCByZXR1cm5zIGEgU3RyaW5nIHRoYXQgcmVwcmVzZW50cyBpdHMga2V5XG4gICAqIENhbiBiZSB1c2VkIGxpa2UgRm91bmRhdGlvbi5wYXJzZUtleShldmVudCkgPT09IEZvdW5kYXRpb24ua2V5cy5TUEFDRVxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHJldHVybiBTdHJpbmcga2V5IC0gU3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUga2V5IHByZXNzZWRcbiAgICovXG4gIHBhcnNlS2V5OiBwYXJzZUtleSxcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZ2l2ZW4gKGtleWJvYXJkKSBldmVudFxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50J3MgbmFtZSwgZS5nLiBTbGlkZXIgb3IgUmV2ZWFsXG4gICAqIEBwYXJhbSB7T2JqZWN0c30gZnVuY3Rpb25zIC0gY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgdGhhdCBhcmUgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGhhbmRsZUtleShldmVudCwgY29tcG9uZW50LCBmdW5jdGlvbnMpIHtcbiAgICB2YXIgY29tbWFuZExpc3QgPSBjb21tYW5kc1tjb21wb25lbnRdLFxuICAgICAga2V5Q29kZSA9IHRoaXMucGFyc2VLZXkoZXZlbnQpLFxuICAgICAgY21kcyxcbiAgICAgIGNvbW1hbmQsXG4gICAgICBmbjtcblxuICAgIGlmICghY29tbWFuZExpc3QpIHJldHVybiBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCBub3QgZGVmaW5lZCEnKTtcblxuICAgIGlmICh0eXBlb2YgY29tbWFuZExpc3QubHRyID09PSAndW5kZWZpbmVkJykgeyAvLyB0aGlzIGNvbXBvbmVudCBkb2VzIG5vdCBkaWZmZXJlbnRpYXRlIGJldHdlZW4gbHRyIGFuZCBydGxcbiAgICAgICAgY21kcyA9IGNvbW1hbmRMaXN0OyAvLyB1c2UgcGxhaW4gbGlzdFxuICAgIH0gZWxzZSB7IC8vIG1lcmdlIGx0ciBhbmQgcnRsOiBpZiBkb2N1bWVudCBpcyBydGwsIHJ0bCBvdmVyd3JpdGVzIGx0ciBhbmQgdmljZSB2ZXJzYVxuICAgICAgICBpZiAoUnRsKCkpIGNtZHMgPSAkLmV4dGVuZCh7fSwgY29tbWFuZExpc3QubHRyLCBjb21tYW5kTGlzdC5ydGwpO1xuXG4gICAgICAgIGVsc2UgY21kcyA9ICQuZXh0ZW5kKHt9LCBjb21tYW5kTGlzdC5ydGwsIGNvbW1hbmRMaXN0Lmx0cik7XG4gICAgfVxuICAgIGNvbW1hbmQgPSBjbWRzW2tleUNvZGVdO1xuXG4gICAgZm4gPSBmdW5jdGlvbnNbY29tbWFuZF07XG4gICAgaWYgKGZuICYmIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBleGVjdXRlIGZ1bmN0aW9uICBpZiBleGlzdHNcbiAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGZuLmFwcGx5KCk7XG4gICAgICBpZiAoZnVuY3Rpb25zLmhhbmRsZWQgfHwgdHlwZW9mIGZ1bmN0aW9ucy5oYW5kbGVkID09PSAnZnVuY3Rpb24nKSB7IC8vIGV4ZWN1dGUgZnVuY3Rpb24gd2hlbiBldmVudCB3YXMgaGFuZGxlZFxuICAgICAgICAgIGZ1bmN0aW9ucy5oYW5kbGVkKHJldHVyblZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZ1bmN0aW9ucy51bmhhbmRsZWQgfHwgdHlwZW9mIGZ1bmN0aW9ucy51bmhhbmRsZWQgPT09ICdmdW5jdGlvbicpIHsgLy8gZXhlY3V0ZSBmdW5jdGlvbiB3aGVuIGV2ZW50IHdhcyBub3QgaGFuZGxlZFxuICAgICAgICAgIGZ1bmN0aW9ucy51bmhhbmRsZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIHRoZSBnaXZlbiBgJGVsZW1lbnRgXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gc2VhcmNoIHdpdGhpblxuICAgKiBAcmV0dXJuIHtqUXVlcnl9ICRmb2N1c2FibGUgLSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzIHdpdGhpbiBgJGVsZW1lbnRgXG4gICAqL1xuXG4gIGZpbmRGb2N1c2FibGU6IGZpbmRGb2N1c2FibGUsXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBuYW1lIG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50LCBlLmcuIFNsaWRlciBvciBSZXZlYWxcbiAgICogQHJldHVybiBTdHJpbmcgY29tcG9uZW50TmFtZVxuICAgKi9cblxuICByZWdpc3Rlcihjb21wb25lbnROYW1lLCBjbWRzKSB7XG4gICAgY29tbWFuZHNbY29tcG9uZW50TmFtZV0gPSBjbWRzO1xuICB9LFxuXG5cbiAgLy8gVE9ETzk0Mzg6IFRoZXNlIHJlZmVyZW5jZXMgdG8gS2V5Ym9hcmQgbmVlZCB0byBub3QgcmVxdWlyZSBnbG9iYWwuIFdpbGwgJ3RoaXMnIHdvcmsgaW4gdGhpcyBjb250ZXh0P1xuICAvL1xuICAvKipcbiAgICogVHJhcHMgdGhlIGZvY3VzIGluIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0gIHtqUXVlcnl9ICRlbGVtZW50ICBqUXVlcnkgb2JqZWN0IHRvIHRyYXAgdGhlIGZvdWNzIGludG8uXG4gICAqL1xuICB0cmFwRm9jdXMoJGVsZW1lbnQpIHtcbiAgICB2YXIgJGZvY3VzYWJsZSA9IGZpbmRGb2N1c2FibGUoJGVsZW1lbnQpLFxuICAgICAgICAkZmlyc3RGb2N1c2FibGUgPSAkZm9jdXNhYmxlLmVxKDApLFxuICAgICAgICAkbGFzdEZvY3VzYWJsZSA9ICRmb2N1c2FibGUuZXEoLTEpO1xuXG4gICAgJGVsZW1lbnQub24oJ2tleWRvd24uemYudHJhcGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT09ICRsYXN0Rm9jdXNhYmxlWzBdICYmIHBhcnNlS2V5KGV2ZW50KSA9PT0gJ1RBQicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGZpcnN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChldmVudC50YXJnZXQgPT09ICRmaXJzdEZvY3VzYWJsZVswXSAmJiBwYXJzZUtleShldmVudCkgPT09ICdTSElGVF9UQUInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRsYXN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgdHJhcHBlZCBmb2N1cyBmcm9tIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0gIHtqUXVlcnl9ICRlbGVtZW50ICBqUXVlcnkgb2JqZWN0IHRvIHJlbGVhc2UgdGhlIGZvY3VzIGZvci5cbiAgICovXG4gIHJlbGVhc2VGb2N1cygkZWxlbWVudCkge1xuICAgICRlbGVtZW50Lm9mZigna2V5ZG93bi56Zi50cmFwZm9jdXMnKTtcbiAgfVxufVxuXG4vKlxuICogQ29uc3RhbnRzIGZvciBlYXNpZXIgY29tcGFyaW5nLlxuICogQ2FuIGJlIHVzZWQgbGlrZSBGb3VuZGF0aW9uLnBhcnNlS2V5KGV2ZW50KSA9PT0gRm91bmRhdGlvbi5rZXlzLlNQQUNFXG4gKi9cbmZ1bmN0aW9uIGdldEtleUNvZGVzKGtjcykge1xuICB2YXIgayA9IHt9O1xuICBmb3IgKHZhciBrYyBpbiBrY3MpIGtba2NzW2tjXV0gPSBrY3Nba2NdO1xuICByZXR1cm4gaztcbn1cblxuZXhwb3J0IHtLZXlib2FyZH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuXG5jb25zdCBNdXRhdGlvbk9ic2VydmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByZWZpeGVzID0gWydXZWJLaXQnLCAnTW96JywgJ08nLCAnTXMnLCAnJ107XG4gIGZvciAodmFyIGk9MDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGAke3ByZWZpeGVzW2ldfU11dGF0aW9uT2JzZXJ2ZXJgIGluIHdpbmRvdykge1xuICAgICAgcmV0dXJuIHdpbmRvd1tgJHtwcmVmaXhlc1tpXX1NdXRhdGlvbk9ic2VydmVyYF07XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn0oKSk7XG5cbmNvbnN0IHRyaWdnZXJzID0gKGVsLCB0eXBlKSA9PiB7XG4gIGVsLmRhdGEodHlwZSkuc3BsaXQoJyAnKS5mb3JFYWNoKGlkID0+IHtcbiAgICAkKGAjJHtpZH1gKVsgdHlwZSA9PT0gJ2Nsb3NlJyA/ICd0cmlnZ2VyJyA6ICd0cmlnZ2VySGFuZGxlciddKGAke3R5cGV9LnpmLnRyaWdnZXJgLCBbZWxdKTtcbiAgfSk7XG59O1xuXG52YXIgVHJpZ2dlcnMgPSB7XG4gIExpc3RlbmVyczoge1xuICAgIEJhc2ljOiB7fSxcbiAgICBHbG9iYWw6IHt9XG4gIH0sXG4gIEluaXRpYWxpemVyczoge31cbn1cblxuVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljICA9IHtcbiAgb3Blbkxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICB0cmlnZ2VycygkKHRoaXMpLCAnb3BlbicpO1xuICB9LFxuICBjbG9zZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ2Nsb3NlJyk7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0cmlnZ2VycygkKHRoaXMpLCAnY2xvc2UnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlLnpmLnRyaWdnZXInKTtcbiAgICB9XG4gIH0sXG4gIHRvZ2dsZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ3RvZ2dsZScpO1xuICAgIGlmIChpZCkge1xuICAgICAgdHJpZ2dlcnMoJCh0aGlzKSwgJ3RvZ2dsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ3RvZ2dsZS56Zi50cmlnZ2VyJyk7XG4gICAgfVxuICB9LFxuICBjbG9zZWFibGVMaXN0ZW5lcjogZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IGFuaW1hdGlvbiA9ICQodGhpcykuZGF0YSgnY2xvc2FibGUnKTtcblxuICAgIGlmKGFuaW1hdGlvbiAhPT0gJycpe1xuICAgICAgTW90aW9uLmFuaW1hdGVPdXQoJCh0aGlzKSwgYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbG9zZWQuemYnKTtcbiAgICAgIH0pO1xuICAgIH1lbHNle1xuICAgICAgJCh0aGlzKS5mYWRlT3V0KCkudHJpZ2dlcignY2xvc2VkLnpmJyk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVGb2N1c0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ3RvZ2dsZS1mb2N1cycpO1xuICAgICQoYCMke2lkfWApLnRyaWdnZXJIYW5kbGVyKCd0b2dnbGUuemYudHJpZ2dlcicsIFskKHRoaXMpXSk7XG4gIH1cbn07XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtb3Blbl0gd2lsbCByZXZlYWwgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkT3Blbkxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5vcGVuTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1vcGVuXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5vcGVuTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLWNsb3NlXSB3aWxsIGNsb3NlIGEgcGx1Z2luIHRoYXQgc3VwcG9ydHMgaXQgd2hlbiBjbGlja2VkLlxuLy8gSWYgdXNlZCB3aXRob3V0IGEgdmFsdWUgb24gW2RhdGEtY2xvc2VdLCB0aGUgZXZlbnQgd2lsbCBidWJibGUsIGFsbG93aW5nIGl0IHRvIGNsb3NlIGEgcGFyZW50IGNvbXBvbmVudC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZUxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtY2xvc2VdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZV0gd2lsbCB0b2dnbGUgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtdG9nZ2xlXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2FibGVdIHdpbGwgcmVzcG9uZCB0byBjbG9zZS56Zi50cmlnZ2VyIGV2ZW50cy5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZWFibGVMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2Nsb3NlLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VhYmxlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xvc2UuemYudHJpZ2dlcicsICdbZGF0YS1jbG9zZWFibGVdLCBbZGF0YS1jbG9zYWJsZV0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VhYmxlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZS1mb2N1c10gd2lsbCByZXNwb25kIHRvIGNvbWluZyBpbiBhbmQgb3V0IG9mIGZvY3VzXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2ZvY3VzLnpmLnRyaWdnZXIgYmx1ci56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUZvY3VzTGlzdGVuZXIpO1xuICAkZWxlbS5vbignZm9jdXMuemYudHJpZ2dlciBibHVyLnpmLnRyaWdnZXInLCAnW2RhdGEtdG9nZ2xlLWZvY3VzXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVGb2N1c0xpc3RlbmVyKTtcbn1cblxuXG5cbi8vIE1vcmUgR2xvYmFsL2NvbXBsZXggbGlzdGVuZXJzIGFuZCB0cmlnZ2Vyc1xuVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbCAgPSB7XG4gIHJlc2l6ZUxpc3RlbmVyOiBmdW5jdGlvbigkbm9kZXMpIHtcbiAgICBpZighTXV0YXRpb25PYnNlcnZlcil7Ly9mYWxsYmFjayBmb3IgSUUgOVxuICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcigncmVzaXplbWUuemYudHJpZ2dlcicpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vdHJpZ2dlciBhbGwgbGlzdGVuaW5nIGVsZW1lbnRzIGFuZCBzaWduYWwgYSByZXNpemUgZXZlbnRcbiAgICAkbm9kZXMuYXR0cignZGF0YS1ldmVudHMnLCBcInJlc2l6ZVwiKTtcbiAgfSxcbiAgc2Nyb2xsTGlzdGVuZXI6IGZ1bmN0aW9uKCRub2Rlcykge1xuICAgIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsvL2ZhbGxiYWNrIGZvciBJRSA5XG4gICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIHNjcm9sbCBldmVudFxuICAgICRub2Rlcy5hdHRyKCdkYXRhLWV2ZW50cycsIFwic2Nyb2xsXCIpO1xuICB9LFxuICBjbG9zZU1lTGlzdGVuZXI6IGZ1bmN0aW9uKGUsIHBsdWdpbklkKXtcbiAgICBsZXQgcGx1Z2luID0gZS5uYW1lc3BhY2Uuc3BsaXQoJy4nKVswXTtcbiAgICBsZXQgcGx1Z2lucyA9ICQoYFtkYXRhLSR7cGx1Z2lufV1gKS5ub3QoYFtkYXRhLXlldGktYm94PVwiJHtwbHVnaW5JZH1cIl1gKTtcblxuICAgIHBsdWdpbnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcbiAgICAgIF90aGlzLnRyaWdnZXJIYW5kbGVyKCdjbG9zZS56Zi50cmlnZ2VyJywgW190aGlzXSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gR2xvYmFsLCBwYXJzZXMgd2hvbGUgZG9jdW1lbnQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VtZUxpc3RlbmVyID0gZnVuY3Rpb24ocGx1Z2luTmFtZSkge1xuICB2YXIgeWV0aUJveGVzID0gJCgnW2RhdGEteWV0aS1ib3hdJyksXG4gICAgICBwbHVnTmFtZXMgPSBbJ2Ryb3Bkb3duJywgJ3Rvb2x0aXAnLCAncmV2ZWFsJ107XG5cbiAgaWYocGx1Z2luTmFtZSl7XG4gICAgaWYodHlwZW9mIHBsdWdpbk5hbWUgPT09ICdzdHJpbmcnKXtcbiAgICAgIHBsdWdOYW1lcy5wdXNoKHBsdWdpbk5hbWUpO1xuICAgIH1lbHNlIGlmKHR5cGVvZiBwbHVnaW5OYW1lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGx1Z2luTmFtZVswXSA9PT0gJ3N0cmluZycpe1xuICAgICAgcGx1Z05hbWVzLmNvbmNhdChwbHVnaW5OYW1lKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsdWdpbiBuYW1lcyBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gIH1cbiAgaWYoeWV0aUJveGVzLmxlbmd0aCl7XG4gICAgbGV0IGxpc3RlbmVycyA9IHBsdWdOYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICAgIHJldHVybiBgY2xvc2VtZS56Zi4ke25hbWV9YDtcbiAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAkKHdpbmRvdykub2ZmKGxpc3RlbmVycykub24obGlzdGVuZXJzLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLmNsb3NlTWVMaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgdHJpZ2dlciwgbGlzdGVuZXIpIHtcbiAgbGV0IHRpbWVyLCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKTtcbiAgJCh3aW5kb3cpLm9mZih0cmlnZ2VyKS5vbih0cmlnZ2VyLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHRpbWVyKSB7IGNsZWFyVGltZW91dCh0aW1lcik7IH1cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIGRlYm91bmNlIHx8IDEwKTsvL2RlZmF1bHQgdGltZSB0byBlbWl0IHNjcm9sbCBldmVudFxuICB9KTtcbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24oZGVib3VuY2Upe1xuICBsZXQgJG5vZGVzID0gJCgnW2RhdGEtcmVzaXplXScpO1xuICBpZigkbm9kZXMubGVuZ3RoKXtcbiAgICBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCAncmVzaXplLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLnJlc2l6ZUxpc3RlbmVyLCAkbm9kZXMpO1xuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uKGRlYm91bmNlKXtcbiAgbGV0ICRub2RlcyA9ICQoJ1tkYXRhLXNjcm9sbF0nKTtcbiAgaWYoJG5vZGVzLmxlbmd0aCl7XG4gICAgZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgJ3Njcm9sbC56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbC5zY3JvbGxMaXN0ZW5lciwgJG5vZGVzKTtcbiAgfVxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkTXV0YXRpb25FdmVudHNMaXN0ZW5lciA9IGZ1bmN0aW9uKCRlbGVtKSB7XG4gIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsgcmV0dXJuIGZhbHNlOyB9XG4gIGxldCAkbm9kZXMgPSAkZWxlbS5maW5kKCdbZGF0YS1yZXNpemVdLCBbZGF0YS1zY3JvbGxdLCBbZGF0YS1tdXRhdGVdJyk7XG5cbiAgLy9lbGVtZW50IGNhbGxiYWNrXG4gIHZhciBsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uID0gZnVuY3Rpb24gKG11dGF0aW9uUmVjb3Jkc0xpc3QpIHtcbiAgICB2YXIgJHRhcmdldCA9ICQobXV0YXRpb25SZWNvcmRzTGlzdFswXS50YXJnZXQpO1xuXG4gICAgLy90cmlnZ2VyIHRoZSBldmVudCBoYW5kbGVyIGZvciB0aGUgZWxlbWVudCBkZXBlbmRpbmcgb24gdHlwZVxuICAgIHN3aXRjaCAobXV0YXRpb25SZWNvcmRzTGlzdFswXS50eXBlKSB7XG4gICAgICBjYXNlIFwiYXR0cmlidXRlc1wiOlxuICAgICAgICBpZiAoJHRhcmdldC5hdHRyKFwiZGF0YS1ldmVudHNcIikgPT09IFwic2Nyb2xsXCIgJiYgbXV0YXRpb25SZWNvcmRzTGlzdFswXS5hdHRyaWJ1dGVOYW1lID09PSBcImRhdGEtZXZlbnRzXCIpIHtcbiAgICAgICAgICAkdGFyZ2V0LnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXQsIHdpbmRvdy5wYWdlWU9mZnNldF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkdGFyZ2V0LmF0dHIoXCJkYXRhLWV2ZW50c1wiKSA9PT0gXCJyZXNpemVcIiAmJiBtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwiZGF0YS1ldmVudHNcIikge1xuICAgICAgICAgICR0YXJnZXQudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldF0pO1xuICAgICAgICAgfVxuICAgICAgICBpZiAobXV0YXRpb25SZWNvcmRzTGlzdFswXS5hdHRyaWJ1dGVOYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLmF0dHIoXCJkYXRhLWV2ZW50c1wiLFwibXV0YXRlXCIpO1xuICAgICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikudHJpZ2dlckhhbmRsZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKV0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiY2hpbGRMaXN0XCI6XG4gICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikuYXR0cihcImRhdGEtZXZlbnRzXCIsXCJtdXRhdGVcIik7XG4gICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikudHJpZ2dlckhhbmRsZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKV0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy9ub3RoaW5nXG4gICAgfVxuICB9O1xuXG4gIGlmICgkbm9kZXMubGVuZ3RoKSB7XG4gICAgLy9mb3IgZWFjaCBlbGVtZW50IHRoYXQgbmVlZHMgdG8gbGlzdGVuIGZvciByZXNpemluZywgc2Nyb2xsaW5nLCBvciBtdXRhdGlvbiBhZGQgYSBzaW5nbGUgb2JzZXJ2ZXJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAkbm9kZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICB2YXIgZWxlbWVudE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobGlzdGVuaW5nRWxlbWVudHNNdXRhdGlvbik7XG4gICAgICBlbGVtZW50T2JzZXJ2ZXIub2JzZXJ2ZSgkbm9kZXNbaV0sIHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiBmYWxzZSwgc3VidHJlZTogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiBbXCJkYXRhLWV2ZW50c1wiLCBcInN0eWxlXCJdIH0pO1xuICAgIH1cbiAgfVxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2ltcGxlTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkT3Blbkxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZUxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VhYmxlTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFRvZ2dsZUZvY3VzTGlzdGVuZXIoJGRvY3VtZW50KTtcblxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFJlc2l6ZUxpc3RlbmVyKCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTY3JvbGxMaXN0ZW5lcigpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VtZUxpc3RlbmVyKCk7XG59XG5cblxuVHJpZ2dlcnMuaW5pdCA9IGZ1bmN0aW9uKCQsIEZvdW5kYXRpb24pIHtcbiAgaWYgKHR5cGVvZigkLnRyaWdnZXJzSW5pdGlhbGl6ZWQpID09PSAndW5kZWZpbmVkJykge1xuICAgIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICAgIGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNpbXBsZUxpc3RlbmVycygpO1xuICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVycygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHdpbmRvdykub24oJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTaW1wbGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAkLnRyaWdnZXJzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYoRm91bmRhdGlvbikge1xuICAgIEZvdW5kYXRpb24uVHJpZ2dlcnMgPSBUcmlnZ2VycztcbiAgICAvLyBMZWdhY3kgaW5jbHVkZWQgdG8gYmUgYmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIG5vdy5cbiAgICBGb3VuZGF0aW9uLklIZWFyWW91ID0gVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVyc1xuICB9XG59XG5cbmV4cG9ydCB7VHJpZ2dlcnN9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgdHJhbnNpdGlvbmVuZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuXG4vKipcbiAqIE1vdGlvbiBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ubW90aW9uXG4gKi9cblxuY29uc3QgaW5pdENsYXNzZXMgICA9IFsnbXVpLWVudGVyJywgJ211aS1sZWF2ZSddO1xuY29uc3QgYWN0aXZlQ2xhc3NlcyA9IFsnbXVpLWVudGVyLWFjdGl2ZScsICdtdWktbGVhdmUtYWN0aXZlJ107XG5cbmNvbnN0IE1vdGlvbiA9IHtcbiAgYW5pbWF0ZUluOiBmdW5jdGlvbihlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gICAgYW5pbWF0ZSh0cnVlLCBlbGVtZW50LCBhbmltYXRpb24sIGNiKTtcbiAgfSxcblxuICBhbmltYXRlT3V0OiBmdW5jdGlvbihlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gICAgYW5pbWF0ZShmYWxzZSwgZWxlbWVudCwgYW5pbWF0aW9uLCBjYik7XG4gIH1cbn1cblxuZnVuY3Rpb24gTW92ZShkdXJhdGlvbiwgZWxlbSwgZm4pe1xuICB2YXIgYW5pbSwgcHJvZywgc3RhcnQgPSBudWxsO1xuICAvLyBjb25zb2xlLmxvZygnY2FsbGVkJyk7XG5cbiAgaWYgKGR1cmF0aW9uID09PSAwKSB7XG4gICAgZm4uYXBwbHkoZWxlbSk7XG4gICAgZWxlbS50cmlnZ2VyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKS50cmlnZ2VySGFuZGxlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZSh0cyl7XG4gICAgaWYoIXN0YXJ0KSBzdGFydCA9IHRzO1xuICAgIC8vIGNvbnNvbGUubG9nKHN0YXJ0LCB0cyk7XG4gICAgcHJvZyA9IHRzIC0gc3RhcnQ7XG4gICAgZm4uYXBwbHkoZWxlbSk7XG5cbiAgICBpZihwcm9nIDwgZHVyYXRpb24peyBhbmltID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtb3ZlLCBlbGVtKTsgfVxuICAgIGVsc2V7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbSk7XG4gICAgICBlbGVtLnRyaWdnZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pLnRyaWdnZXJIYW5kbGVyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKTtcbiAgICB9XG4gIH1cbiAgYW5pbSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobW92ZSk7XG59XG5cbi8qKlxuICogQW5pbWF0ZXMgYW4gZWxlbWVudCBpbiBvciBvdXQgdXNpbmcgYSBDU1MgdHJhbnNpdGlvbiBjbGFzcy5cbiAqIEBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbiAtIERlZmluZXMgaWYgdGhlIGFuaW1hdGlvbiBpcyBpbiBvciBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvciBIVE1MIG9iamVjdCB0byBhbmltYXRlLlxuICogQHBhcmFtIHtTdHJpbmd9IGFuaW1hdGlvbiAtIENTUyBjbGFzcyB0byB1c2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIENhbGxiYWNrIHRvIHJ1biB3aGVuIGFuaW1hdGlvbiBpcyBmaW5pc2hlZC5cbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZShpc0luLCBlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gIGVsZW1lbnQgPSAkKGVsZW1lbnQpLmVxKDApO1xuXG4gIGlmICghZWxlbWVudC5sZW5ndGgpIHJldHVybjtcblxuICB2YXIgaW5pdENsYXNzID0gaXNJbiA/IGluaXRDbGFzc2VzWzBdIDogaW5pdENsYXNzZXNbMV07XG4gIHZhciBhY3RpdmVDbGFzcyA9IGlzSW4gPyBhY3RpdmVDbGFzc2VzWzBdIDogYWN0aXZlQ2xhc3Nlc1sxXTtcblxuICAvLyBTZXQgdXAgdGhlIGFuaW1hdGlvblxuICByZXNldCgpO1xuXG4gIGVsZW1lbnRcbiAgICAuYWRkQ2xhc3MoYW5pbWF0aW9uKVxuICAgIC5jc3MoJ3RyYW5zaXRpb24nLCAnbm9uZScpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgZWxlbWVudC5hZGRDbGFzcyhpbml0Q2xhc3MpO1xuICAgIGlmIChpc0luKSBlbGVtZW50LnNob3coKTtcbiAgfSk7XG5cbiAgLy8gU3RhcnQgdGhlIGFuaW1hdGlvblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGg7XG4gICAgZWxlbWVudFxuICAgICAgLmNzcygndHJhbnNpdGlvbicsICcnKVxuICAgICAgLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgfSk7XG5cbiAgLy8gQ2xlYW4gdXAgdGhlIGFuaW1hdGlvbiB3aGVuIGl0IGZpbmlzaGVzXG4gIGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQoZWxlbWVudCksIGZpbmlzaCk7XG5cbiAgLy8gSGlkZXMgdGhlIGVsZW1lbnQgKGZvciBvdXQgYW5pbWF0aW9ucyksIHJlc2V0cyB0aGUgZWxlbWVudCwgYW5kIHJ1bnMgYSBjYWxsYmFja1xuICBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgaWYgKCFpc0luKSBlbGVtZW50LmhpZGUoKTtcbiAgICByZXNldCgpO1xuICAgIGlmIChjYikgY2IuYXBwbHkoZWxlbWVudCk7XG4gIH1cblxuICAvLyBSZXNldHMgdHJhbnNpdGlvbnMgYW5kIHJlbW92ZXMgbW90aW9uLXNwZWNpZmljIGNsYXNzZXNcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgZWxlbWVudFswXS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAwO1xuICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7aW5pdENsYXNzfSAke2FjdGl2ZUNsYXNzfSAke2FuaW1hdGlvbn1gKTtcbiAgfVxufVxuXG5leHBvcnQge01vdmUsIE1vdGlvbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24uanMiLCIndXNlIHN0cmljdCc7XG5cblxuaW1wb3J0IHsgcnRsIGFzIFJ0bCB9IGZyb20gXCIuL2ZvdW5kYXRpb24udXRpbC5jb3JlXCI7XG5cbnZhciBCb3ggPSB7XG4gIEltTm90VG91Y2hpbmdZb3U6IEltTm90VG91Y2hpbmdZb3UsXG4gIE92ZXJsYXBBcmVhOiBPdmVybGFwQXJlYSxcbiAgR2V0RGltZW5zaW9uczogR2V0RGltZW5zaW9ucyxcbiAgR2V0T2Zmc2V0czogR2V0T2Zmc2V0cyxcbiAgR2V0RXhwbGljaXRPZmZzZXRzOiBHZXRFeHBsaWNpdE9mZnNldHNcbn1cblxuLyoqXG4gKiBDb21wYXJlcyB0aGUgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50IHRvIGEgY29udGFpbmVyIGFuZCBkZXRlcm1pbmVzIGNvbGxpc2lvbiBldmVudHMgd2l0aCBjb250YWluZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byB0ZXN0IGZvciBjb2xsaXNpb25zLlxuICogQHBhcmFtIHtqUXVlcnl9IHBhcmVudCAtIGpRdWVyeSBvYmplY3QgdG8gdXNlIGFzIGJvdW5kaW5nIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbHJPbmx5IC0gc2V0IHRvIHRydWUgdG8gY2hlY2sgbGVmdCBhbmQgcmlnaHQgdmFsdWVzIG9ubHkuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRiT25seSAtIHNldCB0byB0cnVlIHRvIGNoZWNrIHRvcCBhbmQgYm90dG9tIHZhbHVlcyBvbmx5LlxuICogQGRlZmF1bHQgaWYgbm8gcGFyZW50IG9iamVjdCBwYXNzZWQsIGRldGVjdHMgY29sbGlzaW9ucyB3aXRoIGB3aW5kb3dgLlxuICogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiBjb2xsaXNpb24gZnJlZSwgZmFsc2UgaWYgYSBjb2xsaXNpb24gaW4gYW55IGRpcmVjdGlvbi5cbiAqL1xuZnVuY3Rpb24gSW1Ob3RUb3VjaGluZ1lvdShlbGVtZW50LCBwYXJlbnQsIGxyT25seSwgdGJPbmx5LCBpZ25vcmVCb3R0b20pIHtcbiAgcmV0dXJuIE92ZXJsYXBBcmVhKGVsZW1lbnQsIHBhcmVudCwgbHJPbmx5LCB0Yk9ubHksIGlnbm9yZUJvdHRvbSkgPT09IDA7XG59O1xuXG5mdW5jdGlvbiBPdmVybGFwQXJlYShlbGVtZW50LCBwYXJlbnQsIGxyT25seSwgdGJPbmx5LCBpZ25vcmVCb3R0b20pIHtcbiAgdmFyIGVsZURpbXMgPSBHZXREaW1lbnNpb25zKGVsZW1lbnQpLFxuICB0b3BPdmVyLCBib3R0b21PdmVyLCBsZWZ0T3ZlciwgcmlnaHRPdmVyO1xuICBpZiAocGFyZW50KSB7XG4gICAgdmFyIHBhckRpbXMgPSBHZXREaW1lbnNpb25zKHBhcmVudCk7XG5cbiAgICBib3R0b21PdmVyID0gKHBhckRpbXMuaGVpZ2h0ICsgcGFyRGltcy5vZmZzZXQudG9wKSAtIChlbGVEaW1zLm9mZnNldC50b3AgKyBlbGVEaW1zLmhlaWdodCk7XG4gICAgdG9wT3ZlciAgICA9IGVsZURpbXMub2Zmc2V0LnRvcCAtIHBhckRpbXMub2Zmc2V0LnRvcDtcbiAgICBsZWZ0T3ZlciAgID0gZWxlRGltcy5vZmZzZXQubGVmdCAtIHBhckRpbXMub2Zmc2V0LmxlZnQ7XG4gICAgcmlnaHRPdmVyICA9IChwYXJEaW1zLndpZHRoICsgcGFyRGltcy5vZmZzZXQubGVmdCkgLSAoZWxlRGltcy5vZmZzZXQubGVmdCArIGVsZURpbXMud2lkdGgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGJvdHRvbU92ZXIgPSAoZWxlRGltcy53aW5kb3dEaW1zLmhlaWdodCArIGVsZURpbXMud2luZG93RGltcy5vZmZzZXQudG9wKSAtIChlbGVEaW1zLm9mZnNldC50b3AgKyBlbGVEaW1zLmhlaWdodCk7XG4gICAgdG9wT3ZlciAgICA9IGVsZURpbXMub2Zmc2V0LnRvcCAtIGVsZURpbXMud2luZG93RGltcy5vZmZzZXQudG9wO1xuICAgIGxlZnRPdmVyICAgPSBlbGVEaW1zLm9mZnNldC5sZWZ0IC0gZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC5sZWZ0O1xuICAgIHJpZ2h0T3ZlciAgPSBlbGVEaW1zLndpbmRvd0RpbXMud2lkdGggLSAoZWxlRGltcy5vZmZzZXQubGVmdCArIGVsZURpbXMud2lkdGgpO1xuICB9XG5cbiAgYm90dG9tT3ZlciA9IGlnbm9yZUJvdHRvbSA/IDAgOiBNYXRoLm1pbihib3R0b21PdmVyLCAwKTtcbiAgdG9wT3ZlciAgICA9IE1hdGgubWluKHRvcE92ZXIsIDApO1xuICBsZWZ0T3ZlciAgID0gTWF0aC5taW4obGVmdE92ZXIsIDApO1xuICByaWdodE92ZXIgID0gTWF0aC5taW4ocmlnaHRPdmVyLCAwKTtcblxuICBpZiAobHJPbmx5KSB7XG4gICAgcmV0dXJuIGxlZnRPdmVyICsgcmlnaHRPdmVyO1xuICB9XG4gIGlmICh0Yk9ubHkpIHtcbiAgICByZXR1cm4gdG9wT3ZlciArIGJvdHRvbU92ZXI7XG4gIH1cblxuICAvLyB1c2Ugc3VtIG9mIHNxdWFyZXMgYi9jIHdlIGNhcmUgYWJvdXQgb3ZlcmxhcCBhcmVhLlxuICByZXR1cm4gTWF0aC5zcXJ0KCh0b3BPdmVyICogdG9wT3ZlcikgKyAoYm90dG9tT3ZlciAqIGJvdHRvbU92ZXIpICsgKGxlZnRPdmVyICogbGVmdE92ZXIpICsgKHJpZ2h0T3ZlciAqIHJpZ2h0T3ZlcikpO1xufVxuXG4vKipcbiAqIFVzZXMgbmF0aXZlIG1ldGhvZHMgdG8gcmV0dXJuIGFuIG9iamVjdCBvZiBkaW1lbnNpb24gdmFsdWVzLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2pRdWVyeSB8fCBIVE1MfSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCBvciBET00gZWxlbWVudCBmb3Igd2hpY2ggdG8gZ2V0IHRoZSBkaW1lbnNpb25zLiBDYW4gYmUgYW55IGVsZW1lbnQgb3RoZXIgdGhhdCBkb2N1bWVudCBvciB3aW5kb3cuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIG5lc3RlZCBvYmplY3Qgb2YgaW50ZWdlciBwaXhlbCB2YWx1ZXNcbiAqIFRPRE8gLSBpZiBlbGVtZW50IGlzIHdpbmRvdywgcmV0dXJuIG9ubHkgdGhvc2UgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBHZXREaW1lbnNpb25zKGVsZW0pe1xuICBlbGVtID0gZWxlbS5sZW5ndGggPyBlbGVtWzBdIDogZWxlbTtcblxuICBpZiAoZWxlbSA9PT0gd2luZG93IHx8IGVsZW0gPT09IGRvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSSdtIHNvcnJ5LCBEYXZlLiBJJ20gYWZyYWlkIEkgY2FuJ3QgZG8gdGhhdC5cIik7XG4gIH1cblxuICB2YXIgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBwYXJSZWN0ID0gZWxlbS5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgd2luUmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB3aW5ZID0gd2luZG93LnBhZ2VZT2Zmc2V0LFxuICAgICAgd2luWCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0b3A6IHJlY3QudG9wICsgd2luWSxcbiAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpblhcbiAgICB9LFxuICAgIHBhcmVudERpbXM6IHtcbiAgICAgIHdpZHRoOiBwYXJSZWN0LndpZHRoLFxuICAgICAgaGVpZ2h0OiBwYXJSZWN0LmhlaWdodCxcbiAgICAgIG9mZnNldDoge1xuICAgICAgICB0b3A6IHBhclJlY3QudG9wICsgd2luWSxcbiAgICAgICAgbGVmdDogcGFyUmVjdC5sZWZ0ICsgd2luWFxuICAgICAgfVxuICAgIH0sXG4gICAgd2luZG93RGltczoge1xuICAgICAgd2lkdGg6IHdpblJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IHdpblJlY3QuaGVpZ2h0LFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHRvcDogd2luWSxcbiAgICAgICAgbGVmdDogd2luWFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHRvcCBhbmQgbGVmdCBpbnRlZ2VyIHBpeGVsIHZhbHVlcyBmb3IgZHluYW1pY2FsbHkgcmVuZGVyZWQgZWxlbWVudHMsXG4gKiBzdWNoIGFzOiBUb29sdGlwLCBSZXZlYWwsIGFuZCBEcm9wZG93bi4gTWFpbnRhaW5lZCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHksIGFuZCB3aGVyZVxuICogeW91IGRvbid0IGtub3cgYWxpZ25tZW50LCBidXQgZ2VuZXJhbGx5IGZyb21cbiAqIDYuNCBmb3J3YXJkIHlvdSBzaG91bGQgdXNlIEdldEV4cGxpY2l0T2Zmc2V0cywgYXMgR2V0T2Zmc2V0cyBjb25mbGF0ZXMgcG9zaXRpb24gYW5kIGFsaWdubWVudC5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IGZvciB0aGUgZWxlbWVudCBiZWluZyBwb3NpdGlvbmVkLlxuICogQHBhcmFtIHtqUXVlcnl9IGFuY2hvciAtIGpRdWVyeSBvYmplY3QgZm9yIHRoZSBlbGVtZW50J3MgYW5jaG9yIHBvaW50LlxuICogQHBhcmFtIHtTdHJpbmd9IHBvc2l0aW9uIC0gYSBzdHJpbmcgcmVsYXRpbmcgdG8gdGhlIGRlc2lyZWQgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnQsIHJlbGF0aXZlIHRvIGl0J3MgYW5jaG9yXG4gKiBAcGFyYW0ge051bWJlcn0gdk9mZnNldCAtIGludGVnZXIgcGl4ZWwgdmFsdWUgb2YgZGVzaXJlZCB2ZXJ0aWNhbCBzZXBhcmF0aW9uIGJldHdlZW4gYW5jaG9yIGFuZCBlbGVtZW50LlxuICogQHBhcmFtIHtOdW1iZXJ9IGhPZmZzZXQgLSBpbnRlZ2VyIHBpeGVsIHZhbHVlIG9mIGRlc2lyZWQgaG9yaXpvbnRhbCBzZXBhcmF0aW9uIGJldHdlZW4gYW5jaG9yIGFuZCBlbGVtZW50LlxuICogQHBhcmFtIHtCb29sZWFufSBpc092ZXJmbG93IC0gaWYgYSBjb2xsaXNpb24gZXZlbnQgaXMgZGV0ZWN0ZWQsIHNldHMgdG8gdHJ1ZSB0byBkZWZhdWx0IHRoZSBlbGVtZW50IHRvIGZ1bGwgd2lkdGggLSBhbnkgZGVzaXJlZCBvZmZzZXQuXG4gKiBUT0RPIGFsdGVyL3Jld3JpdGUgdG8gd29yayB3aXRoIGBlbWAgdmFsdWVzIGFzIHdlbGwvaW5zdGVhZCBvZiBwaXhlbHNcbiAqL1xuZnVuY3Rpb24gR2V0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsIHBvc2l0aW9uLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KSB7XG4gIGNvbnNvbGUubG9nKFwiTk9URTogR2V0T2Zmc2V0cyBpcyBkZXByZWNhdGVkIGluIGZhdm9yIG9mIEdldEV4cGxpY2l0T2Zmc2V0cyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDYuNVwiKTtcbiAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgICByZXR1cm4gUnRsKCkgP1xuICAgICAgICBHZXRFeHBsaWNpdE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCAndG9wJywgJ2xlZnQnLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KSA6XG4gICAgICAgIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsICd0b3AnLCAncmlnaHQnLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KTtcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgcmV0dXJuIFJ0bCgpID9cbiAgICAgICAgR2V0RXhwbGljaXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgJ2JvdHRvbScsICdsZWZ0Jywgdk9mZnNldCwgaE9mZnNldCwgaXNPdmVyZmxvdykgOlxuICAgICAgICBHZXRFeHBsaWNpdE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCAnYm90dG9tJywgJ3JpZ2h0Jywgdk9mZnNldCwgaE9mZnNldCwgaXNPdmVyZmxvdyk7XG4gICAgY2FzZSAnY2VudGVyIHRvcCc6XG4gICAgICByZXR1cm4gR2V0RXhwbGljaXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgJ3RvcCcsICdjZW50ZXInLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KTtcbiAgICBjYXNlICdjZW50ZXIgYm90dG9tJzpcbiAgICAgIHJldHVybiBHZXRFeHBsaWNpdE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCAnYm90dG9tJywgJ2NlbnRlcicsIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpO1xuICAgIGNhc2UgJ2NlbnRlciBsZWZ0JzpcbiAgICAgIHJldHVybiBHZXRFeHBsaWNpdE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCAnbGVmdCcsICdjZW50ZXInLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KTtcbiAgICBjYXNlICdjZW50ZXIgcmlnaHQnOlxuICAgICAgcmV0dXJuIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsICdyaWdodCcsICdjZW50ZXInLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KTtcbiAgICBjYXNlICdsZWZ0IGJvdHRvbSc6XG4gICAgICByZXR1cm4gR2V0RXhwbGljaXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgJ2JvdHRvbScsICdsZWZ0Jywgdk9mZnNldCwgaE9mZnNldCwgaXNPdmVyZmxvdyk7XG4gICAgY2FzZSAncmlnaHQgYm90dG9tJzpcbiAgICAgIHJldHVybiBHZXRFeHBsaWNpdE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCAnYm90dG9tJywgJ3JpZ2h0Jywgdk9mZnNldCwgaE9mZnNldCwgaXNPdmVyZmxvdyk7XG4gICAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHkuLi4gdGhpcyBhbG9uZyB3aXRoIHRoZSByZXZlYWwgYW5kIHJldmVhbCBmdWxsXG4gICAgLy8gY2xhc3NlcyBhcmUgdGhlIG9ubHkgb25lcyB0aGF0IGRpZG4ndCByZWZlcmVuY2UgYW5jaG9yXG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICgkZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC5sZWZ0ICsgKCRlbGVEaW1zLndpbmRvd0RpbXMud2lkdGggLyAyKSkgLSAoJGVsZURpbXMud2lkdGggLyAyKSArIGhPZmZzZXQsXG4gICAgICAgIHRvcDogKCRlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcCArICgkZWxlRGltcy53aW5kb3dEaW1zLmhlaWdodCAvIDIpKSAtICgkZWxlRGltcy5oZWlnaHQgLyAyICsgdk9mZnNldClcbiAgICAgIH1cbiAgICBjYXNlICdyZXZlYWwnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogKCRlbGVEaW1zLndpbmRvd0RpbXMud2lkdGggLSAkZWxlRGltcy53aWR0aCkgLyAyICsgaE9mZnNldCxcbiAgICAgICAgdG9wOiAkZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC50b3AgKyB2T2Zmc2V0XG4gICAgICB9XG4gICAgY2FzZSAncmV2ZWFsIGZ1bGwnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogJGVsZURpbXMud2luZG93RGltcy5vZmZzZXQubGVmdCxcbiAgICAgICAgdG9wOiAkZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC50b3BcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAoUnRsKCkgPyAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCAtICRlbGVEaW1zLndpZHRoICsgJGFuY2hvckRpbXMud2lkdGggLSBoT2Zmc2V0OiAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCArIGhPZmZzZXQpLFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3AgKyAkYW5jaG9yRGltcy5oZWlnaHQgKyB2T2Zmc2V0XG4gICAgICB9XG5cbiAgfVxuXG59XG5cbmZ1bmN0aW9uIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsIHBvc2l0aW9uLCBhbGlnbm1lbnQsIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpIHtcbiAgdmFyICRlbGVEaW1zID0gR2V0RGltZW5zaW9ucyhlbGVtZW50KSxcbiAgICAgICRhbmNob3JEaW1zID0gYW5jaG9yID8gR2V0RGltZW5zaW9ucyhhbmNob3IpIDogbnVsbDtcblxuICAgICAgdmFyIHRvcFZhbCwgbGVmdFZhbDtcblxuICAvLyBzZXQgcG9zaXRpb24gcmVsYXRlZCBhdHRyaWJ1dGVcblxuICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIHRvcFZhbCA9ICRhbmNob3JEaW1zLm9mZnNldC50b3AgLSAoJGVsZURpbXMuaGVpZ2h0ICsgdk9mZnNldCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgdG9wVmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArICRhbmNob3JEaW1zLmhlaWdodCArIHZPZmZzZXQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIGxlZnRWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCAtICgkZWxlRGltcy53aWR0aCArIGhPZmZzZXQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmlnaHQnOlxuICAgICAgbGVmdFZhbCA9ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgJGFuY2hvckRpbXMud2lkdGggKyBoT2Zmc2V0O1xuICAgICAgYnJlYWs7XG4gIH1cblxuXG4gIC8vIHNldCBhbGlnbm1lbnQgcmVsYXRlZCBhdHRyaWJ1dGVcbiAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHN3aXRjaCAoYWxpZ25tZW50KSB7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIGxlZnRWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCArIGhPZmZzZXQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICBsZWZ0VmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgLSAkZWxlRGltcy53aWR0aCArICRhbmNob3JEaW1zLndpZHRoIC0gaE9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICBsZWZ0VmFsID0gaXNPdmVyZmxvdyA/IGhPZmZzZXQgOiAoKCRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgKCRhbmNob3JEaW1zLndpZHRoIC8gMikpIC0gKCRlbGVEaW1zLndpZHRoIC8gMikpICsgaE9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHN3aXRjaCAoYWxpZ25tZW50KSB7XG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgdG9wVmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LnRvcCAtIHZPZmZzZXQgKyAkYW5jaG9yRGltcy5oZWlnaHQgLSAkZWxlRGltcy5oZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgdG9wVmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArIHZPZmZzZXRcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICB0b3BWYWwgPSAoJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArIHZPZmZzZXQgKyAoJGFuY2hvckRpbXMuaGVpZ2h0IC8gMikpIC0gKCRlbGVEaW1zLmhlaWdodCAvIDIpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4ge3RvcDogdG9wVmFsLCBsZWZ0OiBsZWZ0VmFsfTtcbn1cblxuZXhwb3J0IHtCb3h9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmJveC5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuY29uc3QgTmVzdCA9IHtcbiAgRmVhdGhlcihtZW51LCB0eXBlID0gJ3pmJykge1xuICAgIG1lbnUuYXR0cigncm9sZScsICdtZW51YmFyJyk7XG5cbiAgICB2YXIgaXRlbXMgPSBtZW51LmZpbmQoJ2xpJykuYXR0cih7J3JvbGUnOiAnbWVudWl0ZW0nfSksXG4gICAgICAgIHN1Yk1lbnVDbGFzcyA9IGBpcy0ke3R5cGV9LXN1Ym1lbnVgLFxuICAgICAgICBzdWJJdGVtQ2xhc3MgPSBgJHtzdWJNZW51Q2xhc3N9LWl0ZW1gLFxuICAgICAgICBoYXNTdWJDbGFzcyA9IGBpcy0ke3R5cGV9LXN1Ym1lbnUtcGFyZW50YCxcbiAgICAgICAgYXBwbHlBcmlhID0gKHR5cGUgIT09ICdhY2NvcmRpb24nKTsgLy8gQWNjb3JkaW9ucyBoYW5kbGUgdGhlaXIgb3duIEFSSUEgYXR0cml1dGVzLlxuXG4gICAgaXRlbXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkaXRlbSA9ICQodGhpcyksXG4gICAgICAgICAgJHN1YiA9ICRpdGVtLmNoaWxkcmVuKCd1bCcpO1xuXG4gICAgICBpZiAoJHN1Yi5sZW5ndGgpIHtcbiAgICAgICAgJGl0ZW0uYWRkQ2xhc3MoaGFzU3ViQ2xhc3MpO1xuICAgICAgICAkc3ViLmFkZENsYXNzKGBzdWJtZW51ICR7c3ViTWVudUNsYXNzfWApLmF0dHIoeydkYXRhLXN1Ym1lbnUnOiAnJ30pO1xuICAgICAgICBpZihhcHBseUFyaWEpIHtcbiAgICAgICAgICAkaXRlbS5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhhc3BvcHVwJzogdHJ1ZSxcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogJGl0ZW0uY2hpbGRyZW4oJ2E6Zmlyc3QnKS50ZXh0KClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBOb3RlOiAgRHJpbGxkb3ducyBiZWhhdmUgZGlmZmVyZW50bHkgaW4gaG93IHRoZXkgaGlkZSwgYW5kIHNvIG5lZWRcbiAgICAgICAgICAvLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMuICBXZSBzaG91bGQgbG9vayBpZiB0aGlzIHBvc3NpYmx5IG92ZXItZ2VuZXJhbGl6ZWRcbiAgICAgICAgICAvLyB1dGlsaXR5IChOZXN0KSBpcyBhcHByb3ByaWF0ZSB3aGVuIHdlIHJld29yayBtZW51cyBpbiA2LjRcbiAgICAgICAgICBpZih0eXBlID09PSAnZHJpbGxkb3duJykge1xuICAgICAgICAgICAgJGl0ZW0uYXR0cih7J2FyaWEtZXhwYW5kZWQnOiBmYWxzZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkc3ViXG4gICAgICAgICAgLmFkZENsYXNzKGBzdWJtZW51ICR7c3ViTWVudUNsYXNzfWApXG4gICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgJ2RhdGEtc3VibWVudSc6ICcnLFxuICAgICAgICAgICAgJ3JvbGUnOiAnbWVudSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgaWYodHlwZSA9PT0gJ2RyaWxsZG93bicpIHtcbiAgICAgICAgICAkc3ViLmF0dHIoeydhcmlhLWhpZGRlbic6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJGl0ZW0ucGFyZW50KCdbZGF0YS1zdWJtZW51XScpLmxlbmd0aCkge1xuICAgICAgICAkaXRlbS5hZGRDbGFzcyhgaXMtc3VibWVudS1pdGVtICR7c3ViSXRlbUNsYXNzfWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuO1xuICB9LFxuXG4gIEJ1cm4obWVudSwgdHlwZSkge1xuICAgIHZhciAvL2l0ZW1zID0gbWVudS5maW5kKCdsaScpLFxuICAgICAgICBzdWJNZW51Q2xhc3MgPSBgaXMtJHt0eXBlfS1zdWJtZW51YCxcbiAgICAgICAgc3ViSXRlbUNsYXNzID0gYCR7c3ViTWVudUNsYXNzfS1pdGVtYCxcbiAgICAgICAgaGFzU3ViQ2xhc3MgPSBgaXMtJHt0eXBlfS1zdWJtZW51LXBhcmVudGA7XG5cbiAgICBtZW51XG4gICAgICAuZmluZCgnPmxpLCAubWVudSwgLm1lbnUgPiBsaScpXG4gICAgICAucmVtb3ZlQ2xhc3MoYCR7c3ViTWVudUNsYXNzfSAke3N1Ykl0ZW1DbGFzc30gJHtoYXNTdWJDbGFzc30gaXMtc3VibWVudS1pdGVtIHN1Ym1lbnUgaXMtYWN0aXZlYClcbiAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXN1Ym1lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cbiAgfVxufVxuXG5leHBvcnQge05lc3R9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm5lc3QuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbi8qKlxuICogUnVucyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gaW1hZ2VzIGFyZSBmdWxseSBsb2FkZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gaW1hZ2VzIC0gSW1hZ2UocykgdG8gY2hlY2sgaWYgbG9hZGVkLlxuICogQHBhcmFtIHtGdW5jfSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBpbWFnZSBpcyBmdWxseSBsb2FkZWQuXG4gKi9cbmZ1bmN0aW9uIG9uSW1hZ2VzTG9hZGVkKGltYWdlcywgY2FsbGJhY2spe1xuICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICB1bmxvYWRlZCA9IGltYWdlcy5sZW5ndGg7XG5cbiAgaWYgKHVubG9hZGVkID09PSAwKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfVxuXG4gIGltYWdlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgLy8gQ2hlY2sgaWYgaW1hZ2UgaXMgbG9hZGVkXG4gICAgaWYgKHRoaXMuY29tcGxldGUgJiYgdGhpcy5uYXR1cmFsV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2luZ2xlSW1hZ2VMb2FkZWQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgYWJvdmUgY2hlY2sgZmFpbGVkLCBzaW11bGF0ZSBsb2FkaW5nIG9uIGRldGFjaGVkIGVsZW1lbnQuXG4gICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIC8vIFN0aWxsIGNvdW50IGltYWdlIGFzIGxvYWRlZCBpZiBpdCBmaW5hbGl6ZXMgd2l0aCBhbiBlcnJvci5cbiAgICAgIHZhciBldmVudHMgPSBcImxvYWQuemYuaW1hZ2VzIGVycm9yLnpmLmltYWdlc1wiO1xuICAgICAgJChpbWFnZSkub25lKGV2ZW50cywgZnVuY3Rpb24gbWUoZXZlbnQpe1xuICAgICAgICAvLyBVbmJpbmQgdGhlIGV2ZW50IGxpc3RlbmVycy4gV2UncmUgdXNpbmcgJ29uZScgYnV0IG9ubHkgb25lIG9mIHRoZSB0d28gZXZlbnRzIHdpbGwgaGF2ZSBmaXJlZC5cbiAgICAgICAgJCh0aGlzKS5vZmYoZXZlbnRzLCBtZSk7XG4gICAgICAgIHNpbmdsZUltYWdlTG9hZGVkKCk7XG4gICAgICB9KTtcbiAgICAgIGltYWdlLnNyYyA9ICQodGhpcykuYXR0cignc3JjJyk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaW5nbGVJbWFnZUxvYWRlZCgpIHtcbiAgICB1bmxvYWRlZC0tO1xuICAgIGlmICh1bmxvYWRlZCA9PT0gMCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgb25JbWFnZXNMb2FkZWQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBOZXN0IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubmVzdCc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5cbi8qKlxuICogQWNjb3JkaW9uTWVudSBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uYWNjb3JkaW9uTWVudVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5uZXN0XG4gKi9cblxuY2xhc3MgQWNjb3JkaW9uTWVudSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGFuIGFjY29yZGlvbiBtZW51LlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgQWNjb3JkaW9uTWVudVxuICAgKiBAZmlyZXMgQWNjb3JkaW9uTWVudSNpbml0XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYW4gYWNjb3JkaW9uIG1lbnUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIEFjY29yZGlvbk1lbnUuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdBY2NvcmRpb25NZW51JzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignQWNjb3JkaW9uTWVudScsIHtcbiAgICAgICdFTlRFUic6ICd0b2dnbGUnLFxuICAgICAgJ1NQQUNFJzogJ3RvZ2dsZScsXG4gICAgICAnQVJST1dfUklHSFQnOiAnb3BlbicsXG4gICAgICAnQVJST1dfVVAnOiAndXAnLFxuICAgICAgJ0FSUk9XX0RPV04nOiAnZG93bicsXG4gICAgICAnQVJST1dfTEVGVCc6ICdjbG9zZScsXG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlQWxsJ1xuICAgIH0pO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYWNjb3JkaW9uIG1lbnUgYnkgaGlkaW5nIGFsbCBuZXN0ZWQgbWVudXMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICBOZXN0LkZlYXRoZXIodGhpcy4kZWxlbWVudCwgJ2FjY29yZGlvbicpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtc3VibWVudV0nKS5ub3QoJy5pcy1hY3RpdmUnKS5zbGlkZVVwKDApOy8vLmZpbmQoJ2EnKS5jc3MoJ3BhZGRpbmctbGVmdCcsICcxcmVtJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICdyb2xlJzogJ3RyZWUnLFxuICAgICAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogdGhpcy5vcHRpb25zLm11bHRpT3BlblxuICAgIH0pO1xuXG4gICAgdGhpcy4kbWVudUxpbmtzID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXMtYWNjb3JkaW9uLXN1Ym1lbnUtcGFyZW50Jyk7XG4gICAgdGhpcy4kbWVudUxpbmtzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciBsaW5rSWQgPSB0aGlzLmlkIHx8IEdldFlvRGlnaXRzKDYsICdhY2MtbWVudS1saW5rJyksXG4gICAgICAgICAgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICRzdWIgPSAkZWxlbS5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKSxcbiAgICAgICAgICBzdWJJZCA9ICRzdWJbMF0uaWQgfHwgR2V0WW9EaWdpdHMoNiwgJ2FjYy1tZW51JyksXG4gICAgICAgICAgaXNBY3RpdmUgPSAkc3ViLmhhc0NsYXNzKCdpcy1hY3RpdmUnKTtcblxuXG4gICAgICBpZihfdGhpcy5vcHRpb25zLnN1Ym1lbnVUb2dnbGUpIHtcbiAgICAgICAgJGVsZW0uYWRkQ2xhc3MoJ2hhcy1zdWJtZW51LXRvZ2dsZScpO1xuICAgICAgICAkZWxlbS5jaGlsZHJlbignYScpLmFmdGVyKCc8YnV0dG9uIGlkPVwiJyArIGxpbmtJZCArICdcIiBjbGFzcz1cInN1Ym1lbnUtdG9nZ2xlXCIgYXJpYS1jb250cm9scz1cIicgKyBzdWJJZCArICdcIiBhcmlhLWV4cGFuZGVkPVwiJyArIGlzQWN0aXZlICsgJ1wiIHRpdGxlPVwiJyArIF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZVRleHQgKyAnXCI+PHNwYW4gY2xhc3M9XCJzdWJtZW51LXRvZ2dsZS10ZXh0XCI+JyArIF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZVRleHQgKyAnPC9zcGFuPjwvYnV0dG9uPicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGVsZW0uYXR0cih7XG4gICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBzdWJJZCxcbiAgICAgICAgICAnYXJpYS1leHBhbmRlZCc6IGlzQWN0aXZlLFxuICAgICAgICAgICdpZCc6IGxpbmtJZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgICRzdWIuYXR0cih7XG4gICAgICAgICdhcmlhLWxhYmVsbGVkYnknOiBsaW5rSWQsXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICFpc0FjdGl2ZSxcbiAgICAgICAgJ3JvbGUnOiAnZ3JvdXAnLFxuICAgICAgICAnaWQnOiBzdWJJZFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdsaScpLmF0dHIoe1xuICAgICAgJ3JvbGUnOiAndHJlZWl0ZW0nXG4gICAgfSk7XG4gICAgdmFyIGluaXRQYW5lcyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmlzLWFjdGl2ZScpO1xuICAgIGlmKGluaXRQYW5lcy5sZW5ndGgpe1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGluaXRQYW5lcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIF90aGlzLmRvd24oJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyBmb3IgaXRlbXMgd2l0aGluIHRoZSBtZW51LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJHN1Ym1lbnUgPSAkKHRoaXMpLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpO1xuXG4gICAgICBpZiAoJHN1Ym1lbnUubGVuZ3RoKSB7XG4gICAgICAgIGlmKF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5zdWJtZW51LXRvZ2dsZScpLm9mZignY2xpY2suemYuYWNjb3JkaW9uTWVudScpLm9uKCdjbGljay56Zi5hY2NvcmRpb25NZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCRzdWJtZW51KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJ2EnKS5vZmYoJ2NsaWNrLnpmLmFjY29yZGlvbk1lbnUnKS5vbignY2xpY2suemYuYWNjb3JkaW9uTWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBfdGhpcy50b2dnbGUoJHN1Ym1lbnUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KS5vbigna2V5ZG93bi56Zi5hY2NvcmRpb25tZW51JywgZnVuY3Rpb24oZSl7XG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICRlbGVtZW50cyA9ICRlbGVtZW50LnBhcmVudCgndWwnKS5jaGlsZHJlbignbGknKSxcbiAgICAgICAgICAkcHJldkVsZW1lbnQsXG4gICAgICAgICAgJG5leHRFbGVtZW50LFxuICAgICAgICAgICR0YXJnZXQgPSAkZWxlbWVudC5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKTtcblxuICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5tYXgoMCwgaS0xKSkuZmluZCgnYScpLmZpcnN0KCk7XG4gICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWluKGkrMSwgJGVsZW1lbnRzLmxlbmd0aC0xKSkuZmluZCgnYScpLmZpcnN0KCk7XG5cbiAgICAgICAgICBpZiAoJCh0aGlzKS5jaGlsZHJlbignW2RhdGEtc3VibWVudV06dmlzaWJsZScpLmxlbmd0aCkgeyAvLyBoYXMgb3BlbiBzdWIgbWVudVxuICAgICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnQuZmluZCgnbGk6Zmlyc3QtY2hpbGQnKS5maW5kKCdhJykuZmlyc3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQodGhpcykuaXMoJzpmaXJzdC1jaGlsZCcpKSB7IC8vIGlzIGZpcnN0IGVsZW1lbnQgb2Ygc3ViIG1lbnVcbiAgICAgICAgICAgICRwcmV2RWxlbWVudCA9ICRlbGVtZW50LnBhcmVudHMoJ2xpJykuZmlyc3QoKS5maW5kKCdhJykuZmlyc3QoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCRwcmV2RWxlbWVudC5wYXJlbnRzKCdsaScpLmZpcnN0KCkuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdOnZpc2libGUnKS5sZW5ndGgpIHsgLy8gaWYgcHJldmlvdXMgZWxlbWVudCBoYXMgb3BlbiBzdWIgbWVudVxuICAgICAgICAgICAgJHByZXZFbGVtZW50ID0gJHByZXZFbGVtZW50LnBhcmVudHMoJ2xpJykuZmluZCgnbGk6bGFzdC1jaGlsZCcpLmZpbmQoJ2EnKS5maXJzdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmxhc3QtY2hpbGQnKSkgeyAvLyBpcyBsYXN0IGVsZW1lbnQgb2Ygc3ViIG1lbnVcbiAgICAgICAgICAgICRuZXh0RWxlbWVudCA9ICRlbGVtZW50LnBhcmVudHMoJ2xpJykuZmlyc3QoKS5uZXh0KCdsaScpLmZpbmQoJ2EnKS5maXJzdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnQWNjb3JkaW9uTWVudScsIHtcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCR0YXJnZXQuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgX3RoaXMuZG93bigkdGFyZ2V0KTtcbiAgICAgICAgICAgICR0YXJnZXQuZmluZCgnbGknKS5maXJzdCgpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoICYmICEkdGFyZ2V0LmlzKCc6aGlkZGVuJykpIHsgLy8gY2xvc2UgYWN0aXZlIHN1YiBvZiB0aGlzIGl0ZW1cbiAgICAgICAgICAgIF90aGlzLnVwKCR0YXJnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJGVsZW1lbnQucGFyZW50KCdbZGF0YS1zdWJtZW51XScpLmxlbmd0aCkgeyAvLyBjbG9zZSBjdXJyZW50bHkgb3BlbiBzdWJcbiAgICAgICAgICAgIF90aGlzLnVwKCRlbGVtZW50LnBhcmVudCgnW2RhdGEtc3VibWVudV0nKSk7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRzKCdsaScpLmZpcnN0KCkuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJGVsZW1lbnQuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBfdGhpcy50b2dnbGUoJGVsZW1lbnQuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbG9zZUFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgX3RoaXMuaGlkZUFsbCgpO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVkOiBmdW5jdGlvbihwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTsvLy5hdHRyKCd0YWJpbmRleCcsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBhbGwgcGFuZXMgb2YgdGhlIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgaGlkZUFsbCgpIHtcbiAgICB0aGlzLnVwKHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtc3VibWVudV0nKSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYWxsIHBhbmVzIG9mIHRoZSBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHNob3dBbGwoKSB7XG4gICAgdGhpcy5kb3duKHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtc3VibWVudV0nKSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgb3Blbi9jbG9zZSBzdGF0ZSBvZiBhIHN1Ym1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIHRoZSBzdWJtZW51IHRvIHRvZ2dsZVxuICAgKi9cbiAgdG9nZ2xlKCR0YXJnZXQpe1xuICAgIGlmKCEkdGFyZ2V0LmlzKCc6YW5pbWF0ZWQnKSkge1xuICAgICAgaWYgKCEkdGFyZ2V0LmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgdGhpcy51cCgkdGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmRvd24oJHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBzdWItbWVudSBkZWZpbmVkIGJ5IGAkdGFyZ2V0YC5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBTdWItbWVudSB0byBvcGVuLlxuICAgKiBAZmlyZXMgQWNjb3JkaW9uTWVudSNkb3duXG4gICAqL1xuICBkb3duKCR0YXJnZXQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYoIXRoaXMub3B0aW9ucy5tdWx0aU9wZW4pIHtcbiAgICAgIHRoaXMudXAodGhpcy4kZWxlbWVudC5maW5kKCcuaXMtYWN0aXZlJykubm90KCR0YXJnZXQucGFyZW50c1VudGlsKHRoaXMuJGVsZW1lbnQpLmFkZCgkdGFyZ2V0KSkpO1xuICAgIH1cblxuICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLmF0dHIoeydhcmlhLWhpZGRlbic6IGZhbHNlfSk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgJHRhcmdldC5wcmV2KCcuc3VibWVudS10b2dnbGUnKS5hdHRyKHsnYXJpYS1leHBhbmRlZCc6IHRydWV9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkdGFyZ2V0LnBhcmVudCgnLmlzLWFjY29yZGlvbi1zdWJtZW51LXBhcmVudCcpLmF0dHIoeydhcmlhLWV4cGFuZGVkJzogdHJ1ZX0pO1xuICAgIH1cblxuICAgICR0YXJnZXQuc2xpZGVEb3duKF90aGlzLm9wdGlvbnMuc2xpZGVTcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIHRoZSBtZW51IGlzIGRvbmUgb3BlbmluZy5cbiAgICAgICAqIEBldmVudCBBY2NvcmRpb25NZW51I2Rvd25cbiAgICAgICAqL1xuICAgICAgX3RoaXMuJGVsZW1lbnQudHJpZ2dlcignZG93bi56Zi5hY2NvcmRpb25NZW51JywgWyR0YXJnZXRdKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHN1Yi1tZW51IGRlZmluZWQgYnkgYCR0YXJnZXRgLiBBbGwgc3ViLW1lbnVzIGluc2lkZSB0aGUgdGFyZ2V0IHdpbGwgYmUgY2xvc2VkIGFzIHdlbGwuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gU3ViLW1lbnUgdG8gY2xvc2UuXG4gICAqIEBmaXJlcyBBY2NvcmRpb25NZW51I3VwXG4gICAqL1xuICB1cCgkdGFyZ2V0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAkdGFyZ2V0LnNsaWRlVXAoX3RoaXMub3B0aW9ucy5zbGlkZVNwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgZG9uZSBjb2xsYXBzaW5nIHVwLlxuICAgICAgICogQGV2ZW50IEFjY29yZGlvbk1lbnUjdXBcbiAgICAgICAqL1xuICAgICAgX3RoaXMuJGVsZW1lbnQudHJpZ2dlcigndXAuemYuYWNjb3JkaW9uTWVudScsIFskdGFyZ2V0XSk7XG4gICAgfSk7XG5cbiAgICB2YXIgJG1lbnVzID0gJHRhcmdldC5maW5kKCdbZGF0YS1zdWJtZW51XScpLnNsaWRlVXAoMCkuYWRkQmFjaygpLmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgJG1lbnVzLnByZXYoJy5zdWJtZW51LXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJG1lbnVzLnBhcmVudCgnLmlzLWFjY29yZGlvbi1zdWJtZW51LXBhcmVudCcpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIGFjY29yZGlvbiBtZW51LlxuICAgKiBAZmlyZXMgQWNjb3JkaW9uTWVudSNkZXN0cm95ZWRcbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtc3VibWVudV0nKS5zbGlkZURvd24oMCkuY3NzKCdkaXNwbGF5JywgJycpO1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnYScpLm9mZignY2xpY2suemYuYWNjb3JkaW9uTWVudScpO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLnN1Ym1lbnVUb2dnbGUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnLmhhcy1zdWJtZW51LXRvZ2dsZScpLnJlbW92ZUNsYXNzKCdoYXMtc3VibWVudS10b2dnbGUnKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnLnN1Ym1lbnUtdG9nZ2xlJykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgTmVzdC5CdXJuKHRoaXMuJGVsZW1lbnQsICdhY2NvcmRpb24nKTtcbiAgfVxufVxuXG5BY2NvcmRpb25NZW51LmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUgdG8gYW5pbWF0ZSB0aGUgb3BlbmluZyBvZiBhIHN1Ym1lbnUgaW4gbXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMjUwXG4gICAqL1xuICBzbGlkZVNwZWVkOiAyNTAsXG4gIC8qKlxuICAgKiBBZGRzIGEgc2VwYXJhdGUgc3VibWVudSB0b2dnbGUgYnV0dG9uLiBUaGlzIGFsbG93cyB0aGUgcGFyZW50IGl0ZW0gdG8gaGF2ZSBhIGxpbmsuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgdHJ1ZVxuICAgKi9cbiAgc3VibWVudVRvZ2dsZTogZmFsc2UsXG4gIC8qKlxuICAgKiBUaGUgdGV4dCB1c2VkIGZvciB0aGUgc3VibWVudSB0b2dnbGUgaWYgZW5hYmxlZC4gVGhpcyBpcyB1c2VkIGZvciBzY3JlZW4gcmVhZGVycyBvbmx5LlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIHRydWVcbiAgICovXG4gIHN1Ym1lbnVUb2dnbGVUZXh0OiAnVG9nZ2xlIG1lbnUnLFxuICAvKipcbiAgICogQWxsb3cgdGhlIG1lbnUgdG8gaGF2ZSBtdWx0aXBsZSBvcGVuIHBhbmVzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBtdWx0aU9wZW46IHRydWVcbn07XG5cbmV4cG9ydCB7QWNjb3JkaW9uTWVudX07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbk1lbnUuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE5lc3QgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5uZXN0JztcbmltcG9ydCB7IEJveCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmJveCc7XG5pbXBvcnQgeyBydGwgYXMgUnRsIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcblxuXG4vKipcbiAqIERyb3Bkb3duTWVudSBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uZHJvcGRvd24tbWVudVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5ib3hcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubmVzdFxuICovXG5cbmNsYXNzIERyb3Bkb3duTWVudSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIERyb3Bkb3duTWVudS5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIERyb3Bkb3duTWVudVxuICAgKiBAZmlyZXMgRHJvcGRvd25NZW51I2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhIGRyb3Bkb3duIG1lbnUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIERyb3Bkb3duTWVudS5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0Ryb3Bkb3duTWVudSc7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ0Ryb3Bkb3duTWVudScsIHtcbiAgICAgICdFTlRFUic6ICdvcGVuJyxcbiAgICAgICdTUEFDRSc6ICdvcGVuJyxcbiAgICAgICdBUlJPV19SSUdIVCc6ICduZXh0JyxcbiAgICAgICdBUlJPV19VUCc6ICd1cCcsXG4gICAgICAnQVJST1dfRE9XTic6ICdkb3duJyxcbiAgICAgICdBUlJPV19MRUZUJzogJ3ByZXZpb3VzJyxcbiAgICAgICdFU0NBUEUnOiAnY2xvc2UnXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBsdWdpbiwgYW5kIGNhbGxzIF9wcmVwYXJlTWVudVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9pbml0KCkge1xuICAgIE5lc3QuRmVhdGhlcih0aGlzLiRlbGVtZW50LCAnZHJvcGRvd24nKTtcblxuICAgIHZhciBzdWJzID0gdGhpcy4kZWxlbWVudC5maW5kKCdsaS5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpO1xuICAgIHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oJy5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpLmNoaWxkcmVuKCcuaXMtZHJvcGRvd24tc3VibWVudScpLmFkZENsYXNzKCdmaXJzdC1zdWInKTtcblxuICAgIHRoaXMuJG1lbnVJdGVtcyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnW3JvbGU9XCJtZW51aXRlbVwiXScpO1xuICAgIHRoaXMuJHRhYnMgPSB0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCdbcm9sZT1cIm1lbnVpdGVtXCJdJyk7XG4gICAgdGhpcy4kdGFicy5maW5kKCd1bC5pcy1kcm9wZG93bi1zdWJtZW51JykuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnZlcnRpY2FsQ2xhc3MpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPT09ICdhdXRvJykge1xuICAgICAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcyh0aGlzLm9wdGlvbnMucmlnaHRDbGFzcykgfHwgUnRsKCkgfHwgdGhpcy4kZWxlbWVudC5wYXJlbnRzKCcudG9wLWJhci1yaWdodCcpLmlzKCcqJykpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPSAncmlnaHQnO1xuICAgICAgICAgICAgc3Vicy5hZGRDbGFzcygnb3BlbnMtbGVmdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFsaWdubWVudCA9ICdsZWZ0JztcbiAgICAgICAgICAgIHN1YnMuYWRkQ2xhc3MoJ29wZW5zLXJpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBzdWJzLmFkZENsYXNzKCdvcGVucy1sZWZ0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1YnMuYWRkQ2xhc3MoJ29wZW5zLXJpZ2h0Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9O1xuXG4gIF9pc1ZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLiR0YWJzLmNzcygnZGlzcGxheScpID09PSAnYmxvY2snIHx8IHRoaXMuJGVsZW1lbnQuY3NzKCdmbGV4LWRpcmVjdGlvbicpID09PSAnY29sdW1uJztcbiAgfVxuXG4gIF9pc1J0bCgpIHtcbiAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWxpZ24tcmlnaHQnKSB8fCAoUnRsKCkgJiYgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FsaWduLWxlZnQnKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gZWxlbWVudHMgd2l0aGluIHRoZSBtZW51XG4gICAqIEBwcml2YXRlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBoYXNUb3VjaCA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCAodHlwZW9mIHdpbmRvdy5vbnRvdWNoc3RhcnQgIT09ICd1bmRlZmluZWQnKSxcbiAgICAgICAgcGFyQ2xhc3MgPSAnaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnO1xuXG4gICAgLy8gdXNlZCBmb3Igb25DbGljayBhbmQgaW4gdGhlIGtleWJvYXJkIGhhbmRsZXJzXG4gICAgdmFyIGhhbmRsZUNsaWNrRm4gPSBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgJGVsZW0gPSAkKGUudGFyZ2V0KS5wYXJlbnRzVW50aWwoJ3VsJywgYC4ke3BhckNsYXNzfWApLFxuICAgICAgICAgIGhhc1N1YiA9ICRlbGVtLmhhc0NsYXNzKHBhckNsYXNzKSxcbiAgICAgICAgICBoYXNDbGlja2VkID0gJGVsZW0uYXR0cignZGF0YS1pcy1jbGljaycpID09PSAndHJ1ZScsXG4gICAgICAgICAgJHN1YiA9ICRlbGVtLmNoaWxkcmVuKCcuaXMtZHJvcGRvd24tc3VibWVudScpO1xuXG4gICAgICBpZiAoaGFzU3ViKSB7XG4gICAgICAgIGlmIChoYXNDbGlja2VkKSB7XG4gICAgICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLmNsb3NlT25DbGljayB8fCAoIV90aGlzLm9wdGlvbnMuY2xpY2tPcGVuICYmICFoYXNUb3VjaCkgfHwgKF90aGlzLm9wdGlvbnMuZm9yY2VGb2xsb3cgJiYgaGFzVG91Y2gpKSB7IHJldHVybjsgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIF90aGlzLl9oaWRlKCRlbGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgX3RoaXMuX3Nob3coJHN1Yik7XG4gICAgICAgICAgJGVsZW0uYWRkKCRlbGVtLnBhcmVudHNVbnRpbChfdGhpcy4kZWxlbWVudCwgYC4ke3BhckNsYXNzfWApKS5hdHRyKCdkYXRhLWlzLWNsaWNrJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja09wZW4gfHwgaGFzVG91Y2gpIHtcbiAgICAgIHRoaXMuJG1lbnVJdGVtcy5vbignY2xpY2suemYuZHJvcGRvd25tZW51IHRvdWNoc3RhcnQuemYuZHJvcGRvd25tZW51JywgaGFuZGxlQ2xpY2tGbik7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIExlYWYgZWxlbWVudCBDbGlja3NcbiAgICBpZihfdGhpcy5vcHRpb25zLmNsb3NlT25DbGlja0luc2lkZSl7XG4gICAgICB0aGlzLiRtZW51SXRlbXMub24oJ2NsaWNrLnpmLmRyb3Bkb3dubWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyICRlbGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGhhc1N1YiA9ICRlbGVtLmhhc0NsYXNzKHBhckNsYXNzKTtcbiAgICAgICAgaWYoIWhhc1N1Yil7XG4gICAgICAgICAgX3RoaXMuX2hpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZUhvdmVyKSB7XG4gICAgICB0aGlzLiRtZW51SXRlbXMub24oJ21vdXNlZW50ZXIuemYuZHJvcGRvd25tZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgaGFzU3ViID0gJGVsZW0uaGFzQ2xhc3MocGFyQ2xhc3MpO1xuXG4gICAgICAgIGlmIChoYXNTdWIpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoJGVsZW0uZGF0YSgnX2RlbGF5JykpO1xuICAgICAgICAgICRlbGVtLmRhdGEoJ19kZWxheScsIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5fc2hvdygkZWxlbS5jaGlsZHJlbignLmlzLWRyb3Bkb3duLXN1Ym1lbnUnKSk7XG4gICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KSk7XG4gICAgICAgIH1cbiAgICAgIH0pLm9uKCdtb3VzZWxlYXZlLnpmLmRyb3Bkb3dubWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyICRlbGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGhhc1N1YiA9ICRlbGVtLmhhc0NsYXNzKHBhckNsYXNzKTtcbiAgICAgICAgaWYgKGhhc1N1YiAmJiBfdGhpcy5vcHRpb25zLmF1dG9jbG9zZSkge1xuICAgICAgICAgIGlmICgkZWxlbS5hdHRyKCdkYXRhLWlzLWNsaWNrJykgPT09ICd0cnVlJyAmJiBfdGhpcy5vcHRpb25zLmNsaWNrT3BlbikgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAgIGNsZWFyVGltZW91dCgkZWxlbS5kYXRhKCdfZGVsYXknKSk7XG4gICAgICAgICAgJGVsZW0uZGF0YSgnX2RlbGF5Jywgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLl9oaWRlKCRlbGVtKTtcbiAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmNsb3NpbmdUaW1lKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLiRtZW51SXRlbXMub24oJ2tleWRvd24uemYuZHJvcGRvd25tZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyICRlbGVtZW50ID0gJChlLnRhcmdldCkucGFyZW50c1VudGlsKCd1bCcsICdbcm9sZT1cIm1lbnVpdGVtXCJdJyksXG4gICAgICAgICAgaXNUYWIgPSBfdGhpcy4kdGFicy5pbmRleCgkZWxlbWVudCkgPiAtMSxcbiAgICAgICAgICAkZWxlbWVudHMgPSBpc1RhYiA/IF90aGlzLiR0YWJzIDogJGVsZW1lbnQuc2libGluZ3MoJ2xpJykuYWRkKCRlbGVtZW50KSxcbiAgICAgICAgICAkcHJldkVsZW1lbnQsXG4gICAgICAgICAgJG5leHRFbGVtZW50O1xuXG4gICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgICRwcmV2RWxlbWVudCA9ICRlbGVtZW50cy5lcShpLTEpO1xuICAgICAgICAgICRuZXh0RWxlbWVudCA9ICRlbGVtZW50cy5lcShpKzEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBuZXh0U2libGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkbmV4dEVsZW1lbnQuY2hpbGRyZW4oJ2E6Zmlyc3QnKS5mb2N1cygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9LCBwcmV2U2libGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkcHJldkVsZW1lbnQuY2hpbGRyZW4oJ2E6Zmlyc3QnKS5mb2N1cygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9LCBvcGVuU3ViID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkc3ViID0gJGVsZW1lbnQuY2hpbGRyZW4oJ3VsLmlzLWRyb3Bkb3duLXN1Ym1lbnUnKTtcbiAgICAgICAgaWYgKCRzdWIubGVuZ3RoKSB7XG4gICAgICAgICAgX3RoaXMuX3Nob3coJHN1Yik7XG4gICAgICAgICAgJGVsZW1lbnQuZmluZCgnbGkgPiBhOmZpcnN0JykuZm9jdXMoKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7IHJldHVybjsgfVxuICAgICAgfSwgY2xvc2VTdWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9pZiAoJGVsZW1lbnQuaXMoJzpmaXJzdC1jaGlsZCcpKSB7XG4gICAgICAgIHZhciBjbG9zZSA9ICRlbGVtZW50LnBhcmVudCgndWwnKS5wYXJlbnQoJ2xpJyk7XG4gICAgICAgIGNsb3NlLmNoaWxkcmVuKCdhOmZpcnN0JykuZm9jdXMoKTtcbiAgICAgICAgX3RoaXMuX2hpZGUoY2xvc2UpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vfVxuICAgICAgfTtcbiAgICAgIHZhciBmdW5jdGlvbnMgPSB7XG4gICAgICAgIG9wZW46IG9wZW5TdWIsXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5faGlkZShfdGhpcy4kZWxlbWVudCk7XG4gICAgICAgICAgX3RoaXMuJG1lbnVJdGVtcy5lcSgwKS5jaGlsZHJlbignYScpLmZvY3VzKCk7IC8vIGZvY3VzIHRvIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChpc1RhYikge1xuICAgICAgICBpZiAoX3RoaXMuX2lzVmVydGljYWwoKSkgeyAvLyB2ZXJ0aWNhbCBtZW51XG4gICAgICAgICAgaWYgKF90aGlzLl9pc1J0bCgpKSB7IC8vIHJpZ2h0IGFsaWduZWRcbiAgICAgICAgICAgICQuZXh0ZW5kKGZ1bmN0aW9ucywge1xuICAgICAgICAgICAgICBkb3duOiBuZXh0U2libGluZyxcbiAgICAgICAgICAgICAgdXA6IHByZXZTaWJsaW5nLFxuICAgICAgICAgICAgICBuZXh0OiBjbG9zZVN1YixcbiAgICAgICAgICAgICAgcHJldmlvdXM6IG9wZW5TdWJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGxlZnQgYWxpZ25lZFxuICAgICAgICAgICAgJC5leHRlbmQoZnVuY3Rpb25zLCB7XG4gICAgICAgICAgICAgIGRvd246IG5leHRTaWJsaW5nLFxuICAgICAgICAgICAgICB1cDogcHJldlNpYmxpbmcsXG4gICAgICAgICAgICAgIG5leHQ6IG9wZW5TdWIsXG4gICAgICAgICAgICAgIHByZXZpb3VzOiBjbG9zZVN1YlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBob3Jpem9udGFsIG1lbnVcbiAgICAgICAgICBpZiAoX3RoaXMuX2lzUnRsKCkpIHsgLy8gcmlnaHQgYWxpZ25lZFxuICAgICAgICAgICAgJC5leHRlbmQoZnVuY3Rpb25zLCB7XG4gICAgICAgICAgICAgIG5leHQ6IHByZXZTaWJsaW5nLFxuICAgICAgICAgICAgICBwcmV2aW91czogbmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgIGRvd246IG9wZW5TdWIsXG4gICAgICAgICAgICAgIHVwOiBjbG9zZVN1YlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gbGVmdCBhbGlnbmVkXG4gICAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgICAgbmV4dDogbmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgIHByZXZpb3VzOiBwcmV2U2libGluZyxcbiAgICAgICAgICAgICAgZG93bjogb3BlblN1YixcbiAgICAgICAgICAgICAgdXA6IGNsb3NlU3ViXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIG5vdCB0YWJzIC0+IG9uZSBzdWJcbiAgICAgICAgaWYgKF90aGlzLl9pc1J0bCgpKSB7IC8vIHJpZ2h0IGFsaWduZWRcbiAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgIG5leHQ6IGNsb3NlU3ViLFxuICAgICAgICAgICAgcHJldmlvdXM6IG9wZW5TdWIsXG4gICAgICAgICAgICBkb3duOiBuZXh0U2libGluZyxcbiAgICAgICAgICAgIHVwOiBwcmV2U2libGluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyAvLyBsZWZ0IGFsaWduZWRcbiAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgIG5leHQ6IG9wZW5TdWIsXG4gICAgICAgICAgICBwcmV2aW91czogY2xvc2VTdWIsXG4gICAgICAgICAgICBkb3duOiBuZXh0U2libGluZyxcbiAgICAgICAgICAgIHVwOiBwcmV2U2libGluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ0Ryb3Bkb3duTWVudScsIGZ1bmN0aW9ucyk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGJvZHkgdG8gY2xvc2UgYW55IGRyb3Bkb3ducyBvbiBhIGNsaWNrLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRCb2R5SGFuZGxlcigpIHtcbiAgICB2YXIgJGJvZHkgPSAkKGRvY3VtZW50LmJvZHkpLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgJGJvZHkub2ZmKCdtb3VzZXVwLnpmLmRyb3Bkb3dubWVudSB0b3VjaGVuZC56Zi5kcm9wZG93bm1lbnUnKVxuICAgICAgICAgLm9uKCdtb3VzZXVwLnpmLmRyb3Bkb3dubWVudSB0b3VjaGVuZC56Zi5kcm9wZG93bm1lbnUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgIHZhciAkbGluayA9IF90aGlzLiRlbGVtZW50LmZpbmQoZS50YXJnZXQpO1xuICAgICAgICAgICBpZiAoJGxpbmsubGVuZ3RoKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgIF90aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICRib2R5Lm9mZignbW91c2V1cC56Zi5kcm9wZG93bm1lbnUgdG91Y2hlbmQuemYuZHJvcGRvd25tZW51Jyk7XG4gICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhIGRyb3Bkb3duIHBhbmUsIGFuZCBjaGVja3MgZm9yIGNvbGxpc2lvbnMgZmlyc3QuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkc3ViIC0gdWwgZWxlbWVudCB0aGF0IGlzIGEgc3VibWVudSB0byBzaG93XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAZmlyZXMgRHJvcGRvd25NZW51I3Nob3dcbiAgICovXG4gIF9zaG93KCRzdWIpIHtcbiAgICB2YXIgaWR4ID0gdGhpcy4kdGFicy5pbmRleCh0aGlzLiR0YWJzLmZpbHRlcihmdW5jdGlvbihpLCBlbCkge1xuICAgICAgcmV0dXJuICQoZWwpLmZpbmQoJHN1YikubGVuZ3RoID4gMDtcbiAgICB9KSk7XG4gICAgdmFyICRzaWJzID0gJHN1Yi5wYXJlbnQoJ2xpLmlzLWRyb3Bkb3duLXN1Ym1lbnUtcGFyZW50Jykuc2libGluZ3MoJ2xpLmlzLWRyb3Bkb3duLXN1Ym1lbnUtcGFyZW50Jyk7XG4gICAgdGhpcy5faGlkZSgkc2licywgaWR4KTtcbiAgICAkc3ViLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKS5hZGRDbGFzcygnanMtZHJvcGRvd24tYWN0aXZlJylcbiAgICAgICAgLnBhcmVudCgnbGkuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgdmFyIGNsZWFyID0gQm94LkltTm90VG91Y2hpbmdZb3UoJHN1YiwgbnVsbCwgdHJ1ZSk7XG4gICAgaWYgKCFjbGVhcikge1xuICAgICAgdmFyIG9sZENsYXNzID0gdGhpcy5vcHRpb25zLmFsaWdubWVudCA9PT0gJ2xlZnQnID8gJy1yaWdodCcgOiAnLWxlZnQnLFxuICAgICAgICAgICRwYXJlbnRMaSA9ICRzdWIucGFyZW50KCcuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKTtcbiAgICAgICRwYXJlbnRMaS5yZW1vdmVDbGFzcyhgb3BlbnMke29sZENsYXNzfWApLmFkZENsYXNzKGBvcGVucy0ke3RoaXMub3B0aW9ucy5hbGlnbm1lbnR9YCk7XG4gICAgICBjbGVhciA9IEJveC5JbU5vdFRvdWNoaW5nWW91KCRzdWIsIG51bGwsIHRydWUpO1xuICAgICAgaWYgKCFjbGVhcikge1xuICAgICAgICAkcGFyZW50TGkucmVtb3ZlQ2xhc3MoYG9wZW5zLSR7dGhpcy5vcHRpb25zLmFsaWdubWVudH1gKS5hZGRDbGFzcygnb3BlbnMtaW5uZXInKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgICRzdWIuY3NzKCd2aXNpYmlsaXR5JywgJycpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKSB7IHRoaXMuX2FkZEJvZHlIYW5kbGVyKCk7IH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBuZXcgZHJvcGRvd24gcGFuZSBpcyB2aXNpYmxlLlxuICAgICAqIEBldmVudCBEcm9wZG93bk1lbnUjc2hvd1xuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignc2hvdy56Zi5kcm9wZG93bm1lbnUnLCBbJHN1Yl0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIGEgc2luZ2xlLCBjdXJyZW50bHkgb3BlbiBkcm9wZG93biBwYW5lLCBpZiBwYXNzZWQgYSBwYXJhbWV0ZXIsIG90aGVyd2lzZSwgaGlkZXMgZXZlcnl0aGluZy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIGVsZW1lbnQgd2l0aCBhIHN1Ym1lbnUgdG8gaGlkZVxuICAgKiBAcGFyYW0ge051bWJlcn0gaWR4IC0gaW5kZXggb2YgdGhlICR0YWJzIGNvbGxlY3Rpb24gdG8gaGlkZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2hpZGUoJGVsZW0sIGlkeCkge1xuICAgIHZhciAkdG9DbG9zZTtcbiAgICBpZiAoJGVsZW0gJiYgJGVsZW0ubGVuZ3RoKSB7XG4gICAgICAkdG9DbG9zZSA9ICRlbGVtO1xuICAgIH0gZWxzZSBpZiAoaWR4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICR0b0Nsb3NlID0gdGhpcy4kdGFicy5ub3QoZnVuY3Rpb24oaSwgZWwpIHtcbiAgICAgICAgcmV0dXJuIGkgPT09IGlkeDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICR0b0Nsb3NlID0gdGhpcy4kZWxlbWVudDtcbiAgICB9XG4gICAgdmFyIHNvbWV0aGluZ1RvQ2xvc2UgPSAkdG9DbG9zZS5oYXNDbGFzcygnaXMtYWN0aXZlJykgfHwgJHRvQ2xvc2UuZmluZCgnLmlzLWFjdGl2ZScpLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoc29tZXRoaW5nVG9DbG9zZSkge1xuICAgICAgJHRvQ2xvc2UuZmluZCgnbGkuaXMtYWN0aXZlJykuYWRkKCR0b0Nsb3NlKS5hdHRyKHtcbiAgICAgICAgJ2RhdGEtaXMtY2xpY2snOiBmYWxzZVxuICAgICAgfSkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICAkdG9DbG9zZS5maW5kKCd1bC5qcy1kcm9wZG93bi1hY3RpdmUnKS5yZW1vdmVDbGFzcygnanMtZHJvcGRvd24tYWN0aXZlJyk7XG5cbiAgICAgIGlmICh0aGlzLmNoYW5nZWQgfHwgJHRvQ2xvc2UuZmluZCgnb3BlbnMtaW5uZXInKS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG9sZENsYXNzID0gdGhpcy5vcHRpb25zLmFsaWdubWVudCA9PT0gJ2xlZnQnID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgICAgJHRvQ2xvc2UuZmluZCgnbGkuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKS5hZGQoJHRvQ2xvc2UpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGBvcGVucy1pbm5lciBvcGVucy0ke3RoaXMub3B0aW9ucy5hbGlnbm1lbnR9YClcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYG9wZW5zLSR7b2xkQ2xhc3N9YCk7XG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIHRoZSBvcGVuIG1lbnVzIGFyZSBjbG9zZWQuXG4gICAgICAgKiBAZXZlbnQgRHJvcGRvd25NZW51I2hpZGVcbiAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdoaWRlLnpmLmRyb3Bkb3dubWVudScsIFskdG9DbG9zZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcGx1Z2luLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJG1lbnVJdGVtcy5vZmYoJy56Zi5kcm9wZG93bm1lbnUnKS5yZW1vdmVBdHRyKCdkYXRhLWlzLWNsaWNrJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1yaWdodC1hcnJvdyBpcy1sZWZ0LWFycm93IGlzLWRvd24tYXJyb3cgb3BlbnMtcmlnaHQgb3BlbnMtbGVmdCBvcGVucy1pbm5lcicpO1xuICAgICQoZG9jdW1lbnQuYm9keSkub2ZmKCcuemYuZHJvcGRvd25tZW51Jyk7XG4gICAgTmVzdC5CdXJuKHRoaXMuJGVsZW1lbnQsICdkcm9wZG93bicpO1xuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBzZXR0aW5ncyBmb3IgcGx1Z2luXG4gKi9cbkRyb3Bkb3duTWVudS5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIERpc2FsbG93cyBob3ZlciBldmVudHMgZnJvbSBvcGVuaW5nIHN1Ym1lbnVzXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBkaXNhYmxlSG92ZXI6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgYSBzdWJtZW51IHRvIGF1dG9tYXRpY2FsbHkgY2xvc2Ugb24gYSBtb3VzZWxlYXZlIGV2ZW50LCBpZiBub3QgY2xpY2tlZCBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhdXRvY2xvc2U6IHRydWUsXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBkZWxheSBvcGVuaW5nIGEgc3VibWVudSBvbiBob3ZlciBldmVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MFxuICAgKi9cbiAgaG92ZXJEZWxheTogNTAsXG4gIC8qKlxuICAgKiBBbGxvdyBhIHN1Ym1lbnUgdG8gb3Blbi9yZW1haW4gb3BlbiBvbiBwYXJlbnQgY2xpY2sgZXZlbnQuIEFsbG93cyBjdXJzb3IgdG8gbW92ZSBhd2F5IGZyb20gbWVudS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGNsaWNrT3BlbjogZmFsc2UsXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBkZWxheSBjbG9zaW5nIGEgc3VibWVudSBvbiBhIG1vdXNlbGVhdmUgZXZlbnQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTAwXG4gICAqL1xuXG4gIGNsb3NpbmdUaW1lOiA1MDAsXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBvZiB0aGUgbWVudSByZWxhdGl2ZSB0byB3aGF0IGRpcmVjdGlvbiB0aGUgc3VibWVudXMgc2hvdWxkIG9wZW4uIEhhbmRsZWQgYnkgSlMuIENhbiBiZSBgJ2F1dG8nYCwgYCdsZWZ0J2Agb3IgYCdyaWdodCdgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgYWxpZ25tZW50OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvdyBjbGlja3Mgb24gdGhlIGJvZHkgdG8gY2xvc2UgYW55IG9wZW4gc3VibWVudXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25DbGljazogdHJ1ZSxcbiAgLyoqXG4gICAqIEFsbG93IGNsaWNrcyBvbiBsZWFmIGFuY2hvciBsaW5rcyB0byBjbG9zZSBhbnkgb3BlbiBzdWJtZW51cy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrSW5zaWRlOiB0cnVlLFxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byB2ZXJ0aWNhbCBvcmllbnRlZCBtZW51cywgRm91bmRhdGlvbiBkZWZhdWx0IGlzIGB2ZXJ0aWNhbGAuIFVwZGF0ZSB0aGlzIGlmIHVzaW5nIHlvdXIgb3duIGNsYXNzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICd2ZXJ0aWNhbCdcbiAgICovXG4gIHZlcnRpY2FsQ2xhc3M6ICd2ZXJ0aWNhbCcsXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHJpZ2h0LXNpZGUgb3JpZW50ZWQgbWVudXMsIEZvdW5kYXRpb24gZGVmYXVsdCBpcyBgYWxpZ24tcmlnaHRgLiBVcGRhdGUgdGhpcyBpZiB1c2luZyB5b3VyIG93biBjbGFzcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnYWxpZ24tcmlnaHQnXG4gICAqL1xuICByaWdodENsYXNzOiAnYWxpZ24tcmlnaHQnLFxuICAvKipcbiAgICogQm9vbGVhbiB0byBmb3JjZSBvdmVyaWRlIHRoZSBjbGlja2luZyBvZiBsaW5rcyB0byBwZXJmb3JtIGRlZmF1bHQgYWN0aW9uLCBvbiBzZWNvbmQgdG91Y2ggZXZlbnQgZm9yIG1vYmlsZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgZm9yY2VGb2xsb3c6IHRydWVcbn07XG5cbmV4cG9ydCB7RHJvcGRvd25NZW51fTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJvcGRvd25NZW51LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuXG4vKipcbiAqIFNtb290aFNjcm9sbCBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uc21vb3RoLXNjcm9sbFxuICovXG5jbGFzcyBTbW9vdGhTY3JvbGwgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBTbW9vdGhTY3JvbGwuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBTbW9vdGhTY3JvbGxcbiAgICogQGZpcmVzIFNtb290aFNjcm9sbCNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBhZGQgdGhlIHRyaWdnZXIgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gICAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBTbW9vdGhTY3JvbGwuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSAnU21vb3RoU2Nyb2xsJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIFNtb290aFNjcm9sbCBwbHVnaW5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pbml0KCkge1xuICAgICAgICB2YXIgaWQgPSB0aGlzLiRlbGVtZW50WzBdLmlkIHx8IEdldFlvRGlnaXRzKDYsICdzbW9vdGgtc2Nyb2xsJyk7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7XG4gICAgICAgICAgICAnaWQnOiBpZFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9ldmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIFNtb290aFNjcm9sbC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9ldmVudHMoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgLy8gY2xpY2sgaGFuZGxlciBmdW5jdGlvbi5cbiAgICAgICAgdmFyIGhhbmRsZUxpbmtDbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIGV4aXQgZnVuY3Rpb24gaWYgdGhlIGV2ZW50IHNvdXJjZSBpc24ndCBjb21pbmcgZnJvbSBhbiBhbmNob3Igd2l0aCBocmVmIGF0dHJpYnV0ZSBzdGFydHMgd2l0aCAnIydcbiAgICAgICAgICAgIGlmKCEkKHRoaXMpLmlzKCdhW2hyZWZePVwiI1wiXScpKSAge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFycml2YWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAgICAgICBfdGhpcy5faW5UcmFuc2l0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgU21vb3RoU2Nyb2xsLnNjcm9sbFRvTG9jKGFycml2YWwsIF90aGlzLm9wdGlvbnMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9pblRyYW5zaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suemYuc21vb3RoU2Nyb2xsJywgaGFuZGxlTGlua0NsaWNrKVxuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay56Zi5zbW9vdGhTY3JvbGwnLCAnYVtocmVmXj1cIiNcIl0nLCBoYW5kbGVMaW5rQ2xpY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNjcm9sbCB0byBhIGdpdmVuIGxvY2F0aW9uIG9uIHRoZSBwYWdlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsb2MgLSBBIHByb3Blcmx5IGZvcm1hdHRlZCBqUXVlcnkgaWQgc2VsZWN0b3IuIEV4YW1wbGU6ICcjZm9vJ1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gdXNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgc2Nyb2xsVG9Mb2MobG9jLCBvcHRpb25zID0gU21vb3RoU2Nyb2xsLmRlZmF1bHRzLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRhcmdldCBkb2VzIG5vdCBleGlzdCB0byBwcmV2ZW50IGVycm9yc1xuICAgICAgICBpZiAoISQobG9jKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzY3JvbGxQb3MgPSBNYXRoLnJvdW5kKCQobG9jKS5vZmZzZXQoKS50b3AgLSBvcHRpb25zLnRocmVzaG9sZCAvIDIgLSBvcHRpb25zLm9mZnNldCk7XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AodHJ1ZSkuYW5pbWF0ZShcbiAgICAgICAgICAgIHsgc2Nyb2xsVG9wOiBzY3JvbGxQb3MgfSxcbiAgICAgICAgICAgIG9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICBvcHRpb25zLmFuaW1hdGlvbkVhc2luZyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjayA9PSBcImZ1bmN0aW9uXCIpe1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBzZXR0aW5ncyBmb3IgcGx1Z2luLlxuICovXG5TbW9vdGhTY3JvbGwuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSwgaW4gbXMsIHRoZSBhbmltYXRlZCBzY3JvbGxpbmcgc2hvdWxkIHRha2UgYmV0d2VlbiBsb2NhdGlvbnMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTAwXG4gICAqL1xuICBhbmltYXRpb25EdXJhdGlvbjogNTAwLFxuICAvKipcbiAgICogQW5pbWF0aW9uIHN0eWxlIHRvIHVzZSB3aGVuIHNjcm9sbGluZyBiZXR3ZWVuIGxvY2F0aW9ucy4gQ2FuIGJlIGAnc3dpbmcnYCBvciBgJ2xpbmVhcidgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdsaW5lYXInXG4gICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vYXBpLmpxdWVyeS5jb20vYW5pbWF0ZXxKcXVlcnkgYW5pbWF0ZX1cbiAgICovXG4gIGFuaW1hdGlvbkVhc2luZzogJ2xpbmVhcicsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIHRvIHVzZSBhcyBhIG1hcmtlciBmb3IgbG9jYXRpb24gY2hhbmdlcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MFxuICAgKi9cbiAgdGhyZXNob2xkOiA1MCxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgdG8gb2Zmc2V0IHRoZSBzY3JvbGwgb2YgdGhlIHBhZ2Ugb24gaXRlbSBjbGljayBpZiB1c2luZyBhIHN0aWNreSBuYXYgYmFyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIG9mZnNldDogMFxufVxuXG5leHBvcnQge1Ntb290aFNjcm9sbH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uc21vb3RoU2Nyb2xsLmpzIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IHdoYXRJbnB1dCBmcm9tIFwid2hhdC1pbnB1dFwiO1xuXG53aW5kb3cuJCA9ICQ7XG5cbi8vIGltcG9ydCBGb3VuZGF0aW9uIGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMnO1xuLy8gSWYgeW91IHdhbnQgdG8gcGljayBhbmQgY2hvb3NlIHdoaWNoIG1vZHVsZXMgdG8gaW5jbHVkZSwgY29tbWVudCBvdXQgdGhlIGFib3ZlIGFuZCB1bmNvbW1lbnRcbi8vIHRoZSBsaW5lIGJlbG93XG5pbXBvcnQgXCIuL2xpYi9mb3VuZGF0aW9uLWV4cGxpY2l0LXBpZWNlc1wiO1xuLy8gaW1wb3J0ICcuL2xpYi9hbmltYXRpb25zJztcblxuJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuXG4kKFwiLm1lbnUtaWNvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHQkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiaG92ZXJcIik7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL2FwcC5qcyIsIi8qKlxuICogd2hhdC1pbnB1dCAtIEEgZ2xvYmFsIHV0aWxpdHkgZm9yIHRyYWNraW5nIHRoZSBjdXJyZW50IGlucHV0IG1ldGhvZCAobW91c2UsIGtleWJvYXJkIG9yIHRvdWNoKS5cbiAqIEB2ZXJzaW9uIHY0LjMuMVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3RlbjFzZXZlbi93aGF0LWlucHV0XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ3aGF0SW5wdXRcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wid2hhdElucHV0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIndoYXRJbnB1dFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgLypcblx0ICAgKiB2YXJpYWJsZXNcblx0ICAgKi9cblxuXHQgIC8vIGxhc3QgdXNlZCBpbnB1dCB0eXBlXG5cdCAgdmFyIGN1cnJlbnRJbnB1dCA9ICdpbml0aWFsJztcblxuXHQgIC8vIGxhc3QgdXNlZCBpbnB1dCBpbnRlbnRcblx0ICB2YXIgY3VycmVudEludGVudCA9IG51bGw7XG5cblx0ICAvLyBjYWNoZSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblx0ICB2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cdCAgLy8gZm9ybSBpbnB1dCB0eXBlc1xuXHQgIHZhciBmb3JtSW5wdXRzID0gWydpbnB1dCcsICdzZWxlY3QnLCAndGV4dGFyZWEnXTtcblxuXHQgIHZhciBmdW5jdGlvbkxpc3QgPSBbXTtcblxuXHQgIC8vIGxpc3Qgb2YgbW9kaWZpZXIga2V5cyBjb21tb25seSB1c2VkIHdpdGggdGhlIG1vdXNlIGFuZFxuXHQgIC8vIGNhbiBiZSBzYWZlbHkgaWdub3JlZCB0byBwcmV2ZW50IGZhbHNlIGtleWJvYXJkIGRldGVjdGlvblxuXHQgIHZhciBpZ25vcmVNYXAgPSBbMTYsIC8vIHNoaWZ0XG5cdCAgMTcsIC8vIGNvbnRyb2xcblx0ICAxOCwgLy8gYWx0XG5cdCAgOTEsIC8vIFdpbmRvd3Mga2V5IC8gbGVmdCBBcHBsZSBjbWRcblx0ICA5MyAvLyBXaW5kb3dzIG1lbnUgLyByaWdodCBBcHBsZSBjbWRcblx0ICBdO1xuXG5cdCAgLy8gbGlzdCBvZiBrZXlzIGZvciB3aGljaCB3ZSBjaGFuZ2UgaW50ZW50IGV2ZW4gZm9yIGZvcm0gaW5wdXRzXG5cdCAgdmFyIGNoYW5nZUludGVudE1hcCA9IFs5IC8vIHRhYlxuXHQgIF07XG5cblx0ICAvLyBtYXBwaW5nIG9mIGV2ZW50cyB0byBpbnB1dCB0eXBlc1xuXHQgIHZhciBpbnB1dE1hcCA9IHtcblx0ICAgIGtleWRvd246ICdrZXlib2FyZCcsXG5cdCAgICBrZXl1cDogJ2tleWJvYXJkJyxcblx0ICAgIG1vdXNlZG93bjogJ21vdXNlJyxcblx0ICAgIG1vdXNlbW92ZTogJ21vdXNlJyxcblx0ICAgIE1TUG9pbnRlckRvd246ICdwb2ludGVyJyxcblx0ICAgIE1TUG9pbnRlck1vdmU6ICdwb2ludGVyJyxcblx0ICAgIHBvaW50ZXJkb3duOiAncG9pbnRlcicsXG5cdCAgICBwb2ludGVybW92ZTogJ3BvaW50ZXInLFxuXHQgICAgdG91Y2hzdGFydDogJ3RvdWNoJ1xuXHQgIH07XG5cblx0ICAvLyBhcnJheSBvZiBhbGwgdXNlZCBpbnB1dCB0eXBlc1xuXHQgIHZhciBpbnB1dFR5cGVzID0gW107XG5cblx0ICAvLyBib29sZWFuOiB0cnVlIGlmIHRvdWNoIGJ1ZmZlciBpcyBhY3RpdmVcblx0ICB2YXIgaXNCdWZmZXJpbmcgPSBmYWxzZTtcblxuXHQgIC8vIGJvb2xlYW46IHRydWUgaWYgdGhlIHBhZ2UgaXMgYmVpbmcgc2Nyb2xsZWRcblx0ICB2YXIgaXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuXHQgIC8vIHN0b3JlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cblx0ICB2YXIgbW91c2VQb3MgPSB7XG5cdCAgICB4OiBudWxsLFxuXHQgICAgeTogbnVsbFxuXHQgIH07XG5cblx0ICAvLyBtYXAgb2YgSUUgMTAgcG9pbnRlciBldmVudHNcblx0ICB2YXIgcG9pbnRlck1hcCA9IHtcblx0ICAgIDI6ICd0b3VjaCcsXG5cdCAgICAzOiAndG91Y2gnLCAvLyB0cmVhdCBwZW4gbGlrZSB0b3VjaFxuXHQgICAgNDogJ21vdXNlJ1xuXHQgIH07XG5cblx0ICB2YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG5cblx0ICB0cnkge1xuXHQgICAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0ICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuXHQgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBvcHRzKTtcblx0ICB9IGNhdGNoIChlKSB7fVxuXG5cdCAgLypcblx0ICAgKiBzZXQgdXBcblx0ICAgKi9cblxuXHQgIHZhciBzZXRVcCA9IGZ1bmN0aW9uIHNldFVwKCkge1xuXHQgICAgLy8gYWRkIGNvcnJlY3QgbW91c2Ugd2hlZWwgZXZlbnQgbWFwcGluZyB0byBgaW5wdXRNYXBgXG5cdCAgICBpbnB1dE1hcFtkZXRlY3RXaGVlbCgpXSA9ICdtb3VzZSc7XG5cblx0ICAgIGFkZExpc3RlbmVycygpO1xuXHQgICAgc2V0SW5wdXQoKTtcblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiBldmVudHNcblx0ICAgKi9cblxuXHQgIHZhciBhZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG5cdCAgICAvLyBgcG9pbnRlcm1vdmVgLCBgTVNQb2ludGVyTW92ZWAsIGBtb3VzZW1vdmVgIGFuZCBtb3VzZSB3aGVlbCBldmVudCBiaW5kaW5nXG5cdCAgICAvLyBjYW4gb25seSBkZW1vbnN0cmF0ZSBwb3RlbnRpYWwsIGJ1dCBub3QgYWN0dWFsLCBpbnRlcmFjdGlvblxuXHQgICAgLy8gYW5kIGFyZSB0cmVhdGVkIHNlcGFyYXRlbHlcblx0ICAgIHZhciBvcHRpb25zID0gc3VwcG9ydHNQYXNzaXZlID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZTtcblxuXHQgICAgLy8gcG9pbnRlciBldmVudHMgKG1vdXNlLCBwZW4sIHRvdWNoKVxuXHQgICAgaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdXBkYXRlSW5wdXQpO1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBzZXRJbnRlbnQpO1xuXHQgICAgfSBlbHNlIGlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQpIHtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlckRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJNb3ZlJywgc2V0SW50ZW50KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIG1vdXNlIGV2ZW50c1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdXBkYXRlSW5wdXQpO1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc2V0SW50ZW50KTtcblxuXHQgICAgICAvLyB0b3VjaCBldmVudHNcblx0ICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuXHQgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hCdWZmZXIsIG9wdGlvbnMpO1xuXHQgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoQnVmZmVyKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICAvLyBtb3VzZSB3aGVlbFxuXHQgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoZGV0ZWN0V2hlZWwoKSwgc2V0SW50ZW50LCBvcHRpb25zKTtcblxuXHQgICAgLy8ga2V5Ym9hcmQgZXZlbnRzXG5cdCAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHVwZGF0ZUlucHV0KTtcblx0ICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZUlucHV0KTtcblx0ICB9O1xuXG5cdCAgLy8gY2hlY2tzIGNvbmRpdGlvbnMgYmVmb3JlIHVwZGF0aW5nIG5ldyBpbnB1dFxuXHQgIHZhciB1cGRhdGVJbnB1dCA9IGZ1bmN0aW9uIHVwZGF0ZUlucHV0KGV2ZW50KSB7XG5cdCAgICAvLyBvbmx5IGV4ZWN1dGUgaWYgdGhlIHRvdWNoIGJ1ZmZlciB0aW1lciBpc24ndCBydW5uaW5nXG5cdCAgICBpZiAoIWlzQnVmZmVyaW5nKSB7XG5cdCAgICAgIHZhciBldmVudEtleSA9IGV2ZW50LndoaWNoO1xuXHQgICAgICB2YXIgdmFsdWUgPSBpbnB1dE1hcFtldmVudC50eXBlXTtcblx0ICAgICAgaWYgKHZhbHVlID09PSAncG9pbnRlcicpIHZhbHVlID0gcG9pbnRlclR5cGUoZXZlbnQpO1xuXG5cdCAgICAgIGlmIChjdXJyZW50SW5wdXQgIT09IHZhbHVlIHx8IGN1cnJlbnRJbnRlbnQgIT09IHZhbHVlKSB7XG5cdCAgICAgICAgdmFyIGFjdGl2ZUVsZW0gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHQgICAgICAgIHZhciBhY3RpdmVJbnB1dCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBub3RGb3JtSW5wdXQgPSBhY3RpdmVFbGVtICYmIGFjdGl2ZUVsZW0ubm9kZU5hbWUgJiYgZm9ybUlucHV0cy5pbmRleE9mKGFjdGl2ZUVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgPT09IC0xO1xuXG5cdCAgICAgICAgaWYgKG5vdEZvcm1JbnB1dCB8fCBjaGFuZ2VJbnRlbnRNYXAuaW5kZXhPZihldmVudEtleSkgIT09IC0xKSB7XG5cdCAgICAgICAgICBhY3RpdmVJbnB1dCA9IHRydWU7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKHZhbHVlID09PSAndG91Y2gnIHx8XG5cdCAgICAgICAgLy8gaWdub3JlIG1vdXNlIG1vZGlmaWVyIGtleXNcblx0ICAgICAgICB2YWx1ZSA9PT0gJ21vdXNlJyB8fFxuXHQgICAgICAgIC8vIGRvbid0IHN3aXRjaCBpZiB0aGUgY3VycmVudCBlbGVtZW50IGlzIGEgZm9ybSBpbnB1dFxuXHQgICAgICAgIHZhbHVlID09PSAna2V5Ym9hcmQnICYmIGV2ZW50S2V5ICYmIGFjdGl2ZUlucHV0ICYmIGlnbm9yZU1hcC5pbmRleE9mKGV2ZW50S2V5KSA9PT0gLTEpIHtcblx0ICAgICAgICAgIC8vIHNldCB0aGUgY3VycmVudCBhbmQgY2F0Y2gtYWxsIHZhcmlhYmxlXG5cdCAgICAgICAgICBjdXJyZW50SW5wdXQgPSBjdXJyZW50SW50ZW50ID0gdmFsdWU7XG5cblx0ICAgICAgICAgIHNldElucHV0KCk7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIHVwZGF0ZXMgdGhlIGRvYyBhbmQgYGlucHV0VHlwZXNgIGFycmF5IHdpdGggbmV3IGlucHV0XG5cdCAgdmFyIHNldElucHV0ID0gZnVuY3Rpb24gc2V0SW5wdXQoKSB7XG5cdCAgICBkb2Muc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRpbnB1dCcsIGN1cnJlbnRJbnB1dCk7XG5cdCAgICBkb2Muc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRpbnRlbnQnLCBjdXJyZW50SW5wdXQpO1xuXG5cdCAgICBpZiAoaW5wdXRUeXBlcy5pbmRleE9mKGN1cnJlbnRJbnB1dCkgPT09IC0xKSB7XG5cdCAgICAgIGlucHV0VHlwZXMucHVzaChjdXJyZW50SW5wdXQpO1xuXHQgICAgICBkb2MuY2xhc3NOYW1lICs9ICcgd2hhdGlucHV0LXR5cGVzLScgKyBjdXJyZW50SW5wdXQ7XG5cdCAgICB9XG5cblx0ICAgIGZpcmVGdW5jdGlvbnMoJ2lucHV0Jyk7XG5cdCAgfTtcblxuXHQgIC8vIHVwZGF0ZXMgaW5wdXQgaW50ZW50IGZvciBgbW91c2Vtb3ZlYCBhbmQgYHBvaW50ZXJtb3ZlYFxuXHQgIHZhciBzZXRJbnRlbnQgPSBmdW5jdGlvbiBzZXRJbnRlbnQoZXZlbnQpIHtcblx0ICAgIC8vIHRlc3QgdG8gc2VlIGlmIGBtb3VzZW1vdmVgIGhhcHBlbmVkIHJlbGF0aXZlIHRvIHRoZSBzY3JlZW5cblx0ICAgIC8vIHRvIGRldGVjdCBzY3JvbGxpbmcgdmVyc3VzIG1vdXNlbW92ZVxuXHQgICAgaWYgKG1vdXNlUG9zWyd4J10gIT09IGV2ZW50LnNjcmVlblggfHwgbW91c2VQb3NbJ3knXSAhPT0gZXZlbnQuc2NyZWVuWSkge1xuXHQgICAgICBpc1Njcm9sbGluZyA9IGZhbHNlO1xuXG5cdCAgICAgIG1vdXNlUG9zWyd4J10gPSBldmVudC5zY3JlZW5YO1xuXHQgICAgICBtb3VzZVBvc1sneSddID0gZXZlbnQuc2NyZWVuWTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlzU2Nyb2xsaW5nID0gdHJ1ZTtcblx0ICAgIH1cblxuXHQgICAgLy8gb25seSBleGVjdXRlIGlmIHRoZSB0b3VjaCBidWZmZXIgdGltZXIgaXNuJ3QgcnVubmluZ1xuXHQgICAgLy8gb3Igc2Nyb2xsaW5nIGlzbid0IGhhcHBlbmluZ1xuXHQgICAgaWYgKCFpc0J1ZmZlcmluZyAmJiAhaXNTY3JvbGxpbmcpIHtcblx0ICAgICAgdmFyIHZhbHVlID0gaW5wdXRNYXBbZXZlbnQudHlwZV07XG5cdCAgICAgIGlmICh2YWx1ZSA9PT0gJ3BvaW50ZXInKSB2YWx1ZSA9IHBvaW50ZXJUeXBlKGV2ZW50KTtcblxuXHQgICAgICBpZiAoY3VycmVudEludGVudCAhPT0gdmFsdWUpIHtcblx0ICAgICAgICBjdXJyZW50SW50ZW50ID0gdmFsdWU7XG5cblx0ICAgICAgICBkb2Muc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRpbnRlbnQnLCBjdXJyZW50SW50ZW50KTtcblxuXHQgICAgICAgIGZpcmVGdW5jdGlvbnMoJ2ludGVudCcpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIGJ1ZmZlcnMgdG91Y2ggZXZlbnRzIGJlY2F1c2UgdGhleSBmcmVxdWVudGx5IGFsc28gZmlyZSBtb3VzZSBldmVudHNcblx0ICB2YXIgdG91Y2hCdWZmZXIgPSBmdW5jdGlvbiB0b3VjaEJ1ZmZlcihldmVudCkge1xuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuXHQgICAgICBpc0J1ZmZlcmluZyA9IGZhbHNlO1xuXG5cdCAgICAgIC8vIHNldCB0aGUgY3VycmVudCBpbnB1dFxuXHQgICAgICB1cGRhdGVJbnB1dChldmVudCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpc0J1ZmZlcmluZyA9IHRydWU7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIHZhciBmaXJlRnVuY3Rpb25zID0gZnVuY3Rpb24gZmlyZUZ1bmN0aW9ucyh0eXBlKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZnVuY3Rpb25MaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgIGlmIChmdW5jdGlvbkxpc3RbaV0udHlwZSA9PT0gdHlwZSkge1xuXHQgICAgICAgIGZ1bmN0aW9uTGlzdFtpXS5mbi5jYWxsKHVuZGVmaW5lZCwgY3VycmVudEludGVudCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiB1dGlsaXRpZXNcblx0ICAgKi9cblxuXHQgIHZhciBwb2ludGVyVHlwZSA9IGZ1bmN0aW9uIHBvaW50ZXJUeXBlKGV2ZW50KSB7XG5cdCAgICBpZiAodHlwZW9mIGV2ZW50LnBvaW50ZXJUeXBlID09PSAnbnVtYmVyJykge1xuXHQgICAgICByZXR1cm4gcG9pbnRlck1hcFtldmVudC5wb2ludGVyVHlwZV07XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyB0cmVhdCBwZW4gbGlrZSB0b3VjaFxuXHQgICAgICByZXR1cm4gZXZlbnQucG9pbnRlclR5cGUgPT09ICdwZW4nID8gJ3RvdWNoJyA6IGV2ZW50LnBvaW50ZXJUeXBlO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyBkZXRlY3QgdmVyc2lvbiBvZiBtb3VzZSB3aGVlbCBldmVudCB0byB1c2Vcblx0ICAvLyB2aWEgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzL3doZWVsXG5cdCAgdmFyIGRldGVjdFdoZWVsID0gZnVuY3Rpb24gZGV0ZWN0V2hlZWwoKSB7XG5cdCAgICB2YXIgd2hlZWxUeXBlID0gdm9pZCAwO1xuXG5cdCAgICAvLyBNb2Rlcm4gYnJvd3NlcnMgc3VwcG9ydCBcIndoZWVsXCJcblx0ICAgIGlmICgnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpIHtcblx0ICAgICAgd2hlZWxUeXBlID0gJ3doZWVsJztcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIFdlYmtpdCBhbmQgSUUgc3VwcG9ydCBhdCBsZWFzdCBcIm1vdXNld2hlZWxcIlxuXHQgICAgICAvLyBvciBhc3N1bWUgdGhhdCByZW1haW5pbmcgYnJvd3NlcnMgYXJlIG9sZGVyIEZpcmVmb3hcblx0ICAgICAgd2hlZWxUeXBlID0gZG9jdW1lbnQub25tb3VzZXdoZWVsICE9PSB1bmRlZmluZWQgPyAnbW91c2V3aGVlbCcgOiAnRE9NTW91c2VTY3JvbGwnO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gd2hlZWxUeXBlO1xuXHQgIH07XG5cblx0ICB2YXIgb2JqUG9zID0gZnVuY3Rpb24gb2JqUG9zKG1hdGNoKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZnVuY3Rpb25MaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgIGlmIChmdW5jdGlvbkxpc3RbaV0uZm4gPT09IG1hdGNoKSB7XG5cdCAgICAgICAgcmV0dXJuIGk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiBpbml0XG5cdCAgICovXG5cblx0ICAvLyBkb24ndCBzdGFydCBzY3JpcHQgdW5sZXNzIGJyb3dzZXIgY3V0cyB0aGUgbXVzdGFyZFxuXHQgIC8vIChhbHNvIHBhc3NlcyBpZiBwb2x5ZmlsbHMgYXJlIHVzZWQpXG5cdCAgaWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cgJiYgQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcblx0ICAgIHNldFVwKCk7XG5cdCAgfVxuXG5cdCAgLypcblx0ICAgKiBhcGlcblx0ICAgKi9cblxuXHQgIHJldHVybiB7XG5cdCAgICAvLyByZXR1cm5zIHN0cmluZzogdGhlIGN1cnJlbnQgaW5wdXQgdHlwZVxuXHQgICAgLy8gb3B0OiAnbG9vc2UnfCdzdHJpY3QnXG5cdCAgICAvLyAnc3RyaWN0JyAoZGVmYXVsdCk6IHJldHVybnMgdGhlIHNhbWUgdmFsdWUgYXMgdGhlIGBkYXRhLXdoYXRpbnB1dGAgYXR0cmlidXRlXG5cdCAgICAvLyAnbG9vc2UnOiBpbmNsdWRlcyBgZGF0YS13aGF0aW50ZW50YCB2YWx1ZSBpZiBpdCdzIG1vcmUgY3VycmVudCB0aGFuIGBkYXRhLXdoYXRpbnB1dGBcblx0ICAgIGFzazogZnVuY3Rpb24gYXNrKG9wdCkge1xuXHQgICAgICByZXR1cm4gb3B0ID09PSAnbG9vc2UnID8gY3VycmVudEludGVudCA6IGN1cnJlbnRJbnB1dDtcblx0ICAgIH0sXG5cblx0ICAgIC8vIHJldHVybnMgYXJyYXk6IGFsbCB0aGUgZGV0ZWN0ZWQgaW5wdXQgdHlwZXNcblx0ICAgIHR5cGVzOiBmdW5jdGlvbiB0eXBlcygpIHtcblx0ICAgICAgcmV0dXJuIGlucHV0VHlwZXM7XG5cdCAgICB9LFxuXG5cdCAgICAvLyBvdmVyd3JpdGVzIGlnbm9yZWQga2V5cyB3aXRoIHByb3ZpZGVkIGFycmF5XG5cdCAgICBpZ25vcmVLZXlzOiBmdW5jdGlvbiBpZ25vcmVLZXlzKGFycikge1xuXHQgICAgICBpZ25vcmVNYXAgPSBhcnI7XG5cdCAgICB9LFxuXG5cdCAgICAvLyBhdHRhY2ggZnVuY3Rpb25zIHRvIGlucHV0IGFuZCBpbnRlbnQgXCJldmVudHNcIlxuXHQgICAgLy8gZnVuY3Q6IGZ1bmN0aW9uIHRvIGZpcmUgb24gY2hhbmdlXG5cdCAgICAvLyBldmVudFR5cGU6ICdpbnB1dCd8J2ludGVudCdcblx0ICAgIHJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHJlZ2lzdGVyT25DaGFuZ2UoZm4sIGV2ZW50VHlwZSkge1xuXHQgICAgICBmdW5jdGlvbkxpc3QucHVzaCh7XG5cdCAgICAgICAgZm46IGZuLFxuXHQgICAgICAgIHR5cGU6IGV2ZW50VHlwZSB8fCAnaW5wdXQnXG5cdCAgICAgIH0pO1xuXHQgICAgfSxcblxuXHQgICAgdW5SZWdpc3Rlck9uQ2hhbmdlOiBmdW5jdGlvbiB1blJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcblx0ICAgICAgdmFyIHBvc2l0aW9uID0gb2JqUG9zKGZuKTtcblxuXHQgICAgICBpZiAocG9zaXRpb24pIHtcblx0ICAgICAgICBmdW5jdGlvbkxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cdH0oKTtcblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doYXQtaW5wdXQvZGlzdC93aGF0LWlucHV0LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgRm91bmRhdGlvbiB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlJztcbmltcG9ydCB7IHJ0bCwgR2V0WW9EaWdpdHMsIHRyYW5zaXRpb25lbmQgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IEJveCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmJveCdcbmltcG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXInO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24sIE1vdmUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuaW1wb3J0IHsgTmVzdCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm5lc3QnO1xuaW1wb3J0IHsgVGltZXIgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50aW1lcic7XG5pbXBvcnQgeyBUb3VjaCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRvdWNoJztcbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuLy8gaW1wb3J0IHsgQWJpZGUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWJpZGUnO1xuaW1wb3J0IHsgQWNjb3JkaW9uIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbic7XG5pbXBvcnQgeyBBY2NvcmRpb25NZW51IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbk1lbnUnO1xuLy8gaW1wb3J0IHsgRHJpbGxkb3duIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyaWxsZG93bic7XG5pbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bic7XG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJvcGRvd25NZW51JztcbmltcG9ydCB7IEVxdWFsaXplciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5lcXVhbGl6ZXInO1xuaW1wb3J0IHsgSW50ZXJjaGFuZ2UgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uaW50ZXJjaGFuZ2UnO1xuaW1wb3J0IHsgTWFnZWxsYW4gfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ubWFnZWxsYW4nO1xuaW1wb3J0IHsgT2ZmQ2FudmFzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLm9mZmNhbnZhcyc7XG4vLyBpbXBvcnQgeyBPcmJpdCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vcmJpdCc7XG5pbXBvcnQgeyBSZXNwb25zaXZlTWVudSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlTWVudSc7XG5pbXBvcnQgeyBSZXNwb25zaXZlVG9nZ2xlIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVUb2dnbGUnO1xuaW1wb3J0IHsgUmV2ZWFsIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJldmVhbCc7XG4vLyBpbXBvcnQgeyBTbGlkZXIgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uc2xpZGVyJztcbmltcG9ydCB7IFNtb290aFNjcm9sbCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zbW9vdGhTY3JvbGwnO1xuaW1wb3J0IHsgU3RpY2t5IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnN0aWNreSc7XG4vLyBpbXBvcnQgeyBUYWJzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRhYnMnO1xuaW1wb3J0IHsgVG9nZ2xlciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50b2dnbGVyJztcbi8vIGltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9vbHRpcCc7XG4vLyBpbXBvcnQgeyBSZXNwb25zaXZlQWNjb3JkaW9uVGFicyB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlQWNjb3JkaW9uVGFicyc7XG5cblxuRm91bmRhdGlvbi5hZGRUb0pxdWVyeSgkKTtcblxuLy8gQWRkIEZvdW5kYXRpb24gVXRpbHMgdG8gRm91bmRhdGlvbiBnbG9iYWwgbmFtZXNwYWNlIGZvciBiYWNrd2FyZHNcbi8vIGNvbXBhdGliaWxpdHkuXG5cbkZvdW5kYXRpb24ucnRsID0gcnRsO1xuRm91bmRhdGlvbi5HZXRZb0RpZ2l0cyA9IEdldFlvRGlnaXRzO1xuRm91bmRhdGlvbi50cmFuc2l0aW9uZW5kID0gdHJhbnNpdGlvbmVuZDtcblxuRm91bmRhdGlvbi5Cb3ggPSBCb3g7XG5Gb3VuZGF0aW9uLm9uSW1hZ2VzTG9hZGVkID0gb25JbWFnZXNMb2FkZWQ7XG5Gb3VuZGF0aW9uLktleWJvYXJkID0gS2V5Ym9hcmQ7XG5Gb3VuZGF0aW9uLk1lZGlhUXVlcnkgPSBNZWRpYVF1ZXJ5O1xuRm91bmRhdGlvbi5Nb3Rpb24gPSBNb3Rpb247XG5Gb3VuZGF0aW9uLk1vdmUgPSBNb3ZlO1xuRm91bmRhdGlvbi5OZXN0ID0gTmVzdDtcbkZvdW5kYXRpb24uVGltZXIgPSBUaW1lcjtcblxuLy8gVG91Y2ggYW5kIFRyaWdnZXJzIHByZXZpb3VzbHkgd2VyZSBhbG1vc3QgcHVyZWx5IHNlZGUgZWZmZWN0IGRyaXZlbixcbi8vIHNvIG5vIC8vIG5lZWQgdG8gYWRkIGl0IHRvIEZvdW5kYXRpb24sIGp1c3QgaW5pdCB0aGVtLlxuXG5Ub3VjaC5pbml0KCQpO1xuXG5UcmlnZ2Vycy5pbml0KCQsIEZvdW5kYXRpb24pO1xuXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihBYmlkZSwgJ0FiaWRlJyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKEFjY29yZGlvbiwgJ0FjY29yZGlvbicpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihBY2NvcmRpb25NZW51LCAnQWNjb3JkaW9uTWVudScpO1xuXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihEcmlsbGRvd24sICdEcmlsbGRvd24nKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oRHJvcGRvd24sICdEcm9wZG93bicpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihEcm9wZG93bk1lbnUsICdEcm9wZG93bk1lbnUnKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oRXF1YWxpemVyLCAnRXF1YWxpemVyJyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKEludGVyY2hhbmdlLCAnSW50ZXJjaGFuZ2UnKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oTWFnZWxsYW4sICdNYWdlbGxhbicpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihPZmZDYW52YXMsICdPZmZDYW52YXMnKTtcblxuLy8gRm91bmRhdGlvbi5wbHVnaW4oT3JiaXQsICdPcmJpdCcpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihSZXNwb25zaXZlTWVudSwgJ1Jlc3BvbnNpdmVNZW51Jyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVUb2dnbGUsICdSZXNwb25zaXZlVG9nZ2xlJyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKFJldmVhbCwgJ1JldmVhbCcpO1xuXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihTbGlkZXIsICdTbGlkZXInKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oU21vb3RoU2Nyb2xsLCAnU21vb3RoU2Nyb2xsJyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKFN0aWNreSwgJ1N0aWNreScpO1xuXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihUYWJzLCAnVGFicycpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihUb2dnbGVyLCAnVG9nZ2xlcicpO1xuXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihUb29sdGlwLCAnVG9vbHRpcCcpO1xuXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihSZXNwb25zaXZlQWNjb3JkaW9uVGFicywgJ1Jlc3BvbnNpdmVBY2NvcmRpb25UYWJzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm91bmRhdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvbGliL2ZvdW5kYXRpb24tZXhwbGljaXQtcGllY2VzLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuXG52YXIgRk9VTkRBVElPTl9WRVJTSU9OID0gJzYuNC4zJztcblxuLy8gR2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4vLyBUaGlzIGlzIGF0dGFjaGVkIHRvIHRoZSB3aW5kb3csIG9yIHVzZWQgYXMgYSBtb2R1bGUgZm9yIEFNRC9Ccm93c2VyaWZ5XG52YXIgRm91bmRhdGlvbiA9IHtcbiAgdmVyc2lvbjogRk9VTkRBVElPTl9WRVJTSU9OLFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW5pdGlhbGl6ZWQgcGx1Z2lucy5cbiAgICovXG4gIF9wbHVnaW5zOiB7fSxcblxuICAvKipcbiAgICogU3RvcmVzIGdlbmVyYXRlZCB1bmlxdWUgaWRzIGZvciBwbHVnaW4gaW5zdGFuY2VzXG4gICAqL1xuICBfdXVpZHM6IFtdLFxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGEgRm91bmRhdGlvbiBwbHVnaW4sIGFkZGluZyBpdCB0byB0aGUgYEZvdW5kYXRpb25gIG5hbWVzcGFjZSBhbmQgdGhlIGxpc3Qgb2YgcGx1Z2lucyB0byBpbml0aWFsaXplIHdoZW4gcmVmbG93aW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBwbHVnaW4uXG4gICAqL1xuICBwbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSkge1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gYWRkaW5nIHRvIGdsb2JhbCBGb3VuZGF0aW9uIG9iamVjdFxuICAgIC8vIEV4YW1wbGVzOiBGb3VuZGF0aW9uLlJldmVhbCwgRm91bmRhdGlvbi5PZmZDYW52YXNcbiAgICB2YXIgY2xhc3NOYW1lID0gKG5hbWUgfHwgZnVuY3Rpb25OYW1lKHBsdWdpbikpO1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gc3RvcmluZyB0aGUgcGx1Z2luLCBhbHNvIHVzZWQgdG8gY3JlYXRlIHRoZSBpZGVudGlmeWluZyBkYXRhIGF0dHJpYnV0ZSBmb3IgdGhlIHBsdWdpblxuICAgIC8vIEV4YW1wbGVzOiBkYXRhLXJldmVhbCwgZGF0YS1vZmYtY2FudmFzXG4gICAgdmFyIGF0dHJOYW1lICA9IGh5cGhlbmF0ZShjbGFzc05hbWUpO1xuXG4gICAgLy8gQWRkIHRvIHRoZSBGb3VuZGF0aW9uIG9iamVjdCBhbmQgdGhlIHBsdWdpbnMgbGlzdCAoZm9yIHJlZmxvd2luZylcbiAgICB0aGlzLl9wbHVnaW5zW2F0dHJOYW1lXSA9IHRoaXNbY2xhc3NOYW1lXSA9IHBsdWdpbjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBQb3B1bGF0ZXMgdGhlIF91dWlkcyBhcnJheSB3aXRoIHBvaW50ZXJzIHRvIGVhY2ggaW5kaXZpZHVhbCBwbHVnaW4gaW5zdGFuY2UuXG4gICAqIEFkZHMgdGhlIGB6ZlBsdWdpbmAgZGF0YS1hdHRyaWJ1dGUgdG8gcHJvZ3JhbW1hdGljYWxseSBjcmVhdGVkIHBsdWdpbnMgdG8gYWxsb3cgdXNlIG9mICQoc2VsZWN0b3IpLmZvdW5kYXRpb24obWV0aG9kKSBjYWxscy5cbiAgICogQWxzbyBmaXJlcyB0aGUgaW5pdGlhbGl6YXRpb24gZXZlbnQgZm9yIGVhY2ggcGx1Z2luLCBjb25zb2xpZGF0aW5nIHJlcGV0aXRpdmUgY29kZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIGFuIGluc3RhbmNlIG9mIGEgcGx1Z2luLCB1c3VhbGx5IGB0aGlzYCBpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBwbHVnaW4sIHBhc3NlZCBhcyBhIGNhbWVsQ2FzZWQgc3RyaW5nLlxuICAgKiBAZmlyZXMgUGx1Z2luI2luaXRcbiAgICovXG4gIHJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4sIG5hbWUpe1xuICAgIHZhciBwbHVnaW5OYW1lID0gbmFtZSA/IGh5cGhlbmF0ZShuYW1lKSA6IGZ1bmN0aW9uTmFtZShwbHVnaW4uY29uc3RydWN0b3IpLnRvTG93ZXJDYXNlKCk7XG4gICAgcGx1Z2luLnV1aWQgPSBHZXRZb0RpZ2l0cyg2LCBwbHVnaW5OYW1lKTtcblxuICAgIGlmKCFwbHVnaW4uJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkpeyBwbHVnaW4uJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgcGx1Z2luLnV1aWQpOyB9XG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpKXsgcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgcGx1Z2luKTsgfVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgaW5pdGlhbGl6ZWQuXG4gICAgICAgICAgICogQGV2ZW50IFBsdWdpbiNpbml0XG4gICAgICAgICAgICovXG4gICAgcGx1Z2luLiRlbGVtZW50LnRyaWdnZXIoYGluaXQuemYuJHtwbHVnaW5OYW1lfWApO1xuXG4gICAgdGhpcy5fdXVpZHMucHVzaChwbHVnaW4udXVpZCk7XG5cbiAgICByZXR1cm47XG4gIH0sXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogUmVtb3ZlcyB0aGUgcGx1Z2lucyB1dWlkIGZyb20gdGhlIF91dWlkcyBhcnJheS5cbiAgICogUmVtb3ZlcyB0aGUgemZQbHVnaW4gZGF0YSBhdHRyaWJ1dGUsIGFzIHdlbGwgYXMgdGhlIGRhdGEtcGx1Z2luLW5hbWUgYXR0cmlidXRlLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBkZXN0cm95ZWQgZXZlbnQgZm9yIHRoZSBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBmaXJlcyBQbHVnaW4jZGVzdHJveWVkXG4gICAqL1xuICB1bnJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4pe1xuICAgIHZhciBwbHVnaW5OYW1lID0gaHlwaGVuYXRlKGZ1bmN0aW9uTmFtZShwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nKS5jb25zdHJ1Y3RvcikpO1xuXG4gICAgdGhpcy5fdXVpZHMuc3BsaWNlKHRoaXMuX3V1aWRzLmluZGV4T2YocGx1Z2luLnV1aWQpLCAxKTtcbiAgICBwbHVnaW4uJGVsZW1lbnQucmVtb3ZlQXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkucmVtb3ZlRGF0YSgnemZQbHVnaW4nKVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gICAgICAgICAgICogQGV2ZW50IFBsdWdpbiNkZXN0cm95ZWRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICAudHJpZ2dlcihgZGVzdHJveWVkLnpmLiR7cGx1Z2luTmFtZX1gKTtcbiAgICBmb3IodmFyIHByb3AgaW4gcGx1Z2luKXtcbiAgICAgIHBsdWdpbltwcm9wXSA9IG51bGw7Ly9jbGVhbiB1cCBzY3JpcHQgdG8gcHJlcCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgIH1cbiAgICByZXR1cm47XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBDYXVzZXMgb25lIG9yIG1vcmUgYWN0aXZlIHBsdWdpbnMgdG8gcmUtaW5pdGlhbGl6ZSwgcmVzZXR0aW5nIGV2ZW50IGxpc3RlbmVycywgcmVjYWxjdWxhdGluZyBwb3NpdGlvbnMsIGV0Yy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHBsdWdpbnMgLSBvcHRpb25hbCBzdHJpbmcgb2YgYW4gaW5kaXZpZHVhbCBwbHVnaW4ga2V5LCBhdHRhaW5lZCBieSBjYWxsaW5nIGAkKGVsZW1lbnQpLmRhdGEoJ3BsdWdpbk5hbWUnKWAsIG9yIHN0cmluZyBvZiBhIHBsdWdpbiBjbGFzcyBpLmUuIGAnZHJvcGRvd24nYFxuICAgKiBAZGVmYXVsdCBJZiBubyBhcmd1bWVudCBpcyBwYXNzZWQsIHJlZmxvdyBhbGwgY3VycmVudGx5IGFjdGl2ZSBwbHVnaW5zLlxuICAgKi9cbiAgIHJlSW5pdDogZnVuY3Rpb24ocGx1Z2lucyl7XG4gICAgIHZhciBpc0pRID0gcGx1Z2lucyBpbnN0YW5jZW9mICQ7XG4gICAgIHRyeXtcbiAgICAgICBpZihpc0pRKXtcbiAgICAgICAgIHBsdWdpbnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ3pmUGx1Z2luJykuX2luaXQoKTtcbiAgICAgICAgIH0pO1xuICAgICAgIH1lbHNle1xuICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgcGx1Z2lucyxcbiAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgIGZucyA9IHtcbiAgICAgICAgICAgJ29iamVjdCc6IGZ1bmN0aW9uKHBsZ3Mpe1xuICAgICAgICAgICAgIHBsZ3MuZm9yRWFjaChmdW5jdGlvbihwKXtcbiAgICAgICAgICAgICAgIHAgPSBoeXBoZW5hdGUocCk7XG4gICAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICdzdHJpbmcnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHBsdWdpbnMgPSBoeXBoZW5hdGUocGx1Z2lucyk7XG4gICAgICAgICAgICAgJCgnW2RhdGEtJysgcGx1Z2lucyArJ10nKS5mb3VuZGF0aW9uKCdfaW5pdCcpO1xuICAgICAgICAgICB9LFxuICAgICAgICAgICAndW5kZWZpbmVkJzogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICB0aGlzWydvYmplY3QnXShPYmplY3Qua2V5cyhfdGhpcy5fcGx1Z2lucykpO1xuICAgICAgICAgICB9XG4gICAgICAgICB9O1xuICAgICAgICAgZm5zW3R5cGVdKHBsdWdpbnMpO1xuICAgICAgIH1cbiAgICAgfWNhdGNoKGVycil7XG4gICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICB9ZmluYWxseXtcbiAgICAgICByZXR1cm4gcGx1Z2lucztcbiAgICAgfVxuICAgfSxcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBwbHVnaW5zIG9uIGFueSBlbGVtZW50cyB3aXRoaW4gYGVsZW1gIChhbmQgYGVsZW1gIGl0c2VsZikgdGhhdCBhcmVuJ3QgYWxyZWFkeSBpbml0aWFsaXplZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gLSBqUXVlcnkgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgdG8gY2hlY2sgaW5zaWRlLiBBbHNvIGNoZWNrcyB0aGUgZWxlbWVudCBpdHNlbGYsIHVubGVzcyBpdCdzIHRoZSBgZG9jdW1lbnRgIG9iamVjdC5cbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IHBsdWdpbnMgLSBBIGxpc3Qgb2YgcGx1Z2lucyB0byBpbml0aWFsaXplLiBMZWF2ZSB0aGlzIG91dCB0byBpbml0aWFsaXplIGV2ZXJ5dGhpbmcuXG4gICAqL1xuICByZWZsb3c6IGZ1bmN0aW9uKGVsZW0sIHBsdWdpbnMpIHtcblxuICAgIC8vIElmIHBsdWdpbnMgaXMgdW5kZWZpbmVkLCBqdXN0IGdyYWIgZXZlcnl0aGluZ1xuICAgIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHBsdWdpbnMgPSBPYmplY3Qua2V5cyh0aGlzLl9wbHVnaW5zKTtcbiAgICB9XG4gICAgLy8gSWYgcGx1Z2lucyBpcyBhIHN0cmluZywgY29udmVydCBpdCB0byBhbiBhcnJheSB3aXRoIG9uZSBpdGVtXG4gICAgZWxzZSBpZiAodHlwZW9mIHBsdWdpbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwbHVnaW5zID0gW3BsdWdpbnNdO1xuICAgIH1cblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBwbHVnaW5cbiAgICAkLmVhY2gocGx1Z2lucywgZnVuY3Rpb24oaSwgbmFtZSkge1xuICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHBsdWdpblxuICAgICAgdmFyIHBsdWdpbiA9IF90aGlzLl9wbHVnaW5zW25hbWVdO1xuXG4gICAgICAvLyBMb2NhbGl6ZSB0aGUgc2VhcmNoIHRvIGFsbCBlbGVtZW50cyBpbnNpZGUgZWxlbSwgYXMgd2VsbCBhcyBlbGVtIGl0c2VsZiwgdW5sZXNzIGVsZW0gPT09IGRvY3VtZW50XG4gICAgICB2YXIgJGVsZW0gPSAkKGVsZW0pLmZpbmQoJ1tkYXRhLScrbmFtZSsnXScpLmFkZEJhY2soJ1tkYXRhLScrbmFtZSsnXScpO1xuXG4gICAgICAvLyBGb3IgZWFjaCBwbHVnaW4gZm91bmQsIGluaXRpYWxpemUgaXRcbiAgICAgICRlbGVtLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICAvLyBEb24ndCBkb3VibGUtZGlwIG9uIHBsdWdpbnNcbiAgICAgICAgaWYgKCRlbC5kYXRhKCd6ZlBsdWdpbicpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiVHJpZWQgdG8gaW5pdGlhbGl6ZSBcIituYW1lK1wiIG9uIGFuIGVsZW1lbnQgdGhhdCBhbHJlYWR5IGhhcyBhIEZvdW5kYXRpb24gcGx1Z2luLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZigkZWwuYXR0cignZGF0YS1vcHRpb25zJykpe1xuICAgICAgICAgIHZhciB0aGluZyA9ICRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKS5zcGxpdCgnOycpLmZvckVhY2goZnVuY3Rpb24oZSwgaSl7XG4gICAgICAgICAgICB2YXIgb3B0ID0gZS5zcGxpdCgnOicpLm1hcChmdW5jdGlvbihlbCl7IHJldHVybiBlbC50cmltKCk7IH0pO1xuICAgICAgICAgICAgaWYob3B0WzBdKSBvcHRzW29wdFswXV0gPSBwYXJzZVZhbHVlKG9wdFsxXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICRlbC5kYXRhKCd6ZlBsdWdpbicsIG5ldyBwbHVnaW4oJCh0aGlzKSwgb3B0cykpO1xuICAgICAgICB9Y2F0Y2goZXIpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXIpO1xuICAgICAgICB9ZmluYWxseXtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRGbk5hbWU6IGZ1bmN0aW9uTmFtZSxcblxuICBhZGRUb0pxdWVyeTogZnVuY3Rpb24oJCkge1xuICAgIC8vIFRPRE86IGNvbnNpZGVyIG5vdCBtYWtpbmcgdGhpcyBhIGpRdWVyeSBmdW5jdGlvblxuICAgIC8vIFRPRE86IG5lZWQgd2F5IHRvIHJlZmxvdyB2cy4gcmUtaW5pdGlhbGl6ZVxuICAgIC8qKlxuICAgICAqIFRoZSBGb3VuZGF0aW9uIGpRdWVyeSBtZXRob2QuXG4gICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1ldGhvZCAtIEFuIGFjdGlvbiB0byBwZXJmb3JtIG9uIHRoZSBjdXJyZW50IGpRdWVyeSBvYmplY3QuXG4gICAgICovXG4gICAgdmFyIGZvdW5kYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIG1ldGhvZCxcbiAgICAgICAgICAkbm9KUyA9ICQoJy5uby1qcycpO1xuXG4gICAgICBpZigkbm9KUy5sZW5ndGgpe1xuICAgICAgICAkbm9KUy5yZW1vdmVDbGFzcygnbm8tanMnKTtcbiAgICAgIH1cblxuICAgICAgaWYodHlwZSA9PT0gJ3VuZGVmaW5lZCcpey8vbmVlZHMgdG8gaW5pdGlhbGl6ZSB0aGUgRm91bmRhdGlvbiBvYmplY3QsIG9yIGFuIGluZGl2aWR1YWwgcGx1Z2luLlxuICAgICAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG4gICAgICAgIEZvdW5kYXRpb24ucmVmbG93KHRoaXMpO1xuICAgICAgfWVsc2UgaWYodHlwZSA9PT0gJ3N0cmluZycpey8vYW4gaW5kaXZpZHVhbCBtZXRob2QgdG8gaW52b2tlIG9uIGEgcGx1Z2luIG9yIGdyb3VwIG9mIHBsdWdpbnNcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpOy8vY29sbGVjdCBhbGwgdGhlIGFyZ3VtZW50cywgaWYgbmVjZXNzYXJ5XG4gICAgICAgIHZhciBwbHVnQ2xhc3MgPSB0aGlzLmRhdGEoJ3pmUGx1Z2luJyk7Ly9kZXRlcm1pbmUgdGhlIGNsYXNzIG9mIHBsdWdpblxuXG4gICAgICAgIGlmKHBsdWdDbGFzcyAhPT0gdW5kZWZpbmVkICYmIHBsdWdDbGFzc1ttZXRob2RdICE9PSB1bmRlZmluZWQpey8vbWFrZSBzdXJlIGJvdGggdGhlIGNsYXNzIGFuZCBtZXRob2QgZXhpc3RcbiAgICAgICAgICBpZih0aGlzLmxlbmd0aCA9PT0gMSl7Ly9pZiB0aGVyZSdzIG9ubHkgb25lLCBjYWxsIGl0IGRpcmVjdGx5LlxuICAgICAgICAgICAgICBwbHVnQ2xhc3NbbWV0aG9kXS5hcHBseShwbHVnQ2xhc3MsIGFyZ3MpO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGksIGVsKXsvL290aGVyd2lzZSBsb29wIHRocm91Z2ggdGhlIGpRdWVyeSBjb2xsZWN0aW9uIGFuZCBpbnZva2UgdGhlIG1ldGhvZCBvbiBlYWNoXG4gICAgICAgICAgICAgIHBsdWdDbGFzc1ttZXRob2RdLmFwcGx5KCQoZWwpLmRhdGEoJ3pmUGx1Z2luJyksIGFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZXsvL2Vycm9yIGZvciBubyBjbGFzcyBvciBubyBtZXRob2RcbiAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJXZSdyZSBzb3JyeSwgJ1wiICsgbWV0aG9kICsgXCInIGlzIG5vdCBhbiBhdmFpbGFibGUgbWV0aG9kIGZvciBcIiArIChwbHVnQ2xhc3MgPyBmdW5jdGlvbk5hbWUocGx1Z0NsYXNzKSA6ICd0aGlzIGVsZW1lbnQnKSArICcuJyk7XG4gICAgICAgIH1cbiAgICAgIH1lbHNley8vZXJyb3IgZm9yIGludmFsaWQgYXJndW1lbnQgdHlwZVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBXZSdyZSBzb3JyeSwgJHt0eXBlfSBpcyBub3QgYSB2YWxpZCBwYXJhbWV0ZXIuIFlvdSBtdXN0IHVzZSBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG1ldGhvZCB5b3Ugd2lzaCB0byBpbnZva2UuYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgICQuZm4uZm91bmRhdGlvbiA9IGZvdW5kYXRpb247XG4gICAgcmV0dXJuICQ7XG4gIH1cbn07XG5cbkZvdW5kYXRpb24udXRpbCA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGZvciBhcHBseWluZyBhIGRlYm91bmNlIGVmZmVjdCB0byBhIGZ1bmN0aW9uIGNhbGwuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgY2FsbGVkIGF0IGVuZCBvZiB0aW1lb3V0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgLSBUaW1lIGluIG1zIHRvIGRlbGF5IHRoZSBjYWxsIG9mIGBmdW5jYC5cbiAgICogQHJldHVybnMgZnVuY3Rpb25cbiAgICovXG4gIHRocm90dGxlOiBmdW5jdGlvbiAoZnVuYywgZGVsYXkpIHtcbiAgICB2YXIgdGltZXIgPSBudWxsO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG53aW5kb3cuRm91bmRhdGlvbiA9IEZvdW5kYXRpb247XG5cbi8vIFBvbHlmaWxsIGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbihmdW5jdGlvbigpIHtcbiAgaWYgKCFEYXRlLm5vdyB8fCAhd2luZG93LkRhdGUubm93KVxuICAgIHdpbmRvdy5EYXRlLm5vdyA9IERhdGUubm93ID0gZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgfTtcblxuICB2YXIgdmVuZG9ycyA9IFsnd2Via2l0JywgJ21veiddO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK2kpIHtcbiAgICAgIHZhciB2cCA9IHZlbmRvcnNbaV07XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZwKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9ICh3aW5kb3dbdnArJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvd1t2cCsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ10pO1xuICB9XG4gIGlmICgvaVAoYWR8aG9uZXxvZCkuKk9TIDYvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgfHwgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSkge1xuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgbmV4dFRpbWUgPSBNYXRoLm1heChsYXN0VGltZSArIDE2LCBub3cpO1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2sobGFzdFRpbWUgPSBuZXh0VGltZSk7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRUaW1lIC0gbm93KTtcbiAgICB9O1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGNsZWFyVGltZW91dDtcbiAgfVxuICAvKipcbiAgICogUG9seWZpbGwgZm9yIHBlcmZvcm1hbmNlLm5vdywgcmVxdWlyZWQgYnkgckFGXG4gICAqL1xuICBpZighd2luZG93LnBlcmZvcm1hbmNlIHx8ICF3aW5kb3cucGVyZm9ybWFuY2Uubm93KXtcbiAgICB3aW5kb3cucGVyZm9ybWFuY2UgPSB7XG4gICAgICBzdGFydDogRGF0ZS5ub3coKSxcbiAgICAgIG5vdzogZnVuY3Rpb24oKXsgcmV0dXJuIERhdGUubm93KCkgLSB0aGlzLnN0YXJ0OyB9XG4gICAgfTtcbiAgfVxufSkoKTtcbmlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvVGhpcykge1xuICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1XG4gICAgICAvLyBpbnRlcm5hbCBJc0NhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xuICAgIH1cblxuICAgIHZhciBhQXJncyAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgIGZOT1AgICAgPSBmdW5jdGlvbigpIHt9LFxuICAgICAgICBmQm91bmQgID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1BcbiAgICAgICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICAgICAgIDogb1RoaXMsXG4gICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH07XG5cbiAgICBpZiAodGhpcy5wcm90b3R5cGUpIHtcbiAgICAgIC8vIG5hdGl2ZSBmdW5jdGlvbnMgZG9uJ3QgaGF2ZSBhIHByb3RvdHlwZVxuICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICB9XG4gICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICByZXR1cm4gZkJvdW5kO1xuICB9O1xufVxuLy8gUG9seWZpbGwgdG8gZ2V0IHRoZSBuYW1lIG9mIGEgZnVuY3Rpb24gaW4gSUU5XG5mdW5jdGlvbiBmdW5jdGlvbk5hbWUoZm4pIHtcbiAgaWYgKEZ1bmN0aW9uLnByb3RvdHlwZS5uYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvblxccyhbXihdezEsfSlcXCgvO1xuICAgIHZhciByZXN1bHRzID0gKGZ1bmNOYW1lUmVnZXgpLmV4ZWMoKGZuKS50b1N0cmluZygpKTtcbiAgICByZXR1cm4gKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxKSA/IHJlc3VsdHNbMV0udHJpbSgpIDogXCJcIjtcbiAgfVxuICBlbHNlIGlmIChmbi5wcm90b3R5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmbi5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmbi5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZShzdHIpe1xuICBpZiAoJ3RydWUnID09PSBzdHIpIHJldHVybiB0cnVlO1xuICBlbHNlIGlmICgnZmFsc2UnID09PSBzdHIpIHJldHVybiBmYWxzZTtcbiAgZWxzZSBpZiAoIWlzTmFOKHN0ciAqIDEpKSByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuLy8gQ29udmVydCBQYXNjYWxDYXNlIHRvIGtlYmFiLWNhc2Vcbi8vIFRoYW5rIHlvdTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvODk1NTU4MFxuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmV4cG9ydCB7Rm91bmRhdGlvbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmNvcmUuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmZ1bmN0aW9uIFRpbWVyKGVsZW0sIG9wdGlvbnMsIGNiKSB7XG4gIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24sLy9vcHRpb25zIGlzIGFuIG9iamVjdCBmb3IgZWFzaWx5IGFkZGluZyBmZWF0dXJlcyBsYXRlci5cbiAgICAgIG5hbWVTcGFjZSA9IE9iamVjdC5rZXlzKGVsZW0uZGF0YSgpKVswXSB8fCAndGltZXInLFxuICAgICAgcmVtYWluID0gLTEsXG4gICAgICBzdGFydCxcbiAgICAgIHRpbWVyO1xuXG4gIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcblxuICB0aGlzLnJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICByZW1haW4gPSAtMTtcbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG4gICAgLy8gaWYoIWVsZW0uZGF0YSgncGF1c2VkJykpeyByZXR1cm4gZmFsc2U7IH0vL21heWJlIGltcGxlbWVudCB0aGlzIHNhbml0eSBjaGVjayBpZiB1c2VkIGZvciBvdGhlciB0aGluZ3MuXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICByZW1haW4gPSByZW1haW4gPD0gMCA/IGR1cmF0aW9uIDogcmVtYWluO1xuICAgIGVsZW0uZGF0YSgncGF1c2VkJywgZmFsc2UpO1xuICAgIHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGlmKG9wdGlvbnMuaW5maW5pdGUpe1xuICAgICAgICBfdGhpcy5yZXN0YXJ0KCk7Ly9yZXJ1biB0aGUgdGltZXIuXG4gICAgICB9XG4gICAgICBpZiAoY2IgJiYgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7IGNiKCk7IH1cbiAgICB9LCByZW1haW4pO1xuICAgIGVsZW0udHJpZ2dlcihgdGltZXJzdGFydC56Zi4ke25hbWVTcGFjZX1gKTtcbiAgfVxuXG4gIHRoaXMucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcbiAgICAvL2lmKGVsZW0uZGF0YSgncGF1c2VkJykpeyByZXR1cm4gZmFsc2U7IH0vL21heWJlIGltcGxlbWVudCB0aGlzIHNhbml0eSBjaGVjayBpZiB1c2VkIGZvciBvdGhlciB0aGluZ3MuXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICBlbGVtLmRhdGEoJ3BhdXNlZCcsIHRydWUpO1xuICAgIHZhciBlbmQgPSBEYXRlLm5vdygpO1xuICAgIHJlbWFpbiA9IHJlbWFpbiAtIChlbmQgLSBzdGFydCk7XG4gICAgZWxlbS50cmlnZ2VyKGB0aW1lcnBhdXNlZC56Zi4ke25hbWVTcGFjZX1gKTtcbiAgfVxufVxuXG5leHBvcnQge1RpbWVyfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50aW1lci5qcyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vKipXb3JrIGluc3BpcmVkIGJ5IG11bHRpcGxlIGpxdWVyeSBzd2lwZSBwbHVnaW5zKipcbi8vKipEb25lIGJ5IFlvaGFpIEFyYXJhdCAqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxudmFyIFRvdWNoID0ge307XG5cbnZhciBzdGFydFBvc1gsXG4gICAgc3RhcnRQb3NZLFxuICAgIHN0YXJ0VGltZSxcbiAgICBlbGFwc2VkVGltZSxcbiAgICBpc01vdmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBvblRvdWNoRW5kKCkge1xuICAvLyAgYWxlcnQodGhpcyk7XG4gIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUpO1xuICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCk7XG4gIGlzTW92aW5nID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlKGUpIHtcbiAgaWYgKCQuc3BvdFN3aXBlLnByZXZlbnREZWZhdWx0KSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxuICBpZihpc01vdmluZykge1xuICAgIHZhciB4ID0gZS50b3VjaGVzWzBdLnBhZ2VYO1xuICAgIHZhciB5ID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuICAgIHZhciBkeCA9IHN0YXJ0UG9zWCAtIHg7XG4gICAgdmFyIGR5ID0gc3RhcnRQb3NZIC0geTtcbiAgICB2YXIgZGlyO1xuICAgIGVsYXBzZWRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWU7XG4gICAgaWYoTWF0aC5hYnMoZHgpID49ICQuc3BvdFN3aXBlLm1vdmVUaHJlc2hvbGQgJiYgZWxhcHNlZFRpbWUgPD0gJC5zcG90U3dpcGUudGltZVRocmVzaG9sZCkge1xuICAgICAgZGlyID0gZHggPiAwID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICB9XG4gICAgLy8gZWxzZSBpZihNYXRoLmFicyhkeSkgPj0gJC5zcG90U3dpcGUubW92ZVRocmVzaG9sZCAmJiBlbGFwc2VkVGltZSA8PSAkLnNwb3RTd2lwZS50aW1lVGhyZXNob2xkKSB7XG4gICAgLy8gICBkaXIgPSBkeSA+IDAgPyAnZG93bicgOiAndXAnO1xuICAgIC8vIH1cbiAgICBpZihkaXIpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9uVG91Y2hFbmQuY2FsbCh0aGlzKTtcbiAgICAgICQodGhpcykudHJpZ2dlcignc3dpcGUnLCBkaXIpLnRyaWdnZXIoYHN3aXBlJHtkaXJ9YCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uVG91Y2hTdGFydChlKSB7XG4gIGlmIChlLnRvdWNoZXMubGVuZ3RoID09IDEpIHtcbiAgICBzdGFydFBvc1ggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgc3RhcnRQb3NZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuICAgIGlzTW92aW5nID0gdHJ1ZTtcbiAgICBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIgJiYgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHRlYXJkb3duKCkge1xuICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQpO1xufVxuXG5jbGFzcyBTcG90U3dpcGUge1xuICBjb25zdHJ1Y3RvcigkKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gJzEuMC4wJztcbiAgICB0aGlzLmVuYWJsZWQgPSAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgIHRoaXMubW92ZVRocmVzaG9sZCA9IDc1O1xuICAgIHRoaXMudGltZVRocmVzaG9sZCA9IDIwMDtcbiAgICB0aGlzLiQgPSAkO1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIF9pbml0KCkge1xuICAgIHZhciAkID0gdGhpcy4kO1xuICAgICQuZXZlbnQuc3BlY2lhbC5zd2lwZSA9IHsgc2V0dXA6IGluaXQgfTtcblxuICAgICQuZWFjaChbJ2xlZnQnLCAndXAnLCAnZG93bicsICdyaWdodCddLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmV2ZW50LnNwZWNpYWxbYHN3aXBlJHt0aGlzfWBdID0geyBzZXR1cDogZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5vbignc3dpcGUnLCAkLm5vb3ApO1xuICAgICAgfSB9O1xuICAgIH0pO1xuICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBBcyBmYXIgYXMgSSBjYW4gdGVsbCwgYm90aCBzZXR1cFNwb3RTd2lwZSBhbmQgICAgKlxuICogc2V0dXBUb3VjaEhhbmRsZXIgc2hvdWxkIGJlIGlkZW1wb3RlbnQsICAgICAgICAgICpcbiAqIGJlY2F1c2UgdGhleSBkaXJlY3RseSByZXBsYWNlIGZ1bmN0aW9ucyAmICAgICAgICAqXG4gKiB2YWx1ZXMsIGFuZCBkbyBub3QgYWRkIGV2ZW50IGhhbmRsZXJzIGRpcmVjdGx5LiAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblRvdWNoLnNldHVwU3BvdFN3aXBlID0gZnVuY3Rpb24oJCkge1xuICAkLnNwb3RTd2lwZSA9IG5ldyBTcG90U3dpcGUoJCk7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogTWV0aG9kIGZvciBhZGRpbmcgcHNldWRvIGRyYWcgZXZlbnRzIHRvIGVsZW1lbnRzICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5Ub3VjaC5zZXR1cFRvdWNoSGFuZGxlciA9IGZ1bmN0aW9uKCQpIHtcbiAgJC5mbi5hZGRUb3VjaCA9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGksZWwpe1xuICAgICAgJChlbCkuYmluZCgndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnLGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vd2UgcGFzcyB0aGUgb3JpZ2luYWwgZXZlbnQgb2JqZWN0IGJlY2F1c2UgdGhlIGpRdWVyeSBldmVudFxuICAgICAgICAvL29iamVjdCBpcyBub3JtYWxpemVkIHRvIHczYyBzcGVjcyBhbmQgZG9lcyBub3QgcHJvdmlkZSB0aGUgVG91Y2hMaXN0XG4gICAgICAgIGhhbmRsZVRvdWNoKGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdmFyIGhhbmRsZVRvdWNoID0gZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgdmFyIHRvdWNoZXMgPSBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgICBmaXJzdCA9IHRvdWNoZXNbMF0sXG4gICAgICAgICAgZXZlbnRUeXBlcyA9IHtcbiAgICAgICAgICAgIHRvdWNoc3RhcnQ6ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgdG91Y2htb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgIHRvdWNoZW5kOiAnbW91c2V1cCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHR5cGUgPSBldmVudFR5cGVzW2V2ZW50LnR5cGVdLFxuICAgICAgICAgIHNpbXVsYXRlZEV2ZW50XG4gICAgICAgIDtcblxuICAgICAgaWYoJ01vdXNlRXZlbnQnIGluIHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93Lk1vdXNlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgc2ltdWxhdGVkRXZlbnQgPSBuZXcgd2luZG93Lk1vdXNlRXZlbnQodHlwZSwge1xuICAgICAgICAgICdidWJibGVzJzogdHJ1ZSxcbiAgICAgICAgICAnY2FuY2VsYWJsZSc6IHRydWUsXG4gICAgICAgICAgJ3NjcmVlblgnOiBmaXJzdC5zY3JlZW5YLFxuICAgICAgICAgICdzY3JlZW5ZJzogZmlyc3Quc2NyZWVuWSxcbiAgICAgICAgICAnY2xpZW50WCc6IGZpcnN0LmNsaWVudFgsXG4gICAgICAgICAgJ2NsaWVudFknOiBmaXJzdC5jbGllbnRZXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2ltdWxhdGVkRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICAgICAgICBzaW11bGF0ZWRFdmVudC5pbml0TW91c2VFdmVudCh0eXBlLCB0cnVlLCB0cnVlLCB3aW5kb3csIDEsIGZpcnN0LnNjcmVlblgsIGZpcnN0LnNjcmVlblksIGZpcnN0LmNsaWVudFgsIGZpcnN0LmNsaWVudFksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLypsZWZ0Ki8sIG51bGwpO1xuICAgICAgfVxuICAgICAgZmlyc3QudGFyZ2V0LmRpc3BhdGNoRXZlbnQoc2ltdWxhdGVkRXZlbnQpO1xuICAgIH07XG4gIH07XG59O1xuXG5Ub3VjaC5pbml0ID0gZnVuY3Rpb24oJCkge1xuICBpZih0eXBlb2YoJC5zcG90U3dpcGUpID09PSAndW5kZWZpbmVkJykge1xuICAgIFRvdWNoLnNldHVwU3BvdFN3aXBlKCQpO1xuICAgIFRvdWNoLnNldHVwVG91Y2hIYW5kbGVyKCQpO1xuICB9XG59O1xuXG5leHBvcnQge1RvdWNofTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50b3VjaC5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuXG4vKipcbiAqIEFjY29yZGlvbiBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uYWNjb3JkaW9uXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKi9cblxuY2xhc3MgQWNjb3JkaW9uIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gYWNjb3JkaW9uLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgQWNjb3JkaW9uXG4gICAqIEBmaXJlcyBBY2NvcmRpb24jaW5pdFxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gbWFrZSBpbnRvIGFuIGFjY29yZGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBhIHBsYWluIG9iamVjdCB3aXRoIHNldHRpbmdzIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBBY2NvcmRpb24uZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcblxuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0FjY29yZGlvbic7IC8vIGllOSBiYWNrIGNvbXBhdFxuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdBY2NvcmRpb24nLCB7XG4gICAgICAnRU5URVInOiAndG9nZ2xlJyxcbiAgICAgICdTUEFDRSc6ICd0b2dnbGUnLFxuICAgICAgJ0FSUk9XX0RPV04nOiAnbmV4dCcsXG4gICAgICAnQVJST1dfVVAnOiAncHJldmlvdXMnXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGFjY29yZGlvbiBieSBhbmltYXRpbmcgdGhlIHByZXNldCBhY3RpdmUgcGFuZShzKS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cigncm9sZScsICd0YWJsaXN0Jyk7XG4gICAgdGhpcy4kdGFicyA9IHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oJ1tkYXRhLWFjY29yZGlvbi1pdGVtXScpO1xuXG4gICAgdGhpcy4kdGFicy5lYWNoKGZ1bmN0aW9uKGlkeCwgZWwpIHtcbiAgICAgIHZhciAkZWwgPSAkKGVsKSxcbiAgICAgICAgICAkY29udGVudCA9ICRlbC5jaGlsZHJlbignW2RhdGEtdGFiLWNvbnRlbnRdJyksXG4gICAgICAgICAgaWQgPSAkY29udGVudFswXS5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnYWNjb3JkaW9uJyksXG4gICAgICAgICAgbGlua0lkID0gZWwuaWQgfHwgYCR7aWR9LWxhYmVsYDtcblxuICAgICAgJGVsLmZpbmQoJ2E6Zmlyc3QnKS5hdHRyKHtcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBpZCxcbiAgICAgICAgJ3JvbGUnOiAndGFiJyxcbiAgICAgICAgJ2lkJzogbGlua0lkLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IGZhbHNlLFxuICAgICAgICAnYXJpYS1zZWxlY3RlZCc6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgJGNvbnRlbnQuYXR0cih7J3JvbGUnOiAndGFicGFuZWwnLCAnYXJpYS1sYWJlbGxlZGJ5JzogbGlua0lkLCAnYXJpYS1oaWRkZW4nOiB0cnVlLCAnaWQnOiBpZH0pO1xuICAgIH0pO1xuICAgIHZhciAkaW5pdEFjdGl2ZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmlzLWFjdGl2ZScpLmNoaWxkcmVuKCdbZGF0YS10YWItY29udGVudF0nKTtcbiAgICB0aGlzLmZpcnN0VGltZUluaXQgPSB0cnVlO1xuICAgIGlmKCRpbml0QWN0aXZlLmxlbmd0aCl7XG4gICAgICB0aGlzLmRvd24oJGluaXRBY3RpdmUsIHRoaXMuZmlyc3RUaW1lSW5pdCk7XG4gICAgICB0aGlzLmZpcnN0VGltZUluaXQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGVja0RlZXBMaW5rID0gKCkgPT4ge1xuICAgICAgdmFyIGFuY2hvciA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgLy9uZWVkIGEgaGFzaCBhbmQgYSByZWxldmFudCBhbmNob3IgaW4gdGhpcyB0YWJzZXRcbiAgICAgIGlmKGFuY2hvci5sZW5ndGgpIHtcbiAgICAgICAgdmFyICRsaW5rID0gdGhpcy4kZWxlbWVudC5maW5kKCdbaHJlZiQ9XCInK2FuY2hvcisnXCJdJyksXG4gICAgICAgICRhbmNob3IgPSAkKGFuY2hvcik7XG5cbiAgICAgICAgaWYgKCRsaW5rLmxlbmd0aCAmJiAkYW5jaG9yKSB7XG4gICAgICAgICAgaWYgKCEkbGluay5wYXJlbnQoJ1tkYXRhLWFjY29yZGlvbi1pdGVtXScpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgdGhpcy5kb3duKCRhbmNob3IsIHRoaXMuZmlyc3RUaW1lSW5pdCk7XG4gICAgICAgICAgICB0aGlzLmZpcnN0VGltZUluaXQgPSBmYWxzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy9yb2xsIHVwIGEgbGl0dGxlIHRvIHNob3cgdGhlIHRpdGxlc1xuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmtTbXVkZ2UpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IF90aGlzLiRlbGVtZW50Lm9mZnNldCgpO1xuICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogb2Zmc2V0LnRvcCB9LCBfdGhpcy5vcHRpb25zLmRlZXBMaW5rU211ZGdlRGVsYXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHpwbHVnaW4gaGFzIGRlZXBsaW5rZWQgYXQgcGFnZWxvYWRcbiAgICAgICAgICAgICogQGV2ZW50IEFjY29yZGlvbiNkZWVwbGlua1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2RlZXBsaW5rLnpmLmFjY29yZGlvbicsIFskbGluaywgJGFuY2hvcl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy91c2UgYnJvd3NlciB0byBvcGVuIGEgdGFiLCBpZiBpdCBleGlzdHMgaW4gdGhpcyB0YWJzZXRcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICB0aGlzLl9jaGVja0RlZXBMaW5rKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyBmb3IgaXRlbXMgd2l0aGluIHRoZSBhY2NvcmRpb24uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiR0YWJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpO1xuICAgICAgdmFyICR0YWJDb250ZW50ID0gJGVsZW0uY2hpbGRyZW4oJ1tkYXRhLXRhYi1jb250ZW50XScpO1xuICAgICAgaWYgKCR0YWJDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAkZWxlbS5jaGlsZHJlbignYScpLm9mZignY2xpY2suemYuYWNjb3JkaW9uIGtleWRvd24uemYuYWNjb3JkaW9uJylcbiAgICAgICAgICAgICAgIC5vbignY2xpY2suemYuYWNjb3JkaW9uJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBfdGhpcy50b2dnbGUoJHRhYkNvbnRlbnQpO1xuICAgICAgICB9KS5vbigna2V5ZG93bi56Zi5hY2NvcmRpb24nLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ0FjY29yZGlvbicsIHtcbiAgICAgICAgICAgIHRvZ2dsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgkdGFiQ29udGVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciAkYSA9ICRlbGVtLm5leHQoKS5maW5kKCdhJykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLm11bHRpRXhwYW5kKSB7XG4gICAgICAgICAgICAgICAgJGEudHJpZ2dlcignY2xpY2suemYuYWNjb3JkaW9uJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZpb3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyICRhID0gJGVsZW0ucHJldigpLmZpbmQoJ2EnKS5mb2N1cygpO1xuICAgICAgICAgICAgICBpZiAoIV90aGlzLm9wdGlvbnMubXVsdGlFeHBhbmQpIHtcbiAgICAgICAgICAgICAgICAkYS50cmlnZ2VyKCdjbGljay56Zi5hY2NvcmRpb24nKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFuZGxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhpcy5fY2hlY2tEZWVwTGluayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHNlbGVjdGVkIGNvbnRlbnQgcGFuZSdzIG9wZW4vY2xvc2Ugc3RhdGUuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0galF1ZXJ5IG9iamVjdCBvZiB0aGUgcGFuZSB0byB0b2dnbGUgKGAuYWNjb3JkaW9uLWNvbnRlbnRgKS5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICB0b2dnbGUoJHRhcmdldCkge1xuICAgIGlmICgkdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWFjY29yZGlvbl0nKS5pcygnW2Rpc2FibGVkXScpKSB7XG4gICAgICBjb25zb2xlLmluZm8oJ0Nhbm5vdCB0b2dnbGUgYW4gYWNjb3JkaW9uIHRoYXQgaXMgZGlzYWJsZWQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKCR0YXJnZXQucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICB0aGlzLnVwKCR0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvd24oJHRhcmdldCk7XG4gICAgfVxuICAgIC8vZWl0aGVyIHJlcGxhY2Ugb3IgdXBkYXRlIGJyb3dzZXIgaGlzdG9yeVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgIHZhciBhbmNob3IgPSAkdGFyZ2V0LnByZXYoJ2EnKS5hdHRyKCdocmVmJyk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBkYXRlSGlzdG9yeSkge1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsIGFuY2hvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIGFuY2hvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBhY2NvcmRpb24gdGFiIGRlZmluZWQgYnkgYCR0YXJnZXRgLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIEFjY29yZGlvbiBwYW5lIHRvIG9wZW4gKGAuYWNjb3JkaW9uLWNvbnRlbnRgKS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBmaXJzdFRpbWUgLSBmbGFnIHRvIGRldGVybWluZSBpZiByZWZsb3cgc2hvdWxkIGhhcHBlbi5cbiAgICogQGZpcmVzIEFjY29yZGlvbiNkb3duXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgZG93bigkdGFyZ2V0LCBmaXJzdFRpbWUpIHtcbiAgICAvKipcbiAgICAgKiBjaGVja2luZyBmaXJzdFRpbWUgYWxsb3dzIGZvciBpbml0aWFsIHJlbmRlciBvZiB0aGUgYWNjb3JkaW9uXG4gICAgICogdG8gcmVuZGVyIHByZXNldCBpcy1hY3RpdmUgcGFuZXMuXG4gICAgICovXG4gICAgaWYgKCR0YXJnZXQuY2xvc2VzdCgnW2RhdGEtYWNjb3JkaW9uXScpLmlzKCdbZGlzYWJsZWRdJykgJiYgIWZpcnN0VGltZSkgIHtcbiAgICAgIGNvbnNvbGUuaW5mbygnQ2Fubm90IGNhbGwgZG93biBvbiBhbiBhY2NvcmRpb24gdGhhdCBpcyBkaXNhYmxlZC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJHRhcmdldFxuICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgZmFsc2UpXG4gICAgICAucGFyZW50KCdbZGF0YS10YWItY29udGVudF0nKVxuICAgICAgLmFkZEJhY2soKVxuICAgICAgLnBhcmVudCgpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLm11bHRpRXhwYW5kICYmICFmaXJzdFRpbWUpIHtcbiAgICAgIHZhciAkY3VycmVudEFjdGl2ZSA9IHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oJy5pcy1hY3RpdmUnKS5jaGlsZHJlbignW2RhdGEtdGFiLWNvbnRlbnRdJyk7XG4gICAgICBpZiAoJGN1cnJlbnRBY3RpdmUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudXAoJGN1cnJlbnRBY3RpdmUubm90KCR0YXJnZXQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkdGFyZ2V0LnNsaWRlRG93bih0aGlzLm9wdGlvbnMuc2xpZGVTcGVlZCwgKCkgPT4ge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIHRoZSB0YWIgaXMgZG9uZSBvcGVuaW5nLlxuICAgICAgICogQGV2ZW50IEFjY29yZGlvbiNkb3duXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZG93bi56Zi5hY2NvcmRpb24nLCBbJHRhcmdldF0pO1xuICAgIH0pO1xuXG4gICAgJChgIyR7JHRhcmdldC5hdHRyKCdhcmlhLWxhYmVsbGVkYnknKX1gKS5hdHRyKHtcbiAgICAgICdhcmlhLWV4cGFuZGVkJzogdHJ1ZSxcbiAgICAgICdhcmlhLXNlbGVjdGVkJzogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgdGFiIGRlZmluZWQgYnkgYCR0YXJnZXRgLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIEFjY29yZGlvbiB0YWIgdG8gY2xvc2UgKGAuYWNjb3JkaW9uLWNvbnRlbnRgKS5cbiAgICogQGZpcmVzIEFjY29yZGlvbiN1cFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHVwKCR0YXJnZXQpIHtcbiAgICBpZiAoJHRhcmdldC5jbG9zZXN0KCdbZGF0YS1hY2NvcmRpb25dJykuaXMoJ1tkaXNhYmxlZF0nKSkge1xuICAgICAgY29uc29sZS5pbmZvKCdDYW5ub3QgY2FsbCB1cCBvbiBhbiBhY2NvcmRpb24gdGhhdCBpcyBkaXNhYmxlZC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgJGF1bnRzID0gJHRhcmdldC5wYXJlbnQoKS5zaWJsaW5ncygpLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZigoIXRoaXMub3B0aW9ucy5hbGxvd0FsbENsb3NlZCAmJiAhJGF1bnRzLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkgfHwgISR0YXJnZXQucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgJHRhcmdldC5zbGlkZVVwKF90aGlzLm9wdGlvbnMuc2xpZGVTcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIHRoZSB0YWIgaXMgZG9uZSBjb2xsYXBzaW5nIHVwLlxuICAgICAgICogQGV2ZW50IEFjY29yZGlvbiN1cFxuICAgICAgICovXG4gICAgICBfdGhpcy4kZWxlbWVudC50cmlnZ2VyKCd1cC56Zi5hY2NvcmRpb24nLCBbJHRhcmdldF0pO1xuICAgIH0pO1xuXG4gICAgJHRhcmdldC5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpXG4gICAgICAgICAgIC5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAkKGAjJHskdGFyZ2V0LmF0dHIoJ2FyaWEtbGFiZWxsZWRieScpfWApLmF0dHIoe1xuICAgICAnYXJpYS1leHBhbmRlZCc6IGZhbHNlLFxuICAgICAnYXJpYS1zZWxlY3RlZCc6IGZhbHNlXG4gICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBhbiBhY2NvcmRpb24uXG4gICAqIEBmaXJlcyBBY2NvcmRpb24jZGVzdHJveWVkXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS10YWItY29udGVudF0nKS5zdG9wKHRydWUpLnNsaWRlVXAoMCkuY3NzKCdkaXNwbGF5JywgJycpO1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnYScpLm9mZignLnpmLmFjY29yZGlvbicpO1xuICAgIGlmKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgJCh3aW5kb3cpLm9mZigncG9wc3RhdGUnLCB0aGlzLl9jaGVja0RlZXBMaW5rKTtcbiAgICB9XG5cbiAgfVxufVxuXG5BY2NvcmRpb24uZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBhbmltYXRlIHRoZSBvcGVuaW5nIG9mIGFuIGFjY29yZGlvbiBwYW5lLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDI1MFxuICAgKi9cbiAgc2xpZGVTcGVlZDogMjUwLFxuICAvKipcbiAgICogQWxsb3cgdGhlIGFjY29yZGlvbiB0byBoYXZlIG11bHRpcGxlIG9wZW4gcGFuZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBtdWx0aUV4cGFuZDogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgYWNjb3JkaW9uIHRvIGNsb3NlIGFsbCBwYW5lcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFsbG93QWxsQ2xvc2VkOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgd2luZG93IHRvIHNjcm9sbCB0byBjb250ZW50IG9mIHBhbmUgc3BlY2lmaWVkIGJ5IGhhc2ggYW5jaG9yXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBkZWVwTGluazogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEFkanVzdCB0aGUgZGVlcCBsaW5rIHNjcm9sbCB0byBtYWtlIHN1cmUgdGhlIHRvcCBvZiB0aGUgYWNjb3JkaW9uIHBhbmVsIGlzIHZpc2libGVcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5rU211ZGdlOiBmYWxzZSxcblxuICAvKipcbiAgICogQW5pbWF0aW9uIHRpbWUgKG1zKSBmb3IgdGhlIGRlZXAgbGluayBhZGp1c3RtZW50XG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMzAwXG4gICAqL1xuICBkZWVwTGlua1NtdWRnZURlbGF5OiAzMDAsXG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgYnJvd3NlciBoaXN0b3J5IHdpdGggdGhlIG9wZW4gYWNjb3JkaW9uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB1cGRhdGVIaXN0b3J5OiBmYWxzZVxufTtcblxuZXhwb3J0IHtBY2NvcmRpb259O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5hY2NvcmRpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBQb3NpdGlvbmFibGUgfSBmcm9tICcuL2ZvdW5kYXRpb24ucG9zaXRpb25hYmxlJztcblxuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG5cblxuLyoqXG4gKiBEcm9wZG93biBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uZHJvcGRvd25cbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuYm94XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKi9cbmNsYXNzIERyb3Bkb3duIGV4dGVuZHMgUG9zaXRpb25hYmxlIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBkcm9wZG93bi5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIERyb3Bkb3duXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYSBkcm9wZG93bi5cbiAgICogICAgICAgIE9iamVjdCBzaG91bGQgYmUgb2YgdGhlIGRyb3Bkb3duIHBhbmVsLCByYXRoZXIgdGhhbiBpdHMgYW5jaG9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBEcm9wZG93bi5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0Ryb3Bkb3duJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICAvLyBUcmlnZ2VycyBpbml0IGlzIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQgaXMgaW5pdGlhbGl6ZWRcbiAgICBUcmlnZ2Vycy5pbml0KCQpO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ0Ryb3Bkb3duJywge1xuICAgICAgJ0VOVEVSJzogJ29wZW4nLFxuICAgICAgJ1NQQUNFJzogJ29wZW4nLFxuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZSdcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGx1Z2luIGJ5IHNldHRpbmcvY2hlY2tpbmcgb3B0aW9ucyBhbmQgYXR0cmlidXRlcywgYWRkaW5nIGhlbHBlciB2YXJpYWJsZXMsIGFuZCBzYXZpbmcgdGhlIGFuY2hvci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgJGlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuXG4gICAgdGhpcy4kYW5jaG9ycyA9ICQoYFtkYXRhLXRvZ2dsZT1cIiR7JGlkfVwiXWApLmxlbmd0aCA/ICQoYFtkYXRhLXRvZ2dsZT1cIiR7JGlkfVwiXWApIDogJChgW2RhdGEtb3Blbj1cIiR7JGlkfVwiXWApO1xuICAgIHRoaXMuJGFuY2hvcnMuYXR0cih7XG4gICAgICAnYXJpYS1jb250cm9scyc6ICRpZCxcbiAgICAgICdkYXRhLWlzLWZvY3VzJzogZmFsc2UsXG4gICAgICAnZGF0YS15ZXRpLWJveCc6ICRpZCxcbiAgICAgICdhcmlhLWhhc3BvcHVwJzogdHJ1ZSxcbiAgICAgICdhcmlhLWV4cGFuZGVkJzogZmFsc2VcbiAgICB9KTtcblxuICAgIHRoaXMuX3NldEN1cnJlbnRBbmNob3IodGhpcy4kYW5jaG9ycy5maXJzdCgpKTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5wYXJlbnRDbGFzcyl7XG4gICAgICB0aGlzLiRwYXJlbnQgPSB0aGlzLiRlbGVtZW50LnBhcmVudHMoJy4nICsgdGhpcy5vcHRpb25zLnBhcmVudENsYXNzKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuJHBhcmVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICdkYXRhLXlldGktYm94JzogJGlkLFxuICAgICAgJ2RhdGEtcmVzaXplJzogJGlkLFxuICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6IHRoaXMuJGN1cnJlbnRBbmNob3IuaWQgfHwgR2V0WW9EaWdpdHMoNiwgJ2RkLWFuY2hvcicpXG4gICAgfSk7XG4gICAgc3VwZXIuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIF9nZXREZWZhdWx0UG9zaXRpb24oKSB7XG4gICAgLy8gaGFuZGxlIGxlZ2FjeSBjbGFzc25hbWVzXG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy4kZWxlbWVudFswXS5jbGFzc05hbWUubWF0Y2goLyh0b3B8bGVmdHxyaWdodHxib3R0b20pL2cpO1xuICAgIGlmKHBvc2l0aW9uKSB7XG4gICAgICByZXR1cm4gcG9zaXRpb25bMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnYm90dG9tJ1xuICAgIH1cbiAgfVxuXG4gIF9nZXREZWZhdWx0QWxpZ25tZW50KCkge1xuICAgIC8vIGhhbmRsZSBsZWdhY3kgZmxvYXQgYXBwcm9hY2hcbiAgICB2YXIgaG9yaXpvbnRhbFBvc2l0aW9uID0gL2Zsb2F0LShcXFMrKS8uZXhlYyh0aGlzLiRjdXJyZW50QW5jaG9yLmNsYXNzTmFtZSk7XG4gICAgaWYoaG9yaXpvbnRhbFBvc2l0aW9uKSB7XG4gICAgICByZXR1cm4gaG9yaXpvbnRhbFBvc2l0aW9uWzFdO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5fZ2V0RGVmYXVsdEFsaWdubWVudCgpO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24gb2YgdGhlIGRyb3Bkb3duIHBhbmUsIGNoZWNrcyBmb3IgY29sbGlzaW9ucyBpZiBhbGxvdy1vdmVybGFwIGlzIG5vdCB0cnVlLlxuICAgKiBSZWN1cnNpdmVseSBjYWxscyBpdHNlbGYgaWYgYSBjb2xsaXNpb24gaXMgZGV0ZWN0ZWQsIHdpdGggYSBuZXcgcG9zaXRpb24gY2xhc3MuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldFBvc2l0aW9uKCkge1xuICAgIHN1cGVyLl9zZXRQb3NpdGlvbih0aGlzLiRjdXJyZW50QW5jaG9yLCB0aGlzLiRlbGVtZW50LCB0aGlzLiRwYXJlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgaXQgYSBjdXJyZW50IGFuY2hvci5cbiAgICogQ3VycmVudCBhbmNob3IgYXMgdGhlIHJlZmVyZW5jZSBmb3IgdGhlIHBvc2l0aW9uIG9mIERyb3Bkb3duIHBhbmVzLlxuICAgKiBAcGFyYW0ge0hUTUx9IGVsIC0gRE9NIGVsZW1lbnQgb2YgdGhlIGFuY2hvci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0Q3VycmVudEFuY2hvcihlbCkge1xuICAgIHRoaXMuJGN1cnJlbnRBbmNob3IgPSAkKGVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgZWxlbWVudCB1dGlsaXppbmcgdGhlIHRyaWdnZXJzIHV0aWxpdHkgbGlicmFyeS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy4kZWxlbWVudC5vbih7XG4gICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAnY2xvc2UuemYudHJpZ2dlcic6IHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcbiAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcyksXG4gICAgICAncmVzaXplbWUuemYudHJpZ2dlcic6IHRoaXMuX3NldFBvc2l0aW9uLmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIHRoaXMuJGFuY2hvcnMub2ZmKCdjbGljay56Zi50cmlnZ2VyJylcbiAgICAgIC5vbignY2xpY2suemYudHJpZ2dlcicsIGZ1bmN0aW9uKCkgeyBfdGhpcy5fc2V0Q3VycmVudEFuY2hvcih0aGlzKTsgfSk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuaG92ZXIpe1xuICAgICAgdGhpcy4kYW5jaG9ycy5vZmYoJ21vdXNlZW50ZXIuemYuZHJvcGRvd24gbW91c2VsZWF2ZS56Zi5kcm9wZG93bicpXG4gICAgICAub24oJ21vdXNlZW50ZXIuemYuZHJvcGRvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICBfdGhpcy5fc2V0Q3VycmVudEFuY2hvcih0aGlzKTtcblxuICAgICAgICB2YXIgYm9keURhdGEgPSAkKCdib2R5JykuZGF0YSgpO1xuICAgICAgICBpZih0eXBlb2YoYm9keURhdGEud2hhdGlucHV0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgYm9keURhdGEud2hhdGlucHV0ID09PSAnbW91c2UnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICAgIF90aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICBfdGhpcy4kYW5jaG9ycy5kYXRhKCdob3ZlcicsIHRydWUpO1xuICAgICAgICAgIH0sIF90aGlzLm9wdGlvbnMuaG92ZXJEZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0pLm9uKCdtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICBfdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgX3RoaXMuJGFuY2hvcnMuZGF0YSgnaG92ZXInLCBmYWxzZSk7XG4gICAgICAgIH0sIF90aGlzLm9wdGlvbnMuaG92ZXJEZWxheSk7XG4gICAgICB9KTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5ob3ZlclBhbmUpe1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9mZignbW91c2VlbnRlci56Zi5kcm9wZG93biBtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJylcbiAgICAgICAgICAgIC5vbignbW91c2VlbnRlci56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgIH0pLm9uKCdtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICBfdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFuY2hvcnMuZGF0YSgnaG92ZXInLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH0sIF90aGlzLm9wdGlvbnMuaG92ZXJEZWxheSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy4kYW5jaG9ycy5hZGQodGhpcy4kZWxlbWVudCkub24oJ2tleWRvd24uemYuZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIHZhciAkdGFyZ2V0ID0gJCh0aGlzKSxcbiAgICAgICAgdmlzaWJsZUZvY3VzYWJsZUVsZW1lbnRzID0gS2V5Ym9hcmQuZmluZEZvY3VzYWJsZShfdGhpcy4kZWxlbWVudCk7XG5cbiAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnRHJvcGRvd24nLCB7XG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKF90aGlzLiRhbmNob3JzKSkge1xuICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgX3RoaXMuJGVsZW1lbnQuYXR0cigndGFiaW5kZXgnLCAtMSkuZm9jdXMoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIF90aGlzLiRhbmNob3JzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZXZlbnQgaGFuZGxlciB0byB0aGUgYm9keSB0byBjbG9zZSBhbnkgZHJvcGRvd25zIG9uIGEgY2xpY2suXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZEJvZHlIYW5kbGVyKCkge1xuICAgICB2YXIgJGJvZHkgPSAkKGRvY3VtZW50LmJvZHkpLm5vdCh0aGlzLiRlbGVtZW50KSxcbiAgICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgJGJvZHkub2ZmKCdjbGljay56Zi5kcm9wZG93bicpXG4gICAgICAgICAgLm9uKCdjbGljay56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoX3RoaXMuJGFuY2hvcnMuaXMoZS50YXJnZXQpIHx8IF90aGlzLiRhbmNob3JzLmZpbmQoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfdGhpcy4kZWxlbWVudC5maW5kKGUudGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICRib2R5Lm9mZignY2xpY2suemYuZHJvcGRvd24nKTtcbiAgICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgZHJvcGRvd24gcGFuZSwgYW5kIGZpcmVzIGEgYnViYmxpbmcgZXZlbnQgdG8gY2xvc2Ugb3RoZXIgZHJvcGRvd25zLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyb3Bkb3duI2Nsb3NlbWVcbiAgICogQGZpcmVzIERyb3Bkb3duI3Nob3dcbiAgICovXG4gIG9wZW4oKSB7XG4gICAgLy8gdmFyIF90aGlzID0gdGhpcztcbiAgICAvKipcbiAgICAgKiBGaXJlcyB0byBjbG9zZSBvdGhlciBvcGVuIGRyb3Bkb3ducywgdHlwaWNhbGx5IHdoZW4gZHJvcGRvd24gaXMgb3BlbmluZ1xuICAgICAqIEBldmVudCBEcm9wZG93biNjbG9zZW1lXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjbG9zZW1lLnpmLmRyb3Bkb3duJywgdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpKTtcbiAgICB0aGlzLiRhbmNob3JzLmFkZENsYXNzKCdob3ZlcicpXG4gICAgICAgIC5hdHRyKHsnYXJpYS1leHBhbmRlZCc6IHRydWV9KTtcbiAgICAvLyB0aGlzLiRlbGVtZW50Lyouc2hvdygpKi87XG5cbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1vcGVuaW5nJyk7XG4gICAgdGhpcy5fc2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuaW5nJykuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAuYXR0cih7J2FyaWEtaGlkZGVuJzogZmFsc2V9KTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5hdXRvRm9jdXMpe1xuICAgICAgdmFyICRmb2N1c2FibGUgPSBLZXlib2FyZC5maW5kRm9jdXNhYmxlKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgaWYoJGZvY3VzYWJsZS5sZW5ndGgpe1xuICAgICAgICAkZm9jdXNhYmxlLmVxKDApLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayl7IHRoaXMuX2FkZEJvZHlIYW5kbGVyKCk7IH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhcEZvY3VzKSB7XG4gICAgICBLZXlib2FyZC50cmFwRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgb25jZSB0aGUgZHJvcGRvd24gaXMgdmlzaWJsZS5cbiAgICAgKiBAZXZlbnQgRHJvcGRvd24jc2hvd1xuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignc2hvdy56Zi5kcm9wZG93bicsIFt0aGlzLiRlbGVtZW50XSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBvcGVuIGRyb3Bkb3duIHBhbmUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJvcGRvd24jaGlkZVxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgaWYoIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAuYXR0cih7J2FyaWEtaGlkZGVuJzogdHJ1ZX0pO1xuXG4gICAgdGhpcy4kYW5jaG9ycy5yZW1vdmVDbGFzcygnaG92ZXInKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVzIG9uY2UgdGhlIGRyb3Bkb3duIGlzIG5vIGxvbmdlciB2aXNpYmxlLlxuICAgICAqIEBldmVudCBEcm9wZG93biNoaWRlXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdoaWRlLnpmLmRyb3Bkb3duJywgW3RoaXMuJGVsZW1lbnRdKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhcEZvY3VzKSB7XG4gICAgICBLZXlib2FyZC5yZWxlYXNlRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGRyb3Bkb3duIHBhbmUncyB2aXNpYmlsaXR5LlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICBpZih0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpe1xuICAgICAgaWYodGhpcy4kYW5jaG9ycy5kYXRhKCdob3ZlcicpKSByZXR1cm47XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGRyb3Bkb3duLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYudHJpZ2dlcicpLmhpZGUoKTtcbiAgICB0aGlzLiRhbmNob3JzLm9mZignLnpmLmRyb3Bkb3duJyk7XG4gICAgJChkb2N1bWVudC5ib2R5KS5vZmYoJ2NsaWNrLnpmLmRyb3Bkb3duJyk7XG5cbiAgfVxufVxuXG5Ecm9wZG93bi5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIENsYXNzIHRoYXQgZGVzaWduYXRlcyBib3VuZGluZyBjb250YWluZXIgb2YgRHJvcGRvd24gKGRlZmF1bHQ6IHdpbmRvdylcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgcGFyZW50Q2xhc3M6IG51bGwsXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBkZWxheSBvcGVuaW5nIGEgc3VibWVudSBvbiBob3ZlciBldmVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAyNTBcbiAgICovXG4gIGhvdmVyRGVsYXk6IDI1MCxcbiAgLyoqXG4gICAqIEFsbG93IHN1Ym1lbnVzIHRvIG9wZW4gb24gaG92ZXIgZXZlbnRzXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBob3ZlcjogZmFsc2UsXG4gIC8qKlxuICAgKiBEb24ndCBjbG9zZSBkcm9wZG93biB3aGVuIGhvdmVyaW5nIG92ZXIgZHJvcGRvd24gcGFuZVxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaG92ZXJQYW5lOiBmYWxzZSxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiB0aGUgZHJvcGRvd24gcGFuZSBhbmQgdGhlIHRyaWdnZXJpbmcgZWxlbWVudCBvbiBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHZPZmZzZXQ6IDAsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gdGhlIGRyb3Bkb3duIHBhbmUgYW5kIHRoZSB0cmlnZ2VyaW5nIGVsZW1lbnQgb24gb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBoT2Zmc2V0OiAwLFxuICAvKipcbiAgICogREVQUkVDQVRFRDogQ2xhc3MgYXBwbGllZCB0byBhZGp1c3Qgb3BlbiBwb3NpdGlvbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgcG9zaXRpb25DbGFzczogJycsXG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uIG9mIGRyb3Bkb3duLiBDYW4gYmUgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgcG9zaXRpb246ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsaWdubWVudCBvZiBkcm9wZG93biByZWxhdGl2ZSB0byBhbmNob3IuIENhbiBiZSBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIGNlbnRlciwgb3IgYXV0by5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnYXV0bydcbiAgICovXG4gIGFsaWdubWVudDogJ2F1dG8nLFxuICAvKipcbiAgICogQWxsb3cgb3ZlcmxhcCBvZiBjb250YWluZXIvd2luZG93LiBJZiBmYWxzZSwgZHJvcGRvd24gd2lsbCBmaXJzdCB0cnkgdG8gcG9zaXRpb24gYXMgZGVmaW5lZCBieSBkYXRhLXBvc2l0aW9uIGFuZCBkYXRhLWFsaWdubWVudCwgYnV0IHJlcG9zaXRpb24gaWYgaXQgd291bGQgY2F1c2UgYW4gb3ZlcmZsb3cuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbGxvd092ZXJsYXA6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgb3ZlcmxhcCBvZiBvbmx5IHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lci4gVGhpcyBpcyB0aGUgbW9zdCBjb21tb25cbiAgICogYmVoYXZpb3IgZm9yIGRyb3Bkb3ducywgYWxsb3dpbmcgdGhlIGRyb3Bkb3duIHRvIGV4dGVuZCB0aGUgYm90dG9tIG9mIHRoZVxuICAgKiBzY3JlZW4gYnV0IG5vdCBvdGhlcndpc2UgaW5mbHVlbmNlIG9yIGJyZWFrIG91dCBvZiB0aGUgY29udGFpbmVyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhbGxvd0JvdHRvbU92ZXJsYXA6IHRydWUsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgcGx1Z2luIHRvIHRyYXAgZm9jdXMgdG8gdGhlIGRyb3Bkb3duIHBhbmUgaWYgb3BlbmVkIHdpdGgga2V5Ym9hcmQgY29tbWFuZHMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB0cmFwRm9jdXM6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgdGhlIHBsdWdpbiB0byBzZXQgZm9jdXMgdG8gdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50IHdpdGhpbiB0aGUgcGFuZSwgcmVnYXJkbGVzcyBvZiBtZXRob2Qgb2Ygb3BlbmluZy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGF1dG9Gb2N1czogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvd3MgYSBjbGljayBvbiB0aGUgYm9keSB0byBjbG9zZSB0aGUgZHJvcGRvd24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2s6IGZhbHNlXG59XG5cbmV4cG9ydCB7RHJvcGRvd259O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bi5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuYm94JztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuaW1wb3J0IHsgcnRsIGFzIFJ0bCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuXG5jb25zdCBQT1NJVElPTlMgPSBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddO1xuY29uc3QgVkVSVElDQUxfQUxJR05NRU5UUyA9IFsndG9wJywgJ2JvdHRvbScsICdjZW50ZXInXTtcbmNvbnN0IEhPUklaT05UQUxfQUxJR05NRU5UUyA9IFsnbGVmdCcsICdyaWdodCcsICdjZW50ZXInXTtcblxuY29uc3QgQUxJR05NRU5UUyA9IHtcbiAgJ2xlZnQnOiBWRVJUSUNBTF9BTElHTk1FTlRTLFxuICAncmlnaHQnOiBWRVJUSUNBTF9BTElHTk1FTlRTLFxuICAndG9wJzogSE9SSVpPTlRBTF9BTElHTk1FTlRTLFxuICAnYm90dG9tJzogSE9SSVpPTlRBTF9BTElHTk1FTlRTXG59XG5cbmZ1bmN0aW9uIG5leHRJdGVtKGl0ZW0sIGFycmF5KSB7XG4gIHZhciBjdXJyZW50SWR4ID0gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgaWYoY3VycmVudElkeCA9PT0gYXJyYXkubGVuZ3RoIC0gMSkge1xuICAgIHJldHVybiBhcnJheVswXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXJyYXlbY3VycmVudElkeCArIDFdO1xuICB9XG59XG5cblxuY2xhc3MgUG9zaXRpb25hYmxlIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIEFic3RyYWN0IGNsYXNzIGVuY2Fwc3VsYXRpbmcgdGhlIHRldGhlci1saWtlIGV4cGxpY2l0IHBvc2l0aW9uaW5nIGxvZ2ljXG4gICAqIGluY2x1ZGluZyByZXBvc2l0aW9uaW5nIGJhc2VkIG9uIG92ZXJsYXAuXG4gICAqIEV4cGVjdHMgY2xhc3NlcyB0byBkZWZpbmUgZGVmYXVsdHMgZm9yIHZPZmZzZXQsIGhPZmZzZXQsIHBvc2l0aW9uLFxuICAgKiBhbGlnbm1lbnQsIGFsbG93T3ZlcmxhcCwgYW5kIGFsbG93Qm90dG9tT3ZlcmxhcC4gVGhleSBjYW4gZG8gdGhpcyBieVxuICAgKiBleHRlbmRpbmcgdGhlIGRlZmF1bHRzLCBvciAoZm9yIG5vdyByZWNvbW1lbmRlZCBkdWUgdG8gdGhlIHdheSBkb2NzIGFyZVxuICAgKiBnZW5lcmF0ZWQpIGJ5IGV4cGxpY2l0bHkgZGVjbGFyaW5nIHRoZW0uXG4gICAqXG4gICAqKi9cblxuICBfaW5pdCgpIHtcbiAgICB0aGlzLnRyaWVkUG9zaXRpb25zID0ge307XG4gICAgdGhpcy5wb3NpdGlvbiAgPSB0aGlzLm9wdGlvbnMucG9zaXRpb24gPT09ICdhdXRvJyA/IHRoaXMuX2dldERlZmF1bHRQb3NpdGlvbigpIDogdGhpcy5vcHRpb25zLnBvc2l0aW9uO1xuICAgIHRoaXMuYWxpZ25tZW50ID0gdGhpcy5vcHRpb25zLmFsaWdubWVudCA9PT0gJ2F1dG8nID8gdGhpcy5fZ2V0RGVmYXVsdEFsaWdubWVudCgpIDogdGhpcy5vcHRpb25zLmFsaWdubWVudDtcbiAgfVxuXG4gIF9nZXREZWZhdWx0UG9zaXRpb24gKCkge1xuICAgIHJldHVybiAnYm90dG9tJztcbiAgfVxuXG4gIF9nZXREZWZhdWx0QWxpZ25tZW50KCkge1xuICAgIHN3aXRjaCh0aGlzLnBvc2l0aW9uKSB7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgcmV0dXJuIFJ0bCgpID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICByZXR1cm4gJ2JvdHRvbSc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkanVzdHMgdGhlIHBvc2l0aW9uYWJsZSBwb3NzaWJsZSBwb3NpdGlvbnMgYnkgaXRlcmF0aW5nIHRocm91Z2ggYWxpZ25tZW50c1xuICAgKiBhbmQgcG9zaXRpb25zLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZXBvc2l0aW9uKCkge1xuICAgIGlmKHRoaXMuX2FsaWdubWVudHNFeGhhdXN0ZWQodGhpcy5wb3NpdGlvbikpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSBuZXh0SXRlbSh0aGlzLnBvc2l0aW9uLCBQT1NJVElPTlMpO1xuICAgICAgdGhpcy5hbGlnbm1lbnQgPSBBTElHTk1FTlRTW3RoaXMucG9zaXRpb25dWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWFsaWduKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkanVzdHMgdGhlIGRyb3Bkb3duIHBhbmUgcG9zc2libGUgcG9zaXRpb25zIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIGFsaWdubWVudHNcbiAgICogb24gdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlYWxpZ24oKSB7XG4gICAgdGhpcy5fYWRkVHJpZWRQb3NpdGlvbih0aGlzLnBvc2l0aW9uLCB0aGlzLmFsaWdubWVudClcbiAgICB0aGlzLmFsaWdubWVudCA9IG5leHRJdGVtKHRoaXMuYWxpZ25tZW50LCBBTElHTk1FTlRTW3RoaXMucG9zaXRpb25dKVxuICB9XG5cbiAgX2FkZFRyaWVkUG9zaXRpb24ocG9zaXRpb24sIGFsaWdubWVudCkge1xuICAgIHRoaXMudHJpZWRQb3NpdGlvbnNbcG9zaXRpb25dID0gdGhpcy50cmllZFBvc2l0aW9uc1twb3NpdGlvbl0gfHwgW11cbiAgICB0aGlzLnRyaWVkUG9zaXRpb25zW3Bvc2l0aW9uXS5wdXNoKGFsaWdubWVudCk7XG4gIH1cblxuICBfcG9zaXRpb25zRXhoYXVzdGVkKCkge1xuICAgIHZhciBpc0V4aGF1c3RlZCA9IHRydWU7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IFBPU0lUSU9OUy5sZW5ndGg7IGkrKykge1xuICAgICAgaXNFeGhhdXN0ZWQgPSBpc0V4aGF1c3RlZCAmJiB0aGlzLl9hbGlnbm1lbnRzRXhoYXVzdGVkKFBPU0lUSU9OU1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBpc0V4aGF1c3RlZDtcbiAgfVxuXG4gIF9hbGlnbm1lbnRzRXhoYXVzdGVkKHBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMudHJpZWRQb3NpdGlvbnNbcG9zaXRpb25dICYmIHRoaXMudHJpZWRQb3NpdGlvbnNbcG9zaXRpb25dLmxlbmd0aCA9PSBBTElHTk1FTlRTW3Bvc2l0aW9uXS5sZW5ndGg7XG4gIH1cblxuXG4gIC8vIFdoZW4gd2UncmUgdHJ5aW5nIHRvIGNlbnRlciwgd2UgZG9uJ3Qgd2FudCB0byBhcHBseSBvZmZzZXQgdGhhdCdzIGdvaW5nIHRvXG4gIC8vIHRha2UgdXMganVzdCBvZmYgY2VudGVyLCBzbyB3cmFwIGFyb3VuZCB0byByZXR1cm4gMCBmb3IgdGhlIGFwcHJvcHJpYXRlXG4gIC8vIG9mZnNldCBpbiB0aG9zZSBhbGlnbm1lbnRzLiAgVE9ETzogRmlndXJlIG91dCBpZiB3ZSB3YW50IHRvIG1ha2UgdGhpc1xuICAvLyBjb25maWd1cmFibGUgYmVoYXZpb3IuLi4gaXQgZmVlbHMgbW9yZSBpbnR1aXRpdmUsIGVzcGVjaWFsbHkgZm9yIHRvb2x0aXBzLCBidXRcbiAgLy8gaXQncyBwb3NzaWJsZSBzb21lb25lIG1pZ2h0IGFjdHVhbGx5IHdhbnQgdG8gc3RhcnQgZnJvbSBjZW50ZXIgYW5kIHRoZW4gbnVkZ2VcbiAgLy8gc2xpZ2h0bHkgb2ZmLlxuICBfZ2V0Vk9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnZPZmZzZXQ7XG4gIH1cblxuICBfZ2V0SE9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmhPZmZzZXQ7XG4gIH1cblxuXG4gIF9zZXRQb3NpdGlvbigkYW5jaG9yLCAkZWxlbWVudCwgJHBhcmVudCkge1xuICAgIGlmKCRhbmNob3IuYXR0cignYXJpYS1leHBhbmRlZCcpID09PSAnZmFsc2UnKXsgcmV0dXJuIGZhbHNlOyB9XG4gICAgdmFyICRlbGVEaW1zID0gQm94LkdldERpbWVuc2lvbnMoJGVsZW1lbnQpLFxuICAgICAgICAkYW5jaG9yRGltcyA9IEJveC5HZXREaW1lbnNpb25zKCRhbmNob3IpO1xuXG5cbiAgICAkZWxlbWVudC5vZmZzZXQoQm94LkdldEV4cGxpY2l0T2Zmc2V0cygkZWxlbWVudCwgJGFuY2hvciwgdGhpcy5wb3NpdGlvbiwgdGhpcy5hbGlnbm1lbnQsIHRoaXMuX2dldFZPZmZzZXQoKSwgdGhpcy5fZ2V0SE9mZnNldCgpKSk7XG5cbiAgICBpZighdGhpcy5vcHRpb25zLmFsbG93T3ZlcmxhcCkge1xuICAgICAgdmFyIG92ZXJsYXBzID0ge307XG4gICAgICB2YXIgbWluT3ZlcmxhcCA9IDEwMDAwMDAwMDtcbiAgICAgIC8vIGRlZmF1bHQgY29vcmRpbmF0ZXMgdG8gaG93IHdlIHN0YXJ0LCBpbiBjYXNlIHdlIGNhbid0IGZpZ3VyZSBvdXQgYmV0dGVyXG4gICAgICB2YXIgbWluQ29vcmRpbmF0ZXMgPSB7cG9zaXRpb246IHRoaXMucG9zaXRpb24sIGFsaWdubWVudDogdGhpcy5hbGlnbm1lbnR9O1xuICAgICAgd2hpbGUoIXRoaXMuX3Bvc2l0aW9uc0V4aGF1c3RlZCgpKSB7XG4gICAgICAgIGxldCBvdmVybGFwID0gQm94Lk92ZXJsYXBBcmVhKCRlbGVtZW50LCAkcGFyZW50LCBmYWxzZSwgZmFsc2UsIHRoaXMub3B0aW9ucy5hbGxvd0JvdHRvbU92ZXJsYXApO1xuICAgICAgICBpZihvdmVybGFwID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3ZlcmxhcCA8IG1pbk92ZXJsYXApIHtcbiAgICAgICAgICBtaW5PdmVybGFwID0gb3ZlcmxhcDtcbiAgICAgICAgICBtaW5Db29yZGluYXRlcyA9IHtwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiwgYWxpZ25tZW50OiB0aGlzLmFsaWdubWVudH07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZXBvc2l0aW9uKCk7XG5cbiAgICAgICAgJGVsZW1lbnQub2Zmc2V0KEJveC5HZXRFeHBsaWNpdE9mZnNldHMoJGVsZW1lbnQsICRhbmNob3IsIHRoaXMucG9zaXRpb24sIHRoaXMuYWxpZ25tZW50LCB0aGlzLl9nZXRWT2Zmc2V0KCksIHRoaXMuX2dldEhPZmZzZXQoKSkpO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UgZ2V0IHRocm91Z2ggdGhlIGVudGlyZSBsb29wLCB0aGVyZSB3YXMgbm8gbm9uLW92ZXJsYXBwaW5nXG4gICAgICAvLyBwb3NpdGlvbiBhdmFpbGFibGUuIFBpY2sgdGhlIHZlcnNpb24gd2l0aCBsZWFzdCBvdmVybGFwLlxuICAgICAgdGhpcy5wb3NpdGlvbiA9IG1pbkNvb3JkaW5hdGVzLnBvc2l0aW9uO1xuICAgICAgdGhpcy5hbGlnbm1lbnQgPSBtaW5Db29yZGluYXRlcy5hbGlnbm1lbnQ7XG4gICAgICAkZWxlbWVudC5vZmZzZXQoQm94LkdldEV4cGxpY2l0T2Zmc2V0cygkZWxlbWVudCwgJGFuY2hvciwgdGhpcy5wb3NpdGlvbiwgdGhpcy5hbGlnbm1lbnQsIHRoaXMuX2dldFZPZmZzZXQoKSwgdGhpcy5fZ2V0SE9mZnNldCgpKSk7XG4gICAgfVxuICB9XG5cbn1cblxuUG9zaXRpb25hYmxlLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogUG9zaXRpb24gb2YgcG9zaXRpb25hYmxlIHJlbGF0aXZlIHRvIGFuY2hvci4gQ2FuIGJlIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgb3IgYXV0by5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnYXV0bydcbiAgICovXG4gIHBvc2l0aW9uOiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGlnbm1lbnQgb2YgcG9zaXRpb25hYmxlIHJlbGF0aXZlIHRvIGFuY2hvci4gQ2FuIGJlIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgY2VudGVyLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgYWxpZ25tZW50OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvdyBvdmVybGFwIG9mIGNvbnRhaW5lci93aW5kb3cuIElmIGZhbHNlLCBkcm9wZG93biBwb3NpdGlvbmFibGUgZmlyc3RcbiAgICogdHJ5IHRvIHBvc2l0aW9uIGFzIGRlZmluZWQgYnkgZGF0YS1wb3NpdGlvbiBhbmQgZGF0YS1hbGlnbm1lbnQsIGJ1dFxuICAgKiByZXBvc2l0aW9uIGlmIGl0IHdvdWxkIGNhdXNlIGFuIG92ZXJmbG93LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYWxsb3dPdmVybGFwOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93IG92ZXJsYXAgb2Ygb25seSB0aGUgYm90dG9tIG9mIHRoZSBjb250YWluZXIuIFRoaXMgaXMgdGhlIG1vc3QgY29tbW9uXG4gICAqIGJlaGF2aW9yIGZvciBkcm9wZG93bnMsIGFsbG93aW5nIHRoZSBkcm9wZG93biB0byBleHRlbmQgdGhlIGJvdHRvbSBvZiB0aGVcbiAgICogc2NyZWVuIGJ1dCBub3Qgb3RoZXJ3aXNlIGluZmx1ZW5jZSBvciBicmVhayBvdXQgb2YgdGhlIGNvbnRhaW5lci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgYWxsb3dCb3R0b21PdmVybGFwOiB0cnVlLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyB0aGUgcG9zaXRpb25hYmxlIHNob3VsZCBiZSBzZXBhcmF0ZWQgdmVydGljYWxseSBmcm9tIGFuY2hvclxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHZPZmZzZXQ6IDAsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIHRoZSBwb3NpdGlvbmFibGUgc2hvdWxkIGJlIHNlcGFyYXRlZCBob3Jpem9udGFsbHkgZnJvbSBhbmNob3JcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBoT2Zmc2V0OiAwLFxufVxuXG5leHBvcnQge1Bvc2l0aW9uYWJsZX07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnBvc2l0aW9uYWJsZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXInO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuXG4vKipcbiAqIEVxdWFsaXplciBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uZXF1YWxpemVyXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXIgaWYgZXF1YWxpemVyIGNvbnRhaW5zIGltYWdlc1xuICovXG5cbmNsYXNzIEVxdWFsaXplciBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIEVxdWFsaXplci5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIEVxdWFsaXplclxuICAgKiBAZmlyZXMgRXF1YWxpemVyI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGFkZCB0aGUgdHJpZ2dlciB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpe1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyAgPSAkLmV4dGVuZCh7fSwgRXF1YWxpemVyLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnRXF1YWxpemVyJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIEVxdWFsaXplciBwbHVnaW4gYW5kIGNhbGxzIGZ1bmN0aW9ucyB0byBnZXQgZXF1YWxpemVyIGZ1bmN0aW9uaW5nIG9uIGxvYWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgZXFJZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1lcXVhbGl6ZXInKSB8fCAnJztcbiAgICB2YXIgJHdhdGNoZWQgPSB0aGlzLiRlbGVtZW50LmZpbmQoYFtkYXRhLWVxdWFsaXplci13YXRjaD1cIiR7ZXFJZH1cIl1gKTtcblxuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcblxuICAgIHRoaXMuJHdhdGNoZWQgPSAkd2F0Y2hlZC5sZW5ndGggPyAkd2F0Y2hlZCA6IHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtZXF1YWxpemVyLXdhdGNoXScpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1yZXNpemUnLCAoZXFJZCB8fCBHZXRZb0RpZ2l0cyg2LCAnZXEnKSkpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1tdXRhdGUnLCAoZXFJZCB8fCBHZXRZb0RpZ2l0cyg2LCAnZXEnKSkpO1xuXG4gICAgdGhpcy5oYXNOZXN0ZWQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLWVxdWFsaXplcl0nKS5sZW5ndGggPiAwO1xuICAgIHRoaXMuaXNOZXN0ZWQgPSB0aGlzLiRlbGVtZW50LnBhcmVudHNVbnRpbChkb2N1bWVudC5ib2R5LCAnW2RhdGEtZXF1YWxpemVyXScpLmxlbmd0aCA+IDA7XG4gICAgdGhpcy5pc09uID0gZmFsc2U7XG4gICAgdGhpcy5fYmluZEhhbmRsZXIgPSB7XG4gICAgICBvblJlc2l6ZU1lQm91bmQ6IHRoaXMuX29uUmVzaXplTWUuYmluZCh0aGlzKSxcbiAgICAgIG9uUG9zdEVxdWFsaXplZEJvdW5kOiB0aGlzLl9vblBvc3RFcXVhbGl6ZWQuYmluZCh0aGlzKVxuICAgIH07XG5cbiAgICB2YXIgaW1ncyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnaW1nJyk7XG4gICAgdmFyIHRvb1NtYWxsO1xuICAgIGlmKHRoaXMub3B0aW9ucy5lcXVhbGl6ZU9uKXtcbiAgICAgIHRvb1NtYWxsID0gdGhpcy5fY2hlY2tNUSgpO1xuICAgICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCB0aGlzLl9jaGVja01RLmJpbmQodGhpcykpO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgfVxuICAgIGlmKCh0b29TbWFsbCAhPT0gdW5kZWZpbmVkICYmIHRvb1NtYWxsID09PSBmYWxzZSkgfHwgdG9vU21hbGwgPT09IHVuZGVmaW5lZCl7XG4gICAgICBpZihpbWdzLmxlbmd0aCl7XG4gICAgICAgIG9uSW1hZ2VzTG9hZGVkKGltZ3MsIHRoaXMuX3JlZmxvdy5iaW5kKHRoaXMpKTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLl9yZWZsb3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgaWYgdGhlIGJyZWFrcG9pbnQgaXMgdG9vIHNtYWxsLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhdXNlRXZlbnRzKCkge1xuICAgIHRoaXMuaXNPbiA9IGZhbHNlO1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKHtcbiAgICAgICcuemYuZXF1YWxpemVyJzogdGhpcy5fYmluZEhhbmRsZXIub25Qb3N0RXF1YWxpemVkQm91bmQsXG4gICAgICAncmVzaXplbWUuemYudHJpZ2dlcic6IHRoaXMuX2JpbmRIYW5kbGVyLm9uUmVzaXplTWVCb3VuZCxcblx0ICAnbXV0YXRlbWUuemYudHJpZ2dlcic6IHRoaXMuX2JpbmRIYW5kbGVyLm9uUmVzaXplTWVCb3VuZFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGZ1bmN0aW9uIHRvIGhhbmRsZSAkZWxlbWVudHMgcmVzaXplbWUuemYudHJpZ2dlciwgd2l0aCBib3VuZCB0aGlzIG9uIF9iaW5kSGFuZGxlci5vblJlc2l6ZU1lQm91bmRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9vblJlc2l6ZU1lKGUpIHtcbiAgICB0aGlzLl9yZWZsb3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmdW5jdGlvbiB0byBoYW5kbGUgJGVsZW1lbnRzIHBvc3RlcXVhbGl6ZWQuemYuZXF1YWxpemVyLCB3aXRoIGJvdW5kIHRoaXMgb24gX2JpbmRIYW5kbGVyLm9uUG9zdEVxdWFsaXplZEJvdW5kXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfb25Qb3N0RXF1YWxpemVkKGUpIHtcbiAgICBpZihlLnRhcmdldCAhPT0gdGhpcy4kZWxlbWVudFswXSl7IHRoaXMuX3JlZmxvdygpOyB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgZXZlbnRzIGZvciBFcXVhbGl6ZXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5fcGF1c2VFdmVudHMoKTtcbiAgICBpZih0aGlzLmhhc05lc3RlZCl7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdwb3N0ZXF1YWxpemVkLnpmLmVxdWFsaXplcicsIHRoaXMuX2JpbmRIYW5kbGVyLm9uUG9zdEVxdWFsaXplZEJvdW5kKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCB0aGlzLl9iaW5kSGFuZGxlci5vblJlc2l6ZU1lQm91bmQpO1xuXHQgIHRoaXMuJGVsZW1lbnQub24oJ211dGF0ZW1lLnpmLnRyaWdnZXInLCB0aGlzLl9iaW5kSGFuZGxlci5vblJlc2l6ZU1lQm91bmQpO1xuICAgIH1cbiAgICB0aGlzLmlzT24gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgY3VycmVudCBicmVha3BvaW50IHRvIHRoZSBtaW5pbXVtIHJlcXVpcmVkIHNpemUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2hlY2tNUSgpIHtcbiAgICB2YXIgdG9vU21hbGwgPSAhTWVkaWFRdWVyeS5pcyh0aGlzLm9wdGlvbnMuZXF1YWxpemVPbik7XG4gICAgaWYodG9vU21hbGwpe1xuICAgICAgaWYodGhpcy5pc09uKXtcbiAgICAgICAgdGhpcy5fcGF1c2VFdmVudHMoKTtcbiAgICAgICAgdGhpcy4kd2F0Y2hlZC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICBpZighdGhpcy5pc09uKXtcbiAgICAgICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b29TbWFsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG5vb3AgdmVyc2lvbiBmb3IgdGhlIHBsdWdpblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2tpbGxzd2l0Y2goKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIG5lY2Vzc2FyeSBmdW5jdGlvbnMgdG8gdXBkYXRlIEVxdWFsaXplciB1cG9uIERPTSBjaGFuZ2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZWZsb3coKSB7XG4gICAgaWYoIXRoaXMub3B0aW9ucy5lcXVhbGl6ZU9uU3RhY2spe1xuICAgICAgaWYodGhpcy5faXNTdGFja2VkKCkpe1xuICAgICAgICB0aGlzLiR3YXRjaGVkLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmVxdWFsaXplQnlSb3cpIHtcbiAgICAgIHRoaXMuZ2V0SGVpZ2h0c0J5Um93KHRoaXMuYXBwbHlIZWlnaHRCeVJvdy5iaW5kKHRoaXMpKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuZ2V0SGVpZ2h0cyh0aGlzLmFwcGx5SGVpZ2h0LmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSBkZXRlcm1pbmVzIGlmIHRoZSBmaXJzdCAyIGVsZW1lbnRzIGFyZSAqTk9UKiBzdGFja2VkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzU3RhY2tlZCgpIHtcbiAgICBpZiAoIXRoaXMuJHdhdGNoZWRbMF0gfHwgIXRoaXMuJHdhdGNoZWRbMV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kd2F0Y2hlZFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgIT09IHRoaXMuJHdhdGNoZWRbMV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBvdXRlciBoZWlnaHRzIG9mIGNoaWxkcmVuIGNvbnRhaW5lZCB3aXRoaW4gYW4gRXF1YWxpemVyIHBhcmVudCBhbmQgcmV0dXJucyB0aGVtIGluIGFuIGFycmF5XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gQSBub24tb3B0aW9uYWwgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSBoZWlnaHRzIGFycmF5IHRvLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGhlaWdodHMgLSBBbiBhcnJheSBvZiBoZWlnaHRzIG9mIGNoaWxkcmVuIHdpdGhpbiBFcXVhbGl6ZXIgY29udGFpbmVyXG4gICAqL1xuICBnZXRIZWlnaHRzKGNiKSB7XG4gICAgdmFyIGhlaWdodHMgPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSB0aGlzLiR3YXRjaGVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHRoaXMuJHdhdGNoZWRbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgaGVpZ2h0cy5wdXNoKHRoaXMuJHdhdGNoZWRbaV0ub2Zmc2V0SGVpZ2h0KTtcbiAgICB9XG4gICAgY2IoaGVpZ2h0cyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIG91dGVyIGhlaWdodHMgb2YgY2hpbGRyZW4gY29udGFpbmVkIHdpdGhpbiBhbiBFcXVhbGl6ZXIgcGFyZW50IGFuZCByZXR1cm5zIHRoZW0gaW4gYW4gYXJyYXlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBBIG5vbi1vcHRpb25hbCBjYWxsYmFjayB0byByZXR1cm4gdGhlIGhlaWdodHMgYXJyYXkgdG8uXG4gICAqIEByZXR1cm5zIHtBcnJheX0gZ3JvdXBzIC0gQW4gYXJyYXkgb2YgaGVpZ2h0cyBvZiBjaGlsZHJlbiB3aXRoaW4gRXF1YWxpemVyIGNvbnRhaW5lciBncm91cGVkIGJ5IHJvdyB3aXRoIGVsZW1lbnQsaGVpZ2h0IGFuZCBtYXggYXMgbGFzdCBjaGlsZFxuICAgKi9cbiAgZ2V0SGVpZ2h0c0J5Um93KGNiKSB7XG4gICAgdmFyIGxhc3RFbFRvcE9mZnNldCA9ICh0aGlzLiR3YXRjaGVkLmxlbmd0aCA/IHRoaXMuJHdhdGNoZWQuZmlyc3QoKS5vZmZzZXQoKS50b3AgOiAwKSxcbiAgICAgICAgZ3JvdXBzID0gW10sXG4gICAgICAgIGdyb3VwID0gMDtcbiAgICAvL2dyb3VwIGJ5IFJvd1xuICAgIGdyb3Vwc1tncm91cF0gPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSB0aGlzLiR3YXRjaGVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHRoaXMuJHdhdGNoZWRbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgLy9tYXliZSBjb3VsZCB1c2UgdGhpcy4kd2F0Y2hlZFtpXS5vZmZzZXRUb3BcbiAgICAgIHZhciBlbE9mZnNldFRvcCA9ICQodGhpcy4kd2F0Y2hlZFtpXSkub2Zmc2V0KCkudG9wO1xuICAgICAgaWYgKGVsT2Zmc2V0VG9wIT1sYXN0RWxUb3BPZmZzZXQpIHtcbiAgICAgICAgZ3JvdXArKztcbiAgICAgICAgZ3JvdXBzW2dyb3VwXSA9IFtdO1xuICAgICAgICBsYXN0RWxUb3BPZmZzZXQ9ZWxPZmZzZXRUb3A7XG4gICAgICB9XG4gICAgICBncm91cHNbZ3JvdXBdLnB1c2goW3RoaXMuJHdhdGNoZWRbaV0sdGhpcy4kd2F0Y2hlZFtpXS5vZmZzZXRIZWlnaHRdKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMCwgbG4gPSBncm91cHMubGVuZ3RoOyBqIDwgbG47IGorKykge1xuICAgICAgdmFyIGhlaWdodHMgPSAkKGdyb3Vwc1tqXSkubWFwKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzWzFdOyB9KS5nZXQoKTtcbiAgICAgIHZhciBtYXggICAgICAgICA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhlaWdodHMpO1xuICAgICAgZ3JvdXBzW2pdLnB1c2gobWF4KTtcbiAgICB9XG4gICAgY2IoZ3JvdXBzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBDU1MgaGVpZ2h0IHByb3BlcnR5IG9mIGVhY2ggY2hpbGQgaW4gYW4gRXF1YWxpemVyIHBhcmVudCB0byBtYXRjaCB0aGUgdGFsbGVzdFxuICAgKiBAcGFyYW0ge2FycmF5fSBoZWlnaHRzIC0gQW4gYXJyYXkgb2YgaGVpZ2h0cyBvZiBjaGlsZHJlbiB3aXRoaW4gRXF1YWxpemVyIGNvbnRhaW5lclxuICAgKiBAZmlyZXMgRXF1YWxpemVyI3ByZWVxdWFsaXplZFxuICAgKiBAZmlyZXMgRXF1YWxpemVyI3Bvc3RlcXVhbGl6ZWRcbiAgICovXG4gIGFwcGx5SGVpZ2h0KGhlaWdodHMpIHtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaGVpZ2h0cyk7XG4gICAgLyoqXG4gICAgICogRmlyZXMgYmVmb3JlIHRoZSBoZWlnaHRzIGFyZSBhcHBsaWVkXG4gICAgICogQGV2ZW50IEVxdWFsaXplciNwcmVlcXVhbGl6ZWRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3ByZWVxdWFsaXplZC56Zi5lcXVhbGl6ZXInKTtcblxuICAgIHRoaXMuJHdhdGNoZWQuY3NzKCdoZWlnaHQnLCBtYXgpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgaGVpZ2h0cyBoYXZlIGJlZW4gYXBwbGllZFxuICAgICAqIEBldmVudCBFcXVhbGl6ZXIjcG9zdGVxdWFsaXplZFxuICAgICAqL1xuICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3Bvc3RlcXVhbGl6ZWQuemYuZXF1YWxpemVyJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgQ1NTIGhlaWdodCBwcm9wZXJ0eSBvZiBlYWNoIGNoaWxkIGluIGFuIEVxdWFsaXplciBwYXJlbnQgdG8gbWF0Y2ggdGhlIHRhbGxlc3QgYnkgcm93XG4gICAqIEBwYXJhbSB7YXJyYXl9IGdyb3VwcyAtIEFuIGFycmF5IG9mIGhlaWdodHMgb2YgY2hpbGRyZW4gd2l0aGluIEVxdWFsaXplciBjb250YWluZXIgZ3JvdXBlZCBieSByb3cgd2l0aCBlbGVtZW50LGhlaWdodCBhbmQgbWF4IGFzIGxhc3QgY2hpbGRcbiAgICogQGZpcmVzIEVxdWFsaXplciNwcmVlcXVhbGl6ZWRcbiAgICogQGZpcmVzIEVxdWFsaXplciNwcmVlcXVhbGl6ZWRyb3dcbiAgICogQGZpcmVzIEVxdWFsaXplciNwb3N0ZXF1YWxpemVkcm93XG4gICAqIEBmaXJlcyBFcXVhbGl6ZXIjcG9zdGVxdWFsaXplZFxuICAgKi9cbiAgYXBwbHlIZWlnaHRCeVJvdyhncm91cHMpIHtcbiAgICAvKipcbiAgICAgKiBGaXJlcyBiZWZvcmUgdGhlIGhlaWdodHMgYXJlIGFwcGxpZWRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3ByZWVxdWFsaXplZC56Zi5lcXVhbGl6ZXInKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZ3JvdXBzLmxlbmd0aDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgdmFyIGdyb3Vwc0lMZW5ndGggPSBncm91cHNbaV0ubGVuZ3RoLFxuICAgICAgICAgIG1heCA9IGdyb3Vwc1tpXVtncm91cHNJTGVuZ3RoIC0gMV07XG4gICAgICBpZiAoZ3JvdXBzSUxlbmd0aDw9Mikge1xuICAgICAgICAkKGdyb3Vwc1tpXVswXVswXSkuY3NzKHsnaGVpZ2h0JzonYXV0byd9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAgKiBGaXJlcyBiZWZvcmUgdGhlIGhlaWdodHMgcGVyIHJvdyBhcmUgYXBwbGllZFxuICAgICAgICAqIEBldmVudCBFcXVhbGl6ZXIjcHJlZXF1YWxpemVkcm93XG4gICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3ByZWVxdWFsaXplZHJvdy56Zi5lcXVhbGl6ZXInKTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBsZW5KID0gKGdyb3Vwc0lMZW5ndGgtMSk7IGogPCBsZW5KIDsgaisrKSB7XG4gICAgICAgICQoZ3JvdXBzW2ldW2pdWzBdKS5jc3MoeydoZWlnaHQnOm1heH0pO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgICogRmlyZXMgd2hlbiB0aGUgaGVpZ2h0cyBwZXIgcm93IGhhdmUgYmVlbiBhcHBsaWVkXG4gICAgICAgICogQGV2ZW50IEVxdWFsaXplciNwb3N0ZXF1YWxpemVkcm93XG4gICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3Bvc3RlcXVhbGl6ZWRyb3cuemYuZXF1YWxpemVyJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIGhlaWdodHMgaGF2ZSBiZWVuIGFwcGxpZWRcbiAgICAgKi9cbiAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdwb3N0ZXF1YWxpemVkLnpmLmVxdWFsaXplcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIEVxdWFsaXplci5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLl9wYXVzZUV2ZW50cygpO1xuICAgIHRoaXMuJHdhdGNoZWQuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBzZXR0aW5ncyBmb3IgcGx1Z2luXG4gKi9cbkVxdWFsaXplci5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEVuYWJsZSBoZWlnaHQgZXF1YWxpemF0aW9uIHdoZW4gc3RhY2tlZCBvbiBzbWFsbGVyIHNjcmVlbnMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBlcXVhbGl6ZU9uU3RhY2s6IGZhbHNlLFxuICAvKipcbiAgICogRW5hYmxlIGhlaWdodCBlcXVhbGl6YXRpb24gcm93IGJ5IHJvdy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGVxdWFsaXplQnlSb3c6IGZhbHNlLFxuICAvKipcbiAgICogU3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBicmVha3BvaW50IHNpemUgdGhlIHBsdWdpbiBzaG91bGQgZXF1YWxpemUgaGVpZ2h0cyBvbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgZXF1YWxpemVPbjogJydcbn07XG5cbmV4cG9ydCB7RXF1YWxpemVyfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZXF1YWxpemVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuXG5cbi8qKlxuICogSW50ZXJjaGFuZ2UgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLmludGVyY2hhbmdlXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqL1xuXG5jbGFzcyBJbnRlcmNoYW5nZSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIEludGVyY2hhbmdlLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgSW50ZXJjaGFuZ2VcbiAgICogQGZpcmVzIEludGVyY2hhbmdlI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGFkZCB0aGUgdHJpZ2dlciB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgSW50ZXJjaGFuZ2UuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMucnVsZXMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRQYXRoID0gJyc7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnSW50ZXJjaGFuZ2UnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgSW50ZXJjaGFuZ2UgcGx1Z2luIGFuZCBjYWxscyBmdW5jdGlvbnMgdG8gZ2V0IGludGVyY2hhbmdlIGZ1bmN0aW9uaW5nIG9uIGxvYWQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuXG4gICAgdmFyIGlkID0gdGhpcy4kZWxlbWVudFswXS5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnaW50ZXJjaGFuZ2UnKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgJ2RhdGEtcmVzaXplJzogaWQsXG4gICAgICAnaWQnOiBpZFxuICAgIH0pO1xuXG4gICAgdGhpcy5fYWRkQnJlYWtwb2ludHMoKTtcbiAgICB0aGlzLl9nZW5lcmF0ZVJ1bGVzKCk7XG4gICAgdGhpcy5fcmVmbG93KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgZXZlbnRzIGZvciBJbnRlcmNoYW5nZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdyZXNpemVtZS56Zi50cmlnZ2VyJykub24oJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCAoKSA9PiB0aGlzLl9yZWZsb3coKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyB0byB1cGRhdGUgSW50ZXJjaGFuZ2UgdXBvbiBET00gY2hhbmdlXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlZmxvdygpIHtcbiAgICB2YXIgbWF0Y2g7XG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBydWxlLCBidXQgb25seSBzYXZlIHRoZSBsYXN0IG1hdGNoXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLnJ1bGVzKSB7XG4gICAgICBpZih0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHZhciBydWxlID0gdGhpcy5ydWxlc1tpXTtcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKHJ1bGUucXVlcnkpLm1hdGNoZXMpIHtcbiAgICAgICAgICBtYXRjaCA9IHJ1bGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHRoaXMucmVwbGFjZShtYXRjaC5wYXRoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgRm91bmRhdGlvbiBicmVha3BvaW50cyBhbmQgYWRkcyB0aGVtIHRvIHRoZSBJbnRlcmNoYW5nZS5TUEVDSUFMX1FVRVJJRVMgb2JqZWN0LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRCcmVha3BvaW50cygpIHtcbiAgICBmb3IgKHZhciBpIGluIE1lZGlhUXVlcnkucXVlcmllcykge1xuICAgICAgaWYgKE1lZGlhUXVlcnkucXVlcmllcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICB2YXIgcXVlcnkgPSBNZWRpYVF1ZXJ5LnF1ZXJpZXNbaV07XG4gICAgICAgIEludGVyY2hhbmdlLlNQRUNJQUxfUVVFUklFU1txdWVyeS5uYW1lXSA9IHF1ZXJ5LnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIEludGVyY2hhbmdlIGVsZW1lbnQgZm9yIHRoZSBwcm92aWRlZCBtZWRpYSBxdWVyeSArIGNvbnRlbnQgcGFpcmluZ3NcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0aGF0IGlzIGFuIEludGVyY2hhbmdlIGluc3RhbmNlXG4gICAqIEByZXR1cm5zIHtBcnJheX0gc2NlbmFyaW9zIC0gQXJyYXkgb2Ygb2JqZWN0cyB0aGF0IGhhdmUgJ21xJyBhbmQgJ3BhdGgnIGtleXMgd2l0aCBjb3JyZXNwb25kaW5nIGtleXNcbiAgICovXG4gIF9nZW5lcmF0ZVJ1bGVzKGVsZW1lbnQpIHtcbiAgICB2YXIgcnVsZXNMaXN0ID0gW107XG4gICAgdmFyIHJ1bGVzO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ydWxlcykge1xuICAgICAgcnVsZXMgPSB0aGlzLm9wdGlvbnMucnVsZXM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcnVsZXMgPSB0aGlzLiRlbGVtZW50LmRhdGEoJ2ludGVyY2hhbmdlJyk7XG4gICAgfVxuXG4gICAgcnVsZXMgPSAgdHlwZW9mIHJ1bGVzID09PSAnc3RyaW5nJyA/IHJ1bGVzLm1hdGNoKC9cXFsuKj9cXF0vZykgOiBydWxlcztcblxuICAgIGZvciAodmFyIGkgaW4gcnVsZXMpIHtcbiAgICAgIGlmKHJ1bGVzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHZhciBydWxlID0gcnVsZXNbaV0uc2xpY2UoMSwgLTEpLnNwbGl0KCcsICcpO1xuICAgICAgICB2YXIgcGF0aCA9IHJ1bGUuc2xpY2UoMCwgLTEpLmpvaW4oJycpO1xuICAgICAgICB2YXIgcXVlcnkgPSBydWxlW3J1bGUubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKEludGVyY2hhbmdlLlNQRUNJQUxfUVVFUklFU1txdWVyeV0pIHtcbiAgICAgICAgICBxdWVyeSA9IEludGVyY2hhbmdlLlNQRUNJQUxfUVVFUklFU1txdWVyeV07XG4gICAgICAgIH1cblxuICAgICAgICBydWxlc0xpc3QucHVzaCh7XG4gICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICBxdWVyeTogcXVlcnlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzTGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGBzcmNgIHByb3BlcnR5IG9mIGFuIGltYWdlLCBvciBjaGFuZ2UgdGhlIEhUTUwgb2YgYSBjb250YWluZXIsIHRvIHRoZSBzcGVjaWZpZWQgcGF0aC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gUGF0aCB0byB0aGUgaW1hZ2Ugb3IgSFRNTCBwYXJ0aWFsLlxuICAgKiBAZmlyZXMgSW50ZXJjaGFuZ2UjcmVwbGFjZWRcbiAgICovXG4gIHJlcGxhY2UocGF0aCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoID09PSBwYXRoKSByZXR1cm47XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICB0cmlnZ2VyID0gJ3JlcGxhY2VkLnpmLmludGVyY2hhbmdlJztcblxuICAgIC8vIFJlcGxhY2luZyBpbWFnZXNcbiAgICBpZiAodGhpcy4kZWxlbWVudFswXS5ub2RlTmFtZSA9PT0gJ0lNRycpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignc3JjJywgcGF0aCkub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuY3VycmVudFBhdGggPSBwYXRoO1xuICAgICAgfSlcbiAgICAgIC50cmlnZ2VyKHRyaWdnZXIpO1xuICAgIH1cbiAgICAvLyBSZXBsYWNpbmcgYmFja2dyb3VuZCBpbWFnZXNcbiAgICBlbHNlIGlmIChwYXRoLm1hdGNoKC9cXC4oZ2lmfGpwZ3xqcGVnfHBuZ3xzdmd8dGlmZikoWz8jXS4qKT8vaSkpIHtcbiAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcKC9nLCAnJTI4JykucmVwbGFjZSgvXFwpL2csICclMjknKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHsgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcrcGF0aCsnKScgfSlcbiAgICAgICAgICAudHJpZ2dlcih0cmlnZ2VyKTtcbiAgICB9XG4gICAgLy8gUmVwbGFjaW5nIEhUTUxcbiAgICBlbHNlIHtcbiAgICAgICQuZ2V0KHBhdGgsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIF90aGlzLiRlbGVtZW50Lmh0bWwocmVzcG9uc2UpXG4gICAgICAgICAgICAgLnRyaWdnZXIodHJpZ2dlcik7XG4gICAgICAgICQocmVzcG9uc2UpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgX3RoaXMuY3VycmVudFBhdGggPSBwYXRoO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiBjb250ZW50IGluIGFuIEludGVyY2hhbmdlIGVsZW1lbnQgaXMgZG9uZSBiZWluZyBsb2FkZWQuXG4gICAgICogQGV2ZW50IEludGVyY2hhbmdlI3JlcGxhY2VkXG4gICAgICovXG4gICAgLy8gdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdyZXBsYWNlZC56Zi5pbnRlcmNoYW5nZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIGludGVyY2hhbmdlLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdyZXNpemVtZS56Zi50cmlnZ2VyJylcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgc2V0dGluZ3MgZm9yIHBsdWdpblxuICovXG5JbnRlcmNoYW5nZS5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFJ1bGVzIHRvIGJlIGFwcGxpZWQgdG8gSW50ZXJjaGFuZ2UgZWxlbWVudHMuIFNldCB3aXRoIHRoZSBgZGF0YS1pbnRlcmNoYW5nZWAgYXJyYXkgbm90YXRpb24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9hcnJheX1cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgcnVsZXM6IG51bGxcbn07XG5cbkludGVyY2hhbmdlLlNQRUNJQUxfUVVFUklFUyA9IHtcbiAgJ2xhbmRzY2FwZSc6ICdzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKScsXG4gICdwb3J0cmFpdCc6ICdzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpJyxcbiAgJ3JldGluYSc6ICdvbmx5IHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMiksIG9ubHkgc2NyZWVuIGFuZCAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwgb25seSBzY3JlZW4gYW5kICgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyLzEpLCBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxOTJkcGkpLCBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAyZHBweCknXG59O1xuXG5leHBvcnQge0ludGVyY2hhbmdlfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uaW50ZXJjaGFuZ2UuanMiLCIndXNlIHN0cmljdCc7XG5cblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcbmltcG9ydCB7IFNtb290aFNjcm9sbCB9IGZyb20gJy4vZm91bmRhdGlvbi5zbW9vdGhTY3JvbGwnO1xuXG4vKipcbiAqIE1hZ2VsbGFuIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5tYWdlbGxhblxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24uc21vb3RoU2Nyb2xsXG4gKi9cblxuY2xhc3MgTWFnZWxsYW4gZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBNYWdlbGxhbi5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIE1hZ2VsbGFuXG4gICAqIEBmaXJlcyBNYWdlbGxhbiNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBhZGQgdGhlIHRyaWdnZXIgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zICA9ICQuZXh0ZW5kKHt9LCBNYWdlbGxhbi5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ01hZ2VsbGFuJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5jYWxjUG9pbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIE1hZ2VsbGFuIHBsdWdpbiBhbmQgY2FsbHMgZnVuY3Rpb25zIHRvIGdldCBlcXVhbGl6ZXIgZnVuY3Rpb25pbmcgb24gbG9hZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBpZCA9IHRoaXMuJGVsZW1lbnRbMF0uaWQgfHwgR2V0WW9EaWdpdHMoNiwgJ21hZ2VsbGFuJyk7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLiR0YXJnZXRzID0gJCgnW2RhdGEtbWFnZWxsYW4tdGFyZ2V0XScpO1xuICAgIHRoaXMuJGxpbmtzID0gdGhpcy4kZWxlbWVudC5maW5kKCdhJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICdkYXRhLXJlc2l6ZSc6IGlkLFxuICAgICAgJ2RhdGEtc2Nyb2xsJzogaWQsXG4gICAgICAnaWQnOiBpZFxuICAgIH0pO1xuICAgIHRoaXMuJGFjdGl2ZSA9ICQoKTtcbiAgICB0aGlzLnNjcm9sbFBvcyA9IHBhcnNlSW50KHdpbmRvdy5wYWdlWU9mZnNldCwgMTApO1xuXG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBhbiBhcnJheSBvZiBwaXhlbCB2YWx1ZXMgdGhhdCBhcmUgdGhlIGRlbWFyY2F0aW9uIGxpbmVzIGJldHdlZW4gbG9jYXRpb25zIG9uIHRoZSBwYWdlLlxuICAgKiBDYW4gYmUgaW52b2tlZCBpZiBuZXcgZWxlbWVudHMgYXJlIGFkZGVkIG9yIHRoZSBzaXplIG9mIGEgbG9jYXRpb24gY2hhbmdlcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBjYWxjUG9pbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxuICAgICAgICBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcbiAgICB0aGlzLndpbkhlaWdodCA9IE1hdGgucm91bmQoTWF0aC5tYXgod2luZG93LmlubmVySGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCkpO1xuICAgIHRoaXMuZG9jSGVpZ2h0ID0gTWF0aC5yb3VuZChNYXRoLm1heChib2R5LnNjcm9sbEhlaWdodCwgYm9keS5vZmZzZXRIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0LCBodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5vZmZzZXRIZWlnaHQpKTtcblxuICAgIHRoaXMuJHRhcmdldHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICR0YXIgPSAkKHRoaXMpLFxuICAgICAgICAgIHB0ID0gTWF0aC5yb3VuZCgkdGFyLm9mZnNldCgpLnRvcCAtIF90aGlzLm9wdGlvbnMudGhyZXNob2xkKTtcbiAgICAgICR0YXIudGFyZ2V0UG9pbnQgPSBwdDtcbiAgICAgIF90aGlzLnBvaW50cy5wdXNoKHB0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIE1hZ2VsbGFuLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICAkYm9keSA9ICQoJ2h0bWwsIGJvZHknKSxcbiAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICBkdXJhdGlvbjogX3RoaXMub3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgICBlYXNpbmc6ICAgX3RoaXMub3B0aW9ucy5hbmltYXRpb25FYXNpbmdcbiAgICAgICAgfTtcbiAgICAkKHdpbmRvdykub25lKCdsb2FkJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKF90aGlzLm9wdGlvbnMuZGVlcExpbmtpbmcpe1xuICAgICAgICBpZihsb2NhdGlvbi5oYXNoKXtcbiAgICAgICAgICBfdGhpcy5zY3JvbGxUb0xvYyhsb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgX3RoaXMuY2FsY1BvaW50cygpO1xuICAgICAgX3RoaXMuX3VwZGF0ZUFjdGl2ZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kZWxlbWVudC5vbih7XG4gICAgICAncmVzaXplbWUuemYudHJpZ2dlcic6IHRoaXMucmVmbG93LmJpbmQodGhpcyksXG4gICAgICAnc2Nyb2xsbWUuemYudHJpZ2dlcic6IHRoaXMuX3VwZGF0ZUFjdGl2ZS5iaW5kKHRoaXMpXG4gICAgfSkub24oJ2NsaWNrLnpmLm1hZ2VsbGFuJywgJ2FbaHJlZl49XCIjXCJdJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBhcnJpdmFsICAgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICBfdGhpcy5zY3JvbGxUb0xvYyhhcnJpdmFsKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fZGVlcExpbmtTY3JvbGwgPSBmdW5jdGlvbihlKSB7XG4gICAgICBpZihfdGhpcy5vcHRpb25zLmRlZXBMaW5raW5nKSB7XG4gICAgICAgIF90aGlzLnNjcm9sbFRvTG9jKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJCh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRoaXMuX2RlZXBMaW5rU2Nyb2xsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBzY3JvbGwgdG8gYSBnaXZlbiBsb2NhdGlvbiBvbiB0aGUgcGFnZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGxvYyAtIGEgcHJvcGVybHkgZm9ybWF0dGVkIGpRdWVyeSBpZCBzZWxlY3Rvci4gRXhhbXBsZTogJyNmb28nXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgc2Nyb2xsVG9Mb2MobG9jKSB7XG4gICAgdGhpcy5faW5UcmFuc2l0aW9uID0gdHJ1ZTtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBhbmltYXRpb25FYXNpbmc6IHRoaXMub3B0aW9ucy5hbmltYXRpb25FYXNpbmcsXG4gICAgICBhbmltYXRpb25EdXJhdGlvbjogdGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgdGhyZXNob2xkOiB0aGlzLm9wdGlvbnMudGhyZXNob2xkLFxuICAgICAgb2Zmc2V0OiB0aGlzLm9wdGlvbnMub2Zmc2V0XG4gICAgfTtcblxuICAgIFNtb290aFNjcm9sbC5zY3JvbGxUb0xvYyhsb2MsIG9wdGlvbnMsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuX2luVHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgICAgX3RoaXMuX3VwZGF0ZUFjdGl2ZSgpO1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyB0byB1cGRhdGUgTWFnZWxsYW4gdXBvbiBET00gY2hhbmdlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgcmVmbG93KCkge1xuICAgIHRoaXMuY2FsY1BvaW50cygpO1xuICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpc2liaWxpdHkgb2YgYW4gYWN0aXZlIGxvY2F0aW9uIGxpbmssIGFuZCB1cGRhdGVzIHRoZSB1cmwgaGFzaCBmb3IgdGhlIHBhZ2UsIGlmIGRlZXBMaW5raW5nIGVuYWJsZWQuXG4gICAqIEBwcml2YXRlXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgTWFnZWxsYW4jdXBkYXRlXG4gICAqL1xuICBfdXBkYXRlQWN0aXZlKC8qZXZ0LCBlbGVtLCBzY3JvbGxQb3MqLykge1xuICAgIGlmKHRoaXMuX2luVHJhbnNpdGlvbikge3JldHVybjt9XG4gICAgdmFyIHdpblBvcyA9IC8qc2Nyb2xsUG9zIHx8Ki8gcGFyc2VJbnQod2luZG93LnBhZ2VZT2Zmc2V0LCAxMCksXG4gICAgICAgIGN1cklkeDtcblxuICAgIGlmKHdpblBvcyArIHRoaXMud2luSGVpZ2h0ID09PSB0aGlzLmRvY0hlaWdodCl7IGN1cklkeCA9IHRoaXMucG9pbnRzLmxlbmd0aCAtIDE7IH1cbiAgICBlbHNlIGlmKHdpblBvcyA8IHRoaXMucG9pbnRzWzBdKXsgY3VySWR4ID0gdW5kZWZpbmVkOyB9XG4gICAgZWxzZXtcbiAgICAgIHZhciBpc0Rvd24gPSB0aGlzLnNjcm9sbFBvcyA8IHdpblBvcyxcbiAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgY3VyVmlzaWJsZSA9IHRoaXMucG9pbnRzLmZpbHRlcihmdW5jdGlvbihwLCBpKXtcbiAgICAgICAgICAgIHJldHVybiBpc0Rvd24gPyBwIC0gX3RoaXMub3B0aW9ucy5vZmZzZXQgPD0gd2luUG9zIDogcCAtIF90aGlzLm9wdGlvbnMub2Zmc2V0IC0gX3RoaXMub3B0aW9ucy50aHJlc2hvbGQgPD0gd2luUG9zO1xuICAgICAgICAgIH0pO1xuICAgICAgY3VySWR4ID0gY3VyVmlzaWJsZS5sZW5ndGggPyBjdXJWaXNpYmxlLmxlbmd0aCAtIDEgOiAwO1xuICAgIH1cblxuICAgIHRoaXMuJGFjdGl2ZS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xuICAgIHRoaXMuJGFjdGl2ZSA9IHRoaXMuJGxpbmtzLmZpbHRlcignW2hyZWY9XCIjJyArIHRoaXMuJHRhcmdldHMuZXEoY3VySWR4KS5kYXRhKCdtYWdlbGxhbi10YXJnZXQnKSArICdcIl0nKS5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmRlZXBMaW5raW5nKXtcbiAgICAgIHZhciBoYXNoID0gXCJcIjtcbiAgICAgIGlmKGN1cklkeCAhPSB1bmRlZmluZWQpe1xuICAgICAgICBoYXNoID0gdGhpcy4kYWN0aXZlWzBdLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgfVxuICAgICAgaWYoaGFzaCAhPT0gd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgaWYod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKXtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgaGFzaCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsUG9zID0gd2luUG9zO1xuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gbWFnZWxsYW4gaXMgZmluaXNoZWQgdXBkYXRpbmcgdG8gdGhlIG5ldyBhY3RpdmUgZWxlbWVudC5cbiAgICAgKiBAZXZlbnQgTWFnZWxsYW4jdXBkYXRlXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCd1cGRhdGUuemYubWFnZWxsYW4nLCBbdGhpcy4kYWN0aXZlXSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgTWFnZWxsYW4gYW5kIHJlc2V0cyB0aGUgdXJsIG9mIHRoZSB3aW5kb3cuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyIC56Zi5tYWdlbGxhbicpXG4gICAgICAgIC5maW5kKGAuJHt0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3N9YCkucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5kZWVwTGlua2luZyl7XG4gICAgICB2YXIgaGFzaCA9IHRoaXMuJGFjdGl2ZVswXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoaGFzaCwgJycpO1xuICAgIH1cbiAgICAkKHdpbmRvdykub2ZmKCdwb3BzdGF0ZScsIHRoaXMuX2RlZXBMaW5rU2Nyb2xsKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgc2V0dGluZ3MgZm9yIHBsdWdpblxuICovXG5NYWdlbGxhbi5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lLCBpbiBtcywgdGhlIGFuaW1hdGVkIHNjcm9sbGluZyBzaG91bGQgdGFrZSBiZXR3ZWVuIGxvY2F0aW9ucy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MDBcbiAgICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA1MDAsXG4gIC8qKlxuICAgKiBBbmltYXRpb24gc3R5bGUgdG8gdXNlIHdoZW4gc2Nyb2xsaW5nIGJldHdlZW4gbG9jYXRpb25zLiBDYW4gYmUgYCdzd2luZydgIG9yIGAnbGluZWFyJ2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2xpbmVhcidcbiAgICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9hcGkuanF1ZXJ5LmNvbS9hbmltYXRlfEpxdWVyeSBhbmltYXRlfVxuICAgKi9cbiAgYW5pbWF0aW9uRWFzaW5nOiAnbGluZWFyJyxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgdG8gdXNlIGFzIGEgbWFya2VyIGZvciBsb2NhdGlvbiBjaGFuZ2VzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwXG4gICAqL1xuICB0aHJlc2hvbGQ6IDUwLFxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byB0aGUgYWN0aXZlIGxvY2F0aW9ucyBsaW5rIG9uIHRoZSBtYWdlbGxhbiBjb250YWluZXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2lzLWFjdGl2ZSdcbiAgICovXG4gIGFjdGl2ZUNsYXNzOiAnaXMtYWN0aXZlJyxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgc2NyaXB0IHRvIG1hbmlwdWxhdGUgdGhlIHVybCBvZiB0aGUgY3VycmVudCBwYWdlLCBhbmQgaWYgc3VwcG9ydGVkLCBhbHRlciB0aGUgaGlzdG9yeS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5raW5nOiBmYWxzZSxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgdG8gb2Zmc2V0IHRoZSBzY3JvbGwgb2YgdGhlIHBhZ2Ugb24gaXRlbSBjbGljayBpZiB1c2luZyBhIHN0aWNreSBuYXYgYmFyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIG9mZnNldDogMFxufVxuXG5leHBvcnQge01hZ2VsbGFufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ubWFnZWxsYW4uanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IHRyYW5zaXRpb25lbmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuXG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcblxuLyoqXG4gKiBPZmZDYW52YXMgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLm9mZmNhbnZhc1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKi9cblxuY2xhc3MgT2ZmQ2FudmFzIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gb2ZmLWNhbnZhcyB3cmFwcGVyLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgT2ZmQ2FudmFzXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjaW5pdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gaW5pdGlhbGl6ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdPZmZDYW52YXMnOyAvLyBpZTkgYmFjayBjb21wYXRcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgT2ZmQ2FudmFzLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jb250ZW50Q2xhc3NlcyA9IHsgYmFzZTogW10sIHJldmVhbDogW10gfTtcbiAgICB0aGlzLiRsYXN0VHJpZ2dlciA9ICQoKTtcbiAgICB0aGlzLiR0cmlnZ2VycyA9ICQoKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gJ2xlZnQnO1xuICAgIHRoaXMuJGNvbnRlbnQgPSAkKCk7XG4gICAgdGhpcy5uZXN0ZWQgPSAhISh0aGlzLm9wdGlvbnMubmVzdGVkKTtcblxuICAgIC8vIERlZmluZXMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAgJChbJ3B1c2gnLCAnb3ZlcmxhcCddKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc2VzLmJhc2UucHVzaCgnaGFzLXRyYW5zaXRpb24tJyt2YWwpO1xuICAgIH0pO1xuICAgICQoWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSkuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLnB1c2goJ2hhcy1wb3NpdGlvbi0nK3ZhbCk7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc2VzLnJldmVhbC5wdXNoKCdoYXMtcmV2ZWFsLScrdmFsKTtcbiAgICB9KTtcblxuICAgIC8vIFRyaWdnZXJzIGluaXQgaXMgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBpcyBpbml0aWFsaXplZFxuICAgIFRyaWdnZXJzLmluaXQoJCk7XG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ09mZkNhbnZhcycsIHtcbiAgICAgICdFU0NBUEUnOiAnY2xvc2UnXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgb2ZmLWNhbnZhcyB3cmFwcGVyIGJ5IGFkZGluZyB0aGUgZXhpdCBvdmVybGF5IChpZiBuZWVkZWQpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBpZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgLy8gRmluZCBvZmYtY2FudmFzIGNvbnRlbnQsIGVpdGhlciBieSBJRCAoaWYgc3BlY2lmaWVkKSwgYnkgc2libGluZ3Mgb3IgYnkgY2xvc2VzdCBzZWxlY3RvciAoZmFsbGJhY2spXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50SWQpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSAkKCcjJyt0aGlzLm9wdGlvbnMuY29udGVudElkKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuZmlyc3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kY29udGVudCA9IHRoaXMuJGVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmZpcnN0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY29udGVudElkKSB7XG4gICAgICAvLyBBc3N1bWUgdGhhdCB0aGUgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIG5lc3RlZCBpZiBpdCBpc24ndCBhIHNpYmxpbmcgb2YgdGhlIGNvbnRlbnRcbiAgICAgIHRoaXMubmVzdGVkID0gdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmxlbmd0aCA9PT0gMDtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRJZCAmJiB0aGlzLm9wdGlvbnMubmVzdGVkID09PSBudWxsKSB7XG4gICAgICAvLyBXYXJuaW5nIGlmIHVzaW5nIGNvbnRlbnQgSUQgd2l0aG91dCBzZXR0aW5nIHRoZSBuZXN0ZWQgb3B0aW9uXG4gICAgICAvLyBPbmNlIHRoZSBlbGVtZW50IGlzIG5lc3RlZCBpdCBpcyByZXF1aXJlZCB0byB3b3JrIHByb3Blcmx5IGluIHRoaXMgY2FzZVxuICAgICAgY29uc29sZS53YXJuKCdSZW1lbWJlciB0byB1c2UgdGhlIG5lc3RlZCBvcHRpb24gaWYgdXNpbmcgdGhlIGNvbnRlbnQgSUQgb3B0aW9uIScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5lc3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gRm9yY2UgdHJhbnNpdGlvbiBvdmVybGFwIGlmIG5lc3RlZFxuICAgICAgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24gPSAnb3ZlcmxhcCc7XG4gICAgICAvLyBSZW1vdmUgYXBwcm9wcmlhdGUgY2xhc3NlcyBpZiBhbHJlYWR5IGFzc2lnbmVkIGluIG1hcmt1cFxuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtdHJhbnNpdGlvbi1wdXNoJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhgaXMtdHJhbnNpdGlvbi0ke3RoaXMub3B0aW9ucy50cmFuc2l0aW9ufSBpcy1jbG9zZWRgKTtcblxuICAgIC8vIEZpbmQgdHJpZ2dlcnMgdGhhdCBhZmZlY3QgdGhpcyBlbGVtZW50IGFuZCBhZGQgYXJpYS1leHBhbmRlZCB0byB0aGVtXG4gICAgdGhpcy4kdHJpZ2dlcnMgPSAkKGRvY3VtZW50KVxuICAgICAgLmZpbmQoJ1tkYXRhLW9wZW49XCInK2lkKydcIl0sIFtkYXRhLWNsb3NlPVwiJytpZCsnXCJdLCBbZGF0YS10b2dnbGU9XCInK2lkKydcIl0nKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgICAgLmF0dHIoJ2FyaWEtY29udHJvbHMnLCBpZCk7XG5cbiAgICAvLyBHZXQgcG9zaXRpb24gYnkgY2hlY2tpbmcgZm9yIHJlbGF0ZWQgQ1NTIGNsYXNzXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuJGVsZW1lbnQuaXMoJy5wb3NpdGlvbi1sZWZ0LCAucG9zaXRpb24tdG9wLCAucG9zaXRpb24tcmlnaHQsIC5wb3NpdGlvbi1ib3R0b20nKSA/IHRoaXMuJGVsZW1lbnQuYXR0cignY2xhc3MnKS5tYXRjaCgvcG9zaXRpb25cXC0obGVmdHx0b3B8cmlnaHR8Ym90dG9tKS8pWzFdIDogdGhpcy5wb3NpdGlvbjtcblxuICAgIC8vIEFkZCBhbiBvdmVybGF5IG92ZXIgdGhlIGNvbnRlbnQgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHZhciBvdmVybGF5UG9zaXRpb24gPSAkKHRoaXMuJGVsZW1lbnQpLmNzcyhcInBvc2l0aW9uXCIpID09PSAnZml4ZWQnID8gJ2lzLW92ZXJsYXktZml4ZWQnIDogJ2lzLW92ZXJsYXktYWJzb2x1dGUnO1xuICAgICAgb3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2pzLW9mZi1jYW52YXMtb3ZlcmxheSAnICsgb3ZlcmxheVBvc2l0aW9uKTtcbiAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKG92ZXJsYXkpO1xuICAgICAgaWYob3ZlcmxheVBvc2l0aW9uID09PSAnaXMtb3ZlcmxheS1maXhlZCcpIHtcbiAgICAgICAgJCh0aGlzLiRvdmVybGF5KS5pbnNlcnRBZnRlcih0aGlzLiRlbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGNvbnRlbnQuYXBwZW5kKHRoaXMuJG92ZXJsYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5pc1JldmVhbGVkID0gdGhpcy5vcHRpb25zLmlzUmV2ZWFsZWQgfHwgbmV3IFJlZ0V4cCh0aGlzLm9wdGlvbnMucmV2ZWFsQ2xhc3MsICdnJykudGVzdCh0aGlzLiRlbGVtZW50WzBdLmNsYXNzTmFtZSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmlzUmV2ZWFsZWQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXZlYWxPbiA9IHRoaXMub3B0aW9ucy5yZXZlYWxPbiB8fCB0aGlzLiRlbGVtZW50WzBdLmNsYXNzTmFtZS5tYXRjaCgvKHJldmVhbC1mb3ItbWVkaXVtfHJldmVhbC1mb3ItbGFyZ2UpL2cpWzBdLnNwbGl0KCctJylbMl07XG4gICAgICB0aGlzLl9zZXRNUUNoZWNrZXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGFsbHkgcmVtb3ZlIGFsbCB0cmFuc2l0aW9uL3Bvc2l0aW9uIENTUyBjbGFzc2VzIGZyb20gb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lci5cbiAgICB0aGlzLl9yZW1vdmVDb250ZW50Q2xhc3NlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIG9mZi1jYW52YXMgd3JhcHBlciBhbmQgdGhlIGV4aXQgb3ZlcmxheS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYudHJpZ2dlciAuemYub2ZmY2FudmFzJykub24oe1xuICAgICAgJ29wZW4uemYudHJpZ2dlcic6IHRoaXMub3Blbi5iaW5kKHRoaXMpLFxuICAgICAgJ2Nsb3NlLnpmLnRyaWdnZXInOiB0aGlzLmNsb3NlLmJpbmQodGhpcyksXG4gICAgICAndG9nZ2xlLnpmLnRyaWdnZXInOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpLFxuICAgICAgJ2tleWRvd24uemYub2ZmY2FudmFzJzogdGhpcy5faGFuZGxlS2V5Ym9hcmQuYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgPT09IHRydWUpIHtcbiAgICAgIHZhciAkdGFyZ2V0ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID8gdGhpcy4kb3ZlcmxheSA6IHRoaXMuJGNvbnRlbnQ7XG4gICAgICAkdGFyZ2V0Lm9uKHsnY2xpY2suemYub2ZmY2FudmFzJzogdGhpcy5jbG9zZS5iaW5kKHRoaXMpfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgZXZlbnQgbGlzdGVuZXIgZm9yIGVsZW1lbnRzIHRoYXQgd2lsbCByZXZlYWwgYXQgY2VydGFpbiBicmVha3BvaW50cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRNUUNoZWNrZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICQod2luZG93KS5vbignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoTWVkaWFRdWVyeS5hdExlYXN0KF90aGlzLm9wdGlvbnMucmV2ZWFsT24pKSB7XG4gICAgICAgIF90aGlzLnJldmVhbCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLnJldmVhbChmYWxzZSk7XG4gICAgICB9XG4gICAgfSkub25lKCdsb2FkLnpmLm9mZmNhbnZhcycsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKE1lZGlhUXVlcnkuYXRMZWFzdChfdGhpcy5vcHRpb25zLnJldmVhbE9uKSkge1xuICAgICAgICBfdGhpcy5yZXZlYWwodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgQ1NTIHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3NlcyBvZiB0aGUgb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lci5cbiAgICogUmVtb3ZpbmcgdGhlIGNsYXNzZXMgaXMgaW1wb3J0YW50IHdoZW4gYW5vdGhlciBvZmYtY2FudmFzIGdldHMgb3BlbmVkIHRoYXQgdXNlcyB0aGUgc2FtZSBjb250ZW50IGNvbnRhaW5lci5cbiAgICogQHBhcmFtIHtCb29sZWFufSBoYXNSZXZlYWwgLSB0cnVlIGlmIHJlbGF0ZWQgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIHJldmVhbGVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbW92ZUNvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCkge1xuICAgIGlmICh0eXBlb2YgaGFzUmV2ZWFsICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQ2xhc3ModGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLmpvaW4oJyAnKSk7XG4gICAgfSBlbHNlIGlmIChoYXNSZXZlYWwgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKGBoYXMtcmV2ZWFsLSR7dGhpcy5wb3NpdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgQ1NTIHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3NlcyBvZiB0aGUgb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lciwgYmFzZWQgb24gdGhlIG9wZW5pbmcgb2ZmLWNhbnZhcyBlbGVtZW50LlxuICAgKiBCZWZvcmVoYW5kIGFueSB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzIGdldHMgcmVtb3ZlZC5cbiAgICogQHBhcmFtIHtCb29sZWFufSBoYXNSZXZlYWwgLSB0cnVlIGlmIHJlbGF0ZWQgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIHJldmVhbGVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZENvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCkge1xuICAgIHRoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCk7XG4gICAgaWYgKHR5cGVvZiBoYXNSZXZlYWwgIT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy4kY29udGVudC5hZGRDbGFzcyhgaGFzLXRyYW5zaXRpb24tJHt0aGlzLm9wdGlvbnMudHJhbnNpdGlvbn0gaGFzLXBvc2l0aW9uLSR7dGhpcy5wb3NpdGlvbn1gKTtcbiAgICB9IGVsc2UgaWYgKGhhc1JldmVhbCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kY29udGVudC5hZGRDbGFzcyhgaGFzLXJldmVhbC0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHJldmVhbGluZy9oaWRpbmcgdGhlIG9mZi1jYW52YXMgYXQgYnJlYWtwb2ludHMsIG5vdCB0aGUgc2FtZSBhcyBvcGVuLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzUmV2ZWFsZWQgLSB0cnVlIGlmIGVsZW1lbnQgc2hvdWxkIGJlIHJldmVhbGVkLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHJldmVhbChpc1JldmVhbGVkKSB7XG4gICAgaWYgKGlzUmV2ZWFsZWQpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMuaXNSZXZlYWxlZCA9IHRydWU7XG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZignb3Blbi56Zi50cmlnZ2VyIHRvZ2dsZS56Zi50cmlnZ2VyJyk7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1JldmVhbGVkID0gZmFsc2U7XG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdvcGVuLnpmLnRyaWdnZXIgdG9nZ2xlLnpmLnRyaWdnZXInKS5vbih7XG4gICAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKVxuICAgICAgfSk7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICB9XG4gICAgdGhpcy5fYWRkQ29udGVudENsYXNzZXMoaXNSZXZlYWxlZCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgc2Nyb2xsaW5nIG9mIHRoZSBib2R5IHdoZW4gb2ZmY2FudmFzIGlzIG9wZW4gb24gbW9iaWxlIFNhZmFyaSBhbmQgb3RoZXIgdHJvdWJsZXNvbWUgYnJvd3NlcnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3RvcFNjcm9sbGluZyhldmVudCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRha2VuIGFuZCBhZGFwdGVkIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjg4OTQ0Ny9wcmV2ZW50LWZ1bGwtcGFnZS1zY3JvbGxpbmctaW9zXG4gIC8vIE9ubHkgcmVhbGx5IHdvcmtzIGZvciB5LCBub3Qgc3VyZSBob3cgdG8gZXh0ZW5kIHRvIHggb3IgaWYgd2UgbmVlZCB0by5cbiAgX3JlY29yZFNjcm9sbGFibGUoZXZlbnQpIHtcbiAgICBsZXQgZWxlbSA9IHRoaXM7IC8vIGNhbGxlZCBmcm9tIGV2ZW50IGhhbmRsZXIgY29udGV4dCB3aXRoIHRoaXMgYXMgZWxlbVxuXG4gICAgIC8vIElmIHRoZSBlbGVtZW50IGlzIHNjcm9sbGFibGUgKGNvbnRlbnQgb3ZlcmZsb3dzKSwgdGhlbi4uLlxuICAgIGlmIChlbGVtLnNjcm9sbEhlaWdodCAhPT0gZWxlbS5jbGllbnRIZWlnaHQpIHtcbiAgICAgIC8vIElmIHdlJ3JlIGF0IHRoZSB0b3AsIHNjcm9sbCBkb3duIG9uZSBwaXhlbCB0byBhbGxvdyBzY3JvbGxpbmcgdXBcbiAgICAgIGlmIChlbGVtLnNjcm9sbFRvcCA9PT0gMCkge1xuICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IDE7XG4gICAgICB9XG4gICAgICAvLyBJZiB3ZSdyZSBhdCB0aGUgYm90dG9tLCBzY3JvbGwgdXAgb25lIHBpeGVsIHRvIGFsbG93IHNjcm9sbGluZyBkb3duXG4gICAgICBpZiAoZWxlbS5zY3JvbGxUb3AgPT09IGVsZW0uc2Nyb2xsSGVpZ2h0IC0gZWxlbS5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgZWxlbS5zY3JvbGxUb3AgPSBlbGVtLnNjcm9sbEhlaWdodCAtIGVsZW0uY2xpZW50SGVpZ2h0IC0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbS5hbGxvd1VwID0gZWxlbS5zY3JvbGxUb3AgPiAwO1xuICAgIGVsZW0uYWxsb3dEb3duID0gZWxlbS5zY3JvbGxUb3AgPCAoZWxlbS5zY3JvbGxIZWlnaHQgLSBlbGVtLmNsaWVudEhlaWdodCk7XG4gICAgZWxlbS5sYXN0WSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVk7XG4gIH1cblxuICBfc3RvcFNjcm9sbFByb3BhZ2F0aW9uKGV2ZW50KSB7XG4gICAgbGV0IGVsZW0gPSB0aGlzOyAvLyBjYWxsZWQgZnJvbSBldmVudCBoYW5kbGVyIGNvbnRleHQgd2l0aCB0aGlzIGFzIGVsZW1cbiAgICBsZXQgdXAgPSBldmVudC5wYWdlWSA8IGVsZW0ubGFzdFk7XG4gICAgbGV0IGRvd24gPSAhdXA7XG4gICAgZWxlbS5sYXN0WSA9IGV2ZW50LnBhZ2VZO1xuXG4gICAgaWYoKHVwICYmIGVsZW0uYWxsb3dVcCkgfHwgKGRvd24gJiYgZWxlbS5hbGxvd0Rvd24pKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIG9mZi1jYW52YXMgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBsaXN0ZW5lci5cbiAgICogQHBhcmFtIHtqUXVlcnl9IHRyaWdnZXIgLSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBvZmYtY2FudmFzIHRvIG9wZW4uXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjb3BlbmVkXG4gICAqL1xuICBvcGVuKGV2ZW50LCB0cmlnZ2VyKSB7XG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSB8fCB0aGlzLmlzUmV2ZWFsZWQpIHsgcmV0dXJuOyB9XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICB0aGlzLiRsYXN0VHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mb3JjZVRvID09PSAndG9wJykge1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmZvcmNlVG8gPT09ICdib3R0b20nKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCxkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSAmJiB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiAhPT0gJ292ZXJsYXAnKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBvZmYtY2FudmFzIG1lbnUgb3BlbnMuXG4gICAgICogQGV2ZW50IE9mZkNhbnZhcyNvcGVuZWRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1vcGVuJykucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuXG4gICAgdGhpcy4kdHJpZ2dlcnMuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgIC50cmlnZ2VyKCdvcGVuZWQuemYub2ZmY2FudmFzJyk7XG5cbiAgICB0aGlzLiRjb250ZW50LmFkZENsYXNzKCdpcy1vcGVuLScgKyB0aGlzLnBvc2l0aW9uKTtcblxuICAgIC8vIElmIGBjb250ZW50U2Nyb2xsYCBpcyBzZXQgdG8gZmFsc2UsIGFkZCBjbGFzcyBhbmQgZGlzYWJsZSBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcy5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRTY3JvbGwgPT09IGZhbHNlKSB7XG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lzLW9mZi1jYW52YXMtb3BlbicpLm9uKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsaW5nKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3RvdWNoc3RhcnQnLCB0aGlzLl9yZWNvcmRTY3JvbGxhYmxlKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxQcm9wYWdhdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlICYmIHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnaXMtY2xvc2FibGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Gb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZCh0aGlzLiRlbGVtZW50KSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgIHJldHVybjsgLy8gZXhpdCBpZiBwcmVtYXR1cmVseSBjbG9zZWRcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FudmFzRm9jdXMgPSBfdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1hdXRvZm9jdXNdJyk7XG4gICAgICAgIGlmIChjYW52YXNGb2N1cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhbnZhc0ZvY3VzLmVxKDApLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy4kZWxlbWVudC5maW5kKCdhLCBidXR0b24nKS5lcSgwKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYXBGb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kY29udGVudC5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgS2V5Ym9hcmQudHJhcEZvY3VzKHRoaXMuJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuX2FkZENvbnRlbnRDbGFzc2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBvZmYtY2FudmFzIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIG9wdGlvbmFsIGNiIHRvIGZpcmUgYWZ0ZXIgY2xvc3VyZS5cbiAgICogQGZpcmVzIE9mZkNhbnZhcyNjbG9zZWRcbiAgICovXG4gIGNsb3NlKGNiKSB7XG4gICAgaWYgKCF0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykgfHwgdGhpcy5pc1JldmVhbGVkKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG9mZi1jYW52YXMgbWVudSBvcGVucy5cbiAgICAgICAqIEBldmVudCBPZmZDYW52YXMjY2xvc2VkXG4gICAgICAgKi9cbiAgICAgICAgLnRyaWdnZXIoJ2Nsb3NlZC56Zi5vZmZjYW52YXMnKTtcblxuICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4tbGVmdCBpcy1vcGVuLXRvcCBpcy1vcGVuLXJpZ2h0IGlzLW9wZW4tYm90dG9tJyk7XG5cbiAgICAvLyBJZiBgY29udGVudFNjcm9sbGAgaXMgc2V0IHRvIGZhbHNlLCByZW1vdmUgY2xhc3MgYW5kIHJlLWVuYWJsZSBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcy5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRTY3JvbGwgPT09IGZhbHNlKSB7XG4gICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLW9mZi1jYW52YXMtb3BlbicpLm9mZigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbGluZyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigndG91Y2hzdGFydCcsIHRoaXMuX3JlY29yZFNjcm9sbGFibGUpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxQcm9wYWdhdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlICYmIHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtY2xvc2FibGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLiR0cmlnZ2Vycy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYXBGb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kY29udGVudC5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgICAgS2V5Ym9hcmQucmVsZWFzZUZvY3VzKHRoaXMuJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIExpc3RlbiB0byB0cmFuc2l0aW9uRW5kIGFuZCBhZGQgY2xhc3Mgd2hlbiBkb25lLlxuICAgIHRoaXMuJGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQodGhpcy4kZWxlbWVudCksIGZ1bmN0aW9uKGUpIHtcbiAgICAgIF90aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICAgIF90aGlzLl9yZW1vdmVDb250ZW50Q2xhc3NlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIG9mZi1jYW52YXMgbWVudSBvcGVuIG9yIGNsb3NlZC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBsaXN0ZW5lci5cbiAgICogQHBhcmFtIHtqUXVlcnl9IHRyaWdnZXIgLSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBvZmYtY2FudmFzIHRvIG9wZW4uXG4gICAqL1xuICB0b2dnbGUoZXZlbnQsIHRyaWdnZXIpIHtcbiAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICB0aGlzLmNsb3NlKGV2ZW50LCB0cmlnZ2VyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oZXZlbnQsIHRyaWdnZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGtleWJvYXJkIGlucHV0IHdoZW4gZGV0ZWN0ZWQuIFdoZW4gdGhlIGVzY2FwZSBrZXkgaXMgcHJlc3NlZCwgdGhlIG9mZi1jYW52YXMgbWVudSBjbG9zZXMsIGFuZCBmb2N1cyBpcyByZXN0b3JlZCB0byB0aGUgZWxlbWVudCB0aGF0IG9wZW5lZCB0aGUgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaGFuZGxlS2V5Ym9hcmQoZSkge1xuICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnT2ZmQ2FudmFzJywge1xuICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLiRsYXN0VHJpZ2dlci5mb2N1cygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBoYW5kbGVkOiAoKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgb2ZmY2FudmFzIHBsdWdpbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyIC56Zi5vZmZjYW52YXMnKTtcbiAgICB0aGlzLiRvdmVybGF5Lm9mZignLnpmLm9mZmNhbnZhcycpO1xuICB9XG59XG5cbk9mZkNhbnZhcy5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFsbG93IHRoZSB1c2VyIHRvIGNsaWNrIG91dHNpZGUgb2YgdGhlIG1lbnUgdG8gY2xvc2UgaXQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25DbGljazogdHJ1ZSxcblxuICAvKipcbiAgICogQWRkcyBhbiBvdmVybGF5IG9uIHRvcCBvZiBgW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XWAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNvbnRlbnRPdmVybGF5OiB0cnVlLFxuXG4gIC8qKlxuICAgKiBUYXJnZXQgYW4gb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lciBieSBJRCB0aGF0IG1heSBiZSBwbGFjZWQgYW55d2hlcmUuIElmIG51bGwgdGhlIGNsb3Nlc3QgY29udGVudCBjb250YWluZXIgd2lsbCBiZSB0YWtlbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgY29udGVudElkOiBudWxsLFxuXG4gIC8qKlxuICAgKiBEZWZpbmUgdGhlIG9mZi1jYW52YXMgZWxlbWVudCBpcyBuZXN0ZWQgaW4gYW4gb2ZmLWNhbnZhcyBjb250ZW50LiBUaGlzIGlzIHJlcXVpcmVkIHdoZW4gdXNpbmcgdGhlIGNvbnRlbnRJZCBvcHRpb24gZm9yIGEgbmVzdGVkIGVsZW1lbnQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIG5lc3RlZDogbnVsbCxcblxuICAvKipcbiAgICogRW5hYmxlL2Rpc2FibGUgc2Nyb2xsaW5nIG9mIHRoZSBtYWluIGNvbnRlbnQgd2hlbiBhbiBvZmYgY2FudmFzIHBhbmVsIGlzIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNvbnRlbnRTY3JvbGw6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIGluIG1zIHRoZSBvcGVuIGFuZCBjbG9zZSB0cmFuc2l0aW9uIHJlcXVpcmVzLiBJZiBub25lIHNlbGVjdGVkLCBwdWxscyBmcm9tIGJvZHkgc3R5bGUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgdHJhbnNpdGlvblRpbWU6IG51bGwsXG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdHJhbnNpdGlvbiBmb3IgdGhlIG9mZmNhbnZhcyBtZW51LiBPcHRpb25zIGFyZSAncHVzaCcsICdkZXRhY2hlZCcgb3IgJ3NsaWRlJy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBwdXNoXG4gICAqL1xuICB0cmFuc2l0aW9uOiAncHVzaCcsXG5cbiAgLyoqXG4gICAqIEZvcmNlIHRoZSBwYWdlIHRvIHNjcm9sbCB0byB0b3Agb3IgYm90dG9tIG9uIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIGZvcmNlVG86IG51bGwsXG5cbiAgLyoqXG4gICAqIEFsbG93IHRoZSBvZmZjYW52YXMgdG8gcmVtYWluIG9wZW4gZm9yIGNlcnRhaW4gYnJlYWtwb2ludHMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBpc1JldmVhbGVkOiBmYWxzZSxcblxuICAvKipcbiAgICogQnJlYWtwb2ludCBhdCB3aGljaCB0byByZXZlYWwuIEpTIHdpbGwgdXNlIGEgUmVnRXhwIHRvIHRhcmdldCBzdGFuZGFyZCBjbGFzc2VzLCBpZiBjaGFuZ2luZyBjbGFzc25hbWVzLCBwYXNzIHlvdXIgY2xhc3Mgd2l0aCB0aGUgYHJldmVhbENsYXNzYCBvcHRpb24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIHJldmVhbE9uOiBudWxsLFxuXG4gIC8qKlxuICAgKiBGb3JjZSBmb2N1cyB0byB0aGUgb2ZmY2FudmFzIG9uIG9wZW4uIElmIHRydWUsIHdpbGwgZm9jdXMgdGhlIG9wZW5pbmcgdHJpZ2dlciBvbiBjbG9zZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgYXV0b0ZvY3VzOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBDbGFzcyB1c2VkIHRvIGZvcmNlIGFuIG9mZmNhbnZhcyB0byByZW1haW4gb3Blbi4gRm91bmRhdGlvbiBkZWZhdWx0cyBmb3IgdGhpcyBhcmUgYHJldmVhbC1mb3ItbGFyZ2VgICYgYHJldmVhbC1mb3ItbWVkaXVtYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCByZXZlYWwtZm9yLVxuICAgKiBAdG9kbyBpbXByb3ZlIHRoZSByZWdleCB0ZXN0aW5nIGZvciB0aGlzLlxuICAgKi9cbiAgcmV2ZWFsQ2xhc3M6ICdyZXZlYWwtZm9yLScsXG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIG9wdGlvbmFsIGZvY3VzIHRyYXBwaW5nIHdoZW4gb3BlbmluZyBhbiBvZmZjYW52YXMuIFNldHMgdGFiaW5kZXggb2YgW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XSB0byAtMSBmb3IgYWNjZXNzaWJpbGl0eSBwdXJwb3Nlcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHRyYXBGb2N1czogZmFsc2Vcbn1cblxuZXhwb3J0IHtPZmZDYW52YXN9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcblxuaW1wb3J0IHsgRHJvcGRvd25NZW51IH0gZnJvbSAnLi9mb3VuZGF0aW9uLmRyb3Bkb3duTWVudSc7XG5pbXBvcnQgeyBEcmlsbGRvd24gfSBmcm9tICcuL2ZvdW5kYXRpb24uZHJpbGxkb3duJztcbmltcG9ydCB7IEFjY29yZGlvbk1lbnUgfSBmcm9tICcuL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudSc7XG5cbmxldCBNZW51UGx1Z2lucyA9IHtcbiAgZHJvcGRvd246IHtcbiAgICBjc3NDbGFzczogJ2Ryb3Bkb3duJyxcbiAgICBwbHVnaW46IERyb3Bkb3duTWVudVxuICB9LFxuIGRyaWxsZG93bjoge1xuICAgIGNzc0NsYXNzOiAnZHJpbGxkb3duJyxcbiAgICBwbHVnaW46IERyaWxsZG93blxuICB9LFxuICBhY2NvcmRpb246IHtcbiAgICBjc3NDbGFzczogJ2FjY29yZGlvbi1tZW51JyxcbiAgICBwbHVnaW46IEFjY29yZGlvbk1lbnVcbiAgfVxufTtcblxuICAvLyBpbXBvcnQgXCJmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMuanNcIjtcblxuXG4vKipcbiAqIFJlc3BvbnNpdmVNZW51IG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5yZXNwb25zaXZlTWVudVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5XG4gKi9cblxuY2xhc3MgUmVzcG9uc2l2ZU1lbnUgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHJlc3BvbnNpdmUgbWVudS5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIFJlc3BvbnNpdmVNZW51XG4gICAqIEBmaXJlcyBSZXNwb25zaXZlTWVudSNpbml0XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYSBkcm9wZG93biBtZW51LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuICAgIHRoaXMucnVsZXMgPSB0aGlzLiRlbGVtZW50LmRhdGEoJ3Jlc3BvbnNpdmUtbWVudScpO1xuICAgIHRoaXMuY3VycmVudE1xID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRQbHVnaW4gPSBudWxsO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1Jlc3BvbnNpdmVNZW51JzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIE1lbnUgYnkgcGFyc2luZyB0aGUgY2xhc3NlcyBmcm9tIHRoZSAnZGF0YS1SZXNwb25zaXZlTWVudScgYXR0cmlidXRlIG9uIHRoZSBlbGVtZW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuXG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuICAgIC8vIFRoZSBmaXJzdCB0aW1lIGFuIEludGVyY2hhbmdlIHBsdWdpbiBpcyBpbml0aWFsaXplZCwgdGhpcy5ydWxlcyBpcyBjb252ZXJ0ZWQgZnJvbSBhIHN0cmluZyBvZiBcImNsYXNzZXNcIiB0byBhbiBvYmplY3Qgb2YgcnVsZXNcbiAgICBpZiAodHlwZW9mIHRoaXMucnVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgcnVsZXNUcmVlID0ge307XG5cbiAgICAgIC8vIFBhcnNlIHJ1bGVzIGZyb20gXCJjbGFzc2VzXCIgcHVsbGVkIGZyb20gZGF0YSBhdHRyaWJ1dGVcbiAgICAgIGxldCBydWxlcyA9IHRoaXMucnVsZXMuc3BsaXQoJyAnKTtcblxuICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGV2ZXJ5IHJ1bGUgZm91bmRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHJ1bGUgPSBydWxlc1tpXS5zcGxpdCgnLScpO1xuICAgICAgICBsZXQgcnVsZVNpemUgPSBydWxlLmxlbmd0aCA+IDEgPyBydWxlWzBdIDogJ3NtYWxsJztcbiAgICAgICAgbGV0IHJ1bGVQbHVnaW4gPSBydWxlLmxlbmd0aCA+IDEgPyBydWxlWzFdIDogcnVsZVswXTtcblxuICAgICAgICBpZiAoTWVudVBsdWdpbnNbcnVsZVBsdWdpbl0gIT09IG51bGwpIHtcbiAgICAgICAgICBydWxlc1RyZWVbcnVsZVNpemVdID0gTWVudVBsdWdpbnNbcnVsZVBsdWdpbl07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzVHJlZTtcbiAgICB9XG5cbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdCh0aGlzLnJ1bGVzKSkge1xuICAgICAgdGhpcy5fY2hlY2tNZWRpYVF1ZXJpZXMoKTtcbiAgICB9XG4gICAgLy8gQWRkIGRhdGEtbXV0YXRlIHNpbmNlIGNoaWxkcmVuIG1heSBuZWVkIGl0LlxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1tdXRhdGUnLCAodGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLW11dGF0ZScpIHx8IEdldFlvRGlnaXRzKDYsICdyZXNwb25zaXZlLW1lbnUnKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGV2ZW50cyBmb3IgdGhlIE1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLl9jaGVja01lZGlhUXVlcmllcygpO1xuICAgIH0pO1xuICAgIC8vICQod2luZG93KS5vbigncmVzaXplLnpmLlJlc3BvbnNpdmVNZW51JywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICBfdGhpcy5fY2hlY2tNZWRpYVF1ZXJpZXMoKTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGN1cnJlbnQgc2NyZWVuIHdpZHRoIGFnYWluc3QgYXZhaWxhYmxlIG1lZGlhIHF1ZXJpZXMuIElmIHRoZSBtZWRpYSBxdWVyeSBoYXMgY2hhbmdlZCwgYW5kIHRoZSBwbHVnaW4gbmVlZGVkIGhhcyBjaGFuZ2VkLCB0aGUgcGx1Z2lucyB3aWxsIHN3YXAgb3V0LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jaGVja01lZGlhUXVlcmllcygpIHtcbiAgICB2YXIgbWF0Y2hlZE1xLCBfdGhpcyA9IHRoaXM7XG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggcnVsZSBhbmQgZmluZCB0aGUgbGFzdCBtYXRjaGluZyBydWxlXG4gICAgJC5lYWNoKHRoaXMucnVsZXMsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKE1lZGlhUXVlcnkuYXRMZWFzdChrZXkpKSB7XG4gICAgICAgIG1hdGNoZWRNcSA9IGtleTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIE5vIG1hdGNoPyBObyBkaWNlXG4gICAgaWYgKCFtYXRjaGVkTXEpIHJldHVybjtcblxuICAgIC8vIFBsdWdpbiBhbHJlYWR5IGluaXRpYWxpemVkPyBXZSBnb29kXG4gICAgaWYgKHRoaXMuY3VycmVudFBsdWdpbiBpbnN0YW5jZW9mIHRoaXMucnVsZXNbbWF0Y2hlZE1xXS5wbHVnaW4pIHJldHVybjtcblxuICAgIC8vIFJlbW92ZSBleGlzdGluZyBwbHVnaW4tc3BlY2lmaWMgQ1NTIGNsYXNzZXNcbiAgICAkLmVhY2goTWVudVBsdWdpbnMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIF90aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlLmNzc0NsYXNzKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgQ1NTIGNsYXNzIGZvciB0aGUgbmV3IHBsdWdpblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5ydWxlc1ttYXRjaGVkTXFdLmNzc0NsYXNzKTtcblxuICAgIC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgbmV3IHBsdWdpblxuICAgIGlmICh0aGlzLmN1cnJlbnRQbHVnaW4pIHRoaXMuY3VycmVudFBsdWdpbi5kZXN0cm95KCk7XG4gICAgdGhpcy5jdXJyZW50UGx1Z2luID0gbmV3IHRoaXMucnVsZXNbbWF0Y2hlZE1xXS5wbHVnaW4odGhpcy4kZWxlbWVudCwge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBpbnN0YW5jZSBvZiB0aGUgY3VycmVudCBwbHVnaW4gb24gdGhpcyBlbGVtZW50LCBhcyB3ZWxsIGFzIHRoZSB3aW5kb3cgcmVzaXplIGhhbmRsZXIgdGhhdCBzd2l0Y2hlcyB0aGUgcGx1Z2lucyBvdXQuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy5jdXJyZW50UGx1Z2luLmRlc3Ryb3koKTtcbiAgICAkKHdpbmRvdykub2ZmKCcuemYuUmVzcG9uc2l2ZU1lbnUnKTtcbiAgfVxufVxuXG5SZXNwb25zaXZlTWVudS5kZWZhdWx0cyA9IHt9O1xuXG5leHBvcnQge1Jlc3BvbnNpdmVNZW51fTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucmVzcG9uc2l2ZU1lbnUuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE5lc3QgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5uZXN0JztcbmltcG9ydCB7IEdldFlvRGlnaXRzLCB0cmFuc2l0aW9uZW5kIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBCb3ggfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5ib3gnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5cbi8qKlxuICogRHJpbGxkb3duIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5kcmlsbGRvd25cbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubmVzdFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5ib3hcbiAqL1xuXG5jbGFzcyBEcmlsbGRvd24gZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIGRyaWxsZG93biBtZW51LlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgRHJpbGxkb3duXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYW4gYWNjb3JkaW9uIG1lbnUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIERyaWxsZG93bi5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0RyaWxsZG93bic7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ0RyaWxsZG93bicsIHtcbiAgICAgICdFTlRFUic6ICdvcGVuJyxcbiAgICAgICdTUEFDRSc6ICdvcGVuJyxcbiAgICAgICdBUlJPV19SSUdIVCc6ICduZXh0JyxcbiAgICAgICdBUlJPV19VUCc6ICd1cCcsXG4gICAgICAnQVJST1dfRE9XTic6ICdkb3duJyxcbiAgICAgICdBUlJPV19MRUZUJzogJ3ByZXZpb3VzJyxcbiAgICAgICdFU0NBUEUnOiAnY2xvc2UnLFxuICAgICAgJ1RBQic6ICdkb3duJyxcbiAgICAgICdTSElGVF9UQUInOiAndXAnXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGRyaWxsZG93biBieSBjcmVhdGluZyBqUXVlcnkgY29sbGVjdGlvbnMgb2YgZWxlbWVudHNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIE5lc3QuRmVhdGhlcih0aGlzLiRlbGVtZW50LCAnZHJpbGxkb3duJyk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuYXV0b0FwcGx5Q2xhc3MpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2RyaWxsZG93bicpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7XG4gICAgICAncm9sZSc6ICd0cmVlJyxcbiAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IGZhbHNlXG4gICAgfSk7XG4gICAgdGhpcy4kc3VibWVudUFuY2hvcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpLmlzLWRyaWxsZG93bi1zdWJtZW51LXBhcmVudCcpLmNoaWxkcmVuKCdhJyk7XG4gICAgdGhpcy4kc3VibWVudXMgPSB0aGlzLiRzdWJtZW51QW5jaG9ycy5wYXJlbnQoJ2xpJykuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykuYXR0cigncm9sZScsICdncm91cCcpO1xuICAgIHRoaXMuJG1lbnVJdGVtcyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnbGknKS5ub3QoJy5qcy1kcmlsbGRvd24tYmFjaycpLmF0dHIoJ3JvbGUnLCAndHJlZWl0ZW0nKS5maW5kKCdhJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLW11dGF0ZScsICh0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtZHJpbGxkb3duJykgfHwgR2V0WW9EaWdpdHMoNiwgJ2RyaWxsZG93bicpKSk7XG5cbiAgICB0aGlzLl9wcmVwYXJlTWVudSgpO1xuICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRzKCk7XG5cbiAgICB0aGlzLl9rZXlib2FyZEV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHByZXBhcmVzIGRyaWxsZG93biBtZW51IGJ5IHNldHRpbmcgYXR0cmlidXRlcyB0byBsaW5rcyBhbmQgZWxlbWVudHNcbiAgICogc2V0cyBhIG1pbiBoZWlnaHQgdG8gcHJldmVudCBjb250ZW50IGp1bXBpbmdcbiAgICogd3JhcHMgdGhlIGVsZW1lbnQgaWYgbm90IGFscmVhZHkgd3JhcHBlZFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9wcmVwYXJlTWVudSgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8vIGlmKCF0aGlzLm9wdGlvbnMuaG9sZE9wZW4pe1xuICAgIC8vICAgdGhpcy5fbWVudUxpbmtFdmVudHMoKTtcbiAgICAvLyB9XG4gICAgdGhpcy4kc3VibWVudUFuY2hvcnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICRsaW5rID0gJCh0aGlzKTtcbiAgICAgIHZhciAkc3ViID0gJGxpbmsucGFyZW50KCk7XG4gICAgICBpZihfdGhpcy5vcHRpb25zLnBhcmVudExpbmspe1xuICAgICAgICAkbGluay5jbG9uZSgpLnByZXBlbmRUbygkc3ViLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpKS53cmFwKCc8bGkgY2xhc3M9XCJpcy1zdWJtZW51LXBhcmVudC1pdGVtIGlzLXN1Ym1lbnUtaXRlbSBpcy1kcmlsbGRvd24tc3VibWVudS1pdGVtXCIgcm9sZT1cIm1lbnVpdGVtXCI+PC9saT4nKTtcbiAgICAgIH1cbiAgICAgICRsaW5rLmRhdGEoJ3NhdmVkSHJlZicsICRsaW5rLmF0dHIoJ2hyZWYnKSkucmVtb3ZlQXR0cignaHJlZicpLmF0dHIoJ3RhYmluZGV4JywgMCk7XG4gICAgICAkbGluay5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKVxuICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6IHRydWUsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAwLFxuICAgICAgICAgICAgJ3JvbGUnOiAnZ3JvdXAnXG4gICAgICAgICAgfSk7XG4gICAgICBfdGhpcy5fZXZlbnRzKCRsaW5rKTtcbiAgICB9KTtcbiAgICB0aGlzLiRzdWJtZW51cy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJG1lbnUgPSAkKHRoaXMpLFxuICAgICAgICAgICRiYWNrID0gJG1lbnUuZmluZCgnLmpzLWRyaWxsZG93bi1iYWNrJyk7XG4gICAgICBpZighJGJhY2subGVuZ3RoKXtcbiAgICAgICAgc3dpdGNoIChfdGhpcy5vcHRpb25zLmJhY2tCdXR0b25Qb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgICAgICRtZW51LmFwcGVuZChfdGhpcy5vcHRpb25zLmJhY2tCdXR0b24pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICAgICAgJG1lbnUucHJlcGVuZChfdGhpcy5vcHRpb25zLmJhY2tCdXR0b24pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbnN1cHBvcnRlZCBiYWNrQnV0dG9uUG9zaXRpb24gdmFsdWUgJ1wiICsgX3RoaXMub3B0aW9ucy5iYWNrQnV0dG9uUG9zaXRpb24gKyBcIidcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF90aGlzLl9iYWNrKCRtZW51KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJHN1Ym1lbnVzLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICBpZighdGhpcy5vcHRpb25zLmF1dG9IZWlnaHQpIHtcbiAgICAgIHRoaXMuJHN1Ym1lbnVzLmFkZENsYXNzKCdkcmlsbGRvd24tc3VibWVudS1jb3Zlci1wcmV2aW91cycpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIHdyYXBwZXIgb24gZWxlbWVudCBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgIGlmKCF0aGlzLiRlbGVtZW50LnBhcmVudCgpLmhhc0NsYXNzKCdpcy1kcmlsbGRvd24nKSl7XG4gICAgICB0aGlzLiR3cmFwcGVyID0gJCh0aGlzLm9wdGlvbnMud3JhcHBlcikuYWRkQ2xhc3MoJ2lzLWRyaWxsZG93bicpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmFuaW1hdGVIZWlnaHQpIHRoaXMuJHdyYXBwZXIuYWRkQ2xhc3MoJ2FuaW1hdGUtaGVpZ2h0Jyk7XG4gICAgICB0aGlzLiRlbGVtZW50LndyYXAodGhpcy4kd3JhcHBlcik7XG4gICAgfVxuICAgIC8vIHNldCB3cmFwcGVyXG4gICAgdGhpcy4kd3JhcHBlciA9IHRoaXMuJGVsZW1lbnQucGFyZW50KCk7XG4gICAgdGhpcy4kd3JhcHBlci5jc3ModGhpcy5fZ2V0TWF4RGltcygpKTtcbiAgfVxuXG4gIF9yZXNpemUoKSB7XG4gICAgdGhpcy4kd3JhcHBlci5jc3MoeydtYXgtd2lkdGgnOiAnbm9uZScsICdtaW4taGVpZ2h0JzogJ25vbmUnfSk7XG4gICAgLy8gX2dldE1heERpbXMgaGFzIHNpZGUgZWZmZWN0cyAoYm9vKSBidXQgY2FsbGluZyBpdCBzaG91bGQgdXBkYXRlIGFsbCBvdGhlciBuZWNlc3NhcnkgaGVpZ2h0cyAmIHdpZHRoc1xuICAgIHRoaXMuJHdyYXBwZXIuY3NzKHRoaXMuX2dldE1heERpbXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyB0byBlbGVtZW50cyBpbiB0aGUgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIHRoZSBjdXJyZW50IG1lbnUgaXRlbSB0byBhZGQgaGFuZGxlcnMgdG8uXG4gICAqL1xuICBfZXZlbnRzKCRlbGVtKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICRlbGVtLm9mZignY2xpY2suemYuZHJpbGxkb3duJylcbiAgICAub24oJ2NsaWNrLnpmLmRyaWxsZG93bicsIGZ1bmN0aW9uKGUpe1xuICAgICAgaWYoJChlLnRhcmdldCkucGFyZW50c1VudGlsKCd1bCcsICdsaScpLmhhc0NsYXNzKCdpcy1kcmlsbGRvd24tc3VibWVudS1wYXJlbnQnKSl7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldC5maXJzdEVsZW1lbnRDaGlsZCl7XG4gICAgICAvLyAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIH1cbiAgICAgIF90aGlzLl9zaG93KCRlbGVtLnBhcmVudCgnbGknKSk7XG5cbiAgICAgIGlmKF90aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKXtcbiAgICAgICAgdmFyICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICAkYm9keS5vZmYoJy56Zi5kcmlsbGRvd24nKS5vbignY2xpY2suemYuZHJpbGxkb3duJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBfdGhpcy4kZWxlbWVudFswXSB8fCAkLmNvbnRhaW5zKF90aGlzLiRlbGVtZW50WzBdLCBlLnRhcmdldCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIF90aGlzLl9oaWRlQWxsKCk7XG4gICAgICAgICAgJGJvZHkub2ZmKCcuemYuZHJpbGxkb3duJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIG1lbnUgZWxlbWVudC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgaWYodGhpcy5vcHRpb25zLnNjcm9sbFRvcCl7XG4gICAgICB0aGlzLl9iaW5kSGFuZGxlciA9IHRoaXMuX3Njcm9sbFRvcC5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbignb3Blbi56Zi5kcmlsbGRvd24gaGlkZS56Zi5kcmlsbGRvd24gY2xvc2VkLnpmLmRyaWxsZG93bicsdGhpcy5fYmluZEhhbmRsZXIpO1xuICAgIH1cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdtdXRhdGVtZS56Zi50cmlnZ2VyJywgdGhpcy5fcmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB0byBUb3Agb2YgRWxlbWVudCBvciBkYXRhLXNjcm9sbC10b3AtZWxlbWVudFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyaWxsZG93biNzY3JvbGxtZVxuICAgKi9cbiAgX3Njcm9sbFRvcCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciAkc2Nyb2xsVG9wRWxlbWVudCA9IF90aGlzLm9wdGlvbnMuc2Nyb2xsVG9wRWxlbWVudCE9Jyc/JChfdGhpcy5vcHRpb25zLnNjcm9sbFRvcEVsZW1lbnQpOl90aGlzLiRlbGVtZW50LFxuICAgICAgICBzY3JvbGxQb3MgPSBwYXJzZUludCgkc2Nyb2xsVG9wRWxlbWVudC5vZmZzZXQoKS50b3ArX3RoaXMub3B0aW9ucy5zY3JvbGxUb3BPZmZzZXQsIDEwKTtcbiAgICAkKCdodG1sLCBib2R5Jykuc3RvcCh0cnVlKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBzY3JvbGxQb3MgfSwgX3RoaXMub3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbiwgX3RoaXMub3B0aW9ucy5hbmltYXRpb25FYXNpbmcsZnVuY3Rpb24oKXtcbiAgICAgIC8qKlxuICAgICAgICAqIEZpcmVzIGFmdGVyIHRoZSBtZW51IGhhcyBzY3JvbGxlZFxuICAgICAgICAqIEBldmVudCBEcmlsbGRvd24jc2Nyb2xsbWVcbiAgICAgICAgKi9cbiAgICAgIGlmKHRoaXM9PT0kKCdodG1sJylbMF0pX3RoaXMuJGVsZW1lbnQudHJpZ2dlcignc2Nyb2xsbWUuemYuZHJpbGxkb3duJyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBrZXlkb3duIGV2ZW50IGxpc3RlbmVyIHRvIGBsaWAncyBpbiB0aGUgbWVudS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9rZXlib2FyZEV2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kbWVudUl0ZW1zLmFkZCh0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1kcmlsbGRvd24tYmFjayA+IGEsIC5pcy1zdWJtZW51LXBhcmVudC1pdGVtID4gYScpKS5vbigna2V5ZG93bi56Zi5kcmlsbGRvd24nLCBmdW5jdGlvbihlKXtcbiAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICAgJGVsZW1lbnRzID0gJGVsZW1lbnQucGFyZW50KCdsaScpLnBhcmVudCgndWwnKS5jaGlsZHJlbignbGknKS5jaGlsZHJlbignYScpLFxuICAgICAgICAgICRwcmV2RWxlbWVudCxcbiAgICAgICAgICAkbmV4dEVsZW1lbnQ7XG5cbiAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJGVsZW1lbnQpKSB7XG4gICAgICAgICAgJHByZXZFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWF4KDAsIGktMSkpO1xuICAgICAgICAgICRuZXh0RWxlbWVudCA9ICRlbGVtZW50cy5lcShNYXRoLm1pbihpKzEsICRlbGVtZW50cy5sZW5ndGgtMSkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnRHJpbGxkb3duJywge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJGVsZW1lbnQuaXMoX3RoaXMuJHN1Ym1lbnVBbmNob3JzKSkge1xuICAgICAgICAgICAgX3RoaXMuX3Nob3coJGVsZW1lbnQucGFyZW50KCdsaScpKTtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5vbmUodHJhbnNpdGlvbmVuZCgkZWxlbWVudCksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5maW5kKCd1bCBsaSBhJykuZmlsdGVyKF90aGlzLiRtZW51SXRlbXMpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW1lbnQucGFyZW50KCdsaScpLnBhcmVudCgndWwnKSk7XG4gICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLnBhcmVudCgndWwnKS5vbmUodHJhbnNpdGlvbmVuZCgkZWxlbWVudCksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLnBhcmVudCgnbGknKS5jaGlsZHJlbignYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICB1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHByZXZFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgLy8gRG9uJ3QgdGFwIGZvY3VzIG9uIGZpcnN0IGVsZW1lbnQgaW4gcm9vdCB1bFxuICAgICAgICAgIHJldHVybiAhJGVsZW1lbnQuaXMoX3RoaXMuJGVsZW1lbnQuZmluZCgnPiBsaTpmaXJzdC1jaGlsZCA+IGEnKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRvd246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIC8vIERvbid0IHRhcCBmb2N1cyBvbiBsYXN0IGVsZW1lbnQgaW4gcm9vdCB1bFxuICAgICAgICAgIHJldHVybiAhJGVsZW1lbnQuaXMoX3RoaXMuJGVsZW1lbnQuZmluZCgnPiBsaTpsYXN0LWNoaWxkID4gYScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIERvbid0IGNsb3NlIG9uIGVsZW1lbnQgaW4gcm9vdCB1bFxuICAgICAgICAgIGlmICghJGVsZW1lbnQuaXMoX3RoaXMuJGVsZW1lbnQuZmluZCgnPiBsaSA+IGEnKSkpIHtcbiAgICAgICAgICAgIF90aGlzLl9oaWRlKCRlbGVtZW50LnBhcmVudCgpLnBhcmVudCgpKTtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgpLnBhcmVudCgpLnNpYmxpbmdzKCdhJykuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghJGVsZW1lbnQuaXMoX3RoaXMuJG1lbnVJdGVtcykpIHsgLy8gbm90IG1lbnUgaXRlbSBtZWFucyBiYWNrIGJ1dHRvblxuICAgICAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW1lbnQucGFyZW50KCdsaScpLnBhcmVudCgndWwnKSk7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLm9uZSh0cmFuc2l0aW9uZW5kKCRlbGVtZW50KSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLnBhcmVudCgnbGknKS5jaGlsZHJlbignYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJGVsZW1lbnQuaXMoX3RoaXMuJHN1Ym1lbnVBbmNob3JzKSkge1xuICAgICAgICAgICAgX3RoaXMuX3Nob3coJGVsZW1lbnQucGFyZW50KCdsaScpKTtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5vbmUodHJhbnNpdGlvbmVuZCgkZWxlbWVudCksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5maW5kKCd1bCBsaSBhJykuZmlsdGVyKF90aGlzLiRtZW51SXRlbXMpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVkOiBmdW5jdGlvbihwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTsgLy8gZW5kIGtleWJvYXJkQWNjZXNzXG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFsbCBvcGVuIGVsZW1lbnRzLCBhbmQgcmV0dXJucyB0byByb290IG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI2Nsb3NlZFxuICAgKi9cbiAgX2hpZGVBbGwoKSB7XG4gICAgdmFyICRlbGVtID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXMtZHJpbGxkb3duLXN1Ym1lbnUuaXMtYWN0aXZlJykuYWRkQ2xhc3MoJ2lzLWNsb3NpbmcnKTtcbiAgICBpZih0aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkgdGhpcy4kd3JhcHBlci5jc3Moe2hlaWdodDokZWxlbS5wYXJlbnQoKS5jbG9zZXN0KCd1bCcpLmRhdGEoJ2NhbGNIZWlnaHQnKX0pO1xuICAgICRlbGVtLm9uZSh0cmFuc2l0aW9uZW5kKCRlbGVtKSwgZnVuY3Rpb24oZSl7XG4gICAgICAkZWxlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlIGlzLWNsb3NpbmcnKTtcbiAgICB9KTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgZnVsbHkgY2xvc2VkLlxuICAgICAgICAgKiBAZXZlbnQgRHJpbGxkb3duI2Nsb3NlZFxuICAgICAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlZC56Zi5kcmlsbGRvd24nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVyIGZvciBlYWNoIGBiYWNrYCBidXR0b24sIGFuZCBjbG9zZXMgb3BlbiBtZW51cy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcmlsbGRvd24jYmFja1xuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsZW0gLSB0aGUgY3VycmVudCBzdWItbWVudSB0byBhZGQgYGJhY2tgIGV2ZW50LlxuICAgKi9cbiAgX2JhY2soJGVsZW0pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICRlbGVtLm9mZignY2xpY2suemYuZHJpbGxkb3duJyk7XG4gICAgJGVsZW0uY2hpbGRyZW4oJy5qcy1kcmlsbGRvd24tYmFjaycpXG4gICAgICAub24oJ2NsaWNrLnpmLmRyaWxsZG93bicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnbW91c2V1cCBvbiBiYWNrJyk7XG4gICAgICAgIF90aGlzLl9oaWRlKCRlbGVtKTtcblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHBhcmVudCBzdWJtZW51LCBjYWxsIHNob3dcbiAgICAgICAgbGV0IHBhcmVudFN1Yk1lbnUgPSAkZWxlbS5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLnBhcmVudCgnbGknKTtcbiAgICAgICAgaWYgKHBhcmVudFN1Yk1lbnUubGVuZ3RoKSB7XG4gICAgICAgICAgX3RoaXMuX3Nob3cocGFyZW50U3ViTWVudSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gbWVudSBpdGVtcyB3L28gc3VibWVudXMgdG8gY2xvc2Ugb3BlbiBtZW51cyBvbiBjbGljay5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbWVudUxpbmtFdmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLiRtZW51SXRlbXMubm90KCcuaXMtZHJpbGxkb3duLXN1Ym1lbnUtcGFyZW50JylcbiAgICAgICAgLm9mZignY2xpY2suemYuZHJpbGxkb3duJylcbiAgICAgICAgLm9uKCdjbGljay56Zi5kcmlsbGRvd24nLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAvLyBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIF90aGlzLl9oaWRlQWxsKCk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhIHN1Ym1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI29wZW5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gdGhlIGN1cnJlbnQgZWxlbWVudCB3aXRoIGEgc3VibWVudSB0byBvcGVuLCBpLmUuIHRoZSBgbGlgIHRhZy5cbiAgICovXG4gIF9zaG93KCRlbGVtKSB7XG4gICAgaWYodGhpcy5vcHRpb25zLmF1dG9IZWlnaHQpIHRoaXMuJHdyYXBwZXIuY3NzKHtoZWlnaHQ6JGVsZW0uY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykuZGF0YSgnY2FsY0hlaWdodCcpfSk7XG4gICAgJGVsZW0uYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICRlbGVtLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJykuYXR0cignYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgc3VibWVudSBoYXMgb3BlbmVkLlxuICAgICAqIEBldmVudCBEcmlsbGRvd24jb3BlblxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignb3Blbi56Zi5kcmlsbGRvd24nLCBbJGVsZW1dKTtcbiAgfTtcblxuICAvKipcbiAgICogSGlkZXMgYSBzdWJtZW51XG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI2hpZGVcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gdGhlIGN1cnJlbnQgc3ViLW1lbnUgdG8gaGlkZSwgaS5lLiB0aGUgYHVsYCB0YWcuXG4gICAqL1xuICBfaGlkZSgkZWxlbSkge1xuICAgIGlmKHRoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KSB0aGlzLiR3cmFwcGVyLmNzcyh7aGVpZ2h0OiRlbGVtLnBhcmVudCgpLmNsb3Nlc3QoJ3VsJykuZGF0YSgnY2FsY0hlaWdodCcpfSk7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAkZWxlbS5wYXJlbnQoJ2xpJykuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICAkZWxlbS5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpLmFkZENsYXNzKCdpcy1jbG9zaW5nJylcbiAgICAkZWxlbS5hZGRDbGFzcygnaXMtY2xvc2luZycpXG4gICAgICAgICAub25lKHRyYW5zaXRpb25lbmQoJGVsZW0pLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAkZWxlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlIGlzLWNsb3NpbmcnKTtcbiAgICAgICAgICAgJGVsZW0uYmx1cigpLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIHN1Ym1lbnUgaGFzIGNsb3NlZC5cbiAgICAgKiBAZXZlbnQgRHJpbGxkb3duI2hpZGVcbiAgICAgKi9cbiAgICAkZWxlbS50cmlnZ2VyKCdoaWRlLnpmLmRyaWxsZG93bicsIFskZWxlbV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIHRocm91Z2ggdGhlIG5lc3RlZCBtZW51cyB0byBjYWxjdWxhdGUgdGhlIG1pbi1oZWlnaHQsIGFuZCBtYXgtd2lkdGggZm9yIHRoZSBtZW51LlxuICAgKiBQcmV2ZW50cyBjb250ZW50IGp1bXBpbmcuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldE1heERpbXMoKSB7XG4gICAgdmFyICBtYXhIZWlnaHQgPSAwLCByZXN1bHQgPSB7fSwgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuJHN1Ym1lbnVzLmFkZCh0aGlzLiRlbGVtZW50KS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgbnVtT2ZFbGVtcyA9ICQodGhpcykuY2hpbGRyZW4oJ2xpJykubGVuZ3RoO1xuICAgICAgdmFyIGhlaWdodCA9IEJveC5HZXREaW1lbnNpb25zKHRoaXMpLmhlaWdodDtcbiAgICAgIG1heEhlaWdodCA9IGhlaWdodCA+IG1heEhlaWdodCA/IGhlaWdodCA6IG1heEhlaWdodDtcbiAgICAgIGlmKF90aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkge1xuICAgICAgICAkKHRoaXMpLmRhdGEoJ2NhbGNIZWlnaHQnLGhlaWdodCk7XG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtZHJpbGxkb3duLXN1Ym1lbnUnKSkgcmVzdWx0WydoZWlnaHQnXSA9IGhlaWdodDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKCF0aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkgcmVzdWx0WydtaW4taGVpZ2h0J10gPSBgJHttYXhIZWlnaHR9cHhgO1xuXG4gICAgcmVzdWx0WydtYXgtd2lkdGgnXSA9IGAke3RoaXMuJGVsZW1lbnRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGh9cHhgO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgRHJpbGxkb3duIE1lbnVcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICBpZih0aGlzLm9wdGlvbnMuc2Nyb2xsVG9wKSB0aGlzLiRlbGVtZW50Lm9mZignLnpmLmRyaWxsZG93bicsdGhpcy5fYmluZEhhbmRsZXIpO1xuICAgIHRoaXMuX2hpZGVBbGwoKTtcblx0ICB0aGlzLiRlbGVtZW50Lm9mZignbXV0YXRlbWUuemYudHJpZ2dlcicpO1xuICAgIE5lc3QuQnVybih0aGlzLiRlbGVtZW50LCAnZHJpbGxkb3duJyk7XG4gICAgdGhpcy4kZWxlbWVudC51bndyYXAoKVxuICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWRyaWxsZG93bi1iYWNrLCAuaXMtc3VibWVudS1wYXJlbnQtaXRlbScpLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgIC5lbmQoKS5maW5kKCcuaXMtYWN0aXZlLCAuaXMtY2xvc2luZywgLmlzLWRyaWxsZG93bi1zdWJtZW51JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZSBpcy1jbG9zaW5nIGlzLWRyaWxsZG93bi1zdWJtZW51JylcbiAgICAgICAgICAgICAgICAgLmVuZCgpLmZpbmQoJ1tkYXRhLXN1Ym1lbnVdJykucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gdGFiaW5kZXggcm9sZScpO1xuICAgIHRoaXMuJHN1Ym1lbnVBbmNob3JzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLm9mZignLnpmLmRyaWxsZG93bicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kc3VibWVudXMucmVtb3ZlQ2xhc3MoJ2RyaWxsZG93bi1zdWJtZW51LWNvdmVyLXByZXZpb3VzIGludmlzaWJsZScpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICRsaW5rID0gJCh0aGlzKTtcbiAgICAgICRsaW5rLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICBpZigkbGluay5kYXRhKCdzYXZlZEhyZWYnKSl7XG4gICAgICAgICRsaW5rLmF0dHIoJ2hyZWYnLCAkbGluay5kYXRhKCdzYXZlZEhyZWYnKSkucmVtb3ZlRGF0YSgnc2F2ZWRIcmVmJyk7XG4gICAgICB9ZWxzZXsgcmV0dXJuOyB9XG4gICAgfSk7XG4gIH07XG59XG5cbkRyaWxsZG93bi5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIERyaWxsZG93bnMgZGVwZW5kIG9uIHN0eWxlcyBpbiBvcmRlciB0byBmdW5jdGlvbiBwcm9wZXJseTsgaW4gdGhlIGRlZmF1bHQgYnVpbGQgb2YgRm91bmRhdGlvbiB0aGVzZSBhcmVcbiAgICogb24gdGhlIGBkcmlsbGRvd25gIGNsYXNzLiBUaGlzIG9wdGlvbiBhdXRvLWFwcGxpZXMgdGhpcyBjbGFzcyB0byB0aGUgZHJpbGxkb3duIHVwb24gaW5pdGlhbGl6YXRpb24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xpYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGF1dG9BcHBseUNsYXNzOiB0cnVlLFxuICAvKipcbiAgICogTWFya3VwIHVzZWQgZm9yIEpTIGdlbmVyYXRlZCBiYWNrIGJ1dHRvbi4gUHJlcGVuZGVkICBvciBhcHBlbmRlZCAoc2VlIGJhY2tCdXR0b25Qb3NpdGlvbikgdG8gc3VibWVudSBsaXN0cyBhbmQgZGVsZXRlZCBvbiBgZGVzdHJveWAgbWV0aG9kLCAnanMtZHJpbGxkb3duLWJhY2snIGNsYXNzIHJlcXVpcmVkLiBSZW1vdmUgdGhlIGJhY2tzbGFzaCAoYFxcYCkgaWYgY29weSBhbmQgcGFzdGluZy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnPGxpIGNsYXNzPVwianMtZHJpbGxkb3duLWJhY2tcIj48YSB0YWJpbmRleD1cIjBcIj5CYWNrPC9hPjwvbGk+J1xuICAgKi9cbiAgYmFja0J1dHRvbjogJzxsaSBjbGFzcz1cImpzLWRyaWxsZG93bi1iYWNrXCI+PGEgdGFiaW5kZXg9XCIwXCI+QmFjazwvYT48L2xpPicsXG4gIC8qKlxuICAgKiBQb3NpdGlvbiB0aGUgYmFjayBidXR0b24gZWl0aGVyIGF0IHRoZSB0b3Agb3IgYm90dG9tIG9mIGRyaWxsZG93biBzdWJtZW51cy4gQ2FuIGJlIGAnbGVmdCdgIG9yIGAnYm90dG9tJ2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgdG9wXG4gICAqL1xuICBiYWNrQnV0dG9uUG9zaXRpb246ICd0b3AnLFxuICAvKipcbiAgICogTWFya3VwIHVzZWQgdG8gd3JhcCBkcmlsbGRvd24gbWVudS4gVXNlIGEgY2xhc3MgbmFtZSBmb3IgaW5kZXBlbmRlbnQgc3R5bGluZzsgdGhlIEpTIGFwcGxpZWQgY2xhc3M6IGBpcy1kcmlsbGRvd25gIGlzIHJlcXVpcmVkLiBSZW1vdmUgdGhlIGJhY2tzbGFzaCAoYFxcYCkgaWYgY29weSBhbmQgcGFzdGluZy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnPGRpdj48L2Rpdj4nXG4gICAqL1xuICB3cmFwcGVyOiAnPGRpdj48L2Rpdj4nLFxuICAvKipcbiAgICogQWRkcyB0aGUgcGFyZW50IGxpbmsgdG8gdGhlIHN1Ym1lbnUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBwYXJlbnRMaW5rOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBtZW51IHRvIHJldHVybiB0byByb290IGxpc3Qgb24gYm9keSBjbGljay5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGNsb3NlT25DbGljazogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgbWVudSB0byBhdXRvIGFkanVzdCBoZWlnaHQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhdXRvSGVpZ2h0OiBmYWxzZSxcbiAgLyoqXG4gICAqIEFuaW1hdGUgdGhlIGF1dG8gYWRqdXN0IGhlaWdodC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFuaW1hdGVIZWlnaHQ6IGZhbHNlLFxuICAvKipcbiAgICogU2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIG1lbnUgYWZ0ZXIgb3BlbmluZyBhIHN1Ym1lbnUgb3IgbmF2aWdhdGluZyBiYWNrIHVzaW5nIHRoZSBtZW51IGJhY2sgYnV0dG9uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBzY3JvbGxUb3A6IGZhbHNlLFxuICAvKipcbiAgICogU3RyaW5nIGpxdWVyeSBzZWxlY3RvciAoZm9yIGV4YW1wbGUgJ2JvZHknKSBvZiBlbGVtZW50IHRvIHRha2Ugb2Zmc2V0KCkudG9wIGZyb20sIGlmIGVtcHR5IHN0cmluZyB0aGUgZHJpbGxkb3duIG1lbnUgb2Zmc2V0KCkudG9wIGlzIHRha2VuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIHNjcm9sbFRvcEVsZW1lbnQ6ICcnLFxuICAvKipcbiAgICogU2Nyb2xsVG9wIG9mZnNldFxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHNjcm9sbFRvcE9mZnNldDogMCxcbiAgLyoqXG4gICAqIFNjcm9sbCBhbmltYXRpb24gZHVyYXRpb25cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MDBcbiAgICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA1MDAsXG4gIC8qKlxuICAgKiBTY3JvbGwgYW5pbWF0aW9uIGVhc2luZy4gQ2FuIGJlIGAnc3dpbmcnYCBvciBgJ2xpbmVhcidgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vYXBpLmpxdWVyeS5jb20vYW5pbWF0ZXxKUXVlcnkgYW5pbWF0ZX1cbiAgICogQGRlZmF1bHQgJ3N3aW5nJ1xuICAgKi9cbiAgYW5pbWF0aW9uRWFzaW5nOiAnc3dpbmcnXG4gIC8vIGhvbGRPcGVuOiBmYWxzZVxufTtcblxuZXhwb3J0IHtEcmlsbGRvd259O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcmlsbGRvd24uanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IE1vdGlvbiB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1vdGlvbic7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcblxuLyoqXG4gKiBSZXNwb25zaXZlVG9nZ2xlIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5yZXNwb25zaXZlVG9nZ2xlXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubW90aW9uXG4gKi9cblxuY2xhc3MgUmVzcG9uc2l2ZVRvZ2dsZSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFRhYiBCYXIuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBSZXNwb25zaXZlVG9nZ2xlXG4gICAqIEBmaXJlcyBSZXNwb25zaXZlVG9nZ2xlI2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGF0dGFjaCB0YWIgYmFyIGZ1bmN0aW9uYWxpdHkgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFJlc3BvbnNpdmVUb2dnbGUuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdSZXNwb25zaXZlVG9nZ2xlJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHRhYiBiYXIgYnkgZmluZGluZyB0aGUgdGFyZ2V0IGVsZW1lbnQsIHRvZ2dsaW5nIGVsZW1lbnQsIGFuZCBydW5uaW5nIHVwZGF0ZSgpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICB2YXIgdGFyZ2V0SUQgPSB0aGlzLiRlbGVtZW50LmRhdGEoJ3Jlc3BvbnNpdmUtdG9nZ2xlJyk7XG4gICAgaWYgKCF0YXJnZXRJRCkge1xuICAgICAgY29uc29sZS5lcnJvcignWW91ciB0YWIgYmFyIG5lZWRzIGFuIElEIG9mIGEgTWVudSBhcyB0aGUgdmFsdWUgb2YgZGF0YS10YWItYmFyLicpO1xuICAgIH1cblxuICAgIHRoaXMuJHRhcmdldE1lbnUgPSAkKGAjJHt0YXJnZXRJRH1gKTtcbiAgICB0aGlzLiR0b2dnbGVyID0gdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS10b2dnbGVdJykuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuZGF0YSgndG9nZ2xlJyk7XG4gICAgICByZXR1cm4gKHRhcmdldCA9PT0gdGFyZ2V0SUQgfHwgdGFyZ2V0ID09PSBcIlwiKTtcbiAgICB9KTtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCB0aGlzLiR0YXJnZXRNZW51LmRhdGEoKSk7XG5cbiAgICAvLyBJZiB0aGV5IHdlcmUgc2V0LCBwYXJzZSB0aGUgYW5pbWF0aW9uIGNsYXNzZXNcbiAgICBpZih0aGlzLm9wdGlvbnMuYW5pbWF0ZSkge1xuICAgICAgbGV0IGlucHV0ID0gdGhpcy5vcHRpb25zLmFuaW1hdGUuc3BsaXQoJyAnKTtcblxuICAgICAgdGhpcy5hbmltYXRpb25JbiA9IGlucHV0WzBdO1xuICAgICAgdGhpcy5hbmltYXRpb25PdXQgPSBpbnB1dFsxXSB8fCBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbmVjZXNzYXJ5IGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgdGFiIGJhciB0byB3b3JrLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX3VwZGF0ZU1xSGFuZGxlciA9IHRoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCB0aGlzLl91cGRhdGVNcUhhbmRsZXIpO1xuXG4gICAgdGhpcy4kdG9nZ2xlci5vbignY2xpY2suemYucmVzcG9uc2l2ZVRvZ2dsZScsIHRoaXMudG9nZ2xlTWVudS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGN1cnJlbnQgbWVkaWEgcXVlcnkgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YWIgYmFyIHNob3VsZCBiZSB2aXNpYmxlIG9yIGhpZGRlbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdXBkYXRlKCkge1xuICAgIC8vIE1vYmlsZVxuICAgIGlmICghTWVkaWFRdWVyeS5hdExlYXN0KHRoaXMub3B0aW9ucy5oaWRlRm9yKSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5zaG93KCk7XG4gICAgICB0aGlzLiR0YXJnZXRNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBEZXNrdG9wXG4gICAgZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmhpZGUoKTtcbiAgICAgIHRoaXMuJHRhcmdldE1lbnUuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBlbGVtZW50IGF0dGFjaGVkIHRvIHRoZSB0YWIgYmFyLiBUaGUgdG9nZ2xlIG9ubHkgaGFwcGVucyBpZiB0aGUgc2NyZWVuIGlzIHNtYWxsIGVub3VnaCB0byBhbGxvdyBpdC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBSZXNwb25zaXZlVG9nZ2xlI3RvZ2dsZWRcbiAgICovXG4gIHRvZ2dsZU1lbnUoKSB7XG4gICAgaWYgKCFNZWRpYVF1ZXJ5LmF0TGVhc3QodGhpcy5vcHRpb25zLmhpZGVGb3IpKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIGVsZW1lbnQgYXR0YWNoZWQgdG8gdGhlIHRhYiBiYXIgdG9nZ2xlcy5cbiAgICAgICAqIEBldmVudCBSZXNwb25zaXZlVG9nZ2xlI3RvZ2dsZWRcbiAgICAgICAqL1xuICAgICAgaWYodGhpcy5vcHRpb25zLmFuaW1hdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuJHRhcmdldE1lbnUuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgIE1vdGlvbi5hbmltYXRlSW4odGhpcy4kdGFyZ2V0TWVudSwgdGhpcy5hbmltYXRpb25JbiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCd0b2dnbGVkLnpmLnJlc3BvbnNpdmVUb2dnbGUnKTtcbiAgICAgICAgICAgIHRoaXMuJHRhcmdldE1lbnUuZmluZCgnW2RhdGEtbXV0YXRlXScpLnRyaWdnZXJIYW5kbGVyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgTW90aW9uLmFuaW1hdGVPdXQodGhpcy4kdGFyZ2V0TWVudSwgdGhpcy5hbmltYXRpb25PdXQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigndG9nZ2xlZC56Zi5yZXNwb25zaXZlVG9nZ2xlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiR0YXJnZXRNZW51LnRvZ2dsZSgwKTtcbiAgICAgICAgdGhpcy4kdGFyZ2V0TWVudS5maW5kKCdbZGF0YS1tdXRhdGVdJykudHJpZ2dlcignbXV0YXRlbWUuemYudHJpZ2dlcicpO1xuICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3RvZ2dsZWQuemYucmVzcG9uc2l2ZVRvZ2dsZScpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnJlc3BvbnNpdmVUb2dnbGUnKTtcbiAgICB0aGlzLiR0b2dnbGVyLm9mZignLnpmLnJlc3BvbnNpdmVUb2dnbGUnKTtcblxuICAgICQod2luZG93KS5vZmYoJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIHRoaXMuX3VwZGF0ZU1xSGFuZGxlcik7XG4gIH1cbn1cblxuUmVzcG9uc2l2ZVRvZ2dsZS5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFRoZSBicmVha3BvaW50IGFmdGVyIHdoaWNoIHRoZSBtZW51IGlzIGFsd2F5cyBzaG93biwgYW5kIHRoZSB0YWIgYmFyIGlzIGhpZGRlbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnbWVkaXVtJ1xuICAgKi9cbiAgaGlkZUZvcjogJ21lZGl1bScsXG5cbiAgLyoqXG4gICAqIFRvIGRlY2lkZSBpZiB0aGUgdG9nZ2xlIHNob3VsZCBiZSBhbmltYXRlZCBvciBub3QuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbmltYXRlOiBmYWxzZVxufTtcblxuZXhwb3J0IHsgUmVzcG9uc2l2ZVRvZ2dsZSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlVG9nZ2xlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcblxuLyoqXG4gKiBSZXZlYWwgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnJldmVhbFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1vdGlvbiBpZiB1c2luZyBhbmltYXRpb25zXG4gKi9cblxuY2xhc3MgUmV2ZWFsIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmV2ZWFsLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgUmV2ZWFsXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byB1c2UgZm9yIHRoZSBtb2RhbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25hbCBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgUmV2ZWFsLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnUmV2ZWFsJzsgLy8gaWU5IGJhY2sgY29tcGF0XG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgLy8gVHJpZ2dlcnMgaW5pdCBpcyBpZGVtcG90ZW50LCBqdXN0IG5lZWQgdG8gbWFrZSBzdXJlIGl0IGlzIGluaXRpYWxpemVkXG4gICAgVHJpZ2dlcnMuaW5pdCgkKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdSZXZlYWwnLCB7XG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbW9kYWwgYnkgYWRkaW5nIHRoZSBvdmVybGF5IGFuZCBjbG9zZSBidXR0b25zLCAoaWYgc2VsZWN0ZWQpLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuICAgIHRoaXMuaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuY2FjaGVkID0ge21xOiBNZWRpYVF1ZXJ5LmN1cnJlbnR9O1xuICAgIHRoaXMuaXNNb2JpbGUgPSBtb2JpbGVTbmlmZigpO1xuXG4gICAgdGhpcy4kYW5jaG9yID0gJChgW2RhdGEtb3Blbj1cIiR7dGhpcy5pZH1cIl1gKS5sZW5ndGggPyAkKGBbZGF0YS1vcGVuPVwiJHt0aGlzLmlkfVwiXWApIDogJChgW2RhdGEtdG9nZ2xlPVwiJHt0aGlzLmlkfVwiXWApO1xuICAgIHRoaXMuJGFuY2hvci5hdHRyKHtcbiAgICAgICdhcmlhLWNvbnRyb2xzJzogdGhpcy5pZCxcbiAgICAgICdhcmlhLWhhc3BvcHVwJzogdHJ1ZSxcbiAgICAgICd0YWJpbmRleCc6IDBcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnVsbFNjcmVlbiB8fCB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmdWxsJykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5mdWxsU2NyZWVuID0gdHJ1ZTtcbiAgICAgIHRoaXMub3B0aW9ucy5vdmVybGF5ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSAmJiAhdGhpcy4kb3ZlcmxheSkge1xuICAgICAgdGhpcy4kb3ZlcmxheSA9IHRoaXMuX21ha2VPdmVybGF5KHRoaXMuaWQpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7XG4gICAgICAgICdyb2xlJzogJ2RpYWxvZycsXG4gICAgICAgICdhcmlhLWhpZGRlbic6IHRydWUsXG4gICAgICAgICdkYXRhLXlldGktYm94JzogdGhpcy5pZCxcbiAgICAgICAgJ2RhdGEtcmVzaXplJzogdGhpcy5pZFxuICAgIH0pO1xuXG4gICAgaWYodGhpcy4kb3ZlcmxheSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5kZXRhY2goKS5hcHBlbmRUbyh0aGlzLiRvdmVybGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5kZXRhY2goKS5hcHBlbmRUbygkKHRoaXMub3B0aW9ucy5hcHBlbmRUbykpO1xuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnd2l0aG91dC1vdmVybGF5Jyk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50cygpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmsgJiYgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICggYCMke3RoaXMuaWR9YCkpIHtcbiAgICAgICQod2luZG93KS5vbmUoJ2xvYWQuemYucmV2ZWFsJywgdGhpcy5vcGVuLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG92ZXJsYXkgZGl2IHRvIGRpc3BsYXkgYmVoaW5kIHRoZSBtb2RhbC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tYWtlT3ZlcmxheSgpIHtcbiAgICB2YXIgYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzID0gJyc7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxPdmVybGF5Q2xhc3Nlcykge1xuICAgICAgYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzID0gJyAnICsgdGhpcy5vcHRpb25zLmFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlcztcbiAgICB9XG5cbiAgICByZXR1cm4gJCgnPGRpdj48L2Rpdj4nKVxuICAgICAgLmFkZENsYXNzKCdyZXZlYWwtb3ZlcmxheScgKyBhZGRpdGlvbmFsT3ZlcmxheUNsYXNzZXMpXG4gICAgICAuYXBwZW5kVG8odGhpcy5vcHRpb25zLmFwcGVuZFRvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHBvc2l0aW9uIG9mIG1vZGFsXG4gICAqIFRPRE86ICBGaWd1cmUgb3V0IGlmIHdlIGFjdHVhbGx5IG5lZWQgdG8gY2FjaGUgdGhlc2UgdmFsdWVzIG9yIGlmIGl0IGRvZXNuJ3QgbWF0dGVyXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdXBkYXRlUG9zaXRpb24oKSB7XG4gICAgdmFyIHdpZHRoID0gdGhpcy4kZWxlbWVudC5vdXRlcldpZHRoKCk7XG4gICAgdmFyIG91dGVyV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy4kZWxlbWVudC5vdXRlckhlaWdodCgpO1xuICAgIHZhciBvdXRlckhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICB2YXIgbGVmdCwgdG9wO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaE9mZnNldCA9PT0gJ2F1dG8nKSB7XG4gICAgICBsZWZ0ID0gcGFyc2VJbnQoKG91dGVyV2lkdGggLSB3aWR0aCkgLyAyLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlZnQgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMuaE9mZnNldCwgMTApO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnZPZmZzZXQgPT09ICdhdXRvJykge1xuICAgICAgaWYgKGhlaWdodCA+IG91dGVySGVpZ2h0KSB7XG4gICAgICAgIHRvcCA9IHBhcnNlSW50KE1hdGgubWluKDEwMCwgb3V0ZXJIZWlnaHQgLyAxMCksIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvcCA9IHBhcnNlSW50KChvdXRlckhlaWdodCAtIGhlaWdodCkgLyA0LCAxMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvcCA9IHBhcnNlSW50KHRoaXMub3B0aW9ucy52T2Zmc2V0LCAxMCk7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHt0b3A6IHRvcCArICdweCd9KTtcbiAgICAvLyBvbmx5IHdvcnJ5IGFib3V0IGxlZnQgaWYgd2UgZG9uJ3QgaGF2ZSBhbiBvdmVybGF5IG9yIHdlIGhhdmVhICBob3Jpem9udGFsIG9mZnNldCxcbiAgICAvLyBvdGhlcndpc2Ugd2UncmUgcGVyZmVjdGx5IGluIHRoZSBtaWRkbGVcbiAgICBpZighdGhpcy4kb3ZlcmxheSB8fCAodGhpcy5vcHRpb25zLmhPZmZzZXQgIT09ICdhdXRvJykpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtsZWZ0OiBsZWZ0ICsgJ3B4J30pO1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3Moe21hcmdpbjogJzBweCd9KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgbW9kYWwuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogKGV2ZW50LCAkZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoKGV2ZW50LnRhcmdldCA9PT0gX3RoaXMuJGVsZW1lbnRbMF0pIHx8XG4gICAgICAgICAgICAoJChldmVudC50YXJnZXQpLnBhcmVudHMoJ1tkYXRhLWNsb3NhYmxlXScpWzBdID09PSAkZWxlbWVudCkpIHsgLy8gb25seSBjbG9zZSByZXZlYWwgd2hlbiBpdCdzIGV4cGxpY2l0bHkgY2FsbGVkXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2UuYXBwbHkodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAndG9nZ2xlLnpmLnRyaWdnZXInOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpLFxuICAgICAgJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInOiBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayAmJiB0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5vZmYoJy56Zi5yZXZlYWwnKS5vbignY2xpY2suemYucmV2ZWFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IF90aGlzLiRlbGVtZW50WzBdIHx8XG4gICAgICAgICAgJC5jb250YWlucyhfdGhpcy4kZWxlbWVudFswXSwgZS50YXJnZXQpIHx8XG4gICAgICAgICAgICAhJC5jb250YWlucyhkb2N1bWVudCwgZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgICQod2luZG93KS5vbihgcG9wc3RhdGUuemYucmV2ZWFsOiR7dGhpcy5pZH1gLCB0aGlzLl9oYW5kbGVTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBtb2RhbCBtZXRob2RzIG9uIGJhY2svZm9yd2FyZCBidXR0b24gY2xpY2tzIG9yIGFueSBvdGhlciBldmVudCB0aGF0IHRyaWdnZXJzIHBvcHN0YXRlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2hhbmRsZVN0YXRlKGUpIHtcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gKCAnIycgKyB0aGlzLmlkKSAmJiAhdGhpcy5pc0FjdGl2ZSl7IHRoaXMub3BlbigpOyB9XG4gICAgZWxzZXsgdGhpcy5jbG9zZSgpOyB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgbW9kYWwgY29udHJvbGxlZCBieSBgdGhpcy4kYW5jaG9yYCwgYW5kIGNsb3NlcyBhbGwgb3RoZXJzIGJ5IGRlZmF1bHQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgUmV2ZWFsI2Nsb3NlbWVcbiAgICogQGZpcmVzIFJldmVhbCNvcGVuXG4gICAqL1xuICBvcGVuKCkge1xuICAgIC8vIGVpdGhlciB1cGRhdGUgb3IgcmVwbGFjZSBicm93c2VyIGhpc3RvcnlcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICB2YXIgaGFzaCA9IGAjJHt0aGlzLmlkfWA7XG5cbiAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGRhdGVIaXN0b3J5KSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgaGFzaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgaGFzaCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIC8vIE1ha2UgZWxlbWVudHMgaW52aXNpYmxlLCBidXQgcmVtb3ZlIGRpc3BsYXk6IG5vbmUgc28gd2UgY2FuIGdldCBzaXplIGFuZCBwb3NpdGlvbmluZ1xuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicgfSlcbiAgICAgICAgLnNob3coKVxuICAgICAgICAuc2Nyb2xsVG9wKDApO1xuICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moeyd2aXNpYmlsaXR5JzogJ2hpZGRlbid9KS5zaG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oKTtcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5oaWRlKClcbiAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICcnIH0pO1xuXG4gICAgaWYodGhpcy4kb3ZlcmxheSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moeyd2aXNpYmlsaXR5JzogJyd9KS5oaWRlKCk7XG4gICAgICBpZih0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYXN0JykpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnZmFzdCcpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdzbG93JykpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnc2xvdycpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubXVsdGlwbGVPcGVuZWQpIHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBtb2RhbCBvcGVucy5cbiAgICAgICAqIENsb3NlcyBhbnkgb3RoZXIgbW9kYWxzIHRoYXQgYXJlIGN1cnJlbnRseSBvcGVuXG4gICAgICAgKiBAZXZlbnQgUmV2ZWFsI2Nsb3NlbWVcbiAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjbG9zZW1lLnpmLnJldmVhbCcsIHRoaXMuaWQpO1xuICAgIH1cblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBhZGRSZXZlYWxPcGVuQ2xhc3NlcygpIHtcbiAgICAgIGlmIChfdGhpcy5pc01vYmlsZSkge1xuICAgICAgICBpZighX3RoaXMub3JpZ2luYWxTY3JvbGxQb3MpIHtcbiAgICAgICAgICBfdGhpcy5vcmlnaW5hbFNjcm9sbFBvcyA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICAkKCdodG1sLCBib2R5JykuYWRkQ2xhc3MoJ2lzLXJldmVhbC1vcGVuJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpcy1yZXZlYWwtb3BlbicpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBNb3Rpb24gVUkgbWV0aG9kIG9mIHJldmVhbFxuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uSW4pIHtcbiAgICAgIGZ1bmN0aW9uIGFmdGVyQW5pbWF0aW9uKCl7XG4gICAgICAgIF90aGlzLiRlbGVtZW50XG4gICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogZmFsc2UsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgIGFkZFJldmVhbE9wZW5DbGFzc2VzKCk7XG4gICAgICAgIEtleWJvYXJkLnRyYXBGb2N1cyhfdGhpcy4kZWxlbWVudCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgICAgTW90aW9uLmFuaW1hdGVJbih0aGlzLiRvdmVybGF5LCAnZmFkZS1pbicpO1xuICAgICAgfVxuICAgICAgTW90aW9uLmFuaW1hdGVJbih0aGlzLiRlbGVtZW50LCB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uSW4sICgpID0+IHtcbiAgICAgICAgaWYodGhpcy4kZWxlbWVudCkgeyAvLyBwcm90ZWN0IGFnYWluc3Qgb2JqZWN0IGhhdmluZyBiZWVuIHJlbW92ZWRcbiAgICAgICAgICB0aGlzLmZvY3VzYWJsZUVsZW1lbnRzID0gS2V5Ym9hcmQuZmluZEZvY3VzYWJsZSh0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgICBhZnRlckFuaW1hdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8galF1ZXJ5IG1ldGhvZCBvZiByZXZlYWxcbiAgICBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coMCk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbGVtZW50LnNob3codGhpcy5vcHRpb25zLnNob3dEZWxheSk7XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGFjY2Vzc2liaWxpdHlcbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAuYXR0cih7XG4gICAgICAgICdhcmlhLWhpZGRlbic6IGZhbHNlLFxuICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgfSlcbiAgICAgIC5mb2N1cygpO1xuICAgIEtleWJvYXJkLnRyYXBGb2N1cyh0aGlzLiRlbGVtZW50KTtcblxuICAgIGFkZFJldmVhbE9wZW5DbGFzc2VzKCk7XG5cbiAgICB0aGlzLl9leHRyYUhhbmRsZXJzKCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBtb2RhbCBoYXMgc3VjY2Vzc2Z1bGx5IG9wZW5lZC5cbiAgICAgKiBAZXZlbnQgUmV2ZWFsI29wZW5cbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29wZW4uemYucmV2ZWFsJyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBleHRyYSBldmVudCBoYW5kbGVycyBmb3IgdGhlIGJvZHkgYW5kIHdpbmRvdyBpZiBuZWNlc3NhcnkuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXh0cmFIYW5kbGVycygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGlmKCF0aGlzLiRlbGVtZW50KSB7IHJldHVybjsgfSAvLyBJZiB3ZSdyZSBpbiB0aGUgbWlkZGxlIG9mIGNsZWFudXAsIGRvbid0IGZyZWFrIG91dFxuICAgIHRoaXMuZm9jdXNhYmxlRWxlbWVudHMgPSBLZXlib2FyZC5maW5kRm9jdXNhYmxlKHRoaXMuJGVsZW1lbnQpO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMub3ZlcmxheSAmJiB0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrICYmICF0aGlzLm9wdGlvbnMuZnVsbFNjcmVlbikge1xuICAgICAgJCgnYm9keScpLm9uKCdjbGljay56Zi5yZXZlYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gX3RoaXMuJGVsZW1lbnRbMF0gfHxcbiAgICAgICAgICAkLmNvbnRhaW5zKF90aGlzLiRlbGVtZW50WzBdLCBlLnRhcmdldCkgfHxcbiAgICAgICAgICAgICEkLmNvbnRhaW5zKGRvY3VtZW50LCBlLnRhcmdldCkpIHsgcmV0dXJuOyB9XG4gICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25Fc2MpIHtcbiAgICAgICQod2luZG93KS5vbigna2V5ZG93bi56Zi5yZXZlYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnUmV2ZWFsJywge1xuICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmNsb3NlT25Fc2MpIHtcbiAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgbW9kYWwuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgUmV2ZWFsI2Nsb3NlZFxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzQWN0aXZlIHx8ICF0aGlzLiRlbGVtZW50LmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBNb3Rpb24gVUkgbWV0aG9kIG9mIGhpZGluZ1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uT3V0KSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgICAgTW90aW9uLmFuaW1hdGVPdXQodGhpcy4kb3ZlcmxheSwgJ2ZhZGUtb3V0Jyk7XG4gICAgICB9XG5cbiAgICAgIE1vdGlvbi5hbmltYXRlT3V0KHRoaXMuJGVsZW1lbnQsIHRoaXMub3B0aW9ucy5hbmltYXRpb25PdXQsIGZpbmlzaFVwKTtcbiAgICB9XG4gICAgLy8galF1ZXJ5IG1ldGhvZCBvZiBoaWRpbmdcbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuaGlkZSh0aGlzLm9wdGlvbnMuaGlkZURlbGF5KTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgwLCBmaW5pc2hVcCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZmluaXNoVXAoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb25kaXRpb25hbHMgdG8gcmVtb3ZlIGV4dHJhIGV2ZW50IGxpc3RlbmVycyBhZGRlZCBvbiBvcGVuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uRXNjKSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdrZXlkb3duLnpmLnJldmVhbCcpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLm92ZXJsYXkgJiYgdGhpcy5vcHRpb25zLmNsb3NlT25DbGljaykge1xuICAgICAgJCgnYm9keScpLm9mZignY2xpY2suemYucmV2ZWFsJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJ2tleWRvd24uemYucmV2ZWFsJyk7XG5cbiAgICBmdW5jdGlvbiBmaW5pc2hVcCgpIHtcbiAgICAgIGlmIChfdGhpcy5pc01vYmlsZSkge1xuICAgICAgICBpZiAoJCgnLnJldmVhbDp2aXNpYmxlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLnJlbW92ZUNsYXNzKCdpcy1yZXZlYWwtb3BlbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmKF90aGlzLm9yaWdpbmFsU2Nyb2xsUG9zKSB7XG4gICAgICAgICAgJCgnYm9keScpLnNjcm9sbFRvcChfdGhpcy5vcmlnaW5hbFNjcm9sbFBvcyk7XG4gICAgICAgICAgX3RoaXMub3JpZ2luYWxTY3JvbGxQb3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKCQoJy5yZXZlYWw6dmlzaWJsZScpLmxlbmd0aCAgPT09IDApIHtcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLXJldmVhbC1vcGVuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICBLZXlib2FyZC5yZWxlYXNlRm9jdXMoX3RoaXMuJGVsZW1lbnQpO1xuXG4gICAgICBfdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXG4gICAgICAvKipcbiAgICAgICogRmlyZXMgd2hlbiB0aGUgbW9kYWwgaXMgZG9uZSBjbG9zaW5nLlxuICAgICAgKiBAZXZlbnQgUmV2ZWFsI2Nsb3NlZFxuICAgICAgKi9cbiAgICAgIF90aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlZC56Zi5yZXZlYWwnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFJlc2V0cyB0aGUgbW9kYWwgY29udGVudFxuICAgICogVGhpcyBwcmV2ZW50cyBhIHJ1bm5pbmcgdmlkZW8gdG8ga2VlcCBnb2luZyBpbiB0aGUgYmFja2dyb3VuZFxuICAgICovXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXNldE9uQ2xvc2UpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuaHRtbCh0aGlzLiRlbGVtZW50Lmh0bWwoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICBpZiAoX3RoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoYCMke3RoaXMuaWR9YCwgJycpKTtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcbiAgICAgICB9XG4gICAgIH1cblxuICAgIHRoaXMuJGFuY2hvci5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIG9wZW4vY2xvc2VkIHN0YXRlIG9mIGEgbW9kYWwuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgYSBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kVG8oJCh0aGlzLm9wdGlvbnMuYXBwZW5kVG8pKTsgLy8gbW92ZSAkZWxlbWVudCBvdXRzaWRlIG9mICRvdmVybGF5IHRvIHByZXZlbnQgZXJyb3IgdW5yZWdpc3RlclBsdWdpbigpXG4gICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKS5vZmYoKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC5oaWRlKCkub2ZmKCk7XG4gICAgdGhpcy4kYW5jaG9yLm9mZignLnpmJyk7XG4gICAgJCh3aW5kb3cpLm9mZihgLnpmLnJldmVhbDoke3RoaXMuaWR9YCk7XG4gIH07XG59XG5cblJldmVhbC5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIE1vdGlvbi1VSSBjbGFzcyB0byB1c2UgZm9yIGFuaW1hdGVkIGVsZW1lbnRzLiBJZiBub25lIHVzZWQsIGRlZmF1bHRzIHRvIHNpbXBsZSBzaG93L2hpZGUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIGFuaW1hdGlvbkluOiAnJyxcbiAgLyoqXG4gICAqIE1vdGlvbi1VSSBjbGFzcyB0byB1c2UgZm9yIGFuaW1hdGVkIGVsZW1lbnRzLiBJZiBub25lIHVzZWQsIGRlZmF1bHRzIHRvIHNpbXBsZSBzaG93L2hpZGUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIGFuaW1hdGlvbk91dDogJycsXG4gIC8qKlxuICAgKiBUaW1lLCBpbiBtcywgdG8gZGVsYXkgdGhlIG9wZW5pbmcgb2YgYSBtb2RhbCBhZnRlciBhIGNsaWNrIGlmIG5vIGFuaW1hdGlvbiB1c2VkLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHNob3dEZWxheTogMCxcbiAgLyoqXG4gICAqIFRpbWUsIGluIG1zLCB0byBkZWxheSB0aGUgY2xvc2luZyBvZiBhIG1vZGFsIGFmdGVyIGEgY2xpY2sgaWYgbm8gYW5pbWF0aW9uIHVzZWQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgaGlkZURlbGF5OiAwLFxuICAvKipcbiAgICogQWxsb3dzIGEgY2xpY2sgb24gdGhlIGJvZHkvb3ZlcmxheSB0byBjbG9zZSB0aGUgbW9kYWwuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25DbGljazogdHJ1ZSxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gY2xvc2UgaWYgdGhlIHVzZXIgcHJlc3NlcyB0aGUgYEVTQ0FQRWAga2V5LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjbG9zZU9uRXNjOiB0cnVlLFxuICAvKipcbiAgICogSWYgdHJ1ZSwgYWxsb3dzIG11bHRpcGxlIG1vZGFscyB0byBiZSBkaXNwbGF5ZWQgYXQgb25jZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIG11bHRpcGxlT3BlbmVkOiBmYWxzZSxcbiAgLyoqXG4gICAqIERpc3RhbmNlLCBpbiBwaXhlbHMsIHRoZSBtb2RhbCBzaG91bGQgcHVzaCBkb3duIGZyb20gdGhlIHRvcCBvZiB0aGUgc2NyZWVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ8c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBhdXRvXG4gICAqL1xuICB2T2Zmc2V0OiAnYXV0bycsXG4gIC8qKlxuICAgKiBEaXN0YW5jZSwgaW4gcGl4ZWxzLCB0aGUgbW9kYWwgc2hvdWxkIHB1c2ggaW4gZnJvbSB0aGUgc2lkZSBvZiB0aGUgc2NyZWVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ8c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBhdXRvXG4gICAqL1xuICBoT2Zmc2V0OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGJlIGZ1bGxzY3JlZW4sIGNvbXBsZXRlbHkgYmxvY2tpbmcgb3V0IHRoZSByZXN0IG9mIHRoZSB2aWV3LiBKUyBjaGVja3MgZm9yIHRoaXMgYXMgd2VsbC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGZ1bGxTY3JlZW46IGZhbHNlLFxuICAvKipcbiAgICogUGVyY2VudGFnZSBvZiBzY3JlZW4gaGVpZ2h0IHRoZSBtb2RhbCBzaG91bGQgcHVzaCB1cCBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHZpZXcuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMTBcbiAgICovXG4gIGJ0bU9mZnNldFBjdDogMTAsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGdlbmVyYXRlIGFuIG92ZXJsYXkgZGl2LCB3aGljaCB3aWxsIGNvdmVyIHRoZSB2aWV3IHdoZW4gbW9kYWwgb3BlbnMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIG92ZXJsYXk6IHRydWUsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIHJlbW92ZSBhbmQgcmVpbmplY3QgbWFya3VwIG9uIGNsb3NlLiBTaG91bGQgYmUgdHJ1ZSBpZiB1c2luZyB2aWRlbyBlbGVtZW50cyB3L28gdXNpbmcgcHJvdmlkZXIncyBhcGksIG90aGVyd2lzZSwgdmlkZW9zIHdpbGwgY29udGludWUgdG8gcGxheSBpbiB0aGUgYmFja2dyb3VuZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHJlc2V0T25DbG9zZTogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGFsdGVyIHRoZSB1cmwgb24gb3Blbi9jbG9zZSwgYW5kIGFsbG93cyB0aGUgdXNlIG9mIHRoZSBgYmFja2AgYnV0dG9uIHRvIGNsb3NlIG1vZGFscy4gQUxTTywgYWxsb3dzIGEgbW9kYWwgdG8gYXV0by1tYW5pYWNhbGx5IG9wZW4gb24gcGFnZSBsb2FkIElGIHRoZSBoYXNoID09PSB0aGUgbW9kYWwncyB1c2VyLXNldCBpZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5rOiBmYWxzZSxcbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgYnJvd3NlciBoaXN0b3J5IHdpdGggdGhlIG9wZW4gbW9kYWxcbiAgICogQG9wdGlvblxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgdXBkYXRlSGlzdG9yeTogZmFsc2UsXG4gICAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gYXBwZW5kIHRvIGN1c3RvbSBkaXYuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgXCJib2R5XCJcbiAgICovXG4gIGFwcGVuZFRvOiBcImJvZHlcIixcbiAgLyoqXG4gICAqIEFsbG93cyBhZGRpbmcgYWRkaXRpb25hbCBjbGFzcyBuYW1lcyB0byB0aGUgcmV2ZWFsIG92ZXJsYXkuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIGFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlczogJydcbn07XG5cbmZ1bmN0aW9uIGlQaG9uZVNuaWZmKCkge1xuICByZXR1cm4gL2lQKGFkfGhvbmV8b2QpLipPUy8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59XG5cbmZ1bmN0aW9uIGFuZHJvaWRTbmlmZigpIHtcbiAgcmV0dXJuIC9BbmRyb2lkLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbn1cblxuZnVuY3Rpb24gbW9iaWxlU25pZmYoKSB7XG4gIHJldHVybiBpUGhvbmVTbmlmZigpIHx8IGFuZHJvaWRTbmlmZigpO1xufVxuXG5leHBvcnQge1JldmVhbH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJldmVhbC5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuXG4vKipcbiAqIFN0aWNreSBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uc3RpY2t5XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqL1xuXG5jbGFzcyBTdGlja3kgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHN0aWNreSB0aGluZy5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIFN0aWNreVxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gbWFrZSBzdGlja3kuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBvYmplY3QgcGFzc2VkIHdoZW4gY3JlYXRpbmcgdGhlIGVsZW1lbnQgcHJvZ3JhbW1hdGljYWxseS5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFN0aWNreS5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1N0aWNreSc7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgLy8gVHJpZ2dlcnMgaW5pdCBpcyBpZGVtcG90ZW50LCBqdXN0IG5lZWQgdG8gbWFrZSBzdXJlIGl0IGlzIGluaXRpYWxpemVkXG4gICAgVHJpZ2dlcnMuaW5pdCgkKTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgc3RpY2t5IGVsZW1lbnQgYnkgYWRkaW5nIGNsYXNzZXMsIGdldHRpbmcvc2V0dGluZyBkaW1lbnNpb25zLCBicmVha3BvaW50cyBhbmQgYXR0cmlidXRlc1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcblxuICAgIHZhciAkcGFyZW50ID0gdGhpcy4kZWxlbWVudC5wYXJlbnQoJ1tkYXRhLXN0aWNreS1jb250YWluZXJdJyksXG4gICAgICAgIGlkID0gdGhpcy4kZWxlbWVudFswXS5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnc3RpY2t5JyksXG4gICAgICAgIF90aGlzID0gdGhpcztcblxuICAgIGlmKCRwYXJlbnQubGVuZ3RoKXtcbiAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICRwYXJlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2FzV3JhcHBlZCA9IHRydWU7XG4gICAgICB0aGlzLiRlbGVtZW50LndyYXAodGhpcy5vcHRpb25zLmNvbnRhaW5lcik7XG4gICAgICB0aGlzLiRjb250YWluZXIgPSB0aGlzLiRlbGVtZW50LnBhcmVudCgpO1xuICAgIH1cbiAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmNvbnRhaW5lckNsYXNzKTtcblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnN0aWNreUNsYXNzKS5hdHRyKHsgJ2RhdGEtcmVzaXplJzogaWQsICdkYXRhLW11dGF0ZSc6IGlkIH0pO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5jaG9yICE9PSAnJykge1xuICAgICAgICAkKCcjJyArIF90aGlzLm9wdGlvbnMuYW5jaG9yKS5hdHRyKHsgJ2RhdGEtbXV0YXRlJzogaWQgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zY3JvbGxDb3VudCA9IHRoaXMub3B0aW9ucy5jaGVja0V2ZXJ5O1xuICAgIHRoaXMuaXNTdHVjayA9IGZhbHNlO1xuICAgICQod2luZG93KS5vbmUoJ2xvYWQuemYuc3RpY2t5JywgZnVuY3Rpb24oKXtcbiAgICAgIC8vV2UgY2FsY3VsYXRlIHRoZSBjb250YWluZXIgaGVpZ2h0IHRvIGhhdmUgY29ycmVjdCB2YWx1ZXMgZm9yIGFuY2hvciBwb2ludHMgb2Zmc2V0IGNhbGN1bGF0aW9uLlxuICAgICAgX3RoaXMuY29udGFpbmVySGVpZ2h0ID0gX3RoaXMuJGVsZW1lbnQuY3NzKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIiA/IDAgOiBfdGhpcy4kZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICBfdGhpcy4kY29udGFpbmVyLmNzcygnaGVpZ2h0JywgX3RoaXMuY29udGFpbmVySGVpZ2h0KTtcbiAgICAgIF90aGlzLmVsZW1IZWlnaHQgPSBfdGhpcy5jb250YWluZXJIZWlnaHQ7XG4gICAgICBpZihfdGhpcy5vcHRpb25zLmFuY2hvciAhPT0gJycpe1xuICAgICAgICBfdGhpcy4kYW5jaG9yID0gJCgnIycgKyBfdGhpcy5vcHRpb25zLmFuY2hvcik7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgX3RoaXMuX3BhcnNlUG9pbnRzKCk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzLl9zZXRTaXplcyhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBfdGhpcy5fY2FsYyhmYWxzZSwgc2Nyb2xsKTtcbiAgICAgICAgLy9VbnN0aWNrIHRoZSBlbGVtZW50IHdpbGwgZW5zdXJlIHRoYXQgcHJvcGVyIGNsYXNzZXMgYXJlIHNldC5cbiAgICAgICAgaWYgKCFfdGhpcy5pc1N0dWNrKSB7XG4gICAgICAgICAgX3RoaXMuX3JlbW92ZVN0aWNreSgoc2Nyb2xsID49IF90aGlzLnRvcFBvaW50KSA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgX3RoaXMuX2V2ZW50cyhpZC5zcGxpdCgnLScpLnJldmVyc2UoKS5qb2luKCctJykpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHVzaW5nIG11bHRpcGxlIGVsZW1lbnRzIGFzIGFuY2hvcnMsIGNhbGN1bGF0ZXMgdGhlIHRvcCBhbmQgYm90dG9tIHBpeGVsIHZhbHVlcyB0aGUgc3RpY2t5IHRoaW5nIHNob3VsZCBzdGljayBhbmQgdW5zdGljayBvbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGFyc2VQb2ludHMoKSB7XG4gICAgdmFyIHRvcCA9IHRoaXMub3B0aW9ucy50b3BBbmNob3IgPT0gXCJcIiA/IDEgOiB0aGlzLm9wdGlvbnMudG9wQW5jaG9yLFxuICAgICAgICBidG0gPSB0aGlzLm9wdGlvbnMuYnRtQW5jaG9yPT0gXCJcIiA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgOiB0aGlzLm9wdGlvbnMuYnRtQW5jaG9yLFxuICAgICAgICBwdHMgPSBbdG9wLCBidG1dLFxuICAgICAgICBicmVha3MgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcHRzLmxlbmd0aDsgaSA8IGxlbiAmJiBwdHNbaV07IGkrKykge1xuICAgICAgdmFyIHB0O1xuICAgICAgaWYgKHR5cGVvZiBwdHNbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgIHB0ID0gcHRzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHBsYWNlID0gcHRzW2ldLnNwbGl0KCc6JyksXG4gICAgICAgICAgICBhbmNob3IgPSAkKGAjJHtwbGFjZVswXX1gKTtcblxuICAgICAgICBwdCA9IGFuY2hvci5vZmZzZXQoKS50b3A7XG4gICAgICAgIGlmIChwbGFjZVsxXSAmJiBwbGFjZVsxXS50b0xvd2VyQ2FzZSgpID09PSAnYm90dG9tJykge1xuICAgICAgICAgIHB0ICs9IGFuY2hvclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrc1tpXSA9IHB0O1xuICAgIH1cblxuXG4gICAgdGhpcy5wb2ludHMgPSBicmVha3M7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBzY3JvbGxpbmcgZWxlbWVudC5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIC0gcHNldWRvLXJhbmRvbSBpZCBmb3IgdW5pcXVlIHNjcm9sbCBldmVudCBsaXN0ZW5lci5cbiAgICovXG4gIF9ldmVudHMoaWQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBzY3JvbGxMaXN0ZW5lciA9IHRoaXMuc2Nyb2xsTGlzdGVuZXIgPSBgc2Nyb2xsLnpmLiR7aWR9YDtcbiAgICBpZiAodGhpcy5pc09uKSB7IHJldHVybjsgfVxuICAgIGlmICh0aGlzLmNhblN0aWNrKSB7XG4gICAgICB0aGlzLmlzT24gPSB0cnVlO1xuICAgICAgJCh3aW5kb3cpLm9mZihzY3JvbGxMaXN0ZW5lcilcbiAgICAgICAgICAgICAgIC5vbihzY3JvbGxMaXN0ZW5lciwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2Nyb2xsQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICBfdGhpcy5zY3JvbGxDb3VudCA9IF90aGlzLm9wdGlvbnMuY2hlY2tFdmVyeTtcbiAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2V0U2l6ZXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICBfdGhpcy5fY2FsYyhmYWxzZSwgd2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICBfdGhpcy5zY3JvbGxDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgIF90aGlzLl9jYWxjKGZhbHNlLCB3aW5kb3cucGFnZVlPZmZzZXQpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdyZXNpemVtZS56Zi50cmlnZ2VyJylcbiAgICAgICAgICAgICAgICAgLm9uKCdyZXNpemVtZS56Zi50cmlnZ2VyJywgZnVuY3Rpb24oZSwgZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2V2ZW50c0hhbmRsZXIoaWQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kZWxlbWVudC5vbignbXV0YXRlbWUuemYudHJpZ2dlcicsIGZ1bmN0aW9uIChlLCBlbCkge1xuICAgICAgICBfdGhpcy5fZXZlbnRzSGFuZGxlcihpZCk7XG4gICAgfSk7XG5cbiAgICBpZih0aGlzLiRhbmNob3IpIHtcbiAgICAgIHRoaXMuJGFuY2hvci5vbignbXV0YXRlbWUuemYudHJpZ2dlcicsIGZ1bmN0aW9uIChlLCBlbCkge1xuICAgICAgICAgIF90aGlzLl9ldmVudHNIYW5kbGVyKGlkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIGZvciBldmVudHMuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIHBzZXVkby1yYW5kb20gaWQgZm9yIHVuaXF1ZSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIuXG4gICAqL1xuICBfZXZlbnRzSGFuZGxlcihpZCkge1xuICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIHNjcm9sbExpc3RlbmVyID0gdGhpcy5zY3JvbGxMaXN0ZW5lciA9IGBzY3JvbGwuemYuJHtpZH1gO1xuXG4gICAgICAgX3RoaXMuX3NldFNpemVzKGZ1bmN0aW9uKCkge1xuICAgICAgIF90aGlzLl9jYWxjKGZhbHNlKTtcbiAgICAgICBpZiAoX3RoaXMuY2FuU3RpY2spIHtcbiAgICAgICAgIGlmICghX3RoaXMuaXNPbikge1xuICAgICAgICAgICBfdGhpcy5fZXZlbnRzKGlkKTtcbiAgICAgICAgIH1cbiAgICAgICB9IGVsc2UgaWYgKF90aGlzLmlzT24pIHtcbiAgICAgICAgIF90aGlzLl9wYXVzZUxpc3RlbmVycyhzY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgfVxuICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGV2ZW50IGhhbmRsZXJzIGZvciBzY3JvbGwgYW5kIGNoYW5nZSBldmVudHMgb24gYW5jaG9yLlxuICAgKiBAZmlyZXMgU3RpY2t5I3BhdXNlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzY3JvbGxMaXN0ZW5lciAtIHVuaXF1ZSwgbmFtZXNwYWNlZCBzY3JvbGwgbGlzdGVuZXIgYXR0YWNoZWQgdG8gYHdpbmRvd2BcbiAgICovXG4gIF9wYXVzZUxpc3RlbmVycyhzY3JvbGxMaXN0ZW5lcikge1xuICAgIHRoaXMuaXNPbiA9IGZhbHNlO1xuICAgICQod2luZG93KS5vZmYoc2Nyb2xsTGlzdGVuZXIpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGlzIHBhdXNlZCBkdWUgdG8gcmVzaXplIGV2ZW50IHNocmlua2luZyB0aGUgdmlldy5cbiAgICAgKiBAZXZlbnQgU3RpY2t5I3BhdXNlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdwYXVzZS56Zi5zdGlja3knKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgb24gZXZlcnkgYHNjcm9sbGAgZXZlbnQgYW5kIG9uIGBfaW5pdGBcbiAgICogZmlyZXMgZnVuY3Rpb25zIGJhc2VkIG9uIGJvb2xlYW5zIGFuZCBjYWNoZWQgdmFsdWVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gY2hlY2tTaXplcyAtIHRydWUgaWYgcGx1Z2luIHNob3VsZCByZWNhbGN1bGF0ZSBzaXplcyBhbmQgYnJlYWtwb2ludHMuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzY3JvbGwgLSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBwYXNzZWQgZnJvbSBzY3JvbGwgZXZlbnQgY2IgZnVuY3Rpb24uIElmIG5vdCBwYXNzZWQsIGRlZmF1bHRzIHRvIGB3aW5kb3cucGFnZVlPZmZzZXRgLlxuICAgKi9cbiAgX2NhbGMoY2hlY2tTaXplcywgc2Nyb2xsKSB7XG4gICAgaWYgKGNoZWNrU2l6ZXMpIHsgdGhpcy5fc2V0U2l6ZXMoKTsgfVxuXG4gICAgaWYgKCF0aGlzLmNhblN0aWNrKSB7XG4gICAgICBpZiAodGhpcy5pc1N0dWNrKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZVN0aWNreSh0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXNjcm9sbCkgeyBzY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7IH1cblxuICAgIGlmIChzY3JvbGwgPj0gdGhpcy50b3BQb2ludCkge1xuICAgICAgaWYgKHNjcm9sbCA8PSB0aGlzLmJvdHRvbVBvaW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0dWNrKSB7XG4gICAgICAgICAgdGhpcy5fc2V0U3RpY2t5KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3R1Y2spIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVTdGlja3koZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmlzU3R1Y2spIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlU3RpY2t5KHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYXVzZXMgdGhlICRlbGVtZW50IHRvIGJlY29tZSBzdHVjay5cbiAgICogQWRkcyBgcG9zaXRpb246IGZpeGVkO2AsIGFuZCBoZWxwZXIgY2xhc3Nlcy5cbiAgICogQGZpcmVzIFN0aWNreSNzdHVja3RvXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldFN0aWNreSgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBzdGlja1RvID0gdGhpcy5vcHRpb25zLnN0aWNrVG8sXG4gICAgICAgIG1yZ24gPSBzdGlja1RvID09PSAndG9wJyA/ICdtYXJnaW5Ub3AnIDogJ21hcmdpbkJvdHRvbScsXG4gICAgICAgIG5vdFN0dWNrVG8gPSBzdGlja1RvID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCcsXG4gICAgICAgIGNzcyA9IHt9O1xuXG4gICAgY3NzW21yZ25dID0gYCR7dGhpcy5vcHRpb25zW21yZ25dfWVtYDtcbiAgICBjc3Nbc3RpY2tUb10gPSAwO1xuICAgIGNzc1tub3RTdHVja1RvXSA9ICdhdXRvJztcbiAgICB0aGlzLmlzU3R1Y2sgPSB0cnVlO1xuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoYGlzLWFuY2hvcmVkIGlzLWF0LSR7bm90U3R1Y2tUb31gKVxuICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYGlzLXN0dWNrIGlzLWF0LSR7c3RpY2tUb31gKVxuICAgICAgICAgICAgICAgICAuY3NzKGNzcylcbiAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlICRlbGVtZW50IGhhcyBiZWNvbWUgYHBvc2l0aW9uOiBmaXhlZDtgXG4gICAgICAgICAgICAgICAgICAqIE5hbWVzcGFjZWQgdG8gYHRvcGAgb3IgYGJvdHRvbWAsIGUuZy4gYHN0aWNreS56Zi5zdHVja3RvOnRvcGBcbiAgICAgICAgICAgICAgICAgICogQGV2ZW50IFN0aWNreSNzdHVja3RvXG4gICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAudHJpZ2dlcihgc3RpY2t5LnpmLnN0dWNrdG86JHtzdGlja1RvfWApO1xuICAgIHRoaXMuJGVsZW1lbnQub24oXCJ0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgTVNUcmFuc2l0aW9uRW5kXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuX3NldFNpemVzKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2F1c2VzIHRoZSAkZWxlbWVudCB0byBiZWNvbWUgdW5zdHVjay5cbiAgICogUmVtb3ZlcyBgcG9zaXRpb246IGZpeGVkO2AsIGFuZCBoZWxwZXIgY2xhc3Nlcy5cbiAgICogQWRkcyBvdGhlciBoZWxwZXIgY2xhc3Nlcy5cbiAgICogQHBhcmFtIHtCb29sZWFufSBpc1RvcCAtIHRlbGxzIHRoZSBmdW5jdGlvbiBpZiB0aGUgJGVsZW1lbnQgc2hvdWxkIGFuY2hvciB0byB0aGUgdG9wIG9yIGJvdHRvbSBvZiBpdHMgJGFuY2hvciBlbGVtZW50LlxuICAgKiBAZmlyZXMgU3RpY2t5I3Vuc3R1Y2tmcm9tXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVtb3ZlU3RpY2t5KGlzVG9wKSB7XG4gICAgdmFyIHN0aWNrVG8gPSB0aGlzLm9wdGlvbnMuc3RpY2tUbyxcbiAgICAgICAgc3RpY2tUb1RvcCA9IHN0aWNrVG8gPT09ICd0b3AnLFxuICAgICAgICBjc3MgPSB7fSxcbiAgICAgICAgYW5jaG9yUHQgPSAodGhpcy5wb2ludHMgPyB0aGlzLnBvaW50c1sxXSAtIHRoaXMucG9pbnRzWzBdIDogdGhpcy5hbmNob3JIZWlnaHQpIC0gdGhpcy5lbGVtSGVpZ2h0LFxuICAgICAgICBtcmduID0gc3RpY2tUb1RvcCA/ICdtYXJnaW5Ub3AnIDogJ21hcmdpbkJvdHRvbScsXG4gICAgICAgIG5vdFN0dWNrVG8gPSBzdGlja1RvVG9wID8gJ2JvdHRvbScgOiAndG9wJyxcbiAgICAgICAgdG9wT3JCb3R0b20gPSBpc1RvcCA/ICd0b3AnIDogJ2JvdHRvbSc7XG5cbiAgICBjc3NbbXJnbl0gPSAwO1xuXG4gICAgY3NzWydib3R0b20nXSA9ICdhdXRvJztcbiAgICBpZihpc1RvcCkge1xuICAgICAgY3NzWyd0b3AnXSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNzc1sndG9wJ10gPSBhbmNob3JQdDtcbiAgICB9XG5cbiAgICB0aGlzLmlzU3R1Y2sgPSBmYWxzZTtcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKGBpcy1zdHVjayBpcy1hdC0ke3N0aWNrVG99YClcbiAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGBpcy1hbmNob3JlZCBpcy1hdC0ke3RvcE9yQm90dG9tfWApXG4gICAgICAgICAgICAgICAgIC5jc3MoY3NzKVxuICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgJGVsZW1lbnQgaGFzIGJlY29tZSBhbmNob3JlZC5cbiAgICAgICAgICAgICAgICAgICogTmFtZXNwYWNlZCB0byBgdG9wYCBvciBgYm90dG9tYCwgZS5nLiBgc3RpY2t5LnpmLnVuc3R1Y2tmcm9tOmJvdHRvbWBcbiAgICAgICAgICAgICAgICAgICogQGV2ZW50IFN0aWNreSN1bnN0dWNrZnJvbVxuICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgLnRyaWdnZXIoYHN0aWNreS56Zi51bnN0dWNrZnJvbToke3RvcE9yQm90dG9tfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlICRlbGVtZW50IGFuZCAkY29udGFpbmVyIHNpemVzIGZvciBwbHVnaW4uXG4gICAqIENhbGxzIGBfc2V0QnJlYWtQb2ludHNgLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGZpcmUgb24gY29tcGxldGlvbiBvZiBgX3NldEJyZWFrUG9pbnRzYC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRTaXplcyhjYikge1xuICAgIHRoaXMuY2FuU3RpY2sgPSBNZWRpYVF1ZXJ5LmlzKHRoaXMub3B0aW9ucy5zdGlja3lPbik7XG4gICAgaWYgKCF0aGlzLmNhblN0aWNrKSB7XG4gICAgICBpZiAoY2IgJiYgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7IGNiKCk7IH1cbiAgICB9XG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgbmV3RWxlbVdpZHRoID0gdGhpcy4kY29udGFpbmVyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLFxuICAgICAgICBjb21wID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy4kY29udGFpbmVyWzBdKSxcbiAgICAgICAgcGRuZ2wgPSBwYXJzZUludChjb21wWydwYWRkaW5nLWxlZnQnXSwgMTApLFxuICAgICAgICBwZG5nciA9IHBhcnNlSW50KGNvbXBbJ3BhZGRpbmctcmlnaHQnXSwgMTApO1xuXG4gICAgaWYgKHRoaXMuJGFuY2hvciAmJiB0aGlzLiRhbmNob3IubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFuY2hvckhlaWdodCA9IHRoaXMuJGFuY2hvclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BhcnNlUG9pbnRzKCk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgJ21heC13aWR0aCc6IGAke25ld0VsZW1XaWR0aCAtIHBkbmdsIC0gcGRuZ3J9cHhgXG4gICAgfSk7XG5cbiAgICB2YXIgbmV3Q29udGFpbmVySGVpZ2h0ID0gdGhpcy4kZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgdGhpcy5jb250YWluZXJIZWlnaHQ7XG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuY3NzKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIikge1xuICAgICAgbmV3Q29udGFpbmVySGVpZ2h0ID0gMDtcbiAgICB9XG4gICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSBuZXdDb250YWluZXJIZWlnaHQ7XG4gICAgdGhpcy4kY29udGFpbmVyLmNzcyh7XG4gICAgICBoZWlnaHQ6IG5ld0NvbnRhaW5lckhlaWdodFxuICAgIH0pO1xuICAgIHRoaXMuZWxlbUhlaWdodCA9IG5ld0NvbnRhaW5lckhlaWdodDtcblxuICAgIGlmICghdGhpcy5pc1N0dWNrKSB7XG4gICAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtYXQtYm90dG9tJykpIHtcbiAgICAgICAgdmFyIGFuY2hvclB0ID0gKHRoaXMucG9pbnRzID8gdGhpcy5wb2ludHNbMV0gLSB0aGlzLiRjb250YWluZXIub2Zmc2V0KCkudG9wIDogdGhpcy5hbmNob3JIZWlnaHQpIC0gdGhpcy5lbGVtSGVpZ2h0O1xuICAgICAgICB0aGlzLiRlbGVtZW50LmNzcygndG9wJywgYW5jaG9yUHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3NldEJyZWFrUG9pbnRzKG5ld0NvbnRhaW5lckhlaWdodCwgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2IgJiYgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7IGNiKCk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB1cHBlciBhbmQgbG93ZXIgYnJlYWtwb2ludHMgZm9yIHRoZSBlbGVtZW50IHRvIGJlY29tZSBzdGlja3kvdW5zdGlja3kuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbGVtSGVpZ2h0IC0gcHggdmFsdWUgZm9yIHN0aWNreS4kZWxlbWVudCBoZWlnaHQsIGNhbGN1bGF0ZWQgYnkgYF9zZXRTaXplc2AuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGNvbXBsZXRpb24uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0QnJlYWtQb2ludHMoZWxlbUhlaWdodCwgY2IpIHtcbiAgICBpZiAoIXRoaXMuY2FuU3RpY2spIHtcbiAgICAgIGlmIChjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHsgY2IoKTsgfVxuICAgICAgZWxzZSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cbiAgICB2YXIgbVRvcCA9IGVtQ2FsYyh0aGlzLm9wdGlvbnMubWFyZ2luVG9wKSxcbiAgICAgICAgbUJ0bSA9IGVtQ2FsYyh0aGlzLm9wdGlvbnMubWFyZ2luQm90dG9tKSxcbiAgICAgICAgdG9wUG9pbnQgPSB0aGlzLnBvaW50cyA/IHRoaXMucG9pbnRzWzBdIDogdGhpcy4kYW5jaG9yLm9mZnNldCgpLnRvcCxcbiAgICAgICAgYm90dG9tUG9pbnQgPSB0aGlzLnBvaW50cyA/IHRoaXMucG9pbnRzWzFdIDogdG9wUG9pbnQgKyB0aGlzLmFuY2hvckhlaWdodCxcbiAgICAgICAgLy8gdG9wUG9pbnQgPSB0aGlzLiRhbmNob3Iub2Zmc2V0KCkudG9wIHx8IHRoaXMucG9pbnRzWzBdLFxuICAgICAgICAvLyBib3R0b21Qb2ludCA9IHRvcFBvaW50ICsgdGhpcy5hbmNob3JIZWlnaHQgfHwgdGhpcy5wb2ludHNbMV0sXG4gICAgICAgIHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3RpY2tUbyA9PT0gJ3RvcCcpIHtcbiAgICAgIHRvcFBvaW50IC09IG1Ub3A7XG4gICAgICBib3R0b21Qb2ludCAtPSAoZWxlbUhlaWdodCArIG1Ub3ApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnN0aWNrVG8gPT09ICdib3R0b20nKSB7XG4gICAgICB0b3BQb2ludCAtPSAod2luSGVpZ2h0IC0gKGVsZW1IZWlnaHQgKyBtQnRtKSk7XG4gICAgICBib3R0b21Qb2ludCAtPSAod2luSGVpZ2h0IC0gbUJ0bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vdGhpcyB3b3VsZCBiZSB0aGUgc3RpY2tUbzogYm90aCBvcHRpb24uLi4gdHJpY2t5XG4gICAgfVxuXG4gICAgdGhpcy50b3BQb2ludCA9IHRvcFBvaW50O1xuICAgIHRoaXMuYm90dG9tUG9pbnQgPSBib3R0b21Qb2ludDtcblxuICAgIGlmIChjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHsgY2IoKTsgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBjdXJyZW50IHN0aWNreSBlbGVtZW50LlxuICAgKiBSZXNldHMgdGhlIGVsZW1lbnQgdG8gdGhlIHRvcCBwb3NpdGlvbiBmaXJzdC5cbiAgICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMsIEpTLWFkZGVkIGNzcyBwcm9wZXJ0aWVzIGFuZCBjbGFzc2VzLCBhbmQgdW53cmFwcyB0aGUgJGVsZW1lbnQgaWYgdGhlIEpTIGFkZGVkIHRoZSAkY29udGFpbmVyLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuX3JlbW92ZVN0aWNreSh0cnVlKTtcblxuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7dGhpcy5vcHRpb25zLnN0aWNreUNsYXNzfSBpcy1hbmNob3JlZCBpcy1hdC10b3BgKVxuICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgIHRvcDogJycsXG4gICAgICAgICAgICAgICAgICAgYm90dG9tOiAnJyxcbiAgICAgICAgICAgICAgICAgICAnbWF4LXdpZHRoJzogJydcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgLm9mZigncmVzaXplbWUuemYudHJpZ2dlcicpXG4gICAgICAgICAgICAgICAgIC5vZmYoJ211dGF0ZW1lLnpmLnRyaWdnZXInKTtcbiAgICBpZiAodGhpcy4kYW5jaG9yICYmIHRoaXMuJGFuY2hvci5sZW5ndGgpIHtcbiAgICAgIHRoaXMuJGFuY2hvci5vZmYoJ2NoYW5nZS56Zi5zdGlja3knKTtcbiAgICB9XG4gICAgJCh3aW5kb3cpLm9mZih0aGlzLnNjcm9sbExpc3RlbmVyKTtcblxuICAgIGlmICh0aGlzLndhc1dyYXBwZWQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudW53cmFwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuY29udGFpbmVyQ2xhc3MpXG4gICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnJ1xuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblN0aWNreS5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEN1c3RvbWl6YWJsZSBjb250YWluZXIgdGVtcGxhdGUuIEFkZCB5b3VyIG93biBjbGFzc2VzIGZvciBzdHlsaW5nIGFuZCBzaXppbmcuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJyZsdDtkaXYgZGF0YS1zdGlja3ktY29udGFpbmVyJmd0OyZsdDsvZGl2Jmd0OydcbiAgICovXG4gIGNvbnRhaW5lcjogJzxkaXYgZGF0YS1zdGlja3ktY29udGFpbmVyPjwvZGl2PicsXG4gIC8qKlxuICAgKiBMb2NhdGlvbiBpbiB0aGUgdmlldyB0aGUgZWxlbWVudCBzdGlja3MgdG8uIENhbiBiZSBgJ3RvcCdgIG9yIGAnYm90dG9tJ2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3RvcCdcbiAgICovXG4gIHN0aWNrVG86ICd0b3AnLFxuICAvKipcbiAgICogSWYgYW5jaG9yZWQgdG8gYSBzaW5nbGUgZWxlbWVudCwgdGhlIGlkIG9mIHRoYXQgZWxlbWVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgYW5jaG9yOiAnJyxcbiAgLyoqXG4gICAqIElmIHVzaW5nIG1vcmUgdGhhbiBvbmUgZWxlbWVudCBhcyBhbmNob3IgcG9pbnRzLCB0aGUgaWQgb2YgdGhlIHRvcCBhbmNob3IuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIHRvcEFuY2hvcjogJycsXG4gIC8qKlxuICAgKiBJZiB1c2luZyBtb3JlIHRoYW4gb25lIGVsZW1lbnQgYXMgYW5jaG9yIHBvaW50cywgdGhlIGlkIG9mIHRoZSBib3R0b20gYW5jaG9yLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICBidG1BbmNob3I6ICcnLFxuICAvKipcbiAgICogTWFyZ2luLCBpbiBgZW1gJ3MgdG8gYXBwbHkgdG8gdGhlIHRvcCBvZiB0aGUgZWxlbWVudCB3aGVuIGl0IGJlY29tZXMgc3RpY2t5LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDFcbiAgICovXG4gIG1hcmdpblRvcDogMSxcbiAgLyoqXG4gICAqIE1hcmdpbiwgaW4gYGVtYCdzIHRvIGFwcGx5IHRvIHRoZSBib3R0b20gb2YgdGhlIGVsZW1lbnQgd2hlbiBpdCBiZWNvbWVzIHN0aWNreS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxXG4gICAqL1xuICBtYXJnaW5Cb3R0b206IDEsXG4gIC8qKlxuICAgKiBCcmVha3BvaW50IHN0cmluZyB0aGF0IGlzIHRoZSBtaW5pbXVtIHNjcmVlbiBzaXplIGFuIGVsZW1lbnQgc2hvdWxkIGJlY29tZSBzdGlja3kuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ21lZGl1bSdcbiAgICovXG4gIHN0aWNreU9uOiAnbWVkaXVtJyxcbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gc3RpY2t5IGVsZW1lbnQsIGFuZCByZW1vdmVkIG9uIGRlc3RydWN0aW9uLiBGb3VuZGF0aW9uIGRlZmF1bHRzIHRvIGBzdGlja3lgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdzdGlja3knXG4gICAqL1xuICBzdGlja3lDbGFzczogJ3N0aWNreScsXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHN0aWNreSBjb250YWluZXIuIEZvdW5kYXRpb24gZGVmYXVsdHMgdG8gYHN0aWNreS1jb250YWluZXJgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdzdGlja3ktY29udGFpbmVyJ1xuICAgKi9cbiAgY29udGFpbmVyQ2xhc3M6ICdzdGlja3ktY29udGFpbmVyJyxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBzY3JvbGwgZXZlbnRzIGJldHdlZW4gdGhlIHBsdWdpbidzIHJlY2FsY3VsYXRpbmcgc3RpY2t5IHBvaW50cy4gU2V0dGluZyBpdCB0byBgMGAgd2lsbCBjYXVzZSBpdCB0byByZWNhbGMgZXZlcnkgc2Nyb2xsIGV2ZW50LCBzZXR0aW5nIGl0IHRvIGAtMWAgd2lsbCBwcmV2ZW50IHJlY2FsYyBvbiBzY3JvbGwuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgLTFcbiAgICovXG4gIGNoZWNrRXZlcnk6IC0xXG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjYWxjdWxhdGUgZW0gdmFsdWVzXG4gKiBAcGFyYW0gTnVtYmVyIHtlbX0gLSBudW1iZXIgb2YgZW0ncyB0byBjYWxjdWxhdGUgaW50byBwaXhlbHNcbiAqL1xuZnVuY3Rpb24gZW1DYWxjKGVtKSB7XG4gIHJldHVybiBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5LCBudWxsKS5mb250U2l6ZSwgMTApICogZW07XG59XG5cbmV4cG9ydCB7U3RpY2t5fTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uc3RpY2t5LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgTW90aW9uIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubW90aW9uJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG5cbi8qKlxuICogVG9nZ2xlciBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24udG9nZ2xlclxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tb3Rpb25cbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqL1xuXG5jbGFzcyBUb2dnbGVyIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgVG9nZ2xlci5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIFRvZ2dsZXJcbiAgICogQGZpcmVzIFRvZ2dsZXIjaW5pdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gYWRkIHRoZSB0cmlnZ2VyIHRvLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBUb2dnbGVyLmRlZmF1bHRzLCBlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnJztcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdUb2dnbGVyJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICAvLyBUcmlnZ2VycyBpbml0IGlzIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQgaXMgaW5pdGlhbGl6ZWRcbiAgICBUcmlnZ2Vycy5pbml0KCQpO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBUb2dnbGVyIHBsdWdpbiBieSBwYXJzaW5nIHRoZSB0b2dnbGUgY2xhc3MgZnJvbSBkYXRhLXRvZ2dsZXIsIG9yIGFuaW1hdGlvbiBjbGFzc2VzIGZyb20gZGF0YS1hbmltYXRlLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBpbnB1dDtcbiAgICAvLyBQYXJzZSBhbmltYXRpb24gY2xhc3NlcyBpZiB0aGV5IHdlcmUgc2V0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRlKSB7XG4gICAgICBpbnB1dCA9IHRoaXMub3B0aW9ucy5hbmltYXRlLnNwbGl0KCcgJyk7XG5cbiAgICAgIHRoaXMuYW5pbWF0aW9uSW4gPSBpbnB1dFswXTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uT3V0ID0gaW5wdXRbMV0gfHwgbnVsbDtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlLCBwYXJzZSB0b2dnbGUgY2xhc3NcbiAgICBlbHNlIHtcbiAgICAgIGlucHV0ID0gdGhpcy4kZWxlbWVudC5kYXRhKCd0b2dnbGVyJyk7XG4gICAgICAvLyBBbGxvdyBmb3IgYSAuIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZ1xuICAgICAgdGhpcy5jbGFzc05hbWUgPSBpbnB1dFswXSA9PT0gJy4nID8gaW5wdXQuc2xpY2UoMSkgOiBpbnB1dDtcbiAgICB9XG5cbiAgICAvLyBBZGQgQVJJQSBhdHRyaWJ1dGVzIHRvIHRyaWdnZXJzXG4gICAgdmFyIGlkID0gdGhpcy4kZWxlbWVudFswXS5pZDtcbiAgICAkKGBbZGF0YS1vcGVuPVwiJHtpZH1cIl0sIFtkYXRhLWNsb3NlPVwiJHtpZH1cIl0sIFtkYXRhLXRvZ2dsZT1cIiR7aWR9XCJdYClcbiAgICAgIC5hdHRyKCdhcmlhLWNvbnRyb2xzJywgaWQpO1xuICAgIC8vIElmIHRoZSB0YXJnZXQgaXMgaGlkZGVuLCBhZGQgYXJpYS1oaWRkZW5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0aGlzLiRlbGVtZW50LmlzKCc6aGlkZGVuJykgPyBmYWxzZSA6IHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGV2ZW50cyBmb3IgdGhlIHRvZ2dsZSB0cmlnZ2VyLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvZ2dsZS56Zi50cmlnZ2VyJykub24oJ3RvZ2dsZS56Zi50cmlnZ2VyJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgdGFyZ2V0IGNsYXNzIG9uIHRoZSB0YXJnZXQgZWxlbWVudC4gQW4gZXZlbnQgaXMgZmlyZWQgZnJvbSB0aGUgb3JpZ2luYWwgdHJpZ2dlciBkZXBlbmRpbmcgb24gaWYgdGhlIHJlc3VsdGFudCBzdGF0ZSB3YXMgXCJvblwiIG9yIFwib2ZmXCIuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgVG9nZ2xlciNvblxuICAgKiBAZmlyZXMgVG9nZ2xlciNvZmZcbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzWyB0aGlzLm9wdGlvbnMuYW5pbWF0ZSA/ICdfdG9nZ2xlQW5pbWF0ZScgOiAnX3RvZ2dsZUNsYXNzJ10oKTtcbiAgfVxuXG4gIF90b2dnbGVDbGFzcygpIHtcbiAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3NOYW1lKTtcblxuICAgIHZhciBpc09uID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcyh0aGlzLmNsYXNzTmFtZSk7XG4gICAgaWYgKGlzT24pIHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgaWYgdGhlIHRhcmdldCBlbGVtZW50IGhhcyB0aGUgY2xhc3MgYWZ0ZXIgYSB0b2dnbGUuXG4gICAgICAgKiBAZXZlbnQgVG9nZ2xlciNvblxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29uLnpmLnRvZ2dsZXInKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIGlmIHRoZSB0YXJnZXQgZWxlbWVudCBkb2VzIG5vdCBoYXZlIHRoZSBjbGFzcyBhZnRlciBhIHRvZ2dsZS5cbiAgICAgICAqIEBldmVudCBUb2dnbGVyI29mZlxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29mZi56Zi50b2dnbGVyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlQVJJQShpc09uKTtcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLW11dGF0ZV0nKS50cmlnZ2VyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gIH1cblxuICBfdG9nZ2xlQW5pbWF0ZSgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgTW90aW9uLmFuaW1hdGVJbih0aGlzLiRlbGVtZW50LCB0aGlzLmFuaW1hdGlvbkluLCBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuX3VwZGF0ZUFSSUEodHJ1ZSk7XG4gICAgICAgIHRoaXMudHJpZ2dlcignb24uemYudG9nZ2xlcicpO1xuICAgICAgICB0aGlzLmZpbmQoJ1tkYXRhLW11dGF0ZV0nKS50cmlnZ2VyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBNb3Rpb24uYW5pbWF0ZU91dCh0aGlzLiRlbGVtZW50LCB0aGlzLmFuaW1hdGlvbk91dCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLl91cGRhdGVBUklBKGZhbHNlKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdvZmYuemYudG9nZ2xlcicpO1xuICAgICAgICB0aGlzLmZpbmQoJ1tkYXRhLW11dGF0ZV0nKS50cmlnZ2VyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfdXBkYXRlQVJJQShpc09uKSB7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPbiA/IHRydWUgOiBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGluc3RhbmNlIG9mIFRvZ2dsZXIgb24gdGhlIGVsZW1lbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50b2dnbGVyJyk7XG4gIH1cbn1cblxuVG9nZ2xlci5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFRlbGxzIHRoZSBwbHVnaW4gaWYgdGhlIGVsZW1lbnQgc2hvdWxkIGFuaW1hdGVkIHdoZW4gdG9nZ2xlZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFuaW1hdGU6IGZhbHNlXG59O1xuXG5leHBvcnQge1RvZ2dsZXJ9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50b2dnbGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==