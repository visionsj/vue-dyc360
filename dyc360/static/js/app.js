webpackJsonp([15,13],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(15);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(275);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _router = __webpack_require__(135);

	var _router2 = _interopRequireDefault(_router);

	var _store = __webpack_require__(138);

	var _store2 = _interopRequireDefault(_store);

	var _vueResource = __webpack_require__(274);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	var _env = __webpack_require__(105);

	__webpack_require__(131);

	var _fastClick = __webpack_require__(132);

	var _fastClick2 = _interopRequireDefault(_fastClick);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function () {
			_fastClick2.default.attach(document.body);
		}, false);
	}

	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_vueResource2.default);

	_vue2.default.http.interceptors.push(function (request, next) {
		next(function (response) {
			if (response.data.retCode == "-104") {
				window.location.href = "/#/login";
			} else {
				return response;
			}
		});
	});

	var router = new _vueRouter2.default({
		routes: _router2.default,
		mode: _env.routerMode
	});

	var app = new _vue2.default({
		router: router,
		store: _store2.default
	}).$mount('#app');

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.animate = exports.showBack = exports.loadMore = exports.getStyle = exports.removeStore = exports.getStore = exports.setStore = undefined;

	var _keys = __webpack_require__(160);

	var _keys2 = _interopRequireDefault(_keys);

	var _stringify = __webpack_require__(157);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setStore = exports.setStore = function setStore(name, content) {
	    if (!name) return;
	    if (typeof content !== 'string') {
	        content = (0, _stringify2.default)(content);
	    }
	    window.localStorage.setItem(name, content);
	};

	var getStore = exports.getStore = function getStore(name) {
	    if (!name) return;
	    return window.localStorage.getItem(name);
	};

	var removeStore = exports.removeStore = function removeStore(name) {
	    if (!name) return;
	    window.localStorage.removeItem(name);
	};

	var getStyle = exports.getStyle = function getStyle(element, attr) {
	    var NumberMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'int';

	    var target = void 0;

	    if (attr === 'scrollTop') {
	        target = element.scrollTop;
	    } else if (element.currentStyle) {
	        target = element.currentStyle[attr];
	    } else {
	        target = document.defaultView.getComputedStyle(element, null)[attr];
	    }

	    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
	};

	var loadMore = exports.loadMore = function loadMore(element, callback) {
	    var windowHeight = window.screen.height;
	    var height = void 0;
	    var setTop = void 0;
	    var paddingBottom = void 0;
	    var marginBottom = void 0;
	    var requestFram = void 0;
	    var oldScrollTop = void 0;

	    document.body.addEventListener('scroll', function () {
	        loadMore();
	    }, false);

	    element.addEventListener('touchstart', function () {
	        height = element.offsetHeight;
	        setTop = element.offsetTop;
	        paddingBottom = getStyle(element, 'paddingBottom');
	        marginBottom = getStyle(element, 'marginBottom');
	    }, { passive: true });

	    element.addEventListener('touchmove', function () {
	        loadMore();
	    }, { passive: true });

	    element.addEventListener('touchend', function () {
	        oldScrollTop = document.body.scrollTop;
	        moveEnd();
	    }, { passive: true });

	    var moveEnd = function moveEnd() {
	        requestFram = requestAnimationFrame(function () {
	            if (document.body.scrollTop != oldScrollTop) {
	                oldScrollTop = document.body.scrollTop;
	                loadMore();
	                moveEnd();
	            } else {
	                cancelAnimationFrame(requestFram);

	                height = element.offsetHeight;
	                loadMore();
	            }
	        });
	    };

	    var loadMore = function loadMore() {
	        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
	            callback();
	        }
	    };
	};

	var showBack = exports.showBack = function showBack(callback) {
	    var requestFram = void 0;
	    var oldScrollTop = void 0;

	    document.addEventListener('scroll', function () {
	        showBackFun();
	    }, false);
	    document.addEventListener('touchstart', function () {
	        showBackFun();
	    }, { passive: true });

	    document.addEventListener('touchmove', function () {
	        showBackFun();
	    }, { passive: true });

	    document.addEventListener('touchend', function () {
	        oldScrollTop = document.body.scrollTop;
	        moveEnd();
	    }, { passive: true });

	    var moveEnd = function moveEnd() {
	        requestFram = requestAnimationFrame(function () {
	            if (document.body.scrollTop != oldScrollTop) {
	                oldScrollTop = document.body.scrollTop;
	                moveEnd();
	            } else {
	                cancelAnimationFrame(requestFram);
	            }
	            showBackFun();
	        });
	    };

	    var showBackFun = function showBackFun() {
	        if (document.body.scrollTop > 500) {
	            callback(true);
	        } else {
	            callback(false);
	        }
	    };
	};

	var animate = exports.animate = function animate(element, target) {
	    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
	    var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'ease-out';
	    var callback = arguments[4];

	    clearInterval(element.timer);

	    if (duration instanceof Function) {
	        callback = duration;
	        duration = 400;
	    } else if (duration instanceof String) {
	        mode = duration;
	        duration = 400;
	    }

	    if (mode instanceof Function) {
	        callback = mode;
	        mode = 'ease-out';
	    }

	    var attrStyle = function attrStyle(attr) {
	        if (attr === "opacity") {
	            return Math.round(getStyle(element, attr, 'float') * 100);
	        } else {
	            return getStyle(element, attr);
	        }
	    };

	    var rootSize = parseFloat(document.documentElement.style.fontSize);

	    var unit = {};
	    var initState = {};

	    (0, _keys2.default)(target).forEach(function (attr) {
	        if (/[^\d^\.]+/gi.test(target[attr])) {
	            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
	        } else {
	            unit[attr] = 'px';
	        }
	        initState[attr] = attrStyle(attr);
	    });

	    (0, _keys2.default)(target).forEach(function (attr) {
	        if (unit[attr] == 'rem') {
	            target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
	        } else {
	            target[attr] = parseInt(target[attr]);
	        }
	    });

	    var flag = true;
	    var remberSpeed = {};
	    element.timer = setInterval(function () {
	        (0, _keys2.default)(target).forEach(function (attr) {
	            var iSpeed = 0;
	            var status = false;
	            var iCurrent = attrStyle(attr) || 0;
	            var speedBase = 0;
	            var intervalTime = void 0;
	            switch (mode) {
	                case 'ease-out':
	                    speedBase = iCurrent;
	                    intervalTime = duration * 5 / 400;
	                    break;
	                case 'linear':
	                    speedBase = initState[attr];
	                    intervalTime = duration * 20 / 400;
	                    break;
	                case 'ease-in':
	                    var oldspeed = remberSpeed[attr] || 0;
	                    iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
	                    remberSpeed[attr] = iSpeed;
	                    break;
	                default:
	                    speedBase = iCurrent;
	                    intervalTime = duration * 5 / 400;
	            }
	            if (mode !== 'ease-in') {
	                iSpeed = (target[attr] - speedBase) / intervalTime;
	                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	            }

	            switch (mode) {
	                case 'ease-out':
	                    status = iCurrent != target[attr];
	                    break;
	                case 'linear':
	                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
	                    break;
	                case 'ease-in':
	                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
	                    break;
	                default:
	                    status = iCurrent != target[attr];
	            }

	            if (status) {
	                flag = false;

	                if (attr === "opacity") {
	                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
	                    element.style.opacity = (iCurrent + iSpeed) / 100;
	                } else if (attr === 'scrollTop') {
	                    element.scrollTop = iCurrent + iSpeed;
	                } else {
	                    element.style[attr] = iCurrent + iSpeed + 'px';
	                }
	            } else {
	                flag = true;
	            }

	            if (flag) {
	                clearInterval(element.timer);
	                if (callback) {
	                    callback();
	                }
	            }
	        });
	    }, 20);
	};

/***/ },

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var baseUrl = void 0;
	var routerMode = void 0;
	var imgBaseUrl = 'https://www.dyc360.com';

	if (false) {
	  exports.baseUrl = baseUrl = '';
	  exports.routerMode = routerMode = 'hash';
	} else {
	  exports.baseUrl = baseUrl = 'https://www.dyc360.com';
	  exports.routerMode = routerMode = 'hash';
	}

	exports.baseUrl = baseUrl;
	exports.routerMode = routerMode;
	exports.imgBaseUrl = imgBaseUrl;

/***/ },

/***/ 131:
/***/ function(module, exports) {

	'use strict';

	(function (doc, win) {
	    var docEl = doc.documentElement,
	        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	        recalc = function recalc() {
	        var clientWidth = docEl.clientWidth;
	        if (!clientWidth) return;
	        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
	    };
	    if (!doc.addEventListener) return;
	    win.addEventListener(resizeEvt, recalc, false);
	    doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);

/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof2 = __webpack_require__(110);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;
	(function () {
		'use strict';

		/**
	  * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	  *
	  * @codingstandard ftlabs-jsv2
	  * @copyright The Financial Times Limited [All Rights Reserved]
	  * @license MIT License (see LICENSE.txt)
	  */

		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			this.trackingClick = false;

			this.trackingClickStart = 0;

			this.targetElement = null;

			this.touchStartX = 0;

			this.touchStartY = 0;

			this.lastTouchIdentifier = 0;

			this.touchBoundary = options.touchBoundary || 10;

			this.layer = layer;

			this.tapDelay = options.tapDelay || 200;

			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			function bind(method, context) {
				return function () {
					return method.apply(context, arguments);
				};
			}

			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function (type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function (type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			if (typeof layer.onclick === 'function') {
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function (event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

		var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

		var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		FastClick.prototype.needsClick = function (target) {
			switch (target.nodeName.toLowerCase()) {
				case 'button':
				case 'select':
				case 'textarea':
					if (target.disabled) {
						return true;
					}

					break;
				case 'input':
					if (deviceIsIOS && target.type === 'file' || target.disabled) {
						return true;
					}

					break;
				case 'label':
				case 'iframe':
				case 'video':
					return true;
			}

			return (/\bneedsclick\b/.test(target.className)
			);
		};

		FastClick.prototype.needsFocus = function (target) {
			switch (target.nodeName.toLowerCase()) {
				case 'textarea':
					return true;
				case 'select':
					return !deviceIsAndroid;
				case 'input':
					switch (target.type) {
						case 'button':
						case 'checkbox':
						case 'file':
						case 'image':
						case 'radio':
						case 'submit':
							return false;
					}

					return !target.disabled && !target.readOnly;
				default:
					return (/\bneedsfocus\b/.test(target.className)
					);
			}
		};

		FastClick.prototype.sendClick = function (targetElement, event) {
			var clickEvent, touch;

			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function (targetElement) {
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};

		FastClick.prototype.focus = function (targetElement) {
			var length;

			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};

		FastClick.prototype.updateScrollParent = function (targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};

		FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};

		FastClick.prototype.onTouchStart = function (event) {
			var targetElement, touch, selection;

			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			if (event.timeStamp - this.lastClickTime < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};

		FastClick.prototype.touchHasMoved = function (event) {
			var touch = event.changedTouches[0],
			    boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};

		FastClick.prototype.onTouchMove = function (event) {
			if (!this.trackingClick) {
				return true;
			}

			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};

		FastClick.prototype.findControl = function (labelElement) {
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};

		FastClick.prototype.onTouchEnd = function (event) {
			var forElement,
			    trackingClickStart,
			    targetTagName,
			    scrollParent,
			    touch,
			    targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			if (event.timeStamp - this.lastClickTime < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
				return true;
			}

			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
				if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};

		FastClick.prototype.onTouchCancel = function () {
			this.trackingClick = false;
			this.targetElement = null;
		};

		FastClick.prototype.onMouse = function (event) {
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			if (!event.cancelable) {
				return true;
			}

			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
					event.propagationStopped = true;
				}

				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			return true;
		};

		FastClick.prototype.onClick = function (event) {
			var permitted;

			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			if (!permitted) {
				this.targetElement = null;
			}

			return permitted;
		};

		FastClick.prototype.destroy = function () {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};

		FastClick.notNeeded = function (layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}

						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}

						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (firefoxVersion >= 27) {

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};

		FastClick.attach = function (layer, options) {
			return new FastClick(layer, options);
		};

		if ("function" === 'function' && (0, _typeof3.default)(__webpack_require__(130)) === 'object' && __webpack_require__(130)) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	})();

/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _App = __webpack_require__(242);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var home = function home(r) {
	    return __webpack_require__.e/* nsure */(0, function () {
	        return r(__webpack_require__(244));
	    });
	};
	var invest = function invest(r) {
	    return __webpack_require__.e/* nsure */(7, function () {
	        return r(__webpack_require__(246));
	    });
	};
	var login = function login(r) {
	    return __webpack_require__.e/* nsure */(8, function () {
	        return r(__webpack_require__(248));
	    });
	};
	var register = function register(r) {
	    return __webpack_require__.e/* nsure */(9, function () {
	        return r(__webpack_require__(249));
	    });
	};
	var forgetPassword = function forgetPassword(r) {
	    return __webpack_require__.e/* nsure */(10, function () {
	        return r(__webpack_require__(247));
	    });
	};
	var more = function more(r) {
	    return __webpack_require__.e/* nsure */(2, function () {
	        return r(__webpack_require__(256));
	    });
	};
	var usersSet = function usersSet(r) {
	    return __webpack_require__.e/* nsure */(3, function () {
	        return r(__webpack_require__(255));
	    });
	};
	var appHelpContent = function appHelpContent(r) {
	    return __webpack_require__.e/* nsure */(11, function () {
	        return r(__webpack_require__(254));
	    });
	};
	var appHelpList = function appHelpList(r) {
	    return __webpack_require__.e/* nsure */(6, function () {
	        return r(__webpack_require__(251));
	    });
	};
	var appNewsList = function appNewsList(r) {
	    return __webpack_require__.e/* nsure */(5, function () {
	        return r(__webpack_require__(252));
	    });
	};
	var appNoticeList = function appNoticeList(r) {
	    return __webpack_require__.e/* nsure */(4, function () {
	        return r(__webpack_require__(253));
	    });
	};
	var appAbout = function appAbout(r) {
	    return __webpack_require__.e/* nsure */(12, function () {
	        return r(__webpack_require__(250));
	    });
	};

	var usersMain = function usersMain(r) {
	    return __webpack_require__.e/* nsure */(1, function () {
	        return r(__webpack_require__(257));
	    });
	};

	exports.default = [{
	    path: '/',
	    component: _App2.default,
	    children: [{
	        path: '',
	        redirect: '/home'
	    }, {
	        path: '/home',
	        component: home
	    }, {
	        path: '/invest',
	        component: invest
	    }, {
	        path: '/login',
	        component: login
	    }, {
	        path: '/register',
	        component: register
	    }, {
	        path: '/forgetPassword',
	        component: forgetPassword
	    }, {
	        path: '/more',
	        component: more,
	        children: [{
	            path: 'usersSet',
	            component: usersSet
	        }]
	    }, {
	        path: '/appHelpList',
	        component: appHelpList,
	        children: [{
	            path: 'appHelpContent',
	            component: appHelpContent
	        }]
	    }, {
	        path: '/appNewsList',
	        component: appNewsList,
	        children: [{
	            path: 'appHelpContent',
	            component: appHelpContent
	        }]
	    }, {
	        path: '/appNoticeList',
	        component: appNoticeList,
	        children: [{
	            path: 'appHelpContent',
	            component: appHelpContent
	        }]
	    }, {
	        path: '/appAbout',
	        component: appAbout
	    }, {
	        path: '/usersMain',
	        component: usersMain
	    }]
	}];

/***/ },

/***/ 136:
/***/ function(module, exports) {

	"use strict";

/***/ },

/***/ 137:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {};

/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vue = __webpack_require__(15);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(104);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _mutations = __webpack_require__(140);

	var _mutations2 = _interopRequireDefault(_mutations);

	var _action = __webpack_require__(136);

	var _action2 = _interopRequireDefault(_action);

	var _getters = __webpack_require__(137);

	var _getters2 = _interopRequireDefault(_getters);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vuex2.default);

	var state = {
		userInfo: null,
		login: true };

	exports.default = new _vuex2.default.Store({
		state: state,
		getters: _getters2.default,
		actions: _action2.default,
		mutations: _mutations2.default
	});

/***/ },

/***/ 139:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GET_USERINFO = exports.GET_USERINFO = 'GET_USERINFO';
	var RECORD_USERINFO = exports.RECORD_USERINFO = 'RECORD_USERINFO';
	var OUT_LOGIN = exports.OUT_LOGIN = 'OUT_LOGIN';

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _defineProperty2 = __webpack_require__(163);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _RECORD_USERINFO$GET_;

	var _mutationTypes = __webpack_require__(139);

	var _mUtils = __webpack_require__(67);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (_RECORD_USERINFO$GET_ = {}, (0, _defineProperty3.default)(_RECORD_USERINFO$GET_, _mutationTypes.RECORD_USERINFO, function (state, info) {
		state.userInfoNew = info;
		state.login = true;

		var validity = 30;
		var now = new Date();
		now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
		(0, _mUtils.setStore)('login', true);
	}), (0, _defineProperty3.default)(_RECORD_USERINFO$GET_, _mutationTypes.GET_USERINFO, function (state, info) {
		if (!state.login) {
			return;
		}
		if (!info.message) {
			state.userInfoNew = info;
		} else {
			state.userInfoNew = null;
		}
	}), (0, _defineProperty3.default)(_RECORD_USERINFO$GET_, _mutationTypes.OUT_LOGIN, function (state) {
		state.userInfoNew = null;
		state.login = false;
		(0, _mUtils.setStore)('login', false);
	}), _RECORD_USERINFO$GET_);

/***/ },

/***/ 141:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {};

/***/ },

/***/ 212:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(212)

	var Component = __webpack_require__(14)(
	  /* script */
	  __webpack_require__(141),
	  /* template */
	  __webpack_require__(270),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 270:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": "router-fade",
	      "mode": "out-in"
	    }
	  }, [_c('router-view')], 1)
	},staticRenderFns: []}

/***/ },

/***/ 276:
/***/ function(module, exports) {

	/* (ignored) */

/***/ }

});