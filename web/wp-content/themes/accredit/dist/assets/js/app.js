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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _whatInput = __webpack_require__(15);

var _whatInput2 = _interopRequireDefault(_whatInput);

__webpack_require__(16);

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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundation = __webpack_require__(17);

var _foundationUtil = __webpack_require__(1);

var _foundationUtil2 = __webpack_require__(7);

var _foundationUtil3 = __webpack_require__(9);

var _foundationUtil4 = __webpack_require__(4);

var _foundationUtil5 = __webpack_require__(3);

var _foundationUtil6 = __webpack_require__(6);

var _foundationUtil7 = __webpack_require__(8);

var _foundationUtil8 = __webpack_require__(18);

var _foundationUtil9 = __webpack_require__(19);

var _foundationUtil10 = __webpack_require__(5);

var _foundation2 = __webpack_require__(20);

var _foundation3 = __webpack_require__(10);

var _foundation4 = __webpack_require__(21);

var _foundation5 = __webpack_require__(11);

var _foundation6 = __webpack_require__(23);

var _foundation7 = __webpack_require__(24);

var _foundation8 = __webpack_require__(25);

var _foundation9 = __webpack_require__(26);

var _foundation10 = __webpack_require__(27);

var _foundation11 = __webpack_require__(29);

var _foundation12 = __webpack_require__(30);

var _foundation13 = __webpack_require__(12);

var _foundation14 = __webpack_require__(31);

var _foundation15 = __webpack_require__(32);

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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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

var _foundation = __webpack_require__(22);

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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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

var _foundation3 = __webpack_require__(28);

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
/* 28 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2E0NTlhZGI3MWQ0NzcwYzZhMDAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubW90aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5ib3guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm5lc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnNtb290aFNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudG91Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5hY2NvcmRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnBvc2l0aW9uYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmVxdWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmludGVyY2hhbmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ubWFnZWxsYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyaWxsZG93bi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVUb2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXZlYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zdGlja3kuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50b2dnbGVyLmpzIl0sIm5hbWVzIjpbInJ0bCIsImF0dHIiLCJHZXRZb0RpZ2l0cyIsImxlbmd0aCIsIm5hbWVzcGFjZSIsIk1hdGgiLCJyb3VuZCIsInBvdyIsInJhbmRvbSIsInRvU3RyaW5nIiwic2xpY2UiLCJ0cmFuc2l0aW9uZW5kIiwiJGVsZW0iLCJ0cmFuc2l0aW9ucyIsImVsZW0iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJlbmQiLCJ0Iiwic3R5bGUiLCJzZXRUaW1lb3V0IiwidHJpZ2dlckhhbmRsZXIiLCJQbHVnaW4iLCJlbGVtZW50Iiwib3B0aW9ucyIsIl9zZXR1cCIsInBsdWdpbk5hbWUiLCJnZXRQbHVnaW5OYW1lIiwidXVpZCIsIiRlbGVtZW50IiwiZGF0YSIsInRyaWdnZXIiLCJfZGVzdHJveSIsInJlbW92ZUF0dHIiLCJyZW1vdmVEYXRhIiwicHJvcCIsImh5cGhlbmF0ZSIsInN0ciIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsIm9iaiIsImNvbnN0cnVjdG9yIiwibmFtZSIsImNsYXNzTmFtZSIsImRlZmF1bHRRdWVyaWVzIiwibGFuZHNjYXBlIiwicG9ydHJhaXQiLCJyZXRpbmEiLCJtYXRjaE1lZGlhIiwid2luZG93Iiwic3R5bGVNZWRpYSIsIm1lZGlhIiwic2NyaXB0IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbmZvIiwidHlwZSIsImlkIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImdldENvbXB1dGVkU3R5bGUiLCJjdXJyZW50U3R5bGUiLCJtYXRjaE1lZGl1bSIsInRleHQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsInRleHRDb250ZW50Iiwid2lkdGgiLCJtYXRjaGVzIiwiTWVkaWFRdWVyeSIsInF1ZXJpZXMiLCJjdXJyZW50IiwiX2luaXQiLCJzZWxmIiwiJG1ldGEiLCJhcHBlbmRUbyIsImhlYWQiLCJleHRyYWN0ZWRTdHlsZXMiLCJjc3MiLCJuYW1lZFF1ZXJpZXMiLCJwYXJzZVN0eWxlVG9PYmplY3QiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJ2YWx1ZSIsIl9nZXRDdXJyZW50U2l6ZSIsIl93YXRjaGVyIiwiYXRMZWFzdCIsInNpemUiLCJxdWVyeSIsImdldCIsImlzIiwidHJpbSIsInNwbGl0IiwiaSIsIm1hdGNoZWQiLCJvZmYiLCJvbiIsIm5ld1NpemUiLCJjdXJyZW50U2l6ZSIsInN0eWxlT2JqZWN0IiwicmVkdWNlIiwicmV0IiwicGFyYW0iLCJwYXJ0cyIsInZhbCIsImRlY29kZVVSSUNvbXBvbmVudCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsImtleUNvZGVzIiwiY29tbWFuZHMiLCJmaW5kRm9jdXNhYmxlIiwiZmluZCIsImZpbHRlciIsInBhcnNlS2V5IiwiZXZlbnQiLCJ3aGljaCIsImtleUNvZGUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ0b1VwcGVyQ2FzZSIsInNoaWZ0S2V5IiwiY3RybEtleSIsImFsdEtleSIsIktleWJvYXJkIiwia2V5cyIsImdldEtleUNvZGVzIiwiaGFuZGxlS2V5IiwiY29tcG9uZW50IiwiZnVuY3Rpb25zIiwiY29tbWFuZExpc3QiLCJjbWRzIiwiY29tbWFuZCIsImZuIiwiY29uc29sZSIsIndhcm4iLCJsdHIiLCIkIiwiZXh0ZW5kIiwicmV0dXJuVmFsdWUiLCJhcHBseSIsImhhbmRsZWQiLCJ1bmhhbmRsZWQiLCJyZWdpc3RlciIsImNvbXBvbmVudE5hbWUiLCJ0cmFwRm9jdXMiLCIkZm9jdXNhYmxlIiwiJGZpcnN0Rm9jdXNhYmxlIiwiZXEiLCIkbGFzdEZvY3VzYWJsZSIsInRhcmdldCIsInByZXZlbnREZWZhdWx0IiwiZm9jdXMiLCJyZWxlYXNlRm9jdXMiLCJrY3MiLCJrIiwia2MiLCJNdXRhdGlvbk9ic2VydmVyIiwicHJlZml4ZXMiLCJ0cmlnZ2VycyIsImVsIiwiZm9yRWFjaCIsIlRyaWdnZXJzIiwiTGlzdGVuZXJzIiwiQmFzaWMiLCJHbG9iYWwiLCJJbml0aWFsaXplcnMiLCJvcGVuTGlzdGVuZXIiLCJjbG9zZUxpc3RlbmVyIiwidG9nZ2xlTGlzdGVuZXIiLCJjbG9zZWFibGVMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJhbmltYXRpb24iLCJNb3Rpb24iLCJhbmltYXRlT3V0IiwiZmFkZU91dCIsInRvZ2dsZUZvY3VzTGlzdGVuZXIiLCJhZGRPcGVuTGlzdGVuZXIiLCJhZGRDbG9zZUxpc3RlbmVyIiwiYWRkVG9nZ2xlTGlzdGVuZXIiLCJhZGRDbG9zZWFibGVMaXN0ZW5lciIsImFkZFRvZ2dsZUZvY3VzTGlzdGVuZXIiLCJyZXNpemVMaXN0ZW5lciIsIiRub2RlcyIsImVhY2giLCJzY3JvbGxMaXN0ZW5lciIsImNsb3NlTWVMaXN0ZW5lciIsInBsdWdpbklkIiwicGx1Z2luIiwicGx1Z2lucyIsIm5vdCIsIl90aGlzIiwiYWRkQ2xvc2VtZUxpc3RlbmVyIiwieWV0aUJveGVzIiwicGx1Z05hbWVzIiwiY29uY2F0IiwiZXJyb3IiLCJsaXN0ZW5lcnMiLCJtYXAiLCJqb2luIiwiZGVib3VuY2VHbG9iYWxMaXN0ZW5lciIsImRlYm91bmNlIiwibGlzdGVuZXIiLCJ0aW1lciIsImFyZ3MiLCJwcm90b3R5cGUiLCJjYWxsIiwiYXJndW1lbnRzIiwiY2xlYXJUaW1lb3V0IiwiYWRkUmVzaXplTGlzdGVuZXIiLCJhZGRTY3JvbGxMaXN0ZW5lciIsImFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIiLCJsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uIiwibXV0YXRpb25SZWNvcmRzTGlzdCIsIiR0YXJnZXQiLCJhdHRyaWJ1dGVOYW1lIiwicGFnZVlPZmZzZXQiLCJjbG9zZXN0IiwiZWxlbWVudE9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwic3VidHJlZSIsImF0dHJpYnV0ZUZpbHRlciIsImFkZFNpbXBsZUxpc3RlbmVycyIsIiRkb2N1bWVudCIsImFkZEdsb2JhbExpc3RlbmVycyIsImluaXQiLCJGb3VuZGF0aW9uIiwidHJpZ2dlcnNJbml0aWFsaXplZCIsInJlYWR5U3RhdGUiLCJJSGVhcllvdSIsImluaXRDbGFzc2VzIiwiYWN0aXZlQ2xhc3NlcyIsImFuaW1hdGVJbiIsImNiIiwiYW5pbWF0ZSIsIk1vdmUiLCJkdXJhdGlvbiIsImFuaW0iLCJwcm9nIiwic3RhcnQiLCJtb3ZlIiwidHMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImlzSW4iLCJpbml0Q2xhc3MiLCJhY3RpdmVDbGFzcyIsInJlc2V0IiwiYWRkQ2xhc3MiLCJzaG93Iiwib2Zmc2V0V2lkdGgiLCJvbmUiLCJmaW5pc2giLCJoaWRlIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwicmVtb3ZlQ2xhc3MiLCJCb3giLCJJbU5vdFRvdWNoaW5nWW91IiwiT3ZlcmxhcEFyZWEiLCJHZXREaW1lbnNpb25zIiwiR2V0T2Zmc2V0cyIsIkdldEV4cGxpY2l0T2Zmc2V0cyIsInBhcmVudCIsImxyT25seSIsInRiT25seSIsImlnbm9yZUJvdHRvbSIsImVsZURpbXMiLCJ0b3BPdmVyIiwiYm90dG9tT3ZlciIsImxlZnRPdmVyIiwicmlnaHRPdmVyIiwicGFyRGltcyIsImhlaWdodCIsIm9mZnNldCIsInRvcCIsImxlZnQiLCJ3aW5kb3dEaW1zIiwibWluIiwic3FydCIsIkVycm9yIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhclJlY3QiLCJ3aW5SZWN0IiwiYm9keSIsIndpblkiLCJ3aW5YIiwicGFnZVhPZmZzZXQiLCJwYXJlbnREaW1zIiwiYW5jaG9yIiwicG9zaXRpb24iLCJ2T2Zmc2V0IiwiaE9mZnNldCIsImlzT3ZlcmZsb3ciLCJsb2ciLCIkZWxlRGltcyIsIiRhbmNob3JEaW1zIiwiYWxpZ25tZW50IiwidG9wVmFsIiwibGVmdFZhbCIsIk5lc3QiLCJGZWF0aGVyIiwibWVudSIsIml0ZW1zIiwic3ViTWVudUNsYXNzIiwic3ViSXRlbUNsYXNzIiwiaGFzU3ViQ2xhc3MiLCJhcHBseUFyaWEiLCIkaXRlbSIsIiRzdWIiLCJjaGlsZHJlbiIsIkJ1cm4iLCJvbkltYWdlc0xvYWRlZCIsImltYWdlcyIsImNhbGxiYWNrIiwidW5sb2FkZWQiLCJjb21wbGV0ZSIsIm5hdHVyYWxXaWR0aCIsInNpbmdsZUltYWdlTG9hZGVkIiwiaW1hZ2UiLCJJbWFnZSIsImV2ZW50cyIsIm1lIiwic3JjIiwiQWNjb3JkaW9uTWVudSIsImRlZmF1bHRzIiwic2xpZGVVcCIsIm11bHRpT3BlbiIsIiRtZW51TGlua3MiLCJsaW5rSWQiLCJzdWJJZCIsImlzQWN0aXZlIiwiaGFzQ2xhc3MiLCJzdWJtZW51VG9nZ2xlIiwiYWZ0ZXIiLCJzdWJtZW51VG9nZ2xlVGV4dCIsImluaXRQYW5lcyIsImRvd24iLCJfZXZlbnRzIiwiJHN1Ym1lbnUiLCJ0b2dnbGUiLCIkZWxlbWVudHMiLCIkcHJldkVsZW1lbnQiLCIkbmV4dEVsZW1lbnQiLCJtYXgiLCJmaXJzdCIsInBhcmVudHMiLCJuZXh0Iiwib3BlbiIsImNsb3NlIiwidXAiLCJjbG9zZUFsbCIsImhpZGVBbGwiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJwYXJlbnRzVW50aWwiLCJhZGQiLCJwcmV2Iiwic2xpZGVEb3duIiwic2xpZGVTcGVlZCIsIiRtZW51cyIsImFkZEJhY2siLCJyZW1vdmUiLCJEcm9wZG93bk1lbnUiLCJzdWJzIiwiJG1lbnVJdGVtcyIsIiR0YWJzIiwidmVydGljYWxDbGFzcyIsInJpZ2h0Q2xhc3MiLCJjaGFuZ2VkIiwiaGFzVG91Y2giLCJvbnRvdWNoc3RhcnQiLCJwYXJDbGFzcyIsImhhbmRsZUNsaWNrRm4iLCJoYXNTdWIiLCJoYXNDbGlja2VkIiwiY2xvc2VPbkNsaWNrIiwiY2xpY2tPcGVuIiwiZm9yY2VGb2xsb3ciLCJfaGlkZSIsIl9zaG93IiwiY2xvc2VPbkNsaWNrSW5zaWRlIiwiZGlzYWJsZUhvdmVyIiwiaG92ZXJEZWxheSIsImF1dG9jbG9zZSIsImNsb3NpbmdUaW1lIiwiaXNUYWIiLCJpbmRleCIsInNpYmxpbmdzIiwibmV4dFNpYmxpbmciLCJwcmV2U2libGluZyIsIm9wZW5TdWIiLCJjbG9zZVN1YiIsIl9pc1ZlcnRpY2FsIiwiX2lzUnRsIiwicHJldmlvdXMiLCIkYm9keSIsIiRsaW5rIiwiaWR4IiwiJHNpYnMiLCJjbGVhciIsIm9sZENsYXNzIiwiJHBhcmVudExpIiwiX2FkZEJvZHlIYW5kbGVyIiwiJHRvQ2xvc2UiLCJzb21ldGhpbmdUb0Nsb3NlIiwiU21vb3RoU2Nyb2xsIiwiaGFuZGxlTGlua0NsaWNrIiwiYXJyaXZhbCIsImdldEF0dHJpYnV0ZSIsIl9pblRyYW5zaXRpb24iLCJzY3JvbGxUb0xvYyIsImxvYyIsInNjcm9sbFBvcyIsInRocmVzaG9sZCIsInN0b3AiLCJzY3JvbGxUb3AiLCJhbmltYXRpb25EdXJhdGlvbiIsImFuaW1hdGlvbkVhc2luZyIsImZvdW5kYXRpb24iLCJ0b2dnbGVDbGFzcyIsImFkZFRvSnF1ZXJ5IiwiVGltZXIiLCJUb3VjaCIsIkFjY29yZGlvbiIsIkRyb3Bkb3duIiwiRXF1YWxpemVyIiwiSW50ZXJjaGFuZ2UiLCJNYWdlbGxhbiIsIk9mZkNhbnZhcyIsIlJlc3BvbnNpdmVNZW51IiwiUmVzcG9uc2l2ZVRvZ2dsZSIsIlJldmVhbCIsIlN0aWNreSIsIlRvZ2dsZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiRk9VTkRBVElPTl9WRVJTSU9OIiwidmVyc2lvbiIsIl9wbHVnaW5zIiwiX3V1aWRzIiwiZnVuY3Rpb25OYW1lIiwiYXR0ck5hbWUiLCJyZWdpc3RlclBsdWdpbiIsInVucmVnaXN0ZXJQbHVnaW4iLCJzcGxpY2UiLCJpbmRleE9mIiwicmVJbml0IiwiaXNKUSIsImZucyIsInBsZ3MiLCJwIiwiT2JqZWN0IiwiZXJyIiwicmVmbG93IiwiJGVsIiwib3B0cyIsInRoaW5nIiwib3B0IiwicGFyc2VWYWx1ZSIsImVyIiwiZ2V0Rm5OYW1lIiwibWV0aG9kIiwiJG5vSlMiLCJwbHVnQ2xhc3MiLCJSZWZlcmVuY2VFcnJvciIsIlR5cGVFcnJvciIsInV0aWwiLCJ0aHJvdHRsZSIsImZ1bmMiLCJkZWxheSIsImNvbnRleHQiLCJEYXRlIiwibm93IiwiZ2V0VGltZSIsInZlbmRvcnMiLCJ2cCIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJsYXN0VGltZSIsIm5leHRUaW1lIiwicGVyZm9ybWFuY2UiLCJGdW5jdGlvbiIsImJpbmQiLCJvVGhpcyIsImFBcmdzIiwiZlRvQmluZCIsImZOT1AiLCJmQm91bmQiLCJmdW5jTmFtZVJlZ2V4IiwicmVzdWx0cyIsImV4ZWMiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJuYW1lU3BhY2UiLCJyZW1haW4iLCJpc1BhdXNlZCIsInJlc3RhcnQiLCJpbmZpbml0ZSIsInBhdXNlIiwic3RhcnRQb3NYIiwic3RhcnRQb3NZIiwic3RhcnRUaW1lIiwiZWxhcHNlZFRpbWUiLCJpc01vdmluZyIsIm9uVG91Y2hFbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Ub3VjaE1vdmUiLCJzcG90U3dpcGUiLCJ4IiwidG91Y2hlcyIsInBhZ2VYIiwieSIsInBhZ2VZIiwiZHgiLCJkeSIsImRpciIsImFicyIsIm1vdmVUaHJlc2hvbGQiLCJ0aW1lVGhyZXNob2xkIiwib25Ub3VjaFN0YXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInRlYXJkb3duIiwiU3BvdFN3aXBlIiwiZW5hYmxlZCIsImRvY3VtZW50RWxlbWVudCIsInNwZWNpYWwiLCJzd2lwZSIsInNldHVwIiwibm9vcCIsInNldHVwU3BvdFN3aXBlIiwic2V0dXBUb3VjaEhhbmRsZXIiLCJhZGRUb3VjaCIsImhhbmRsZVRvdWNoIiwiY2hhbmdlZFRvdWNoZXMiLCJldmVudFR5cGVzIiwidG91Y2hzdGFydCIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwic2ltdWxhdGVkRXZlbnQiLCJNb3VzZUV2ZW50Iiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiJGNvbnRlbnQiLCIkaW5pdEFjdGl2ZSIsImZpcnN0VGltZUluaXQiLCJfY2hlY2tEZWVwTGluayIsImxvY2F0aW9uIiwiaGFzaCIsIiRhbmNob3IiLCJkZWVwTGlua1NtdWRnZSIsImxvYWQiLCJkZWVwTGlua1NtdWRnZURlbGF5IiwiZGVlcExpbmsiLCIkdGFiQ29udGVudCIsIiRhIiwibXVsdGlFeHBhbmQiLCJ1cGRhdGVIaXN0b3J5IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2VTdGF0ZSIsImZpcnN0VGltZSIsIiRjdXJyZW50QWN0aXZlIiwiJGF1bnRzIiwiYWxsb3dBbGxDbG9zZWQiLCIkaWQiLCIkYW5jaG9ycyIsIl9zZXRDdXJyZW50QW5jaG9yIiwicGFyZW50Q2xhc3MiLCIkcGFyZW50IiwiJGN1cnJlbnRBbmNob3IiLCJtYXRjaCIsImhvcml6b250YWxQb3NpdGlvbiIsIl9zZXRQb3NpdGlvbiIsImhvdmVyIiwiYm9keURhdGEiLCJ3aGF0aW5wdXQiLCJ0aW1lb3V0IiwiaG92ZXJQYW5lIiwidmlzaWJsZUZvY3VzYWJsZUVsZW1lbnRzIiwiYXV0b0ZvY3VzIiwiUG9zaXRpb25hYmxlIiwicG9zaXRpb25DbGFzcyIsImFsbG93T3ZlcmxhcCIsImFsbG93Qm90dG9tT3ZlcmxhcCIsIlBPU0lUSU9OUyIsIlZFUlRJQ0FMX0FMSUdOTUVOVFMiLCJIT1JJWk9OVEFMX0FMSUdOTUVOVFMiLCJBTElHTk1FTlRTIiwibmV4dEl0ZW0iLCJpdGVtIiwiYXJyYXkiLCJjdXJyZW50SWR4IiwidHJpZWRQb3NpdGlvbnMiLCJfZ2V0RGVmYXVsdFBvc2l0aW9uIiwiX2dldERlZmF1bHRBbGlnbm1lbnQiLCJfYWxpZ25tZW50c0V4aGF1c3RlZCIsIl9yZWFsaWduIiwiX2FkZFRyaWVkUG9zaXRpb24iLCJpc0V4aGF1c3RlZCIsIl9nZXRWT2Zmc2V0IiwiX2dldEhPZmZzZXQiLCJvdmVybGFwcyIsIm1pbk92ZXJsYXAiLCJtaW5Db29yZGluYXRlcyIsIl9wb3NpdGlvbnNFeGhhdXN0ZWQiLCJvdmVybGFwIiwiX3JlcG9zaXRpb24iLCJlcUlkIiwiJHdhdGNoZWQiLCJoYXNOZXN0ZWQiLCJpc05lc3RlZCIsImlzT24iLCJfYmluZEhhbmRsZXIiLCJvblJlc2l6ZU1lQm91bmQiLCJfb25SZXNpemVNZSIsIm9uUG9zdEVxdWFsaXplZEJvdW5kIiwiX29uUG9zdEVxdWFsaXplZCIsImltZ3MiLCJ0b29TbWFsbCIsImVxdWFsaXplT24iLCJfY2hlY2tNUSIsIl9yZWZsb3ciLCJfcGF1c2VFdmVudHMiLCJlcXVhbGl6ZU9uU3RhY2siLCJfaXNTdGFja2VkIiwiZXF1YWxpemVCeVJvdyIsImdldEhlaWdodHNCeVJvdyIsImFwcGx5SGVpZ2h0QnlSb3ciLCJnZXRIZWlnaHRzIiwiYXBwbHlIZWlnaHQiLCJoZWlnaHRzIiwibGVuIiwib2Zmc2V0SGVpZ2h0IiwibGFzdEVsVG9wT2Zmc2V0IiwiZ3JvdXBzIiwiZ3JvdXAiLCJlbE9mZnNldFRvcCIsImoiLCJsbiIsImdyb3Vwc0lMZW5ndGgiLCJsZW5KIiwicnVsZXMiLCJjdXJyZW50UGF0aCIsIl9hZGRCcmVha3BvaW50cyIsIl9nZW5lcmF0ZVJ1bGVzIiwicnVsZSIsInBhdGgiLCJTUEVDSUFMX1FVRVJJRVMiLCJydWxlc0xpc3QiLCJub2RlTmFtZSIsInJlc3BvbnNlIiwiaHRtbCIsImNhbGNQb2ludHMiLCIkdGFyZ2V0cyIsIiRsaW5rcyIsIiRhY3RpdmUiLCJwYXJzZUludCIsInBvaW50cyIsIndpbkhlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiZG9jSGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiJHRhciIsInB0IiwidGFyZ2V0UG9pbnQiLCJlYXNpbmciLCJkZWVwTGlua2luZyIsIl91cGRhdGVBY3RpdmUiLCJfZGVlcExpbmtTY3JvbGwiLCJ3aW5Qb3MiLCJjdXJJZHgiLCJpc0Rvd24iLCJjdXJWaXNpYmxlIiwiY29udGVudENsYXNzZXMiLCJiYXNlIiwicmV2ZWFsIiwiJGxhc3RUcmlnZ2VyIiwiJHRyaWdnZXJzIiwibmVzdGVkIiwiY29udGVudElkIiwidHJhbnNpdGlvbiIsImNvbnRlbnRPdmVybGF5Iiwib3ZlcmxheSIsIm92ZXJsYXlQb3NpdGlvbiIsInNldEF0dHJpYnV0ZSIsIiRvdmVybGF5IiwiaW5zZXJ0QWZ0ZXIiLCJhcHBlbmQiLCJpc1JldmVhbGVkIiwiUmVnRXhwIiwicmV2ZWFsQ2xhc3MiLCJyZXZlYWxPbiIsIl9zZXRNUUNoZWNrZXIiLCJ0cmFuc2l0aW9uVGltZSIsIl9yZW1vdmVDb250ZW50Q2xhc3NlcyIsIl9oYW5kbGVLZXlib2FyZCIsImhhc1JldmVhbCIsIl9hZGRDb250ZW50Q2xhc3NlcyIsImFsbG93VXAiLCJhbGxvd0Rvd24iLCJsYXN0WSIsIm9yaWdpbmFsRXZlbnQiLCJmb3JjZVRvIiwic2Nyb2xsVG8iLCJjb250ZW50U2Nyb2xsIiwiX3N0b3BTY3JvbGxpbmciLCJfcmVjb3JkU2Nyb2xsYWJsZSIsIl9zdG9wU2Nyb2xsUHJvcGFnYXRpb24iLCJjYW52YXNGb2N1cyIsIk1lbnVQbHVnaW5zIiwiZHJvcGRvd24iLCJjc3NDbGFzcyIsImRyaWxsZG93biIsIkRyaWxsZG93biIsImFjY29yZGlvbiIsImN1cnJlbnRNcSIsImN1cnJlbnRQbHVnaW4iLCJydWxlc1RyZWUiLCJydWxlU2l6ZSIsInJ1bGVQbHVnaW4iLCJpc0VtcHR5T2JqZWN0IiwiX2NoZWNrTWVkaWFRdWVyaWVzIiwibWF0Y2hlZE1xIiwiZGVzdHJveSIsImF1dG9BcHBseUNsYXNzIiwiJHN1Ym1lbnVBbmNob3JzIiwiJHN1Ym1lbnVzIiwiX3ByZXBhcmVNZW51IiwiX3JlZ2lzdGVyRXZlbnRzIiwiX2tleWJvYXJkRXZlbnRzIiwicGFyZW50TGluayIsImNsb25lIiwicHJlcGVuZFRvIiwid3JhcCIsIiRtZW51IiwiJGJhY2siLCJiYWNrQnV0dG9uUG9zaXRpb24iLCJiYWNrQnV0dG9uIiwicHJlcGVuZCIsIl9iYWNrIiwiYXV0b0hlaWdodCIsIiR3cmFwcGVyIiwid3JhcHBlciIsImFuaW1hdGVIZWlnaHQiLCJfZ2V0TWF4RGltcyIsImNvbnRhaW5zIiwiX2hpZGVBbGwiLCJfc2Nyb2xsVG9wIiwiX3Jlc2l6ZSIsIiRzY3JvbGxUb3BFbGVtZW50Iiwic2Nyb2xsVG9wRWxlbWVudCIsInNjcm9sbFRvcE9mZnNldCIsInBhcmVudFN1Yk1lbnUiLCJibHVyIiwibWF4SGVpZ2h0IiwicmVzdWx0IiwibnVtT2ZFbGVtcyIsInVud3JhcCIsInRhcmdldElEIiwiJHRhcmdldE1lbnUiLCIkdG9nZ2xlciIsImlucHV0IiwiYW5pbWF0aW9uSW4iLCJhbmltYXRpb25PdXQiLCJfdXBkYXRlIiwiX3VwZGF0ZU1xSGFuZGxlciIsInRvZ2dsZU1lbnUiLCJoaWRlRm9yIiwiY2FjaGVkIiwibXEiLCJpc01vYmlsZSIsIm1vYmlsZVNuaWZmIiwiZnVsbFNjcmVlbiIsIl9tYWtlT3ZlcmxheSIsImRldGFjaCIsImFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlcyIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsIm1hcmdpbiIsIl91cGRhdGVQb3NpdGlvbiIsIl9oYW5kbGVTdGF0ZSIsIm11bHRpcGxlT3BlbmVkIiwiYWRkUmV2ZWFsT3BlbkNsYXNzZXMiLCJvcmlnaW5hbFNjcm9sbFBvcyIsImFmdGVyQW5pbWF0aW9uIiwiZm9jdXNhYmxlRWxlbWVudHMiLCJzaG93RGVsYXkiLCJfZXh0cmFIYW5kbGVycyIsImNsb3NlT25Fc2MiLCJmaW5pc2hVcCIsImhpZGVEZWxheSIsInJlc2V0T25DbG9zZSIsInRpdGxlIiwiaHJlZiIsImJ0bU9mZnNldFBjdCIsImlQaG9uZVNuaWZmIiwiYW5kcm9pZFNuaWZmIiwiJGNvbnRhaW5lciIsIndhc1dyYXBwZWQiLCJjb250YWluZXIiLCJjb250YWluZXJDbGFzcyIsInN0aWNreUNsYXNzIiwic2Nyb2xsQ291bnQiLCJjaGVja0V2ZXJ5IiwiaXNTdHVjayIsImNvbnRhaW5lckhlaWdodCIsImVsZW1IZWlnaHQiLCJfcGFyc2VQb2ludHMiLCJfc2V0U2l6ZXMiLCJzY3JvbGwiLCJfY2FsYyIsIl9yZW1vdmVTdGlja3kiLCJ0b3BQb2ludCIsInJldmVyc2UiLCJ0b3BBbmNob3IiLCJidG0iLCJidG1BbmNob3IiLCJwdHMiLCJicmVha3MiLCJwbGFjZSIsImNhblN0aWNrIiwiX2V2ZW50c0hhbmRsZXIiLCJfcGF1c2VMaXN0ZW5lcnMiLCJjaGVja1NpemVzIiwiYm90dG9tUG9pbnQiLCJfc2V0U3RpY2t5Iiwic3RpY2tUbyIsIm1yZ24iLCJub3RTdHVja1RvIiwiaXNUb3AiLCJzdGlja1RvVG9wIiwiYW5jaG9yUHQiLCJhbmNob3JIZWlnaHQiLCJ0b3BPckJvdHRvbSIsInN0aWNreU9uIiwibmV3RWxlbVdpZHRoIiwiY29tcCIsInBkbmdsIiwicGRuZ3IiLCJuZXdDb250YWluZXJIZWlnaHQiLCJfc2V0QnJlYWtQb2ludHMiLCJtVG9wIiwiZW1DYWxjIiwibWFyZ2luVG9wIiwibUJ0bSIsIm1hcmdpbkJvdHRvbSIsImJvdHRvbSIsImVtIiwiZm9udFNpemUiLCJfdXBkYXRlQVJJQSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7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Q0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0JBQWdCOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047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Ozs7OztBQU1BM0YsV0FBUztBQVBRLENBQW5COztRQVVRdU0sTyxHQUFBQSxPIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YTQ1OWFkYjcxZDQ3NzBjNmEwMCIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwialF1ZXJ5XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbi8vIENvcmUgRm91bmRhdGlvbiBVdGlsaXRpZXMsIHV0aWxpemVkIGluIGEgbnVtYmVyIG9mIHBsYWNlcy5cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gZm9yIFJUTCBzdXBwb3J0XG4gICAqL1xuZnVuY3Rpb24gcnRsKCkge1xuICByZXR1cm4gJCgnaHRtbCcpLmF0dHIoJ2RpcicpID09PSAncnRsJztcbn1cblxuLyoqXG4gKiByZXR1cm5zIGEgcmFuZG9tIGJhc2UtMzYgdWlkIHdpdGggbmFtZXNwYWNpbmdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCAtIG51bWJlciBvZiByYW5kb20gYmFzZS0zNiBkaWdpdHMgZGVzaXJlZC4gSW5jcmVhc2UgZm9yIG1vcmUgcmFuZG9tIHN0cmluZ3MuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIC0gbmFtZSBvZiBwbHVnaW4gdG8gYmUgaW5jb3Jwb3JhdGVkIGluIHVpZCwgb3B0aW9uYWwuXG4gKiBAZGVmYXVsdCB7U3RyaW5nfSAnJyAtIGlmIG5vIHBsdWdpbiBuYW1lIGlzIHByb3ZpZGVkLCBub3RoaW5nIGlzIGFwcGVuZGVkIHRvIHRoZSB1aWQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSAtIHVuaXF1ZSBpZFxuICovXG5mdW5jdGlvbiBHZXRZb0RpZ2l0cyhsZW5ndGgsIG5hbWVzcGFjZSl7XG4gIGxlbmd0aCA9IGxlbmd0aCB8fCA2O1xuICByZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5wb3coMzYsIGxlbmd0aCArIDEpIC0gTWF0aC5yYW5kb20oKSAqIE1hdGgucG93KDM2LCBsZW5ndGgpKSkudG9TdHJpbmcoMzYpLnNsaWNlKDEpICsgKG5hbWVzcGFjZSA/IGAtJHtuYW1lc3BhY2V9YCA6ICcnKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvbmVuZCgkZWxlbSl7XG4gIHZhciB0cmFuc2l0aW9ucyA9IHtcbiAgICAndHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnV2Via2l0VHJhbnNpdGlvbic6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAnTW96VHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnT1RyYW5zaXRpb24nOiAnb3RyYW5zaXRpb25lbmQnXG4gIH07XG4gIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBlbmQ7XG5cbiAgZm9yICh2YXIgdCBpbiB0cmFuc2l0aW9ucyl7XG4gICAgaWYgKHR5cGVvZiBlbGVtLnN0eWxlW3RdICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICBlbmQgPSB0cmFuc2l0aW9uc1t0XTtcbiAgICB9XG4gIH1cbiAgaWYoZW5kKXtcbiAgICByZXR1cm4gZW5kO1xuICB9ZWxzZXtcbiAgICBlbmQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkZWxlbS50cmlnZ2VySGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIFskZWxlbV0pO1xuICAgIH0sIDEpO1xuICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCc7XG4gIH1cbn1cblxuZXhwb3J0IHtydGwsIEdldFlvRGlnaXRzLCB0cmFuc2l0aW9uZW5kfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5jb3JlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuLy8gQWJzdHJhY3QgY2xhc3MgZm9yIHByb3ZpZGluZyBsaWZlY3ljbGUgaG9va3MuIEV4cGVjdCBwbHVnaW5zIHRvIGRlZmluZSBBVCBMRUFTVFxuLy8ge2Z1bmN0aW9ufSBfc2V0dXAgKHJlcGxhY2VzIHByZXZpb3VzIGNvbnN0cnVjdG9yKSxcbi8vIHtmdW5jdGlvbn0gX2Rlc3Ryb3kgKHJlcGxhY2VzIHByZXZpb3VzIGRlc3Ryb3kpXG5jbGFzcyBQbHVnaW4ge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9zZXR1cChlbGVtZW50LCBvcHRpb25zKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy51dWlkID0gR2V0WW9EaWdpdHMoNiwgcGx1Z2luTmFtZSk7XG5cbiAgICBpZighdGhpcy4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHRoaXMuJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgdGhpcy51dWlkKTsgfVxuICAgIGlmKCF0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyB0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgdGhpcyk7IH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGluaXRpYWxpemVkLlxuICAgICAqIEBldmVudCBQbHVnaW4jaW5pdFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGJlZW4gZGVzdHJveWVkLlxuICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgKi9cbiAgICAgICAgLnRyaWdnZXIoYGRlc3Ryb3llZC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gICAgZm9yKHZhciBwcm9wIGluIHRoaXMpe1xuICAgICAgdGhpc1twcm9wXSA9IG51bGw7Ly9jbGVhbiB1cCBzY3JpcHQgdG8gcHJlcCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgIH1cbiAgfVxufVxuXG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGx1Z2luTmFtZShvYmopIHtcbiAgaWYodHlwZW9mKG9iai5jb25zdHJ1Y3Rvci5uYW1lKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKG9iai5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKG9iai5jbGFzc05hbWUpO1xuICB9XG59XG5cbmV4cG9ydCB7UGx1Z2lufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucGx1Z2luLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vLyBEZWZhdWx0IHNldCBvZiBtZWRpYSBxdWVyaWVzXG5jb25zdCBkZWZhdWx0UXVlcmllcyA9IHtcbiAgJ2RlZmF1bHQnIDogJ29ubHkgc2NyZWVuJyxcbiAgbGFuZHNjYXBlIDogJ29ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSknLFxuICBwb3J0cmFpdCA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknLFxuICByZXRpbmEgOiAnb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogMi8xKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMTkyZHBpKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMmRwcHgpJ1xuICB9O1xuXG5cbi8vIG1hdGNoTWVkaWEoKSBwb2x5ZmlsbCAtIFRlc3QgYSBDU1MgbWVkaWEgdHlwZS9xdWVyeSBpbiBKUy5cbi8vIEF1dGhvcnMgJiBjb3B5cmlnaHQgKGMpIDIwMTI6IFNjb3R0IEplaGwsIFBhdWwgSXJpc2gsIE5pY2hvbGFzIFpha2FzLCBEYXZpZCBLbmlnaHQuIER1YWwgTUlUL0JTRCBsaWNlbnNlXG5sZXQgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhIHx8IChmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEZvciBicm93c2VycyB0aGF0IHN1cHBvcnQgbWF0Y2hNZWRpdW0gYXBpIHN1Y2ggYXMgSUUgOSBhbmQgd2Via2l0XG4gIHZhciBzdHlsZU1lZGlhID0gKHdpbmRvdy5zdHlsZU1lZGlhIHx8IHdpbmRvdy5tZWRpYSk7XG5cbiAgLy8gRm9yIHRob3NlIHRoYXQgZG9uJ3Qgc3VwcG9ydCBtYXRjaE1lZGl1bVxuICBpZiAoIXN0eWxlTWVkaWEpIHtcbiAgICB2YXIgc3R5bGUgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXG4gICAgc2NyaXB0ICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF0sXG4gICAgaW5mbyAgICAgICAgPSBudWxsO1xuXG4gICAgc3R5bGUudHlwZSAgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlLmlkICAgID0gJ21hdGNobWVkaWFqcy10ZXN0JztcblxuICAgIHNjcmlwdCAmJiBzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3R5bGUsIHNjcmlwdCk7XG5cbiAgICAvLyAnc3R5bGUuY3VycmVudFN0eWxlJyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICd3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZScgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgIGluZm8gPSAoJ2dldENvbXB1dGVkU3R5bGUnIGluIHdpbmRvdykgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUoc3R5bGUsIG51bGwpIHx8IHN0eWxlLmN1cnJlbnRTdHlsZTtcblxuICAgIHN0eWxlTWVkaWEgPSB7XG4gICAgICBtYXRjaE1lZGl1bShtZWRpYSkge1xuICAgICAgICB2YXIgdGV4dCA9IGBAbWVkaWEgJHttZWRpYX17ICNtYXRjaG1lZGlhanMtdGVzdCB7IHdpZHRoOiAxcHg7IH0gfWA7XG5cbiAgICAgICAgLy8gJ3N0eWxlLnN0eWxlU2hlZXQnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3N0eWxlLnRleHRDb250ZW50JyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gdGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZXN0IGlmIG1lZGlhIHF1ZXJ5IGlzIHRydWUgb3IgZmFsc2VcbiAgICAgICAgcmV0dXJuIGluZm8ud2lkdGggPT09ICcxcHgnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihtZWRpYSkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXRjaGVzOiBzdHlsZU1lZGlhLm1hdGNoTWVkaXVtKG1lZGlhIHx8ICdhbGwnKSxcbiAgICAgIG1lZGlhOiBtZWRpYSB8fCAnYWxsJ1xuICAgIH07XG4gIH1cbn0pKCk7XG5cbnZhciBNZWRpYVF1ZXJ5ID0ge1xuICBxdWVyaWVzOiBbXSxcblxuICBjdXJyZW50OiAnJyxcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1lZGlhIHF1ZXJ5IGhlbHBlciwgYnkgZXh0cmFjdGluZyB0aGUgYnJlYWtwb2ludCBsaXN0IGZyb20gdGhlIENTUyBhbmQgYWN0aXZhdGluZyB0aGUgYnJlYWtwb2ludCB3YXRjaGVyLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgJG1ldGEgPSAkKCdtZXRhLmZvdW5kYXRpb24tbXEnKTtcbiAgICBpZighJG1ldGEubGVuZ3RoKXtcbiAgICAgICQoJzxtZXRhIGNsYXNzPVwiZm91bmRhdGlvbi1tcVwiPicpLmFwcGVuZFRvKGRvY3VtZW50LmhlYWQpO1xuICAgIH1cblxuICAgIHZhciBleHRyYWN0ZWRTdHlsZXMgPSAkKCcuZm91bmRhdGlvbi1tcScpLmNzcygnZm9udC1mYW1pbHknKTtcbiAgICB2YXIgbmFtZWRRdWVyaWVzO1xuXG4gICAgbmFtZWRRdWVyaWVzID0gcGFyc2VTdHlsZVRvT2JqZWN0KGV4dHJhY3RlZFN0eWxlcyk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZWRRdWVyaWVzKSB7XG4gICAgICBpZihuYW1lZFF1ZXJpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBzZWxmLnF1ZXJpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHZhbHVlOiBgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7bmFtZWRRdWVyaWVzW2tleV19KWBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKTtcblxuICAgIHRoaXMuX3dhdGNoZXIoKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gaXMgYXQgbGVhc3QgYXMgd2lkZSBhcyBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGJyZWFrcG9pbnQgbWF0Y2hlcywgYGZhbHNlYCBpZiBpdCdzIHNtYWxsZXIuXG4gICAqL1xuICBhdExlYXN0KHNpemUpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLmdldChzaXplKTtcblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEocXVlcnkpLm1hdGNoZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHNjcmVlbiBtYXRjaGVzIHRvIGEgYnJlYWtwb2ludC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gTmFtZSBvZiB0aGUgYnJlYWtwb2ludCB0byBjaGVjaywgZWl0aGVyICdzbWFsbCBvbmx5JyBvciAnc21hbGwnLiBPbWl0dGluZyAnb25seScgZmFsbHMgYmFjayB0byB1c2luZyBhdExlYXN0KCkgbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgaWYgaXQgZG9lcyBub3QuXG4gICAqL1xuICBpcyhzaXplKSB7XG4gICAgc2l6ZSA9IHNpemUudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgaWYoc2l6ZS5sZW5ndGggPiAxICYmIHNpemVbMV0gPT09ICdvbmx5Jykge1xuICAgICAgaWYoc2l6ZVswXSA9PT0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKSkgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmF0TGVhc3Qoc2l6ZVswXSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgbWVkaWEgcXVlcnkgb2YgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGdldC5cbiAgICogQHJldHVybnMge1N0cmluZ3xudWxsfSAtIFRoZSBtZWRpYSBxdWVyeSBvZiB0aGUgYnJlYWtwb2ludCwgb3IgYG51bGxgIGlmIHRoZSBicmVha3BvaW50IGRvZXNuJ3QgZXhpc3QuXG4gICAqL1xuICBnZXQoc2l6ZSkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5xdWVyaWVzKSB7XG4gICAgICBpZih0aGlzLnF1ZXJpZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyaWVzW2ldO1xuICAgICAgICBpZiAoc2l6ZSA9PT0gcXVlcnkubmFtZSkgcmV0dXJuIHF1ZXJ5LnZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQgbmFtZSBieSB0ZXN0aW5nIGV2ZXJ5IGJyZWFrcG9pbnQgYW5kIHJldHVybmluZyB0aGUgbGFzdCBvbmUgdG8gbWF0Y2ggKHRoZSBiaWdnZXN0IG9uZSkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBOYW1lIG9mIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQuXG4gICAqL1xuICBfZ2V0Q3VycmVudFNpemUoKSB7XG4gICAgdmFyIG1hdGNoZWQ7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyaWVzW2ldO1xuXG4gICAgICBpZiAobWF0Y2hNZWRpYShxdWVyeS52YWx1ZSkubWF0Y2hlcykge1xuICAgICAgICBtYXRjaGVkID0gcXVlcnk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtYXRjaGVkID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIG1hdGNoZWQubmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIGJyZWFrcG9pbnQgd2F0Y2hlciwgd2hpY2ggZmlyZXMgYW4gZXZlbnQgb24gdGhlIHdpbmRvdyB3aGVuZXZlciB0aGUgYnJlYWtwb2ludCBjaGFuZ2VzLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF93YXRjaGVyKCkge1xuICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS56Zi5tZWRpYXF1ZXJ5Jykub24oJ3Jlc2l6ZS56Zi5tZWRpYXF1ZXJ5JywgKCkgPT4ge1xuICAgICAgdmFyIG5ld1NpemUgPSB0aGlzLl9nZXRDdXJyZW50U2l6ZSgpLCBjdXJyZW50U2l6ZSA9IHRoaXMuY3VycmVudDtcblxuICAgICAgaWYgKG5ld1NpemUgIT09IGN1cnJlbnRTaXplKSB7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgY3VycmVudCBtZWRpYSBxdWVyeVxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBuZXdTaXplO1xuXG4gICAgICAgIC8vIEJyb2FkY2FzdCB0aGUgbWVkaWEgcXVlcnkgY2hhbmdlIG9uIHRoZSB3aW5kb3dcbiAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIFtuZXdTaXplLCBjdXJyZW50U2l6ZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5cblxuLy8gVGhhbmsgeW91OiBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZ1xuZnVuY3Rpb24gcGFyc2VTdHlsZVRvT2JqZWN0KHN0cikge1xuICB2YXIgc3R5bGVPYmplY3QgPSB7fTtcblxuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3R5bGVPYmplY3Q7XG4gIH1cblxuICBzdHIgPSBzdHIudHJpbSgpLnNsaWNlKDEsIC0xKTsgLy8gYnJvd3NlcnMgcmUtcXVvdGUgc3RyaW5nIHN0eWxlIHZhbHVlc1xuXG4gIGlmICghc3RyKSB7XG4gICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICB9XG5cbiAgc3R5bGVPYmplY3QgPSBzdHIuc3BsaXQoJyYnKS5yZWR1Y2UoZnVuY3Rpb24ocmV0LCBwYXJhbSkge1xuICAgIHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG4gICAgdmFyIGtleSA9IHBhcnRzWzBdO1xuICAgIHZhciB2YWwgPSBwYXJ0c1sxXTtcbiAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcblxuICAgIC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG4gICAgLy8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuICAgIHZhbCA9IHZhbCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuXG4gICAgaWYgKCFyZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0W2tleV0gPSB2YWw7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldFtrZXldKSkge1xuICAgICAgcmV0W2tleV0ucHVzaCh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXRba2V5XSA9IFtyZXRba2V5XSwgdmFsXTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfSwge30pO1xuXG4gIHJldHVybiBzdHlsZU9iamVjdDtcbn1cblxuZXhwb3J0IHtNZWRpYVF1ZXJ5fTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5LmpzIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKiBUaGlzIHV0aWwgd2FzIGNyZWF0ZWQgYnkgTWFyaXVzIE9sYmVydHogKlxuICogUGxlYXNlIHRoYW5rIE1hcml1cyBvbiBHaXRIdWIgL293bGJlcnR6ICpcbiAqIG9yIHRoZSB3ZWIgaHR0cDovL3d3dy5tYXJpdXNvbGJlcnR6LmRlLyAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgcnRsIGFzIFJ0bCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgOTogJ1RBQicsXG4gIDEzOiAnRU5URVInLFxuICAyNzogJ0VTQ0FQRScsXG4gIDMyOiAnU1BBQ0UnLFxuICAzNTogJ0VORCcsXG4gIDM2OiAnSE9NRScsXG4gIDM3OiAnQVJST1dfTEVGVCcsXG4gIDM4OiAnQVJST1dfVVAnLFxuICAzOTogJ0FSUk9XX1JJR0hUJyxcbiAgNDA6ICdBUlJPV19ET1dOJ1xufVxuXG52YXIgY29tbWFuZHMgPSB7fVxuXG4vLyBGdW5jdGlvbnMgcHVsbGVkIG91dCB0byBiZSByZWZlcmVuY2VhYmxlIGZyb20gaW50ZXJuYWxzXG5mdW5jdGlvbiBmaW5kRm9jdXNhYmxlKCRlbGVtZW50KSB7XG4gIGlmKCEkZWxlbWVudCkge3JldHVybiBmYWxzZTsgfVxuICByZXR1cm4gJGVsZW1lbnQuZmluZCgnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgKlt0YWJpbmRleF0sICpbY29udGVudGVkaXRhYmxlXScpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICBpZiAoISQodGhpcykuaXMoJzp2aXNpYmxlJykgfHwgJCh0aGlzKS5hdHRyKCd0YWJpbmRleCcpIDwgMCkgeyByZXR1cm4gZmFsc2U7IH0gLy9vbmx5IGhhdmUgdmlzaWJsZSBlbGVtZW50cyBhbmQgdGhvc2UgdGhhdCBoYXZlIGEgdGFiaW5kZXggZ3JlYXRlciBvciBlcXVhbCAwXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJzZUtleShldmVudCkge1xuICB2YXIga2V5ID0ga2V5Q29kZXNbZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZV0gfHwgU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC53aGljaCkudG9VcHBlckNhc2UoKTtcblxuICAvLyBSZW1vdmUgdW4tcHJpbnRhYmxlIGNoYXJhY3RlcnMsIGUuZy4gZm9yIGBmcm9tQ2hhckNvZGVgIGNhbGxzIGZvciBDVFJMIG9ubHkgZXZlbnRzXG4gIGtleSA9IGtleS5yZXBsYWNlKC9cXFcrLywgJycpO1xuXG4gIGlmIChldmVudC5zaGlmdEtleSkga2V5ID0gYFNISUZUXyR7a2V5fWA7XG4gIGlmIChldmVudC5jdHJsS2V5KSBrZXkgPSBgQ1RSTF8ke2tleX1gO1xuICBpZiAoZXZlbnQuYWx0S2V5KSBrZXkgPSBgQUxUXyR7a2V5fWA7XG5cbiAgLy8gUmVtb3ZlIHRyYWlsaW5nIHVuZGVyc2NvcmUsIGluIGNhc2Ugb25seSBtb2RpZmllcnMgd2VyZSB1c2VkIChlLmcuIG9ubHkgYENUUkxfQUxUYClcbiAga2V5ID0ga2V5LnJlcGxhY2UoL18kLywgJycpO1xuXG4gIHJldHVybiBrZXk7XG59XG5cbnZhciBLZXlib2FyZCA9IHtcbiAga2V5czogZ2V0S2V5Q29kZXMoa2V5Q29kZXMpLFxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIChrZXlib2FyZCkgZXZlbnQgYW5kIHJldHVybnMgYSBTdHJpbmcgdGhhdCByZXByZXNlbnRzIGl0cyBrZXlcbiAgICogQ2FuIGJlIHVzZWQgbGlrZSBGb3VuZGF0aW9uLnBhcnNlS2V5KGV2ZW50KSA9PT0gRm91bmRhdGlvbi5rZXlzLlNQQUNFXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gdGhlIGV2ZW50IGdlbmVyYXRlZCBieSB0aGUgZXZlbnQgaGFuZGxlclxuICAgKiBAcmV0dXJuIFN0cmluZyBrZXkgLSBTdHJpbmcgdGhhdCByZXByZXNlbnRzIHRoZSBrZXkgcHJlc3NlZFxuICAgKi9cbiAgcGFyc2VLZXk6IHBhcnNlS2V5LFxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBnaXZlbiAoa2V5Ym9hcmQpIGV2ZW50XG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gdGhlIGV2ZW50IGdlbmVyYXRlZCBieSB0aGUgZXZlbnQgaGFuZGxlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50IC0gRm91bmRhdGlvbiBjb21wb25lbnQncyBuYW1lLCBlLmcuIFNsaWRlciBvciBSZXZlYWxcbiAgICogQHBhcmFtIHtPYmplY3RzfSBmdW5jdGlvbnMgLSBjb2xsZWN0aW9uIG9mIGZ1bmN0aW9ucyB0aGF0IGFyZSB0byBiZSBleGVjdXRlZFxuICAgKi9cbiAgaGFuZGxlS2V5KGV2ZW50LCBjb21wb25lbnQsIGZ1bmN0aW9ucykge1xuICAgIHZhciBjb21tYW5kTGlzdCA9IGNvbW1hbmRzW2NvbXBvbmVudF0sXG4gICAgICBrZXlDb2RlID0gdGhpcy5wYXJzZUtleShldmVudCksXG4gICAgICBjbWRzLFxuICAgICAgY29tbWFuZCxcbiAgICAgIGZuO1xuXG4gICAgaWYgKCFjb21tYW5kTGlzdCkgcmV0dXJuIGNvbnNvbGUud2FybignQ29tcG9uZW50IG5vdCBkZWZpbmVkIScpO1xuXG4gICAgaWYgKHR5cGVvZiBjb21tYW5kTGlzdC5sdHIgPT09ICd1bmRlZmluZWQnKSB7IC8vIHRoaXMgY29tcG9uZW50IGRvZXMgbm90IGRpZmZlcmVudGlhdGUgYmV0d2VlbiBsdHIgYW5kIHJ0bFxuICAgICAgICBjbWRzID0gY29tbWFuZExpc3Q7IC8vIHVzZSBwbGFpbiBsaXN0XG4gICAgfSBlbHNlIHsgLy8gbWVyZ2UgbHRyIGFuZCBydGw6IGlmIGRvY3VtZW50IGlzIHJ0bCwgcnRsIG92ZXJ3cml0ZXMgbHRyIGFuZCB2aWNlIHZlcnNhXG4gICAgICAgIGlmIChSdGwoKSkgY21kcyA9ICQuZXh0ZW5kKHt9LCBjb21tYW5kTGlzdC5sdHIsIGNvbW1hbmRMaXN0LnJ0bCk7XG5cbiAgICAgICAgZWxzZSBjbWRzID0gJC5leHRlbmQoe30sIGNvbW1hbmRMaXN0LnJ0bCwgY29tbWFuZExpc3QubHRyKTtcbiAgICB9XG4gICAgY29tbWFuZCA9IGNtZHNba2V5Q29kZV07XG5cbiAgICBmbiA9IGZ1bmN0aW9uc1tjb21tYW5kXTtcbiAgICBpZiAoZm4gJiYgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7IC8vIGV4ZWN1dGUgZnVuY3Rpb24gIGlmIGV4aXN0c1xuICAgICAgdmFyIHJldHVyblZhbHVlID0gZm4uYXBwbHkoKTtcbiAgICAgIGlmIChmdW5jdGlvbnMuaGFuZGxlZCB8fCB0eXBlb2YgZnVuY3Rpb25zLmhhbmRsZWQgPT09ICdmdW5jdGlvbicpIHsgLy8gZXhlY3V0ZSBmdW5jdGlvbiB3aGVuIGV2ZW50IHdhcyBoYW5kbGVkXG4gICAgICAgICAgZnVuY3Rpb25zLmhhbmRsZWQocmV0dXJuVmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZnVuY3Rpb25zLnVuaGFuZGxlZCB8fCB0eXBlb2YgZnVuY3Rpb25zLnVuaGFuZGxlZCA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBleGVjdXRlIGZ1bmN0aW9uIHdoZW4gZXZlbnQgd2FzIG5vdCBoYW5kbGVkXG4gICAgICAgICAgZnVuY3Rpb25zLnVuaGFuZGxlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRmluZHMgYWxsIGZvY3VzYWJsZSBlbGVtZW50cyB3aXRoaW4gdGhlIGdpdmVuIGAkZWxlbWVudGBcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBzZWFyY2ggd2l0aGluXG4gICAqIEByZXR1cm4ge2pRdWVyeX0gJGZvY3VzYWJsZSAtIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIGAkZWxlbWVudGBcbiAgICovXG5cbiAgZmluZEZvY3VzYWJsZTogZmluZEZvY3VzYWJsZSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IG5hbWUgbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50IC0gRm91bmRhdGlvbiBjb21wb25lbnQsIGUuZy4gU2xpZGVyIG9yIFJldmVhbFxuICAgKiBAcmV0dXJuIFN0cmluZyBjb21wb25lbnROYW1lXG4gICAqL1xuXG4gIHJlZ2lzdGVyKGNvbXBvbmVudE5hbWUsIGNtZHMpIHtcbiAgICBjb21tYW5kc1tjb21wb25lbnROYW1lXSA9IGNtZHM7XG4gIH0sXG5cblxuICAvLyBUT0RPOTQzODogVGhlc2UgcmVmZXJlbmNlcyB0byBLZXlib2FyZCBuZWVkIHRvIG5vdCByZXF1aXJlIGdsb2JhbC4gV2lsbCAndGhpcycgd29yayBpbiB0aGlzIGNvbnRleHQ/XG4gIC8vXG4gIC8qKlxuICAgKiBUcmFwcyB0aGUgZm9jdXMgaW4gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSAge2pRdWVyeX0gJGVsZW1lbnQgIGpRdWVyeSBvYmplY3QgdG8gdHJhcCB0aGUgZm91Y3MgaW50by5cbiAgICovXG4gIHRyYXBGb2N1cygkZWxlbWVudCkge1xuICAgIHZhciAkZm9jdXNhYmxlID0gZmluZEZvY3VzYWJsZSgkZWxlbWVudCksXG4gICAgICAgICRmaXJzdEZvY3VzYWJsZSA9ICRmb2N1c2FibGUuZXEoMCksXG4gICAgICAgICRsYXN0Rm9jdXNhYmxlID0gJGZvY3VzYWJsZS5lcSgtMSk7XG5cbiAgICAkZWxlbWVudC5vbigna2V5ZG93bi56Zi50cmFwZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gJGxhc3RGb2N1c2FibGVbMF0gJiYgcGFyc2VLZXkoZXZlbnQpID09PSAnVEFCJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PT0gJGZpcnN0Rm9jdXNhYmxlWzBdICYmIHBhcnNlS2V5KGV2ZW50KSA9PT0gJ1NISUZUX1RBQicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGxhc3RGb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIFJlbGVhc2VzIHRoZSB0cmFwcGVkIGZvY3VzIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSAge2pRdWVyeX0gJGVsZW1lbnQgIGpRdWVyeSBvYmplY3QgdG8gcmVsZWFzZSB0aGUgZm9jdXMgZm9yLlxuICAgKi9cbiAgcmVsZWFzZUZvY3VzKCRlbGVtZW50KSB7XG4gICAgJGVsZW1lbnQub2ZmKCdrZXlkb3duLnpmLnRyYXBmb2N1cycpO1xuICB9XG59XG5cbi8qXG4gKiBDb25zdGFudHMgZm9yIGVhc2llciBjb21wYXJpbmcuXG4gKiBDYW4gYmUgdXNlZCBsaWtlIEZvdW5kYXRpb24ucGFyc2VLZXkoZXZlbnQpID09PSBGb3VuZGF0aW9uLmtleXMuU1BBQ0VcbiAqL1xuZnVuY3Rpb24gZ2V0S2V5Q29kZXMoa2NzKSB7XG4gIHZhciBrID0ge307XG4gIGZvciAodmFyIGtjIGluIGtjcykga1trY3Nba2NdXSA9IGtjc1trY107XG4gIHJldHVybiBrO1xufVxuXG5leHBvcnQge0tleWJvYXJkfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZC5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IE1vdGlvbiB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1vdGlvbic7XG5cbmNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcHJlZml4ZXMgPSBbJ1dlYktpdCcsICdNb3onLCAnTycsICdNcycsICcnXTtcbiAgZm9yICh2YXIgaT0wOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYCR7cHJlZml4ZXNbaV19TXV0YXRpb25PYnNlcnZlcmAgaW4gd2luZG93KSB7XG4gICAgICByZXR1cm4gd2luZG93W2Ake3ByZWZpeGVzW2ldfU11dGF0aW9uT2JzZXJ2ZXJgXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSgpKTtcblxuY29uc3QgdHJpZ2dlcnMgPSAoZWwsIHR5cGUpID0+IHtcbiAgZWwuZGF0YSh0eXBlKS5zcGxpdCgnICcpLmZvckVhY2goaWQgPT4ge1xuICAgICQoYCMke2lkfWApWyB0eXBlID09PSAnY2xvc2UnID8gJ3RyaWdnZXInIDogJ3RyaWdnZXJIYW5kbGVyJ10oYCR7dHlwZX0uemYudHJpZ2dlcmAsIFtlbF0pO1xuICB9KTtcbn07XG5cbnZhciBUcmlnZ2VycyA9IHtcbiAgTGlzdGVuZXJzOiB7XG4gICAgQmFzaWM6IHt9LFxuICAgIEdsb2JhbDoge31cbiAgfSxcbiAgSW5pdGlhbGl6ZXJzOiB7fVxufVxuXG5UcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMgID0ge1xuICBvcGVuTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRyaWdnZXJzKCQodGhpcyksICdvcGVuJyk7XG4gIH0sXG4gIGNsb3NlTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnY2xvc2UnKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRyaWdnZXJzKCQodGhpcyksICdjbG9zZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICQodGhpcykudHJpZ2dlcignY2xvc2UuemYudHJpZ2dlcicpO1xuICAgIH1cbiAgfSxcbiAgdG9nZ2xlTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgndG9nZ2xlJyk7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0cmlnZ2VycygkKHRoaXMpLCAndG9nZ2xlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcykudHJpZ2dlcigndG9nZ2xlLnpmLnRyaWdnZXInKTtcbiAgICB9XG4gIH0sXG4gIGNsb3NlYWJsZUxpc3RlbmVyOiBmdW5jdGlvbihlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBsZXQgYW5pbWF0aW9uID0gJCh0aGlzKS5kYXRhKCdjbG9zYWJsZScpO1xuXG4gICAgaWYoYW5pbWF0aW9uICE9PSAnJyl7XG4gICAgICBNb3Rpb24uYW5pbWF0ZU91dCgkKHRoaXMpLCBhbmltYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlZC56ZicpO1xuICAgICAgfSk7XG4gICAgfWVsc2V7XG4gICAgICAkKHRoaXMpLmZhZGVPdXQoKS50cmlnZ2VyKCdjbG9zZWQuemYnKTtcbiAgICB9XG4gIH0sXG4gIHRvZ2dsZUZvY3VzTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgndG9nZ2xlLWZvY3VzJyk7XG4gICAgJChgIyR7aWR9YCkudHJpZ2dlckhhbmRsZXIoJ3RvZ2dsZS56Zi50cmlnZ2VyJywgWyQodGhpcyldKTtcbiAgfVxufTtcblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1vcGVuXSB3aWxsIHJldmVhbCBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRPcGVuTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLm9wZW5MaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdjbGljay56Zi50cmlnZ2VyJywgJ1tkYXRhLW9wZW5dJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLm9wZW5MaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2VdIHdpbGwgY2xvc2UgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG4vLyBJZiB1c2VkIHdpdGhvdXQgYSB2YWx1ZSBvbiBbZGF0YS1jbG9zZV0sIHRoZSBldmVudCB3aWxsIGJ1YmJsZSwgYWxsb3dpbmcgaXQgdG8gY2xvc2UgYSBwYXJlbnQgY29tcG9uZW50LlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1jbG9zZV0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtdG9nZ2xlXSB3aWxsIHRvZ2dsZSBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2NsaWNrLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMudG9nZ2xlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS10b2dnbGVdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUxpc3RlbmVyKTtcbn1cblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1jbG9zYWJsZV0gd2lsbCByZXNwb25kIHRvIGNsb3NlLnpmLnRyaWdnZXIgZXZlbnRzLlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlYWJsZUxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xvc2UuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZWFibGVMaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdjbG9zZS56Zi50cmlnZ2VyJywgJ1tkYXRhLWNsb3NlYWJsZV0sIFtkYXRhLWNsb3NhYmxlXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZWFibGVMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtdG9nZ2xlLWZvY3VzXSB3aWxsIHJlc3BvbmQgdG8gY29taW5nIGluIGFuZCBvdXQgb2YgZm9jdXNcblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVGb2N1c0xpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignZm9jdXMuemYudHJpZ2dlciBibHVyLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMudG9nZ2xlRm9jdXNMaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdmb2N1cy56Zi50cmlnZ2VyIGJsdXIuemYudHJpZ2dlcicsICdbZGF0YS10b2dnbGUtZm9jdXNdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUZvY3VzTGlzdGVuZXIpO1xufVxuXG5cblxuLy8gTW9yZSBHbG9iYWwvY29tcGxleCBsaXN0ZW5lcnMgYW5kIHRyaWdnZXJzXG5UcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsICA9IHtcbiAgcmVzaXplTGlzdGVuZXI6IGZ1bmN0aW9uKCRub2Rlcykge1xuICAgIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsvL2ZhbGxiYWNrIGZvciBJRSA5XG4gICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdyZXNpemVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIHJlc2l6ZSBldmVudFxuICAgICRub2Rlcy5hdHRyKCdkYXRhLWV2ZW50cycsIFwicmVzaXplXCIpO1xuICB9LFxuICBzY3JvbGxMaXN0ZW5lcjogZnVuY3Rpb24oJG5vZGVzKSB7XG4gICAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpey8vZmFsbGJhY2sgZm9yIElFIDlcbiAgICAgICRub2Rlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3Njcm9sbG1lLnpmLnRyaWdnZXInKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL3RyaWdnZXIgYWxsIGxpc3RlbmluZyBlbGVtZW50cyBhbmQgc2lnbmFsIGEgc2Nyb2xsIGV2ZW50XG4gICAgJG5vZGVzLmF0dHIoJ2RhdGEtZXZlbnRzJywgXCJzY3JvbGxcIik7XG4gIH0sXG4gIGNsb3NlTWVMaXN0ZW5lcjogZnVuY3Rpb24oZSwgcGx1Z2luSWQpe1xuICAgIGxldCBwbHVnaW4gPSBlLm5hbWVzcGFjZS5zcGxpdCgnLicpWzBdO1xuICAgIGxldCBwbHVnaW5zID0gJChgW2RhdGEtJHtwbHVnaW59XWApLm5vdChgW2RhdGEteWV0aS1ib3g9XCIke3BsdWdpbklkfVwiXWApO1xuXG4gICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xuICAgICAgX3RoaXMudHJpZ2dlckhhbmRsZXIoJ2Nsb3NlLnpmLnRyaWdnZXInLCBbX3RoaXNdKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBHbG9iYWwsIHBhcnNlcyB3aG9sZSBkb2N1bWVudC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZW1lTGlzdGVuZXIgPSBmdW5jdGlvbihwbHVnaW5OYW1lKSB7XG4gIHZhciB5ZXRpQm94ZXMgPSAkKCdbZGF0YS15ZXRpLWJveF0nKSxcbiAgICAgIHBsdWdOYW1lcyA9IFsnZHJvcGRvd24nLCAndG9vbHRpcCcsICdyZXZlYWwnXTtcblxuICBpZihwbHVnaW5OYW1lKXtcbiAgICBpZih0eXBlb2YgcGx1Z2luTmFtZSA9PT0gJ3N0cmluZycpe1xuICAgICAgcGx1Z05hbWVzLnB1c2gocGx1Z2luTmFtZSk7XG4gICAgfWVsc2UgaWYodHlwZW9mIHBsdWdpbk5hbWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwbHVnaW5OYW1lWzBdID09PSAnc3RyaW5nJyl7XG4gICAgICBwbHVnTmFtZXMuY29uY2F0KHBsdWdpbk5hbWUpO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5lcnJvcignUGx1Z2luIG5hbWVzIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgfVxuICBpZih5ZXRpQm94ZXMubGVuZ3RoKXtcbiAgICBsZXQgbGlzdGVuZXJzID0gcGx1Z05hbWVzLm1hcCgobmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIGBjbG9zZW1lLnpmLiR7bmFtZX1gO1xuICAgIH0pLmpvaW4oJyAnKTtcblxuICAgICQod2luZG93KS5vZmYobGlzdGVuZXJzKS5vbihsaXN0ZW5lcnMsIFRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwuY2xvc2VNZUxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCB0cmlnZ2VyLCBsaXN0ZW5lcikge1xuICBsZXQgdGltZXIsIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpO1xuICAkKHdpbmRvdykub2ZmKHRyaWdnZXIpLm9uKHRyaWdnZXIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAodGltZXIpIHsgY2xlYXJUaW1lb3V0KHRpbWVyKTsgfVxuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgbGlzdGVuZXIuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgZGVib3VuY2UgfHwgMTApOy8vZGVmYXVsdCB0aW1lIHRvIGVtaXQgc2Nyb2xsIGV2ZW50XG4gIH0pO1xufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkUmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbihkZWJvdW5jZSl7XG4gIGxldCAkbm9kZXMgPSAkKCdbZGF0YS1yZXNpemVdJyk7XG4gIGlmKCRub2Rlcy5sZW5ndGgpe1xuICAgIGRlYm91bmNlR2xvYmFsTGlzdGVuZXIoZGVib3VuY2UsICdyZXNpemUuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwucmVzaXplTGlzdGVuZXIsICRub2Rlcyk7XG4gIH1cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNjcm9sbExpc3RlbmVyID0gZnVuY3Rpb24oZGVib3VuY2Upe1xuICBsZXQgJG5vZGVzID0gJCgnW2RhdGEtc2Nyb2xsXScpO1xuICBpZigkbm9kZXMubGVuZ3RoKXtcbiAgICBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCAnc2Nyb2xsLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLnNjcm9sbExpc3RlbmVyLCAkbm9kZXMpO1xuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRNdXRhdGlvbkV2ZW50c0xpc3RlbmVyID0gZnVuY3Rpb24oJGVsZW0pIHtcbiAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpeyByZXR1cm4gZmFsc2U7IH1cbiAgbGV0ICRub2RlcyA9ICRlbGVtLmZpbmQoJ1tkYXRhLXJlc2l6ZV0sIFtkYXRhLXNjcm9sbF0sIFtkYXRhLW11dGF0ZV0nKTtcblxuICAvL2VsZW1lbnQgY2FsbGJhY2tcbiAgdmFyIGxpc3RlbmluZ0VsZW1lbnRzTXV0YXRpb24gPSBmdW5jdGlvbiAobXV0YXRpb25SZWNvcmRzTGlzdCkge1xuICAgIHZhciAkdGFyZ2V0ID0gJChtdXRhdGlvblJlY29yZHNMaXN0WzBdLnRhcmdldCk7XG5cbiAgICAvL3RyaWdnZXIgdGhlIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBlbGVtZW50IGRlcGVuZGluZyBvbiB0eXBlXG4gICAgc3dpdGNoIChtdXRhdGlvblJlY29yZHNMaXN0WzBdLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJhdHRyaWJ1dGVzXCI6XG4gICAgICAgIGlmICgkdGFyZ2V0LmF0dHIoXCJkYXRhLWV2ZW50c1wiKSA9PT0gXCJzY3JvbGxcIiAmJiBtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwiZGF0YS1ldmVudHNcIikge1xuICAgICAgICAgICR0YXJnZXQudHJpZ2dlckhhbmRsZXIoJ3Njcm9sbG1lLnpmLnRyaWdnZXInLCBbJHRhcmdldCwgd2luZG93LnBhZ2VZT2Zmc2V0XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCR0YXJnZXQuYXR0cihcImRhdGEtZXZlbnRzXCIpID09PSBcInJlc2l6ZVwiICYmIG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0uYXR0cmlidXRlTmFtZSA9PT0gXCJkYXRhLWV2ZW50c1wiKSB7XG4gICAgICAgICAgJHRhcmdldC50cmlnZ2VySGFuZGxlcigncmVzaXplbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0XSk7XG4gICAgICAgICB9XG4gICAgICAgIGlmIChtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikuYXR0cihcImRhdGEtZXZlbnRzXCIsXCJtdXRhdGVcIik7XG4gICAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS50cmlnZ2VySGFuZGxlcignbXV0YXRlbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpXSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJjaGlsZExpc3RcIjpcbiAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS5hdHRyKFwiZGF0YS1ldmVudHNcIixcIm11dGF0ZVwiKTtcbiAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS50cmlnZ2VySGFuZGxlcignbXV0YXRlbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpXSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAvL25vdGhpbmdcbiAgICB9XG4gIH07XG5cbiAgaWYgKCRub2Rlcy5sZW5ndGgpIHtcbiAgICAvL2ZvciBlYWNoIGVsZW1lbnQgdGhhdCBuZWVkcyB0byBsaXN0ZW4gZm9yIHJlc2l6aW5nLCBzY3JvbGxpbmcsIG9yIG11dGF0aW9uIGFkZCBhIHNpbmdsZSBvYnNlcnZlclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9ICRub2Rlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIHZhciBlbGVtZW50T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uKTtcbiAgICAgIGVsZW1lbnRPYnNlcnZlci5vYnNlcnZlKCRub2Rlc1tpXSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IGZhbHNlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFtcImRhdGEtZXZlbnRzXCIsIFwic3R5bGVcIl0gfSk7XG4gICAgfVxuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTaW1wbGVMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgbGV0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRPcGVuTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFRvZ2dsZUxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZWFibGVMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lcigkZG9jdW1lbnQpO1xuXG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRHbG9iYWxMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgbGV0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkTXV0YXRpb25FdmVudHNMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkUmVzaXplTGlzdGVuZXIoKTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNjcm9sbExpc3RlbmVyKCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZW1lTGlzdGVuZXIoKTtcbn1cblxuXG5UcmlnZ2Vycy5pbml0ID0gZnVuY3Rpb24oJCwgRm91bmRhdGlvbikge1xuICBpZiAodHlwZW9mKCQudHJpZ2dlcnNJbml0aWFsaXplZCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGV0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4gICAgaWYoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2ltcGxlTGlzdGVuZXJzKCk7XG4gICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQod2luZG93KS5vbignbG9hZCcsICgpID0+IHtcbiAgICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNpbXBsZUxpc3RlbmVycygpO1xuICAgICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgICQudHJpZ2dlcnNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBpZihGb3VuZGF0aW9uKSB7XG4gICAgRm91bmRhdGlvbi5UcmlnZ2VycyA9IFRyaWdnZXJzO1xuICAgIC8vIExlZ2FjeSBpbmNsdWRlZCB0byBiZSBiYWNrd2FyZHMgY29tcGF0aWJsZSBmb3Igbm93LlxuICAgIEZvdW5kYXRpb24uSUhlYXJZb3UgPSBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzXG4gIH1cbn1cblxuZXhwb3J0IHtUcmlnZ2Vyc307XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyB0cmFuc2l0aW9uZW5kIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5cbi8qKlxuICogTW90aW9uIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5tb3Rpb25cbiAqL1xuXG5jb25zdCBpbml0Q2xhc3NlcyAgID0gWydtdWktZW50ZXInLCAnbXVpLWxlYXZlJ107XG5jb25zdCBhY3RpdmVDbGFzc2VzID0gWydtdWktZW50ZXItYWN0aXZlJywgJ211aS1sZWF2ZS1hY3RpdmUnXTtcblxuY29uc3QgTW90aW9uID0ge1xuICBhbmltYXRlSW46IGZ1bmN0aW9uKGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpIHtcbiAgICBhbmltYXRlKHRydWUsIGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpO1xuICB9LFxuXG4gIGFuaW1hdGVPdXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpIHtcbiAgICBhbmltYXRlKGZhbHNlLCBlbGVtZW50LCBhbmltYXRpb24sIGNiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBNb3ZlKGR1cmF0aW9uLCBlbGVtLCBmbil7XG4gIHZhciBhbmltLCBwcm9nLCBzdGFydCA9IG51bGw7XG4gIC8vIGNvbnNvbGUubG9nKCdjYWxsZWQnKTtcblxuICBpZiAoZHVyYXRpb24gPT09IDApIHtcbiAgICBmbi5hcHBseShlbGVtKTtcbiAgICBlbGVtLnRyaWdnZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pLnRyaWdnZXJIYW5kbGVyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKHRzKXtcbiAgICBpZighc3RhcnQpIHN0YXJ0ID0gdHM7XG4gICAgLy8gY29uc29sZS5sb2coc3RhcnQsIHRzKTtcbiAgICBwcm9nID0gdHMgLSBzdGFydDtcbiAgICBmbi5hcHBseShlbGVtKTtcblxuICAgIGlmKHByb2cgPCBkdXJhdGlvbil7IGFuaW0gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmUsIGVsZW0pOyB9XG4gICAgZWxzZXtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltKTtcbiAgICAgIGVsZW0udHJpZ2dlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSkudHJpZ2dlckhhbmRsZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pO1xuICAgIH1cbiAgfVxuICBhbmltID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtb3ZlKTtcbn1cblxuLyoqXG4gKiBBbmltYXRlcyBhbiBlbGVtZW50IGluIG9yIG91dCB1c2luZyBhIENTUyB0cmFuc2l0aW9uIGNsYXNzLlxuICogQGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCb29sZWFufSBpc0luIC0gRGVmaW5lcyBpZiB0aGUgYW5pbWF0aW9uIGlzIGluIG9yIG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9yIEhUTUwgb2JqZWN0IHRvIGFuaW1hdGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gYW5pbWF0aW9uIC0gQ1NTIGNsYXNzIHRvIHVzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gQ2FsbGJhY2sgdG8gcnVuIHdoZW4gYW5pbWF0aW9uIGlzIGZpbmlzaGVkLlxuICovXG5mdW5jdGlvbiBhbmltYXRlKGlzSW4sIGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpIHtcbiAgZWxlbWVudCA9ICQoZWxlbWVudCkuZXEoMCk7XG5cbiAgaWYgKCFlbGVtZW50Lmxlbmd0aCkgcmV0dXJuO1xuXG4gIHZhciBpbml0Q2xhc3MgPSBpc0luID8gaW5pdENsYXNzZXNbMF0gOiBpbml0Q2xhc3Nlc1sxXTtcbiAgdmFyIGFjdGl2ZUNsYXNzID0gaXNJbiA/IGFjdGl2ZUNsYXNzZXNbMF0gOiBhY3RpdmVDbGFzc2VzWzFdO1xuXG4gIC8vIFNldCB1cCB0aGUgYW5pbWF0aW9uXG4gIHJlc2V0KCk7XG5cbiAgZWxlbWVudFxuICAgIC5hZGRDbGFzcyhhbmltYXRpb24pXG4gICAgLmNzcygndHJhbnNpdGlvbicsICdub25lJyk7XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBlbGVtZW50LmFkZENsYXNzKGluaXRDbGFzcyk7XG4gICAgaWYgKGlzSW4pIGVsZW1lbnQuc2hvdygpO1xuICB9KTtcblxuICAvLyBTdGFydCB0aGUgYW5pbWF0aW9uXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgZWxlbWVudFswXS5vZmZzZXRXaWR0aDtcbiAgICBlbGVtZW50XG4gICAgICAuY3NzKCd0cmFuc2l0aW9uJywgJycpXG4gICAgICAuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICB9KTtcblxuICAvLyBDbGVhbiB1cCB0aGUgYW5pbWF0aW9uIHdoZW4gaXQgZmluaXNoZXNcbiAgZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZChlbGVtZW50KSwgZmluaXNoKTtcblxuICAvLyBIaWRlcyB0aGUgZWxlbWVudCAoZm9yIG91dCBhbmltYXRpb25zKSwgcmVzZXRzIHRoZSBlbGVtZW50LCBhbmQgcnVucyBhIGNhbGxiYWNrXG4gIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICBpZiAoIWlzSW4pIGVsZW1lbnQuaGlkZSgpO1xuICAgIHJlc2V0KCk7XG4gICAgaWYgKGNiKSBjYi5hcHBseShlbGVtZW50KTtcbiAgfVxuXG4gIC8vIFJlc2V0cyB0cmFuc2l0aW9ucyBhbmQgcmVtb3ZlcyBtb3Rpb24tc3BlY2lmaWMgY2xhc3Nlc1xuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBlbGVtZW50WzBdLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IDA7XG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyhgJHtpbml0Q2xhc3N9ICR7YWN0aXZlQ2xhc3N9ICR7YW5pbWF0aW9ufWApO1xuICB9XG59XG5cbmV4cG9ydCB7TW92ZSwgTW90aW9ufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1vdGlvbi5qcyIsIid1c2Ugc3RyaWN0JztcblxuXG5pbXBvcnQgeyBydGwgYXMgUnRsIH0gZnJvbSBcIi4vZm91bmRhdGlvbi51dGlsLmNvcmVcIjtcblxudmFyIEJveCA9IHtcbiAgSW1Ob3RUb3VjaGluZ1lvdTogSW1Ob3RUb3VjaGluZ1lvdSxcbiAgT3ZlcmxhcEFyZWE6IE92ZXJsYXBBcmVhLFxuICBHZXREaW1lbnNpb25zOiBHZXREaW1lbnNpb25zLFxuICBHZXRPZmZzZXRzOiBHZXRPZmZzZXRzLFxuICBHZXRFeHBsaWNpdE9mZnNldHM6IEdldEV4cGxpY2l0T2Zmc2V0c1xufVxuXG4vKipcbiAqIENvbXBhcmVzIHRoZSBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQgdG8gYSBjb250YWluZXIgYW5kIGRldGVybWluZXMgY29sbGlzaW9uIGV2ZW50cyB3aXRoIGNvbnRhaW5lci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIHRlc3QgZm9yIGNvbGxpc2lvbnMuXG4gKiBAcGFyYW0ge2pRdWVyeX0gcGFyZW50IC0galF1ZXJ5IG9iamVjdCB0byB1c2UgYXMgYm91bmRpbmcgY29udGFpbmVyLlxuICogQHBhcmFtIHtCb29sZWFufSBsck9ubHkgLSBzZXQgdG8gdHJ1ZSB0byBjaGVjayBsZWZ0IGFuZCByaWdodCB2YWx1ZXMgb25seS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGJPbmx5IC0gc2V0IHRvIHRydWUgdG8gY2hlY2sgdG9wIGFuZCBib3R0b20gdmFsdWVzIG9ubHkuXG4gKiBAZGVmYXVsdCBpZiBubyBwYXJlbnQgb2JqZWN0IHBhc3NlZCwgZGV0ZWN0cyBjb2xsaXNpb25zIHdpdGggYHdpbmRvd2AuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIGNvbGxpc2lvbiBmcmVlLCBmYWxzZSBpZiBhIGNvbGxpc2lvbiBpbiBhbnkgZGlyZWN0aW9uLlxuICovXG5mdW5jdGlvbiBJbU5vdFRvdWNoaW5nWW91KGVsZW1lbnQsIHBhcmVudCwgbHJPbmx5LCB0Yk9ubHksIGlnbm9yZUJvdHRvbSkge1xuICByZXR1cm4gT3ZlcmxhcEFyZWEoZWxlbWVudCwgcGFyZW50LCBsck9ubHksIHRiT25seSwgaWdub3JlQm90dG9tKSA9PT0gMDtcbn07XG5cbmZ1bmN0aW9uIE92ZXJsYXBBcmVhKGVsZW1lbnQsIHBhcmVudCwgbHJPbmx5LCB0Yk9ubHksIGlnbm9yZUJvdHRvbSkge1xuICB2YXIgZWxlRGltcyA9IEdldERpbWVuc2lvbnMoZWxlbWVudCksXG4gIHRvcE92ZXIsIGJvdHRvbU92ZXIsIGxlZnRPdmVyLCByaWdodE92ZXI7XG4gIGlmIChwYXJlbnQpIHtcbiAgICB2YXIgcGFyRGltcyA9IEdldERpbWVuc2lvbnMocGFyZW50KTtcblxuICAgIGJvdHRvbU92ZXIgPSAocGFyRGltcy5oZWlnaHQgKyBwYXJEaW1zLm9mZnNldC50b3ApIC0gKGVsZURpbXMub2Zmc2V0LnRvcCArIGVsZURpbXMuaGVpZ2h0KTtcbiAgICB0b3BPdmVyICAgID0gZWxlRGltcy5vZmZzZXQudG9wIC0gcGFyRGltcy5vZmZzZXQudG9wO1xuICAgIGxlZnRPdmVyICAgPSBlbGVEaW1zLm9mZnNldC5sZWZ0IC0gcGFyRGltcy5vZmZzZXQubGVmdDtcbiAgICByaWdodE92ZXIgID0gKHBhckRpbXMud2lkdGggKyBwYXJEaW1zLm9mZnNldC5sZWZ0KSAtIChlbGVEaW1zLm9mZnNldC5sZWZ0ICsgZWxlRGltcy53aWR0aCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYm90dG9tT3ZlciA9IChlbGVEaW1zLndpbmRvd0RpbXMuaGVpZ2h0ICsgZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC50b3ApIC0gKGVsZURpbXMub2Zmc2V0LnRvcCArIGVsZURpbXMuaGVpZ2h0KTtcbiAgICB0b3BPdmVyICAgID0gZWxlRGltcy5vZmZzZXQudG9wIC0gZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC50b3A7XG4gICAgbGVmdE92ZXIgICA9IGVsZURpbXMub2Zmc2V0LmxlZnQgLSBlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LmxlZnQ7XG4gICAgcmlnaHRPdmVyICA9IGVsZURpbXMud2luZG93RGltcy53aWR0aCAtIChlbGVEaW1zLm9mZnNldC5sZWZ0ICsgZWxlRGltcy53aWR0aCk7XG4gIH1cblxuICBib3R0b21PdmVyID0gaWdub3JlQm90dG9tID8gMCA6IE1hdGgubWluKGJvdHRvbU92ZXIsIDApO1xuICB0b3BPdmVyICAgID0gTWF0aC5taW4odG9wT3ZlciwgMCk7XG4gIGxlZnRPdmVyICAgPSBNYXRoLm1pbihsZWZ0T3ZlciwgMCk7XG4gIHJpZ2h0T3ZlciAgPSBNYXRoLm1pbihyaWdodE92ZXIsIDApO1xuXG4gIGlmIChsck9ubHkpIHtcbiAgICByZXR1cm4gbGVmdE92ZXIgKyByaWdodE92ZXI7XG4gIH1cbiAgaWYgKHRiT25seSkge1xuICAgIHJldHVybiB0b3BPdmVyICsgYm90dG9tT3ZlcjtcbiAgfVxuXG4gIC8vIHVzZSBzdW0gb2Ygc3F1YXJlcyBiL2Mgd2UgY2FyZSBhYm91dCBvdmVybGFwIGFyZWEuXG4gIHJldHVybiBNYXRoLnNxcnQoKHRvcE92ZXIgKiB0b3BPdmVyKSArIChib3R0b21PdmVyICogYm90dG9tT3ZlcikgKyAobGVmdE92ZXIgKiBsZWZ0T3ZlcikgKyAocmlnaHRPdmVyICogcmlnaHRPdmVyKSk7XG59XG5cbi8qKlxuICogVXNlcyBuYXRpdmUgbWV0aG9kcyB0byByZXR1cm4gYW4gb2JqZWN0IG9mIGRpbWVuc2lvbiB2YWx1ZXMuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7alF1ZXJ5IHx8IEhUTUx9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IG9yIERPTSBlbGVtZW50IGZvciB3aGljaCB0byBnZXQgdGhlIGRpbWVuc2lvbnMuIENhbiBiZSBhbnkgZWxlbWVudCBvdGhlciB0aGF0IGRvY3VtZW50IG9yIHdpbmRvdy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IC0gbmVzdGVkIG9iamVjdCBvZiBpbnRlZ2VyIHBpeGVsIHZhbHVlc1xuICogVE9ETyAtIGlmIGVsZW1lbnQgaXMgd2luZG93LCByZXR1cm4gb25seSB0aG9zZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIEdldERpbWVuc2lvbnMoZWxlbSl7XG4gIGVsZW0gPSBlbGVtLmxlbmd0aCA/IGVsZW1bMF0gOiBlbGVtO1xuXG4gIGlmIChlbGVtID09PSB3aW5kb3cgfHwgZWxlbSA9PT0gZG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJJ20gc29ycnksIERhdmUuIEknbSBhZnJhaWQgSSBjYW4ndCBkbyB0aGF0LlwiKTtcbiAgfVxuXG4gIHZhciByZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHBhclJlY3QgPSBlbGVtLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB3aW5SZWN0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHdpblkgPSB3aW5kb3cucGFnZVlPZmZzZXQsXG4gICAgICB3aW5YID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodCxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHRvcDogcmVjdC50b3AgKyB3aW5ZLFxuICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luWFxuICAgIH0sXG4gICAgcGFyZW50RGltczoge1xuICAgICAgd2lkdGg6IHBhclJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IHBhclJlY3QuaGVpZ2h0LFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHRvcDogcGFyUmVjdC50b3AgKyB3aW5ZLFxuICAgICAgICBsZWZ0OiBwYXJSZWN0LmxlZnQgKyB3aW5YXG4gICAgICB9XG4gICAgfSxcbiAgICB3aW5kb3dEaW1zOiB7XG4gICAgICB3aWR0aDogd2luUmVjdC53aWR0aCxcbiAgICAgIGhlaWdodDogd2luUmVjdC5oZWlnaHQsXG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgdG9wOiB3aW5ZLFxuICAgICAgICBsZWZ0OiB3aW5YXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3Qgb2YgdG9wIGFuZCBsZWZ0IGludGVnZXIgcGl4ZWwgdmFsdWVzIGZvciBkeW5hbWljYWxseSByZW5kZXJlZCBlbGVtZW50cyxcbiAqIHN1Y2ggYXM6IFRvb2x0aXAsIFJldmVhbCwgYW5kIERyb3Bkb3duLiBNYWludGFpbmVkIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSwgYW5kIHdoZXJlXG4gKiB5b3UgZG9uJ3Qga25vdyBhbGlnbm1lbnQsIGJ1dCBnZW5lcmFsbHkgZnJvbVxuICogNi40IGZvcndhcmQgeW91IHNob3VsZCB1c2UgR2V0RXhwbGljaXRPZmZzZXRzLCBhcyBHZXRPZmZzZXRzIGNvbmZsYXRlcyBwb3NpdGlvbiBhbmQgYWxpZ25tZW50LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgZm9yIHRoZSBlbGVtZW50IGJlaW5nIHBvc2l0aW9uZWQuXG4gKiBAcGFyYW0ge2pRdWVyeX0gYW5jaG9yIC0galF1ZXJ5IG9iamVjdCBmb3IgdGhlIGVsZW1lbnQncyBhbmNob3IgcG9pbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcG9zaXRpb24gLSBhIHN0cmluZyByZWxhdGluZyB0byB0aGUgZGVzaXJlZCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudCwgcmVsYXRpdmUgdG8gaXQncyBhbmNob3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB2T2Zmc2V0IC0gaW50ZWdlciBwaXhlbCB2YWx1ZSBvZiBkZXNpcmVkIHZlcnRpY2FsIHNlcGFyYXRpb24gYmV0d2VlbiBhbmNob3IgYW5kIGVsZW1lbnQuXG4gKiBAcGFyYW0ge051bWJlcn0gaE9mZnNldCAtIGludGVnZXIgcGl4ZWwgdmFsdWUgb2YgZGVzaXJlZCBob3Jpem9udGFsIHNlcGFyYXRpb24gYmV0d2VlbiBhbmNob3IgYW5kIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzT3ZlcmZsb3cgLSBpZiBhIGNvbGxpc2lvbiBldmVudCBpcyBkZXRlY3RlZCwgc2V0cyB0byB0cnVlIHRvIGRlZmF1bHQgdGhlIGVsZW1lbnQgdG8gZnVsbCB3aWR0aCAtIGFueSBkZXNpcmVkIG9mZnNldC5cbiAqIFRPRE8gYWx0ZXIvcmV3cml0ZSB0byB3b3JrIHdpdGggYGVtYCB2YWx1ZXMgYXMgd2VsbC9pbnN0ZWFkIG9mIHBpeGVsc1xuICovXG5mdW5jdGlvbiBHZXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgcG9zaXRpb24sIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpIHtcbiAgY29uc29sZS5sb2coXCJOT1RFOiBHZXRPZmZzZXRzIGlzIGRlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgR2V0RXhwbGljaXRPZmZzZXRzIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gNi41XCIpO1xuICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIHJldHVybiBSdGwoKSA/XG4gICAgICAgIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsICd0b3AnLCAnbGVmdCcsIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpIDpcbiAgICAgICAgR2V0RXhwbGljaXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgJ3RvcCcsICdyaWdodCcsIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpO1xuICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICByZXR1cm4gUnRsKCkgP1xuICAgICAgICBHZXRFeHBsaWNpdE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCAnYm90dG9tJywgJ2xlZnQnLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KSA6XG4gICAgICAgIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsICdib3R0b20nLCAncmlnaHQnLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KTtcbiAgICBjYXNlICdjZW50ZXIgdG9wJzpcbiAgICAgIHJldHVybiBHZXRFeHBsaWNpdE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCAndG9wJywgJ2NlbnRlcicsIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpO1xuICAgIGNhc2UgJ2NlbnRlciBib3R0b20nOlxuICAgICAgcmV0dXJuIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsICdib3R0b20nLCAnY2VudGVyJywgdk9mZnNldCwgaE9mZnNldCwgaXNPdmVyZmxvdyk7XG4gICAgY2FzZSAnY2VudGVyIGxlZnQnOlxuICAgICAgcmV0dXJuIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsICdsZWZ0JywgJ2NlbnRlcicsIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpO1xuICAgIGNhc2UgJ2NlbnRlciByaWdodCc6XG4gICAgICByZXR1cm4gR2V0RXhwbGljaXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgJ3JpZ2h0JywgJ2NlbnRlcicsIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpO1xuICAgIGNhc2UgJ2xlZnQgYm90dG9tJzpcbiAgICAgIHJldHVybiBHZXRFeHBsaWNpdE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCAnYm90dG9tJywgJ2xlZnQnLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KTtcbiAgICBjYXNlICdyaWdodCBib3R0b20nOlxuICAgICAgcmV0dXJuIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsICdib3R0b20nLCAncmlnaHQnLCB2T2Zmc2V0LCBoT2Zmc2V0LCBpc092ZXJmbG93KTtcbiAgICAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4uLiB0aGlzIGFsb25nIHdpdGggdGhlIHJldmVhbCBhbmQgcmV2ZWFsIGZ1bGxcbiAgICAvLyBjbGFzc2VzIGFyZSB0aGUgb25seSBvbmVzIHRoYXQgZGlkbid0IHJlZmVyZW5jZSBhbmNob3JcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogKCRlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LmxlZnQgKyAoJGVsZURpbXMud2luZG93RGltcy53aWR0aCAvIDIpKSAtICgkZWxlRGltcy53aWR0aCAvIDIpICsgaE9mZnNldCxcbiAgICAgICAgdG9wOiAoJGVsZURpbXMud2luZG93RGltcy5vZmZzZXQudG9wICsgKCRlbGVEaW1zLndpbmRvd0RpbXMuaGVpZ2h0IC8gMikpIC0gKCRlbGVEaW1zLmhlaWdodCAvIDIgKyB2T2Zmc2V0KVxuICAgICAgfVxuICAgIGNhc2UgJ3JldmVhbCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAoJGVsZURpbXMud2luZG93RGltcy53aWR0aCAtICRlbGVEaW1zLndpZHRoKSAvIDIgKyBoT2Zmc2V0LFxuICAgICAgICB0b3A6ICRlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcCArIHZPZmZzZXRcbiAgICAgIH1cbiAgICBjYXNlICdyZXZlYWwgZnVsbCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAkZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC5sZWZ0LFxuICAgICAgICB0b3A6ICRlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IChSdGwoKSA/ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0IC0gJGVsZURpbXMud2lkdGggKyAkYW5jaG9yRGltcy53aWR0aCAtIGhPZmZzZXQ6ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgaE9mZnNldCksXG4gICAgICAgIHRvcDogJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArICRhbmNob3JEaW1zLmhlaWdodCArIHZPZmZzZXRcbiAgICAgIH1cblxuICB9XG5cbn1cblxuZnVuY3Rpb24gR2V0RXhwbGljaXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgcG9zaXRpb24sIGFsaWdubWVudCwgdk9mZnNldCwgaE9mZnNldCwgaXNPdmVyZmxvdykge1xuICB2YXIgJGVsZURpbXMgPSBHZXREaW1lbnNpb25zKGVsZW1lbnQpLFxuICAgICAgJGFuY2hvckRpbXMgPSBhbmNob3IgPyBHZXREaW1lbnNpb25zKGFuY2hvcikgOiBudWxsO1xuXG4gICAgICB2YXIgdG9wVmFsLCBsZWZ0VmFsO1xuXG4gIC8vIHNldCBwb3NpdGlvbiByZWxhdGVkIGF0dHJpYnV0ZVxuXG4gIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICBjYXNlICd0b3AnOlxuICAgICAgdG9wVmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LnRvcCAtICgkZWxlRGltcy5oZWlnaHQgKyB2T2Zmc2V0KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICB0b3BWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgJGFuY2hvckRpbXMuaGVpZ2h0ICsgdk9mZnNldDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgbGVmdFZhbCA9ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0IC0gKCRlbGVEaW1zLndpZHRoICsgaE9mZnNldCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyaWdodCc6XG4gICAgICBsZWZ0VmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgKyAkYW5jaG9yRGltcy53aWR0aCArIGhPZmZzZXQ7XG4gICAgICBicmVhaztcbiAgfVxuXG5cbiAgLy8gc2V0IGFsaWdubWVudCByZWxhdGVkIGF0dHJpYnV0ZVxuICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgc3dpdGNoIChhbGlnbm1lbnQpIHtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgbGVmdFZhbCA9ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgaE9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIGxlZnRWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCAtICRlbGVEaW1zLndpZHRoICsgJGFuY2hvckRpbXMud2lkdGggLSBoT2Zmc2V0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgIGxlZnRWYWwgPSBpc092ZXJmbG93ID8gaE9mZnNldCA6ICgoJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgKyAoJGFuY2hvckRpbXMud2lkdGggLyAyKSkgLSAoJGVsZURpbXMud2lkdGggLyAyKSkgKyBoT2Zmc2V0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmlnaHQnOlxuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgc3dpdGNoIChhbGlnbm1lbnQpIHtcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICB0b3BWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQudG9wIC0gdk9mZnNldCArICRhbmNob3JEaW1zLmhlaWdodCAtICRlbGVEaW1zLmhlaWdodDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICB0b3BWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgdk9mZnNldFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgIHRvcFZhbCA9ICgkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgdk9mZnNldCArICgkYW5jaG9yRGltcy5oZWlnaHQgLyAyKSkgLSAoJGVsZURpbXMuaGVpZ2h0IC8gMilcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiB7dG9wOiB0b3BWYWwsIGxlZnQ6IGxlZnRWYWx9O1xufVxuXG5leHBvcnQge0JveH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuYm94LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5jb25zdCBOZXN0ID0ge1xuICBGZWF0aGVyKG1lbnUsIHR5cGUgPSAnemYnKSB7XG4gICAgbWVudS5hdHRyKCdyb2xlJywgJ21lbnViYXInKTtcblxuICAgIHZhciBpdGVtcyA9IG1lbnUuZmluZCgnbGknKS5hdHRyKHsncm9sZSc6ICdtZW51aXRlbSd9KSxcbiAgICAgICAgc3ViTWVudUNsYXNzID0gYGlzLSR7dHlwZX0tc3VibWVudWAsXG4gICAgICAgIHN1Ykl0ZW1DbGFzcyA9IGAke3N1Yk1lbnVDbGFzc30taXRlbWAsXG4gICAgICAgIGhhc1N1YkNsYXNzID0gYGlzLSR7dHlwZX0tc3VibWVudS1wYXJlbnRgLFxuICAgICAgICBhcHBseUFyaWEgPSAodHlwZSAhPT0gJ2FjY29yZGlvbicpOyAvLyBBY2NvcmRpb25zIGhhbmRsZSB0aGVpciBvd24gQVJJQSBhdHRyaXV0ZXMuXG5cbiAgICBpdGVtcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRpdGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAkc3ViID0gJGl0ZW0uY2hpbGRyZW4oJ3VsJyk7XG5cbiAgICAgIGlmICgkc3ViLmxlbmd0aCkge1xuICAgICAgICAkaXRlbS5hZGRDbGFzcyhoYXNTdWJDbGFzcyk7XG4gICAgICAgICRzdWIuYWRkQ2xhc3MoYHN1Ym1lbnUgJHtzdWJNZW51Q2xhc3N9YCkuYXR0cih7J2RhdGEtc3VibWVudSc6ICcnfSk7XG4gICAgICAgIGlmKGFwcGx5QXJpYSkge1xuICAgICAgICAgICRpdGVtLmF0dHIoe1xuICAgICAgICAgICAgJ2FyaWEtaGFzcG9wdXAnOiB0cnVlLFxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiAkaXRlbS5jaGlsZHJlbignYTpmaXJzdCcpLnRleHQoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIE5vdGU6ICBEcmlsbGRvd25zIGJlaGF2ZSBkaWZmZXJlbnRseSBpbiBob3cgdGhleSBoaWRlLCBhbmQgc28gbmVlZFxuICAgICAgICAgIC8vIGFkZGl0aW9uYWwgYXR0cmlidXRlcy4gIFdlIHNob3VsZCBsb29rIGlmIHRoaXMgcG9zc2libHkgb3Zlci1nZW5lcmFsaXplZFxuICAgICAgICAgIC8vIHV0aWxpdHkgKE5lc3QpIGlzIGFwcHJvcHJpYXRlIHdoZW4gd2UgcmV3b3JrIG1lbnVzIGluIDYuNFxuICAgICAgICAgIGlmKHR5cGUgPT09ICdkcmlsbGRvd24nKSB7XG4gICAgICAgICAgICAkaXRlbS5hdHRyKHsnYXJpYS1leHBhbmRlZCc6IGZhbHNlfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICRzdWJcbiAgICAgICAgICAuYWRkQ2xhc3MoYHN1Ym1lbnUgJHtzdWJNZW51Q2xhc3N9YClcbiAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAnZGF0YS1zdWJtZW51JzogJycsXG4gICAgICAgICAgICAncm9sZSc6ICdtZW51J1xuICAgICAgICAgIH0pO1xuICAgICAgICBpZih0eXBlID09PSAnZHJpbGxkb3duJykge1xuICAgICAgICAgICRzdWIuYXR0cih7J2FyaWEtaGlkZGVuJzogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkaXRlbS5wYXJlbnQoJ1tkYXRhLXN1Ym1lbnVdJykubGVuZ3RoKSB7XG4gICAgICAgICRpdGVtLmFkZENsYXNzKGBpcy1zdWJtZW51LWl0ZW0gJHtzdWJJdGVtQ2xhc3N9YCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm47XG4gIH0sXG5cbiAgQnVybihtZW51LCB0eXBlKSB7XG4gICAgdmFyIC8vaXRlbXMgPSBtZW51LmZpbmQoJ2xpJyksXG4gICAgICAgIHN1Yk1lbnVDbGFzcyA9IGBpcy0ke3R5cGV9LXN1Ym1lbnVgLFxuICAgICAgICBzdWJJdGVtQ2xhc3MgPSBgJHtzdWJNZW51Q2xhc3N9LWl0ZW1gLFxuICAgICAgICBoYXNTdWJDbGFzcyA9IGBpcy0ke3R5cGV9LXN1Ym1lbnUtcGFyZW50YDtcblxuICAgIG1lbnVcbiAgICAgIC5maW5kKCc+bGksIC5tZW51LCAubWVudSA+IGxpJylcbiAgICAgIC5yZW1vdmVDbGFzcyhgJHtzdWJNZW51Q2xhc3N9ICR7c3ViSXRlbUNsYXNzfSAke2hhc1N1YkNsYXNzfSBpcy1zdWJtZW51LWl0ZW0gc3VibWVudSBpcy1hY3RpdmVgKVxuICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc3VibWVudScpLmNzcygnZGlzcGxheScsICcnKTtcblxuICB9XG59XG5cbmV4cG9ydCB7TmVzdH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubmVzdC5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBSdW5zIGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBpbWFnZXMgYXJlIGZ1bGx5IGxvYWRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZXMgLSBJbWFnZShzKSB0byBjaGVjayBpZiBsb2FkZWQuXG4gKiBAcGFyYW0ge0Z1bmN9IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGltYWdlIGlzIGZ1bGx5IGxvYWRlZC5cbiAqL1xuZnVuY3Rpb24gb25JbWFnZXNMb2FkZWQoaW1hZ2VzLCBjYWxsYmFjayl7XG4gIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHVubG9hZGVkID0gaW1hZ2VzLmxlbmd0aDtcblxuICBpZiAodW5sb2FkZWQgPT09IDApIHtcbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgaW1hZ2VzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAvLyBDaGVjayBpZiBpbWFnZSBpcyBsb2FkZWRcbiAgICBpZiAodGhpcy5jb21wbGV0ZSAmJiB0aGlzLm5hdHVyYWxXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzaW5nbGVJbWFnZUxvYWRlZCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSBhYm92ZSBjaGVjayBmYWlsZWQsIHNpbXVsYXRlIGxvYWRpbmcgb24gZGV0YWNoZWQgZWxlbWVudC5cbiAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgLy8gU3RpbGwgY291bnQgaW1hZ2UgYXMgbG9hZGVkIGlmIGl0IGZpbmFsaXplcyB3aXRoIGFuIGVycm9yLlxuICAgICAgdmFyIGV2ZW50cyA9IFwibG9hZC56Zi5pbWFnZXMgZXJyb3IuemYuaW1hZ2VzXCI7XG4gICAgICAkKGltYWdlKS5vbmUoZXZlbnRzLCBmdW5jdGlvbiBtZShldmVudCl7XG4gICAgICAgIC8vIFVuYmluZCB0aGUgZXZlbnQgbGlzdGVuZXJzLiBXZSdyZSB1c2luZyAnb25lJyBidXQgb25seSBvbmUgb2YgdGhlIHR3byBldmVudHMgd2lsbCBoYXZlIGZpcmVkLlxuICAgICAgICAkKHRoaXMpLm9mZihldmVudHMsIG1lKTtcbiAgICAgICAgc2luZ2xlSW1hZ2VMb2FkZWQoKTtcbiAgICAgIH0pO1xuICAgICAgaW1hZ2Uuc3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNpbmdsZUltYWdlTG9hZGVkKCkge1xuICAgIHVubG9hZGVkLS07XG4gICAgaWYgKHVubG9hZGVkID09PSAwKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBvbkltYWdlc0xvYWRlZCB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE5lc3QgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5uZXN0JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcblxuLyoqXG4gKiBBY2NvcmRpb25NZW51IG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5hY2NvcmRpb25NZW51XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm5lc3RcbiAqL1xuXG5jbGFzcyBBY2NvcmRpb25NZW51IGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gYWNjb3JkaW9uIG1lbnUuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBBY2NvcmRpb25NZW51XG4gICAqIEBmaXJlcyBBY2NvcmRpb25NZW51I2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhbiBhY2NvcmRpb24gbWVudS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQWNjb3JkaW9uTWVudS5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0FjY29yZGlvbk1lbnUnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdBY2NvcmRpb25NZW51Jywge1xuICAgICAgJ0VOVEVSJzogJ3RvZ2dsZScsXG4gICAgICAnU1BBQ0UnOiAndG9nZ2xlJyxcbiAgICAgICdBUlJPV19SSUdIVCc6ICdvcGVuJyxcbiAgICAgICdBUlJPV19VUCc6ICd1cCcsXG4gICAgICAnQVJST1dfRE9XTic6ICdkb3duJyxcbiAgICAgICdBUlJPV19MRUZUJzogJ2Nsb3NlJyxcbiAgICAgICdFU0NBUEUnOiAnY2xvc2VBbGwnXG4gICAgfSk7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBhY2NvcmRpb24gbWVudSBieSBoaWRpbmcgYWxsIG5lc3RlZCBtZW51cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIE5lc3QuRmVhdGhlcih0aGlzLiRlbGVtZW50LCAnYWNjb3JkaW9uJyk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1zdWJtZW51XScpLm5vdCgnLmlzLWFjdGl2ZScpLnNsaWRlVXAoMCk7Ly8uZmluZCgnYScpLmNzcygncGFkZGluZy1sZWZ0JywgJzFyZW0nKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgJ3JvbGUnOiAndHJlZScsXG4gICAgICAnYXJpYS1tdWx0aXNlbGVjdGFibGUnOiB0aGlzLm9wdGlvbnMubXVsdGlPcGVuXG4gICAgfSk7XG5cbiAgICB0aGlzLiRtZW51TGlua3MgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pcy1hY2NvcmRpb24tc3VibWVudS1wYXJlbnQnKTtcbiAgICB0aGlzLiRtZW51TGlua3MuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyIGxpbmtJZCA9IHRoaXMuaWQgfHwgR2V0WW9EaWdpdHMoNiwgJ2FjYy1tZW51LWxpbmsnKSxcbiAgICAgICAgICAkZWxlbSA9ICQodGhpcyksXG4gICAgICAgICAgJHN1YiA9ICRlbGVtLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpLFxuICAgICAgICAgIHN1YklkID0gJHN1YlswXS5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnYWNjLW1lbnUnKSxcbiAgICAgICAgICBpc0FjdGl2ZSA9ICRzdWIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG5cbiAgICAgIGlmKF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgICAkZWxlbS5hZGRDbGFzcygnaGFzLXN1Ym1lbnUtdG9nZ2xlJyk7XG4gICAgICAgICRlbGVtLmNoaWxkcmVuKCdhJykuYWZ0ZXIoJzxidXR0b24gaWQ9XCInICsgbGlua0lkICsgJ1wiIGNsYXNzPVwic3VibWVudS10b2dnbGVcIiBhcmlhLWNvbnRyb2xzPVwiJyArIHN1YklkICsgJ1wiIGFyaWEtZXhwYW5kZWQ9XCInICsgaXNBY3RpdmUgKyAnXCIgdGl0bGU9XCInICsgX3RoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlVGV4dCArICdcIj48c3BhbiBjbGFzcz1cInN1Ym1lbnUtdG9nZ2xlLXRleHRcIj4nICsgX3RoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlVGV4dCArICc8L3NwYW4+PC9idXR0b24+Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZWxlbS5hdHRyKHtcbiAgICAgICAgICAnYXJpYS1jb250cm9scyc6IHN1YklkLFxuICAgICAgICAgICdhcmlhLWV4cGFuZGVkJzogaXNBY3RpdmUsXG4gICAgICAgICAgJ2lkJzogbGlua0lkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgJHN1Yi5hdHRyKHtcbiAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6IGxpbmtJZCxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogIWlzQWN0aXZlLFxuICAgICAgICAncm9sZSc6ICdncm91cCcsXG4gICAgICAgICdpZCc6IHN1YklkXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpJykuYXR0cih7XG4gICAgICAncm9sZSc6ICd0cmVlaXRlbSdcbiAgICB9KTtcbiAgICB2YXIgaW5pdFBhbmVzID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXMtYWN0aXZlJyk7XG4gICAgaWYoaW5pdFBhbmVzLmxlbmd0aCl7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgaW5pdFBhbmVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgX3RoaXMuZG93bigkKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIG1lbnUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkc3VibWVudSA9ICQodGhpcykuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJyk7XG5cbiAgICAgIGlmICgkc3VibWVudS5sZW5ndGgpIHtcbiAgICAgICAgaWYoX3RoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlKSB7XG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignLnN1Ym1lbnUtdG9nZ2xlJykub2ZmKCdjbGljay56Zi5hY2NvcmRpb25NZW51Jykub24oJ2NsaWNrLnpmLmFjY29yZGlvbk1lbnUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBfdGhpcy50b2dnbGUoJHN1Ym1lbnUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignYScpLm9mZignY2xpY2suemYuYWNjb3JkaW9uTWVudScpLm9uKCdjbGljay56Zi5hY2NvcmRpb25NZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgkc3VibWVudSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLm9uKCdrZXlkb3duLnpmLmFjY29yZGlvbm1lbnUnLCBmdW5jdGlvbihlKXtcbiAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICAgJGVsZW1lbnRzID0gJGVsZW1lbnQucGFyZW50KCd1bCcpLmNoaWxkcmVuKCdsaScpLFxuICAgICAgICAgICRwcmV2RWxlbWVudCxcbiAgICAgICAgICAkbmV4dEVsZW1lbnQsXG4gICAgICAgICAgJHRhcmdldCA9ICRlbGVtZW50LmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpO1xuXG4gICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgICRwcmV2RWxlbWVudCA9ICRlbGVtZW50cy5lcShNYXRoLm1heCgwLCBpLTEpKS5maW5kKCdhJykuZmlyc3QoKTtcbiAgICAgICAgICAkbmV4dEVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5taW4oaSsxLCAkZWxlbWVudHMubGVuZ3RoLTEpKS5maW5kKCdhJykuZmlyc3QoKTtcblxuICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XTp2aXNpYmxlJykubGVuZ3RoKSB7IC8vIGhhcyBvcGVuIHN1YiBtZW51XG4gICAgICAgICAgICAkbmV4dEVsZW1lbnQgPSAkZWxlbWVudC5maW5kKCdsaTpmaXJzdC1jaGlsZCcpLmZpbmQoJ2EnKS5maXJzdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmZpcnN0LWNoaWxkJykpIHsgLy8gaXMgZmlyc3QgZWxlbWVudCBvZiBzdWIgbWVudVxuICAgICAgICAgICAgJHByZXZFbGVtZW50ID0gJGVsZW1lbnQucGFyZW50cygnbGknKS5maXJzdCgpLmZpbmQoJ2EnKS5maXJzdCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJHByZXZFbGVtZW50LnBhcmVudHMoJ2xpJykuZmlyc3QoKS5jaGlsZHJlbignW2RhdGEtc3VibWVudV06dmlzaWJsZScpLmxlbmd0aCkgeyAvLyBpZiBwcmV2aW91cyBlbGVtZW50IGhhcyBvcGVuIHN1YiBtZW51XG4gICAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkcHJldkVsZW1lbnQucGFyZW50cygnbGknKS5maW5kKCdsaTpsYXN0LWNoaWxkJykuZmluZCgnYScpLmZpcnN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkKHRoaXMpLmlzKCc6bGFzdC1jaGlsZCcpKSB7IC8vIGlzIGxhc3QgZWxlbWVudCBvZiBzdWIgbWVudVxuICAgICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnQucGFyZW50cygnbGknKS5maXJzdCgpLm5leHQoJ2xpJykuZmluZCgnYScpLmZpcnN0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdBY2NvcmRpb25NZW51Jywge1xuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHRhcmdldC5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICBfdGhpcy5kb3duKCR0YXJnZXQpO1xuICAgICAgICAgICAgJHRhcmdldC5maW5kKCdsaScpLmZpcnN0KCkuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHRhcmdldC5sZW5ndGggJiYgISR0YXJnZXQuaXMoJzpoaWRkZW4nKSkgeyAvLyBjbG9zZSBhY3RpdmUgc3ViIG9mIHRoaXMgaXRlbVxuICAgICAgICAgICAgX3RoaXMudXAoJHRhcmdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkZWxlbWVudC5wYXJlbnQoJ1tkYXRhLXN1Ym1lbnVdJykubGVuZ3RoKSB7IC8vIGNsb3NlIGN1cnJlbnRseSBvcGVuIHN1YlxuICAgICAgICAgICAgX3RoaXMudXAoJGVsZW1lbnQucGFyZW50KCdbZGF0YS1zdWJtZW51XScpKTtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudHMoJ2xpJykuZmlyc3QoKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRwcmV2RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkbmV4dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkZWxlbWVudC5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgkZWxlbWVudC5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlQWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5oaWRlQWxsKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZWQ6IGZ1bmN0aW9uKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pOy8vLmF0dHIoJ3RhYmluZGV4JywgMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFsbCBwYW5lcyBvZiB0aGUgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBoaWRlQWxsKCkge1xuICAgIHRoaXMudXAodGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1zdWJtZW51XScpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhbGwgcGFuZXMgb2YgdGhlIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgc2hvd0FsbCgpIHtcbiAgICB0aGlzLmRvd24odGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1zdWJtZW51XScpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBvcGVuL2Nsb3NlIHN0YXRlIG9mIGEgc3VibWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gdGhlIHN1Ym1lbnUgdG8gdG9nZ2xlXG4gICAqL1xuICB0b2dnbGUoJHRhcmdldCl7XG4gICAgaWYoISR0YXJnZXQuaXMoJzphbmltYXRlZCcpKSB7XG4gICAgICBpZiAoISR0YXJnZXQuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICB0aGlzLnVwKCR0YXJnZXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZG93bigkdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHN1Yi1tZW51IGRlZmluZWQgYnkgYCR0YXJnZXRgLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIFN1Yi1tZW51IHRvIG9wZW4uXG4gICAqIEBmaXJlcyBBY2NvcmRpb25NZW51I2Rvd25cbiAgICovXG4gIGRvd24oJHRhcmdldCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZighdGhpcy5vcHRpb25zLm11bHRpT3Blbikge1xuICAgICAgdGhpcy51cCh0aGlzLiRlbGVtZW50LmZpbmQoJy5pcy1hY3RpdmUnKS5ub3QoJHRhcmdldC5wYXJlbnRzVW50aWwodGhpcy4kZWxlbWVudCkuYWRkKCR0YXJnZXQpKSk7XG4gICAgfVxuXG4gICAgJHRhcmdldC5hZGRDbGFzcygnaXMtYWN0aXZlJykuYXR0cih7J2FyaWEtaGlkZGVuJzogZmFsc2V9KTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlKSB7XG4gICAgICAkdGFyZ2V0LnByZXYoJy5zdWJtZW51LXRvZ2dsZScpLmF0dHIoeydhcmlhLWV4cGFuZGVkJzogdHJ1ZX0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICR0YXJnZXQucGFyZW50KCcuaXMtYWNjb3JkaW9uLXN1Ym1lbnUtcGFyZW50JykuYXR0cih7J2FyaWEtZXhwYW5kZWQnOiB0cnVlfSk7XG4gICAgfVxuXG4gICAgJHRhcmdldC5zbGlkZURvd24oX3RoaXMub3B0aW9ucy5zbGlkZVNwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgZG9uZSBvcGVuaW5nLlxuICAgICAgICogQGV2ZW50IEFjY29yZGlvbk1lbnUjZG93blxuICAgICAgICovXG4gICAgICBfdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdkb3duLnpmLmFjY29yZGlvbk1lbnUnLCBbJHRhcmdldF0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgc3ViLW1lbnUgZGVmaW5lZCBieSBgJHRhcmdldGAuIEFsbCBzdWItbWVudXMgaW5zaWRlIHRoZSB0YXJnZXQgd2lsbCBiZSBjbG9zZWQgYXMgd2VsbC5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBTdWItbWVudSB0byBjbG9zZS5cbiAgICogQGZpcmVzIEFjY29yZGlvbk1lbnUjdXBcbiAgICovXG4gIHVwKCR0YXJnZXQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICR0YXJnZXQuc2xpZGVVcChfdGhpcy5vcHRpb25zLnNsaWRlU3BlZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiB0aGUgbWVudSBpcyBkb25lIGNvbGxhcHNpbmcgdXAuXG4gICAgICAgKiBAZXZlbnQgQWNjb3JkaW9uTWVudSN1cFxuICAgICAgICovXG4gICAgICBfdGhpcy4kZWxlbWVudC50cmlnZ2VyKCd1cC56Zi5hY2NvcmRpb25NZW51JywgWyR0YXJnZXRdKTtcbiAgICB9KTtcblxuICAgIHZhciAkbWVudXMgPSAkdGFyZ2V0LmZpbmQoJ1tkYXRhLXN1Ym1lbnVdJykuc2xpZGVVcCgwKS5hZGRCYWNrKCkuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlKSB7XG4gICAgICAkbWVudXMucHJldignLnN1Ym1lbnUtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkbWVudXMucGFyZW50KCcuaXMtYWNjb3JkaW9uLXN1Ym1lbnUtcGFyZW50JykuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgYWNjb3JkaW9uIG1lbnUuXG4gICAqIEBmaXJlcyBBY2NvcmRpb25NZW51I2Rlc3Ryb3llZFxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1zdWJtZW51XScpLnNsaWRlRG93bigwKS5jc3MoJ2Rpc3BsYXknLCAnJyk7XG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdhJykub2ZmKCdjbGljay56Zi5hY2NvcmRpb25NZW51Jyk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5maW5kKCcuaGFzLXN1Ym1lbnUtdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ2hhcy1zdWJtZW51LXRvZ2dsZScpO1xuICAgICAgdGhpcy4kZWxlbWVudC5maW5kKCcuc3VibWVudS10b2dnbGUnKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBOZXN0LkJ1cm4odGhpcy4kZWxlbWVudCwgJ2FjY29yZGlvbicpO1xuICB9XG59XG5cbkFjY29yZGlvbk1lbnUuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBhbmltYXRlIHRoZSBvcGVuaW5nIG9mIGEgc3VibWVudSBpbiBtcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAyNTBcbiAgICovXG4gIHNsaWRlU3BlZWQ6IDI1MCxcbiAgLyoqXG4gICAqIEFkZHMgYSBzZXBhcmF0ZSBzdWJtZW51IHRvZ2dsZSBidXR0b24uIFRoaXMgYWxsb3dzIHRoZSBwYXJlbnQgaXRlbSB0byBoYXZlIGEgbGluay5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSB0cnVlXG4gICAqL1xuICBzdWJtZW51VG9nZ2xlOiBmYWxzZSxcbiAgLyoqXG4gICAqIFRoZSB0ZXh0IHVzZWQgZm9yIHRoZSBzdWJtZW51IHRvZ2dsZSBpZiBlbmFibGVkLiBUaGlzIGlzIHVzZWQgZm9yIHNjcmVlbiByZWFkZXJzIG9ubHkuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgdHJ1ZVxuICAgKi9cbiAgc3VibWVudVRvZ2dsZVRleHQ6ICdUb2dnbGUgbWVudScsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgbWVudSB0byBoYXZlIG11bHRpcGxlIG9wZW4gcGFuZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIG11bHRpT3BlbjogdHJ1ZVxufTtcblxuZXhwb3J0IHtBY2NvcmRpb25NZW51fTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgTmVzdCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm5lc3QnO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuYm94JztcbmltcG9ydCB7IHJ0bCBhcyBSdGwgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuXG5cbi8qKlxuICogRHJvcGRvd25NZW51IG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5kcm9wZG93bi1tZW51XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmJveFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5uZXN0XG4gKi9cblxuY2xhc3MgRHJvcGRvd25NZW51IGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgRHJvcGRvd25NZW51LlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgRHJvcGRvd25NZW51XG4gICAqIEBmaXJlcyBEcm9wZG93bk1lbnUjaW5pdFxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gbWFrZSBpbnRvIGEgZHJvcGRvd24gbWVudS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRHJvcGRvd25NZW51LmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnRHJvcGRvd25NZW51JzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignRHJvcGRvd25NZW51Jywge1xuICAgICAgJ0VOVEVSJzogJ29wZW4nLFxuICAgICAgJ1NQQUNFJzogJ29wZW4nLFxuICAgICAgJ0FSUk9XX1JJR0hUJzogJ25leHQnLFxuICAgICAgJ0FSUk9XX1VQJzogJ3VwJyxcbiAgICAgICdBUlJPV19ET1dOJzogJ2Rvd24nLFxuICAgICAgJ0FSUk9XX0xFRlQnOiAncHJldmlvdXMnLFxuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZSdcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGx1Z2luLCBhbmQgY2FsbHMgX3ByZXBhcmVNZW51XG4gICAqIEBwcml2YXRlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgTmVzdC5GZWF0aGVyKHRoaXMuJGVsZW1lbnQsICdkcm9wZG93bicpO1xuXG4gICAgdmFyIHN1YnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpLmlzLWRyb3Bkb3duLXN1Ym1lbnUtcGFyZW50Jyk7XG4gICAgdGhpcy4kZWxlbWVudC5jaGlsZHJlbignLmlzLWRyb3Bkb3duLXN1Ym1lbnUtcGFyZW50JykuY2hpbGRyZW4oJy5pcy1kcm9wZG93bi1zdWJtZW51JykuYWRkQ2xhc3MoJ2ZpcnN0LXN1YicpO1xuXG4gICAgdGhpcy4kbWVudUl0ZW1zID0gdGhpcy4kZWxlbWVudC5maW5kKCdbcm9sZT1cIm1lbnVpdGVtXCJdJyk7XG4gICAgdGhpcy4kdGFicyA9IHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcbiAgICB0aGlzLiR0YWJzLmZpbmQoJ3VsLmlzLWRyb3Bkb3duLXN1Ym1lbnUnKS5hZGRDbGFzcyh0aGlzLm9wdGlvbnMudmVydGljYWxDbGFzcyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFsaWdubWVudCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKHRoaXMub3B0aW9ucy5yaWdodENsYXNzKSB8fCBSdGwoKSB8fCB0aGlzLiRlbGVtZW50LnBhcmVudHMoJy50b3AtYmFyLXJpZ2h0JykuaXMoJyonKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFsaWdubWVudCA9ICdyaWdodCc7XG4gICAgICAgICAgICBzdWJzLmFkZENsYXNzKCdvcGVucy1sZWZ0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID0gJ2xlZnQnO1xuICAgICAgICAgICAgc3Vicy5hZGRDbGFzcygnb3BlbnMtcmlnaHQnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmFsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgIHN1YnMuYWRkQ2xhc3MoJ29wZW5zLWxlZnQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3Vicy5hZGRDbGFzcygnb3BlbnMtcmlnaHQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH07XG5cbiAgX2lzVmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuJHRhYnMuY3NzKCdkaXNwbGF5JykgPT09ICdibG9jaycgfHwgdGhpcy4kZWxlbWVudC5jc3MoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdjb2x1bW4nO1xuICB9XG5cbiAgX2lzUnRsKCkge1xuICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdhbGlnbi1yaWdodCcpIHx8IChSdGwoKSAmJiAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWxpZ24tbGVmdCcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byBlbGVtZW50cyB3aXRoaW4gdGhlIG1lbnVcbiAgICogQHByaXZhdGVcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGhhc1RvdWNoID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8ICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCAhPT0gJ3VuZGVmaW5lZCcpLFxuICAgICAgICBwYXJDbGFzcyA9ICdpcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCc7XG5cbiAgICAvLyB1c2VkIGZvciBvbkNsaWNrIGFuZCBpbiB0aGUga2V5Ym9hcmQgaGFuZGxlcnNcbiAgICB2YXIgaGFuZGxlQ2xpY2tGbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciAkZWxlbSA9ICQoZS50YXJnZXQpLnBhcmVudHNVbnRpbCgndWwnLCBgLiR7cGFyQ2xhc3N9YCksXG4gICAgICAgICAgaGFzU3ViID0gJGVsZW0uaGFzQ2xhc3MocGFyQ2xhc3MpLFxuICAgICAgICAgIGhhc0NsaWNrZWQgPSAkZWxlbS5hdHRyKCdkYXRhLWlzLWNsaWNrJykgPT09ICd0cnVlJyxcbiAgICAgICAgICAkc3ViID0gJGVsZW0uY2hpbGRyZW4oJy5pcy1kcm9wZG93bi1zdWJtZW51Jyk7XG5cbiAgICAgIGlmIChoYXNTdWIpIHtcbiAgICAgICAgaWYgKGhhc0NsaWNrZWQpIHtcbiAgICAgICAgICBpZiAoIV90aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrIHx8ICghX3RoaXMub3B0aW9ucy5jbGlja09wZW4gJiYgIWhhc1RvdWNoKSB8fCAoX3RoaXMub3B0aW9ucy5mb3JjZUZvbGxvdyAmJiBoYXNUb3VjaCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBfdGhpcy5fc2hvdygkc3ViKTtcbiAgICAgICAgICAkZWxlbS5hZGQoJGVsZW0ucGFyZW50c1VudGlsKF90aGlzLiRlbGVtZW50LCBgLiR7cGFyQ2xhc3N9YCkpLmF0dHIoJ2RhdGEtaXMtY2xpY2snLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsaWNrT3BlbiB8fCBoYXNUb3VjaCkge1xuICAgICAgdGhpcy4kbWVudUl0ZW1zLm9uKCdjbGljay56Zi5kcm9wZG93bm1lbnUgdG91Y2hzdGFydC56Zi5kcm9wZG93bm1lbnUnLCBoYW5kbGVDbGlja0ZuKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgTGVhZiBlbGVtZW50IENsaWNrc1xuICAgIGlmKF90aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrSW5zaWRlKXtcbiAgICAgIHRoaXMuJG1lbnVJdGVtcy5vbignY2xpY2suemYuZHJvcGRvd25tZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgaGFzU3ViID0gJGVsZW0uaGFzQ2xhc3MocGFyQ2xhc3MpO1xuICAgICAgICBpZighaGFzU3ViKXtcbiAgICAgICAgICBfdGhpcy5faGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlSG92ZXIpIHtcbiAgICAgIHRoaXMuJG1lbnVJdGVtcy5vbignbW91c2VlbnRlci56Zi5kcm9wZG93bm1lbnUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciAkZWxlbSA9ICQodGhpcyksXG4gICAgICAgICAgICBoYXNTdWIgPSAkZWxlbS5oYXNDbGFzcyhwYXJDbGFzcyk7XG5cbiAgICAgICAgaWYgKGhhc1N1Yikge1xuICAgICAgICAgIGNsZWFyVGltZW91dCgkZWxlbS5kYXRhKCdfZGVsYXknKSk7XG4gICAgICAgICAgJGVsZW0uZGF0YSgnX2RlbGF5Jywgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLl9zaG93KCRlbGVtLmNoaWxkcmVuKCcuaXMtZHJvcGRvd24tc3VibWVudScpKTtcbiAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpKTtcbiAgICAgICAgfVxuICAgICAgfSkub24oJ21vdXNlbGVhdmUuemYuZHJvcGRvd25tZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgaGFzU3ViID0gJGVsZW0uaGFzQ2xhc3MocGFyQ2xhc3MpO1xuICAgICAgICBpZiAoaGFzU3ViICYmIF90aGlzLm9wdGlvbnMuYXV0b2Nsb3NlKSB7XG4gICAgICAgICAgaWYgKCRlbGVtLmF0dHIoJ2RhdGEtaXMtY2xpY2snKSA9PT0gJ3RydWUnICYmIF90aGlzLm9wdGlvbnMuY2xpY2tPcGVuKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KCRlbGVtLmRhdGEoJ19kZWxheScpKTtcbiAgICAgICAgICAkZWxlbS5kYXRhKCdfZGVsYXknLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW0pO1xuICAgICAgICAgIH0sIF90aGlzLm9wdGlvbnMuY2xvc2luZ1RpbWUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuJG1lbnVJdGVtcy5vbigna2V5ZG93bi56Zi5kcm9wZG93bm1lbnUnLCBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKGUudGFyZ2V0KS5wYXJlbnRzVW50aWwoJ3VsJywgJ1tyb2xlPVwibWVudWl0ZW1cIl0nKSxcbiAgICAgICAgICBpc1RhYiA9IF90aGlzLiR0YWJzLmluZGV4KCRlbGVtZW50KSA+IC0xLFxuICAgICAgICAgICRlbGVtZW50cyA9IGlzVGFiID8gX3RoaXMuJHRhYnMgOiAkZWxlbWVudC5zaWJsaW5ncygnbGknKS5hZGQoJGVsZW1lbnQpLFxuICAgICAgICAgICRwcmV2RWxlbWVudCxcbiAgICAgICAgICAkbmV4dEVsZW1lbnQ7XG5cbiAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJGVsZW1lbnQpKSB7XG4gICAgICAgICAgJHByZXZFbGVtZW50ID0gJGVsZW1lbnRzLmVxKGktMSk7XG4gICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnRzLmVxKGkrMSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdmFyIG5leHRTaWJsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRuZXh0RWxlbWVudC5jaGlsZHJlbignYTpmaXJzdCcpLmZvY3VzKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0sIHByZXZTaWJsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRwcmV2RWxlbWVudC5jaGlsZHJlbignYTpmaXJzdCcpLmZvY3VzKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0sIG9wZW5TdWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRzdWIgPSAkZWxlbWVudC5jaGlsZHJlbigndWwuaXMtZHJvcGRvd24tc3VibWVudScpO1xuICAgICAgICBpZiAoJHN1Yi5sZW5ndGgpIHtcbiAgICAgICAgICBfdGhpcy5fc2hvdygkc3ViKTtcbiAgICAgICAgICAkZWxlbWVudC5maW5kKCdsaSA+IGE6Zmlyc3QnKS5mb2N1cygpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHsgcmV0dXJuOyB9XG4gICAgICB9LCBjbG9zZVN1YiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2lmICgkZWxlbWVudC5pcygnOmZpcnN0LWNoaWxkJykpIHtcbiAgICAgICAgdmFyIGNsb3NlID0gJGVsZW1lbnQucGFyZW50KCd1bCcpLnBhcmVudCgnbGknKTtcbiAgICAgICAgY2xvc2UuY2hpbGRyZW4oJ2E6Zmlyc3QnKS5mb2N1cygpO1xuICAgICAgICBfdGhpcy5faGlkZShjbG9zZSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy99XG4gICAgICB9O1xuICAgICAgdmFyIGZ1bmN0aW9ucyA9IHtcbiAgICAgICAgb3Blbjogb3BlblN1YixcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLl9oaWRlKF90aGlzLiRlbGVtZW50KTtcbiAgICAgICAgICBfdGhpcy4kbWVudUl0ZW1zLmVxKDApLmNoaWxkcmVuKCdhJykuZm9jdXMoKTsgLy8gZm9jdXMgdG8gZmlyc3QgZWxlbWVudFxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKGlzVGFiKSB7XG4gICAgICAgIGlmIChfdGhpcy5faXNWZXJ0aWNhbCgpKSB7IC8vIHZlcnRpY2FsIG1lbnVcbiAgICAgICAgICBpZiAoX3RoaXMuX2lzUnRsKCkpIHsgLy8gcmlnaHQgYWxpZ25lZFxuICAgICAgICAgICAgJC5leHRlbmQoZnVuY3Rpb25zLCB7XG4gICAgICAgICAgICAgIGRvd246IG5leHRTaWJsaW5nLFxuICAgICAgICAgICAgICB1cDogcHJldlNpYmxpbmcsXG4gICAgICAgICAgICAgIG5leHQ6IGNsb3NlU3ViLFxuICAgICAgICAgICAgICBwcmV2aW91czogb3BlblN1YlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gbGVmdCBhbGlnbmVkXG4gICAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgICAgZG93bjogbmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgIHVwOiBwcmV2U2libGluZyxcbiAgICAgICAgICAgICAgbmV4dDogb3BlblN1YixcbiAgICAgICAgICAgICAgcHJldmlvdXM6IGNsb3NlU3ViXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIGhvcml6b250YWwgbWVudVxuICAgICAgICAgIGlmIChfdGhpcy5faXNSdGwoKSkgeyAvLyByaWdodCBhbGlnbmVkXG4gICAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgICAgbmV4dDogcHJldlNpYmxpbmcsXG4gICAgICAgICAgICAgIHByZXZpb3VzOiBuZXh0U2libGluZyxcbiAgICAgICAgICAgICAgZG93bjogb3BlblN1YixcbiAgICAgICAgICAgICAgdXA6IGNsb3NlU3ViXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBsZWZ0IGFsaWduZWRcbiAgICAgICAgICAgICQuZXh0ZW5kKGZ1bmN0aW9ucywge1xuICAgICAgICAgICAgICBuZXh0OiBuZXh0U2libGluZyxcbiAgICAgICAgICAgICAgcHJldmlvdXM6IHByZXZTaWJsaW5nLFxuICAgICAgICAgICAgICBkb3duOiBvcGVuU3ViLFxuICAgICAgICAgICAgICB1cDogY2xvc2VTdWJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHsgLy8gbm90IHRhYnMgLT4gb25lIHN1YlxuICAgICAgICBpZiAoX3RoaXMuX2lzUnRsKCkpIHsgLy8gcmlnaHQgYWxpZ25lZFxuICAgICAgICAgICQuZXh0ZW5kKGZ1bmN0aW9ucywge1xuICAgICAgICAgICAgbmV4dDogY2xvc2VTdWIsXG4gICAgICAgICAgICBwcmV2aW91czogb3BlblN1YixcbiAgICAgICAgICAgIGRvd246IG5leHRTaWJsaW5nLFxuICAgICAgICAgICAgdXA6IHByZXZTaWJsaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGxlZnQgYWxpZ25lZFxuICAgICAgICAgICQuZXh0ZW5kKGZ1bmN0aW9ucywge1xuICAgICAgICAgICAgbmV4dDogb3BlblN1YixcbiAgICAgICAgICAgIHByZXZpb3VzOiBjbG9zZVN1YixcbiAgICAgICAgICAgIGRvd246IG5leHRTaWJsaW5nLFxuICAgICAgICAgICAgdXA6IHByZXZTaWJsaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnRHJvcGRvd25NZW51JywgZnVuY3Rpb25zKTtcblxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZXZlbnQgaGFuZGxlciB0byB0aGUgYm9keSB0byBjbG9zZSBhbnkgZHJvcGRvd25zIG9uIGEgY2xpY2suXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZEJvZHlIYW5kbGVyKCkge1xuICAgIHZhciAkYm9keSA9ICQoZG9jdW1lbnQuYm9keSksXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAkYm9keS5vZmYoJ21vdXNldXAuemYuZHJvcGRvd25tZW51IHRvdWNoZW5kLnpmLmRyb3Bkb3dubWVudScpXG4gICAgICAgICAub24oJ21vdXNldXAuemYuZHJvcGRvd25tZW51IHRvdWNoZW5kLnpmLmRyb3Bkb3dubWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgdmFyICRsaW5rID0gX3RoaXMuJGVsZW1lbnQuZmluZChlLnRhcmdldCk7XG4gICAgICAgICAgIGlmICgkbGluay5sZW5ndGgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgX3RoaXMuX2hpZGUoKTtcbiAgICAgICAgICAgJGJvZHkub2ZmKCdtb3VzZXVwLnpmLmRyb3Bkb3dubWVudSB0b3VjaGVuZC56Zi5kcm9wZG93bm1lbnUnKTtcbiAgICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgZHJvcGRvd24gcGFuZSwgYW5kIGNoZWNrcyBmb3IgY29sbGlzaW9ucyBmaXJzdC5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICRzdWIgLSB1bCBlbGVtZW50IHRoYXQgaXMgYSBzdWJtZW51IHRvIHNob3dcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBmaXJlcyBEcm9wZG93bk1lbnUjc2hvd1xuICAgKi9cbiAgX3Nob3coJHN1Yikge1xuICAgIHZhciBpZHggPSB0aGlzLiR0YWJzLmluZGV4KHRoaXMuJHRhYnMuZmlsdGVyKGZ1bmN0aW9uKGksIGVsKSB7XG4gICAgICByZXR1cm4gJChlbCkuZmluZCgkc3ViKS5sZW5ndGggPiAwO1xuICAgIH0pKTtcbiAgICB2YXIgJHNpYnMgPSAkc3ViLnBhcmVudCgnbGkuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKS5zaWJsaW5ncygnbGkuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKTtcbiAgICB0aGlzLl9oaWRlKCRzaWJzLCBpZHgpO1xuICAgICRzdWIuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpLmFkZENsYXNzKCdqcy1kcm9wZG93bi1hY3RpdmUnKVxuICAgICAgICAucGFyZW50KCdsaS5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB2YXIgY2xlYXIgPSBCb3guSW1Ob3RUb3VjaGluZ1lvdSgkc3ViLCBudWxsLCB0cnVlKTtcbiAgICBpZiAoIWNsZWFyKSB7XG4gICAgICB2YXIgb2xkQ2xhc3MgPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID09PSAnbGVmdCcgPyAnLXJpZ2h0JyA6ICctbGVmdCcsXG4gICAgICAgICAgJHBhcmVudExpID0gJHN1Yi5wYXJlbnQoJy5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpO1xuICAgICAgJHBhcmVudExpLnJlbW92ZUNsYXNzKGBvcGVucyR7b2xkQ2xhc3N9YCkuYWRkQ2xhc3MoYG9wZW5zLSR7dGhpcy5vcHRpb25zLmFsaWdubWVudH1gKTtcbiAgICAgIGNsZWFyID0gQm94LkltTm90VG91Y2hpbmdZb3UoJHN1YiwgbnVsbCwgdHJ1ZSk7XG4gICAgICBpZiAoIWNsZWFyKSB7XG4gICAgICAgICRwYXJlbnRMaS5yZW1vdmVDbGFzcyhgb3BlbnMtJHt0aGlzLm9wdGlvbnMuYWxpZ25tZW50fWApLmFkZENsYXNzKCdvcGVucy1pbm5lcicpO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgJHN1Yi5jc3MoJ3Zpc2liaWxpdHknLCAnJyk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2spIHsgdGhpcy5fYWRkQm9keUhhbmRsZXIoKTsgfVxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIG5ldyBkcm9wZG93biBwYW5lIGlzIHZpc2libGUuXG4gICAgICogQGV2ZW50IERyb3Bkb3duTWVudSNzaG93XG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzaG93LnpmLmRyb3Bkb3dubWVudScsIFskc3ViXSk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgYSBzaW5nbGUsIGN1cnJlbnRseSBvcGVuIGRyb3Bkb3duIHBhbmUsIGlmIHBhc3NlZCBhIHBhcmFtZXRlciwgb3RoZXJ3aXNlLCBoaWRlcyBldmVyeXRoaW5nLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gZWxlbWVudCB3aXRoIGEgc3VibWVudSB0byBoaWRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZHggLSBpbmRleCBvZiB0aGUgJHRhYnMgY29sbGVjdGlvbiB0byBoaWRlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaGlkZSgkZWxlbSwgaWR4KSB7XG4gICAgdmFyICR0b0Nsb3NlO1xuICAgIGlmICgkZWxlbSAmJiAkZWxlbS5sZW5ndGgpIHtcbiAgICAgICR0b0Nsb3NlID0gJGVsZW07XG4gICAgfSBlbHNlIGlmIChpZHggIT09IHVuZGVmaW5lZCkge1xuICAgICAgJHRvQ2xvc2UgPSB0aGlzLiR0YWJzLm5vdChmdW5jdGlvbihpLCBlbCkge1xuICAgICAgICByZXR1cm4gaSA9PT0gaWR4O1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJHRvQ2xvc2UgPSB0aGlzLiRlbGVtZW50O1xuICAgIH1cbiAgICB2YXIgc29tZXRoaW5nVG9DbG9zZSA9ICR0b0Nsb3NlLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSB8fCAkdG9DbG9zZS5maW5kKCcuaXMtYWN0aXZlJykubGVuZ3RoID4gMDtcblxuICAgIGlmIChzb21ldGhpbmdUb0Nsb3NlKSB7XG4gICAgICAkdG9DbG9zZS5maW5kKCdsaS5pcy1hY3RpdmUnKS5hZGQoJHRvQ2xvc2UpLmF0dHIoe1xuICAgICAgICAnZGF0YS1pcy1jbGljayc6IGZhbHNlXG4gICAgICB9KS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICR0b0Nsb3NlLmZpbmQoJ3VsLmpzLWRyb3Bkb3duLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdqcy1kcm9wZG93bi1hY3RpdmUnKTtcblxuICAgICAgaWYgKHRoaXMuY2hhbmdlZCB8fCAkdG9DbG9zZS5maW5kKCdvcGVucy1pbm5lcicpLmxlbmd0aCkge1xuICAgICAgICB2YXIgb2xkQ2xhc3MgPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID09PSAnbGVmdCcgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgICAkdG9DbG9zZS5maW5kKCdsaS5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpLmFkZCgkdG9DbG9zZSlcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoYG9wZW5zLWlubmVyIG9wZW5zLSR7dGhpcy5vcHRpb25zLmFsaWdubWVudH1gKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgb3BlbnMtJHtvbGRDbGFzc31gKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG9wZW4gbWVudXMgYXJlIGNsb3NlZC5cbiAgICAgICAqIEBldmVudCBEcm9wZG93bk1lbnUjaGlkZVxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2hpZGUuemYuZHJvcGRvd25tZW51JywgWyR0b0Nsb3NlXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBwbHVnaW4uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kbWVudUl0ZW1zLm9mZignLnpmLmRyb3Bkb3dubWVudScpLnJlbW92ZUF0dHIoJ2RhdGEtaXMtY2xpY2snKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXJpZ2h0LWFycm93IGlzLWxlZnQtYXJyb3cgaXMtZG93bi1hcnJvdyBvcGVucy1yaWdodCBvcGVucy1sZWZ0IG9wZW5zLWlubmVyJyk7XG4gICAgJChkb2N1bWVudC5ib2R5KS5vZmYoJy56Zi5kcm9wZG93bm1lbnUnKTtcbiAgICBOZXN0LkJ1cm4odGhpcy4kZWxlbWVudCwgJ2Ryb3Bkb3duJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IHNldHRpbmdzIGZvciBwbHVnaW5cbiAqL1xuRHJvcGRvd25NZW51LmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogRGlzYWxsb3dzIGhvdmVyIGV2ZW50cyBmcm9tIG9wZW5pbmcgc3VibWVudXNcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRpc2FibGVIb3ZlcjogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyBhIHN1Ym1lbnUgdG8gYXV0b21hdGljYWxseSBjbG9zZSBvbiBhIG1vdXNlbGVhdmUgZXZlbnQsIGlmIG5vdCBjbGlja2VkIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGF1dG9jbG9zZTogdHJ1ZSxcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIHRvIGRlbGF5IG9wZW5pbmcgYSBzdWJtZW51IG9uIGhvdmVyIGV2ZW50LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwXG4gICAqL1xuICBob3ZlckRlbGF5OiA1MCxcbiAgLyoqXG4gICAqIEFsbG93IGEgc3VibWVudSB0byBvcGVuL3JlbWFpbiBvcGVuIG9uIHBhcmVudCBjbGljayBldmVudC4gQWxsb3dzIGN1cnNvciB0byBtb3ZlIGF3YXkgZnJvbSBtZW51LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgY2xpY2tPcGVuOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIHRvIGRlbGF5IGNsb3NpbmcgYSBzdWJtZW51IG9uIGEgbW91c2VsZWF2ZSBldmVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MDBcbiAgICovXG5cbiAgY2xvc2luZ1RpbWU6IDUwMCxcbiAgLyoqXG4gICAqIFBvc2l0aW9uIG9mIHRoZSBtZW51IHJlbGF0aXZlIHRvIHdoYXQgZGlyZWN0aW9uIHRoZSBzdWJtZW51cyBzaG91bGQgb3Blbi4gSGFuZGxlZCBieSBKUy4gQ2FuIGJlIGAnYXV0bydgLCBgJ2xlZnQnYCBvciBgJ3JpZ2h0J2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2F1dG8nXG4gICAqL1xuICBhbGlnbm1lbnQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsbG93IGNsaWNrcyBvbiB0aGUgYm9keSB0byBjbG9zZSBhbnkgb3BlbiBzdWJtZW51cy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiB0cnVlLFxuICAvKipcbiAgICogQWxsb3cgY2xpY2tzIG9uIGxlYWYgYW5jaG9yIGxpbmtzIHRvIGNsb3NlIGFueSBvcGVuIHN1Ym1lbnVzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2tJbnNpZGU6IHRydWUsXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHZlcnRpY2FsIG9yaWVudGVkIG1lbnVzLCBGb3VuZGF0aW9uIGRlZmF1bHQgaXMgYHZlcnRpY2FsYC4gVXBkYXRlIHRoaXMgaWYgdXNpbmcgeW91ciBvd24gY2xhc3MuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3ZlcnRpY2FsJ1xuICAgKi9cbiAgdmVydGljYWxDbGFzczogJ3ZlcnRpY2FsJyxcbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gcmlnaHQtc2lkZSBvcmllbnRlZCBtZW51cywgRm91bmRhdGlvbiBkZWZhdWx0IGlzIGBhbGlnbi1yaWdodGAuIFVwZGF0ZSB0aGlzIGlmIHVzaW5nIHlvdXIgb3duIGNsYXNzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhbGlnbi1yaWdodCdcbiAgICovXG4gIHJpZ2h0Q2xhc3M6ICdhbGlnbi1yaWdodCcsXG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIGZvcmNlIG92ZXJpZGUgdGhlIGNsaWNraW5nIG9mIGxpbmtzIHRvIHBlcmZvcm0gZGVmYXVsdCBhY3Rpb24sIG9uIHNlY29uZCB0b3VjaCBldmVudCBmb3IgbW9iaWxlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBmb3JjZUZvbGxvdzogdHJ1ZVxufTtcblxuZXhwb3J0IHtEcm9wZG93bk1lbnV9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bk1lbnUuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5cbi8qKlxuICogU21vb3RoU2Nyb2xsIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5zbW9vdGgtc2Nyb2xsXG4gKi9cbmNsYXNzIFNtb290aFNjcm9sbCBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFNtb290aFNjcm9sbC5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIFNtb290aFNjcm9sbFxuICAgKiBAZmlyZXMgU21vb3RoU2Nyb2xsI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGFkZCB0aGUgdHJpZ2dlciB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFNtb290aFNjcm9sbC5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9ICdTbW9vdGhTY3JvbGwnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgU21vb3RoU2Nyb2xsIHBsdWdpblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXQoKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuJGVsZW1lbnRbMF0uaWQgfHwgR2V0WW9EaWdpdHMoNiwgJ3Ntb290aC1zY3JvbGwnKTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICAgICAgICdpZCc6IGlkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2V2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGV2ZW50cyBmb3IgU21vb3RoU2Nyb2xsLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2V2ZW50cygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAvLyBjbGljayBoYW5kbGVyIGZ1bmN0aW9uLlxuICAgICAgICB2YXIgaGFuZGxlTGlua0NsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gZXhpdCBmdW5jdGlvbiBpZiB0aGUgZXZlbnQgc291cmNlIGlzbid0IGNvbWluZyBmcm9tIGFuIGFuY2hvciB3aXRoIGhyZWYgYXR0cmlidXRlIHN0YXJ0cyB3aXRoICcjJ1xuICAgICAgICAgICAgaWYoISQodGhpcykuaXMoJ2FbaHJlZl49XCIjXCJdJykpICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXJyaXZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cbiAgICAgICAgICAgIF90aGlzLl9pblRyYW5zaXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICBTbW9vdGhTY3JvbGwuc2Nyb2xsVG9Mb2MoYXJyaXZhbCwgX3RoaXMub3B0aW9ucywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2luVHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay56Zi5zbW9vdGhTY3JvbGwnLCBoYW5kbGVMaW5rQ2xpY2spXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLnpmLnNtb290aFNjcm9sbCcsICdhW2hyZWZePVwiI1wiXScsIGhhbmRsZUxpbmtDbGljayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2Nyb2xsIHRvIGEgZ2l2ZW4gbG9jYXRpb24gb24gdGhlIHBhZ2UuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxvYyAtIEEgcHJvcGVybHkgZm9ybWF0dGVkIGpRdWVyeSBpZCBzZWxlY3Rvci4gRXhhbXBsZTogJyNmb28nXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0byB1c2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBzY3JvbGxUb0xvYyhsb2MsIG9wdGlvbnMgPSBTbW9vdGhTY3JvbGwuZGVmYXVsdHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgdGFyZ2V0IGRvZXMgbm90IGV4aXN0IHRvIHByZXZlbnQgZXJyb3JzXG4gICAgICAgIGlmICghJChsb2MpLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9IE1hdGgucm91bmQoJChsb2MpLm9mZnNldCgpLnRvcCAtIG9wdGlvbnMudGhyZXNob2xkIC8gMiAtIG9wdGlvbnMub2Zmc2V0KTtcblxuICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCh0cnVlKS5hbmltYXRlKFxuICAgICAgICAgICAgeyBzY3JvbGxUb3A6IHNjcm9sbFBvcyB9LFxuICAgICAgICAgICAgb3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgICAgIG9wdGlvbnMuYW5pbWF0aW9uRWFzaW5nLFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYoY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrID09IFwiZnVuY3Rpb25cIil7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IHNldHRpbmdzIGZvciBwbHVnaW4uXG4gKi9cblNtb290aFNjcm9sbC5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lLCBpbiBtcywgdGhlIGFuaW1hdGVkIHNjcm9sbGluZyBzaG91bGQgdGFrZSBiZXR3ZWVuIGxvY2F0aW9ucy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MDBcbiAgICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA1MDAsXG4gIC8qKlxuICAgKiBBbmltYXRpb24gc3R5bGUgdG8gdXNlIHdoZW4gc2Nyb2xsaW5nIGJldHdlZW4gbG9jYXRpb25zLiBDYW4gYmUgYCdzd2luZydgIG9yIGAnbGluZWFyJ2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2xpbmVhcidcbiAgICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9hcGkuanF1ZXJ5LmNvbS9hbmltYXRlfEpxdWVyeSBhbmltYXRlfVxuICAgKi9cbiAgYW5pbWF0aW9uRWFzaW5nOiAnbGluZWFyJyxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgdG8gdXNlIGFzIGEgbWFya2VyIGZvciBsb2NhdGlvbiBjaGFuZ2VzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwXG4gICAqL1xuICB0aHJlc2hvbGQ6IDUwLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyB0byBvZmZzZXQgdGhlIHNjcm9sbCBvZiB0aGUgcGFnZSBvbiBpdGVtIGNsaWNrIGlmIHVzaW5nIGEgc3RpY2t5IG5hdiBiYXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgb2Zmc2V0OiAwXG59XG5cbmV4cG9ydCB7U21vb3RoU2Nyb2xsfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zbW9vdGhTY3JvbGwuanMiLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgd2hhdElucHV0IGZyb20gXCJ3aGF0LWlucHV0XCI7XG5cbndpbmRvdy4kID0gJDtcblxuLy8gaW1wb3J0IEZvdW5kYXRpb24gZnJvbSAnZm91bmRhdGlvbi1zaXRlcyc7XG4vLyBJZiB5b3Ugd2FudCB0byBwaWNrIGFuZCBjaG9vc2Ugd2hpY2ggbW9kdWxlcyB0byBpbmNsdWRlLCBjb21tZW50IG91dCB0aGUgYWJvdmUgYW5kIHVuY29tbWVudFxuLy8gdGhlIGxpbmUgYmVsb3dcbmltcG9ydCBcIi4vbGliL2ZvdW5kYXRpb24tZXhwbGljaXQtcGllY2VzXCI7XG4vLyBpbXBvcnQgJy4vbGliL2FuaW1hdGlvbnMnO1xuXG4kKGRvY3VtZW50KS5mb3VuZGF0aW9uKCk7XG5cbiQoXCIubWVudS1pY29uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdCQodGhpcykudG9nZ2xlQ2xhc3MoXCJob3ZlclwiKTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvYXBwLmpzIiwiLyoqXG4gKiB3aGF0LWlucHV0IC0gQSBnbG9iYWwgdXRpbGl0eSBmb3IgdHJhY2tpbmcgdGhlIGN1cnJlbnQgaW5wdXQgbWV0aG9kIChtb3VzZSwga2V5Ym9hcmQgb3IgdG91Y2gpLlxuICogQHZlcnNpb24gdjQuMy4xXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vdGVuMXNldmVuL3doYXQtaW5wdXRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIndoYXRJbnB1dFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ3aGF0SW5wdXRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wid2hhdElucHV0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0ICAvKlxuXHQgICAqIHZhcmlhYmxlc1xuXHQgICAqL1xuXG5cdCAgLy8gbGFzdCB1c2VkIGlucHV0IHR5cGVcblx0ICB2YXIgY3VycmVudElucHV0ID0gJ2luaXRpYWwnO1xuXG5cdCAgLy8gbGFzdCB1c2VkIGlucHV0IGludGVudFxuXHQgIHZhciBjdXJyZW50SW50ZW50ID0gbnVsbDtcblxuXHQgIC8vIGNhY2hlIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXHQgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0ICAvLyBmb3JtIGlucHV0IHR5cGVzXG5cdCAgdmFyIGZvcm1JbnB1dHMgPSBbJ2lucHV0JywgJ3NlbGVjdCcsICd0ZXh0YXJlYSddO1xuXG5cdCAgdmFyIGZ1bmN0aW9uTGlzdCA9IFtdO1xuXG5cdCAgLy8gbGlzdCBvZiBtb2RpZmllciBrZXlzIGNvbW1vbmx5IHVzZWQgd2l0aCB0aGUgbW91c2UgYW5kXG5cdCAgLy8gY2FuIGJlIHNhZmVseSBpZ25vcmVkIHRvIHByZXZlbnQgZmFsc2Uga2V5Ym9hcmQgZGV0ZWN0aW9uXG5cdCAgdmFyIGlnbm9yZU1hcCA9IFsxNiwgLy8gc2hpZnRcblx0ICAxNywgLy8gY29udHJvbFxuXHQgIDE4LCAvLyBhbHRcblx0ICA5MSwgLy8gV2luZG93cyBrZXkgLyBsZWZ0IEFwcGxlIGNtZFxuXHQgIDkzIC8vIFdpbmRvd3MgbWVudSAvIHJpZ2h0IEFwcGxlIGNtZFxuXHQgIF07XG5cblx0ICAvLyBsaXN0IG9mIGtleXMgZm9yIHdoaWNoIHdlIGNoYW5nZSBpbnRlbnQgZXZlbiBmb3IgZm9ybSBpbnB1dHNcblx0ICB2YXIgY2hhbmdlSW50ZW50TWFwID0gWzkgLy8gdGFiXG5cdCAgXTtcblxuXHQgIC8vIG1hcHBpbmcgb2YgZXZlbnRzIHRvIGlucHV0IHR5cGVzXG5cdCAgdmFyIGlucHV0TWFwID0ge1xuXHQgICAga2V5ZG93bjogJ2tleWJvYXJkJyxcblx0ICAgIGtleXVwOiAna2V5Ym9hcmQnLFxuXHQgICAgbW91c2Vkb3duOiAnbW91c2UnLFxuXHQgICAgbW91c2Vtb3ZlOiAnbW91c2UnLFxuXHQgICAgTVNQb2ludGVyRG93bjogJ3BvaW50ZXInLFxuXHQgICAgTVNQb2ludGVyTW92ZTogJ3BvaW50ZXInLFxuXHQgICAgcG9pbnRlcmRvd246ICdwb2ludGVyJyxcblx0ICAgIHBvaW50ZXJtb3ZlOiAncG9pbnRlcicsXG5cdCAgICB0b3VjaHN0YXJ0OiAndG91Y2gnXG5cdCAgfTtcblxuXHQgIC8vIGFycmF5IG9mIGFsbCB1c2VkIGlucHV0IHR5cGVzXG5cdCAgdmFyIGlucHV0VHlwZXMgPSBbXTtcblxuXHQgIC8vIGJvb2xlYW46IHRydWUgaWYgdG91Y2ggYnVmZmVyIGlzIGFjdGl2ZVxuXHQgIHZhciBpc0J1ZmZlcmluZyA9IGZhbHNlO1xuXG5cdCAgLy8gYm9vbGVhbjogdHJ1ZSBpZiB0aGUgcGFnZSBpcyBiZWluZyBzY3JvbGxlZFxuXHQgIHZhciBpc1Njcm9sbGluZyA9IGZhbHNlO1xuXG5cdCAgLy8gc3RvcmUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuXHQgIHZhciBtb3VzZVBvcyA9IHtcblx0ICAgIHg6IG51bGwsXG5cdCAgICB5OiBudWxsXG5cdCAgfTtcblxuXHQgIC8vIG1hcCBvZiBJRSAxMCBwb2ludGVyIGV2ZW50c1xuXHQgIHZhciBwb2ludGVyTWFwID0ge1xuXHQgICAgMjogJ3RvdWNoJyxcblx0ICAgIDM6ICd0b3VjaCcsIC8vIHRyZWF0IHBlbiBsaWtlIHRvdWNoXG5cdCAgICA0OiAnbW91c2UnXG5cdCAgfTtcblxuXHQgIHZhciBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcblxuXHQgIHRyeSB7XG5cdCAgICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHQgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdHMpO1xuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cblx0ICAvKlxuXHQgICAqIHNldCB1cFxuXHQgICAqL1xuXG5cdCAgdmFyIHNldFVwID0gZnVuY3Rpb24gc2V0VXAoKSB7XG5cdCAgICAvLyBhZGQgY29ycmVjdCBtb3VzZSB3aGVlbCBldmVudCBtYXBwaW5nIHRvIGBpbnB1dE1hcGBcblx0ICAgIGlucHV0TWFwW2RldGVjdFdoZWVsKCldID0gJ21vdXNlJztcblxuXHQgICAgYWRkTGlzdGVuZXJzKCk7XG5cdCAgICBzZXRJbnB1dCgpO1xuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIGV2ZW50c1xuXHQgICAqL1xuXG5cdCAgdmFyIGFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcblx0ICAgIC8vIGBwb2ludGVybW92ZWAsIGBNU1BvaW50ZXJNb3ZlYCwgYG1vdXNlbW92ZWAgYW5kIG1vdXNlIHdoZWVsIGV2ZW50IGJpbmRpbmdcblx0ICAgIC8vIGNhbiBvbmx5IGRlbW9uc3RyYXRlIHBvdGVudGlhbCwgYnV0IG5vdCBhY3R1YWwsIGludGVyYWN0aW9uXG5cdCAgICAvLyBhbmQgYXJlIHRyZWF0ZWQgc2VwYXJhdGVseVxuXHQgICAgdmFyIG9wdGlvbnMgPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuXG5cdCAgICAvLyBwb2ludGVyIGV2ZW50cyAobW91c2UsIHBlbiwgdG91Y2gpXG5cdCAgICBpZiAod2luZG93LlBvaW50ZXJFdmVudCkge1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHNldEludGVudCk7XG5cdCAgICB9IGVsc2UgaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCkge1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsIHVwZGF0ZUlucHV0KTtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlck1vdmUnLCBzZXRJbnRlbnQpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gbW91c2UgZXZlbnRzXG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzZXRJbnRlbnQpO1xuXG5cdCAgICAgIC8vIHRvdWNoIGV2ZW50c1xuXHQgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG5cdCAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaEJ1ZmZlciwgb3B0aW9ucyk7XG5cdCAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hCdWZmZXIpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIC8vIG1vdXNlIHdoZWVsXG5cdCAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkZXRlY3RXaGVlbCgpLCBzZXRJbnRlbnQsIG9wdGlvbnMpO1xuXG5cdCAgICAvLyBrZXlib2FyZCBldmVudHNcblx0ICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdXBkYXRlSW5wdXQpO1xuXHQgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlSW5wdXQpO1xuXHQgIH07XG5cblx0ICAvLyBjaGVja3MgY29uZGl0aW9ucyBiZWZvcmUgdXBkYXRpbmcgbmV3IGlucHV0XG5cdCAgdmFyIHVwZGF0ZUlucHV0ID0gZnVuY3Rpb24gdXBkYXRlSW5wdXQoZXZlbnQpIHtcblx0ICAgIC8vIG9ubHkgZXhlY3V0ZSBpZiB0aGUgdG91Y2ggYnVmZmVyIHRpbWVyIGlzbid0IHJ1bm5pbmdcblx0ICAgIGlmICghaXNCdWZmZXJpbmcpIHtcblx0ICAgICAgdmFyIGV2ZW50S2V5ID0gZXZlbnQud2hpY2g7XG5cdCAgICAgIHZhciB2YWx1ZSA9IGlucHV0TWFwW2V2ZW50LnR5cGVdO1xuXHQgICAgICBpZiAodmFsdWUgPT09ICdwb2ludGVyJykgdmFsdWUgPSBwb2ludGVyVHlwZShldmVudCk7XG5cblx0ICAgICAgaWYgKGN1cnJlbnRJbnB1dCAhPT0gdmFsdWUgfHwgY3VycmVudEludGVudCAhPT0gdmFsdWUpIHtcblx0ICAgICAgICB2YXIgYWN0aXZlRWxlbSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdCAgICAgICAgdmFyIGFjdGl2ZUlucHV0ID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIG5vdEZvcm1JbnB1dCA9IGFjdGl2ZUVsZW0gJiYgYWN0aXZlRWxlbS5ub2RlTmFtZSAmJiBmb3JtSW5wdXRzLmluZGV4T2YoYWN0aXZlRWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSA9PT0gLTE7XG5cblx0ICAgICAgICBpZiAobm90Rm9ybUlucHV0IHx8IGNoYW5nZUludGVudE1hcC5pbmRleE9mKGV2ZW50S2V5KSAhPT0gLTEpIHtcblx0ICAgICAgICAgIGFjdGl2ZUlucHV0ID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAodmFsdWUgPT09ICd0b3VjaCcgfHxcblx0ICAgICAgICAvLyBpZ25vcmUgbW91c2UgbW9kaWZpZXIga2V5c1xuXHQgICAgICAgIHZhbHVlID09PSAnbW91c2UnIHx8XG5cdCAgICAgICAgLy8gZG9uJ3Qgc3dpdGNoIGlmIHRoZSBjdXJyZW50IGVsZW1lbnQgaXMgYSBmb3JtIGlucHV0XG5cdCAgICAgICAgdmFsdWUgPT09ICdrZXlib2FyZCcgJiYgZXZlbnRLZXkgJiYgYWN0aXZlSW5wdXQgJiYgaWdub3JlTWFwLmluZGV4T2YoZXZlbnRLZXkpID09PSAtMSkge1xuXHQgICAgICAgICAgLy8gc2V0IHRoZSBjdXJyZW50IGFuZCBjYXRjaC1hbGwgdmFyaWFibGVcblx0ICAgICAgICAgIGN1cnJlbnRJbnB1dCA9IGN1cnJlbnRJbnRlbnQgPSB2YWx1ZTtcblxuXHQgICAgICAgICAgc2V0SW5wdXQoKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gdXBkYXRlcyB0aGUgZG9jIGFuZCBgaW5wdXRUeXBlc2AgYXJyYXkgd2l0aCBuZXcgaW5wdXRcblx0ICB2YXIgc2V0SW5wdXQgPSBmdW5jdGlvbiBzZXRJbnB1dCgpIHtcblx0ICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGlucHV0JywgY3VycmVudElucHV0KTtcblx0ICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGludGVudCcsIGN1cnJlbnRJbnB1dCk7XG5cblx0ICAgIGlmIChpbnB1dFR5cGVzLmluZGV4T2YoY3VycmVudElucHV0KSA9PT0gLTEpIHtcblx0ICAgICAgaW5wdXRUeXBlcy5wdXNoKGN1cnJlbnRJbnB1dCk7XG5cdCAgICAgIGRvYy5jbGFzc05hbWUgKz0gJyB3aGF0aW5wdXQtdHlwZXMtJyArIGN1cnJlbnRJbnB1dDtcblx0ICAgIH1cblxuXHQgICAgZmlyZUZ1bmN0aW9ucygnaW5wdXQnKTtcblx0ICB9O1xuXG5cdCAgLy8gdXBkYXRlcyBpbnB1dCBpbnRlbnQgZm9yIGBtb3VzZW1vdmVgIGFuZCBgcG9pbnRlcm1vdmVgXG5cdCAgdmFyIHNldEludGVudCA9IGZ1bmN0aW9uIHNldEludGVudChldmVudCkge1xuXHQgICAgLy8gdGVzdCB0byBzZWUgaWYgYG1vdXNlbW92ZWAgaGFwcGVuZWQgcmVsYXRpdmUgdG8gdGhlIHNjcmVlblxuXHQgICAgLy8gdG8gZGV0ZWN0IHNjcm9sbGluZyB2ZXJzdXMgbW91c2Vtb3ZlXG5cdCAgICBpZiAobW91c2VQb3NbJ3gnXSAhPT0gZXZlbnQuc2NyZWVuWCB8fCBtb3VzZVBvc1sneSddICE9PSBldmVudC5zY3JlZW5ZKSB7XG5cdCAgICAgIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cblx0ICAgICAgbW91c2VQb3NbJ3gnXSA9IGV2ZW50LnNjcmVlblg7XG5cdCAgICAgIG1vdXNlUG9zWyd5J10gPSBldmVudC5zY3JlZW5ZO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaXNTY3JvbGxpbmcgPSB0cnVlO1xuXHQgICAgfVxuXG5cdCAgICAvLyBvbmx5IGV4ZWN1dGUgaWYgdGhlIHRvdWNoIGJ1ZmZlciB0aW1lciBpc24ndCBydW5uaW5nXG5cdCAgICAvLyBvciBzY3JvbGxpbmcgaXNuJ3QgaGFwcGVuaW5nXG5cdCAgICBpZiAoIWlzQnVmZmVyaW5nICYmICFpc1Njcm9sbGluZykge1xuXHQgICAgICB2YXIgdmFsdWUgPSBpbnB1dE1hcFtldmVudC50eXBlXTtcblx0ICAgICAgaWYgKHZhbHVlID09PSAncG9pbnRlcicpIHZhbHVlID0gcG9pbnRlclR5cGUoZXZlbnQpO1xuXG5cdCAgICAgIGlmIChjdXJyZW50SW50ZW50ICE9PSB2YWx1ZSkge1xuXHQgICAgICAgIGN1cnJlbnRJbnRlbnQgPSB2YWx1ZTtcblxuXHQgICAgICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGludGVudCcsIGN1cnJlbnRJbnRlbnQpO1xuXG5cdCAgICAgICAgZmlyZUZ1bmN0aW9ucygnaW50ZW50Jyk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gYnVmZmVycyB0b3VjaCBldmVudHMgYmVjYXVzZSB0aGV5IGZyZXF1ZW50bHkgYWxzbyBmaXJlIG1vdXNlIGV2ZW50c1xuXHQgIHZhciB0b3VjaEJ1ZmZlciA9IGZ1bmN0aW9uIHRvdWNoQnVmZmVyKGV2ZW50KSB7XG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG5cdCAgICAgIGlzQnVmZmVyaW5nID0gZmFsc2U7XG5cblx0ICAgICAgLy8gc2V0IHRoZSBjdXJyZW50IGlucHV0XG5cdCAgICAgIHVwZGF0ZUlucHV0KGV2ZW50KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlzQnVmZmVyaW5nID0gdHJ1ZTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgdmFyIGZpcmVGdW5jdGlvbnMgPSBmdW5jdGlvbiBmaXJlRnVuY3Rpb25zKHR5cGUpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmdW5jdGlvbkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGZ1bmN0aW9uTGlzdFtpXS50eXBlID09PSB0eXBlKSB7XG5cdCAgICAgICAgZnVuY3Rpb25MaXN0W2ldLmZuLmNhbGwodW5kZWZpbmVkLCBjdXJyZW50SW50ZW50KTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIHV0aWxpdGllc1xuXHQgICAqL1xuXG5cdCAgdmFyIHBvaW50ZXJUeXBlID0gZnVuY3Rpb24gcG9pbnRlclR5cGUoZXZlbnQpIHtcblx0ICAgIGlmICh0eXBlb2YgZXZlbnQucG9pbnRlclR5cGUgPT09ICdudW1iZXInKSB7XG5cdCAgICAgIHJldHVybiBwb2ludGVyTWFwW2V2ZW50LnBvaW50ZXJUeXBlXTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIHRyZWF0IHBlbiBsaWtlIHRvdWNoXG5cdCAgICAgIHJldHVybiBldmVudC5wb2ludGVyVHlwZSA9PT0gJ3BlbicgPyAndG91Y2gnIDogZXZlbnQucG9pbnRlclR5cGU7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIGRldGVjdCB2ZXJzaW9uIG9mIG1vdXNlIHdoZWVsIGV2ZW50IHRvIHVzZVxuXHQgIC8vIHZpYSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvd2hlZWxcblx0ICB2YXIgZGV0ZWN0V2hlZWwgPSBmdW5jdGlvbiBkZXRlY3RXaGVlbCgpIHtcblx0ICAgIHZhciB3aGVlbFR5cGUgPSB2b2lkIDA7XG5cblx0ICAgIC8vIE1vZGVybiBicm93c2VycyBzdXBwb3J0IFwid2hlZWxcIlxuXHQgICAgaWYgKCdvbndoZWVsJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkge1xuXHQgICAgICB3aGVlbFR5cGUgPSAnd2hlZWwnO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gV2Via2l0IGFuZCBJRSBzdXBwb3J0IGF0IGxlYXN0IFwibW91c2V3aGVlbFwiXG5cdCAgICAgIC8vIG9yIGFzc3VtZSB0aGF0IHJlbWFpbmluZyBicm93c2VycyBhcmUgb2xkZXIgRmlyZWZveFxuXHQgICAgICB3aGVlbFR5cGUgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgIT09IHVuZGVmaW5lZCA/ICdtb3VzZXdoZWVsJyA6ICdET01Nb3VzZVNjcm9sbCc7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiB3aGVlbFR5cGU7XG5cdCAgfTtcblxuXHQgIHZhciBvYmpQb3MgPSBmdW5jdGlvbiBvYmpQb3MobWF0Y2gpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmdW5jdGlvbkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGZ1bmN0aW9uTGlzdFtpXS5mbiA9PT0gbWF0Y2gpIHtcblx0ICAgICAgICByZXR1cm4gaTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIGluaXRcblx0ICAgKi9cblxuXHQgIC8vIGRvbid0IHN0YXJ0IHNjcmlwdCB1bmxlc3MgYnJvd3NlciBjdXRzIHRoZSBtdXN0YXJkXG5cdCAgLy8gKGFsc28gcGFzc2VzIGlmIHBvbHlmaWxscyBhcmUgdXNlZClcblx0ICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdyAmJiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuXHQgICAgc2V0VXAoKTtcblx0ICB9XG5cblx0ICAvKlxuXHQgICAqIGFwaVxuXHQgICAqL1xuXG5cdCAgcmV0dXJuIHtcblx0ICAgIC8vIHJldHVybnMgc3RyaW5nOiB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG5cdCAgICAvLyBvcHQ6ICdsb29zZSd8J3N0cmljdCdcblx0ICAgIC8vICdzdHJpY3QnIChkZWZhdWx0KTogcmV0dXJucyB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgYGRhdGEtd2hhdGlucHV0YCBhdHRyaWJ1dGVcblx0ICAgIC8vICdsb29zZSc6IGluY2x1ZGVzIGBkYXRhLXdoYXRpbnRlbnRgIHZhbHVlIGlmIGl0J3MgbW9yZSBjdXJyZW50IHRoYW4gYGRhdGEtd2hhdGlucHV0YFxuXHQgICAgYXNrOiBmdW5jdGlvbiBhc2sob3B0KSB7XG5cdCAgICAgIHJldHVybiBvcHQgPT09ICdsb29zZScgPyBjdXJyZW50SW50ZW50IDogY3VycmVudElucHV0O1xuXHQgICAgfSxcblxuXHQgICAgLy8gcmV0dXJucyBhcnJheTogYWxsIHRoZSBkZXRlY3RlZCBpbnB1dCB0eXBlc1xuXHQgICAgdHlwZXM6IGZ1bmN0aW9uIHR5cGVzKCkge1xuXHQgICAgICByZXR1cm4gaW5wdXRUeXBlcztcblx0ICAgIH0sXG5cblx0ICAgIC8vIG92ZXJ3cml0ZXMgaWdub3JlZCBrZXlzIHdpdGggcHJvdmlkZWQgYXJyYXlcblx0ICAgIGlnbm9yZUtleXM6IGZ1bmN0aW9uIGlnbm9yZUtleXMoYXJyKSB7XG5cdCAgICAgIGlnbm9yZU1hcCA9IGFycjtcblx0ICAgIH0sXG5cblx0ICAgIC8vIGF0dGFjaCBmdW5jdGlvbnMgdG8gaW5wdXQgYW5kIGludGVudCBcImV2ZW50c1wiXG5cdCAgICAvLyBmdW5jdDogZnVuY3Rpb24gdG8gZmlyZSBvbiBjaGFuZ2Vcblx0ICAgIC8vIGV2ZW50VHlwZTogJ2lucHV0J3wnaW50ZW50J1xuXHQgICAgcmVnaXN0ZXJPbkNoYW5nZTogZnVuY3Rpb24gcmVnaXN0ZXJPbkNoYW5nZShmbiwgZXZlbnRUeXBlKSB7XG5cdCAgICAgIGZ1bmN0aW9uTGlzdC5wdXNoKHtcblx0ICAgICAgICBmbjogZm4sXG5cdCAgICAgICAgdHlwZTogZXZlbnRUeXBlIHx8ICdpbnB1dCdcblx0ICAgICAgfSk7XG5cdCAgICB9LFxuXG5cdCAgICB1blJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHVuUmVnaXN0ZXJPbkNoYW5nZShmbikge1xuXHQgICAgICB2YXIgcG9zaXRpb24gPSBvYmpQb3MoZm4pO1xuXG5cdCAgICAgIGlmIChwb3NpdGlvbikge1xuXHQgICAgICAgIGZ1bmN0aW9uTGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblx0fSgpO1xuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBGb3VuZGF0aW9uIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmNvcmUnO1xuaW1wb3J0IHsgcnRsLCBHZXRZb0RpZ2l0cywgdHJhbnNpdGlvbmVuZCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuYm94J1xuaW1wb3J0IHsgb25JbWFnZXNMb2FkZWQgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlcic7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IE1vdGlvbiwgTW92ZSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1vdGlvbic7XG5pbXBvcnQgeyBOZXN0IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubmVzdCc7XG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRpbWVyJztcbmltcG9ydCB7IFRvdWNoIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudG91Y2gnO1xuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG4vLyBpbXBvcnQgeyBBYmlkZSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5hYmlkZSc7XG5pbXBvcnQgeyBBY2NvcmRpb24gfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uJztcbmltcG9ydCB7IEFjY29yZGlvbk1lbnUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudSc7XG4vLyBpbXBvcnQgeyBEcmlsbGRvd24gfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJpbGxkb3duJztcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duJztcbmltcG9ydCB7IERyb3Bkb3duTWVudSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bk1lbnUnO1xuaW1wb3J0IHsgRXF1YWxpemVyIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmVxdWFsaXplcic7XG5pbXBvcnQgeyBJbnRlcmNoYW5nZSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5pbnRlcmNoYW5nZSc7XG5pbXBvcnQgeyBNYWdlbGxhbiB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5tYWdlbGxhbic7XG5pbXBvcnQgeyBPZmZDYW52YXMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ub2ZmY2FudmFzJztcbi8vIGltcG9ydCB7IE9yYml0IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLm9yYml0JztcbmltcG9ydCB7IFJlc3BvbnNpdmVNZW51IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVNZW51JztcbmltcG9ydCB7IFJlc3BvbnNpdmVUb2dnbGUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucmVzcG9uc2l2ZVRvZ2dsZSc7XG5pbXBvcnQgeyBSZXZlYWwgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucmV2ZWFsJztcbi8vIGltcG9ydCB7IFNsaWRlciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zbGlkZXInO1xuaW1wb3J0IHsgU21vb3RoU2Nyb2xsIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnNtb290aFNjcm9sbCc7XG5pbXBvcnQgeyBTdGlja3kgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uc3RpY2t5Jztcbi8vIGltcG9ydCB7IFRhYnMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udGFicyc7XG5pbXBvcnQgeyBUb2dnbGVyIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRvZ2dsZXInO1xuLy8gaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50b29sdGlwJztcbi8vIGltcG9ydCB7IFJlc3BvbnNpdmVBY2NvcmRpb25UYWJzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVBY2NvcmRpb25UYWJzJztcblxuXG5Gb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCQpO1xuXG4vLyBBZGQgRm91bmRhdGlvbiBVdGlscyB0byBGb3VuZGF0aW9uIGdsb2JhbCBuYW1lc3BhY2UgZm9yIGJhY2t3YXJkc1xuLy8gY29tcGF0aWJpbGl0eS5cblxuRm91bmRhdGlvbi5ydGwgPSBydGw7XG5Gb3VuZGF0aW9uLkdldFlvRGlnaXRzID0gR2V0WW9EaWdpdHM7XG5Gb3VuZGF0aW9uLnRyYW5zaXRpb25lbmQgPSB0cmFuc2l0aW9uZW5kO1xuXG5Gb3VuZGF0aW9uLkJveCA9IEJveDtcbkZvdW5kYXRpb24ub25JbWFnZXNMb2FkZWQgPSBvbkltYWdlc0xvYWRlZDtcbkZvdW5kYXRpb24uS2V5Ym9hcmQgPSBLZXlib2FyZDtcbkZvdW5kYXRpb24uTWVkaWFRdWVyeSA9IE1lZGlhUXVlcnk7XG5Gb3VuZGF0aW9uLk1vdGlvbiA9IE1vdGlvbjtcbkZvdW5kYXRpb24uTW92ZSA9IE1vdmU7XG5Gb3VuZGF0aW9uLk5lc3QgPSBOZXN0O1xuRm91bmRhdGlvbi5UaW1lciA9IFRpbWVyO1xuXG4vLyBUb3VjaCBhbmQgVHJpZ2dlcnMgcHJldmlvdXNseSB3ZXJlIGFsbW9zdCBwdXJlbHkgc2VkZSBlZmZlY3QgZHJpdmVuLFxuLy8gc28gbm8gLy8gbmVlZCB0byBhZGQgaXQgdG8gRm91bmRhdGlvbiwganVzdCBpbml0IHRoZW0uXG5cblRvdWNoLmluaXQoJCk7XG5cblRyaWdnZXJzLmluaXQoJCwgRm91bmRhdGlvbik7XG5cbi8vIEZvdW5kYXRpb24ucGx1Z2luKEFiaWRlLCAnQWJpZGUnKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oQWNjb3JkaW9uLCAnQWNjb3JkaW9uJyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKEFjY29yZGlvbk1lbnUsICdBY2NvcmRpb25NZW51Jyk7XG5cbi8vIEZvdW5kYXRpb24ucGx1Z2luKERyaWxsZG93biwgJ0RyaWxsZG93bicpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihEcm9wZG93biwgJ0Ryb3Bkb3duJyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKERyb3Bkb3duTWVudSwgJ0Ryb3Bkb3duTWVudScpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihFcXVhbGl6ZXIsICdFcXVhbGl6ZXInKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oSW50ZXJjaGFuZ2UsICdJbnRlcmNoYW5nZScpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihNYWdlbGxhbiwgJ01hZ2VsbGFuJyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKE9mZkNhbnZhcywgJ09mZkNhbnZhcycpO1xuXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihPcmJpdCwgJ09yYml0Jyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVNZW51LCAnUmVzcG9uc2l2ZU1lbnUnKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oUmVzcG9uc2l2ZVRvZ2dsZSwgJ1Jlc3BvbnNpdmVUb2dnbGUnKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oUmV2ZWFsLCAnUmV2ZWFsJyk7XG5cbi8vIEZvdW5kYXRpb24ucGx1Z2luKFNsaWRlciwgJ1NsaWRlcicpO1xuXG5Gb3VuZGF0aW9uLnBsdWdpbihTbW9vdGhTY3JvbGwsICdTbW9vdGhTY3JvbGwnKTtcblxuRm91bmRhdGlvbi5wbHVnaW4oU3RpY2t5LCAnU3RpY2t5Jyk7XG5cbi8vIEZvdW5kYXRpb24ucGx1Z2luKFRhYnMsICdUYWJzJyk7XG5cbkZvdW5kYXRpb24ucGx1Z2luKFRvZ2dsZXIsICdUb2dnbGVyJyk7XG5cbi8vIEZvdW5kYXRpb24ucGx1Z2luKFRvb2x0aXAsICdUb29sdGlwJyk7XG5cbi8vIEZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVBY2NvcmRpb25UYWJzLCAnUmVzcG9uc2l2ZUFjY29yZGlvblRhYnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb3VuZGF0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5cbnZhciBGT1VOREFUSU9OX1ZFUlNJT04gPSAnNi40LjMnO1xuXG4vLyBHbG9iYWwgRm91bmRhdGlvbiBvYmplY3Rcbi8vIFRoaXMgaXMgYXR0YWNoZWQgdG8gdGhlIHdpbmRvdywgb3IgdXNlZCBhcyBhIG1vZHVsZSBmb3IgQU1EL0Jyb3dzZXJpZnlcbnZhciBGb3VuZGF0aW9uID0ge1xuICB2ZXJzaW9uOiBGT1VOREFUSU9OX1ZFUlNJT04sXG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbml0aWFsaXplZCBwbHVnaW5zLlxuICAgKi9cbiAgX3BsdWdpbnM6IHt9LFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgZ2VuZXJhdGVkIHVuaXF1ZSBpZHMgZm9yIHBsdWdpbiBpbnN0YW5jZXNcbiAgICovXG4gIF91dWlkczogW10sXG5cbiAgLyoqXG4gICAqIERlZmluZXMgYSBGb3VuZGF0aW9uIHBsdWdpbiwgYWRkaW5nIGl0IHRvIHRoZSBgRm91bmRhdGlvbmAgbmFtZXNwYWNlIGFuZCB0aGUgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUgd2hlbiByZWZsb3dpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBUaGUgY29uc3RydWN0b3Igb2YgdGhlIHBsdWdpbi5cbiAgICovXG4gIHBsdWdpbjogZnVuY3Rpb24ocGx1Z2luLCBuYW1lKSB7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBhZGRpbmcgdG8gZ2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4gICAgLy8gRXhhbXBsZXM6IEZvdW5kYXRpb24uUmV2ZWFsLCBGb3VuZGF0aW9uLk9mZkNhbnZhc1xuICAgIHZhciBjbGFzc05hbWUgPSAobmFtZSB8fCBmdW5jdGlvbk5hbWUocGx1Z2luKSk7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBzdG9yaW5nIHRoZSBwbHVnaW4sIGFsc28gdXNlZCB0byBjcmVhdGUgdGhlIGlkZW50aWZ5aW5nIGRhdGEgYXR0cmlidXRlIGZvciB0aGUgcGx1Z2luXG4gICAgLy8gRXhhbXBsZXM6IGRhdGEtcmV2ZWFsLCBkYXRhLW9mZi1jYW52YXNcbiAgICB2YXIgYXR0ck5hbWUgID0gaHlwaGVuYXRlKGNsYXNzTmFtZSk7XG5cbiAgICAvLyBBZGQgdG8gdGhlIEZvdW5kYXRpb24gb2JqZWN0IGFuZCB0aGUgcGx1Z2lucyBsaXN0IChmb3IgcmVmbG93aW5nKVxuICAgIHRoaXMuX3BsdWdpbnNbYXR0ck5hbWVdID0gdGhpc1tjbGFzc05hbWVdID0gcGx1Z2luO1xuICB9LFxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIFBvcHVsYXRlcyB0aGUgX3V1aWRzIGFycmF5IHdpdGggcG9pbnRlcnMgdG8gZWFjaCBpbmRpdmlkdWFsIHBsdWdpbiBpbnN0YW5jZS5cbiAgICogQWRkcyB0aGUgYHpmUGx1Z2luYCBkYXRhLWF0dHJpYnV0ZSB0byBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZWQgcGx1Z2lucyB0byBhbGxvdyB1c2Ugb2YgJChzZWxlY3RvcikuZm91bmRhdGlvbihtZXRob2QpIGNhbGxzLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBpbml0aWFsaXphdGlvbiBldmVudCBmb3IgZWFjaCBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIHBsdWdpbiwgcGFzc2VkIGFzIGEgY2FtZWxDYXNlZCBzdHJpbmcuXG4gICAqIEBmaXJlcyBQbHVnaW4jaW5pdFxuICAgKi9cbiAgcmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSl7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBuYW1lID8gaHlwaGVuYXRlKG5hbWUpIDogZnVuY3Rpb25OYW1lKHBsdWdpbi5jb25zdHJ1Y3RvcikudG9Mb3dlckNhc2UoKTtcbiAgICBwbHVnaW4udXVpZCA9IEdldFlvRGlnaXRzKDYsIHBsdWdpbk5hbWUpO1xuXG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gLCBwbHVnaW4udXVpZCk7IH1cbiAgICBpZighcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyBwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nLCBwbHVnaW4pOyB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2luaXRcbiAgICAgICAgICAgKi9cbiAgICBwbHVnaW4uJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG5cbiAgICB0aGlzLl91dWlkcy5wdXNoKHBsdWdpbi51dWlkKTtcblxuICAgIHJldHVybjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBSZW1vdmVzIHRoZSBwbHVnaW5zIHV1aWQgZnJvbSB0aGUgX3V1aWRzIGFycmF5LlxuICAgKiBSZW1vdmVzIHRoZSB6ZlBsdWdpbiBkYXRhIGF0dHJpYnV0ZSwgYXMgd2VsbCBhcyB0aGUgZGF0YS1wbHVnaW4tbmFtZSBhdHRyaWJ1dGUuXG4gICAqIEFsc28gZmlyZXMgdGhlIGRlc3Ryb3llZCBldmVudCBmb3IgdGhlIHBsdWdpbiwgY29uc29saWRhdGluZyByZXBldGl0aXZlIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBhbiBpbnN0YW5jZSBvZiBhIHBsdWdpbiwgdXN1YWxseSBgdGhpc2AgaW4gY29udGV4dC5cbiAgICogQGZpcmVzIFBsdWdpbiNkZXN0cm95ZWRcbiAgICovXG4gIHVucmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBoeXBoZW5hdGUoZnVuY3Rpb25OYW1lKHBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpLmNvbnN0cnVjdG9yKSk7XG5cbiAgICB0aGlzLl91dWlkcy5zcGxpY2UodGhpcy5fdXVpZHMuaW5kZXhPZihwbHVnaW4udXVpZCksIDEpO1xuICAgIHBsdWdpbi4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIC50cmlnZ2VyKGBkZXN0cm95ZWQuemYuJHtwbHVnaW5OYW1lfWApO1xuICAgIGZvcih2YXIgcHJvcCBpbiBwbHVnaW4pe1xuICAgICAgcGx1Z2luW3Byb3BdID0gbnVsbDsvL2NsZWFuIHVwIHNjcmlwdCB0byBwcmVwIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgfVxuICAgIHJldHVybjtcbiAgfSxcblxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIENhdXNlcyBvbmUgb3IgbW9yZSBhY3RpdmUgcGx1Z2lucyB0byByZS1pbml0aWFsaXplLCByZXNldHRpbmcgZXZlbnQgbGlzdGVuZXJzLCByZWNhbGN1bGF0aW5nIHBvc2l0aW9ucywgZXRjLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGx1Z2lucyAtIG9wdGlvbmFsIHN0cmluZyBvZiBhbiBpbmRpdmlkdWFsIHBsdWdpbiBrZXksIGF0dGFpbmVkIGJ5IGNhbGxpbmcgYCQoZWxlbWVudCkuZGF0YSgncGx1Z2luTmFtZScpYCwgb3Igc3RyaW5nIG9mIGEgcGx1Z2luIGNsYXNzIGkuZS4gYCdkcm9wZG93bidgXG4gICAqIEBkZWZhdWx0IElmIG5vIGFyZ3VtZW50IGlzIHBhc3NlZCwgcmVmbG93IGFsbCBjdXJyZW50bHkgYWN0aXZlIHBsdWdpbnMuXG4gICAqL1xuICAgcmVJbml0OiBmdW5jdGlvbihwbHVnaW5zKXtcbiAgICAgdmFyIGlzSlEgPSBwbHVnaW5zIGluc3RhbmNlb2YgJDtcbiAgICAgdHJ5e1xuICAgICAgIGlmKGlzSlEpe1xuICAgICAgICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICQodGhpcykuZGF0YSgnemZQbHVnaW4nKS5faW5pdCgpO1xuICAgICAgICAgfSk7XG4gICAgICAgfWVsc2V7XG4gICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBwbHVnaW5zLFxuICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgZm5zID0ge1xuICAgICAgICAgICAnb2JqZWN0JzogZnVuY3Rpb24ocGxncyl7XG4gICAgICAgICAgICAgcGxncy5mb3JFYWNoKGZ1bmN0aW9uKHApe1xuICAgICAgICAgICAgICAgcCA9IGh5cGhlbmF0ZShwKTtcbiAgICAgICAgICAgICAgICQoJ1tkYXRhLScrIHAgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3N0cmluZyc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgcGx1Z2lucyA9IGh5cGhlbmF0ZShwbHVnaW5zKTtcbiAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwbHVnaW5zICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICd1bmRlZmluZWQnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHRoaXNbJ29iamVjdCddKE9iamVjdC5rZXlzKF90aGlzLl9wbHVnaW5zKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH07XG4gICAgICAgICBmbnNbdHlwZV0ocGx1Z2lucyk7XG4gICAgICAgfVxuICAgICB9Y2F0Y2goZXJyKXtcbiAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgIH1maW5hbGx5e1xuICAgICAgIHJldHVybiBwbHVnaW5zO1xuICAgICB9XG4gICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHBsdWdpbnMgb24gYW55IGVsZW1lbnRzIHdpdGhpbiBgZWxlbWAgKGFuZCBgZWxlbWAgaXRzZWxmKSB0aGF0IGFyZW4ndCBhbHJlYWR5IGluaXRpYWxpemVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSAtIGpRdWVyeSBvYmplY3QgY29udGFpbmluZyB0aGUgZWxlbWVudCB0byBjaGVjayBpbnNpZGUuIEFsc28gY2hlY2tzIHRoZSBlbGVtZW50IGl0c2VsZiwgdW5sZXNzIGl0J3MgdGhlIGBkb2N1bWVudGAgb2JqZWN0LlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGx1Z2lucyAtIEEgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUuIExlYXZlIHRoaXMgb3V0IHRvIGluaXRpYWxpemUgZXZlcnl0aGluZy5cbiAgICovXG4gIHJlZmxvdzogZnVuY3Rpb24oZWxlbSwgcGx1Z2lucykge1xuXG4gICAgLy8gSWYgcGx1Z2lucyBpcyB1bmRlZmluZWQsIGp1c3QgZ3JhYiBldmVyeXRoaW5nXG4gICAgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcGx1Z2lucyA9IE9iamVjdC5rZXlzKHRoaXMuX3BsdWdpbnMpO1xuICAgIH1cbiAgICAvLyBJZiBwbHVnaW5zIGlzIGEgc3RyaW5nLCBjb252ZXJ0IGl0IHRvIGFuIGFycmF5IHdpdGggb25lIGl0ZW1cbiAgICBlbHNlIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBsdWdpblxuICAgICQuZWFjaChwbHVnaW5zLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGx1Z2luXG4gICAgICB2YXIgcGx1Z2luID0gX3RoaXMuX3BsdWdpbnNbbmFtZV07XG5cbiAgICAgIC8vIExvY2FsaXplIHRoZSBzZWFyY2ggdG8gYWxsIGVsZW1lbnRzIGluc2lkZSBlbGVtLCBhcyB3ZWxsIGFzIGVsZW0gaXRzZWxmLCB1bmxlc3MgZWxlbSA9PT0gZG9jdW1lbnRcbiAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSkuZmluZCgnW2RhdGEtJytuYW1lKyddJykuYWRkQmFjaygnW2RhdGEtJytuYW1lKyddJyk7XG5cbiAgICAgIC8vIEZvciBlYWNoIHBsdWdpbiBmb3VuZCwgaW5pdGlhbGl6ZSBpdFxuICAgICAgJGVsZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIC8vIERvbid0IGRvdWJsZS1kaXAgb24gcGx1Z2luc1xuICAgICAgICBpZiAoJGVsLmRhdGEoJ3pmUGx1Z2luJykpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJUcmllZCB0byBpbml0aWFsaXplIFwiK25hbWUrXCIgb24gYW4gZWxlbWVudCB0aGF0IGFscmVhZHkgaGFzIGEgRm91bmRhdGlvbiBwbHVnaW4uXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKSl7XG4gICAgICAgICAgdmFyIHRoaW5nID0gJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpLnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcbiAgICAgICAgICAgIHZhciBvcHQgPSBlLnNwbGl0KCc6JykubWFwKGZ1bmN0aW9uKGVsKXsgcmV0dXJuIGVsLnRyaW0oKTsgfSk7XG4gICAgICAgICAgICBpZihvcHRbMF0pIG9wdHNbb3B0WzBdXSA9IHBhcnNlVmFsdWUob3B0WzFdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0cnl7XG4gICAgICAgICAgJGVsLmRhdGEoJ3pmUGx1Z2luJywgbmV3IHBsdWdpbigkKHRoaXMpLCBvcHRzKSk7XG4gICAgICAgIH1jYXRjaChlcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcik7XG4gICAgICAgIH1maW5hbGx5e1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldEZuTmFtZTogZnVuY3Rpb25OYW1lLFxuXG4gIGFkZFRvSnF1ZXJ5OiBmdW5jdGlvbigkKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgbm90IG1ha2luZyB0aGlzIGEgalF1ZXJ5IGZ1bmN0aW9uXG4gICAgLy8gVE9ETzogbmVlZCB3YXkgdG8gcmVmbG93IHZzLiByZS1pbml0aWFsaXplXG4gICAgLyoqXG4gICAgICogVGhlIEZvdW5kYXRpb24galF1ZXJ5IG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWV0aG9kIC0gQW4gYWN0aW9uIHRvIHBlcmZvcm0gb24gdGhlIGN1cnJlbnQgalF1ZXJ5IG9iamVjdC5cbiAgICAgKi9cbiAgICB2YXIgZm91bmRhdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgbWV0aG9kLFxuICAgICAgICAgICRub0pTID0gJCgnLm5vLWpzJyk7XG5cbiAgICAgIGlmKCRub0pTLmxlbmd0aCl7XG4gICAgICAgICRub0pTLnJlbW92ZUNsYXNzKCduby1qcycpO1xuICAgICAgfVxuXG4gICAgICBpZih0eXBlID09PSAndW5kZWZpbmVkJyl7Ly9uZWVkcyB0byBpbml0aWFsaXplIHRoZSBGb3VuZGF0aW9uIG9iamVjdCwgb3IgYW4gaW5kaXZpZHVhbCBwbHVnaW4uXG4gICAgICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICAgICAgRm91bmRhdGlvbi5yZWZsb3codGhpcyk7XG4gICAgICB9ZWxzZSBpZih0eXBlID09PSAnc3RyaW5nJyl7Ly9hbiBpbmRpdmlkdWFsIG1ldGhvZCB0byBpbnZva2Ugb24gYSBwbHVnaW4gb3IgZ3JvdXAgb2YgcGx1Z2luc1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7Ly9jb2xsZWN0IGFsbCB0aGUgYXJndW1lbnRzLCBpZiBuZWNlc3NhcnlcbiAgICAgICAgdmFyIHBsdWdDbGFzcyA9IHRoaXMuZGF0YSgnemZQbHVnaW4nKTsvL2RldGVybWluZSB0aGUgY2xhc3Mgb2YgcGx1Z2luXG5cbiAgICAgICAgaWYocGx1Z0NsYXNzICE9PSB1bmRlZmluZWQgJiYgcGx1Z0NsYXNzW21ldGhvZF0gIT09IHVuZGVmaW5lZCl7Ly9tYWtlIHN1cmUgYm90aCB0aGUgY2xhc3MgYW5kIG1ldGhvZCBleGlzdFxuICAgICAgICAgIGlmKHRoaXMubGVuZ3RoID09PSAxKXsvL2lmIHRoZXJlJ3Mgb25seSBvbmUsIGNhbGwgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgICAgIHBsdWdDbGFzc1ttZXRob2RdLmFwcGx5KHBsdWdDbGFzcywgYXJncyk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSwgZWwpey8vb3RoZXJ3aXNlIGxvb3AgdGhyb3VnaCB0aGUgalF1ZXJ5IGNvbGxlY3Rpb24gYW5kIGludm9rZSB0aGUgbWV0aG9kIG9uIGVhY2hcbiAgICAgICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkoJChlbCkuZGF0YSgnemZQbHVnaW4nKSwgYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNley8vZXJyb3IgZm9yIG5vIGNsYXNzIG9yIG5vIG1ldGhvZFxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlJ3JlIHNvcnJ5LCAnXCIgKyBtZXRob2QgKyBcIicgaXMgbm90IGFuIGF2YWlsYWJsZSBtZXRob2QgZm9yIFwiICsgKHBsdWdDbGFzcyA/IGZ1bmN0aW9uTmFtZShwbHVnQ2xhc3MpIDogJ3RoaXMgZWxlbWVudCcpICsgJy4nKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7Ly9lcnJvciBmb3IgaW52YWxpZCBhcmd1bWVudCB0eXBlXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdlJ3JlIHNvcnJ5LCAke3R5cGV9IGlzIG5vdCBhIHZhbGlkIHBhcmFtZXRlci4gWW91IG11c3QgdXNlIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbWV0aG9kIHlvdSB3aXNoIHRvIGludm9rZS5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgJC5mbi5mb3VuZGF0aW9uID0gZm91bmRhdGlvbjtcbiAgICByZXR1cm4gJDtcbiAgfVxufTtcblxuRm91bmRhdGlvbi51dGlsID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gZm9yIGFwcGx5aW5nIGEgZGVib3VuY2UgZWZmZWN0IHRvIGEgZnVuY3Rpb24gY2FsbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBjYWxsZWQgYXQgZW5kIG9mIHRpbWVvdXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSAtIFRpbWUgaW4gbXMgdG8gZGVsYXkgdGhlIGNhbGwgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyBmdW5jdGlvblxuICAgKi9cbiAgdGhyb3R0bGU6IGZ1bmN0aW9uIChmdW5jLCBkZWxheSkge1xuICAgIHZhciB0aW1lciA9IG51bGw7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cbndpbmRvdy5Gb3VuZGF0aW9uID0gRm91bmRhdGlvbjtcblxuLy8gUG9seWZpbGwgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuKGZ1bmN0aW9uKCkge1xuICBpZiAoIURhdGUubm93IHx8ICF3aW5kb3cuRGF0ZS5ub3cpXG4gICAgd2luZG93LkRhdGUubm93ID0gRGF0ZS5ub3cgPSBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpOyB9O1xuXG4gIHZhciB2ZW5kb3JzID0gWyd3ZWJraXQnLCAnbW96J107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsraSkge1xuICAgICAgdmFyIHZwID0gdmVuZG9yc1tpXTtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdnArJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gKHdpbmRvd1t2cCsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93W3ZwKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXSk7XG4gIH1cbiAgaWYgKC9pUChhZHxob25lfG9kKS4qT1MgNi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICB8fCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAhd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBuZXh0VGltZSA9IE1hdGgubWF4KGxhc3RUaW1lICsgMTYsIG5vdyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhsYXN0VGltZSA9IG5leHRUaW1lKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFRpbWUgLSBub3cpO1xuICAgIH07XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2xlYXJUaW1lb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQb2x5ZmlsbCBmb3IgcGVyZm9ybWFuY2Uubm93LCByZXF1aXJlZCBieSByQUZcbiAgICovXG4gIGlmKCF3aW5kb3cucGVyZm9ybWFuY2UgfHwgIXdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpe1xuICAgIHdpbmRvdy5wZXJmb3JtYW5jZSA9IHtcbiAgICAgIHN0YXJ0OiBEYXRlLm5vdygpLFxuICAgICAgbm93OiBmdW5jdGlvbigpeyByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7IH1cbiAgICB9O1xuICB9XG59KSgpO1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9UaGlzKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDVcbiAgICAgIC8vIGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG4gICAgfVxuXG4gICAgdmFyIGFBcmdzICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgICAgZk5PUCAgICA9IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGZCb3VuZCAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUFxuICAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICAgOiBvVGhpcyxcbiAgICAgICAgICAgICAgICAgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfTtcblxuICAgIGlmICh0aGlzLnByb3RvdHlwZSkge1xuICAgICAgLy8gbmF0aXZlIGZ1bmN0aW9ucyBkb24ndCBoYXZlIGEgcHJvdG90eXBlXG4gICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIH1cbiAgICBmQm91bmQucHJvdG90eXBlID0gbmV3IGZOT1AoKTtcblxuICAgIHJldHVybiBmQm91bmQ7XG4gIH07XG59XG4vLyBQb2x5ZmlsbCB0byBnZXQgdGhlIG5hbWUgb2YgYSBmdW5jdGlvbiBpbiBJRTlcbmZ1bmN0aW9uIGZ1bmN0aW9uTmFtZShmbikge1xuICBpZiAoRnVuY3Rpb24ucHJvdG90eXBlLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uXFxzKFteKF17MSx9KVxcKC87XG4gICAgdmFyIHJlc3VsdHMgPSAoZnVuY05hbWVSZWdleCkuZXhlYygoZm4pLnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiAocmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aCA+IDEpID8gcmVzdWx0c1sxXS50cmltKCkgOiBcIlwiO1xuICB9XG4gIGVsc2UgaWYgKGZuLnByb3RvdHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZuLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlKHN0cil7XG4gIGlmICgndHJ1ZScgPT09IHN0cikgcmV0dXJuIHRydWU7XG4gIGVsc2UgaWYgKCdmYWxzZScgPT09IHN0cikgcmV0dXJuIGZhbHNlO1xuICBlbHNlIGlmICghaXNOYU4oc3RyICogMSkpIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG4gIHJldHVybiBzdHI7XG59XG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZXhwb3J0IHtGb3VuZGF0aW9ufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uY29yZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZnVuY3Rpb24gVGltZXIoZWxlbSwgb3B0aW9ucywgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiwvL29wdGlvbnMgaXMgYW4gb2JqZWN0IGZvciBlYXNpbHkgYWRkaW5nIGZlYXR1cmVzIGxhdGVyLlxuICAgICAgbmFtZVNwYWNlID0gT2JqZWN0LmtleXMoZWxlbS5kYXRhKCkpWzBdIHx8ICd0aW1lcicsXG4gICAgICByZW1haW4gPSAtMSxcbiAgICAgIHN0YXJ0LFxuICAgICAgdGltZXI7XG5cbiAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuXG4gIHRoaXMucmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHJlbWFpbiA9IC0xO1xuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcbiAgICAvLyBpZighZWxlbS5kYXRhKCdwYXVzZWQnKSl7IHJldHVybiBmYWxzZTsgfS8vbWF5YmUgaW1wbGVtZW50IHRoaXMgc2FuaXR5IGNoZWNrIGlmIHVzZWQgZm9yIG90aGVyIHRoaW5ncy5cbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHJlbWFpbiA9IHJlbWFpbiA8PSAwID8gZHVyYXRpb24gOiByZW1haW47XG4gICAgZWxlbS5kYXRhKCdwYXVzZWQnLCBmYWxzZSk7XG4gICAgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgaWYob3B0aW9ucy5pbmZpbml0ZSl7XG4gICAgICAgIF90aGlzLnJlc3RhcnQoKTsvL3JlcnVuIHRoZSB0aW1lci5cbiAgICAgIH1cbiAgICAgIGlmIChjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHsgY2IoKTsgfVxuICAgIH0sIHJlbWFpbik7XG4gICAgZWxlbS50cmlnZ2VyKGB0aW1lcnN0YXJ0LnpmLiR7bmFtZVNwYWNlfWApO1xuICB9XG5cbiAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xuICAgIC8vaWYoZWxlbS5kYXRhKCdwYXVzZWQnKSl7IHJldHVybiBmYWxzZTsgfS8vbWF5YmUgaW1wbGVtZW50IHRoaXMgc2FuaXR5IGNoZWNrIGlmIHVzZWQgZm9yIG90aGVyIHRoaW5ncy5cbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIGVsZW0uZGF0YSgncGF1c2VkJywgdHJ1ZSk7XG4gICAgdmFyIGVuZCA9IERhdGUubm93KCk7XG4gICAgcmVtYWluID0gcmVtYWluIC0gKGVuZCAtIHN0YXJ0KTtcbiAgICBlbGVtLnRyaWdnZXIoYHRpbWVycGF1c2VkLnpmLiR7bmFtZVNwYWNlfWApO1xuICB9XG59XG5cbmV4cG9ydCB7VGltZXJ9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRpbWVyLmpzIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8qKldvcmsgaW5zcGlyZWQgYnkgbXVsdGlwbGUganF1ZXJ5IHN3aXBlIHBsdWdpbnMqKlxuLy8qKkRvbmUgYnkgWW9oYWkgQXJhcmF0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG52YXIgVG91Y2ggPSB7fTtcblxudmFyIHN0YXJ0UG9zWCxcbiAgICBzdGFydFBvc1ksXG4gICAgc3RhcnRUaW1lLFxuICAgIGVsYXBzZWRUaW1lLFxuICAgIGlzTW92aW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG9uVG91Y2hFbmQoKSB7XG4gIC8vICBhbGVydCh0aGlzKTtcbiAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSk7XG4gIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kKTtcbiAgaXNNb3ZpbmcgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gb25Ub3VjaE1vdmUoZSkge1xuICBpZiAoJC5zcG90U3dpcGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gIGlmKGlzTW92aW5nKSB7XG4gICAgdmFyIHggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgdmFyIHkgPSBlLnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgdmFyIGR4ID0gc3RhcnRQb3NYIC0geDtcbiAgICB2YXIgZHkgPSBzdGFydFBvc1kgLSB5O1xuICAgIHZhciBkaXI7XG4gICAgZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0VGltZTtcbiAgICBpZihNYXRoLmFicyhkeCkgPj0gJC5zcG90U3dpcGUubW92ZVRocmVzaG9sZCAmJiBlbGFwc2VkVGltZSA8PSAkLnNwb3RTd2lwZS50aW1lVGhyZXNob2xkKSB7XG4gICAgICBkaXIgPSBkeCA+IDAgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIH1cbiAgICAvLyBlbHNlIGlmKE1hdGguYWJzKGR5KSA+PSAkLnNwb3RTd2lwZS5tb3ZlVGhyZXNob2xkICYmIGVsYXBzZWRUaW1lIDw9ICQuc3BvdFN3aXBlLnRpbWVUaHJlc2hvbGQpIHtcbiAgICAvLyAgIGRpciA9IGR5ID4gMCA/ICdkb3duJyA6ICd1cCc7XG4gICAgLy8gfVxuICAgIGlmKGRpcikge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb25Ub3VjaEVuZC5jYWxsKHRoaXMpO1xuICAgICAgJCh0aGlzKS50cmlnZ2VyKCdzd2lwZScsIGRpcikudHJpZ2dlcihgc3dpcGUke2Rpcn1gKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGUpIHtcbiAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgIHN0YXJ0UG9zWCA9IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICBzdGFydFBvc1kgPSBlLnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgaXNNb3ZpbmcgPSB0cnVlO1xuICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciAmJiB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gdGVhcmRvd24oKSB7XG4gIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCk7XG59XG5cbmNsYXNzIFNwb3RTd2lwZSB7XG4gIGNvbnN0cnVjdG9yKCQpIHtcbiAgICB0aGlzLnZlcnNpb24gPSAnMS4wLjAnO1xuICAgIHRoaXMuZW5hYmxlZCA9ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB0aGlzLnByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgdGhpcy5tb3ZlVGhyZXNob2xkID0gNzU7XG4gICAgdGhpcy50aW1lVGhyZXNob2xkID0gMjAwO1xuICAgIHRoaXMuJCA9ICQ7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgX2luaXQoKSB7XG4gICAgdmFyICQgPSB0aGlzLiQ7XG4gICAgJC5ldmVudC5zcGVjaWFsLnN3aXBlID0geyBzZXR1cDogaW5pdCB9O1xuXG4gICAgJC5lYWNoKFsnbGVmdCcsICd1cCcsICdkb3duJywgJ3JpZ2h0J10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZXZlbnQuc3BlY2lhbFtgc3dpcGUke3RoaXN9YF0gPSB7IHNldHVwOiBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLm9uKCdzd2lwZScsICQubm9vcCk7XG4gICAgICB9IH07XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEFzIGZhciBhcyBJIGNhbiB0ZWxsLCBib3RoIHNldHVwU3BvdFN3aXBlIGFuZCAgICAqXG4gKiBzZXR1cFRvdWNoSGFuZGxlciBzaG91bGQgYmUgaWRlbXBvdGVudCwgICAgICAgICAgKlxuICogYmVjYXVzZSB0aGV5IGRpcmVjdGx5IHJlcGxhY2UgZnVuY3Rpb25zICYgICAgICAgICpcbiAqIHZhbHVlcywgYW5kIGRvIG5vdCBhZGQgZXZlbnQgaGFuZGxlcnMgZGlyZWN0bHkuICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuVG91Y2guc2V0dXBTcG90U3dpcGUgPSBmdW5jdGlvbigkKSB7XG4gICQuc3BvdFN3aXBlID0gbmV3IFNwb3RTd2lwZSgkKTtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBNZXRob2QgZm9yIGFkZGluZyBwc2V1ZG8gZHJhZyBldmVudHMgdG8gZWxlbWVudHMgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblRvdWNoLnNldHVwVG91Y2hIYW5kbGVyID0gZnVuY3Rpb24oJCkge1xuICAkLmZuLmFkZFRvdWNoID0gZnVuY3Rpb24oKXtcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSxlbCl7XG4gICAgICAkKGVsKS5iaW5kKCd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCcsZnVuY3Rpb24oKXtcbiAgICAgICAgLy93ZSBwYXNzIHRoZSBvcmlnaW5hbCBldmVudCBvYmplY3QgYmVjYXVzZSB0aGUgalF1ZXJ5IGV2ZW50XG4gICAgICAgIC8vb2JqZWN0IGlzIG5vcm1hbGl6ZWQgdG8gdzNjIHNwZWNzIGFuZCBkb2VzIG5vdCBwcm92aWRlIHRoZSBUb3VjaExpc3RcbiAgICAgICAgaGFuZGxlVG91Y2goZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB2YXIgaGFuZGxlVG91Y2ggPSBmdW5jdGlvbihldmVudCl7XG4gICAgICB2YXIgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgIGZpcnN0ID0gdG91Y2hlc1swXSxcbiAgICAgICAgICBldmVudFR5cGVzID0ge1xuICAgICAgICAgICAgdG91Y2hzdGFydDogJ21vdXNlZG93bicsXG4gICAgICAgICAgICB0b3VjaG1vdmU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgdG91Y2hlbmQ6ICdtb3VzZXVwJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZSA9IGV2ZW50VHlwZXNbZXZlbnQudHlwZV0sXG4gICAgICAgICAgc2ltdWxhdGVkRXZlbnRcbiAgICAgICAgO1xuXG4gICAgICBpZignTW91c2VFdmVudCcgaW4gd2luZG93ICYmIHR5cGVvZiB3aW5kb3cuTW91c2VFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzaW11bGF0ZWRFdmVudCA9IG5ldyB3aW5kb3cuTW91c2VFdmVudCh0eXBlLCB7XG4gICAgICAgICAgJ2J1YmJsZXMnOiB0cnVlLFxuICAgICAgICAgICdjYW5jZWxhYmxlJzogdHJ1ZSxcbiAgICAgICAgICAnc2NyZWVuWCc6IGZpcnN0LnNjcmVlblgsXG4gICAgICAgICAgJ3NjcmVlblknOiBmaXJzdC5zY3JlZW5ZLFxuICAgICAgICAgICdjbGllbnRYJzogZmlyc3QuY2xpZW50WCxcbiAgICAgICAgICAnY2xpZW50WSc6IGZpcnN0LmNsaWVudFlcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaW11bGF0ZWRFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgICAgIHNpbXVsYXRlZEV2ZW50LmluaXRNb3VzZUV2ZW50KHR5cGUsIHRydWUsIHRydWUsIHdpbmRvdywgMSwgZmlyc3Quc2NyZWVuWCwgZmlyc3Quc2NyZWVuWSwgZmlyc3QuY2xpZW50WCwgZmlyc3QuY2xpZW50WSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAvKmxlZnQqLywgbnVsbCk7XG4gICAgICB9XG4gICAgICBmaXJzdC50YXJnZXQuZGlzcGF0Y2hFdmVudChzaW11bGF0ZWRFdmVudCk7XG4gICAgfTtcbiAgfTtcbn07XG5cblRvdWNoLmluaXQgPSBmdW5jdGlvbigkKSB7XG4gIGlmKHR5cGVvZigkLnNwb3RTd2lwZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgVG91Y2guc2V0dXBTcG90U3dpcGUoJCk7XG4gICAgVG91Y2guc2V0dXBUb3VjaEhhbmRsZXIoJCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7VG91Y2h9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRvdWNoLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5cbi8qKlxuICogQWNjb3JkaW9uIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5hY2NvcmRpb25cbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqL1xuXG5jbGFzcyBBY2NvcmRpb24gZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhbiBhY2NvcmRpb24uXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBBY2NvcmRpb25cbiAgICogQGZpcmVzIEFjY29yZGlvbiNpbml0XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYW4gYWNjb3JkaW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGEgcGxhaW4gb2JqZWN0IHdpdGggc2V0dGluZ3MgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIEFjY29yZGlvbi5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5jbGFzc05hbWUgPSAnQWNjb3JkaW9uJzsgLy8gaWU5IGJhY2sgY29tcGF0XG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ0FjY29yZGlvbicsIHtcbiAgICAgICdFTlRFUic6ICd0b2dnbGUnLFxuICAgICAgJ1NQQUNFJzogJ3RvZ2dsZScsXG4gICAgICAnQVJST1dfRE9XTic6ICduZXh0JyxcbiAgICAgICdBUlJPV19VUCc6ICdwcmV2aW91cydcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYWNjb3JkaW9uIGJ5IGFuaW1hdGluZyB0aGUgcHJlc2V0IGFjdGl2ZSBwYW5lKHMpLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdyb2xlJywgJ3RhYmxpc3QnKTtcbiAgICB0aGlzLiR0YWJzID0gdGhpcy4kZWxlbWVudC5jaGlsZHJlbignW2RhdGEtYWNjb3JkaW9uLWl0ZW1dJyk7XG5cbiAgICB0aGlzLiR0YWJzLmVhY2goZnVuY3Rpb24oaWR4LCBlbCkge1xuICAgICAgdmFyICRlbCA9ICQoZWwpLFxuICAgICAgICAgICRjb250ZW50ID0gJGVsLmNoaWxkcmVuKCdbZGF0YS10YWItY29udGVudF0nKSxcbiAgICAgICAgICBpZCA9ICRjb250ZW50WzBdLmlkIHx8IEdldFlvRGlnaXRzKDYsICdhY2NvcmRpb24nKSxcbiAgICAgICAgICBsaW5rSWQgPSBlbC5pZCB8fCBgJHtpZH0tbGFiZWxgO1xuXG4gICAgICAkZWwuZmluZCgnYTpmaXJzdCcpLmF0dHIoe1xuICAgICAgICAnYXJpYS1jb250cm9scyc6IGlkLFxuICAgICAgICAncm9sZSc6ICd0YWInLFxuICAgICAgICAnaWQnOiBsaW5rSWQsXG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogZmFsc2UsXG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICAkY29udGVudC5hdHRyKHsncm9sZSc6ICd0YWJwYW5lbCcsICdhcmlhLWxhYmVsbGVkYnknOiBsaW5rSWQsICdhcmlhLWhpZGRlbic6IHRydWUsICdpZCc6IGlkfSk7XG4gICAgfSk7XG4gICAgdmFyICRpbml0QWN0aXZlID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXMtYWN0aXZlJykuY2hpbGRyZW4oJ1tkYXRhLXRhYi1jb250ZW50XScpO1xuICAgIHRoaXMuZmlyc3RUaW1lSW5pdCA9IHRydWU7XG4gICAgaWYoJGluaXRBY3RpdmUubGVuZ3RoKXtcbiAgICAgIHRoaXMuZG93bigkaW5pdEFjdGl2ZSwgdGhpcy5maXJzdFRpbWVJbml0KTtcbiAgICAgIHRoaXMuZmlyc3RUaW1lSW5pdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX2NoZWNrRGVlcExpbmsgPSAoKSA9PiB7XG4gICAgICB2YXIgYW5jaG9yID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAvL25lZWQgYSBoYXNoIGFuZCBhIHJlbGV2YW50IGFuY2hvciBpbiB0aGlzIHRhYnNldFxuICAgICAgaWYoYW5jaG9yLmxlbmd0aCkge1xuICAgICAgICB2YXIgJGxpbmsgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1tocmVmJD1cIicrYW5jaG9yKydcIl0nKSxcbiAgICAgICAgJGFuY2hvciA9ICQoYW5jaG9yKTtcblxuICAgICAgICBpZiAoJGxpbmsubGVuZ3RoICYmICRhbmNob3IpIHtcbiAgICAgICAgICBpZiAoISRsaW5rLnBhcmVudCgnW2RhdGEtYWNjb3JkaW9uLWl0ZW1dJykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICB0aGlzLmRvd24oJGFuY2hvciwgdGhpcy5maXJzdFRpbWVJbml0KTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RUaW1lSW5pdCA9IGZhbHNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvL3JvbGwgdXAgYSBsaXR0bGUgdG8gc2hvdyB0aGUgdGl0bGVzXG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGlua1NtdWRnZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gX3RoaXMuJGVsZW1lbnQub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBvZmZzZXQudG9wIH0sIF90aGlzLm9wdGlvbnMuZGVlcExpbmtTbXVkZ2VEZWxheSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgenBsdWdpbiBoYXMgZGVlcGxpbmtlZCBhdCBwYWdlbG9hZFxuICAgICAgICAgICAgKiBAZXZlbnQgQWNjb3JkaW9uI2RlZXBsaW5rXG4gICAgICAgICAgICAqL1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZGVlcGxpbmsuemYuYWNjb3JkaW9uJywgWyRsaW5rLCAkYW5jaG9yXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL3VzZSBicm93c2VyIHRvIG9wZW4gYSB0YWIsIGlmIGl0IGV4aXN0cyBpbiB0aGlzIHRhYnNldFxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgIHRoaXMuX2NoZWNrRGVlcExpbmsoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIGFjY29yZGlvbi5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJHRhYnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkZWxlbSA9ICQodGhpcyk7XG4gICAgICB2YXIgJHRhYkNvbnRlbnQgPSAkZWxlbS5jaGlsZHJlbignW2RhdGEtdGFiLWNvbnRlbnRdJyk7XG4gICAgICBpZiAoJHRhYkNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICRlbGVtLmNoaWxkcmVuKCdhJykub2ZmKCdjbGljay56Zi5hY2NvcmRpb24ga2V5ZG93bi56Zi5hY2NvcmRpb24nKVxuICAgICAgICAgICAgICAgLm9uKCdjbGljay56Zi5hY2NvcmRpb24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIF90aGlzLnRvZ2dsZSgkdGFiQ29udGVudCk7XG4gICAgICAgIH0pLm9uKCdrZXlkb3duLnpmLmFjY29yZGlvbicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnQWNjb3JkaW9uJywge1xuICAgICAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCR0YWJDb250ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyICRhID0gJGVsZW0ubmV4dCgpLmZpbmQoJ2EnKS5mb2N1cygpO1xuICAgICAgICAgICAgICBpZiAoIV90aGlzLm9wdGlvbnMubXVsdGlFeHBhbmQpIHtcbiAgICAgICAgICAgICAgICAkYS50cmlnZ2VyKCdjbGljay56Zi5hY2NvcmRpb24nKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJldmlvdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgJGEgPSAkZWxlbS5wcmV2KCkuZmluZCgnYScpLmZvY3VzKCk7XG4gICAgICAgICAgICAgIGlmICghX3RoaXMub3B0aW9ucy5tdWx0aUV4cGFuZCkge1xuICAgICAgICAgICAgICAgICRhLnRyaWdnZXIoJ2NsaWNrLnpmLmFjY29yZGlvbicpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYW5kbGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZih0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgICQod2luZG93KS5vbigncG9wc3RhdGUnLCB0aGlzLl9jaGVja0RlZXBMaW5rKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgc2VsZWN0ZWQgY29udGVudCBwYW5lJ3Mgb3Blbi9jbG9zZSBzdGF0ZS5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBqUXVlcnkgb2JqZWN0IG9mIHRoZSBwYW5lIHRvIHRvZ2dsZSAoYC5hY2NvcmRpb24tY29udGVudGApLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHRvZ2dsZSgkdGFyZ2V0KSB7XG4gICAgaWYgKCR0YXJnZXQuY2xvc2VzdCgnW2RhdGEtYWNjb3JkaW9uXScpLmlzKCdbZGlzYWJsZWRdJykpIHtcbiAgICAgIGNvbnNvbGUuaW5mbygnQ2Fubm90IHRvZ2dsZSBhbiBhY2NvcmRpb24gdGhhdCBpcyBkaXNhYmxlZC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYoJHRhcmdldC5wYXJlbnQoKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgIHRoaXMudXAoJHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG93bigkdGFyZ2V0KTtcbiAgICB9XG4gICAgLy9laXRoZXIgcmVwbGFjZSBvciB1cGRhdGUgYnJvd3NlciBoaXN0b3J5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgdmFyIGFuY2hvciA9ICR0YXJnZXQucHJldignYScpLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGRhdGVIaXN0b3J5KSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgYW5jaG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgYW5jaG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGFjY29yZGlvbiB0YWIgZGVmaW5lZCBieSBgJHRhcmdldGAuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gQWNjb3JkaW9uIHBhbmUgdG8gb3BlbiAoYC5hY2NvcmRpb24tY29udGVudGApLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpcnN0VGltZSAtIGZsYWcgdG8gZGV0ZXJtaW5lIGlmIHJlZmxvdyBzaG91bGQgaGFwcGVuLlxuICAgKiBAZmlyZXMgQWNjb3JkaW9uI2Rvd25cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBkb3duKCR0YXJnZXQsIGZpcnN0VGltZSkge1xuICAgIC8qKlxuICAgICAqIGNoZWNraW5nIGZpcnN0VGltZSBhbGxvd3MgZm9yIGluaXRpYWwgcmVuZGVyIG9mIHRoZSBhY2NvcmRpb25cbiAgICAgKiB0byByZW5kZXIgcHJlc2V0IGlzLWFjdGl2ZSBwYW5lcy5cbiAgICAgKi9cbiAgICBpZiAoJHRhcmdldC5jbG9zZXN0KCdbZGF0YS1hY2NvcmRpb25dJykuaXMoJ1tkaXNhYmxlZF0nKSAmJiAhZmlyc3RUaW1lKSAge1xuICAgICAgY29uc29sZS5pbmZvKCdDYW5ub3QgY2FsbCBkb3duIG9uIGFuIGFjY29yZGlvbiB0aGF0IGlzIGRpc2FibGVkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkdGFyZ2V0XG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCBmYWxzZSlcbiAgICAgIC5wYXJlbnQoJ1tkYXRhLXRhYi1jb250ZW50XScpXG4gICAgICAuYWRkQmFjaygpXG4gICAgICAucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubXVsdGlFeHBhbmQgJiYgIWZpcnN0VGltZSkge1xuICAgICAgdmFyICRjdXJyZW50QWN0aXZlID0gdGhpcy4kZWxlbWVudC5jaGlsZHJlbignLmlzLWFjdGl2ZScpLmNoaWxkcmVuKCdbZGF0YS10YWItY29udGVudF0nKTtcbiAgICAgIGlmICgkY3VycmVudEFjdGl2ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy51cCgkY3VycmVudEFjdGl2ZS5ub3QoJHRhcmdldCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgICR0YXJnZXQuc2xpZGVEb3duKHRoaXMub3B0aW9ucy5zbGlkZVNwZWVkLCAoKSA9PiB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHRhYiBpcyBkb25lIG9wZW5pbmcuXG4gICAgICAgKiBAZXZlbnQgQWNjb3JkaW9uI2Rvd25cbiAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdkb3duLnpmLmFjY29yZGlvbicsIFskdGFyZ2V0XSk7XG4gICAgfSk7XG5cbiAgICAkKGAjJHskdGFyZ2V0LmF0dHIoJ2FyaWEtbGFiZWxsZWRieScpfWApLmF0dHIoe1xuICAgICAgJ2FyaWEtZXhwYW5kZWQnOiB0cnVlLFxuICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSB0YWIgZGVmaW5lZCBieSBgJHRhcmdldGAuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gQWNjb3JkaW9uIHRhYiB0byBjbG9zZSAoYC5hY2NvcmRpb24tY29udGVudGApLlxuICAgKiBAZmlyZXMgQWNjb3JkaW9uI3VwXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgdXAoJHRhcmdldCkge1xuICAgIGlmICgkdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWFjY29yZGlvbl0nKS5pcygnW2Rpc2FibGVkXScpKSB7XG4gICAgICBjb25zb2xlLmluZm8oJ0Nhbm5vdCBjYWxsIHVwIG9uIGFuIGFjY29yZGlvbiB0aGF0IGlzIGRpc2FibGVkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciAkYXVudHMgPSAkdGFyZ2V0LnBhcmVudCgpLnNpYmxpbmdzKCksXG4gICAgICAgIF90aGlzID0gdGhpcztcblxuICAgIGlmKCghdGhpcy5vcHRpb25zLmFsbG93QWxsQ2xvc2VkICYmICEkYXVudHMuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB8fCAhJHRhcmdldC5wYXJlbnQoKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkdGFyZ2V0LnNsaWRlVXAoX3RoaXMub3B0aW9ucy5zbGlkZVNwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHRhYiBpcyBkb25lIGNvbGxhcHNpbmcgdXAuXG4gICAgICAgKiBAZXZlbnQgQWNjb3JkaW9uI3VwXG4gICAgICAgKi9cbiAgICAgIF90aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3VwLnpmLmFjY29yZGlvbicsIFskdGFyZ2V0XSk7XG4gICAgfSk7XG5cbiAgICAkdGFyZ2V0LmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSlcbiAgICAgICAgICAgLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgICQoYCMkeyR0YXJnZXQuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jyl9YCkuYXR0cih7XG4gICAgICdhcmlhLWV4cGFuZGVkJzogZmFsc2UsXG4gICAgICdhcmlhLXNlbGVjdGVkJzogZmFsc2VcbiAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIGFuIGFjY29yZGlvbi5cbiAgICogQGZpcmVzIEFjY29yZGlvbiNkZXN0cm95ZWRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50XScpLnN0b3AodHJ1ZSkuc2xpZGVVcCgwKS5jc3MoJ2Rpc3BsYXknLCAnJyk7XG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdhJykub2ZmKCcuemYuYWNjb3JkaW9uJyk7XG4gICAgaWYodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdwb3BzdGF0ZScsIHRoaXMuX2NoZWNrRGVlcExpbmspO1xuICAgIH1cblxuICB9XG59XG5cbkFjY29yZGlvbi5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIHRvIGFuaW1hdGUgdGhlIG9wZW5pbmcgb2YgYW4gYWNjb3JkaW9uIHBhbmUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMjUwXG4gICAqL1xuICBzbGlkZVNwZWVkOiAyNTAsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgYWNjb3JkaW9uIHRvIGhhdmUgbXVsdGlwbGUgb3BlbiBwYW5lcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIG11bHRpRXhwYW5kOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBhY2NvcmRpb24gdG8gY2xvc2UgYWxsIHBhbmVzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYWxsb3dBbGxDbG9zZWQ6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSB3aW5kb3cgdG8gc2Nyb2xsIHRvIGNvbnRlbnQgb2YgcGFuZSBzcGVjaWZpZWQgYnkgaGFzaCBhbmNob3JcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5rOiBmYWxzZSxcblxuICAvKipcbiAgICogQWRqdXN0IHRoZSBkZWVwIGxpbmsgc2Nyb2xsIHRvIG1ha2Ugc3VyZSB0aGUgdG9wIG9mIHRoZSBhY2NvcmRpb24gcGFuZWwgaXMgdmlzaWJsZVxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVlcExpbmtTbXVkZ2U6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBBbmltYXRpb24gdGltZSAobXMpIGZvciB0aGUgZGVlcCBsaW5rIGFkanVzdG1lbnRcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAzMDBcbiAgICovXG4gIGRlZXBMaW5rU211ZGdlRGVsYXk6IDMwMCxcblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBicm93c2VyIGhpc3Rvcnkgd2l0aCB0aGUgb3BlbiBhY2NvcmRpb25cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHVwZGF0ZUhpc3Rvcnk6IGZhbHNlXG59O1xuXG5leHBvcnQge0FjY29yZGlvbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbi5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBvc2l0aW9uYWJsZSB9IGZyb20gJy4vZm91bmRhdGlvbi5wb3NpdGlvbmFibGUnO1xuXG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcblxuXG4vKipcbiAqIERyb3Bkb3duIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5kcm9wZG93blxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5ib3hcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqL1xuY2xhc3MgRHJvcGRvd24gZXh0ZW5kcyBQb3NpdGlvbmFibGUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIGRyb3Bkb3duLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgRHJvcGRvd25cbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhIGRyb3Bkb3duLlxuICAgKiAgICAgICAgT2JqZWN0IHNob3VsZCBiZSBvZiB0aGUgZHJvcGRvd24gcGFuZWwsIHJhdGhlciB0aGFuIGl0cyBhbmNob3IuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIERyb3Bkb3duLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnRHJvcGRvd24nOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIC8vIFRyaWdnZXJzIGluaXQgaXMgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBpcyBpbml0aWFsaXplZFxuICAgIFRyaWdnZXJzLmluaXQoJCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignRHJvcGRvd24nLCB7XG4gICAgICAnRU5URVInOiAnb3BlbicsXG4gICAgICAnU1BBQ0UnOiAnb3BlbicsXG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwbHVnaW4gYnkgc2V0dGluZy9jaGVja2luZyBvcHRpb25zIGFuZCBhdHRyaWJ1dGVzLCBhZGRpbmcgaGVscGVyIHZhcmlhYmxlcywgYW5kIHNhdmluZyB0aGUgYW5jaG9yLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciAkaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cbiAgICB0aGlzLiRhbmNob3JzID0gJChgW2RhdGEtdG9nZ2xlPVwiJHskaWR9XCJdYCkubGVuZ3RoID8gJChgW2RhdGEtdG9nZ2xlPVwiJHskaWR9XCJdYCkgOiAkKGBbZGF0YS1vcGVuPVwiJHskaWR9XCJdYCk7XG4gICAgdGhpcy4kYW5jaG9ycy5hdHRyKHtcbiAgICAgICdhcmlhLWNvbnRyb2xzJzogJGlkLFxuICAgICAgJ2RhdGEtaXMtZm9jdXMnOiBmYWxzZSxcbiAgICAgICdkYXRhLXlldGktYm94JzogJGlkLFxuICAgICAgJ2FyaWEtaGFzcG9wdXAnOiB0cnVlLFxuICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgdGhpcy5fc2V0Q3VycmVudEFuY2hvcih0aGlzLiRhbmNob3JzLmZpcnN0KCkpO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLnBhcmVudENsYXNzKXtcbiAgICAgIHRoaXMuJHBhcmVudCA9IHRoaXMuJGVsZW1lbnQucGFyZW50cygnLicgKyB0aGlzLm9wdGlvbnMucGFyZW50Q2xhc3MpO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy4kcGFyZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgJ2RhdGEteWV0aS1ib3gnOiAkaWQsXG4gICAgICAnZGF0YS1yZXNpemUnOiAkaWQsXG4gICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogdGhpcy4kY3VycmVudEFuY2hvci5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnZGQtYW5jaG9yJylcbiAgICB9KTtcbiAgICBzdXBlci5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgX2dldERlZmF1bHRQb3NpdGlvbigpIHtcbiAgICAvLyBoYW5kbGUgbGVnYWN5IGNsYXNzbmFtZXNcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLiRlbGVtZW50WzBdLmNsYXNzTmFtZS5tYXRjaCgvKHRvcHxsZWZ0fHJpZ2h0fGJvdHRvbSkvZyk7XG4gICAgaWYocG9zaXRpb24pIHtcbiAgICAgIHJldHVybiBwb3NpdGlvblswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdib3R0b20nXG4gICAgfVxuICB9XG5cbiAgX2dldERlZmF1bHRBbGlnbm1lbnQoKSB7XG4gICAgLy8gaGFuZGxlIGxlZ2FjeSBmbG9hdCBhcHByb2FjaFxuICAgIHZhciBob3Jpem9udGFsUG9zaXRpb24gPSAvZmxvYXQtKFxcUyspLy5leGVjKHRoaXMuJGN1cnJlbnRBbmNob3IuY2xhc3NOYW1lKTtcbiAgICBpZihob3Jpem9udGFsUG9zaXRpb24pIHtcbiAgICAgIHJldHVybiBob3Jpem9udGFsUG9zaXRpb25bMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLl9nZXREZWZhdWx0QWxpZ25tZW50KCk7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBvc2l0aW9uIGFuZCBvcmllbnRhdGlvbiBvZiB0aGUgZHJvcGRvd24gcGFuZSwgY2hlY2tzIGZvciBjb2xsaXNpb25zIGlmIGFsbG93LW92ZXJsYXAgaXMgbm90IHRydWUuXG4gICAqIFJlY3Vyc2l2ZWx5IGNhbGxzIGl0c2VsZiBpZiBhIGNvbGxpc2lvbiBpcyBkZXRlY3RlZCwgd2l0aCBhIG5ldyBwb3NpdGlvbiBjbGFzcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0UG9zaXRpb24oKSB7XG4gICAgc3VwZXIuX3NldFBvc2l0aW9uKHRoaXMuJGN1cnJlbnRBbmNob3IsIHRoaXMuJGVsZW1lbnQsIHRoaXMuJHBhcmVudCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBpdCBhIGN1cnJlbnQgYW5jaG9yLlxuICAgKiBDdXJyZW50IGFuY2hvciBhcyB0aGUgcmVmZXJlbmNlIGZvciB0aGUgcG9zaXRpb24gb2YgRHJvcGRvd24gcGFuZXMuXG4gICAqIEBwYXJhbSB7SFRNTH0gZWwgLSBET00gZWxlbWVudCBvZiB0aGUgYW5jaG9yLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRDdXJyZW50QW5jaG9yKGVsKSB7XG4gICAgdGhpcy4kY3VycmVudEFuY2hvciA9ICQoZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBlbGVtZW50IHV0aWxpemluZyB0aGUgdHJpZ2dlcnMgdXRpbGl0eSBsaWJyYXJ5LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLiRlbGVtZW50Lm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSxcbiAgICAgICdyZXNpemVtZS56Zi50cmlnZ2VyJzogdGhpcy5fc2V0UG9zaXRpb24uYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gICAgdGhpcy4kYW5jaG9ycy5vZmYoJ2NsaWNrLnpmLnRyaWdnZXInKVxuICAgICAgLm9uKCdjbGljay56Zi50cmlnZ2VyJywgZnVuY3Rpb24oKSB7IF90aGlzLl9zZXRDdXJyZW50QW5jaG9yKHRoaXMpOyB9KTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5ob3Zlcil7XG4gICAgICB0aGlzLiRhbmNob3JzLm9mZignbW91c2VlbnRlci56Zi5kcm9wZG93biBtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJylcbiAgICAgIC5vbignbW91c2VlbnRlci56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF90aGlzLl9zZXRDdXJyZW50QW5jaG9yKHRoaXMpO1xuXG4gICAgICAgIHZhciBib2R5RGF0YSA9ICQoJ2JvZHknKS5kYXRhKCk7XG4gICAgICAgIGlmKHR5cGVvZihib2R5RGF0YS53aGF0aW5wdXQpID09PSAndW5kZWZpbmVkJyB8fCBib2R5RGF0YS53aGF0aW5wdXQgPT09ICdtb3VzZScpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XG4gICAgICAgICAgX3RoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIF90aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIF90aGlzLiRhbmNob3JzLmRhdGEoJ2hvdmVyJywgdHJ1ZSk7XG4gICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgfSkub24oJ21vdXNlbGVhdmUuemYuZHJvcGRvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XG4gICAgICAgIF90aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICBfdGhpcy4kYW5jaG9ycy5kYXRhKCdob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KTtcbiAgICAgIH0pO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmhvdmVyUGFuZSl7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duIG1vdXNlbGVhdmUuemYuZHJvcGRvd24nKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlbGVhdmUuemYuZHJvcGRvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgIF90aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kYW5jaG9ycy5kYXRhKCdob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLiRhbmNob3JzLmFkZCh0aGlzLiRlbGVtZW50KS5vbigna2V5ZG93bi56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgdmFyICR0YXJnZXQgPSAkKHRoaXMpLFxuICAgICAgICB2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHMgPSBLZXlib2FyZC5maW5kRm9jdXNhYmxlKF90aGlzLiRlbGVtZW50KTtcblxuICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdEcm9wZG93bicsIHtcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCR0YXJnZXQuaXMoX3RoaXMuJGFuY2hvcnMpKSB7XG4gICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICBfdGhpcy4kZWxlbWVudC5hdHRyKCd0YWJpbmRleCcsIC0xKS5mb2N1cygpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgX3RoaXMuJGFuY2hvcnMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBldmVudCBoYW5kbGVyIHRvIHRoZSBib2R5IHRvIGNsb3NlIGFueSBkcm9wZG93bnMgb24gYSBjbGljay5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkQm9keUhhbmRsZXIoKSB7XG4gICAgIHZhciAkYm9keSA9ICQoZG9jdW1lbnQuYm9keSkubm90KHRoaXMuJGVsZW1lbnQpLFxuICAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAkYm9keS5vZmYoJ2NsaWNrLnpmLmRyb3Bkb3duJylcbiAgICAgICAgICAub24oJ2NsaWNrLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihfdGhpcy4kYW5jaG9ycy5pcyhlLnRhcmdldCkgfHwgX3RoaXMuJGFuY2hvcnMuZmluZChlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF90aGlzLiRlbGVtZW50LmZpbmQoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgJGJvZHkub2ZmKCdjbGljay56Zi5kcm9wZG93bicpO1xuICAgICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBkcm9wZG93biBwYW5lLCBhbmQgZmlyZXMgYSBidWJibGluZyBldmVudCB0byBjbG9zZSBvdGhlciBkcm9wZG93bnMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJvcGRvd24jY2xvc2VtZVxuICAgKiBAZmlyZXMgRHJvcGRvd24jc2hvd1xuICAgKi9cbiAgb3BlbigpIHtcbiAgICAvLyB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKlxuICAgICAqIEZpcmVzIHRvIGNsb3NlIG90aGVyIG9wZW4gZHJvcGRvd25zLCB0eXBpY2FsbHkgd2hlbiBkcm9wZG93biBpcyBvcGVuaW5nXG4gICAgICogQGV2ZW50IERyb3Bkb3duI2Nsb3NlbWVcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlbWUuemYuZHJvcGRvd24nLCB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJykpO1xuICAgIHRoaXMuJGFuY2hvcnMuYWRkQ2xhc3MoJ2hvdmVyJylcbiAgICAgICAgLmF0dHIoeydhcmlhLWV4cGFuZGVkJzogdHJ1ZX0pO1xuICAgIC8vIHRoaXMuJGVsZW1lbnQvKi5zaG93KCkqLztcblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLW9wZW5pbmcnKTtcbiAgICB0aGlzLl9zZXRQb3NpdGlvbigpO1xuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW5pbmcnKS5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgIC5hdHRyKHsnYXJpYS1oaWRkZW4nOiBmYWxzZX0pO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmF1dG9Gb2N1cyl7XG4gICAgICB2YXIgJGZvY3VzYWJsZSA9IEtleWJvYXJkLmZpbmRGb2N1c2FibGUodGhpcy4kZWxlbWVudCk7XG4gICAgICBpZigkZm9jdXNhYmxlLmxlbmd0aCl7XG4gICAgICAgICRmb2N1c2FibGUuZXEoMCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKXsgdGhpcy5fYWRkQm9keUhhbmRsZXIoKTsgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMpIHtcbiAgICAgIEtleWJvYXJkLnRyYXBGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyBvbmNlIHRoZSBkcm9wZG93biBpcyB2aXNpYmxlLlxuICAgICAqIEBldmVudCBEcm9wZG93biNzaG93XG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzaG93LnpmLmRyb3Bkb3duJywgW3RoaXMuJGVsZW1lbnRdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG9wZW4gZHJvcGRvd24gcGFuZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcm9wZG93biNoaWRlXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZighdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgIC5hdHRyKHsnYXJpYS1oaWRkZW4nOiB0cnVlfSk7XG5cbiAgICB0aGlzLiRhbmNob3JzLnJlbW92ZUNsYXNzKCdob3ZlcicpXG4gICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgb25jZSB0aGUgZHJvcGRvd24gaXMgbm8gbG9uZ2VyIHZpc2libGUuXG4gICAgICogQGV2ZW50IERyb3Bkb3duI2hpZGVcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2hpZGUuemYuZHJvcGRvd24nLCBbdGhpcy4kZWxlbWVudF0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMpIHtcbiAgICAgIEtleWJvYXJkLnJlbGVhc2VGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgZHJvcGRvd24gcGFuZSdzIHZpc2liaWxpdHkuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XG4gICAgICBpZih0aGlzLiRhbmNob3JzLmRhdGEoJ2hvdmVyJykpIHJldHVybjtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgZHJvcGRvd24uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyJykuaGlkZSgpO1xuICAgIHRoaXMuJGFuY2hvcnMub2ZmKCcuemYuZHJvcGRvd24nKTtcbiAgICAkKGRvY3VtZW50LmJvZHkpLm9mZignY2xpY2suemYuZHJvcGRvd24nKTtcblxuICB9XG59XG5cbkRyb3Bkb3duLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQ2xhc3MgdGhhdCBkZXNpZ25hdGVzIGJvdW5kaW5nIGNvbnRhaW5lciBvZiBEcm9wZG93biAoZGVmYXVsdDogd2luZG93KVxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBwYXJlbnRDbGFzczogbnVsbCxcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIHRvIGRlbGF5IG9wZW5pbmcgYSBzdWJtZW51IG9uIGhvdmVyIGV2ZW50LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDI1MFxuICAgKi9cbiAgaG92ZXJEZWxheTogMjUwLFxuICAvKipcbiAgICogQWxsb3cgc3VibWVudXMgdG8gb3BlbiBvbiBob3ZlciBldmVudHNcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGhvdmVyOiBmYWxzZSxcbiAgLyoqXG4gICAqIERvbid0IGNsb3NlIGRyb3Bkb3duIHdoZW4gaG92ZXJpbmcgb3ZlciBkcm9wZG93biBwYW5lXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBob3ZlclBhbmU6IGZhbHNlLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyBiZXR3ZWVuIHRoZSBkcm9wZG93biBwYW5lIGFuZCB0aGUgdHJpZ2dlcmluZyBlbGVtZW50IG9uIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgdk9mZnNldDogMCxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiB0aGUgZHJvcGRvd24gcGFuZSBhbmQgdGhlIHRyaWdnZXJpbmcgZWxlbWVudCBvbiBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIGhPZmZzZXQ6IDAsXG4gIC8qKlxuICAgKiBERVBSRUNBVEVEOiBDbGFzcyBhcHBsaWVkIHRvIGFkanVzdCBvcGVuIHBvc2l0aW9uLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICBwb3NpdGlvbkNsYXNzOiAnJyxcblxuICAvKipcbiAgICogUG9zaXRpb24gb2YgZHJvcGRvd24uIENhbiBiZSBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG9yIGF1dG8uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2F1dG8nXG4gICAqL1xuICBwb3NpdGlvbjogJ2F1dG8nLFxuICAvKipcbiAgICogQWxpZ25tZW50IG9mIGRyb3Bkb3duIHJlbGF0aXZlIHRvIGFuY2hvci4gQ2FuIGJlIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgY2VudGVyLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgYWxpZ25tZW50OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvdyBvdmVybGFwIG9mIGNvbnRhaW5lci93aW5kb3cuIElmIGZhbHNlLCBkcm9wZG93biB3aWxsIGZpcnN0IHRyeSB0byBwb3NpdGlvbiBhcyBkZWZpbmVkIGJ5IGRhdGEtcG9zaXRpb24gYW5kIGRhdGEtYWxpZ25tZW50LCBidXQgcmVwb3NpdGlvbiBpZiBpdCB3b3VsZCBjYXVzZSBhbiBvdmVyZmxvdy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFsbG93T3ZlcmxhcDogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyBvdmVybGFwIG9mIG9ubHkgdGhlIGJvdHRvbSBvZiB0aGUgY29udGFpbmVyLiBUaGlzIGlzIHRoZSBtb3N0IGNvbW1vblxuICAgKiBiZWhhdmlvciBmb3IgZHJvcGRvd25zLCBhbGxvd2luZyB0aGUgZHJvcGRvd24gdG8gZXh0ZW5kIHRoZSBib3R0b20gb2YgdGhlXG4gICAqIHNjcmVlbiBidXQgbm90IG90aGVyd2lzZSBpbmZsdWVuY2Ugb3IgYnJlYWsgb3V0IG9mIHRoZSBjb250YWluZXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGFsbG93Qm90dG9tT3ZlcmxhcDogdHJ1ZSxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBwbHVnaW4gdG8gdHJhcCBmb2N1cyB0byB0aGUgZHJvcGRvd24gcGFuZSBpZiBvcGVuZWQgd2l0aCBrZXlib2FyZCBjb21tYW5kcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHRyYXBGb2N1czogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgcGx1Z2luIHRvIHNldCBmb2N1cyB0byB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQgd2l0aGluIHRoZSBwYW5lLCByZWdhcmRsZXNzIG9mIG1ldGhvZCBvZiBvcGVuaW5nLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93cyBhIGNsaWNrIG9uIHRoZSBib2R5IHRvIGNsb3NlIHRoZSBkcm9wZG93bi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGNsb3NlT25DbGljazogZmFsc2Vcbn1cblxuZXhwb3J0IHtEcm9wZG93bn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBCb3ggfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5ib3gnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5pbXBvcnQgeyBydGwgYXMgUnRsIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5cbmNvbnN0IFBPU0lUSU9OUyA9IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ107XG5jb25zdCBWRVJUSUNBTF9BTElHTk1FTlRTID0gWyd0b3AnLCAnYm90dG9tJywgJ2NlbnRlciddO1xuY29uc3QgSE9SSVpPTlRBTF9BTElHTk1FTlRTID0gWydsZWZ0JywgJ3JpZ2h0JywgJ2NlbnRlciddO1xuXG5jb25zdCBBTElHTk1FTlRTID0ge1xuICAnbGVmdCc6IFZFUlRJQ0FMX0FMSUdOTUVOVFMsXG4gICdyaWdodCc6IFZFUlRJQ0FMX0FMSUdOTUVOVFMsXG4gICd0b3AnOiBIT1JJWk9OVEFMX0FMSUdOTUVOVFMsXG4gICdib3R0b20nOiBIT1JJWk9OVEFMX0FMSUdOTUVOVFNcbn1cblxuZnVuY3Rpb24gbmV4dEl0ZW0oaXRlbSwgYXJyYXkpIHtcbiAgdmFyIGN1cnJlbnRJZHggPSBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICBpZihjdXJyZW50SWR4ID09PSBhcnJheS5sZW5ndGggLSAxKSB7XG4gICAgcmV0dXJuIGFycmF5WzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhcnJheVtjdXJyZW50SWR4ICsgMV07XG4gIH1cbn1cblxuXG5jbGFzcyBQb3NpdGlvbmFibGUgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQWJzdHJhY3QgY2xhc3MgZW5jYXBzdWxhdGluZyB0aGUgdGV0aGVyLWxpa2UgZXhwbGljaXQgcG9zaXRpb25pbmcgbG9naWNcbiAgICogaW5jbHVkaW5nIHJlcG9zaXRpb25pbmcgYmFzZWQgb24gb3ZlcmxhcC5cbiAgICogRXhwZWN0cyBjbGFzc2VzIHRvIGRlZmluZSBkZWZhdWx0cyBmb3Igdk9mZnNldCwgaE9mZnNldCwgcG9zaXRpb24sXG4gICAqIGFsaWdubWVudCwgYWxsb3dPdmVybGFwLCBhbmQgYWxsb3dCb3R0b21PdmVybGFwLiBUaGV5IGNhbiBkbyB0aGlzIGJ5XG4gICAqIGV4dGVuZGluZyB0aGUgZGVmYXVsdHMsIG9yIChmb3Igbm93IHJlY29tbWVuZGVkIGR1ZSB0byB0aGUgd2F5IGRvY3MgYXJlXG4gICAqIGdlbmVyYXRlZCkgYnkgZXhwbGljaXRseSBkZWNsYXJpbmcgdGhlbS5cbiAgICpcbiAgICoqL1xuXG4gIF9pbml0KCkge1xuICAgIHRoaXMudHJpZWRQb3NpdGlvbnMgPSB7fTtcbiAgICB0aGlzLnBvc2l0aW9uICA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9PT0gJ2F1dG8nID8gdGhpcy5fZ2V0RGVmYXVsdFBvc2l0aW9uKCkgOiB0aGlzLm9wdGlvbnMucG9zaXRpb247XG4gICAgdGhpcy5hbGlnbm1lbnQgPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID09PSAnYXV0bycgPyB0aGlzLl9nZXREZWZhdWx0QWxpZ25tZW50KCkgOiB0aGlzLm9wdGlvbnMuYWxpZ25tZW50O1xuICB9XG5cbiAgX2dldERlZmF1bHRQb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuICdib3R0b20nO1xuICB9XG5cbiAgX2dldERlZmF1bHRBbGlnbm1lbnQoKSB7XG4gICAgc3dpdGNoKHRoaXMucG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICByZXR1cm4gUnRsKCkgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHJldHVybiAnYm90dG9tJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRqdXN0cyB0aGUgcG9zaXRpb25hYmxlIHBvc3NpYmxlIHBvc2l0aW9ucyBieSBpdGVyYXRpbmcgdGhyb3VnaCBhbGlnbm1lbnRzXG4gICAqIGFuZCBwb3NpdGlvbnMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlcG9zaXRpb24oKSB7XG4gICAgaWYodGhpcy5fYWxpZ25tZW50c0V4aGF1c3RlZCh0aGlzLnBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IG5leHRJdGVtKHRoaXMucG9zaXRpb24sIFBPU0lUSU9OUyk7XG4gICAgICB0aGlzLmFsaWdubWVudCA9IEFMSUdOTUVOVFNbdGhpcy5wb3NpdGlvbl1bMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlYWxpZ24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRqdXN0cyB0aGUgZHJvcGRvd24gcGFuZSBwb3NzaWJsZSBwb3NpdGlvbnMgYnkgaXRlcmF0aW5nIHRocm91Z2ggYWxpZ25tZW50c1xuICAgKiBvbiB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVhbGlnbigpIHtcbiAgICB0aGlzLl9hZGRUcmllZFBvc2l0aW9uKHRoaXMucG9zaXRpb24sIHRoaXMuYWxpZ25tZW50KVxuICAgIHRoaXMuYWxpZ25tZW50ID0gbmV4dEl0ZW0odGhpcy5hbGlnbm1lbnQsIEFMSUdOTUVOVFNbdGhpcy5wb3NpdGlvbl0pXG4gIH1cblxuICBfYWRkVHJpZWRQb3NpdGlvbihwb3NpdGlvbiwgYWxpZ25tZW50KSB7XG4gICAgdGhpcy50cmllZFBvc2l0aW9uc1twb3NpdGlvbl0gPSB0aGlzLnRyaWVkUG9zaXRpb25zW3Bvc2l0aW9uXSB8fCBbXVxuICAgIHRoaXMudHJpZWRQb3NpdGlvbnNbcG9zaXRpb25dLnB1c2goYWxpZ25tZW50KTtcbiAgfVxuXG4gIF9wb3NpdGlvbnNFeGhhdXN0ZWQoKSB7XG4gICAgdmFyIGlzRXhoYXVzdGVkID0gdHJ1ZTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgUE9TSVRJT05TLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpc0V4aGF1c3RlZCA9IGlzRXhoYXVzdGVkICYmIHRoaXMuX2FsaWdubWVudHNFeGhhdXN0ZWQoUE9TSVRJT05TW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRXhoYXVzdGVkO1xuICB9XG5cbiAgX2FsaWdubWVudHNFeGhhdXN0ZWQocG9zaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy50cmllZFBvc2l0aW9uc1twb3NpdGlvbl0gJiYgdGhpcy50cmllZFBvc2l0aW9uc1twb3NpdGlvbl0ubGVuZ3RoID09IEFMSUdOTUVOVFNbcG9zaXRpb25dLmxlbmd0aDtcbiAgfVxuXG5cbiAgLy8gV2hlbiB3ZSdyZSB0cnlpbmcgdG8gY2VudGVyLCB3ZSBkb24ndCB3YW50IHRvIGFwcGx5IG9mZnNldCB0aGF0J3MgZ29pbmcgdG9cbiAgLy8gdGFrZSB1cyBqdXN0IG9mZiBjZW50ZXIsIHNvIHdyYXAgYXJvdW5kIHRvIHJldHVybiAwIGZvciB0aGUgYXBwcm9wcmlhdGVcbiAgLy8gb2Zmc2V0IGluIHRob3NlIGFsaWdubWVudHMuICBUT0RPOiBGaWd1cmUgb3V0IGlmIHdlIHdhbnQgdG8gbWFrZSB0aGlzXG4gIC8vIGNvbmZpZ3VyYWJsZSBiZWhhdmlvci4uLiBpdCBmZWVscyBtb3JlIGludHVpdGl2ZSwgZXNwZWNpYWxseSBmb3IgdG9vbHRpcHMsIGJ1dFxuICAvLyBpdCdzIHBvc3NpYmxlIHNvbWVvbmUgbWlnaHQgYWN0dWFsbHkgd2FudCB0byBzdGFydCBmcm9tIGNlbnRlciBhbmQgdGhlbiBudWRnZVxuICAvLyBzbGlnaHRseSBvZmYuXG4gIF9nZXRWT2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudk9mZnNldDtcbiAgfVxuXG4gIF9nZXRIT2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaE9mZnNldDtcbiAgfVxuXG5cbiAgX3NldFBvc2l0aW9uKCRhbmNob3IsICRlbGVtZW50LCAkcGFyZW50KSB7XG4gICAgaWYoJGFuY2hvci5hdHRyKCdhcmlhLWV4cGFuZGVkJykgPT09ICdmYWxzZScpeyByZXR1cm4gZmFsc2U7IH1cbiAgICB2YXIgJGVsZURpbXMgPSBCb3guR2V0RGltZW5zaW9ucygkZWxlbWVudCksXG4gICAgICAgICRhbmNob3JEaW1zID0gQm94LkdldERpbWVuc2lvbnMoJGFuY2hvcik7XG5cblxuICAgICRlbGVtZW50Lm9mZnNldChCb3guR2V0RXhwbGljaXRPZmZzZXRzKCRlbGVtZW50LCAkYW5jaG9yLCB0aGlzLnBvc2l0aW9uLCB0aGlzLmFsaWdubWVudCwgdGhpcy5fZ2V0Vk9mZnNldCgpLCB0aGlzLl9nZXRIT2Zmc2V0KCkpKTtcblxuICAgIGlmKCF0aGlzLm9wdGlvbnMuYWxsb3dPdmVybGFwKSB7XG4gICAgICB2YXIgb3ZlcmxhcHMgPSB7fTtcbiAgICAgIHZhciBtaW5PdmVybGFwID0gMTAwMDAwMDAwO1xuICAgICAgLy8gZGVmYXVsdCBjb29yZGluYXRlcyB0byBob3cgd2Ugc3RhcnQsIGluIGNhc2Ugd2UgY2FuJ3QgZmlndXJlIG91dCBiZXR0ZXJcbiAgICAgIHZhciBtaW5Db29yZGluYXRlcyA9IHtwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiwgYWxpZ25tZW50OiB0aGlzLmFsaWdubWVudH07XG4gICAgICB3aGlsZSghdGhpcy5fcG9zaXRpb25zRXhoYXVzdGVkKCkpIHtcbiAgICAgICAgbGV0IG92ZXJsYXAgPSBCb3guT3ZlcmxhcEFyZWEoJGVsZW1lbnQsICRwYXJlbnQsIGZhbHNlLCBmYWxzZSwgdGhpcy5vcHRpb25zLmFsbG93Qm90dG9tT3ZlcmxhcCk7XG4gICAgICAgIGlmKG92ZXJsYXAgPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZihvdmVybGFwIDwgbWluT3ZlcmxhcCkge1xuICAgICAgICAgIG1pbk92ZXJsYXAgPSBvdmVybGFwO1xuICAgICAgICAgIG1pbkNvb3JkaW5hdGVzID0ge3Bvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLCBhbGlnbm1lbnQ6IHRoaXMuYWxpZ25tZW50fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlcG9zaXRpb24oKTtcblxuICAgICAgICAkZWxlbWVudC5vZmZzZXQoQm94LkdldEV4cGxpY2l0T2Zmc2V0cygkZWxlbWVudCwgJGFuY2hvciwgdGhpcy5wb3NpdGlvbiwgdGhpcy5hbGlnbm1lbnQsIHRoaXMuX2dldFZPZmZzZXQoKSwgdGhpcy5fZ2V0SE9mZnNldCgpKSk7XG4gICAgICB9XG4gICAgICAvLyBJZiB3ZSBnZXQgdGhyb3VnaCB0aGUgZW50aXJlIGxvb3AsIHRoZXJlIHdhcyBubyBub24tb3ZlcmxhcHBpbmdcbiAgICAgIC8vIHBvc2l0aW9uIGF2YWlsYWJsZS4gUGljayB0aGUgdmVyc2lvbiB3aXRoIGxlYXN0IG92ZXJsYXAuXG4gICAgICB0aGlzLnBvc2l0aW9uID0gbWluQ29vcmRpbmF0ZXMucG9zaXRpb247XG4gICAgICB0aGlzLmFsaWdubWVudCA9IG1pbkNvb3JkaW5hdGVzLmFsaWdubWVudDtcbiAgICAgICRlbGVtZW50Lm9mZnNldChCb3guR2V0RXhwbGljaXRPZmZzZXRzKCRlbGVtZW50LCAkYW5jaG9yLCB0aGlzLnBvc2l0aW9uLCB0aGlzLmFsaWdubWVudCwgdGhpcy5fZ2V0Vk9mZnNldCgpLCB0aGlzLl9nZXRIT2Zmc2V0KCkpKTtcbiAgICB9XG4gIH1cblxufVxuXG5Qb3NpdGlvbmFibGUuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBQb3NpdGlvbiBvZiBwb3NpdGlvbmFibGUgcmVsYXRpdmUgdG8gYW5jaG9yLiBDYW4gYmUgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgcG9zaXRpb246ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsaWdubWVudCBvZiBwb3NpdGlvbmFibGUgcmVsYXRpdmUgdG8gYW5jaG9yLiBDYW4gYmUgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBjZW50ZXIsIG9yIGF1dG8uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2F1dG8nXG4gICAqL1xuICBhbGlnbm1lbnQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsbG93IG92ZXJsYXAgb2YgY29udGFpbmVyL3dpbmRvdy4gSWYgZmFsc2UsIGRyb3Bkb3duIHBvc2l0aW9uYWJsZSBmaXJzdFxuICAgKiB0cnkgdG8gcG9zaXRpb24gYXMgZGVmaW5lZCBieSBkYXRhLXBvc2l0aW9uIGFuZCBkYXRhLWFsaWdubWVudCwgYnV0XG4gICAqIHJlcG9zaXRpb24gaWYgaXQgd291bGQgY2F1c2UgYW4gb3ZlcmZsb3cuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbGxvd092ZXJsYXA6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgb3ZlcmxhcCBvZiBvbmx5IHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lci4gVGhpcyBpcyB0aGUgbW9zdCBjb21tb25cbiAgICogYmVoYXZpb3IgZm9yIGRyb3Bkb3ducywgYWxsb3dpbmcgdGhlIGRyb3Bkb3duIHRvIGV4dGVuZCB0aGUgYm90dG9tIG9mIHRoZVxuICAgKiBzY3JlZW4gYnV0IG5vdCBvdGhlcndpc2UgaW5mbHVlbmNlIG9yIGJyZWFrIG91dCBvZiB0aGUgY29udGFpbmVyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhbGxvd0JvdHRvbU92ZXJsYXA6IHRydWUsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIHRoZSBwb3NpdGlvbmFibGUgc2hvdWxkIGJlIHNlcGFyYXRlZCB2ZXJ0aWNhbGx5IGZyb20gYW5jaG9yXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgdk9mZnNldDogMCxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgdGhlIHBvc2l0aW9uYWJsZSBzaG91bGQgYmUgc2VwYXJhdGVkIGhvcml6b250YWxseSBmcm9tIGFuY2hvclxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIGhPZmZzZXQ6IDAsXG59XG5cbmV4cG9ydCB7UG9zaXRpb25hYmxlfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucG9zaXRpb25hYmxlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuaW1wb3J0IHsgb25JbWFnZXNMb2FkZWQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlcic7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5cbi8qKlxuICogRXF1YWxpemVyIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5lcXVhbGl6ZXJcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlciBpZiBlcXVhbGl6ZXIgY29udGFpbnMgaW1hZ2VzXG4gKi9cblxuY2xhc3MgRXF1YWxpemVyIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgRXF1YWxpemVyLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgRXF1YWxpemVyXG4gICAqIEBmaXJlcyBFcXVhbGl6ZXIjaW5pdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gYWRkIHRoZSB0cmlnZ2VyIHRvLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucyl7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zICA9ICQuZXh0ZW5kKHt9LCBFcXVhbGl6ZXIuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdFcXVhbGl6ZXInOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgRXF1YWxpemVyIHBsdWdpbiBhbmQgY2FsbHMgZnVuY3Rpb25zIHRvIGdldCBlcXVhbGl6ZXIgZnVuY3Rpb25pbmcgb24gbG9hZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBlcUlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLWVxdWFsaXplcicpIHx8ICcnO1xuICAgIHZhciAkd2F0Y2hlZCA9IHRoaXMuJGVsZW1lbnQuZmluZChgW2RhdGEtZXF1YWxpemVyLXdhdGNoPVwiJHtlcUlkfVwiXWApO1xuXG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuXG4gICAgdGhpcy4kd2F0Y2hlZCA9ICR3YXRjaGVkLmxlbmd0aCA/ICR3YXRjaGVkIDogdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1lcXVhbGl6ZXItd2F0Y2hdJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLXJlc2l6ZScsIChlcUlkIHx8IEdldFlvRGlnaXRzKDYsICdlcScpKSk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLW11dGF0ZScsIChlcUlkIHx8IEdldFlvRGlnaXRzKDYsICdlcScpKSk7XG5cbiAgICB0aGlzLmhhc05lc3RlZCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtZXF1YWxpemVyXScpLmxlbmd0aCA+IDA7XG4gICAgdGhpcy5pc05lc3RlZCA9IHRoaXMuJGVsZW1lbnQucGFyZW50c1VudGlsKGRvY3VtZW50LmJvZHksICdbZGF0YS1lcXVhbGl6ZXJdJykubGVuZ3RoID4gMDtcbiAgICB0aGlzLmlzT24gPSBmYWxzZTtcbiAgICB0aGlzLl9iaW5kSGFuZGxlciA9IHtcbiAgICAgIG9uUmVzaXplTWVCb3VuZDogdGhpcy5fb25SZXNpemVNZS5iaW5kKHRoaXMpLFxuICAgICAgb25Qb3N0RXF1YWxpemVkQm91bmQ6IHRoaXMuX29uUG9zdEVxdWFsaXplZC5iaW5kKHRoaXMpXG4gICAgfTtcblxuICAgIHZhciBpbWdzID0gdGhpcy4kZWxlbWVudC5maW5kKCdpbWcnKTtcbiAgICB2YXIgdG9vU21hbGw7XG4gICAgaWYodGhpcy5vcHRpb25zLmVxdWFsaXplT24pe1xuICAgICAgdG9vU21hbGwgPSB0aGlzLl9jaGVja01RKCk7XG4gICAgICAkKHdpbmRvdykub24oJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIHRoaXMuX2NoZWNrTVEuYmluZCh0aGlzKSk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLl9ldmVudHMoKTtcbiAgICB9XG4gICAgaWYoKHRvb1NtYWxsICE9PSB1bmRlZmluZWQgJiYgdG9vU21hbGwgPT09IGZhbHNlKSB8fCB0b29TbWFsbCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIGlmKGltZ3MubGVuZ3RoKXtcbiAgICAgICAgb25JbWFnZXNMb2FkZWQoaW1ncywgdGhpcy5fcmVmbG93LmJpbmQodGhpcykpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuX3JlZmxvdygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycyBpZiB0aGUgYnJlYWtwb2ludCBpcyB0b28gc21hbGwuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGF1c2VFdmVudHMoKSB7XG4gICAgdGhpcy5pc09uID0gZmFsc2U7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoe1xuICAgICAgJy56Zi5lcXVhbGl6ZXInOiB0aGlzLl9iaW5kSGFuZGxlci5vblBvc3RFcXVhbGl6ZWRCb3VuZCxcbiAgICAgICdyZXNpemVtZS56Zi50cmlnZ2VyJzogdGhpcy5fYmluZEhhbmRsZXIub25SZXNpemVNZUJvdW5kLFxuXHQgICdtdXRhdGVtZS56Zi50cmlnZ2VyJzogdGhpcy5fYmluZEhhbmRsZXIub25SZXNpemVNZUJvdW5kXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZnVuY3Rpb24gdG8gaGFuZGxlICRlbGVtZW50cyByZXNpemVtZS56Zi50cmlnZ2VyLCB3aXRoIGJvdW5kIHRoaXMgb24gX2JpbmRIYW5kbGVyLm9uUmVzaXplTWVCb3VuZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX29uUmVzaXplTWUoZSkge1xuICAgIHRoaXMuX3JlZmxvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGZ1bmN0aW9uIHRvIGhhbmRsZSAkZWxlbWVudHMgcG9zdGVxdWFsaXplZC56Zi5lcXVhbGl6ZXIsIHdpdGggYm91bmQgdGhpcyBvbiBfYmluZEhhbmRsZXIub25Qb3N0RXF1YWxpemVkQm91bmRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9vblBvc3RFcXVhbGl6ZWQoZSkge1xuICAgIGlmKGUudGFyZ2V0ICE9PSB0aGlzLiRlbGVtZW50WzBdKXsgdGhpcy5fcmVmbG93KCk7IH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIEVxdWFsaXplci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLl9wYXVzZUV2ZW50cygpO1xuICAgIGlmKHRoaXMuaGFzTmVzdGVkKXtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3Bvc3RlcXVhbGl6ZWQuemYuZXF1YWxpemVyJywgdGhpcy5fYmluZEhhbmRsZXIub25Qb3N0RXF1YWxpemVkQm91bmQpO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigncmVzaXplbWUuemYudHJpZ2dlcicsIHRoaXMuX2JpbmRIYW5kbGVyLm9uUmVzaXplTWVCb3VuZCk7XG5cdCAgdGhpcy4kZWxlbWVudC5vbignbXV0YXRlbWUuemYudHJpZ2dlcicsIHRoaXMuX2JpbmRIYW5kbGVyLm9uUmVzaXplTWVCb3VuZCk7XG4gICAgfVxuICAgIHRoaXMuaXNPbiA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQgdG8gdGhlIG1pbmltdW0gcmVxdWlyZWQgc2l6ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jaGVja01RKCkge1xuICAgIHZhciB0b29TbWFsbCA9ICFNZWRpYVF1ZXJ5LmlzKHRoaXMub3B0aW9ucy5lcXVhbGl6ZU9uKTtcbiAgICBpZih0b29TbWFsbCl7XG4gICAgICBpZih0aGlzLmlzT24pe1xuICAgICAgICB0aGlzLl9wYXVzZUV2ZW50cygpO1xuICAgICAgICB0aGlzLiR3YXRjaGVkLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIGlmKCF0aGlzLmlzT24pe1xuICAgICAgICB0aGlzLl9ldmVudHMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvb1NtYWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbm9vcCB2ZXJzaW9uIGZvciB0aGUgcGx1Z2luXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfa2lsbHN3aXRjaCgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyB0byB1cGRhdGUgRXF1YWxpemVyIHVwb24gRE9NIGNoYW5nZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlZmxvdygpIHtcbiAgICBpZighdGhpcy5vcHRpb25zLmVxdWFsaXplT25TdGFjayl7XG4gICAgICBpZih0aGlzLl9pc1N0YWNrZWQoKSl7XG4gICAgICAgIHRoaXMuJHdhdGNoZWQuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZXF1YWxpemVCeVJvdykge1xuICAgICAgdGhpcy5nZXRIZWlnaHRzQnlSb3codGhpcy5hcHBseUhlaWdodEJ5Um93LmJpbmQodGhpcykpO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5nZXRIZWlnaHRzKHRoaXMuYXBwbHlIZWlnaHQuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IGRldGVybWluZXMgaWYgdGhlIGZpcnN0IDIgZWxlbWVudHMgYXJlICpOT1QqIHN0YWNrZWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaXNTdGFja2VkKCkge1xuICAgIGlmICghdGhpcy4kd2F0Y2hlZFswXSB8fCAhdGhpcy4kd2F0Y2hlZFsxXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLiR3YXRjaGVkWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAhPT0gdGhpcy4kd2F0Y2hlZFsxXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIG91dGVyIGhlaWdodHMgb2YgY2hpbGRyZW4gY29udGFpbmVkIHdpdGhpbiBhbiBFcXVhbGl6ZXIgcGFyZW50IGFuZCByZXR1cm5zIHRoZW0gaW4gYW4gYXJyYXlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBBIG5vbi1vcHRpb25hbCBjYWxsYmFjayB0byByZXR1cm4gdGhlIGhlaWdodHMgYXJyYXkgdG8uXG4gICAqIEByZXR1cm5zIHtBcnJheX0gaGVpZ2h0cyAtIEFuIGFycmF5IG9mIGhlaWdodHMgb2YgY2hpbGRyZW4gd2l0aGluIEVxdWFsaXplciBjb250YWluZXJcbiAgICovXG4gIGdldEhlaWdodHMoY2IpIHtcbiAgICB2YXIgaGVpZ2h0cyA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuJHdhdGNoZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgdGhpcy4kd2F0Y2hlZFtpXS5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICBoZWlnaHRzLnB1c2godGhpcy4kd2F0Y2hlZFtpXS5vZmZzZXRIZWlnaHQpO1xuICAgIH1cbiAgICBjYihoZWlnaHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgb3V0ZXIgaGVpZ2h0cyBvZiBjaGlsZHJlbiBjb250YWluZWQgd2l0aGluIGFuIEVxdWFsaXplciBwYXJlbnQgYW5kIHJldHVybnMgdGhlbSBpbiBhbiBhcnJheVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIEEgbm9uLW9wdGlvbmFsIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgaGVpZ2h0cyBhcnJheSB0by5cbiAgICogQHJldHVybnMge0FycmF5fSBncm91cHMgLSBBbiBhcnJheSBvZiBoZWlnaHRzIG9mIGNoaWxkcmVuIHdpdGhpbiBFcXVhbGl6ZXIgY29udGFpbmVyIGdyb3VwZWQgYnkgcm93IHdpdGggZWxlbWVudCxoZWlnaHQgYW5kIG1heCBhcyBsYXN0IGNoaWxkXG4gICAqL1xuICBnZXRIZWlnaHRzQnlSb3coY2IpIHtcbiAgICB2YXIgbGFzdEVsVG9wT2Zmc2V0ID0gKHRoaXMuJHdhdGNoZWQubGVuZ3RoID8gdGhpcy4kd2F0Y2hlZC5maXJzdCgpLm9mZnNldCgpLnRvcCA6IDApLFxuICAgICAgICBncm91cHMgPSBbXSxcbiAgICAgICAgZ3JvdXAgPSAwO1xuICAgIC8vZ3JvdXAgYnkgUm93XG4gICAgZ3JvdXBzW2dyb3VwXSA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuJHdhdGNoZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgdGhpcy4kd2F0Y2hlZFtpXS5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAvL21heWJlIGNvdWxkIHVzZSB0aGlzLiR3YXRjaGVkW2ldLm9mZnNldFRvcFxuICAgICAgdmFyIGVsT2Zmc2V0VG9wID0gJCh0aGlzLiR3YXRjaGVkW2ldKS5vZmZzZXQoKS50b3A7XG4gICAgICBpZiAoZWxPZmZzZXRUb3AhPWxhc3RFbFRvcE9mZnNldCkge1xuICAgICAgICBncm91cCsrO1xuICAgICAgICBncm91cHNbZ3JvdXBdID0gW107XG4gICAgICAgIGxhc3RFbFRvcE9mZnNldD1lbE9mZnNldFRvcDtcbiAgICAgIH1cbiAgICAgIGdyb3Vwc1tncm91cF0ucHVzaChbdGhpcy4kd2F0Y2hlZFtpXSx0aGlzLiR3YXRjaGVkW2ldLm9mZnNldEhlaWdodF0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGogPSAwLCBsbiA9IGdyb3Vwcy5sZW5ndGg7IGogPCBsbjsgaisrKSB7XG4gICAgICB2YXIgaGVpZ2h0cyA9ICQoZ3JvdXBzW2pdKS5tYXAoZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXNbMV07IH0pLmdldCgpO1xuICAgICAgdmFyIG1heCAgICAgICAgID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaGVpZ2h0cyk7XG4gICAgICBncm91cHNbal0ucHVzaChtYXgpO1xuICAgIH1cbiAgICBjYihncm91cHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIENTUyBoZWlnaHQgcHJvcGVydHkgb2YgZWFjaCBjaGlsZCBpbiBhbiBFcXVhbGl6ZXIgcGFyZW50IHRvIG1hdGNoIHRoZSB0YWxsZXN0XG4gICAqIEBwYXJhbSB7YXJyYXl9IGhlaWdodHMgLSBBbiBhcnJheSBvZiBoZWlnaHRzIG9mIGNoaWxkcmVuIHdpdGhpbiBFcXVhbGl6ZXIgY29udGFpbmVyXG4gICAqIEBmaXJlcyBFcXVhbGl6ZXIjcHJlZXF1YWxpemVkXG4gICAqIEBmaXJlcyBFcXVhbGl6ZXIjcG9zdGVxdWFsaXplZFxuICAgKi9cbiAgYXBwbHlIZWlnaHQoaGVpZ2h0cykge1xuICAgIHZhciBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBoZWlnaHRzKTtcbiAgICAvKipcbiAgICAgKiBGaXJlcyBiZWZvcmUgdGhlIGhlaWdodHMgYXJlIGFwcGxpZWRcbiAgICAgKiBAZXZlbnQgRXF1YWxpemVyI3ByZWVxdWFsaXplZFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigncHJlZXF1YWxpemVkLnpmLmVxdWFsaXplcicpO1xuXG4gICAgdGhpcy4kd2F0Y2hlZC5jc3MoJ2hlaWdodCcsIG1heCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBoZWlnaHRzIGhhdmUgYmVlbiBhcHBsaWVkXG4gICAgICogQGV2ZW50IEVxdWFsaXplciNwb3N0ZXF1YWxpemVkXG4gICAgICovXG4gICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigncG9zdGVxdWFsaXplZC56Zi5lcXVhbGl6ZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBDU1MgaGVpZ2h0IHByb3BlcnR5IG9mIGVhY2ggY2hpbGQgaW4gYW4gRXF1YWxpemVyIHBhcmVudCB0byBtYXRjaCB0aGUgdGFsbGVzdCBieSByb3dcbiAgICogQHBhcmFtIHthcnJheX0gZ3JvdXBzIC0gQW4gYXJyYXkgb2YgaGVpZ2h0cyBvZiBjaGlsZHJlbiB3aXRoaW4gRXF1YWxpemVyIGNvbnRhaW5lciBncm91cGVkIGJ5IHJvdyB3aXRoIGVsZW1lbnQsaGVpZ2h0IGFuZCBtYXggYXMgbGFzdCBjaGlsZFxuICAgKiBAZmlyZXMgRXF1YWxpemVyI3ByZWVxdWFsaXplZFxuICAgKiBAZmlyZXMgRXF1YWxpemVyI3ByZWVxdWFsaXplZHJvd1xuICAgKiBAZmlyZXMgRXF1YWxpemVyI3Bvc3RlcXVhbGl6ZWRyb3dcbiAgICogQGZpcmVzIEVxdWFsaXplciNwb3N0ZXF1YWxpemVkXG4gICAqL1xuICBhcHBseUhlaWdodEJ5Um93KGdyb3Vwcykge1xuICAgIC8qKlxuICAgICAqIEZpcmVzIGJlZm9yZSB0aGUgaGVpZ2h0cyBhcmUgYXBwbGllZFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigncHJlZXF1YWxpemVkLnpmLmVxdWFsaXplcicpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBncm91cHMubGVuZ3RoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICB2YXIgZ3JvdXBzSUxlbmd0aCA9IGdyb3Vwc1tpXS5sZW5ndGgsXG4gICAgICAgICAgbWF4ID0gZ3JvdXBzW2ldW2dyb3Vwc0lMZW5ndGggLSAxXTtcbiAgICAgIGlmIChncm91cHNJTGVuZ3RoPD0yKSB7XG4gICAgICAgICQoZ3JvdXBzW2ldWzBdWzBdKS5jc3MoeydoZWlnaHQnOidhdXRvJ30pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICAqIEZpcmVzIGJlZm9yZSB0aGUgaGVpZ2h0cyBwZXIgcm93IGFyZSBhcHBsaWVkXG4gICAgICAgICogQGV2ZW50IEVxdWFsaXplciNwcmVlcXVhbGl6ZWRyb3dcbiAgICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigncHJlZXF1YWxpemVkcm93LnpmLmVxdWFsaXplcicpO1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbkogPSAoZ3JvdXBzSUxlbmd0aC0xKTsgaiA8IGxlbkogOyBqKyspIHtcbiAgICAgICAgJChncm91cHNbaV1bal1bMF0pLmNzcyh7J2hlaWdodCc6bWF4fSk7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBoZWlnaHRzIHBlciByb3cgaGF2ZSBiZWVuIGFwcGxpZWRcbiAgICAgICAgKiBAZXZlbnQgRXF1YWxpemVyI3Bvc3RlcXVhbGl6ZWRyb3dcbiAgICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigncG9zdGVxdWFsaXplZHJvdy56Zi5lcXVhbGl6ZXInKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgaGVpZ2h0cyBoYXZlIGJlZW4gYXBwbGllZFxuICAgICAqL1xuICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3Bvc3RlcXVhbGl6ZWQuemYuZXF1YWxpemVyJyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgRXF1YWxpemVyLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuX3BhdXNlRXZlbnRzKCk7XG4gICAgdGhpcy4kd2F0Y2hlZC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IHNldHRpbmdzIGZvciBwbHVnaW5cbiAqL1xuRXF1YWxpemVyLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogRW5hYmxlIGhlaWdodCBlcXVhbGl6YXRpb24gd2hlbiBzdGFja2VkIG9uIHNtYWxsZXIgc2NyZWVucy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGVxdWFsaXplT25TdGFjazogZmFsc2UsXG4gIC8qKlxuICAgKiBFbmFibGUgaGVpZ2h0IGVxdWFsaXphdGlvbiByb3cgYnkgcm93LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZXF1YWxpemVCeVJvdzogZmFsc2UsXG4gIC8qKlxuICAgKiBTdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBtaW5pbXVtIGJyZWFrcG9pbnQgc2l6ZSB0aGUgcGx1Z2luIHNob3VsZCBlcXVhbGl6ZSBoZWlnaHRzIG9uLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICBlcXVhbGl6ZU9uOiAnJ1xufTtcblxuZXhwb3J0IHtFcXVhbGl6ZXJ9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5lcXVhbGl6ZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5cblxuLyoqXG4gKiBJbnRlcmNoYW5nZSBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uaW50ZXJjaGFuZ2VcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICovXG5cbmNsYXNzIEludGVyY2hhbmdlIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgSW50ZXJjaGFuZ2UuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBJbnRlcmNoYW5nZVxuICAgKiBAZmlyZXMgSW50ZXJjaGFuZ2UjaW5pdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gYWRkIHRoZSB0cmlnZ2VyIHRvLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBJbnRlcmNoYW5nZS5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5ydWxlcyA9IFtdO1xuICAgIHRoaXMuY3VycmVudFBhdGggPSAnJztcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdJbnRlcmNoYW5nZSc7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBJbnRlcmNoYW5nZSBwbHVnaW4gYW5kIGNhbGxzIGZ1bmN0aW9ucyB0byBnZXQgaW50ZXJjaGFuZ2UgZnVuY3Rpb25pbmcgb24gbG9hZC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG5cbiAgICB2YXIgaWQgPSB0aGlzLiRlbGVtZW50WzBdLmlkIHx8IEdldFlvRGlnaXRzKDYsICdpbnRlcmNoYW5nZScpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7XG4gICAgICAnZGF0YS1yZXNpemUnOiBpZCxcbiAgICAgICdpZCc6IGlkXG4gICAgfSk7XG5cbiAgICB0aGlzLl9hZGRCcmVha3BvaW50cygpO1xuICAgIHRoaXMuX2dlbmVyYXRlUnVsZXMoKTtcbiAgICB0aGlzLl9yZWZsb3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIEludGVyY2hhbmdlLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInKS5vbigncmVzaXplbWUuemYudHJpZ2dlcicsICgpID0+IHRoaXMuX3JlZmxvdygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBuZWNlc3NhcnkgZnVuY3Rpb25zIHRvIHVwZGF0ZSBJbnRlcmNoYW5nZSB1cG9uIERPTSBjaGFuZ2VcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVmbG93KCkge1xuICAgIHZhciBtYXRjaDtcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHJ1bGUsIGJ1dCBvbmx5IHNhdmUgdGhlIGxhc3QgbWF0Y2hcbiAgICBmb3IgKHZhciBpIGluIHRoaXMucnVsZXMpIHtcbiAgICAgIGlmKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdmFyIHJ1bGUgPSB0aGlzLnJ1bGVzW2ldO1xuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEocnVsZS5xdWVyeSkubWF0Y2hlcykge1xuICAgICAgICAgIG1hdGNoID0gcnVsZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgdGhpcy5yZXBsYWNlKG1hdGNoLnBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBGb3VuZGF0aW9uIGJyZWFrcG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gdGhlIEludGVyY2hhbmdlLlNQRUNJQUxfUVVFUklFUyBvYmplY3QuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZEJyZWFrcG9pbnRzKCkge1xuICAgIGZvciAodmFyIGkgaW4gTWVkaWFRdWVyeS5xdWVyaWVzKSB7XG4gICAgICBpZiAoTWVkaWFRdWVyeS5xdWVyaWVzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IE1lZGlhUXVlcnkucXVlcmllc1tpXTtcbiAgICAgICAgSW50ZXJjaGFuZ2UuU1BFQ0lBTF9RVUVSSUVTW3F1ZXJ5Lm5hbWVdID0gcXVlcnkudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgSW50ZXJjaGFuZ2UgZWxlbWVudCBmb3IgdGhlIHByb3ZpZGVkIG1lZGlhIHF1ZXJ5ICsgY29udGVudCBwYWlyaW5nc1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRoYXQgaXMgYW4gSW50ZXJjaGFuZ2UgaW5zdGFuY2VcbiAgICogQHJldHVybnMge0FycmF5fSBzY2VuYXJpb3MgLSBBcnJheSBvZiBvYmplY3RzIHRoYXQgaGF2ZSAnbXEnIGFuZCAncGF0aCcga2V5cyB3aXRoIGNvcnJlc3BvbmRpbmcga2V5c1xuICAgKi9cbiAgX2dlbmVyYXRlUnVsZXMoZWxlbWVudCkge1xuICAgIHZhciBydWxlc0xpc3QgPSBbXTtcbiAgICB2YXIgcnVsZXM7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJ1bGVzKSB7XG4gICAgICBydWxlcyA9IHRoaXMub3B0aW9ucy5ydWxlcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBydWxlcyA9IHRoaXMuJGVsZW1lbnQuZGF0YSgnaW50ZXJjaGFuZ2UnKTtcbiAgICB9XG5cbiAgICBydWxlcyA9ICB0eXBlb2YgcnVsZXMgPT09ICdzdHJpbmcnID8gcnVsZXMubWF0Y2goL1xcWy4qP1xcXS9nKSA6IHJ1bGVzO1xuXG4gICAgZm9yICh2YXIgaSBpbiBydWxlcykge1xuICAgICAgaWYocnVsZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdmFyIHJ1bGUgPSBydWxlc1tpXS5zbGljZSgxLCAtMSkuc3BsaXQoJywgJyk7XG4gICAgICAgIHZhciBwYXRoID0gcnVsZS5zbGljZSgwLCAtMSkuam9pbignJyk7XG4gICAgICAgIHZhciBxdWVyeSA9IHJ1bGVbcnVsZS5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAoSW50ZXJjaGFuZ2UuU1BFQ0lBTF9RVUVSSUVTW3F1ZXJ5XSkge1xuICAgICAgICAgIHF1ZXJ5ID0gSW50ZXJjaGFuZ2UuU1BFQ0lBTF9RVUVSSUVTW3F1ZXJ5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bGVzTGlzdC5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgIHF1ZXJ5OiBxdWVyeVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJ1bGVzID0gcnVsZXNMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgYHNyY2AgcHJvcGVydHkgb2YgYW4gaW1hZ2UsIG9yIGNoYW5nZSB0aGUgSFRNTCBvZiBhIGNvbnRhaW5lciwgdG8gdGhlIHNwZWNpZmllZCBwYXRoLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggLSBQYXRoIHRvIHRoZSBpbWFnZSBvciBIVE1MIHBhcnRpYWwuXG4gICAqIEBmaXJlcyBJbnRlcmNoYW5nZSNyZXBsYWNlZFxuICAgKi9cbiAgcmVwbGFjZShwYXRoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGggPT09IHBhdGgpIHJldHVybjtcblxuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIHRyaWdnZXIgPSAncmVwbGFjZWQuemYuaW50ZXJjaGFuZ2UnO1xuXG4gICAgLy8gUmVwbGFjaW5nIGltYWdlc1xuICAgIGlmICh0aGlzLiRlbGVtZW50WzBdLm5vZGVOYW1lID09PSAnSU1HJykge1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdzcmMnLCBwYXRoKS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBfdGhpcy5jdXJyZW50UGF0aCA9IHBhdGg7XG4gICAgICB9KVxuICAgICAgLnRyaWdnZXIodHJpZ2dlcik7XG4gICAgfVxuICAgIC8vIFJlcGxhY2luZyBiYWNrZ3JvdW5kIGltYWdlc1xuICAgIGVsc2UgaWYgKHBhdGgubWF0Y2goL1xcLihnaWZ8anBnfGpwZWd8cG5nfHN2Z3x0aWZmKShbPyNdLiopPy9pKSkge1xuICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwoL2csICclMjgnKS5yZXBsYWNlKC9cXCkvZywgJyUyOScpO1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3MoeyAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJytwYXRoKycpJyB9KVxuICAgICAgICAgIC50cmlnZ2VyKHRyaWdnZXIpO1xuICAgIH1cbiAgICAvLyBSZXBsYWNpbmcgSFRNTFxuICAgIGVsc2Uge1xuICAgICAgJC5nZXQocGF0aCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgX3RoaXMuJGVsZW1lbnQuaHRtbChyZXNwb25zZSlcbiAgICAgICAgICAgICAudHJpZ2dlcih0cmlnZ2VyKTtcbiAgICAgICAgJChyZXNwb25zZSkuZm91bmRhdGlvbigpO1xuICAgICAgICBfdGhpcy5jdXJyZW50UGF0aCA9IHBhdGg7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIGNvbnRlbnQgaW4gYW4gSW50ZXJjaGFuZ2UgZWxlbWVudCBpcyBkb25lIGJlaW5nIGxvYWRlZC5cbiAgICAgKiBAZXZlbnQgSW50ZXJjaGFuZ2UjcmVwbGFjZWRcbiAgICAgKi9cbiAgICAvLyB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3JlcGxhY2VkLnpmLmludGVyY2hhbmdlJyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgaW50ZXJjaGFuZ2UuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInKVxuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBzZXR0aW5ncyBmb3IgcGx1Z2luXG4gKi9cbkludGVyY2hhbmdlLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogUnVsZXMgdG8gYmUgYXBwbGllZCB0byBJbnRlcmNoYW5nZSBlbGVtZW50cy4gU2V0IHdpdGggdGhlIGBkYXRhLWludGVyY2hhbmdlYCBhcnJheSBub3RhdGlvbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P2FycmF5fVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBydWxlczogbnVsbFxufTtcblxuSW50ZXJjaGFuZ2UuU1BFQ0lBTF9RVUVSSUVTID0ge1xuICAnbGFuZHNjYXBlJzogJ3NjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpJyxcbiAgJ3BvcnRyYWl0JzogJ3NjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknLFxuICAncmV0aW5hJzogJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwgb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIvMSksIG9ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzogMiksIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDE5MmRwaSksIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDJkcHB4KSdcbn07XG5cbmV4cG9ydCB7SW50ZXJjaGFuZ2V9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5pbnRlcmNoYW5nZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuaW1wb3J0IHsgU21vb3RoU2Nyb2xsIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnNtb290aFNjcm9sbCc7XG5cbi8qKlxuICogTWFnZWxsYW4gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLm1hZ2VsbGFuXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi5zbW9vdGhTY3JvbGxcbiAqL1xuXG5jbGFzcyBNYWdlbGxhbiBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIE1hZ2VsbGFuLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgTWFnZWxsYW5cbiAgICogQGZpcmVzIE1hZ2VsbGFuI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGFkZCB0aGUgdHJpZ2dlciB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgID0gJC5leHRlbmQoe30sIE1hZ2VsbGFuLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnTWFnZWxsYW4nOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLmNhbGNQb2ludHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgTWFnZWxsYW4gcGx1Z2luIGFuZCBjYWxscyBmdW5jdGlvbnMgdG8gZ2V0IGVxdWFsaXplciBmdW5jdGlvbmluZyBvbiBsb2FkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIGlkID0gdGhpcy4kZWxlbWVudFswXS5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnbWFnZWxsYW4nKTtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuJHRhcmdldHMgPSAkKCdbZGF0YS1tYWdlbGxhbi10YXJnZXRdJyk7XG4gICAgdGhpcy4kbGlua3MgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2EnKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgJ2RhdGEtcmVzaXplJzogaWQsXG4gICAgICAnZGF0YS1zY3JvbGwnOiBpZCxcbiAgICAgICdpZCc6IGlkXG4gICAgfSk7XG4gICAgdGhpcy4kYWN0aXZlID0gJCgpO1xuICAgIHRoaXMuc2Nyb2xsUG9zID0gcGFyc2VJbnQod2luZG93LnBhZ2VZT2Zmc2V0LCAxMCk7XG5cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGFuIGFycmF5IG9mIHBpeGVsIHZhbHVlcyB0aGF0IGFyZSB0aGUgZGVtYXJjYXRpb24gbGluZXMgYmV0d2VlbiBsb2NhdGlvbnMgb24gdGhlIHBhZ2UuXG4gICAqIENhbiBiZSBpbnZva2VkIGlmIG5ldyBlbGVtZW50cyBhcmUgYWRkZWQgb3IgdGhlIHNpemUgb2YgYSBsb2NhdGlvbiBjaGFuZ2VzLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIGNhbGNQb2ludHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgYm9keSA9IGRvY3VtZW50LmJvZHksXG4gICAgICAgIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICB0aGlzLnBvaW50cyA9IFtdO1xuICAgIHRoaXMud2luSGVpZ2h0ID0gTWF0aC5yb3VuZChNYXRoLm1heCh3aW5kb3cuaW5uZXJIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0KSk7XG4gICAgdGhpcy5kb2NIZWlnaHQgPSBNYXRoLnJvdW5kKE1hdGgubWF4KGJvZHkuc2Nyb2xsSGVpZ2h0LCBib2R5Lm9mZnNldEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGh0bWwuc2Nyb2xsSGVpZ2h0LCBodG1sLm9mZnNldEhlaWdodCkpO1xuXG4gICAgdGhpcy4kdGFyZ2V0cy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJHRhciA9ICQodGhpcyksXG4gICAgICAgICAgcHQgPSBNYXRoLnJvdW5kKCR0YXIub2Zmc2V0KCkudG9wIC0gX3RoaXMub3B0aW9ucy50aHJlc2hvbGQpO1xuICAgICAgJHRhci50YXJnZXRQb2ludCA9IHB0O1xuICAgICAgX3RoaXMucG9pbnRzLnB1c2gocHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGV2ZW50cyBmb3IgTWFnZWxsYW4uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgICRib2R5ID0gJCgnaHRtbCwgYm9keScpLFxuICAgICAgICBvcHRzID0ge1xuICAgICAgICAgIGR1cmF0aW9uOiBfdGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgICAgIGVhc2luZzogICBfdGhpcy5vcHRpb25zLmFuaW1hdGlvbkVhc2luZ1xuICAgICAgICB9O1xuICAgICQod2luZG93KS5vbmUoJ2xvYWQnLCBmdW5jdGlvbigpe1xuICAgICAgaWYoX3RoaXMub3B0aW9ucy5kZWVwTGlua2luZyl7XG4gICAgICAgIGlmKGxvY2F0aW9uLmhhc2gpe1xuICAgICAgICAgIF90aGlzLnNjcm9sbFRvTG9jKGxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBfdGhpcy5jYWxjUG9pbnRzKCk7XG4gICAgICBfdGhpcy5fdXBkYXRlQWN0aXZlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKHtcbiAgICAgICdyZXNpemVtZS56Zi50cmlnZ2VyJzogdGhpcy5yZWZsb3cuYmluZCh0aGlzKSxcbiAgICAgICdzY3JvbGxtZS56Zi50cmlnZ2VyJzogdGhpcy5fdXBkYXRlQWN0aXZlLmJpbmQodGhpcylcbiAgICB9KS5vbignY2xpY2suemYubWFnZWxsYW4nLCAnYVtocmVmXj1cIiNcIl0nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGFycml2YWwgICA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgIF90aGlzLnNjcm9sbFRvTG9jKGFycml2YWwpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9kZWVwTGlua1Njcm9sbCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmKF90aGlzLm9wdGlvbnMuZGVlcExpbmtpbmcpIHtcbiAgICAgICAgX3RoaXMuc2Nyb2xsVG9Mb2Mod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhpcy5fZGVlcExpbmtTY3JvbGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIHNjcm9sbCB0byBhIGdpdmVuIGxvY2F0aW9uIG9uIHRoZSBwYWdlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbG9jIC0gYSBwcm9wZXJseSBmb3JtYXR0ZWQgalF1ZXJ5IGlkIHNlbGVjdG9yLiBFeGFtcGxlOiAnI2ZvbydcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBzY3JvbGxUb0xvYyhsb2MpIHtcbiAgICB0aGlzLl9pblRyYW5zaXRpb24gPSB0cnVlO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIGFuaW1hdGlvbkVhc2luZzogdGhpcy5vcHRpb25zLmFuaW1hdGlvbkVhc2luZyxcbiAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICB0aHJlc2hvbGQ6IHRoaXMub3B0aW9ucy50aHJlc2hvbGQsXG4gICAgICBvZmZzZXQ6IHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB9O1xuXG4gICAgU21vb3RoU2Nyb2xsLnNjcm9sbFRvTG9jKGxvYywgb3B0aW9ucywgZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5faW5UcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICBfdGhpcy5fdXBkYXRlQWN0aXZlKCk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBuZWNlc3NhcnkgZnVuY3Rpb25zIHRvIHVwZGF0ZSBNYWdlbGxhbiB1cG9uIERPTSBjaGFuZ2VcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICByZWZsb3coKSB7XG4gICAgdGhpcy5jYWxjUG9pbnRzKCk7XG4gICAgdGhpcy5fdXBkYXRlQWN0aXZlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlzaWJpbGl0eSBvZiBhbiBhY3RpdmUgbG9jYXRpb24gbGluaywgYW5kIHVwZGF0ZXMgdGhlIHVybCBoYXNoIGZvciB0aGUgcGFnZSwgaWYgZGVlcExpbmtpbmcgZW5hYmxlZC5cbiAgICogQHByaXZhdGVcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBNYWdlbGxhbiN1cGRhdGVcbiAgICovXG4gIF91cGRhdGVBY3RpdmUoLypldnQsIGVsZW0sIHNjcm9sbFBvcyovKSB7XG4gICAgaWYodGhpcy5faW5UcmFuc2l0aW9uKSB7cmV0dXJuO31cbiAgICB2YXIgd2luUG9zID0gLypzY3JvbGxQb3MgfHwqLyBwYXJzZUludCh3aW5kb3cucGFnZVlPZmZzZXQsIDEwKSxcbiAgICAgICAgY3VySWR4O1xuXG4gICAgaWYod2luUG9zICsgdGhpcy53aW5IZWlnaHQgPT09IHRoaXMuZG9jSGVpZ2h0KXsgY3VySWR4ID0gdGhpcy5wb2ludHMubGVuZ3RoIC0gMTsgfVxuICAgIGVsc2UgaWYod2luUG9zIDwgdGhpcy5wb2ludHNbMF0peyBjdXJJZHggPSB1bmRlZmluZWQ7IH1cbiAgICBlbHNle1xuICAgICAgdmFyIGlzRG93biA9IHRoaXMuc2Nyb2xsUG9zIDwgd2luUG9zLFxuICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICBjdXJWaXNpYmxlID0gdGhpcy5wb2ludHMuZmlsdGVyKGZ1bmN0aW9uKHAsIGkpe1xuICAgICAgICAgICAgcmV0dXJuIGlzRG93biA/IHAgLSBfdGhpcy5vcHRpb25zLm9mZnNldCA8PSB3aW5Qb3MgOiBwIC0gX3RoaXMub3B0aW9ucy5vZmZzZXQgLSBfdGhpcy5vcHRpb25zLnRocmVzaG9sZCA8PSB3aW5Qb3M7XG4gICAgICAgICAgfSk7XG4gICAgICBjdXJJZHggPSBjdXJWaXNpYmxlLmxlbmd0aCA/IGN1clZpc2libGUubGVuZ3RoIC0gMSA6IDA7XG4gICAgfVxuXG4gICAgdGhpcy4kYWN0aXZlLnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5hY3RpdmVDbGFzcyk7XG4gICAgdGhpcy4kYWN0aXZlID0gdGhpcy4kbGlua3MuZmlsdGVyKCdbaHJlZj1cIiMnICsgdGhpcy4kdGFyZ2V0cy5lcShjdXJJZHgpLmRhdGEoJ21hZ2VsbGFuLXRhcmdldCcpICsgJ1wiXScpLmFkZENsYXNzKHRoaXMub3B0aW9ucy5hY3RpdmVDbGFzcyk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuZGVlcExpbmtpbmcpe1xuICAgICAgdmFyIGhhc2ggPSBcIlwiO1xuICAgICAgaWYoY3VySWR4ICE9IHVuZGVmaW5lZCl7XG4gICAgICAgIGhhc2ggPSB0aGlzLiRhY3RpdmVbMF0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICB9XG4gICAgICBpZihoYXNoICE9PSB3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICBpZih3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpe1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBoYXNoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zY3JvbGxQb3MgPSB3aW5Qb3M7XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiBtYWdlbGxhbiBpcyBmaW5pc2hlZCB1cGRhdGluZyB0byB0aGUgbmV3IGFjdGl2ZSBlbGVtZW50LlxuICAgICAqIEBldmVudCBNYWdlbGxhbiN1cGRhdGVcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3VwZGF0ZS56Zi5tYWdlbGxhbicsIFt0aGlzLiRhY3RpdmVdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBNYWdlbGxhbiBhbmQgcmVzZXRzIHRoZSB1cmwgb2YgdGhlIHdpbmRvdy5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXIgLnpmLm1hZ2VsbGFuJylcbiAgICAgICAgLmZpbmQoYC4ke3RoaXMub3B0aW9ucy5hY3RpdmVDbGFzc31gKS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmRlZXBMaW5raW5nKXtcbiAgICAgIHZhciBoYXNoID0gdGhpcy4kYWN0aXZlWzBdLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShoYXNoLCAnJyk7XG4gICAgfVxuICAgICQod2luZG93KS5vZmYoJ3BvcHN0YXRlJywgdGhpcy5fZGVlcExpbmtTY3JvbGwpO1xuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBzZXR0aW5ncyBmb3IgcGx1Z2luXG4gKi9cbk1hZ2VsbGFuLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUsIGluIG1zLCB0aGUgYW5pbWF0ZWQgc2Nyb2xsaW5nIHNob3VsZCB0YWtlIGJldHdlZW4gbG9jYXRpb25zLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwMFxuICAgKi9cbiAgYW5pbWF0aW9uRHVyYXRpb246IDUwMCxcbiAgLyoqXG4gICAqIEFuaW1hdGlvbiBzdHlsZSB0byB1c2Ugd2hlbiBzY3JvbGxpbmcgYmV0d2VlbiBsb2NhdGlvbnMuIENhbiBiZSBgJ3N3aW5nJ2Agb3IgYCdsaW5lYXInYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnbGluZWFyJ1xuICAgKiBAc2VlIHtAbGluayBodHRwczovL2FwaS5qcXVlcnkuY29tL2FuaW1hdGV8SnF1ZXJ5IGFuaW1hdGV9XG4gICAqL1xuICBhbmltYXRpb25FYXNpbmc6ICdsaW5lYXInLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyB0byB1c2UgYXMgYSBtYXJrZXIgZm9yIGxvY2F0aW9uIGNoYW5nZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTBcbiAgICovXG4gIHRocmVzaG9sZDogNTAsXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHRoZSBhY3RpdmUgbG9jYXRpb25zIGxpbmsgb24gdGhlIG1hZ2VsbGFuIGNvbnRhaW5lci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnaXMtYWN0aXZlJ1xuICAgKi9cbiAgYWN0aXZlQ2xhc3M6ICdpcy1hY3RpdmUnLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSBzY3JpcHQgdG8gbWFuaXB1bGF0ZSB0aGUgdXJsIG9mIHRoZSBjdXJyZW50IHBhZ2UsIGFuZCBpZiBzdXBwb3J0ZWQsIGFsdGVyIHRoZSBoaXN0b3J5LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVlcExpbmtpbmc6IGZhbHNlLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyB0byBvZmZzZXQgdGhlIHNjcm9sbCBvZiB0aGUgcGFnZSBvbiBpdGVtIGNsaWNrIGlmIHVzaW5nIGEgc3RpY2t5IG5hdiBiYXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgb2Zmc2V0OiAwXG59XG5cbmV4cG9ydCB7TWFnZWxsYW59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5tYWdlbGxhbi5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuaW1wb3J0IHsgdHJhbnNpdGlvbmVuZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5cbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuXG4vKipcbiAqIE9mZkNhbnZhcyBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ub2ZmY2FudmFzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqL1xuXG5jbGFzcyBPZmZDYW52YXMgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhbiBvZmYtY2FudmFzIHdyYXBwZXIuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBPZmZDYW52YXNcbiAgICogQGZpcmVzIE9mZkNhbnZhcyNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBpbml0aWFsaXplLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ09mZkNhbnZhcyc7IC8vIGllOSBiYWNrIGNvbXBhdFxuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBPZmZDYW52YXMuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNvbnRlbnRDbGFzc2VzID0geyBiYXNlOiBbXSwgcmV2ZWFsOiBbXSB9O1xuICAgIHRoaXMuJGxhc3RUcmlnZ2VyID0gJCgpO1xuICAgIHRoaXMuJHRyaWdnZXJzID0gJCgpO1xuICAgIHRoaXMucG9zaXRpb24gPSAnbGVmdCc7XG4gICAgdGhpcy4kY29udGVudCA9ICQoKTtcbiAgICB0aGlzLm5lc3RlZCA9ICEhKHRoaXMub3B0aW9ucy5uZXN0ZWQpO1xuXG4gICAgLy8gRGVmaW5lcyB0aGUgQ1NTIHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3NlcyBvZiB0aGUgb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lci5cbiAgICAkKFsncHVzaCcsICdvdmVybGFwJ10pLmVhY2goKGluZGV4LCB2YWwpID0+IHtcbiAgICAgIHRoaXMuY29udGVudENsYXNzZXMuYmFzZS5wdXNoKCdoYXMtdHJhbnNpdGlvbi0nK3ZhbCk7XG4gICAgfSk7XG4gICAgJChbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc2VzLmJhc2UucHVzaCgnaGFzLXBvc2l0aW9uLScrdmFsKTtcbiAgICAgIHRoaXMuY29udGVudENsYXNzZXMucmV2ZWFsLnB1c2goJ2hhcy1yZXZlYWwtJyt2YWwpO1xuICAgIH0pO1xuXG4gICAgLy8gVHJpZ2dlcnMgaW5pdCBpcyBpZGVtcG90ZW50LCBqdXN0IG5lZWQgdG8gbWFrZSBzdXJlIGl0IGlzIGluaXRpYWxpemVkXG4gICAgVHJpZ2dlcnMuaW5pdCgkKTtcbiAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignT2ZmQ2FudmFzJywge1xuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZSdcbiAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBvZmYtY2FudmFzIHdyYXBwZXIgYnkgYWRkaW5nIHRoZSBleGl0IG92ZXJsYXkgKGlmIG5lZWRlZCkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIGlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAvLyBGaW5kIG9mZi1jYW52YXMgY29udGVudCwgZWl0aGVyIGJ5IElEIChpZiBzcGVjaWZpZWQpLCBieSBzaWJsaW5ncyBvciBieSBjbG9zZXN0IHNlbGVjdG9yIChmYWxsYmFjaylcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRJZCkge1xuICAgICAgdGhpcy4kY29udGVudCA9ICQoJyMnK3RoaXMub3B0aW9ucy5jb250ZW50SWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmxlbmd0aCkge1xuICAgICAgdGhpcy4kY29udGVudCA9IHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5maXJzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gdGhpcy4kZWxlbWVudC5jbG9zZXN0KCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuZmlyc3QoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5jb250ZW50SWQpIHtcbiAgICAgIC8vIEFzc3VtZSB0aGF0IHRoZSBvZmYtY2FudmFzIGVsZW1lbnQgaXMgbmVzdGVkIGlmIGl0IGlzbid0IGEgc2libGluZyBvZiB0aGUgY29udGVudFxuICAgICAgdGhpcy5uZXN0ZWQgPSB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykubGVuZ3RoID09PSAwO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY29udGVudElkICYmIHRoaXMub3B0aW9ucy5uZXN0ZWQgPT09IG51bGwpIHtcbiAgICAgIC8vIFdhcm5pbmcgaWYgdXNpbmcgY29udGVudCBJRCB3aXRob3V0IHNldHRpbmcgdGhlIG5lc3RlZCBvcHRpb25cbiAgICAgIC8vIE9uY2UgdGhlIGVsZW1lbnQgaXMgbmVzdGVkIGl0IGlzIHJlcXVpcmVkIHRvIHdvcmsgcHJvcGVybHkgaW4gdGhpcyBjYXNlXG4gICAgICBjb25zb2xlLndhcm4oJ1JlbWVtYmVyIHRvIHVzZSB0aGUgbmVzdGVkIG9wdGlvbiBpZiB1c2luZyB0aGUgY29udGVudCBJRCBvcHRpb24hJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubmVzdGVkID09PSB0cnVlKSB7XG4gICAgICAvLyBGb3JjZSB0cmFuc2l0aW9uIG92ZXJsYXAgaWYgbmVzdGVkXG4gICAgICB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiA9ICdvdmVybGFwJztcbiAgICAgIC8vIFJlbW92ZSBhcHByb3ByaWF0ZSBjbGFzc2VzIGlmIGFscmVhZHkgYXNzaWduZWQgaW4gbWFya3VwXG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy10cmFuc2l0aW9uLXB1c2gnKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKGBpcy10cmFuc2l0aW9uLSR7dGhpcy5vcHRpb25zLnRyYW5zaXRpb259IGlzLWNsb3NlZGApO1xuXG4gICAgLy8gRmluZCB0cmlnZ2VycyB0aGF0IGFmZmVjdCB0aGlzIGVsZW1lbnQgYW5kIGFkZCBhcmlhLWV4cGFuZGVkIHRvIHRoZW1cbiAgICB0aGlzLiR0cmlnZ2VycyA9ICQoZG9jdW1lbnQpXG4gICAgICAuZmluZCgnW2RhdGEtb3Blbj1cIicraWQrJ1wiXSwgW2RhdGEtY2xvc2U9XCInK2lkKydcIl0sIFtkYXRhLXRvZ2dsZT1cIicraWQrJ1wiXScpXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gICAgICAuYXR0cignYXJpYS1jb250cm9scycsIGlkKTtcblxuICAgIC8vIEdldCBwb3NpdGlvbiBieSBjaGVja2luZyBmb3IgcmVsYXRlZCBDU1MgY2xhc3NcbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy4kZWxlbWVudC5pcygnLnBvc2l0aW9uLWxlZnQsIC5wb3NpdGlvbi10b3AsIC5wb3NpdGlvbi1yaWdodCwgLnBvc2l0aW9uLWJvdHRvbScpID8gdGhpcy4kZWxlbWVudC5hdHRyKCdjbGFzcycpLm1hdGNoKC9wb3NpdGlvblxcLShsZWZ0fHRvcHxyaWdodHxib3R0b20pLylbMV0gOiB0aGlzLnBvc2l0aW9uO1xuXG4gICAgLy8gQWRkIGFuIG92ZXJsYXkgb3ZlciB0aGUgY29udGVudCBpZiBuZWNlc3NhcnlcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdmFyIG92ZXJsYXlQb3NpdGlvbiA9ICQodGhpcy4kZWxlbWVudCkuY3NzKFwicG9zaXRpb25cIikgPT09ICdmaXhlZCcgPyAnaXMtb3ZlcmxheS1maXhlZCcgOiAnaXMtb3ZlcmxheS1hYnNvbHV0ZSc7XG4gICAgICBvdmVybGF5LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnanMtb2ZmLWNhbnZhcy1vdmVybGF5ICcgKyBvdmVybGF5UG9zaXRpb24pO1xuICAgICAgdGhpcy4kb3ZlcmxheSA9ICQob3ZlcmxheSk7XG4gICAgICBpZihvdmVybGF5UG9zaXRpb24gPT09ICdpcy1vdmVybGF5LWZpeGVkJykge1xuICAgICAgICAkKHRoaXMuJG92ZXJsYXkpLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kY29udGVudC5hcHBlbmQodGhpcy4kb3ZlcmxheSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zLmlzUmV2ZWFsZWQgPSB0aGlzLm9wdGlvbnMuaXNSZXZlYWxlZCB8fCBuZXcgUmVnRXhwKHRoaXMub3B0aW9ucy5yZXZlYWxDbGFzcywgJ2cnKS50ZXN0KHRoaXMuJGVsZW1lbnRbMF0uY2xhc3NOYW1lKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNSZXZlYWxlZCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJldmVhbE9uID0gdGhpcy5vcHRpb25zLnJldmVhbE9uIHx8IHRoaXMuJGVsZW1lbnRbMF0uY2xhc3NOYW1lLm1hdGNoKC8ocmV2ZWFsLWZvci1tZWRpdW18cmV2ZWFsLWZvci1sYXJnZSkvZylbMF0uc3BsaXQoJy0nKVsyXTtcbiAgICAgIHRoaXMuX3NldE1RQ2hlY2tlcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lKTtcbiAgICB9XG5cbiAgICAvLyBJbml0YWxseSByZW1vdmUgYWxsIHRyYW5zaXRpb24vcG9zaXRpb24gQ1NTIGNsYXNzZXMgZnJvbSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgIHRoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyB0byB0aGUgb2ZmLWNhbnZhcyB3cmFwcGVyIGFuZCB0aGUgZXhpdCBvdmVybGF5LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyIC56Zi5vZmZjYW52YXMnKS5vbih7XG4gICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAnY2xvc2UuemYudHJpZ2dlcic6IHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcbiAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcyksXG4gICAgICAna2V5ZG93bi56Zi5vZmZjYW52YXMnOiB0aGlzLl9oYW5kbGVLZXlib2FyZC5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA9PT0gdHJ1ZSkge1xuICAgICAgdmFyICR0YXJnZXQgPSB0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPyB0aGlzLiRvdmVybGF5IDogdGhpcy4kY29udGVudDtcbiAgICAgICR0YXJnZXQub24oeydjbGljay56Zi5vZmZjYW52YXMnOiB0aGlzLmNsb3NlLmJpbmQodGhpcyl9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBldmVudCBsaXN0ZW5lciBmb3IgZWxlbWVudHMgdGhhdCB3aWxsIHJldmVhbCBhdCBjZXJ0YWluIGJyZWFrcG9pbnRzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldE1RQ2hlY2tlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChNZWRpYVF1ZXJ5LmF0TGVhc3QoX3RoaXMub3B0aW9ucy5yZXZlYWxPbikpIHtcbiAgICAgICAgX3RoaXMucmV2ZWFsKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMucmV2ZWFsKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KS5vbmUoJ2xvYWQuemYub2ZmY2FudmFzJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoTWVkaWFRdWVyeS5hdExlYXN0KF90aGlzLm9wdGlvbnMucmV2ZWFsT24pKSB7XG4gICAgICAgIF90aGlzLnJldmVhbCh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBDU1MgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzc2VzIG9mIHRoZSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgKiBSZW1vdmluZyB0aGUgY2xhc3NlcyBpcyBpbXBvcnRhbnQgd2hlbiBhbm90aGVyIG9mZi1jYW52YXMgZ2V0cyBvcGVuZWQgdGhhdCB1c2VzIHRoZSBzYW1lIGNvbnRlbnQgY29udGFpbmVyLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGhhc1JldmVhbCAtIHRydWUgaWYgcmVsYXRlZCBvZmYtY2FudmFzIGVsZW1lbnQgaXMgcmV2ZWFsZWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVtb3ZlQ29udGVudENsYXNzZXMoaGFzUmV2ZWFsKSB7XG4gICAgaWYgKHR5cGVvZiBoYXNSZXZlYWwgIT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy4kY29udGVudC5yZW1vdmVDbGFzcyh0aGlzLmNvbnRlbnRDbGFzc2VzLmJhc2Uuam9pbignICcpKTtcbiAgICB9IGVsc2UgaWYgKGhhc1JldmVhbCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQ2xhc3MoYGhhcy1yZXZlYWwtJHt0aGlzLnBvc2l0aW9ufWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBDU1MgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzc2VzIG9mIHRoZSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLCBiYXNlZCBvbiB0aGUgb3BlbmluZyBvZmYtY2FudmFzIGVsZW1lbnQuXG4gICAqIEJlZm9yZWhhbmQgYW55IHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3MgZ2V0cyByZW1vdmVkLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGhhc1JldmVhbCAtIHRydWUgaWYgcmVsYXRlZCBvZmYtY2FudmFzIGVsZW1lbnQgaXMgcmV2ZWFsZWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkQ29udGVudENsYXNzZXMoaGFzUmV2ZWFsKSB7XG4gICAgdGhpcy5fcmVtb3ZlQ29udGVudENsYXNzZXMoaGFzUmV2ZWFsKTtcbiAgICBpZiAodHlwZW9mIGhhc1JldmVhbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLiRjb250ZW50LmFkZENsYXNzKGBoYXMtdHJhbnNpdGlvbi0ke3RoaXMub3B0aW9ucy50cmFuc2l0aW9ufSBoYXMtcG9zaXRpb24tJHt0aGlzLnBvc2l0aW9ufWApO1xuICAgIH0gZWxzZSBpZiAoaGFzUmV2ZWFsID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LmFkZENsYXNzKGBoYXMtcmV2ZWFsLSR7dGhpcy5wb3NpdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgcmV2ZWFsaW5nL2hpZGluZyB0aGUgb2ZmLWNhbnZhcyBhdCBicmVha3BvaW50cywgbm90IHRoZSBzYW1lIGFzIG9wZW4uXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNSZXZlYWxlZCAtIHRydWUgaWYgZWxlbWVudCBzaG91bGQgYmUgcmV2ZWFsZWQuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgcmV2ZWFsKGlzUmV2ZWFsZWQpIHtcbiAgICBpZiAoaXNSZXZlYWxlZCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgdGhpcy5pc1JldmVhbGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdvcGVuLnpmLnRyaWdnZXIgdG9nZ2xlLnpmLnRyaWdnZXInKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzUmV2ZWFsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ29wZW4uemYudHJpZ2dlciB0b2dnbGUuemYudHJpZ2dlcicpLm9uKHtcbiAgICAgICAgJ29wZW4uemYudHJpZ2dlcic6IHRoaXMub3Blbi5iaW5kKHRoaXMpLFxuICAgICAgICAndG9nZ2xlLnpmLnRyaWdnZXInOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgIH1cbiAgICB0aGlzLl9hZGRDb250ZW50Q2xhc3Nlcyhpc1JldmVhbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyBzY3JvbGxpbmcgb2YgdGhlIGJvZHkgd2hlbiBvZmZjYW52YXMgaXMgb3BlbiBvbiBtb2JpbGUgU2FmYXJpIGFuZCBvdGhlciB0cm91Ymxlc29tZSBicm93c2Vycy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zdG9wU2Nyb2xsaW5nKGV2ZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGFrZW4gYW5kIGFkYXB0ZWQgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2ODg5NDQ3L3ByZXZlbnQtZnVsbC1wYWdlLXNjcm9sbGluZy1pb3NcbiAgLy8gT25seSByZWFsbHkgd29ya3MgZm9yIHksIG5vdCBzdXJlIGhvdyB0byBleHRlbmQgdG8geCBvciBpZiB3ZSBuZWVkIHRvLlxuICBfcmVjb3JkU2Nyb2xsYWJsZShldmVudCkge1xuICAgIGxldCBlbGVtID0gdGhpczsgLy8gY2FsbGVkIGZyb20gZXZlbnQgaGFuZGxlciBjb250ZXh0IHdpdGggdGhpcyBhcyBlbGVtXG5cbiAgICAgLy8gSWYgdGhlIGVsZW1lbnQgaXMgc2Nyb2xsYWJsZSAoY29udGVudCBvdmVyZmxvd3MpLCB0aGVuLi4uXG4gICAgaWYgKGVsZW0uc2Nyb2xsSGVpZ2h0ICE9PSBlbGVtLmNsaWVudEhlaWdodCkge1xuICAgICAgLy8gSWYgd2UncmUgYXQgdGhlIHRvcCwgc2Nyb2xsIGRvd24gb25lIHBpeGVsIHRvIGFsbG93IHNjcm9sbGluZyB1cFxuICAgICAgaWYgKGVsZW0uc2Nyb2xsVG9wID09PSAwKSB7XG4gICAgICAgIGVsZW0uc2Nyb2xsVG9wID0gMTtcbiAgICAgIH1cbiAgICAgIC8vIElmIHdlJ3JlIGF0IHRoZSBib3R0b20sIHNjcm9sbCB1cCBvbmUgcGl4ZWwgdG8gYWxsb3cgc2Nyb2xsaW5nIGRvd25cbiAgICAgIGlmIChlbGVtLnNjcm9sbFRvcCA9PT0gZWxlbS5zY3JvbGxIZWlnaHQgLSBlbGVtLmNsaWVudEhlaWdodCkge1xuICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IGVsZW0uc2Nyb2xsSGVpZ2h0IC0gZWxlbS5jbGllbnRIZWlnaHQgLSAxO1xuICAgICAgfVxuICAgIH1cbiAgICBlbGVtLmFsbG93VXAgPSBlbGVtLnNjcm9sbFRvcCA+IDA7XG4gICAgZWxlbS5hbGxvd0Rvd24gPSBlbGVtLnNjcm9sbFRvcCA8IChlbGVtLnNjcm9sbEhlaWdodCAtIGVsZW0uY2xpZW50SGVpZ2h0KTtcbiAgICBlbGVtLmxhc3RZID0gZXZlbnQub3JpZ2luYWxFdmVudC5wYWdlWTtcbiAgfVxuXG4gIF9zdG9wU2Nyb2xsUHJvcGFnYXRpb24oZXZlbnQpIHtcbiAgICBsZXQgZWxlbSA9IHRoaXM7IC8vIGNhbGxlZCBmcm9tIGV2ZW50IGhhbmRsZXIgY29udGV4dCB3aXRoIHRoaXMgYXMgZWxlbVxuICAgIGxldCB1cCA9IGV2ZW50LnBhZ2VZIDwgZWxlbS5sYXN0WTtcbiAgICBsZXQgZG93biA9ICF1cDtcbiAgICBlbGVtLmxhc3RZID0gZXZlbnQucGFnZVk7XG5cbiAgICBpZigodXAgJiYgZWxlbS5hbGxvd1VwKSB8fCAoZG93biAmJiBlbGVtLmFsbG93RG93bikpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgb2ZmLWNhbnZhcyBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGxpc3RlbmVyLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gdHJpZ2dlciAtIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIG9mZi1jYW52YXMgdG8gb3Blbi5cbiAgICogQGZpcmVzIE9mZkNhbnZhcyNvcGVuZWRcbiAgICovXG4gIG9wZW4oZXZlbnQsIHRyaWdnZXIpIHtcbiAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpIHx8IHRoaXMuaXNSZXZlYWxlZCkgeyByZXR1cm47IH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIHRoaXMuJGxhc3RUcmlnZ2VyID0gdHJpZ2dlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvcmNlVG8gPT09ICd0b3AnKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZm9yY2VUbyA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lICYmIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uICE9PSAnb3ZlcmxhcCcpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIG9mZi1jYW52YXMgbWVudSBvcGVucy5cbiAgICAgKiBAZXZlbnQgT2ZmQ2FudmFzI29wZW5lZFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5yZW1vdmVDbGFzcygnaXMtY2xvc2VkJyk7XG5cbiAgICB0aGlzLiR0cmlnZ2Vycy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJylcbiAgICAgICAgLnRyaWdnZXIoJ29wZW5lZC56Zi5vZmZjYW52YXMnKTtcblxuICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoJ2lzLW9wZW4tJyArIHRoaXMucG9zaXRpb24pO1xuXG4gICAgLy8gSWYgYGNvbnRlbnRTY3JvbGxgIGlzIHNldCB0byBmYWxzZSwgYWRkIGNsYXNzIGFuZCBkaXNhYmxlIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudFNjcm9sbCA9PT0gZmFsc2UpIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtb2ZmLWNhbnZhcy1vcGVuJykub24oJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxpbmcpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigndG91Y2hzdGFydCcsIHRoaXMuX3JlY29yZFNjcm9sbGFibGUpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbFByb3BhZ2F0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgPT09IHRydWUgJiYgdGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdpcy1jbG9zYWJsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0ZvY3VzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uZSh0cmFuc2l0aW9uZW5kKHRoaXMuJGVsZW1lbnQpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgcmV0dXJuOyAvLyBleGl0IGlmIHByZW1hdHVyZWx5IGNsb3NlZFxuICAgICAgICB9XG4gICAgICAgIHZhciBjYW52YXNGb2N1cyA9IF90aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLWF1dG9mb2N1c10nKTtcbiAgICAgICAgaWYgKGNhbnZhc0ZvY3VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FudmFzRm9jdXMuZXEoMCkuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLiRlbGVtZW50LmZpbmQoJ2EsIGJ1dHRvbicpLmVxKDApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhcEZvY3VzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICBLZXlib2FyZC50cmFwRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYWRkQ29udGVudENsYXNzZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG9mZi1jYW52YXMgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gb3B0aW9uYWwgY2IgdG8gZmlyZSBhZnRlciBjbG9zdXJlLlxuICAgKiBAZmlyZXMgT2ZmQ2FudmFzI2Nsb3NlZFxuICAgKi9cbiAgY2xvc2UoY2IpIHtcbiAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSB8fCB0aGlzLmlzUmV2ZWFsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiB0aGUgb2ZmLWNhbnZhcyBtZW51IG9wZW5zLlxuICAgICAgICogQGV2ZW50IE9mZkNhbnZhcyNjbG9zZWRcbiAgICAgICAqL1xuICAgICAgICAudHJpZ2dlcignY2xvc2VkLnpmLm9mZmNhbnZhcycpO1xuXG4gICAgdGhpcy4kY29udGVudC5yZW1vdmVDbGFzcygnaXMtb3Blbi1sZWZ0IGlzLW9wZW4tdG9wIGlzLW9wZW4tcmlnaHQgaXMtb3Blbi1ib3R0b20nKTtcblxuICAgIC8vIElmIGBjb250ZW50U2Nyb2xsYCBpcyBzZXQgdG8gZmFsc2UsIHJlbW92ZSBjbGFzcyBhbmQgcmUtZW5hYmxlIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudFNjcm9sbCA9PT0gZmFsc2UpIHtcbiAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtb2ZmLWNhbnZhcy1vcGVuJykub2ZmKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsaW5nKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCd0b3VjaHN0YXJ0JywgdGhpcy5fcmVjb3JkU2Nyb2xsYWJsZSk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbFByb3BhZ2F0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgPT09IHRydWUgJiYgdGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy1jbG9zYWJsZScpO1xuICAgIH1cblxuICAgIHRoaXMuJHRyaWdnZXJzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhcEZvY3VzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICBLZXlib2FyZC5yZWxlYXNlRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gTGlzdGVuIHRvIHRyYW5zaXRpb25FbmQgYW5kIGFkZCBjbGFzcyB3aGVuIGRvbmUuXG4gICAgdGhpcy4kZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZCh0aGlzLiRlbGVtZW50KSwgZnVuY3Rpb24oZSkge1xuICAgICAgX3RoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgICAgX3RoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgb2ZmLWNhbnZhcyBtZW51IG9wZW4gb3IgY2xvc2VkLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGxpc3RlbmVyLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gdHJpZ2dlciAtIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIG9mZi1jYW52YXMgdG8gb3Blbi5cbiAgICovXG4gIHRvZ2dsZShldmVudCwgdHJpZ2dlcikge1xuICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgIHRoaXMuY2xvc2UoZXZlbnQsIHRyaWdnZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMub3BlbihldmVudCwgdHJpZ2dlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5Ym9hcmQgaW5wdXQgd2hlbiBkZXRlY3RlZC4gV2hlbiB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkLCB0aGUgb2ZmLWNhbnZhcyBtZW51IGNsb3NlcywgYW5kIGZvY3VzIGlzIHJlc3RvcmVkIHRvIHRoZSBlbGVtZW50IHRoYXQgb3BlbmVkIHRoZSBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9oYW5kbGVLZXlib2FyZChlKSB7XG4gICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdPZmZDYW52YXMnLCB7XG4gICAgICBjbG9zZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuJGxhc3RUcmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIGhhbmRsZWQ6ICgpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBvZmZjYW52YXMgcGx1Z2luLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXIgLnpmLm9mZmNhbnZhcycpO1xuICAgIHRoaXMuJG92ZXJsYXkub2ZmKCcuemYub2ZmY2FudmFzJyk7XG4gIH1cbn1cblxuT2ZmQ2FudmFzLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQWxsb3cgdGhlIHVzZXIgdG8gY2xpY2sgb3V0c2lkZSBvZiB0aGUgbWVudSB0byBjbG9zZSBpdC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIG92ZXJsYXkgb24gdG9wIG9mIGBbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY29udGVudE92ZXJsYXk6IHRydWUsXG5cbiAgLyoqXG4gICAqIFRhcmdldCBhbiBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyIGJ5IElEIHRoYXQgbWF5IGJlIHBsYWNlZCBhbnl3aGVyZS4gSWYgbnVsbCB0aGUgY2xvc2VzdCBjb250ZW50IGNvbnRhaW5lciB3aWxsIGJlIHRha2VuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBjb250ZW50SWQ6IG51bGwsXG5cbiAgLyoqXG4gICAqIERlZmluZSB0aGUgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIG5lc3RlZCBpbiBhbiBvZmYtY2FudmFzIGNvbnRlbnQuIFRoaXMgaXMgcmVxdWlyZWQgd2hlbiB1c2luZyB0aGUgY29udGVudElkIG9wdGlvbiBmb3IgYSBuZXN0ZWQgZWxlbWVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgbmVzdGVkOiBudWxsLFxuXG4gIC8qKlxuICAgKiBFbmFibGUvZGlzYWJsZSBzY3JvbGxpbmcgb2YgdGhlIG1haW4gY29udGVudCB3aGVuIGFuIG9mZiBjYW52YXMgcGFuZWwgaXMgb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY29udGVudFNjcm9sbDogdHJ1ZSxcblxuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUgaW4gbXMgdGhlIG9wZW4gYW5kIGNsb3NlIHRyYW5zaXRpb24gcmVxdWlyZXMuIElmIG5vbmUgc2VsZWN0ZWQsIHB1bGxzIGZyb20gYm9keSBzdHlsZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICB0cmFuc2l0aW9uVGltZTogbnVsbCxcblxuICAvKipcbiAgICogVHlwZSBvZiB0cmFuc2l0aW9uIGZvciB0aGUgb2ZmY2FudmFzIG1lbnUuIE9wdGlvbnMgYXJlICdwdXNoJywgJ2RldGFjaGVkJyBvciAnc2xpZGUnLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0IHB1c2hcbiAgICovXG4gIHRyYW5zaXRpb246ICdwdXNoJyxcblxuICAvKipcbiAgICogRm9yY2UgdGhlIHBhZ2UgdG8gc2Nyb2xsIHRvIHRvcCBvciBib3R0b20gb24gb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgZm9yY2VUbzogbnVsbCxcblxuICAvKipcbiAgICogQWxsb3cgdGhlIG9mZmNhbnZhcyB0byByZW1haW4gb3BlbiBmb3IgY2VydGFpbiBicmVha3BvaW50cy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGlzUmV2ZWFsZWQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBCcmVha3BvaW50IGF0IHdoaWNoIHRvIHJldmVhbC4gSlMgd2lsbCB1c2UgYSBSZWdFeHAgdG8gdGFyZ2V0IHN0YW5kYXJkIGNsYXNzZXMsIGlmIGNoYW5naW5nIGNsYXNzbmFtZXMsIHBhc3MgeW91ciBjbGFzcyB3aXRoIHRoZSBgcmV2ZWFsQ2xhc3NgIG9wdGlvbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgcmV2ZWFsT246IG51bGwsXG5cbiAgLyoqXG4gICAqIEZvcmNlIGZvY3VzIHRvIHRoZSBvZmZjYW52YXMgb24gb3Blbi4gSWYgdHJ1ZSwgd2lsbCBmb2N1cyB0aGUgb3BlbmluZyB0cmlnZ2VyIG9uIGNsb3NlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhdXRvRm9jdXM6IHRydWUsXG5cbiAgLyoqXG4gICAqIENsYXNzIHVzZWQgdG8gZm9yY2UgYW4gb2ZmY2FudmFzIHRvIHJlbWFpbiBvcGVuLiBGb3VuZGF0aW9uIGRlZmF1bHRzIGZvciB0aGlzIGFyZSBgcmV2ZWFsLWZvci1sYXJnZWAgJiBgcmV2ZWFsLWZvci1tZWRpdW1gLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0IHJldmVhbC1mb3ItXG4gICAqIEB0b2RvIGltcHJvdmUgdGhlIHJlZ2V4IHRlc3RpbmcgZm9yIHRoaXMuXG4gICAqL1xuICByZXZlYWxDbGFzczogJ3JldmVhbC1mb3ItJyxcblxuICAvKipcbiAgICogVHJpZ2dlcnMgb3B0aW9uYWwgZm9jdXMgdHJhcHBpbmcgd2hlbiBvcGVuaW5nIGFuIG9mZmNhbnZhcy4gU2V0cyB0YWJpbmRleCBvZiBbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdIHRvIC0xIGZvciBhY2Nlc3NpYmlsaXR5IHB1cnBvc2VzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgdHJhcEZvY3VzOiBmYWxzZVxufVxuXG5leHBvcnQge09mZkNhbnZhc307XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLm9mZmNhbnZhcy5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuXG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICcuL2ZvdW5kYXRpb24uZHJvcGRvd25NZW51JztcbmltcG9ydCB7IERyaWxsZG93biB9IGZyb20gJy4vZm91bmRhdGlvbi5kcmlsbGRvd24nO1xuaW1wb3J0IHsgQWNjb3JkaW9uTWVudSB9IGZyb20gJy4vZm91bmRhdGlvbi5hY2NvcmRpb25NZW51JztcblxubGV0IE1lbnVQbHVnaW5zID0ge1xuICBkcm9wZG93bjoge1xuICAgIGNzc0NsYXNzOiAnZHJvcGRvd24nLFxuICAgIHBsdWdpbjogRHJvcGRvd25NZW51XG4gIH0sXG4gZHJpbGxkb3duOiB7XG4gICAgY3NzQ2xhc3M6ICdkcmlsbGRvd24nLFxuICAgIHBsdWdpbjogRHJpbGxkb3duXG4gIH0sXG4gIGFjY29yZGlvbjoge1xuICAgIGNzc0NsYXNzOiAnYWNjb3JkaW9uLW1lbnUnLFxuICAgIHBsdWdpbjogQWNjb3JkaW9uTWVudVxuICB9XG59O1xuXG4gIC8vIGltcG9ydCBcImZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qc1wiO1xuXG5cbi8qKlxuICogUmVzcG9uc2l2ZU1lbnUgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnJlc3BvbnNpdmVNZW51XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqL1xuXG5jbGFzcyBSZXNwb25zaXZlTWVudSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgcmVzcG9uc2l2ZSBtZW51LlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgUmVzcG9uc2l2ZU1lbnVcbiAgICogQGZpcmVzIFJlc3BvbnNpdmVNZW51I2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhIGRyb3Bkb3duIG1lbnUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgdGhpcy5ydWxlcyA9IHRoaXMuJGVsZW1lbnQuZGF0YSgncmVzcG9uc2l2ZS1tZW51Jyk7XG4gICAgdGhpcy5jdXJyZW50TXEgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFBsdWdpbiA9IG51bGw7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnUmVzcG9uc2l2ZU1lbnUnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgTWVudSBieSBwYXJzaW5nIHRoZSBjbGFzc2VzIGZyb20gdGhlICdkYXRhLVJlc3BvbnNpdmVNZW51JyBhdHRyaWJ1dGUgb24gdGhlIGVsZW1lbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG5cbiAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG4gICAgLy8gVGhlIGZpcnN0IHRpbWUgYW4gSW50ZXJjaGFuZ2UgcGx1Z2luIGlzIGluaXRpYWxpemVkLCB0aGlzLnJ1bGVzIGlzIGNvbnZlcnRlZCBmcm9tIGEgc3RyaW5nIG9mIFwiY2xhc3Nlc1wiIHRvIGFuIG9iamVjdCBvZiBydWxlc1xuICAgIGlmICh0eXBlb2YgdGhpcy5ydWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBydWxlc1RyZWUgPSB7fTtcblxuICAgICAgLy8gUGFyc2UgcnVsZXMgZnJvbSBcImNsYXNzZXNcIiBwdWxsZWQgZnJvbSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgbGV0IHJ1bGVzID0gdGhpcy5ydWxlcy5zcGxpdCgnICcpO1xuXG4gICAgICAvLyBJdGVyYXRlIHRocm91Z2ggZXZlcnkgcnVsZSBmb3VuZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgcnVsZSA9IHJ1bGVzW2ldLnNwbGl0KCctJyk7XG4gICAgICAgIGxldCBydWxlU2l6ZSA9IHJ1bGUubGVuZ3RoID4gMSA/IHJ1bGVbMF0gOiAnc21hbGwnO1xuICAgICAgICBsZXQgcnVsZVBsdWdpbiA9IHJ1bGUubGVuZ3RoID4gMSA/IHJ1bGVbMV0gOiBydWxlWzBdO1xuXG4gICAgICAgIGlmIChNZW51UGx1Z2luc1tydWxlUGx1Z2luXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJ1bGVzVHJlZVtydWxlU2l6ZV0gPSBNZW51UGx1Z2luc1tydWxlUGx1Z2luXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJ1bGVzID0gcnVsZXNUcmVlO1xuICAgIH1cblxuICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KHRoaXMucnVsZXMpKSB7XG4gICAgICB0aGlzLl9jaGVja01lZGlhUXVlcmllcygpO1xuICAgIH1cbiAgICAvLyBBZGQgZGF0YS1tdXRhdGUgc2luY2UgY2hpbGRyZW4gbWF5IG5lZWQgaXQuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLW11dGF0ZScsICh0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtbXV0YXRlJykgfHwgR2V0WW9EaWdpdHMoNiwgJ3Jlc3BvbnNpdmUtbWVudScpKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgZXZlbnRzIGZvciB0aGUgTWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAkKHdpbmRvdykub24oJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuX2NoZWNrTWVkaWFRdWVyaWVzKCk7XG4gICAgfSk7XG4gICAgLy8gJCh3aW5kb3cpLm9uKCdyZXNpemUuemYuUmVzcG9uc2l2ZU1lbnUnLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgIF90aGlzLl9jaGVja01lZGlhUXVlcmllcygpO1xuICAgIC8vIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgY3VycmVudCBzY3JlZW4gd2lkdGggYWdhaW5zdCBhdmFpbGFibGUgbWVkaWEgcXVlcmllcy4gSWYgdGhlIG1lZGlhIHF1ZXJ5IGhhcyBjaGFuZ2VkLCBhbmQgdGhlIHBsdWdpbiBuZWVkZWQgaGFzIGNoYW5nZWQsIHRoZSBwbHVnaW5zIHdpbGwgc3dhcCBvdXQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NoZWNrTWVkaWFRdWVyaWVzKCkge1xuICAgIHZhciBtYXRjaGVkTXEsIF90aGlzID0gdGhpcztcbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBydWxlIGFuZCBmaW5kIHRoZSBsYXN0IG1hdGNoaW5nIHJ1bGVcbiAgICAkLmVhY2godGhpcy5ydWxlcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAoTWVkaWFRdWVyeS5hdExlYXN0KGtleSkpIHtcbiAgICAgICAgbWF0Y2hlZE1xID0ga2V5O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gTm8gbWF0Y2g/IE5vIGRpY2VcbiAgICBpZiAoIW1hdGNoZWRNcSkgcmV0dXJuO1xuXG4gICAgLy8gUGx1Z2luIGFscmVhZHkgaW5pdGlhbGl6ZWQ/IFdlIGdvb2RcbiAgICBpZiAodGhpcy5jdXJyZW50UGx1Z2luIGluc3RhbmNlb2YgdGhpcy5ydWxlc1ttYXRjaGVkTXFdLnBsdWdpbikgcmV0dXJuO1xuXG4gICAgLy8gUmVtb3ZlIGV4aXN0aW5nIHBsdWdpbi1zcGVjaWZpYyBDU1MgY2xhc3Nlc1xuICAgICQuZWFjaChNZW51UGx1Z2lucywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgX3RoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3ModmFsdWUuY3NzQ2xhc3MpO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIHRoZSBDU1MgY2xhc3MgZm9yIHRoZSBuZXcgcGx1Z2luXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLnJ1bGVzW21hdGNoZWRNcV0uY3NzQ2xhc3MpO1xuXG4gICAgLy8gQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBuZXcgcGx1Z2luXG4gICAgaWYgKHRoaXMuY3VycmVudFBsdWdpbikgdGhpcy5jdXJyZW50UGx1Z2luLmRlc3Ryb3koKTtcbiAgICB0aGlzLmN1cnJlbnRQbHVnaW4gPSBuZXcgdGhpcy5ydWxlc1ttYXRjaGVkTXFdLnBsdWdpbih0aGlzLiRlbGVtZW50LCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGluc3RhbmNlIG9mIHRoZSBjdXJyZW50IHBsdWdpbiBvbiB0aGlzIGVsZW1lbnQsIGFzIHdlbGwgYXMgdGhlIHdpbmRvdyByZXNpemUgaGFuZGxlciB0aGF0IHN3aXRjaGVzIHRoZSBwbHVnaW5zIG91dC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLmN1cnJlbnRQbHVnaW4uZGVzdHJveSgpO1xuICAgICQod2luZG93KS5vZmYoJy56Zi5SZXNwb25zaXZlTWVudScpO1xuICB9XG59XG5cblJlc3BvbnNpdmVNZW51LmRlZmF1bHRzID0ge307XG5cbmV4cG9ydCB7UmVzcG9uc2l2ZU1lbnV9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlTWVudS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgTmVzdCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm5lc3QnO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMsIHRyYW5zaXRpb25lbmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IEJveCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmJveCc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcblxuLyoqXG4gKiBEcmlsbGRvd24gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLmRyaWxsZG93blxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5uZXN0XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmJveFxuICovXG5cbmNsYXNzIERyaWxsZG93biBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgZHJpbGxkb3duIG1lbnUuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBEcmlsbGRvd25cbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhbiBhY2NvcmRpb24gbWVudS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRHJpbGxkb3duLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnRHJpbGxkb3duJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignRHJpbGxkb3duJywge1xuICAgICAgJ0VOVEVSJzogJ29wZW4nLFxuICAgICAgJ1NQQUNFJzogJ29wZW4nLFxuICAgICAgJ0FSUk9XX1JJR0hUJzogJ25leHQnLFxuICAgICAgJ0FSUk9XX1VQJzogJ3VwJyxcbiAgICAgICdBUlJPV19ET1dOJzogJ2Rvd24nLFxuICAgICAgJ0FSUk9XX0xFRlQnOiAncHJldmlvdXMnLFxuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZScsXG4gICAgICAnVEFCJzogJ2Rvd24nLFxuICAgICAgJ1NISUZUX1RBQic6ICd1cCdcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZHJpbGxkb3duIGJ5IGNyZWF0aW5nIGpRdWVyeSBjb2xsZWN0aW9ucyBvZiBlbGVtZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgTmVzdC5GZWF0aGVyKHRoaXMuJGVsZW1lbnQsICdkcmlsbGRvd24nKTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5hdXRvQXBwbHlDbGFzcykge1xuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnZHJpbGxkb3duJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICdyb2xlJzogJ3RyZWUnLFxuICAgICAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogZmFsc2VcbiAgICB9KTtcbiAgICB0aGlzLiRzdWJtZW51QW5jaG9ycyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnbGkuaXMtZHJpbGxkb3duLXN1Ym1lbnUtcGFyZW50JykuY2hpbGRyZW4oJ2EnKTtcbiAgICB0aGlzLiRzdWJtZW51cyA9IHRoaXMuJHN1Ym1lbnVBbmNob3JzLnBhcmVudCgnbGknKS5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKS5hdHRyKCdyb2xlJywgJ2dyb3VwJyk7XG4gICAgdGhpcy4kbWVudUl0ZW1zID0gdGhpcy4kZWxlbWVudC5maW5kKCdsaScpLm5vdCgnLmpzLWRyaWxsZG93bi1iYWNrJykuYXR0cigncm9sZScsICd0cmVlaXRlbScpLmZpbmQoJ2EnKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtbXV0YXRlJywgKHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1kcmlsbGRvd24nKSB8fCBHZXRZb0RpZ2l0cyg2LCAnZHJpbGxkb3duJykpKTtcblxuICAgIHRoaXMuX3ByZXBhcmVNZW51KCk7XG4gICAgdGhpcy5fcmVnaXN0ZXJFdmVudHMoKTtcblxuICAgIHRoaXMuX2tleWJvYXJkRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogcHJlcGFyZXMgZHJpbGxkb3duIG1lbnUgYnkgc2V0dGluZyBhdHRyaWJ1dGVzIHRvIGxpbmtzIGFuZCBlbGVtZW50c1xuICAgKiBzZXRzIGEgbWluIGhlaWdodCB0byBwcmV2ZW50IGNvbnRlbnQganVtcGluZ1xuICAgKiB3cmFwcyB0aGUgZWxlbWVudCBpZiBub3QgYWxyZWFkeSB3cmFwcGVkXG4gICAqIEBwcml2YXRlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX3ByZXBhcmVNZW51KCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLy8gaWYoIXRoaXMub3B0aW9ucy5ob2xkT3Blbil7XG4gICAgLy8gICB0aGlzLl9tZW51TGlua0V2ZW50cygpO1xuICAgIC8vIH1cbiAgICB0aGlzLiRzdWJtZW51QW5jaG9ycy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJGxpbmsgPSAkKHRoaXMpO1xuICAgICAgdmFyICRzdWIgPSAkbGluay5wYXJlbnQoKTtcbiAgICAgIGlmKF90aGlzLm9wdGlvbnMucGFyZW50TGluayl7XG4gICAgICAgICRsaW5rLmNsb25lKCkucHJlcGVuZFRvKCRzdWIuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykpLndyYXAoJzxsaSBjbGFzcz1cImlzLXN1Ym1lbnUtcGFyZW50LWl0ZW0gaXMtc3VibWVudS1pdGVtIGlzLWRyaWxsZG93bi1zdWJtZW51LWl0ZW1cIiByb2xlPVwibWVudWl0ZW1cIj48L2xpPicpO1xuICAgICAgfVxuICAgICAgJGxpbmsuZGF0YSgnc2F2ZWRIcmVmJywgJGxpbmsuYXR0cignaHJlZicpKS5yZW1vdmVBdHRyKCdocmVmJykuYXR0cigndGFiaW5kZXgnLCAwKTtcbiAgICAgICRsaW5rLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpXG4gICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogdHJ1ZSxcbiAgICAgICAgICAgICd0YWJpbmRleCc6IDAsXG4gICAgICAgICAgICAncm9sZSc6ICdncm91cCdcbiAgICAgICAgICB9KTtcbiAgICAgIF90aGlzLl9ldmVudHMoJGxpbmspO1xuICAgIH0pO1xuICAgIHRoaXMuJHN1Ym1lbnVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkbWVudSA9ICQodGhpcyksXG4gICAgICAgICAgJGJhY2sgPSAkbWVudS5maW5kKCcuanMtZHJpbGxkb3duLWJhY2snKTtcbiAgICAgIGlmKCEkYmFjay5sZW5ndGgpe1xuICAgICAgICBzd2l0Y2ggKF90aGlzLm9wdGlvbnMuYmFja0J1dHRvblBvc2l0aW9uKSB7XG4gICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgICAgJG1lbnUuYXBwZW5kKF90aGlzLm9wdGlvbnMuYmFja0J1dHRvbik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgICAgICAkbWVudS5wcmVwZW5kKF90aGlzLm9wdGlvbnMuYmFja0J1dHRvbik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuc3VwcG9ydGVkIGJhY2tCdXR0b25Qb3NpdGlvbiB2YWx1ZSAnXCIgKyBfdGhpcy5vcHRpb25zLmJhY2tCdXR0b25Qb3NpdGlvbiArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgX3RoaXMuX2JhY2soJG1lbnUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kc3VibWVudXMuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgIGlmKCF0aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkge1xuICAgICAgdGhpcy4kc3VibWVudXMuYWRkQ2xhc3MoJ2RyaWxsZG93bi1zdWJtZW51LWNvdmVyLXByZXZpb3VzJyk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgd3JhcHBlciBvbiBlbGVtZW50IGlmIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgaWYoIXRoaXMuJGVsZW1lbnQucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLWRyaWxsZG93bicpKXtcbiAgICAgIHRoaXMuJHdyYXBwZXIgPSAkKHRoaXMub3B0aW9ucy53cmFwcGVyKS5hZGRDbGFzcygnaXMtZHJpbGxkb3duJyk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuYW5pbWF0ZUhlaWdodCkgdGhpcy4kd3JhcHBlci5hZGRDbGFzcygnYW5pbWF0ZS1oZWlnaHQnKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQud3JhcCh0aGlzLiR3cmFwcGVyKTtcbiAgICB9XG4gICAgLy8gc2V0IHdyYXBwZXJcbiAgICB0aGlzLiR3cmFwcGVyID0gdGhpcy4kZWxlbWVudC5wYXJlbnQoKTtcbiAgICB0aGlzLiR3cmFwcGVyLmNzcyh0aGlzLl9nZXRNYXhEaW1zKCkpO1xuICB9XG5cbiAgX3Jlc2l6ZSgpIHtcbiAgICB0aGlzLiR3cmFwcGVyLmNzcyh7J21heC13aWR0aCc6ICdub25lJywgJ21pbi1oZWlnaHQnOiAnbm9uZSd9KTtcbiAgICAvLyBfZ2V0TWF4RGltcyBoYXMgc2lkZSBlZmZlY3RzIChib28pIGJ1dCBjYWxsaW5nIGl0IHNob3VsZCB1cGRhdGUgYWxsIG90aGVyIG5lY2Vzc2FyeSBoZWlnaHRzICYgd2lkdGhzXG4gICAgdGhpcy4kd3JhcHBlci5jc3ModGhpcy5fZ2V0TWF4RGltcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIHRvIGVsZW1lbnRzIGluIHRoZSBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gdGhlIGN1cnJlbnQgbWVudSBpdGVtIHRvIGFkZCBoYW5kbGVycyB0by5cbiAgICovXG4gIF9ldmVudHMoJGVsZW0pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgJGVsZW0ub2ZmKCdjbGljay56Zi5kcmlsbGRvd24nKVxuICAgIC5vbignY2xpY2suemYuZHJpbGxkb3duJywgZnVuY3Rpb24oZSl7XG4gICAgICBpZigkKGUudGFyZ2V0KS5wYXJlbnRzVW50aWwoJ3VsJywgJ2xpJykuaGFzQ2xhc3MoJ2lzLWRyaWxsZG93bi1zdWJtZW51LXBhcmVudCcpKXtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZihlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkKXtcbiAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gfVxuICAgICAgX3RoaXMuX3Nob3coJGVsZW0ucGFyZW50KCdsaScpKTtcblxuICAgICAgaWYoX3RoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2spe1xuICAgICAgICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgICRib2R5Lm9mZignLnpmLmRyaWxsZG93bicpLm9uKCdjbGljay56Zi5kcmlsbGRvd24nLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IF90aGlzLiRlbGVtZW50WzBdIHx8ICQuY29udGFpbnMoX3RoaXMuJGVsZW1lbnRbMF0sIGUudGFyZ2V0KSkgeyByZXR1cm47IH1cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgX3RoaXMuX2hpZGVBbGwoKTtcbiAgICAgICAgICAkYm9keS5vZmYoJy56Zi5kcmlsbGRvd24nKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyB0byB0aGUgbWVudSBlbGVtZW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZWdpc3RlckV2ZW50cygpIHtcbiAgICBpZih0aGlzLm9wdGlvbnMuc2Nyb2xsVG9wKXtcbiAgICAgIHRoaXMuX2JpbmRIYW5kbGVyID0gdGhpcy5fc2Nyb2xsVG9wLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdvcGVuLnpmLmRyaWxsZG93biBoaWRlLnpmLmRyaWxsZG93biBjbG9zZWQuemYuZHJpbGxkb3duJyx0aGlzLl9iaW5kSGFuZGxlcik7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQub24oJ211dGF0ZW1lLnpmLnRyaWdnZXInLCB0aGlzLl9yZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHRvIFRvcCBvZiBFbGVtZW50IG9yIGRhdGEtc2Nyb2xsLXRvcC1lbGVtZW50XG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI3Njcm9sbG1lXG4gICAqL1xuICBfc2Nyb2xsVG9wKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyICRzY3JvbGxUb3BFbGVtZW50ID0gX3RoaXMub3B0aW9ucy5zY3JvbGxUb3BFbGVtZW50IT0nJz8kKF90aGlzLm9wdGlvbnMuc2Nyb2xsVG9wRWxlbWVudCk6X3RoaXMuJGVsZW1lbnQsXG4gICAgICAgIHNjcm9sbFBvcyA9IHBhcnNlSW50KCRzY3JvbGxUb3BFbGVtZW50Lm9mZnNldCgpLnRvcCtfdGhpcy5vcHRpb25zLnNjcm9sbFRvcE9mZnNldCwgMTApO1xuICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKHRydWUpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHNjcm9sbFBvcyB9LCBfdGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uLCBfdGhpcy5vcHRpb25zLmFuaW1hdGlvbkVhc2luZyxmdW5jdGlvbigpe1xuICAgICAgLyoqXG4gICAgICAgICogRmlyZXMgYWZ0ZXIgdGhlIG1lbnUgaGFzIHNjcm9sbGVkXG4gICAgICAgICogQGV2ZW50IERyaWxsZG93biNzY3JvbGxtZVxuICAgICAgICAqL1xuICAgICAgaWYodGhpcz09PSQoJ2h0bWwnKVswXSlfdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzY3JvbGxtZS56Zi5kcmlsbGRvd24nKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGtleWRvd24gZXZlbnQgbGlzdGVuZXIgdG8gYGxpYCdzIGluIHRoZSBtZW51LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2tleWJvYXJkRXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRtZW51SXRlbXMuYWRkKHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWRyaWxsZG93bi1iYWNrID4gYSwgLmlzLXN1Ym1lbnUtcGFyZW50LWl0ZW0gPiBhJykpLm9uKCdrZXlkb3duLnpmLmRyaWxsZG93bicsIGZ1bmN0aW9uKGUpe1xuICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgICAkZWxlbWVudHMgPSAkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLmNoaWxkcmVuKCdsaScpLmNoaWxkcmVuKCdhJyksXG4gICAgICAgICAgJHByZXZFbGVtZW50LFxuICAgICAgICAgICRuZXh0RWxlbWVudDtcblxuICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5tYXgoMCwgaS0xKSk7XG4gICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWluKGkrMSwgJGVsZW1lbnRzLmxlbmd0aC0xKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdEcmlsbGRvd24nLCB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkZWxlbWVudC5pcyhfdGhpcy4kc3VibWVudUFuY2hvcnMpKSB7XG4gICAgICAgICAgICBfdGhpcy5fc2hvdygkZWxlbWVudC5wYXJlbnQoJ2xpJykpO1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLm9uZSh0cmFuc2l0aW9uZW5kKCRlbGVtZW50KSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLmZpbmQoJ3VsIGxpIGEnKS5maWx0ZXIoX3RoaXMuJG1lbnVJdGVtcykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5faGlkZSgkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpKTtcbiAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLm9uZSh0cmFuc2l0aW9uZW5kKCRlbGVtZW50KSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykucGFyZW50KCdsaScpLmNoaWxkcmVuKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAvLyBEb24ndCB0YXAgZm9jdXMgb24gZmlyc3QgZWxlbWVudCBpbiByb290IHVsXG4gICAgICAgICAgcmV0dXJuICEkZWxlbWVudC5pcyhfdGhpcy4kZWxlbWVudC5maW5kKCc+IGxpOmZpcnN0LWNoaWxkID4gYScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgLy8gRG9uJ3QgdGFwIGZvY3VzIG9uIGxhc3QgZWxlbWVudCBpbiByb290IHVsXG4gICAgICAgICAgcmV0dXJuICEkZWxlbWVudC5pcyhfdGhpcy4kZWxlbWVudC5maW5kKCc+IGxpOmxhc3QtY2hpbGQgPiBhJykpO1xuICAgICAgICB9LFxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRG9uJ3QgY2xvc2Ugb24gZWxlbWVudCBpbiByb290IHVsXG4gICAgICAgICAgaWYgKCEkZWxlbWVudC5pcyhfdGhpcy4kZWxlbWVudC5maW5kKCc+IGxpID4gYScpKSkge1xuICAgICAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW1lbnQucGFyZW50KCkucGFyZW50KCkpO1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoJ2EnKS5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCEkZWxlbWVudC5pcyhfdGhpcy4kbWVudUl0ZW1zKSkgeyAvLyBub3QgbWVudSBpdGVtIG1lYW5zIGJhY2sgYnV0dG9uXG4gICAgICAgICAgICBfdGhpcy5faGlkZSgkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpKTtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykub25lKHRyYW5zaXRpb25lbmQoJGVsZW1lbnQpLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykucGFyZW50KCdsaScpLmNoaWxkcmVuKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmICgkZWxlbWVudC5pcyhfdGhpcy4kc3VibWVudUFuY2hvcnMpKSB7XG4gICAgICAgICAgICBfdGhpcy5fc2hvdygkZWxlbWVudC5wYXJlbnQoJ2xpJykpO1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLm9uZSh0cmFuc2l0aW9uZW5kKCRlbGVtZW50KSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLmZpbmQoJ3VsIGxpIGEnKS5maWx0ZXIoX3RoaXMuJG1lbnVJdGVtcykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZWQ6IGZ1bmN0aW9uKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pOyAvLyBlbmQga2V5Ym9hcmRBY2Nlc3NcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYWxsIG9wZW4gZWxlbWVudHMsIGFuZCByZXR1cm5zIHRvIHJvb3QgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcmlsbGRvd24jY2xvc2VkXG4gICAqL1xuICBfaGlkZUFsbCgpIHtcbiAgICB2YXIgJGVsZW0gPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pcy1kcmlsbGRvd24tc3VibWVudS5pcy1hY3RpdmUnKS5hZGRDbGFzcygnaXMtY2xvc2luZycpO1xuICAgIGlmKHRoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KSB0aGlzLiR3cmFwcGVyLmNzcyh7aGVpZ2h0OiRlbGVtLnBhcmVudCgpLmNsb3Nlc3QoJ3VsJykuZGF0YSgnY2FsY0hlaWdodCcpfSk7XG4gICAgJGVsZW0ub25lKHRyYW5zaXRpb25lbmQoJGVsZW0pLCBmdW5jdGlvbihlKXtcbiAgICAgICRlbGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUgaXMtY2xvc2luZycpO1xuICAgIH0pO1xuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgbWVudSBpcyBmdWxseSBjbG9zZWQuXG4gICAgICAgICAqIEBldmVudCBEcmlsbGRvd24jY2xvc2VkXG4gICAgICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2VkLnpmLmRyaWxsZG93bicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXIgZm9yIGVhY2ggYGJhY2tgIGJ1dHRvbiwgYW5kIGNsb3NlcyBvcGVuIG1lbnVzLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyaWxsZG93biNiYWNrXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIHRoZSBjdXJyZW50IHN1Yi1tZW51IHRvIGFkZCBgYmFja2AgZXZlbnQuXG4gICAqL1xuICBfYmFjaygkZWxlbSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgJGVsZW0ub2ZmKCdjbGljay56Zi5kcmlsbGRvd24nKTtcbiAgICAkZWxlbS5jaGlsZHJlbignLmpzLWRyaWxsZG93bi1iYWNrJylcbiAgICAgIC5vbignY2xpY2suemYuZHJpbGxkb3duJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdtb3VzZXVwIG9uIGJhY2snKTtcbiAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW0pO1xuXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IHN1Ym1lbnUsIGNhbGwgc2hvd1xuICAgICAgICBsZXQgcGFyZW50U3ViTWVudSA9ICRlbGVtLnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykucGFyZW50KCdsaScpO1xuICAgICAgICBpZiAocGFyZW50U3ViTWVudS5sZW5ndGgpIHtcbiAgICAgICAgICBfdGhpcy5fc2hvdyhwYXJlbnRTdWJNZW51KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBsaXN0ZW5lciB0byBtZW51IGl0ZW1zIHcvbyBzdWJtZW51cyB0byBjbG9zZSBvcGVuIG1lbnVzIG9uIGNsaWNrLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tZW51TGlua0V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuJG1lbnVJdGVtcy5ub3QoJy5pcy1kcmlsbGRvd24tc3VibWVudS1wYXJlbnQnKVxuICAgICAgICAub2ZmKCdjbGljay56Zi5kcmlsbGRvd24nKVxuICAgICAgICAub24oJ2NsaWNrLnpmLmRyaWxsZG93bicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIC8vIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgX3RoaXMuX2hpZGVBbGwoKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgc3VibWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcmlsbGRvd24jb3BlblxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsZW0gLSB0aGUgY3VycmVudCBlbGVtZW50IHdpdGggYSBzdWJtZW51IHRvIG9wZW4sIGkuZS4gdGhlIGBsaWAgdGFnLlxuICAgKi9cbiAgX3Nob3coJGVsZW0pIHtcbiAgICBpZih0aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkgdGhpcy4kd3JhcHBlci5jc3Moe2hlaWdodDokZWxlbS5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKS5kYXRhKCdjYWxjSGVpZ2h0Jyl9KTtcbiAgICAkZWxlbS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgJGVsZW0uY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKS5hdHRyKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBzdWJtZW51IGhhcyBvcGVuZWQuXG4gICAgICogQGV2ZW50IERyaWxsZG93biNvcGVuXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdvcGVuLnpmLmRyaWxsZG93bicsIFskZWxlbV0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWRlcyBhIHN1Ym1lbnVcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcmlsbGRvd24jaGlkZVxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsZW0gLSB0aGUgY3VycmVudCBzdWItbWVudSB0byBoaWRlLCBpLmUuIHRoZSBgdWxgIHRhZy5cbiAgICovXG4gIF9oaWRlKCRlbGVtKSB7XG4gICAgaWYodGhpcy5vcHRpb25zLmF1dG9IZWlnaHQpIHRoaXMuJHdyYXBwZXIuY3NzKHtoZWlnaHQ6JGVsZW0ucGFyZW50KCkuY2xvc2VzdCgndWwnKS5kYXRhKCdjYWxjSGVpZ2h0Jyl9KTtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICRlbGVtLnBhcmVudCgnbGknKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICRlbGVtLmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSkuYWRkQ2xhc3MoJ2lzLWNsb3NpbmcnKVxuICAgICRlbGVtLmFkZENsYXNzKCdpcy1jbG9zaW5nJylcbiAgICAgICAgIC5vbmUodHJhbnNpdGlvbmVuZCgkZWxlbSksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICRlbGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUgaXMtY2xvc2luZycpO1xuICAgICAgICAgICAkZWxlbS5ibHVyKCkuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgfSk7XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgc3VibWVudSBoYXMgY2xvc2VkLlxuICAgICAqIEBldmVudCBEcmlsbGRvd24jaGlkZVxuICAgICAqL1xuICAgICRlbGVtLnRyaWdnZXIoJ2hpZGUuemYuZHJpbGxkb3duJywgWyRlbGVtXSk7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgdGhyb3VnaCB0aGUgbmVzdGVkIG1lbnVzIHRvIGNhbGN1bGF0ZSB0aGUgbWluLWhlaWdodCwgYW5kIG1heC13aWR0aCBmb3IgdGhlIG1lbnUuXG4gICAqIFByZXZlbnRzIGNvbnRlbnQganVtcGluZy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0TWF4RGltcygpIHtcbiAgICB2YXIgIG1heEhlaWdodCA9IDAsIHJlc3VsdCA9IHt9LCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy4kc3VibWVudXMuYWRkKHRoaXMuJGVsZW1lbnQpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciBudW1PZkVsZW1zID0gJCh0aGlzKS5jaGlsZHJlbignbGknKS5sZW5ndGg7XG4gICAgICB2YXIgaGVpZ2h0ID0gQm94LkdldERpbWVuc2lvbnModGhpcykuaGVpZ2h0O1xuICAgICAgbWF4SGVpZ2h0ID0gaGVpZ2h0ID4gbWF4SGVpZ2h0ID8gaGVpZ2h0IDogbWF4SGVpZ2h0O1xuICAgICAgaWYoX3RoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICQodGhpcykuZGF0YSgnY2FsY0hlaWdodCcsaGVpZ2h0KTtcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1kcmlsbGRvd24tc3VibWVudScpKSByZXN1bHRbJ2hlaWdodCddID0gaGVpZ2h0O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYoIXRoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KSByZXN1bHRbJ21pbi1oZWlnaHQnXSA9IGAke21heEhlaWdodH1weGA7XG5cbiAgICByZXN1bHRbJ21heC13aWR0aCddID0gYCR7dGhpcy4kZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aH1weGA7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBEcmlsbGRvd24gTWVudVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIGlmKHRoaXMub3B0aW9ucy5zY3JvbGxUb3ApIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYuZHJpbGxkb3duJyx0aGlzLl9iaW5kSGFuZGxlcik7XG4gICAgdGhpcy5faGlkZUFsbCgpO1xuXHQgIHRoaXMuJGVsZW1lbnQub2ZmKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gICAgTmVzdC5CdXJuKHRoaXMuJGVsZW1lbnQsICdkcmlsbGRvd24nKTtcbiAgICB0aGlzLiRlbGVtZW50LnVud3JhcCgpXG4gICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZHJpbGxkb3duLWJhY2ssIC5pcy1zdWJtZW51LXBhcmVudC1pdGVtJykucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgLmVuZCgpLmZpbmQoJy5pcy1hY3RpdmUsIC5pcy1jbG9zaW5nLCAuaXMtZHJpbGxkb3duLXN1Ym1lbnUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlIGlzLWNsb3NpbmcgaXMtZHJpbGxkb3duLXN1Ym1lbnUnKVxuICAgICAgICAgICAgICAgICAuZW5kKCkuZmluZCgnW2RhdGEtc3VibWVudV0nKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiB0YWJpbmRleCByb2xlJyk7XG4gICAgdGhpcy4kc3VibWVudUFuY2hvcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykub2ZmKCcuemYuZHJpbGxkb3duJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzdWJtZW51cy5yZW1vdmVDbGFzcygnZHJpbGxkb3duLXN1Ym1lbnUtY292ZXItcHJldmlvdXMgaW52aXNpYmxlJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJGxpbmsgPSAkKHRoaXMpO1xuICAgICAgJGxpbmsucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgIGlmKCRsaW5rLmRhdGEoJ3NhdmVkSHJlZicpKXtcbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsICRsaW5rLmRhdGEoJ3NhdmVkSHJlZicpKS5yZW1vdmVEYXRhKCdzYXZlZEhyZWYnKTtcbiAgICAgIH1lbHNleyByZXR1cm47IH1cbiAgICB9KTtcbiAgfTtcbn1cblxuRHJpbGxkb3duLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogRHJpbGxkb3ducyBkZXBlbmQgb24gc3R5bGVzIGluIG9yZGVyIHRvIGZ1bmN0aW9uIHByb3Blcmx5OyBpbiB0aGUgZGVmYXVsdCBidWlsZCBvZiBGb3VuZGF0aW9uIHRoZXNlIGFyZVxuICAgKiBvbiB0aGUgYGRyaWxsZG93bmAgY2xhc3MuIFRoaXMgb3B0aW9uIGF1dG8tYXBwbGllcyB0aGlzIGNsYXNzIHRvIHRoZSBkcmlsbGRvd24gdXBvbiBpbml0aWFsaXphdGlvbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGlhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgYXV0b0FwcGx5Q2xhc3M6IHRydWUsXG4gIC8qKlxuICAgKiBNYXJrdXAgdXNlZCBmb3IgSlMgZ2VuZXJhdGVkIGJhY2sgYnV0dG9uLiBQcmVwZW5kZWQgIG9yIGFwcGVuZGVkIChzZWUgYmFja0J1dHRvblBvc2l0aW9uKSB0byBzdWJtZW51IGxpc3RzIGFuZCBkZWxldGVkIG9uIGBkZXN0cm95YCBtZXRob2QsICdqcy1kcmlsbGRvd24tYmFjaycgY2xhc3MgcmVxdWlyZWQuIFJlbW92ZSB0aGUgYmFja3NsYXNoIChgXFxgKSBpZiBjb3B5IGFuZCBwYXN0aW5nLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICc8bGkgY2xhc3M9XCJqcy1kcmlsbGRvd24tYmFja1wiPjxhIHRhYmluZGV4PVwiMFwiPkJhY2s8L2E+PC9saT4nXG4gICAqL1xuICBiYWNrQnV0dG9uOiAnPGxpIGNsYXNzPVwianMtZHJpbGxkb3duLWJhY2tcIj48YSB0YWJpbmRleD1cIjBcIj5CYWNrPC9hPjwvbGk+JyxcbiAgLyoqXG4gICAqIFBvc2l0aW9uIHRoZSBiYWNrIGJ1dHRvbiBlaXRoZXIgYXQgdGhlIHRvcCBvciBib3R0b20gb2YgZHJpbGxkb3duIHN1Ym1lbnVzLiBDYW4gYmUgYCdsZWZ0J2Agb3IgYCdib3R0b20nYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCB0b3BcbiAgICovXG4gIGJhY2tCdXR0b25Qb3NpdGlvbjogJ3RvcCcsXG4gIC8qKlxuICAgKiBNYXJrdXAgdXNlZCB0byB3cmFwIGRyaWxsZG93biBtZW51LiBVc2UgYSBjbGFzcyBuYW1lIGZvciBpbmRlcGVuZGVudCBzdHlsaW5nOyB0aGUgSlMgYXBwbGllZCBjbGFzczogYGlzLWRyaWxsZG93bmAgaXMgcmVxdWlyZWQuIFJlbW92ZSB0aGUgYmFja3NsYXNoIChgXFxgKSBpZiBjb3B5IGFuZCBwYXN0aW5nLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICc8ZGl2PjwvZGl2PidcbiAgICovXG4gIHdyYXBwZXI6ICc8ZGl2PjwvZGl2PicsXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBwYXJlbnQgbGluayB0byB0aGUgc3VibWVudS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHBhcmVudExpbms6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgdGhlIG1lbnUgdG8gcmV0dXJuIHRvIHJvb3QgbGlzdCBvbiBib2R5IGNsaWNrLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBtZW51IHRvIGF1dG8gYWRqdXN0IGhlaWdodC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGF1dG9IZWlnaHQ6IGZhbHNlLFxuICAvKipcbiAgICogQW5pbWF0ZSB0aGUgYXV0byBhZGp1c3QgaGVpZ2h0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYW5pbWF0ZUhlaWdodDogZmFsc2UsXG4gIC8qKlxuICAgKiBTY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgbWVudSBhZnRlciBvcGVuaW5nIGEgc3VibWVudSBvciBuYXZpZ2F0aW5nIGJhY2sgdXNpbmcgdGhlIG1lbnUgYmFjayBidXR0b25cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHNjcm9sbFRvcDogZmFsc2UsXG4gIC8qKlxuICAgKiBTdHJpbmcganF1ZXJ5IHNlbGVjdG9yIChmb3IgZXhhbXBsZSAnYm9keScpIG9mIGVsZW1lbnQgdG8gdGFrZSBvZmZzZXQoKS50b3AgZnJvbSwgaWYgZW1wdHkgc3RyaW5nIHRoZSBkcmlsbGRvd24gbWVudSBvZmZzZXQoKS50b3AgaXMgdGFrZW5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgc2Nyb2xsVG9wRWxlbWVudDogJycsXG4gIC8qKlxuICAgKiBTY3JvbGxUb3Agb2Zmc2V0XG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgc2Nyb2xsVG9wT2Zmc2V0OiAwLFxuICAvKipcbiAgICogU2Nyb2xsIGFuaW1hdGlvbiBkdXJhdGlvblxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwMFxuICAgKi9cbiAgYW5pbWF0aW9uRHVyYXRpb246IDUwMCxcbiAgLyoqXG4gICAqIFNjcm9sbCBhbmltYXRpb24gZWFzaW5nLiBDYW4gYmUgYCdzd2luZydgIG9yIGAnbGluZWFyJ2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9hcGkuanF1ZXJ5LmNvbS9hbmltYXRlfEpRdWVyeSBhbmltYXRlfVxuICAgKiBAZGVmYXVsdCAnc3dpbmcnXG4gICAqL1xuICBhbmltYXRpb25FYXNpbmc6ICdzd2luZydcbiAgLy8gaG9sZE9wZW46IGZhbHNlXG59O1xuXG5leHBvcnQge0RyaWxsZG93bn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyaWxsZG93bi5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuaW1wb3J0IHsgTW90aW9uIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubW90aW9uJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuXG4vKipcbiAqIFJlc3BvbnNpdmVUb2dnbGUgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnJlc3BvbnNpdmVUb2dnbGVcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tb3Rpb25cbiAqL1xuXG5jbGFzcyBSZXNwb25zaXZlVG9nZ2xlIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgVGFiIEJhci5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIFJlc3BvbnNpdmVUb2dnbGVcbiAgICogQGZpcmVzIFJlc3BvbnNpdmVUb2dnbGUjaW5pdFxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gYXR0YWNoIHRhYiBiYXIgZnVuY3Rpb25hbGl0eSB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgUmVzcG9uc2l2ZVRvZ2dsZS5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1Jlc3BvbnNpdmVUb2dnbGUnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgdGFiIGJhciBieSBmaW5kaW5nIHRoZSB0YXJnZXQgZWxlbWVudCwgdG9nZ2xpbmcgZWxlbWVudCwgYW5kIHJ1bm5pbmcgdXBkYXRlKCkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuICAgIHZhciB0YXJnZXRJRCA9IHRoaXMuJGVsZW1lbnQuZGF0YSgncmVzcG9uc2l2ZS10b2dnbGUnKTtcbiAgICBpZiAoIXRhcmdldElEKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdZb3VyIHRhYiBiYXIgbmVlZHMgYW4gSUQgb2YgYSBNZW51IGFzIHRoZSB2YWx1ZSBvZiBkYXRhLXRhYi1iYXIuJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kdGFyZ2V0TWVudSA9ICQoYCMke3RhcmdldElEfWApO1xuICAgIHRoaXMuJHRvZ2dsZXIgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLXRvZ2dsZV0nKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0b2dnbGUnKTtcbiAgICAgIHJldHVybiAodGFyZ2V0ID09PSB0YXJnZXRJRCB8fCB0YXJnZXQgPT09IFwiXCIpO1xuICAgIH0pO1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIHRoaXMuJHRhcmdldE1lbnUuZGF0YSgpKTtcblxuICAgIC8vIElmIHRoZXkgd2VyZSBzZXQsIHBhcnNlIHRoZSBhbmltYXRpb24gY2xhc3Nlc1xuICAgIGlmKHRoaXMub3B0aW9ucy5hbmltYXRlKSB7XG4gICAgICBsZXQgaW5wdXQgPSB0aGlzLm9wdGlvbnMuYW5pbWF0ZS5zcGxpdCgnICcpO1xuXG4gICAgICB0aGlzLmFuaW1hdGlvbkluID0gaW5wdXRbMF07XG4gICAgICB0aGlzLmFuaW1hdGlvbk91dCA9IGlucHV0WzFdIHx8IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBuZWNlc3NhcnkgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSB0YWIgYmFyIHRvIHdvcmsuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fdXBkYXRlTXFIYW5kbGVyID0gdGhpcy5fdXBkYXRlLmJpbmQodGhpcyk7XG5cbiAgICAkKHdpbmRvdykub24oJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIHRoaXMuX3VwZGF0ZU1xSGFuZGxlcik7XG5cbiAgICB0aGlzLiR0b2dnbGVyLm9uKCdjbGljay56Zi5yZXNwb25zaXZlVG9nZ2xlJywgdGhpcy50b2dnbGVNZW51LmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgY3VycmVudCBtZWRpYSBxdWVyeSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhYiBiYXIgc2hvdWxkIGJlIHZpc2libGUgb3IgaGlkZGVuLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF91cGRhdGUoKSB7XG4gICAgLy8gTW9iaWxlXG4gICAgaWYgKCFNZWRpYVF1ZXJ5LmF0TGVhc3QodGhpcy5vcHRpb25zLmhpZGVGb3IpKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnNob3coKTtcbiAgICAgIHRoaXMuJHRhcmdldE1lbnUuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIERlc2t0b3BcbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpO1xuICAgICAgdGhpcy4kdGFyZ2V0TWVudS5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGVsZW1lbnQgYXR0YWNoZWQgdG8gdGhlIHRhYiBiYXIuIFRoZSB0b2dnbGUgb25seSBoYXBwZW5zIGlmIHRoZSBzY3JlZW4gaXMgc21hbGwgZW5vdWdoIHRvIGFsbG93IGl0LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIFJlc3BvbnNpdmVUb2dnbGUjdG9nZ2xlZFxuICAgKi9cbiAgdG9nZ2xlTWVudSgpIHtcbiAgICBpZiAoIU1lZGlhUXVlcnkuYXRMZWFzdCh0aGlzLm9wdGlvbnMuaGlkZUZvcikpIHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiB0aGUgZWxlbWVudCBhdHRhY2hlZCB0byB0aGUgdGFiIGJhciB0b2dnbGVzLlxuICAgICAgICogQGV2ZW50IFJlc3BvbnNpdmVUb2dnbGUjdG9nZ2xlZFxuICAgICAgICovXG4gICAgICBpZih0aGlzLm9wdGlvbnMuYW5pbWF0ZSkge1xuICAgICAgICBpZiAodGhpcy4kdGFyZ2V0TWVudS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgTW90aW9uLmFuaW1hdGVJbih0aGlzLiR0YXJnZXRNZW51LCB0aGlzLmFuaW1hdGlvbkluLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3RvZ2dsZWQuemYucmVzcG9uc2l2ZVRvZ2dsZScpO1xuICAgICAgICAgICAgdGhpcy4kdGFyZ2V0TWVudS5maW5kKCdbZGF0YS1tdXRhdGVdJykudHJpZ2dlckhhbmRsZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBNb3Rpb24uYW5pbWF0ZU91dCh0aGlzLiR0YXJnZXRNZW51LCB0aGlzLmFuaW1hdGlvbk91dCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCd0b2dnbGVkLnpmLnJlc3BvbnNpdmVUb2dnbGUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuJHRhcmdldE1lbnUudG9nZ2xlKDApO1xuICAgICAgICB0aGlzLiR0YXJnZXRNZW51LmZpbmQoJ1tkYXRhLW11dGF0ZV0nKS50cmlnZ2VyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigndG9nZ2xlZC56Zi5yZXNwb25zaXZlVG9nZ2xlJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYucmVzcG9uc2l2ZVRvZ2dsZScpO1xuICAgIHRoaXMuJHRvZ2dsZXIub2ZmKCcuemYucmVzcG9uc2l2ZVRvZ2dsZScpO1xuXG4gICAgJCh3aW5kb3cpLm9mZignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgdGhpcy5fdXBkYXRlTXFIYW5kbGVyKTtcbiAgfVxufVxuXG5SZXNwb25zaXZlVG9nZ2xlLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogVGhlIGJyZWFrcG9pbnQgYWZ0ZXIgd2hpY2ggdGhlIG1lbnUgaXMgYWx3YXlzIHNob3duLCBhbmQgdGhlIHRhYiBiYXIgaXMgaGlkZGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdtZWRpdW0nXG4gICAqL1xuICBoaWRlRm9yOiAnbWVkaXVtJyxcblxuICAvKipcbiAgICogVG8gZGVjaWRlIGlmIHRoZSB0b2dnbGUgc2hvdWxkIGJlIGFuaW1hdGVkIG9yIG5vdC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFuaW1hdGU6IGZhbHNlXG59O1xuXG5leHBvcnQgeyBSZXNwb25zaXZlVG9nZ2xlIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVUb2dnbGUuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IE1vdGlvbiB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1vdGlvbic7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuXG4vKipcbiAqIFJldmVhbCBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ucmV2ZWFsXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubW90aW9uIGlmIHVzaW5nIGFuaW1hdGlvbnNcbiAqL1xuXG5jbGFzcyBSZXZlYWwgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXZlYWwuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBSZXZlYWxcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIHVzZSBmb3IgdGhlIG1vZGFsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbmFsIHBhcmFtZXRlcnMuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBSZXZlYWwuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdSZXZlYWwnOyAvLyBpZTkgYmFjayBjb21wYXRcbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICAvLyBUcmlnZ2VycyBpbml0IGlzIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQgaXMgaW5pdGlhbGl6ZWRcbiAgICBUcmlnZ2Vycy5pbml0KCQpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ1JldmVhbCcsIHtcbiAgICAgICdFU0NBUEUnOiAnY2xvc2UnLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtb2RhbCBieSBhZGRpbmcgdGhlIG92ZXJsYXkgYW5kIGNsb3NlIGJ1dHRvbnMsIChpZiBzZWxlY3RlZCkuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG4gICAgdGhpcy5pZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5jYWNoZWQgPSB7bXE6IE1lZGlhUXVlcnkuY3VycmVudH07XG4gICAgdGhpcy5pc01vYmlsZSA9IG1vYmlsZVNuaWZmKCk7XG5cbiAgICB0aGlzLiRhbmNob3IgPSAkKGBbZGF0YS1vcGVuPVwiJHt0aGlzLmlkfVwiXWApLmxlbmd0aCA/ICQoYFtkYXRhLW9wZW49XCIke3RoaXMuaWR9XCJdYCkgOiAkKGBbZGF0YS10b2dnbGU9XCIke3RoaXMuaWR9XCJdYCk7XG4gICAgdGhpcy4kYW5jaG9yLmF0dHIoe1xuICAgICAgJ2FyaWEtY29udHJvbHMnOiB0aGlzLmlkLFxuICAgICAgJ2FyaWEtaGFzcG9wdXAnOiB0cnVlLFxuICAgICAgJ3RhYmluZGV4JzogMFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mdWxsU2NyZWVuIHx8IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2Z1bGwnKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmZ1bGxTY3JlZW4gPSB0cnVlO1xuICAgICAgdGhpcy5vcHRpb25zLm92ZXJsYXkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5ICYmICF0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gdGhpcy5fbWFrZU92ZXJsYXkodGhpcy5pZCk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICAgJ3JvbGUnOiAnZGlhbG9nJyxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogdHJ1ZSxcbiAgICAgICAgJ2RhdGEteWV0aS1ib3gnOiB0aGlzLmlkLFxuICAgICAgICAnZGF0YS1yZXNpemUnOiB0aGlzLmlkXG4gICAgfSk7XG5cbiAgICBpZih0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmRldGFjaCgpLmFwcGVuZFRvKHRoaXMuJG92ZXJsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmRldGFjaCgpLmFwcGVuZFRvKCQodGhpcy5vcHRpb25zLmFwcGVuZFRvKSk7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCd3aXRob3V0LW92ZXJsYXknKTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluayAmJiB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gKCBgIyR7dGhpcy5pZH1gKSkge1xuICAgICAgJCh3aW5kb3cpLm9uZSgnbG9hZC56Zi5yZXZlYWwnLCB0aGlzLm9wZW4uYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb3ZlcmxheSBkaXYgdG8gZGlzcGxheSBiZWhpbmQgdGhlIG1vZGFsLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21ha2VPdmVybGF5KCkge1xuICAgIHZhciBhZGRpdGlvbmFsT3ZlcmxheUNsYXNzZXMgPSAnJztcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzKSB7XG4gICAgICBhZGRpdGlvbmFsT3ZlcmxheUNsYXNzZXMgPSAnICcgKyB0aGlzLm9wdGlvbnMuYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzO1xuICAgIH1cblxuICAgIHJldHVybiAkKCc8ZGl2PjwvZGl2PicpXG4gICAgICAuYWRkQ2xhc3MoJ3JldmVhbC1vdmVybGF5JyArIGFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlcylcbiAgICAgIC5hcHBlbmRUbyh0aGlzLm9wdGlvbnMuYXBwZW5kVG8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgcG9zaXRpb24gb2YgbW9kYWxcbiAgICogVE9ETzogIEZpZ3VyZSBvdXQgaWYgd2UgYWN0dWFsbHkgbmVlZCB0byBjYWNoZSB0aGVzZSB2YWx1ZXMgb3IgaWYgaXQgZG9lc24ndCBtYXR0ZXJcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF91cGRhdGVQb3NpdGlvbigpIHtcbiAgICB2YXIgd2lkdGggPSB0aGlzLiRlbGVtZW50Lm91dGVyV2lkdGgoKTtcbiAgICB2YXIgb3V0ZXJXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLiRlbGVtZW50Lm91dGVySGVpZ2h0KCk7XG4gICAgdmFyIG91dGVySGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgIHZhciBsZWZ0LCB0b3A7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oT2Zmc2V0ID09PSAnYXV0bycpIHtcbiAgICAgIGxlZnQgPSBwYXJzZUludCgob3V0ZXJXaWR0aCAtIHdpZHRoKSAvIDIsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVmdCA9IHBhcnNlSW50KHRoaXMub3B0aW9ucy5oT2Zmc2V0LCAxMCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudk9mZnNldCA9PT0gJ2F1dG8nKSB7XG4gICAgICBpZiAoaGVpZ2h0ID4gb3V0ZXJIZWlnaHQpIHtcbiAgICAgICAgdG9wID0gcGFyc2VJbnQoTWF0aC5taW4oMTAwLCBvdXRlckhlaWdodCAvIDEwKSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9wID0gcGFyc2VJbnQoKG91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDQsIDEwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG9wID0gcGFyc2VJbnQodGhpcy5vcHRpb25zLnZPZmZzZXQsIDEwKTtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe3RvcDogdG9wICsgJ3B4J30pO1xuICAgIC8vIG9ubHkgd29ycnkgYWJvdXQgbGVmdCBpZiB3ZSBkb24ndCBoYXZlIGFuIG92ZXJsYXkgb3Igd2UgaGF2ZWEgIGhvcml6b250YWwgb2Zmc2V0LFxuICAgIC8vIG90aGVyd2lzZSB3ZSdyZSBwZXJmZWN0bHkgaW4gdGhlIG1pZGRsZVxuICAgIGlmKCF0aGlzLiRvdmVybGF5IHx8ICh0aGlzLm9wdGlvbnMuaE9mZnNldCAhPT0gJ2F1dG8nKSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3Moe2xlZnQ6IGxlZnQgKyAncHgnfSk7XG4gICAgICB0aGlzLiRlbGVtZW50LmNzcyh7bWFyZ2luOiAnMHB4J30pO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBtb2RhbC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQub24oe1xuICAgICAgJ29wZW4uemYudHJpZ2dlcic6IHRoaXMub3Blbi5iaW5kKHRoaXMpLFxuICAgICAgJ2Nsb3NlLnpmLnRyaWdnZXInOiAoZXZlbnQsICRlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmICgoZXZlbnQudGFyZ2V0ID09PSBfdGhpcy4kZWxlbWVudFswXSkgfHxcbiAgICAgICAgICAgICgkKGV2ZW50LnRhcmdldCkucGFyZW50cygnW2RhdGEtY2xvc2FibGVdJylbMF0gPT09ICRlbGVtZW50KSkgeyAvLyBvbmx5IGNsb3NlIHJldmVhbCB3aGVuIGl0J3MgZXhwbGljaXRseSBjYWxsZWRcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZS5hcHBseSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcyksXG4gICAgICAncmVzaXplbWUuemYudHJpZ2dlcic6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfdGhpcy5fdXBkYXRlUG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrICYmIHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5Lm9mZignLnpmLnJldmVhbCcpLm9uKCdjbGljay56Zi5yZXZlYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gX3RoaXMuJGVsZW1lbnRbMF0gfHxcbiAgICAgICAgICAkLmNvbnRhaW5zKF90aGlzLiRlbGVtZW50WzBdLCBlLnRhcmdldCkgfHxcbiAgICAgICAgICAgICEkLmNvbnRhaW5zKGRvY3VtZW50LCBlLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgJCh3aW5kb3cpLm9uKGBwb3BzdGF0ZS56Zi5yZXZlYWw6JHt0aGlzLmlkfWAsIHRoaXMuX2hhbmRsZVN0YXRlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIG1vZGFsIG1ldGhvZHMgb24gYmFjay9mb3J3YXJkIGJ1dHRvbiBjbGlja3Mgb3IgYW55IG90aGVyIGV2ZW50IHRoYXQgdHJpZ2dlcnMgcG9wc3RhdGUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaGFuZGxlU3RhdGUoZSkge1xuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAoICcjJyArIHRoaXMuaWQpICYmICF0aGlzLmlzQWN0aXZlKXsgdGhpcy5vcGVuKCk7IH1cbiAgICBlbHNleyB0aGlzLmNsb3NlKCk7IH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBtb2RhbCBjb250cm9sbGVkIGJ5IGB0aGlzLiRhbmNob3JgLCBhbmQgY2xvc2VzIGFsbCBvdGhlcnMgYnkgZGVmYXVsdC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBSZXZlYWwjY2xvc2VtZVxuICAgKiBAZmlyZXMgUmV2ZWFsI29wZW5cbiAgICovXG4gIG9wZW4oKSB7XG4gICAgLy8gZWl0aGVyIHVwZGF0ZSBvciByZXBsYWNlIGJyb3dzZXIgaGlzdG9yeVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgIHZhciBoYXNoID0gYCMke3RoaXMuaWR9YDtcblxuICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwZGF0ZUhpc3RvcnkpIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCBoYXNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCBoYXNoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgLy8gTWFrZSBlbGVtZW50cyBpbnZpc2libGUsIGJ1dCByZW1vdmUgZGlzcGxheTogbm9uZSBzbyB3ZSBjYW4gZ2V0IHNpemUgYW5kIHBvc2l0aW9uaW5nXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJyB9KVxuICAgICAgICAuc2hvdygpXG4gICAgICAgIC5zY3JvbGxUb3AoMCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcyh7J3Zpc2liaWxpdHknOiAnaGlkZGVuJ30pLnNob3coKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmhpZGUoKVxuICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJycgfSk7XG5cbiAgICBpZih0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcyh7J3Zpc2liaWxpdHknOiAnJ30pLmhpZGUoKTtcbiAgICAgIGlmKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2Zhc3QnKSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdmYXN0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3Nsb3cnKSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdzbG93Jyk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5tdWx0aXBsZU9wZW5lZCkge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIG1vZGFsIG9wZW5zLlxuICAgICAgICogQ2xvc2VzIGFueSBvdGhlciBtb2RhbHMgdGhhdCBhcmUgY3VycmVudGx5IG9wZW5cbiAgICAgICAqIEBldmVudCBSZXZlYWwjY2xvc2VtZVxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlbWUuemYucmV2ZWFsJywgdGhpcy5pZCk7XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIGFkZFJldmVhbE9wZW5DbGFzc2VzKCkge1xuICAgICAgaWYgKF90aGlzLmlzTW9iaWxlKSB7XG4gICAgICAgIGlmKCFfdGhpcy5vcmlnaW5hbFNjcm9sbFBvcykge1xuICAgICAgICAgIF90aGlzLm9yaWdpbmFsU2Nyb2xsUG9zID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hZGRDbGFzcygnaXMtcmV2ZWFsLW9wZW4nKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lzLXJldmVhbC1vcGVuJyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE1vdGlvbiBVSSBtZXRob2Qgb2YgcmV2ZWFsXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb25Jbikge1xuICAgICAgZnVuY3Rpb24gYWZ0ZXJBbmltYXRpb24oKXtcbiAgICAgICAgX3RoaXMuJGVsZW1lbnRcbiAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiBmYWxzZSxcbiAgICAgICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZm9jdXMoKTtcbiAgICAgICAgYWRkUmV2ZWFsT3BlbkNsYXNzZXMoKTtcbiAgICAgICAgS2V5Ym9hcmQudHJhcEZvY3VzKF90aGlzLiRlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICBNb3Rpb24uYW5pbWF0ZUluKHRoaXMuJG92ZXJsYXksICdmYWRlLWluJyk7XG4gICAgICB9XG4gICAgICBNb3Rpb24uYW5pbWF0ZUluKHRoaXMuJGVsZW1lbnQsIHRoaXMub3B0aW9ucy5hbmltYXRpb25JbiwgKCkgPT4ge1xuICAgICAgICBpZih0aGlzLiRlbGVtZW50KSB7IC8vIHByb3RlY3QgYWdhaW5zdCBvYmplY3QgaGF2aW5nIGJlZW4gcmVtb3ZlZFxuICAgICAgICAgIHRoaXMuZm9jdXNhYmxlRWxlbWVudHMgPSBLZXlib2FyZC5maW5kRm9jdXNhYmxlKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICAgIGFmdGVyQW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBqUXVlcnkgbWV0aG9kIG9mIHJldmVhbFxuICAgIGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsZW1lbnQuc2hvdyh0aGlzLm9wdGlvbnMuc2hvd0RlbGF5KTtcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgYWNjZXNzaWJpbGl0eVxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5hdHRyKHtcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogZmFsc2UsXG4gICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICB9KVxuICAgICAgLmZvY3VzKCk7XG4gICAgS2V5Ym9hcmQudHJhcEZvY3VzKHRoaXMuJGVsZW1lbnQpO1xuXG4gICAgYWRkUmV2ZWFsT3BlbkNsYXNzZXMoKTtcblxuICAgIHRoaXMuX2V4dHJhSGFuZGxlcnMoKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIG1vZGFsIGhhcyBzdWNjZXNzZnVsbHkgb3BlbmVkLlxuICAgICAqIEBldmVudCBSZXZlYWwjb3BlblxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignb3Blbi56Zi5yZXZlYWwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV4dHJhIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgYm9keSBhbmQgd2luZG93IGlmIG5lY2Vzc2FyeS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9leHRyYUhhbmRsZXJzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgaWYoIXRoaXMuJGVsZW1lbnQpIHsgcmV0dXJuOyB9IC8vIElmIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgY2xlYW51cCwgZG9uJ3QgZnJlYWsgb3V0XG4gICAgdGhpcy5mb2N1c2FibGVFbGVtZW50cyA9IEtleWJvYXJkLmZpbmRGb2N1c2FibGUodGhpcy4kZWxlbWVudCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5vdmVybGF5ICYmIHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgJiYgIXRoaXMub3B0aW9ucy5mdWxsU2NyZWVuKSB7XG4gICAgICAkKCdib2R5Jykub24oJ2NsaWNrLnpmLnJldmVhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBfdGhpcy4kZWxlbWVudFswXSB8fFxuICAgICAgICAgICQuY29udGFpbnMoX3RoaXMuJGVsZW1lbnRbMF0sIGUudGFyZ2V0KSB8fFxuICAgICAgICAgICAgISQuY29udGFpbnMoZG9jdW1lbnQsIGUudGFyZ2V0KSkgeyByZXR1cm47IH1cbiAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgJCh3aW5kb3cpLm9uKCdrZXlkb3duLnpmLnJldmVhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdSZXZlYWwnLCB7XG4gICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBSZXZlYWwjY2xvc2VkXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNBY3RpdmUgfHwgIXRoaXMuJGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIE1vdGlvbiBVSSBtZXRob2Qgb2YgaGlkaW5nXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb25PdXQpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICBNb3Rpb24uYW5pbWF0ZU91dCh0aGlzLiRvdmVybGF5LCAnZmFkZS1vdXQnKTtcbiAgICAgIH1cblxuICAgICAgTW90aW9uLmFuaW1hdGVPdXQodGhpcy4kZWxlbWVudCwgdGhpcy5vcHRpb25zLmFuaW1hdGlvbk91dCwgZmluaXNoVXApO1xuICAgIH1cbiAgICAvLyBqUXVlcnkgbWV0aG9kIG9mIGhpZGluZ1xuICAgIGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5oaWRlKHRoaXMub3B0aW9ucy5oaWRlRGVsYXkpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKDAsIGZpbmlzaFVwKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmaW5pc2hVcCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbmRpdGlvbmFscyB0byByZW1vdmUgZXh0cmEgZXZlbnQgbGlzdGVuZXJzIGFkZGVkIG9uIG9wZW5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25Fc2MpIHtcbiAgICAgICQod2luZG93KS5vZmYoJ2tleWRvd24uemYucmV2ZWFsJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMub3ZlcmxheSAmJiB0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKSB7XG4gICAgICAkKCdib2R5Jykub2ZmKCdjbGljay56Zi5yZXZlYWwnKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9mZigna2V5ZG93bi56Zi5yZXZlYWwnKTtcblxuICAgIGZ1bmN0aW9uIGZpbmlzaFVwKCkge1xuICAgICAgaWYgKF90aGlzLmlzTW9iaWxlKSB7XG4gICAgICAgIGlmICgkKCcucmV2ZWFsOnZpc2libGUnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLXJldmVhbC1vcGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoX3RoaXMub3JpZ2luYWxTY3JvbGxQb3MpIHtcbiAgICAgICAgICAkKCdib2R5Jykuc2Nyb2xsVG9wKF90aGlzLm9yaWdpbmFsU2Nyb2xsUG9zKTtcbiAgICAgICAgICBfdGhpcy5vcmlnaW5hbFNjcm9sbFBvcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoJCgnLnJldmVhbDp2aXNpYmxlJykubGVuZ3RoICA9PT0gMCkge1xuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtcmV2ZWFsLW9wZW4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIEtleWJvYXJkLnJlbGVhc2VGb2N1cyhfdGhpcy4kZWxlbWVudCk7XG5cbiAgICAgIF90aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cbiAgICAgIC8qKlxuICAgICAgKiBGaXJlcyB3aGVuIHRoZSBtb2RhbCBpcyBkb25lIGNsb3NpbmcuXG4gICAgICAqIEBldmVudCBSZXZlYWwjY2xvc2VkXG4gICAgICAqL1xuICAgICAgX3RoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2VkLnpmLnJldmVhbCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUmVzZXRzIHRoZSBtb2RhbCBjb250ZW50XG4gICAgKiBUaGlzIHByZXZlbnRzIGEgcnVubmluZyB2aWRlbyB0byBrZWVwIGdvaW5nIGluIHRoZSBiYWNrZ3JvdW5kXG4gICAgKi9cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlc2V0T25DbG9zZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5odG1sKHRoaXMuJGVsZW1lbnQuaHRtbCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgIGlmIChfdGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZShgIyR7dGhpcy5pZH1gLCAnJykpO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xuICAgICAgIH1cbiAgICAgfVxuXG4gICAgdGhpcy4kYW5jaG9yLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgb3Blbi9jbG9zZWQgc3RhdGUgb2YgYSBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBhIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmRUbygkKHRoaXMub3B0aW9ucy5hcHBlbmRUbykpOyAvLyBtb3ZlICRlbGVtZW50IG91dHNpZGUgb2YgJG92ZXJsYXkgdG8gcHJldmVudCBlcnJvciB1bnJlZ2lzdGVyUGx1Z2luKClcbiAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpLm9mZigpLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLiRlbGVtZW50LmhpZGUoKS5vZmYoKTtcbiAgICB0aGlzLiRhbmNob3Iub2ZmKCcuemYnKTtcbiAgICAkKHdpbmRvdykub2ZmKGAuemYucmV2ZWFsOiR7dGhpcy5pZH1gKTtcbiAgfTtcbn1cblxuUmV2ZWFsLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogTW90aW9uLVVJIGNsYXNzIHRvIHVzZSBmb3IgYW5pbWF0ZWQgZWxlbWVudHMuIElmIG5vbmUgdXNlZCwgZGVmYXVsdHMgdG8gc2ltcGxlIHNob3cvaGlkZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgYW5pbWF0aW9uSW46ICcnLFxuICAvKipcbiAgICogTW90aW9uLVVJIGNsYXNzIHRvIHVzZSBmb3IgYW5pbWF0ZWQgZWxlbWVudHMuIElmIG5vbmUgdXNlZCwgZGVmYXVsdHMgdG8gc2ltcGxlIHNob3cvaGlkZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgYW5pbWF0aW9uT3V0OiAnJyxcbiAgLyoqXG4gICAqIFRpbWUsIGluIG1zLCB0byBkZWxheSB0aGUgb3BlbmluZyBvZiBhIG1vZGFsIGFmdGVyIGEgY2xpY2sgaWYgbm8gYW5pbWF0aW9uIHVzZWQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgc2hvd0RlbGF5OiAwLFxuICAvKipcbiAgICogVGltZSwgaW4gbXMsIHRvIGRlbGF5IHRoZSBjbG9zaW5nIG9mIGEgbW9kYWwgYWZ0ZXIgYSBjbGljayBpZiBubyBhbmltYXRpb24gdXNlZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBoaWRlRGVsYXk6IDAsXG4gIC8qKlxuICAgKiBBbGxvd3MgYSBjbGljayBvbiB0aGUgYm9keS9vdmVybGF5IHRvIGNsb3NlIHRoZSBtb2RhbC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiB0cnVlLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSBtb2RhbCB0byBjbG9zZSBpZiB0aGUgdXNlciBwcmVzc2VzIHRoZSBgRVNDQVBFYCBrZXkuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25Fc2M6IHRydWUsXG4gIC8qKlxuICAgKiBJZiB0cnVlLCBhbGxvd3MgbXVsdGlwbGUgbW9kYWxzIHRvIGJlIGRpc3BsYXllZCBhdCBvbmNlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgbXVsdGlwbGVPcGVuZWQ6IGZhbHNlLFxuICAvKipcbiAgICogRGlzdGFuY2UsIGluIHBpeGVscywgdGhlIG1vZGFsIHNob3VsZCBwdXNoIGRvd24gZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JlZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcnxzdHJpbmd9XG4gICAqIEBkZWZhdWx0IGF1dG9cbiAgICovXG4gIHZPZmZzZXQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIERpc3RhbmNlLCBpbiBwaXhlbHMsIHRoZSBtb2RhbCBzaG91bGQgcHVzaCBpbiBmcm9tIHRoZSBzaWRlIG9mIHRoZSBzY3JlZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcnxzdHJpbmd9XG4gICAqIEBkZWZhdWx0IGF1dG9cbiAgICovXG4gIGhPZmZzZXQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gYmUgZnVsbHNjcmVlbiwgY29tcGxldGVseSBibG9ja2luZyBvdXQgdGhlIHJlc3Qgb2YgdGhlIHZpZXcuIEpTIGNoZWNrcyBmb3IgdGhpcyBhcyB3ZWxsLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZnVsbFNjcmVlbjogZmFsc2UsXG4gIC8qKlxuICAgKiBQZXJjZW50YWdlIG9mIHNjcmVlbiBoZWlnaHQgdGhlIG1vZGFsIHNob3VsZCBwdXNoIHVwIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgdmlldy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxMFxuICAgKi9cbiAgYnRtT2Zmc2V0UGN0OiAxMCxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gZ2VuZXJhdGUgYW4gb3ZlcmxheSBkaXYsIHdoaWNoIHdpbGwgY292ZXIgdGhlIHZpZXcgd2hlbiBtb2RhbCBvcGVucy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgb3ZlcmxheTogdHJ1ZSxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gcmVtb3ZlIGFuZCByZWluamVjdCBtYXJrdXAgb24gY2xvc2UuIFNob3VsZCBiZSB0cnVlIGlmIHVzaW5nIHZpZGVvIGVsZW1lbnRzIHcvbyB1c2luZyBwcm92aWRlcidzIGFwaSwgb3RoZXJ3aXNlLCB2aWRlb3Mgd2lsbCBjb250aW51ZSB0byBwbGF5IGluIHRoZSBiYWNrZ3JvdW5kLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgcmVzZXRPbkNsb3NlOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gYWx0ZXIgdGhlIHVybCBvbiBvcGVuL2Nsb3NlLCBhbmQgYWxsb3dzIHRoZSB1c2Ugb2YgdGhlIGBiYWNrYCBidXR0b24gdG8gY2xvc2UgbW9kYWxzLiBBTFNPLCBhbGxvd3MgYSBtb2RhbCB0byBhdXRvLW1hbmlhY2FsbHkgb3BlbiBvbiBwYWdlIGxvYWQgSUYgdGhlIGhhc2ggPT09IHRoZSBtb2RhbCdzIHVzZXItc2V0IGlkLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVlcExpbms6IGZhbHNlLFxuICAvKipcbiAgICogVXBkYXRlIHRoZSBicm93c2VyIGhpc3Rvcnkgd2l0aCB0aGUgb3BlbiBtb2RhbFxuICAgKiBAb3B0aW9uXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB1cGRhdGVIaXN0b3J5OiBmYWxzZSxcbiAgICAvKipcbiAgICogQWxsb3dzIHRoZSBtb2RhbCB0byBhcHBlbmQgdG8gY3VzdG9tIGRpdi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBcImJvZHlcIlxuICAgKi9cbiAgYXBwZW5kVG86IFwiYm9keVwiLFxuICAvKipcbiAgICogQWxsb3dzIGFkZGluZyBhZGRpdGlvbmFsIGNsYXNzIG5hbWVzIHRvIHRoZSByZXZlYWwgb3ZlcmxheS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzOiAnJ1xufTtcblxuZnVuY3Rpb24gaVBob25lU25pZmYoKSB7XG4gIHJldHVybiAvaVAoYWR8aG9uZXxvZCkuKk9TLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbn1cblxuZnVuY3Rpb24gYW5kcm9pZFNuaWZmKCkge1xuICByZXR1cm4gL0FuZHJvaWQvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xufVxuXG5mdW5jdGlvbiBtb2JpbGVTbmlmZigpIHtcbiAgcmV0dXJuIGlQaG9uZVNuaWZmKCkgfHwgYW5kcm9pZFNuaWZmKCk7XG59XG5cbmV4cG9ydCB7UmV2ZWFsfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucmV2ZWFsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG5cbi8qKlxuICogU3RpY2t5IG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5zdGlja3lcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICovXG5cbmNsYXNzIFN0aWNreSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgc3RpY2t5IHRoaW5nLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgU3RpY2t5XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIHN0aWNreS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIG9iamVjdCBwYXNzZWQgd2hlbiBjcmVhdGluZyB0aGUgZWxlbWVudCBwcm9ncmFtbWF0aWNhbGx5LlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgU3RpY2t5LmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnU3RpY2t5JzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICAvLyBUcmlnZ2VycyBpbml0IGlzIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQgaXMgaW5pdGlhbGl6ZWRcbiAgICBUcmlnZ2Vycy5pbml0KCQpO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBzdGlja3kgZWxlbWVudCBieSBhZGRpbmcgY2xhc3NlcywgZ2V0dGluZy9zZXR0aW5nIGRpbWVuc2lvbnMsIGJyZWFrcG9pbnRzIGFuZCBhdHRyaWJ1dGVzXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuXG4gICAgdmFyICRwYXJlbnQgPSB0aGlzLiRlbGVtZW50LnBhcmVudCgnW2RhdGEtc3RpY2t5LWNvbnRhaW5lcl0nKSxcbiAgICAgICAgaWQgPSB0aGlzLiRlbGVtZW50WzBdLmlkIHx8IEdldFlvRGlnaXRzKDYsICdzdGlja3knKSxcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYoJHBhcmVudC5sZW5ndGgpe1xuICAgICAgdGhpcy4kY29udGFpbmVyID0gJHBhcmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53YXNXcmFwcGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJGVsZW1lbnQud3JhcCh0aGlzLm9wdGlvbnMuY29udGFpbmVyKTtcbiAgICAgIHRoaXMuJGNvbnRhaW5lciA9IHRoaXMuJGVsZW1lbnQucGFyZW50KCk7XG4gICAgfVxuICAgIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuY29udGFpbmVyQ2xhc3MpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuc3RpY2t5Q2xhc3MpLmF0dHIoeyAnZGF0YS1yZXNpemUnOiBpZCwgJ2RhdGEtbXV0YXRlJzogaWQgfSk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmNob3IgIT09ICcnKSB7XG4gICAgICAgICQoJyMnICsgX3RoaXMub3B0aW9ucy5hbmNob3IpLmF0dHIoeyAnZGF0YS1tdXRhdGUnOiBpZCB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNjcm9sbENvdW50ID0gdGhpcy5vcHRpb25zLmNoZWNrRXZlcnk7XG4gICAgdGhpcy5pc1N0dWNrID0gZmFsc2U7XG4gICAgJCh3aW5kb3cpLm9uZSgnbG9hZC56Zi5zdGlja3knLCBmdW5jdGlvbigpe1xuICAgICAgLy9XZSBjYWxjdWxhdGUgdGhlIGNvbnRhaW5lciBoZWlnaHQgdG8gaGF2ZSBjb3JyZWN0IHZhbHVlcyBmb3IgYW5jaG9yIHBvaW50cyBvZmZzZXQgY2FsY3VsYXRpb24uXG4gICAgICBfdGhpcy5jb250YWluZXJIZWlnaHQgPSBfdGhpcy4kZWxlbWVudC5jc3MoXCJkaXNwbGF5XCIpID09IFwibm9uZVwiID8gMCA6IF90aGlzLiRlbGVtZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIF90aGlzLiRjb250YWluZXIuY3NzKCdoZWlnaHQnLCBfdGhpcy5jb250YWluZXJIZWlnaHQpO1xuICAgICAgX3RoaXMuZWxlbUhlaWdodCA9IF90aGlzLmNvbnRhaW5lckhlaWdodDtcbiAgICAgIGlmKF90aGlzLm9wdGlvbnMuYW5jaG9yICE9PSAnJyl7XG4gICAgICAgIF90aGlzLiRhbmNob3IgPSAkKCcjJyArIF90aGlzLm9wdGlvbnMuYW5jaG9yKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBfdGhpcy5fcGFyc2VQb2ludHMoKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuX3NldFNpemVzKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIF90aGlzLl9jYWxjKGZhbHNlLCBzY3JvbGwpO1xuICAgICAgICAvL1Vuc3RpY2sgdGhlIGVsZW1lbnQgd2lsbCBlbnN1cmUgdGhhdCBwcm9wZXIgY2xhc3NlcyBhcmUgc2V0LlxuICAgICAgICBpZiAoIV90aGlzLmlzU3R1Y2spIHtcbiAgICAgICAgICBfdGhpcy5fcmVtb3ZlU3RpY2t5KChzY3JvbGwgPj0gX3RoaXMudG9wUG9pbnQpID8gZmFsc2UgOiB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBfdGhpcy5fZXZlbnRzKGlkLnNwbGl0KCctJykucmV2ZXJzZSgpLmpvaW4oJy0nKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgdXNpbmcgbXVsdGlwbGUgZWxlbWVudHMgYXMgYW5jaG9ycywgY2FsY3VsYXRlcyB0aGUgdG9wIGFuZCBib3R0b20gcGl4ZWwgdmFsdWVzIHRoZSBzdGlja3kgdGhpbmcgc2hvdWxkIHN0aWNrIGFuZCB1bnN0aWNrIG9uLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZVBvaW50cygpIHtcbiAgICB2YXIgdG9wID0gdGhpcy5vcHRpb25zLnRvcEFuY2hvciA9PSBcIlwiID8gMSA6IHRoaXMub3B0aW9ucy50b3BBbmNob3IsXG4gICAgICAgIGJ0bSA9IHRoaXMub3B0aW9ucy5idG1BbmNob3I9PSBcIlwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCA6IHRoaXMub3B0aW9ucy5idG1BbmNob3IsXG4gICAgICAgIHB0cyA9IFt0b3AsIGJ0bV0sXG4gICAgICAgIGJyZWFrcyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwdHMubGVuZ3RoOyBpIDwgbGVuICYmIHB0c1tpXTsgaSsrKSB7XG4gICAgICB2YXIgcHQ7XG4gICAgICBpZiAodHlwZW9mIHB0c1tpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcHQgPSBwdHNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcGxhY2UgPSBwdHNbaV0uc3BsaXQoJzonKSxcbiAgICAgICAgICAgIGFuY2hvciA9ICQoYCMke3BsYWNlWzBdfWApO1xuXG4gICAgICAgIHB0ID0gYW5jaG9yLm9mZnNldCgpLnRvcDtcbiAgICAgICAgaWYgKHBsYWNlWzFdICYmIHBsYWNlWzFdLnRvTG93ZXJDYXNlKCkgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgcHQgKz0gYW5jaG9yWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWtzW2ldID0gcHQ7XG4gICAgfVxuXG5cbiAgICB0aGlzLnBvaW50cyA9IGJyZWFrcztcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyBmb3IgdGhlIHNjcm9sbGluZyBlbGVtZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBwc2V1ZG8tcmFuZG9tIGlkIGZvciB1bmlxdWUgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyLlxuICAgKi9cbiAgX2V2ZW50cyhpZCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIHNjcm9sbExpc3RlbmVyID0gdGhpcy5zY3JvbGxMaXN0ZW5lciA9IGBzY3JvbGwuemYuJHtpZH1gO1xuICAgIGlmICh0aGlzLmlzT24pIHsgcmV0dXJuOyB9XG4gICAgaWYgKHRoaXMuY2FuU3RpY2spIHtcbiAgICAgIHRoaXMuaXNPbiA9IHRydWU7XG4gICAgICAkKHdpbmRvdykub2ZmKHNjcm9sbExpc3RlbmVyKVxuICAgICAgICAgICAgICAgLm9uKHNjcm9sbExpc3RlbmVyLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zY3JvbGxDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgIF90aGlzLnNjcm9sbENvdW50ID0gX3RoaXMub3B0aW9ucy5jaGVja0V2ZXJ5O1xuICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZXRTaXplcyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9jYWxjKGZhbHNlLCB3aW5kb3cucGFnZVlPZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIF90aGlzLnNjcm9sbENvdW50LS07XG4gICAgICAgICAgICAgICAgICAgX3RoaXMuX2NhbGMoZmFsc2UsIHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInKVxuICAgICAgICAgICAgICAgICAub24oJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCBmdW5jdGlvbihlLCBlbCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZXZlbnRzSGFuZGxlcihpZCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdtdXRhdGVtZS56Zi50cmlnZ2VyJywgZnVuY3Rpb24gKGUsIGVsKSB7XG4gICAgICAgIF90aGlzLl9ldmVudHNIYW5kbGVyKGlkKTtcbiAgICB9KTtcblxuICAgIGlmKHRoaXMuJGFuY2hvcikge1xuICAgICAgdGhpcy4kYW5jaG9yLm9uKCdtdXRhdGVtZS56Zi50cmlnZ2VyJywgZnVuY3Rpb24gKGUsIGVsKSB7XG4gICAgICAgICAgX3RoaXMuX2V2ZW50c0hhbmRsZXIoaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIGV2ZW50cy5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIC0gcHNldWRvLXJhbmRvbSBpZCBmb3IgdW5pcXVlIHNjcm9sbCBldmVudCBsaXN0ZW5lci5cbiAgICovXG4gIF9ldmVudHNIYW5kbGVyKGlkKSB7XG4gICAgICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgc2Nyb2xsTGlzdGVuZXIgPSB0aGlzLnNjcm9sbExpc3RlbmVyID0gYHNjcm9sbC56Zi4ke2lkfWA7XG5cbiAgICAgICBfdGhpcy5fc2V0U2l6ZXMoZnVuY3Rpb24oKSB7XG4gICAgICAgX3RoaXMuX2NhbGMoZmFsc2UpO1xuICAgICAgIGlmIChfdGhpcy5jYW5TdGljaykge1xuICAgICAgICAgaWYgKCFfdGhpcy5pc09uKSB7XG4gICAgICAgICAgIF90aGlzLl9ldmVudHMoaWQpO1xuICAgICAgICAgfVxuICAgICAgIH0gZWxzZSBpZiAoX3RoaXMuaXNPbikge1xuICAgICAgICAgX3RoaXMuX3BhdXNlTGlzdGVuZXJzKHNjcm9sbExpc3RlbmVyKTtcbiAgICAgICB9XG4gICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgZXZlbnQgaGFuZGxlcnMgZm9yIHNjcm9sbCBhbmQgY2hhbmdlIGV2ZW50cyBvbiBhbmNob3IuXG4gICAqIEBmaXJlcyBTdGlja3kjcGF1c2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNjcm9sbExpc3RlbmVyIC0gdW5pcXVlLCBuYW1lc3BhY2VkIHNjcm9sbCBsaXN0ZW5lciBhdHRhY2hlZCB0byBgd2luZG93YFxuICAgKi9cbiAgX3BhdXNlTGlzdGVuZXJzKHNjcm9sbExpc3RlbmVyKSB7XG4gICAgdGhpcy5pc09uID0gZmFsc2U7XG4gICAgJCh3aW5kb3cpLm9mZihzY3JvbGxMaXN0ZW5lcik7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaXMgcGF1c2VkIGR1ZSB0byByZXNpemUgZXZlbnQgc2hyaW5raW5nIHRoZSB2aWV3LlxuICAgICAqIEBldmVudCBTdGlja3kjcGF1c2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3BhdXNlLnpmLnN0aWNreScpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBvbiBldmVyeSBgc2Nyb2xsYCBldmVudCBhbmQgb24gYF9pbml0YFxuICAgKiBmaXJlcyBmdW5jdGlvbnMgYmFzZWQgb24gYm9vbGVhbnMgYW5kIGNhY2hlZCB2YWx1ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBjaGVja1NpemVzIC0gdHJ1ZSBpZiBwbHVnaW4gc2hvdWxkIHJlY2FsY3VsYXRlIHNpemVzIGFuZCBicmVha3BvaW50cy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNjcm9sbCAtIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIHBhc3NlZCBmcm9tIHNjcm9sbCBldmVudCBjYiBmdW5jdGlvbi4gSWYgbm90IHBhc3NlZCwgZGVmYXVsdHMgdG8gYHdpbmRvdy5wYWdlWU9mZnNldGAuXG4gICAqL1xuICBfY2FsYyhjaGVja1NpemVzLCBzY3JvbGwpIHtcbiAgICBpZiAoY2hlY2tTaXplcykgeyB0aGlzLl9zZXRTaXplcygpOyB9XG5cbiAgICBpZiAoIXRoaXMuY2FuU3RpY2spIHtcbiAgICAgIGlmICh0aGlzLmlzU3R1Y2spIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlU3RpY2t5KHRydWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghc2Nyb2xsKSB7IHNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDsgfVxuXG4gICAgaWYgKHNjcm9sbCA+PSB0aGlzLnRvcFBvaW50KSB7XG4gICAgICBpZiAoc2Nyb2xsIDw9IHRoaXMuYm90dG9tUG9pbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3R1Y2spIHtcbiAgICAgICAgICB0aGlzLl9zZXRTdGlja3koKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdHVjaykge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZVN0aWNreShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaXNTdHVjaykge1xuICAgICAgICB0aGlzLl9yZW1vdmVTdGlja3kodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhdXNlcyB0aGUgJGVsZW1lbnQgdG8gYmVjb21lIHN0dWNrLlxuICAgKiBBZGRzIGBwb3NpdGlvbjogZml4ZWQ7YCwgYW5kIGhlbHBlciBjbGFzc2VzLlxuICAgKiBAZmlyZXMgU3RpY2t5I3N0dWNrdG9cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0U3RpY2t5KCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIHN0aWNrVG8gPSB0aGlzLm9wdGlvbnMuc3RpY2tUbyxcbiAgICAgICAgbXJnbiA9IHN0aWNrVG8gPT09ICd0b3AnID8gJ21hcmdpblRvcCcgOiAnbWFyZ2luQm90dG9tJyxcbiAgICAgICAgbm90U3R1Y2tUbyA9IHN0aWNrVG8gPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJyxcbiAgICAgICAgY3NzID0ge307XG5cbiAgICBjc3NbbXJnbl0gPSBgJHt0aGlzLm9wdGlvbnNbbXJnbl19ZW1gO1xuICAgIGNzc1tzdGlja1RvXSA9IDA7XG4gICAgY3NzW25vdFN0dWNrVG9dID0gJ2F1dG8nO1xuICAgIHRoaXMuaXNTdHVjayA9IHRydWU7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhgaXMtYW5jaG9yZWQgaXMtYXQtJHtub3RTdHVja1RvfWApXG4gICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgaXMtc3R1Y2sgaXMtYXQtJHtzdGlja1RvfWApXG4gICAgICAgICAgICAgICAgIC5jc3MoY3NzKVxuICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgJGVsZW1lbnQgaGFzIGJlY29tZSBgcG9zaXRpb246IGZpeGVkO2BcbiAgICAgICAgICAgICAgICAgICogTmFtZXNwYWNlZCB0byBgdG9wYCBvciBgYm90dG9tYCwgZS5nLiBgc3RpY2t5LnpmLnN0dWNrdG86dG9wYFxuICAgICAgICAgICAgICAgICAgKiBAZXZlbnQgU3RpY2t5I3N0dWNrdG9cbiAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgIC50cmlnZ2VyKGBzdGlja3kuemYuc3R1Y2t0bzoke3N0aWNrVG99YCk7XG4gICAgdGhpcy4kZWxlbWVudC5vbihcInRyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBNU1RyYW5zaXRpb25FbmRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5fc2V0U2l6ZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXVzZXMgdGhlICRlbGVtZW50IHRvIGJlY29tZSB1bnN0dWNrLlxuICAgKiBSZW1vdmVzIGBwb3NpdGlvbjogZml4ZWQ7YCwgYW5kIGhlbHBlciBjbGFzc2VzLlxuICAgKiBBZGRzIG90aGVyIGhlbHBlciBjbGFzc2VzLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzVG9wIC0gdGVsbHMgdGhlIGZ1bmN0aW9uIGlmIHRoZSAkZWxlbWVudCBzaG91bGQgYW5jaG9yIHRvIHRoZSB0b3Agb3IgYm90dG9tIG9mIGl0cyAkYW5jaG9yIGVsZW1lbnQuXG4gICAqIEBmaXJlcyBTdGlja3kjdW5zdHVja2Zyb21cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVTdGlja3koaXNUb3ApIHtcbiAgICB2YXIgc3RpY2tUbyA9IHRoaXMub3B0aW9ucy5zdGlja1RvLFxuICAgICAgICBzdGlja1RvVG9wID0gc3RpY2tUbyA9PT0gJ3RvcCcsXG4gICAgICAgIGNzcyA9IHt9LFxuICAgICAgICBhbmNob3JQdCA9ICh0aGlzLnBvaW50cyA/IHRoaXMucG9pbnRzWzFdIC0gdGhpcy5wb2ludHNbMF0gOiB0aGlzLmFuY2hvckhlaWdodCkgLSB0aGlzLmVsZW1IZWlnaHQsXG4gICAgICAgIG1yZ24gPSBzdGlja1RvVG9wID8gJ21hcmdpblRvcCcgOiAnbWFyZ2luQm90dG9tJyxcbiAgICAgICAgbm90U3R1Y2tUbyA9IHN0aWNrVG9Ub3AgPyAnYm90dG9tJyA6ICd0b3AnLFxuICAgICAgICB0b3BPckJvdHRvbSA9IGlzVG9wID8gJ3RvcCcgOiAnYm90dG9tJztcblxuICAgIGNzc1ttcmduXSA9IDA7XG5cbiAgICBjc3NbJ2JvdHRvbSddID0gJ2F1dG8nO1xuICAgIGlmKGlzVG9wKSB7XG4gICAgICBjc3NbJ3RvcCddID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY3NzWyd0b3AnXSA9IGFuY2hvclB0O1xuICAgIH1cblxuICAgIHRoaXMuaXNTdHVjayA9IGZhbHNlO1xuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoYGlzLXN0dWNrIGlzLWF0LSR7c3RpY2tUb31gKVxuICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYGlzLWFuY2hvcmVkIGlzLWF0LSR7dG9wT3JCb3R0b219YClcbiAgICAgICAgICAgICAgICAgLmNzcyhjc3MpXG4gICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSAkZWxlbWVudCBoYXMgYmVjb21lIGFuY2hvcmVkLlxuICAgICAgICAgICAgICAgICAgKiBOYW1lc3BhY2VkIHRvIGB0b3BgIG9yIGBib3R0b21gLCBlLmcuIGBzdGlja3kuemYudW5zdHVja2Zyb206Ym90dG9tYFxuICAgICAgICAgICAgICAgICAgKiBAZXZlbnQgU3RpY2t5I3Vuc3R1Y2tmcm9tXG4gICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAudHJpZ2dlcihgc3RpY2t5LnpmLnVuc3R1Y2tmcm9tOiR7dG9wT3JCb3R0b219YCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgJGVsZW1lbnQgYW5kICRjb250YWluZXIgc2l6ZXMgZm9yIHBsdWdpbi5cbiAgICogQ2FsbHMgYF9zZXRCcmVha1BvaW50c2AuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZmlyZSBvbiBjb21wbGV0aW9uIG9mIGBfc2V0QnJlYWtQb2ludHNgLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldFNpemVzKGNiKSB7XG4gICAgdGhpcy5jYW5TdGljayA9IE1lZGlhUXVlcnkuaXModGhpcy5vcHRpb25zLnN0aWNreU9uKTtcbiAgICBpZiAoIXRoaXMuY2FuU3RpY2spIHtcbiAgICAgIGlmIChjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHsgY2IoKTsgfVxuICAgIH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBuZXdFbGVtV2lkdGggPSB0aGlzLiRjb250YWluZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsXG4gICAgICAgIGNvbXAgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLiRjb250YWluZXJbMF0pLFxuICAgICAgICBwZG5nbCA9IHBhcnNlSW50KGNvbXBbJ3BhZGRpbmctbGVmdCddLCAxMCksXG4gICAgICAgIHBkbmdyID0gcGFyc2VJbnQoY29tcFsncGFkZGluZy1yaWdodCddLCAxMCk7XG5cbiAgICBpZiAodGhpcy4kYW5jaG9yICYmIHRoaXMuJGFuY2hvci5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYW5jaG9ySGVpZ2h0ID0gdGhpcy4kYW5jaG9yWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyc2VQb2ludHMoKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICAnbWF4LXdpZHRoJzogYCR7bmV3RWxlbVdpZHRoIC0gcGRuZ2wgLSBwZG5ncn1weGBcbiAgICB9KTtcblxuICAgIHZhciBuZXdDb250YWluZXJIZWlnaHQgPSB0aGlzLiRlbGVtZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCB0aGlzLmNvbnRhaW5lckhlaWdodDtcbiAgICBpZiAodGhpcy4kZWxlbWVudC5jc3MoXCJkaXNwbGF5XCIpID09IFwibm9uZVwiKSB7XG4gICAgICBuZXdDb250YWluZXJIZWlnaHQgPSAwO1xuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IG5ld0NvbnRhaW5lckhlaWdodDtcbiAgICB0aGlzLiRjb250YWluZXIuY3NzKHtcbiAgICAgIGhlaWdodDogbmV3Q29udGFpbmVySGVpZ2h0XG4gICAgfSk7XG4gICAgdGhpcy5lbGVtSGVpZ2h0ID0gbmV3Q29udGFpbmVySGVpZ2h0O1xuXG4gICAgaWYgKCF0aGlzLmlzU3R1Y2spIHtcbiAgICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1hdC1ib3R0b20nKSkge1xuICAgICAgICB2YXIgYW5jaG9yUHQgPSAodGhpcy5wb2ludHMgPyB0aGlzLnBvaW50c1sxXSAtIHRoaXMuJGNvbnRhaW5lci5vZmZzZXQoKS50b3AgOiB0aGlzLmFuY2hvckhlaWdodCkgLSB0aGlzLmVsZW1IZWlnaHQ7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKCd0b3AnLCBhbmNob3JQdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0QnJlYWtQb2ludHMobmV3Q29udGFpbmVySGVpZ2h0LCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHsgY2IoKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHVwcGVyIGFuZCBsb3dlciBicmVha3BvaW50cyBmb3IgdGhlIGVsZW1lbnQgdG8gYmVjb21lIHN0aWNreS91bnN0aWNreS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVsZW1IZWlnaHQgLSBweCB2YWx1ZSBmb3Igc3RpY2t5LiRlbGVtZW50IGhlaWdodCwgY2FsY3VsYXRlZCBieSBgX3NldFNpemVzYC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gY29tcGxldGlvbi5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRCcmVha1BvaW50cyhlbGVtSGVpZ2h0LCBjYikge1xuICAgIGlmICghdGhpcy5jYW5TdGljaykge1xuICAgICAgaWYgKGNiICYmIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgeyBjYigpOyB9XG4gICAgICBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfVxuICAgIHZhciBtVG9wID0gZW1DYWxjKHRoaXMub3B0aW9ucy5tYXJnaW5Ub3ApLFxuICAgICAgICBtQnRtID0gZW1DYWxjKHRoaXMub3B0aW9ucy5tYXJnaW5Cb3R0b20pLFxuICAgICAgICB0b3BQb2ludCA9IHRoaXMucG9pbnRzID8gdGhpcy5wb2ludHNbMF0gOiB0aGlzLiRhbmNob3Iub2Zmc2V0KCkudG9wLFxuICAgICAgICBib3R0b21Qb2ludCA9IHRoaXMucG9pbnRzID8gdGhpcy5wb2ludHNbMV0gOiB0b3BQb2ludCArIHRoaXMuYW5jaG9ySGVpZ2h0LFxuICAgICAgICAvLyB0b3BQb2ludCA9IHRoaXMuJGFuY2hvci5vZmZzZXQoKS50b3AgfHwgdGhpcy5wb2ludHNbMF0sXG4gICAgICAgIC8vIGJvdHRvbVBvaW50ID0gdG9wUG9pbnQgKyB0aGlzLmFuY2hvckhlaWdodCB8fCB0aGlzLnBvaW50c1sxXSxcbiAgICAgICAgd2luSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdGlja1RvID09PSAndG9wJykge1xuICAgICAgdG9wUG9pbnQgLT0gbVRvcDtcbiAgICAgIGJvdHRvbVBvaW50IC09IChlbGVtSGVpZ2h0ICsgbVRvcCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuc3RpY2tUbyA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHRvcFBvaW50IC09ICh3aW5IZWlnaHQgLSAoZWxlbUhlaWdodCArIG1CdG0pKTtcbiAgICAgIGJvdHRvbVBvaW50IC09ICh3aW5IZWlnaHQgLSBtQnRtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy90aGlzIHdvdWxkIGJlIHRoZSBzdGlja1RvOiBib3RoIG9wdGlvbi4uLiB0cmlja3lcbiAgICB9XG5cbiAgICB0aGlzLnRvcFBvaW50ID0gdG9wUG9pbnQ7XG4gICAgdGhpcy5ib3R0b21Qb2ludCA9IGJvdHRvbVBvaW50O1xuXG4gICAgaWYgKGNiICYmIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgeyBjYigpOyB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGN1cnJlbnQgc3RpY2t5IGVsZW1lbnQuXG4gICAqIFJlc2V0cyB0aGUgZWxlbWVudCB0byB0aGUgdG9wIHBvc2l0aW9uIGZpcnN0LlxuICAgKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycywgSlMtYWRkZWQgY3NzIHByb3BlcnRpZXMgYW5kIGNsYXNzZXMsIGFuZCB1bndyYXBzIHRoZSAkZWxlbWVudCBpZiB0aGUgSlMgYWRkZWQgdGhlICRjb250YWluZXIuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy5fcmVtb3ZlU3RpY2t5KHRydWUpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhgJHt0aGlzLm9wdGlvbnMuc3RpY2t5Q2xhc3N9IGlzLWFuY2hvcmVkIGlzLWF0LXRvcGApXG4gICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgIGhlaWdodDogJycsXG4gICAgICAgICAgICAgICAgICAgdG9wOiAnJyxcbiAgICAgICAgICAgICAgICAgICBib3R0b206ICcnLFxuICAgICAgICAgICAgICAgICAgICdtYXgtd2lkdGgnOiAnJ1xuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAub2ZmKCdyZXNpemVtZS56Zi50cmlnZ2VyJylcbiAgICAgICAgICAgICAgICAgLm9mZignbXV0YXRlbWUuemYudHJpZ2dlcicpO1xuICAgIGlmICh0aGlzLiRhbmNob3IgJiYgdGhpcy4kYW5jaG9yLmxlbmd0aCkge1xuICAgICAgdGhpcy4kYW5jaG9yLm9mZignY2hhbmdlLnpmLnN0aWNreScpO1xuICAgIH1cbiAgICAkKHdpbmRvdykub2ZmKHRoaXMuc2Nyb2xsTGlzdGVuZXIpO1xuXG4gICAgaWYgKHRoaXMud2FzV3JhcHBlZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC51bndyYXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kY29udGFpbmVyLnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5jb250YWluZXJDbGFzcylcbiAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcnXG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuU3RpY2t5LmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQ3VzdG9taXphYmxlIGNvbnRhaW5lciB0ZW1wbGF0ZS4gQWRkIHlvdXIgb3duIGNsYXNzZXMgZm9yIHN0eWxpbmcgYW5kIHNpemluZy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJmx0O2RpdiBkYXRhLXN0aWNreS1jb250YWluZXImZ3Q7Jmx0Oy9kaXYmZ3Q7J1xuICAgKi9cbiAgY29udGFpbmVyOiAnPGRpdiBkYXRhLXN0aWNreS1jb250YWluZXI+PC9kaXY+JyxcbiAgLyoqXG4gICAqIExvY2F0aW9uIGluIHRoZSB2aWV3IHRoZSBlbGVtZW50IHN0aWNrcyB0by4gQ2FuIGJlIGAndG9wJ2Agb3IgYCdib3R0b20nYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAndG9wJ1xuICAgKi9cbiAgc3RpY2tUbzogJ3RvcCcsXG4gIC8qKlxuICAgKiBJZiBhbmNob3JlZCB0byBhIHNpbmdsZSBlbGVtZW50LCB0aGUgaWQgb2YgdGhhdCBlbGVtZW50LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICBhbmNob3I6ICcnLFxuICAvKipcbiAgICogSWYgdXNpbmcgbW9yZSB0aGFuIG9uZSBlbGVtZW50IGFzIGFuY2hvciBwb2ludHMsIHRoZSBpZCBvZiB0aGUgdG9wIGFuY2hvci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgdG9wQW5jaG9yOiAnJyxcbiAgLyoqXG4gICAqIElmIHVzaW5nIG1vcmUgdGhhbiBvbmUgZWxlbWVudCBhcyBhbmNob3IgcG9pbnRzLCB0aGUgaWQgb2YgdGhlIGJvdHRvbSBhbmNob3IuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIGJ0bUFuY2hvcjogJycsXG4gIC8qKlxuICAgKiBNYXJnaW4sIGluIGBlbWAncyB0byBhcHBseSB0byB0aGUgdG9wIG9mIHRoZSBlbGVtZW50IHdoZW4gaXQgYmVjb21lcyBzdGlja3kuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMVxuICAgKi9cbiAgbWFyZ2luVG9wOiAxLFxuICAvKipcbiAgICogTWFyZ2luLCBpbiBgZW1gJ3MgdG8gYXBwbHkgdG8gdGhlIGJvdHRvbSBvZiB0aGUgZWxlbWVudCB3aGVuIGl0IGJlY29tZXMgc3RpY2t5LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDFcbiAgICovXG4gIG1hcmdpbkJvdHRvbTogMSxcbiAgLyoqXG4gICAqIEJyZWFrcG9pbnQgc3RyaW5nIHRoYXQgaXMgdGhlIG1pbmltdW0gc2NyZWVuIHNpemUgYW4gZWxlbWVudCBzaG91bGQgYmVjb21lIHN0aWNreS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnbWVkaXVtJ1xuICAgKi9cbiAgc3RpY2t5T246ICdtZWRpdW0nLFxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byBzdGlja3kgZWxlbWVudCwgYW5kIHJlbW92ZWQgb24gZGVzdHJ1Y3Rpb24uIEZvdW5kYXRpb24gZGVmYXVsdHMgdG8gYHN0aWNreWAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3N0aWNreSdcbiAgICovXG4gIHN0aWNreUNsYXNzOiAnc3RpY2t5JyxcbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gc3RpY2t5IGNvbnRhaW5lci4gRm91bmRhdGlvbiBkZWZhdWx0cyB0byBgc3RpY2t5LWNvbnRhaW5lcmAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3N0aWNreS1jb250YWluZXInXG4gICAqL1xuICBjb250YWluZXJDbGFzczogJ3N0aWNreS1jb250YWluZXInLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHNjcm9sbCBldmVudHMgYmV0d2VlbiB0aGUgcGx1Z2luJ3MgcmVjYWxjdWxhdGluZyBzdGlja3kgcG9pbnRzLiBTZXR0aW5nIGl0IHRvIGAwYCB3aWxsIGNhdXNlIGl0IHRvIHJlY2FsYyBldmVyeSBzY3JvbGwgZXZlbnQsIHNldHRpbmcgaXQgdG8gYC0xYCB3aWxsIHByZXZlbnQgcmVjYWxjIG9uIHNjcm9sbC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAtMVxuICAgKi9cbiAgY2hlY2tFdmVyeTogLTFcbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSBlbSB2YWx1ZXNcbiAqIEBwYXJhbSBOdW1iZXIge2VtfSAtIG51bWJlciBvZiBlbSdzIHRvIGNhbGN1bGF0ZSBpbnRvIHBpeGVsc1xuICovXG5mdW5jdGlvbiBlbUNhbGMoZW0pIHtcbiAgcmV0dXJuIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHksIG51bGwpLmZvbnRTaXplLCAxMCkgKiBlbTtcbn1cblxuZXhwb3J0IHtTdGlja3l9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zdGlja3kuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcblxuLyoqXG4gKiBUb2dnbGVyIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi50b2dnbGVyXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1vdGlvblxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICovXG5cbmNsYXNzIFRvZ2dsZXIgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBUb2dnbGVyLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgVG9nZ2xlclxuICAgKiBAZmlyZXMgVG9nZ2xlciNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBhZGQgdGhlIHRyaWdnZXIgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFRvZ2dsZXIuZGVmYXVsdHMsIGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICcnO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1RvZ2dsZXInOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIC8vIFRyaWdnZXJzIGluaXQgaXMgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBpcyBpbml0aWFsaXplZFxuICAgIFRyaWdnZXJzLmluaXQoJCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIFRvZ2dsZXIgcGx1Z2luIGJ5IHBhcnNpbmcgdGhlIHRvZ2dsZSBjbGFzcyBmcm9tIGRhdGEtdG9nZ2xlciwgb3IgYW5pbWF0aW9uIGNsYXNzZXMgZnJvbSBkYXRhLWFuaW1hdGUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIGlucHV0O1xuICAgIC8vIFBhcnNlIGFuaW1hdGlvbiBjbGFzc2VzIGlmIHRoZXkgd2VyZSBzZXRcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGUpIHtcbiAgICAgIGlucHV0ID0gdGhpcy5vcHRpb25zLmFuaW1hdGUuc3BsaXQoJyAnKTtcblxuICAgICAgdGhpcy5hbmltYXRpb25JbiA9IGlucHV0WzBdO1xuICAgICAgdGhpcy5hbmltYXRpb25PdXQgPSBpbnB1dFsxXSB8fCBudWxsO1xuICAgIH1cbiAgICAvLyBPdGhlcndpc2UsIHBhcnNlIHRvZ2dsZSBjbGFzc1xuICAgIGVsc2Uge1xuICAgICAgaW5wdXQgPSB0aGlzLiRlbGVtZW50LmRhdGEoJ3RvZ2dsZXInKTtcbiAgICAgIC8vIEFsbG93IGZvciBhIC4gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc3RyaW5nXG4gICAgICB0aGlzLmNsYXNzTmFtZSA9IGlucHV0WzBdID09PSAnLicgPyBpbnB1dC5zbGljZSgxKSA6IGlucHV0O1xuICAgIH1cblxuICAgIC8vIEFkZCBBUklBIGF0dHJpYnV0ZXMgdG8gdHJpZ2dlcnNcbiAgICB2YXIgaWQgPSB0aGlzLiRlbGVtZW50WzBdLmlkO1xuICAgICQoYFtkYXRhLW9wZW49XCIke2lkfVwiXSwgW2RhdGEtY2xvc2U9XCIke2lkfVwiXSwgW2RhdGEtdG9nZ2xlPVwiJHtpZH1cIl1gKVxuICAgICAgLmF0dHIoJ2FyaWEtY29udHJvbHMnLCBpZCk7XG4gICAgLy8gSWYgdGhlIHRhcmdldCBpcyBoaWRkZW4sIGFkZCBhcmlhLWhpZGRlblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1leHBhbmRlZCcsIHRoaXMuJGVsZW1lbnQuaXMoJzpoaWRkZW4nKSA/IGZhbHNlIDogdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgZXZlbnRzIGZvciB0aGUgdG9nZ2xlIHRyaWdnZXIuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZigndG9nZ2xlLnpmLnRyaWdnZXInKS5vbigndG9nZ2xlLnpmLnRyaWdnZXInLCB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB0YXJnZXQgY2xhc3Mgb24gdGhlIHRhcmdldCBlbGVtZW50LiBBbiBldmVudCBpcyBmaXJlZCBmcm9tIHRoZSBvcmlnaW5hbCB0cmlnZ2VyIGRlcGVuZGluZyBvbiBpZiB0aGUgcmVzdWx0YW50IHN0YXRlIHdhcyBcIm9uXCIgb3IgXCJvZmZcIi5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBUb2dnbGVyI29uXG4gICAqIEBmaXJlcyBUb2dnbGVyI29mZlxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXNbIHRoaXMub3B0aW9ucy5hbmltYXRlID8gJ190b2dnbGVBbmltYXRlJyA6ICdfdG9nZ2xlQ2xhc3MnXSgpO1xuICB9XG5cbiAgX3RvZ2dsZUNsYXNzKCkge1xuICAgIHRoaXMuJGVsZW1lbnQudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc05hbWUpO1xuXG4gICAgdmFyIGlzT24gPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKHRoaXMuY2xhc3NOYW1lKTtcbiAgICBpZiAoaXNPbikge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaGFzIHRoZSBjbGFzcyBhZnRlciBhIHRvZ2dsZS5cbiAgICAgICAqIEBldmVudCBUb2dnbGVyI29uXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignb24uemYudG9nZ2xlcicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgaWYgdGhlIHRhcmdldCBlbGVtZW50IGRvZXMgbm90IGhhdmUgdGhlIGNsYXNzIGFmdGVyIGEgdG9nZ2xlLlxuICAgICAgICogQGV2ZW50IFRvZ2dsZXIjb2ZmXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignb2ZmLnpmLnRvZ2dsZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVBUklBKGlzT24pO1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtbXV0YXRlXScpLnRyaWdnZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInKTtcbiAgfVxuXG4gIF90b2dnbGVBbmltYXRlKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy4kZWxlbWVudC5pcygnOmhpZGRlbicpKSB7XG4gICAgICBNb3Rpb24uYW5pbWF0ZUluKHRoaXMuJGVsZW1lbnQsIHRoaXMuYW5pbWF0aW9uSW4sIGZ1bmN0aW9uKCkge1xuICAgICAgICBfdGhpcy5fdXBkYXRlQVJJQSh0cnVlKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdvbi56Zi50b2dnbGVyJyk7XG4gICAgICAgIHRoaXMuZmluZCgnW2RhdGEtbXV0YXRlXScpLnRyaWdnZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIE1vdGlvbi5hbmltYXRlT3V0KHRoaXMuJGVsZW1lbnQsIHRoaXMuYW5pbWF0aW9uT3V0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuX3VwZGF0ZUFSSUEoZmFsc2UpO1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ29mZi56Zi50b2dnbGVyJyk7XG4gICAgICAgIHRoaXMuZmluZCgnW2RhdGEtbXV0YXRlXScpLnRyaWdnZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVBUklBKGlzT24pIHtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09uID8gdHJ1ZSA6IGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgaW5zdGFuY2Ugb2YgVG9nZ2xlciBvbiB0aGUgZWxlbWVudC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRvZ2dsZXInKTtcbiAgfVxufVxuXG5Ub2dnbGVyLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogVGVsbHMgdGhlIHBsdWdpbiBpZiB0aGUgZWxlbWVudCBzaG91bGQgYW5pbWF0ZWQgd2hlbiB0b2dnbGVkLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYW5pbWF0ZTogZmFsc2Vcbn07XG5cbmV4cG9ydCB7VG9nZ2xlcn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRvZ2dsZXIuanMiXSwic291cmNlUm9vdCI6IiJ9