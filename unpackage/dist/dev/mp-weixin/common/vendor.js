(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"财富乐","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 17:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 18);

/***/ }),

/***/ 18:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 19);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 19:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"财富乐","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"财富乐","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"财富乐","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"财富乐","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 236:
/*!****************************************!*\
  !*** E:/前端/uniapp/财富乐/lib/amp-appx.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function AMapWX(a) {
  this.key = a.key, this.requestConfig = {
    key: a.key,
    s: "rsx",
    platform: "WXJS",
    appname: a.key,
    sdkversion: "1.2.0",
    logversion: "2.0" };

}
AMapWX.prototype.getWxLocation = function (a, b) {
  uni.getLocation({
    type: "gcj02",
    success: function success(a) {
      var c = a.longitude + "," + a.latitude;
      uni.setStorage({
        key: "userLocation",
        data: c }),
      b(c);
    },
    fail: function fail(c) {
      uni.getStorage({
        key: "userLocation",
        success: function success(a) {
          a.data && b(a.data);
        } }),
      a.fail({
        errCode: "0",
        errMsg: c.errMsg || "" });

    } });

}, AMapWX.prototype.getRegeo = function (a) {
  function c(c) {
    var d = b.requestConfig;
    uni.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: b.key,
        location: c,
        extensions: "all",
        s: d.s,
        platform: d.platform,
        appname: b.key,
        sdkversion: d.sdkversion,
        logversion: d.logversion },

      method: "GET",
      header: {
        "content-type": "application/json" },

      success: function success(b) {
        var d, e, f, g, h, i, j, k, l;
        b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[
        0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.
        pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i =
        parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(
        e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street),
        f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(
        k)), f = f.join(""), l = [{
          iconPath: a.iconPath,
          width: a.iconWidth,
          height: a.iconHeight,
          name: f,
          desc: g,
          longitude: h,
          latitude: i,
          id: 0,
          regeocodeData: d }],
        a.success(l)) : a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info });

      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || "" });

      } });

  }
  var b = this;
  a.location ? c(a.location) : b.getWxLocation(a, function (a) {
    c(a);
  });
}, AMapWX.prototype.getWeather = function (a) {
  function d(d) {
    var e = "base";
    a.type && "forecast" == a.type && (e = "all"), uni.request({
      url: "https://restapi.amap.com/v3/weather/weatherInfo",
      data: {
        key: b.key,
        city: d,
        extensions: e,
        s: c.s,
        platform: c.platform,
        appname: b.key,
        sdkversion: c.sdkversion,
        logversion: c.logversion },

      method: "GET",
      header: {
        "content-type": "application/json" },

      success: function success(b) {
        function c(a) {
          var b = {
            city: {
              text: "城市",
              data: a.city },

            weather: {
              text: "天气",
              data: a.weather },

            temperature: {
              text: "温度",
              data: a.temperature },

            winddirection: {
              text: "风向",
              data: a.winddirection + "风" },

            windpower: {
              text: "风力",
              data: a.windpower + "级" },

            humidity: {
              text: "湿度",
              data: a.humidity + "%" } };


          return b;
        }
        var d, e;
        b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(
        d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({
          forecast: b.data.forecasts[0] }) :
        a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info });

      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || "" });

      } });

  }

  function e(e) {
    uni.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: b.key,
        location: e,
        extensions: "all",
        s: c.s,
        platform: c.platform,
        appname: b.key,
        sdkversion: c.sdkversion,
        logversion: c.logversion },

      method: "GET",
      header: {
        "content-type": "application/json" },

      success: function success(b) {
        var c, e;
        b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode :
        e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info });

      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || "" });

      } });

  }
  var b = this,
  c = b.requestConfig;
  a.city ? d(a.city) : b.getWxLocation(a, function (a) {
    e(a);
  });
}, AMapWX.prototype.getPoiAround = function (a) {
  function d(d) {
    var e = {
      key: b.key,
      location: d,
      s: c.s,
      platform: c.platform,
      appname: b.key,
      sdkversion: c.sdkversion,
      logversion: c.logversion };

    a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), uni.request({
      url: "https://restapi.amap.com/v3/place/around",
      data: e,
      method: "GET",
      header: {
        "content-type": "application/json" },

      success: function success(b) {
        var c, d, e, f;
        if (b.data.status && "1" == b.data.status) {
          if (b = b.data, b && b.pois) {
            for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({
                latitude: parseFloat(b.pois[d].location.split(",")[1]),
                longitude: parseFloat(b.pois[d].location.split(",")[0]),
                iconPath: e,
                width: 22,
                height: 32,
                id: d,
                name: b.pois[d].name,
                address: b.pois[d].address });}

            f = {
              markers: c,
              poisData: b.pois },
            a.success(f);
          }
        } else a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info });

      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || "" });

      } });

  }
  var b = this,
  c = b.requestConfig;
  a.location ? d(a.location) : b.getWxLocation(a, function (a) {
    d(a);
  });
}, AMapWX.prototype.getStaticmap = function (a) {
  function f(b) {
    c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push(
    "scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths &&
    c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);
    var e = d + c.join("&");
    a.success({
      url: e });

  }
  var e,b = this,
  c = [],
  d = "https://restapi.amap.com/v3/staticmap?";
  c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" +
  e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) :
  b.getWxLocation(a, function (a) {
    f(a);
  });
}, AMapWX.prototype.getInputtips = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type),
  a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), uni.request({
    url: "https://restapi.amap.com/v3/assistant/inputtips",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      b && b.data && b.data.tips && a.success({
        tips: b.data.tips });

    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, AMapWX.prototype.getDrivingRoute = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d[
  "strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] =
  a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), uni.request({
    url: "https://restapi.amap.com/v3/direction/driving",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      b && b.data && b.data.route && a.success({
        paths: b.data.route.paths,
        taxi_cost: b.data.route.taxi_cost || "" });

    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, AMapWX.prototype.getWalkingRoute = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), uni.request({
    url: "https://restapi.amap.com/v3/direction/walking",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      b && b.data && b.data.route && a.success({
        paths: b.data.route.paths });

    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, AMapWX.prototype.getTransitRoute = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d[
  "strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), uni.request({
    url: "https://restapi.amap.com/v3/direction/transit/integrated",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      if (b && b.data && b.data.route) {
        var c = b.data.route;
        a.success({
          distance: c.distance || "",
          taxi_cost: c.taxi_cost || "",
          transits: c.transits });

      }
    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, AMapWX.prototype.getRidingRoute = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), uni.request({
    url: "https://restapi.amap.com/v4/direction/bicycling",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      b && b.data && b.data.data && a.success({
        paths: b.data.data.paths });

    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, module.exports.AMapWX = AMapWX;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 267:
/*!******************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/taobao.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 268:
/*!**************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/99.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 269:
/*!*****************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/goods.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 270:
/*!****************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/shop.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAF8UlEQVRYR82Za4xVVxXHf/997r0zgzxaYeaWGWolPKpgNbb1A4LGRhO0xPaDpkEqwSYE22ijolHjk8ZCpVqNsUxbGm1MSUypH4ypxibVYAI+GpsWSUm0tFikCO0Mr3ncmXvu2X9zZoChwMxch4GZ9fFk77X+e5211/qvtcUw4q+1vg0VfmT8HsB4uJXj9F1KwPvkdD2bD+9VbvMc0YVM+UtzmmKBdZK+BZo1TnBGVyP3OvJY6D3+XW3p6hwVrEF8efb1VnEb8rWgCx5odMtjXeHXYuYvJP85+Gs9SXa2lvOAeF3rrDg9uV/odqA0VpNj3+cI7BLVNfrhkf3DgvUGAifbbjbhYVDb2A1e9M4TwvfSnbVr66He09re5Fl/flari42PgpYDyUWbHKsCEYneK9VW8uOhy3YGrNdRpLFtlaUfgJrHamfc9sk9Mg9S6blPW4+dyPUOgf3snAVu4HHM+0Bh3IyOWZGNtF/Etbz1tT9pA3EArNe1TqEY7rb0DWD6mPWP/8bU9vaQxi9q66GOQbBry3NdKm5HXI8ng1fPPrVfldOVPHTkb/LdNNDfttJBD4Bmjr9zLlJjHruRhwhdm+Q757Q5YwuBFViFi1R9CbY7L7svqpquku9ofb+TsA2YewksjZfK12W+mYP9iqWvT8oQOHNU9wieVLam7QnBx5GaxssN467HrgE7FT/d+nek906O3DrMMeWIeUFxVdu/gPmXn139P/7PCwQvKn6qbTfmukkNdtCzexRva/096KaJoYN1ezfntc/Kn5h9n6W7gBl1b738C/uB38m3zl7uQM5frzmb2Fx+PCNa7BTeKH+4pRynJveAPgM0TDKQIEejHUm1epcGeq4V5cUO4TFPPiKTl9qXg/kcTx16ZpB1QZJ9tLxCIXwfyJvEOvls3i/Vu3bgn+X9VZ26seCgHe8Pxws/018OVobI9w0Us5nl5SGEbxuuw4xU0fITvy7xvOEdmKtHaYPyH/hfyXtsFiHa8AigpSrm1UD8CVn/Nj1zTqcw4OEPUUiLze9KSNYCN4NawFOGcrDzFNIDOgzZIyGtbadYWGSS9YYbgGmnUuApJzhF6rb9MvLDSTV9OkuKS0m0XmgB9lRQ8dQ9yR3QJ9Fpe2dQ/DmdhV16bpiG8fTl8rIZV1JqWhClWyVutCkLYoQDcvxrkP7AG4f30jytkSzJKjFMa0pKN8WgDwgvNFwhUTF6BXtXyLKn6aq9wbRaEbq6ic1XU0o+Es0HDfMEDRJHbe2OZE8VKvoHfz6SdwZ52JyR8+cGeUwtmX4FaipQ6o0kTQlprVQBmmrFfrK0j0JwLYR3h0R3RutQoZo9SiXtyMH0xsbilCQmpIoU+qskhRTC1Ejxk8CNwTxB1reTwokUpjVWKDY2RYRDDfpywgKJzI6uY2K0IccSmrLiVbcJPkbUs1FxdyHjCEkaUcMsYnZNDGEx6BZgHrgq9LzwHyG+BOwni52IqZkKcxMxz2aZg5ZgT0ccwvzW9guO/neMOlwqKKsFzQyRxSguw/pnSPp+qh3Hj4/s2fk0xPLsO5C/hylK9Bqlg0nDRVAJuQlrylARGZii5LGcV5p+RIrJu44GcJ673wL54O2M5D+qkh8UVD1Ld36pC9i/CCcr39GeE8dGBruIUjajvFrSZmAierJeTHuo9t+r5wazwGk5P2ZzsFMnFGwPxPZQSzfWD9YT5tkeFNtDVi/YKeXVQpvxhITBIFjXC7bhVBhMJFjVC7ZQXq0wgWEQY3voTjfqlTouGIXy6piHwcRkg8ELVhfY+TRkpZY1Cto0QWB7sR8JlfSe0T0LpeydLSuD9IDh8j1+nMmm7sbeEtJsk/YdPTlinh1gX9deudSh9EszQP0us/iYiV9N0o7HtY+8Ig5fFAbAvr35Kjeq3eaWc8rkJQbu/L1td4i127Xv6N5zjV34HQxCbWHz0oAeBC0Ely7tXCGfFCrFPmDihuSljl8Jcs7wJhn2jct52e1vWRHEqoEJo5QTkrxnuwTi1OYA+DfJcW9XR0fXhYz8D1wxliFIKTefAAAAAElFTkSuQmCC"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 350:
/*!**********************************************************!*\
  !*** E:/前端/uniapp/财富乐/components/ld-select/eval5.min.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @license eval5 v1.4.5
 * Copyright (c) 2019-2020 nobo (MIT Licensed)
 * https://github.com/bplok20010/eval5
 */
!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {return function (e) {var t = {};function r(i) {if (t[i]) return t[i].exports;var n = t[i] = { i: i, l: !1, exports: {} };return e[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports;}return r.m = e, r.c = t, r.d = function (e, t, i) {r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });}, r.r = function (e) {"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });}, r.t = function (e, t) {if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" === typeof e && e && e.__esModule) return e;var i = Object.create(null);if (r.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var n in e) {r.d(i, n, function (t) {return e[t];}.bind(null, n));}return i;}, r.n = function (e) {var t = e && e.__esModule ? function () {return e.default;} : function () {return e;};return r.d(t, "a", t), t;}, r.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, r.p = "", r(r.s = 5);}([function (e, t) {e.exports = function (e) {return e && e.__esModule ? e : { default: e };};}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.createContext = function (e) {void 0 === e && (e = Object.create(null));return e;}, t.compileFunction = function (e, t, r) {void 0 === t && (t = []);void 0 === r && (r = {});var n = r.parsingContext,s = void 0 === r.timeout ? 0 : r.timeout,a = "\n    (function anonymous(" + t.join(",") + "){\n         " + e + "\n    });\n    ";return new i.Interpreter(n, { ecmaVersion: r.ecmaVersion, timeout: s, rootContext: r.rootContext, globalContextInFunction: r.globalContextInFunction }).evaluate(a);}, t.runInContext = n, t.Script = t.runInNewContext = void 0;var i = r(2);function n(e, t, r) {return new i.Interpreter(t, r).evaluate(e);}var s = n;t.runInNewContext = s;var a = function () {function e(e) {this._code = e;}var t = e.prototype;return t.runInContext = function (e) {return n(this._code, e);}, t.runInNewContext = function (e) {return n(this._code, e);}, e;}();t.Script = a;}, function (e, t, r) {"use strict";var i = r(0);Object.defineProperty(t, "__esModule", { value: !0 }), t.Interpreter = void 0;var n = i(r(3)),s = i(r(9)),a = r(10),o = r(11);function h(e, t) {Object.defineProperty(e, "name", { value: t, writable: !1, enumerable: !1, configurable: !0 });}var c = Object.prototype.hasOwnProperty,u = Symbol("Break"),p = Symbol("Continue"),l = Symbol("DefaultCase"),d = Symbol("EmptyStatementReturn"),f = Symbol("WithScope");function m(e) {return "function" === typeof e;}var g = function () {function e(e) {this.interpreter = e;}return e.prototype.generator = function () {var e = this.interpreter;return { getOptions: e.getOptions.bind(e), getCurrentScope: function () {return this.getCurrentScope();}.bind(e), getGlobalScope: function () {return this.getGlobalScope();}.bind(e), getCurrentContext: function () {return this.getCurrentContext();}.bind(e), getExecStartTime: e.getExecStartTime.bind(e) };}, e;}();function x(e, t, r) {if (void 0 === r && (r = !0), !(e instanceof g)) throw new Error("Illegal call");if ("string" !== typeof t) return t;if (t) {var i = e.generator(),n = { timeout: i.getOptions().timeout, _initEnv: function _initEnv() {r || this.setCurrentContext(i.getCurrentContext()), this.execStartTime = i.getExecStartTime(), this.execEndTime = this.execStartTime;} },s = r ? i.getGlobalScope() : i.getCurrentScope();return new w(s, n).evaluate(t);}}function y(e) {if (!(e instanceof g)) throw new Error("Illegal call");for (var t = e.generator(), r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) {i[n - 1] = arguments[n];}var s = i.pop(),a = new w(t.getGlobalScope(), t.getOptions()),o = "\n\t\t    (function anonymous(" + i.join(",") + "){\n\t\t        " + s + "\n\t\t    });\n\t\t    ";return a.evaluate(o);}Object.defineProperty(x, "__IS_EVAL_FUNC", { value: !0, writable: !1, enumerable: !1, configurable: !1 }), Object.defineProperty(y, "__IS_FUNCTION_FUNC", { value: !0, writable: !1, enumerable: !1, configurable: !1 });var v = function v(e) {this.value = e;},b = function b(e) {this.value = e;},S = function S(e) {this.value = e;},_ = function _(e, t, r) {void 0 === t && (t = null), this.name = r, this.parent = t, this.data = e, this.labelStack = [];};function C() {}function k(e, t) {return void 0 === e && (e = null), new _(Object.create(null), e, t);}var E = { NaN: NaN, Infinity: 1 / 0, undefined: void 0, Object: Object, Array: Array, String: String, Boolean: Boolean, Number: Number, Date: Date, RegExp: RegExp, Error: Error, URIError: URIError, TypeError: TypeError, RangeError: RangeError, SyntaxError: SyntaxError, ReferenceError: ReferenceError, Math: Math, parseInt: parseInt, parseFloat: parseFloat, isNaN: isNaN, isFinite: isFinite, decodeURI: decodeURI, decodeURIComponent: decodeURIComponent, encodeURI: encodeURI, encodeURIComponent: encodeURIComponent, escape: escape, unescape: unescape, eval: x, Function: y };"undefined" !== typeof JSON && (E.JSON = JSON), "undefined" !== typeof Promise && (E.Promise = Promise), "undefined" !== typeof Set && (E.Set = Set), "undefined" !== typeof Map && (E.Map = Map), "undefined" !== typeof Symbol && (E.Symbol = Symbol), "undefined" !== typeof Proxy && (E.Proxy = Proxy), "undefined" !== typeof WeakMap && (E.WeakMap = WeakMap), "undefined" !== typeof WeakSet && (E.WeakSet = WeakSet), "undefined" !== typeof Reflect && (E.Reflect = Reflect);var w = function () {function e(t, r) {void 0 === t && (t = e.global), void 0 === r && (r = {}), this.sourceList = [], this.collectDeclVars = Object.create(null), this.collectDeclFuncs = Object.create(null), this.isVarDeclMode = !1, this.lastExecNode = null, this.isRunning = !1, this.options = { ecmaVersion: r.ecmaVersion || e.ecmaVersion, timeout: r.timeout || 0, rootContext: r.rootContext, globalContextInFunction: void 0 === r.globalContextInFunction ? e.globalContextInFunction : r.globalContextInFunction, _initEnv: r._initEnv }, this.context = t || Object.create(null), this.callStack = [], this.initEnvironment(this.context);}var t = e.prototype;return t.initEnvironment = function (e) {var t, r;if (e instanceof _) t = e;else {var i = null,n = this.createSuperScope(e);this.options.rootContext && (i = new _((r = this.options.rootContext, Object.create(r)), n, "rootScope")), t = new _(e, i || n, "globalScope");}this.globalScope = t, this.currentScope = this.globalScope, this.globalContext = t.data, this.currentContext = t.data, this.collectDeclVars = Object.create(null), this.collectDeclFuncs = Object.create(null), this.execStartTime = Date.now(), this.execEndTime = this.execStartTime;var s = this.options._initEnv;s && s.call(this);}, t.getExecStartTime = function () {return this.execStartTime;}, t.getExecutionTime = function () {return this.execEndTime - this.execStartTime;}, t.setExecTimeout = function (e) {void 0 === e && (e = 0), this.options.timeout = e;}, t.getOptions = function () {return this.options;}, t.getGlobalScope = function () {return this.globalScope;}, t.getCurrentScope = function () {return this.currentScope;}, t.getCurrentContext = function () {return this.currentContext;}, t.isInterruptThrow = function (e) {return e instanceof o.InterruptThrowError || e instanceof o.InterruptThrowReferenceError || e instanceof o.InterruptThrowSyntaxError;}, t.createSuperScope = function (e) {var t = (0, s.default)({}, E);return Object.keys(t).forEach(function (r) {r in e && delete t[r];}), new _(t, null, "superScope");}, t.setCurrentContext = function (e) {this.currentContext = e;}, t.setCurrentScope = function (e) {this.currentScope = e;}, t.evaluate = function (t) {var r;if (void 0 === t && (t = ""), t) return r = (0, a.parse)(t, { ranges: !0, locations: !0, ecmaVersion: this.options.ecmaVersion || e.ecmaVersion }), this.evaluateNode(r, t);}, t.appendCode = function (e) {return this.evaluate(e);}, t.evaluateNode = function (e, t) {var r = this;void 0 === t && (t = ""), this.value = void 0, this.source = t, this.sourceList.push(t), this.isRunning = !0, this.execStartTime = Date.now(), this.execEndTime = this.execStartTime, this.collectDeclVars = Object.create(null), this.collectDeclFuncs = Object.create(null);var i = this.getCurrentScope(),n = this.getCurrentContext(),s = i.labelStack.concat([]),a = this.callStack.concat([]);try {var o = this.createClosure(e);this.addDeclarationsToScope(this.collectDeclVars, this.collectDeclFuncs, this.getCurrentScope()), o();} catch (h) {throw h;} finally {r.setCurrentScope(i), r.setCurrentContext(n), i.labelStack = s, r.callStack = a, this.execEndTime = Date.now();}return this.isRunning = !1, this.getValue();}, t.createErrorMessage = function (e, t, r) {var i = e[1].replace("%0", String(t));return null !== r && (i += this.getNodePosition(r || this.lastExecNode)), i;}, t.createError = function (e, t) {return new t(e);}, t.createThrowError = function (e, t) {return this.createError(e, t);}, t.createInternalThrowError = function (e, t, r) {return this.createError(this.createErrorMessage(e, t, r), e[2]);}, t.checkTimeout = function () {if (!this.isRunning) return !1;var e = this.options.timeout || 0;return Date.now() - this.execStartTime > e;}, t.getNodePosition = function (e) {if (e) {return e.loc ? " [" + e.loc.start.line + ":" + e.loc.start.column + "]" : "";}return "";}, t.createClosure = function (e) {var t,r = this;switch (e.type) {case "BinaryExpression":t = this.binaryExpressionHandler(e);break;case "LogicalExpression":t = this.logicalExpressionHandler(e);break;case "UnaryExpression":t = this.unaryExpressionHandler(e);break;case "UpdateExpression":t = this.updateExpressionHandler(e);break;case "ObjectExpression":t = this.objectExpressionHandler(e);break;case "ArrayExpression":t = this.arrayExpressionHandler(e);break;case "CallExpression":t = this.callExpressionHandler(e);break;case "NewExpression":t = this.newExpressionHandler(e);break;case "MemberExpression":t = this.memberExpressionHandler(e);break;case "ThisExpression":t = this.thisExpressionHandler(e);break;case "SequenceExpression":t = this.sequenceExpressionHandler(e);break;case "Literal":t = this.literalHandler(e);break;case "Identifier":t = this.identifierHandler(e);break;case "AssignmentExpression":t = this.assignmentExpressionHandler(e);break;case "FunctionDeclaration":t = this.functionDeclarationHandler(e);break;case "VariableDeclaration":t = this.variableDeclarationHandler(e);break;case "BlockStatement":case "Program":t = this.programHandler(e);break;case "ExpressionStatement":t = this.expressionStatementHandler(e);break;case "EmptyStatement":t = this.emptyStatementHandler(e);break;case "ReturnStatement":t = this.returnStatementHandler(e);break;case "FunctionExpression":t = this.functionExpressionHandler(e);break;case "IfStatement":t = this.ifStatementHandler(e);break;case "ConditionalExpression":t = this.conditionalExpressionHandler(e);break;case "ForStatement":t = this.forStatementHandler(e);break;case "WhileStatement":t = this.whileStatementHandler(e);break;case "DoWhileStatement":t = this.doWhileStatementHandler(e);break;case "ForInStatement":t = this.forInStatementHandler(e);break;case "WithStatement":t = this.withStatementHandler(e);break;case "ThrowStatement":t = this.throwStatementHandler(e);break;case "TryStatement":t = this.tryStatementHandler(e);break;case "ContinueStatement":t = this.continueStatementHandler(e);break;case "BreakStatement":t = this.breakStatementHandler(e);break;case "SwitchStatement":t = this.switchStatementHandler(e);break;case "LabeledStatement":t = this.labeledStatementHandler(e);break;case "DebuggerStatement":t = this.debuggerStatementHandler(e);break;default:throw this.createInternalThrowError(o.Messages.NodeTypeSyntaxError, e.type, e);}return function () {var i = r.options.timeout;if (i && i > 0 && r.checkTimeout()) throw r.createInternalThrowError(o.Messages.ExecutionTimeOutError, i, null);return r.lastExecNode = e, t.apply(void 0, arguments);};}, t.binaryExpressionHandler = function (e) {var t = this,r = this.createClosure(e.left),i = this.createClosure(e.right);return function () {var n = r(),s = i();switch (e.operator) {case "==":return n == s;case "!=":return n != s;case "===":return n === s;case "!==":return n !== s;case "<":return n < s;case "<=":return n <= s;case ">":return n > s;case ">=":return n >= s;case "<<":return n << s;case ">>":return n >> s;case ">>>":return n >>> s;case "+":return n + s;case "-":return n - s;case "*":return n * s;case "**":return Math.pow(n, s);case "/":return n / s;case "%":return n % s;case "|":return n | s;case "^":return n ^ s;case "&":return n & s;case "in":return n in s;case "instanceof":return n instanceof s;default:throw t.createInternalThrowError(o.Messages.BinaryOperatorSyntaxError, e.operator, e);}};}, t.logicalExpressionHandler = function (e) {var t = this,r = this.createClosure(e.left),i = this.createClosure(e.right);return function () {switch (e.operator) {case "||":return r() || i();case "&&":return r() && i();default:throw t.createInternalThrowError(o.Messages.LogicalOperatorSyntaxError, e.operator, e);}};}, t.unaryExpressionHandler = function (e) {var t = this;switch (e.operator) {case "delete":var r = this.createObjectGetter(e.argument),i = this.createNameGetter(e.argument);return function () {return delete r()[i()];};default:var n;if ("typeof" === e.operator && "Identifier" === e.argument.type) {var s = this.createObjectGetter(e.argument),a = this.createNameGetter(e.argument);n = function n() {return s()[a()];};} else n = this.createClosure(e.argument);return function () {var r = n();switch (e.operator) {case "-":return -r;case "+":return +r;case "!":return !r;case "~":return ~r;case "void":return;case "typeof":return typeof r;default:throw t.createInternalThrowError(o.Messages.UnaryOperatorSyntaxError, e.operator, e);}};}}, t.updateExpressionHandler = function (e) {var t = this,r = this.createObjectGetter(e.argument),i = this.createNameGetter(e.argument);return function () {var n = r(),s = i();switch (t.assertVariable(n, s, e), e.operator) {case "++":return e.prefix ? ++n[s] : n[s]++;case "--":return e.prefix ? --n[s] : n[s]--;default:throw t.createInternalThrowError(o.Messages.UpdateOperatorSyntaxError, e.operator, e);}};}, t.objectExpressionHandler = function (e) {var t = this,r = [];var i = Object.create(null);return e.properties.forEach(function (e) {var n = e.kind,s = function (e) {return "Identifier" === e.type ? e.name : "Literal" === e.type ? e.value : this.throwError(o.Messages.ObjectStructureSyntaxError, e.type, e);}(e.key);i[s] && "init" !== n || (i[s] = {}), i[s][n] = t.createClosure(e.value), r.push({ key: s, property: e });}), function () {for (var e = {}, t = r.length, n = 0; n < t; n++) {var s = r[n],a = s.key,o = i[a],c = o.init ? o.init() : void 0,u = o.get ? o.get() : function () {},p = o.set ? o.set() : function (e) {};if ("set" in o || "get" in o) {var l = { configurable: !0, enumerable: !0, get: u, set: p };Object.defineProperty(e, a, l);} else {var d = s.property,f = d.kind;"Identifier" !== d.key.type || "FunctionExpression" !== d.value.type || "init" !== f || d.value.id || h(c, d.key.name), e[a] = c;}}return e;};}, t.arrayExpressionHandler = function (e) {var t = this,r = e.elements.map(function (e) {return e ? t.createClosure(e) : e;});return function () {for (var e = r.length, t = Array(e), i = 0; i < e; i++) {var n = r[i];n && (t[i] = n());}return t;};}, t.safeObjectGet = function (e, t, r) {return e[t];}, t.createCallFunctionGetter = function (e) {var t = this;switch (e.type) {case "MemberExpression":var r = this.createClosure(e.object),i = this.createMemberKeyGetter(e),n = this.source;return function () {var s = r(),a = i(),h = t.safeObjectGet(s, a, e);if (!h || !m(h)) {var c = n.slice(e.start, e.end);throw t.createInternalThrowError(o.Messages.FunctionUndefinedReferenceError, c, e);}return h.__IS_EVAL_FUNC ? function (e) {return h(new g(t), e, !0);} : h.__IS_FUNCTION_FUNC ? function () {for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++) {r[i] = arguments[i];}return h.apply(void 0, [new g(t)].concat(r));} : h.bind(s);};default:var s = this.createClosure(e);return function () {var r = "";"Identifier" === e.type && (r = e.name);var i = s();if (!i || !m(i)) throw t.createInternalThrowError(o.Messages.FunctionUndefinedReferenceError, r, e);if ("Identifier" === e.type && i.__IS_EVAL_FUNC && "eval" === r) return function (e) {var n = t.getScopeFromName(r, t.getCurrentScope()),s = !n.parent || t.globalScope === n || "rootScope" === n.name;return i(new g(t), e, !s);};if (i.__IS_EVAL_FUNC) return function (e) {return i(new g(t), e, !0);};if (i.__IS_FUNCTION_FUNC) return function () {for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) {r[n] = arguments[n];}return i.apply(void 0, [new g(t)].concat(r));};var n = t.options.globalContextInFunction;if ("Identifier" === e.type) {var a = t.getIdentifierScope(e);a.name === f && (n = a.data);}return i.bind(n);};}}, t.callExpressionHandler = function (e) {var t = this,r = this.createCallFunctionGetter(e.callee),i = e.arguments.map(function (e) {return t.createClosure(e);});return function () {return r().apply(void 0, i.map(function (e) {return e();}));};}, t.functionExpressionHandler = function (e) {var t = this,r = this,i = this.source,n = this.collectDeclVars,s = this.collectDeclFuncs;this.collectDeclVars = Object.create(null), this.collectDeclFuncs = Object.create(null);var a = e.id ? e.id.name : "",o = e.params.length,c = e.params.map(function (e) {return t.createParamNameGetter(e);}),u = this.createClosure(e.body),p = this.collectDeclVars,l = this.collectDeclFuncs;return this.collectDeclVars = n, this.collectDeclFuncs = s, function () {var t = r.getCurrentScope(),n = function e() {for (var i = arguments.length, n = new Array(i), s = 0; s < i; s++) {n[s] = arguments[s];}r.callStack.push("" + a);var o = r.getCurrentScope(),h = k(t, a);r.setCurrentScope(h), r.addDeclarationsToScope(p, l, h), a && (h.data[a] = e), h.data.arguments = arguments, c.forEach(function (e, t) {h.data[e()] = n[t];});var d = r.getCurrentContext();r.setCurrentContext(this);var f = u();if (r.setCurrentContext(d), r.setCurrentScope(o), r.callStack.pop(), f instanceof v) return f.value;};return h(n, a), Object.defineProperty(n, "length", { value: o, writable: !1, enumerable: !1, configurable: !0 }), Object.defineProperty(n, "toString", { value: function value() {return i.slice(e.start, e.end);}, writable: !0, configurable: !0, enumerable: !1 }), Object.defineProperty(n, "valueOf", { value: function value() {return i.slice(e.start, e.end);}, writable: !0, configurable: !0, enumerable: !1 }), n;};}, t.newExpressionHandler = function (e) {var t = this,r = this.source,i = this.createClosure(e.callee),s = e.arguments.map(function (e) {return t.createClosure(e);});return function () {var a = i();if (!m(a) || a.__IS_EVAL_FUNC) {var h = e.callee,c = r.slice(h.start, h.end);throw t.createInternalThrowError(o.Messages.IsNotConstructor, c, e);}return a.__IS_FUNCTION_FUNC ? a.apply(void 0, [new g(t)].concat(s.map(function (e) {return e();}))) : (0, n.default)(a, s.map(function (e) {return e();}));};}, t.memberExpressionHandler = function (e) {var t = this.createClosure(e.object),r = this.createMemberKeyGetter(e);return function () {return t()[r()];};}, t.thisExpressionHandler = function (e) {var t = this;return function () {return t.getCurrentContext();};}, t.sequenceExpressionHandler = function (e) {var t = this,r = e.expressions.map(function (e) {return t.createClosure(e);});return function () {for (var e, t = r.length, i = 0; i < t; i++) {e = (0, r[i])();}return e;};}, t.literalHandler = function (e) {return function () {return e.regex ? new RegExp(e.regex.pattern, e.regex.flags) : e.value;};}, t.identifierHandler = function (e) {var t = this;return function () {var r = t.getCurrentScope(),i = t.getScopeDataFromName(e.name, r);return t.assertVariable(i, e.name, e), i[e.name];};}, t.getIdentifierScope = function (e) {var t = this.getCurrentScope();return this.getScopeFromName(e.name, t);}, t.assignmentExpressionHandler = function (e) {var t = this;"Identifier" !== e.left.type || "FunctionExpression" !== e.right.type || e.right.id || (e.right.id = { type: "Identifier", name: e.left.name });var r = this.createObjectGetter(e.left),i = this.createNameGetter(e.left),n = this.createClosure(e.right);return function () {var s = r(),a = i(),h = n();switch ("=" !== e.operator && t.assertVariable(s, a, e), e.operator) {case "=":return s[a] = h;case "+=":return s[a] += h;case "-=":return s[a] -= h;case "*=":return s[a] *= h;case "/=":return s[a] /= h;case "%=":return s[a] %= h;case "<<=":return s[a] <<= h;case ">>=":return s[a] >>= h;case ">>>=":return s[a] >>>= h;case "&=":return s[a] &= h;case "^=":return s[a] ^= h;case "|=":return s[a] |= h;default:throw t.createInternalThrowError(o.Messages.AssignmentExpressionSyntaxError, e.type, e);}};}, t.functionDeclarationHandler = function (e) {if (e.id) {var t = this.functionExpressionHandler(e);Object.defineProperty(t, "isFunctionDeclareClosure", { value: !0, writable: !1, configurable: !1, enumerable: !1 }), this.funcDeclaration(e.id.name, t);}return function () {return d;};}, t.getVariableName = function (e) {if ("Identifier" === e.type) return e.name;throw this.createInternalThrowError(o.Messages.VariableTypeSyntaxError, e.type, e);}, t.variableDeclarationHandler = function (e) {for (var t, r = this, i = [], n = 0; n < e.declarations.length; n++) {var s = e.declarations[n];this.varDeclaration(this.getVariableName(s.id)), s.init && i.push({ type: "AssignmentExpression", operator: "=", left: s.id, right: s.init });}return i.length && (t = this.createClosure({ type: "BlockStatement", body: i })), function () {if (t) {var e = r.isVarDeclMode;r.isVarDeclMode = !0, t(), r.isVarDeclMode = e;}return d;};}, t.assertVariable = function (e, t, r) {if (e === this.globalScope.data && !(t in e)) throw this.createInternalThrowError(o.Messages.VariableUndefinedReferenceError, t, r);}, t.programHandler = function (e) {var t = this,r = e.body.map(function (e) {return t.createClosure(e);});return function () {for (var e = d, i = 0; i < r.length; i++) {var n = r[i],s = t.setValue(n());if (s !== d && ((e = s) instanceof v || e instanceof b || e instanceof S || e === u || e === p)) break;}return e;};}, t.expressionStatementHandler = function (e) {return this.createClosure(e.expression);}, t.emptyStatementHandler = function (e) {return function () {return d;};}, t.returnStatementHandler = function (e) {var t = e.argument ? this.createClosure(e.argument) : C;return function () {return new v(t());};}, t.ifStatementHandler = function (e) {var t = this.createClosure(e.test),r = this.createClosure(e.consequent),i = e.alternate ? this.createClosure(e.alternate) : function () {return d;};return function () {return t() ? r() : i();};}, t.conditionalExpressionHandler = function (e) {return this.ifStatementHandler(e);}, t.forStatementHandler = function (e) {var t = this,r = C,i = e.test ? this.createClosure(e.test) : function () {return !0;},n = C,s = this.createClosure(e.body);return "ForStatement" === e.type && (r = e.init ? this.createClosure(e.init) : r, n = e.update ? this.createClosure(e.update) : C), function (a) {var o,h = d,c = "DoWhileStatement" === e.type;for (a && "LabeledStatement" === a.type && (o = a.label.name), r(); c || i(); n()) {c = !1;var l = t.setValue(s());if (l !== d && l !== p) {if (l === u) break;if ((h = l) instanceof S && h.value === o) h = d;else if (h instanceof v || h instanceof b || h instanceof S) break;}}return h;};}, t.whileStatementHandler = function (e) {return this.forStatementHandler(e);}, t.doWhileStatementHandler = function (e) {return this.forStatementHandler(e);}, t.forInStatementHandler = function (e) {var t = this,r = e.left,i = this.createClosure(e.right),n = this.createClosure(e.body);return "VariableDeclaration" === e.left.type && (this.createClosure(e.left)(), r = e.left.declarations[0].id), function (e) {var s,a,o = d;e && "LabeledStatement" === e.type && (s = e.label.name);var h = i();for (a in h) {t.assignmentExpressionHandler({ type: "AssignmentExpression", operator: "=", left: r, right: { type: "Literal", value: a } })();var c = t.setValue(n());if (c !== d && c !== p) {if (c === u) break;if ((o = c) instanceof S && o.value === s) o = d;else if (o instanceof v || o instanceof b || o instanceof S) break;}}return o;};}, t.withStatementHandler = function (e) {var t = this,r = this.createClosure(e.object),i = this.createClosure(e.body);return function () {var e = r(),n = t.getCurrentScope(),s = new _(e, n, f);t.setCurrentScope(s);var a = t.setValue(i());return t.setCurrentScope(n), a;};}, t.throwStatementHandler = function (e) {var t = this,r = this.createClosure(e.argument);return function () {throw t.setValue(void 0), r();};}, t.tryStatementHandler = function (e) {var t = this,r = this.createClosure(e.block),i = e.handler ? this.catchClauseHandler(e.handler) : null,n = e.finalizer ? this.createClosure(e.finalizer) : null;return function () {var e,s,a = t.getCurrentScope(),o = t.getCurrentContext(),h = a.labelStack.concat([]),c = t.callStack.concat([]),u = d,p = function p() {t.setCurrentScope(a), t.setCurrentContext(o), a.labelStack = h, t.callStack = c;};try {(u = t.setValue(r())) instanceof v && (e = u);} catch (l) {if (p(), t.isInterruptThrow(l)) throw l;if (i) try {(u = t.setValue(i(l))) instanceof v && (e = u);} catch (l) {if (p(), t.isInterruptThrow(l)) throw l;s = l;}}if (n) try {(u = n()) instanceof v && (e = u);} catch (l) {if (p(), t.isInterruptThrow(l)) throw l;s = l;}if (s) throw s;return e || u;};}, t.catchClauseHandler = function (e) {var t = this,r = this.createParamNameGetter(e.param),i = this.createClosure(e.body);return function (e) {var n,s = t.getCurrentScope().data,a = r(),o = c.call(s, a),h = s[a];return s[a] = e, n = i(), o ? s[a] = h : delete s[a], n;};}, t.continueStatementHandler = function (e) {return function () {return e.label ? new S(e.label.name) : p;};}, t.breakStatementHandler = function (e) {return function () {return e.label ? new b(e.label.name) : u;};}, t.switchStatementHandler = function (e) {var t = this,r = this.createClosure(e.discriminant),i = e.cases.map(function (e) {return t.switchCaseHandler(e);});return function () {for (var e, n, s, a = r(), o = !1, h = 0; h < i.length; h++) {var c = i[h](),f = c.testClosure();if (f !== l) {if (o || f === a) {if (o = !0, (n = t.setValue(c.bodyClosure())) === d) continue;if (n === u) break;if ((e = n) instanceof v || e instanceof b || e instanceof S || e === p) break;}} else s = c;}!o && s && ((n = t.setValue(s.bodyClosure())) === d || n === u || n === p || (e = n));return e;};}, t.switchCaseHandler = function (e) {var t = e.test ? this.createClosure(e.test) : function () {return l;},r = this.createClosure({ type: "BlockStatement", body: e.consequent });return function () {return { testClosure: t, bodyClosure: r };};}, t.labeledStatementHandler = function (e) {var t = this,r = e.label.name,i = this.createClosure(e.body);return function () {var n,s = t.getCurrentScope();return s.labelStack.push(r), (n = i(e)) instanceof b && n.value === r && (n = d), s.labelStack.pop(), n;};}, t.debuggerStatementHandler = function (e) {return function () {return d;};}, t.createParamNameGetter = function (e) {if ("Identifier" === e.type) return function () {return e.name;};throw this.createInternalThrowError(o.Messages.ParamTypeSyntaxError, e.type, e);}, t.createObjectKeyGetter = function (e) {var t;return t = "Identifier" === e.type ? function () {return e.name;} : this.createClosure(e), function () {return t();};}, t.createMemberKeyGetter = function (e) {return e.computed ? this.createClosure(e.property) : this.createObjectKeyGetter(e.property);}, t.createObjectGetter = function (e) {var t = this;switch (e.type) {case "Identifier":return function () {return t.getScopeDataFromName(e.name, t.getCurrentScope());};case "MemberExpression":return this.createClosure(e.object);default:throw this.createInternalThrowError(o.Messages.AssignmentTypeSyntaxError, e.type, e);}}, t.createNameGetter = function (e) {switch (e.type) {case "Identifier":return function () {return e.name;};case "MemberExpression":return this.createMemberKeyGetter(e);default:throw this.createInternalThrowError(o.Messages.AssignmentTypeSyntaxError, e.type, e);}}, t.varDeclaration = function (e) {this.collectDeclVars[e] = void 0;}, t.funcDeclaration = function (e, t) {this.collectDeclFuncs[e] = t;}, t.addDeclarationsToScope = function (e, t, r) {var i = r.data;for (var n in t) {var s = t[n];i[n] = s ? s() : s;}for (var a in e) {a in i || (i[a] = void 0);}}, t.getScopeValue = function (e, t) {return this.getScopeFromName(e, t).data[e];}, t.getScopeDataFromName = function (e, t) {return this.getScopeFromName(e, t).data;}, t.getScopeFromName = function (e, t) {var r = t;do {if (e in r.data) return r;} while (r = r.parent);return this.globalScope;}, t.setValue = function (e) {var t = this.callStack.length;return this.isVarDeclMode || t || e === d || e === u || e === p || e instanceof b || e instanceof S ? e : (this.value = e instanceof v ? e.value : e, e);}, t.getValue = function () {return this.value;}, e;}();t.Interpreter = w, w.version = "1.4.5", w.eval = x, w.Function = y, w.ecmaVersion = 5, w.globalContextInFunction = void 0, w.global = Object.create(null);}, function (e, t, r) {var i = r(4);function n(t, r, s) {return !function () {if ("undefined" === typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" === typeof Proxy) return !0;try {return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;} catch (e) {return !1;}}() ? e.exports = n = function n(e, t, r) {var n = [null];n.push.apply(n, t);var s = new (Function.bind.apply(e, n))();return r && i(s, r.prototype), s;} : e.exports = n = Reflect.construct, n.apply(null, arguments);}e.exports = n;}, function (e, t) {function r(t, i) {return e.exports = r = Object.setPrototypeOf || function (e, t) {return e.__proto__ = t, e;}, r(t, i);}e.exports = r;}, function (e, t, r) {e.exports = r(6);}, function (e, t, r) {"use strict";var i = r(0),n = r(7);Object.defineProperty(t, "__esModule", { value: !0 }), Object.defineProperty(t, "Interpreter", { enumerable: !0, get: function get() {return s.Interpreter;} }), Object.defineProperty(t, "evaluate", { enumerable: !0, get: function get() {return o.default;} }), Object.defineProperty(t, "Function", { enumerable: !0, get: function get() {return h.default;} }), t.vm = void 0;var s = r(2),a = n(r(1));t.vm = a;var o = i(r(16)),h = i(r(17));}, function (e, t, r) {var i = r(8);function n() {if ("function" !== typeof WeakMap) return null;var e = new WeakMap();return n = function n() {return e;}, e;}e.exports = function (e) {if (e && e.__esModule) return e;if (null === e || "object" !== i(e) && "function" !== typeof e) return { default: e };var t = n();if (t && t.has(e)) return t.get(e);var r = {},s = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var a in e) {if (Object.prototype.hasOwnProperty.call(e, a)) {var o = s ? Object.getOwnPropertyDescriptor(e, a) : null;o && (o.get || o.set) ? Object.defineProperty(r, a, o) : r[a] = e[a];}}return r.default = e, t && t.set(e, r), r;};}, function (e, t) {function r(t) {return "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? e.exports = r = function r(e) {return typeof e;} : e.exports = r = function r(e) {return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;}, r(t);}e.exports = r;}, function (e, t) {function r() {return e.exports = r = Object.assign || function (e) {for (var t = 1; t < arguments.length; t++) {var r = arguments[t];for (var i in r) {Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);}}return e;}, r.apply(this, arguments);}e.exports = r;}, function (e, t, r) {"use strict";r.r(t), r.d(t, "Node", function () {return oe;}), r.d(t, "Parser", function () {return W;}), r.d(t, "Position", function () {return O;}), r.d(t, "SourceLocation", function () {return M;}), r.d(t, "TokContext", function () {return ue;}), r.d(t, "Token", function () {return Le;}), r.d(t, "TokenType", function () {return g;}), r.d(t, "defaultOptions", function () {return D;}), r.d(t, "getLineInfo", function () {return R;}), r.d(t, "isIdentifierChar", function () {return m;}), r.d(t, "isIdentifierStart", function () {return f;}), r.d(t, "isNewLine", function () {return E;}), r.d(t, "keywordTypes", function () {return b;}), r.d(t, "lineBreak", function () {return C;}), r.d(t, "lineBreakG", function () {return k;}), r.d(t, "nonASCIIwhitespace", function () {return w;}), r.d(t, "parse", function () {return Be;}), r.d(t, "parseExpressionAt", function () {return Fe;}), r.d(t, "tokContexts", function () {return pe;}), r.d(t, "tokTypes", function () {return _;}), r.d(t, "tokenizer", function () {return He;}), r.d(t, "version", function () {return De;});var i = { 3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile", 5: "class enum extends super const export import", 6: "enum", strict: "implements interface let package private protected public static yield", strictBind: "eval arguments" },n = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",s = { 5: n, "5module": n + " export import", 6: n + " const class extends export import super" },a = /^in(stanceof)?$/,o = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",h = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F",c = new RegExp("[" + o + "]"),u = new RegExp("[" + o + h + "]");o = h = null;var p = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 477, 28, 11, 0, 9, 21, 155, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 12, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 0, 33, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 0, 161, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 270, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 754, 9486, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541],l = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 525, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 232, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 792487, 239];function d(e, t) {for (var r = 65536, i = 0; i < t.length; i += 2) {if ((r += t[i]) > e) return !1;if ((r += t[i + 1]) >= e) return !0;}}function f(e, t) {return e < 65 ? 36 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? e >= 170 && c.test(String.fromCharCode(e)) : !1 !== t && d(e, p)));}function m(e, t) {return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? e >= 170 && u.test(String.fromCharCode(e)) : !1 !== t && (d(e, p) || d(e, l)))));}var g = function g(e, t) {void 0 === t && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null;};function x(e, t) {return new g(e, { beforeExpr: !0, binop: t });}var y = { beforeExpr: !0 },v = { startsExpr: !0 },b = {};function S(e, t) {return void 0 === t && (t = {}), t.keyword = e, b[e] = new g(e, t);}var _ = { num: new g("num", v), regexp: new g("regexp", v), string: new g("string", v), name: new g("name", v), eof: new g("eof"), bracketL: new g("[", { beforeExpr: !0, startsExpr: !0 }), bracketR: new g("]"), braceL: new g("{", { beforeExpr: !0, startsExpr: !0 }), braceR: new g("}"), parenL: new g("(", { beforeExpr: !0, startsExpr: !0 }), parenR: new g(")"), comma: new g(",", y), semi: new g(";", y), colon: new g(":", y), dot: new g("."), question: new g("?", y), arrow: new g("=>", y), template: new g("template"), invalidTemplate: new g("invalidTemplate"), ellipsis: new g("...", y), backQuote: new g("`", v), dollarBraceL: new g("${", { beforeExpr: !0, startsExpr: !0 }), eq: new g("=", { beforeExpr: !0, isAssign: !0 }), assign: new g("_=", { beforeExpr: !0, isAssign: !0 }), incDec: new g("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }), prefix: new g("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }), logicalOR: x("||", 1), logicalAND: x("&&", 2), bitwiseOR: x("|", 3), bitwiseXOR: x("^", 4), bitwiseAND: x("&", 5), equality: x("==/!=/===/!==", 6), relational: x("</>/<=/>=", 7), bitShift: x("<</>>/>>>", 8), plusMin: new g("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }), modulo: x("%", 10), star: x("*", 10), slash: x("/", 10), starstar: new g("**", { beforeExpr: !0 }), _break: S("break"), _case: S("case", y), _catch: S("catch"), _continue: S("continue"), _debugger: S("debugger"), _default: S("default", y), _do: S("do", { isLoop: !0, beforeExpr: !0 }), _else: S("else", y), _finally: S("finally"), _for: S("for", { isLoop: !0 }), _function: S("function", v), _if: S("if"), _return: S("return", y), _switch: S("switch"), _throw: S("throw", y), _try: S("try"), _var: S("var"), _const: S("const"), _while: S("while", { isLoop: !0 }), _with: S("with"), _new: S("new", { beforeExpr: !0, startsExpr: !0 }), _this: S("this", v), _super: S("super", v), _class: S("class", v), _extends: S("extends", y), _export: S("export"), _import: S("import", v), _null: S("null", v), _true: S("true", v), _false: S("false", v), _in: S("in", { beforeExpr: !0, binop: 7 }), _instanceof: S("instanceof", { beforeExpr: !0, binop: 7 }), _typeof: S("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }), _void: S("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }), _delete: S("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 }) },C = /\r\n?|\n|\u2028|\u2029/,k = new RegExp(C.source, "g");function E(e, t) {return 10 === e || 13 === e || !t && (8232 === e || 8233 === e);}var w = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,I = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,T = Object.prototype,P = T.hasOwnProperty,A = T.toString;function N(e, t) {return P.call(e, t);}var V = Array.isArray || function (e) {return "[object Array]" === A.call(e);};function L(e) {return new RegExp("^(?:" + e.replace(/ /g, "|") + ")$");}var O = function O(e, t) {this.line = e, this.column = t;};O.prototype.offset = function (e) {return new O(this.line, this.column + e);};var M = function M(e, t, r) {this.start = t, this.end = r, null !== e.sourceFile && (this.source = e.sourceFile);};function R(e, t) {for (var r = 1, i = 0;;) {k.lastIndex = i;var n = k.exec(e);if (!(n && n.index < t)) return new O(r, t - i);++r, i = n.index + n[0].length;}}var D = { ecmaVersion: 10, sourceType: "script", onInsertedSemicolon: null, onTrailingComma: null, allowReserved: null, allowReturnOutsideFunction: !1, allowImportExportEverywhere: !1, allowAwaitOutsideFunction: !1, allowHashBang: !1, locations: !1, onToken: null, onComment: null, ranges: !1, program: null, sourceFile: null, directSourceFile: null, preserveParens: !1 };function B(e) {var t = {};for (var r in D) {t[r] = e && N(e, r) ? e[r] : D[r];}if (t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), null == t.allowReserved && (t.allowReserved = t.ecmaVersion < 5), V(t.onToken)) {var i = t.onToken;t.onToken = function (e) {return i.push(e);};}return V(t.onComment) && (t.onComment = function (e, t) {return function (r, i, n, s, a, o) {var h = { type: r ? "Block" : "Line", value: i, start: n, end: s };e.locations && (h.loc = new M(this, a, o)), e.ranges && (h.range = [n, s]), t.push(h);};}(t, t.onComment)), t;}var F = 2,H = 1 | F,U = 4,j = 8;function G(e, t) {return F | (e ? U : 0) | (t ? j : 0);}var W = function W(e, t, r) {this.options = e = B(e), this.sourceFile = e.sourceFile, this.keywords = L(s[e.ecmaVersion >= 6 ? 6 : "module" === e.sourceType ? "5module" : 5]);var n = "";if (!0 !== e.allowReserved) {for (var a = e.ecmaVersion; !(n = i[a]); a--) {;}"module" === e.sourceType && (n += " await");}this.reservedWords = L(n);var o = (n ? n + " " : "") + i.strict;this.reservedWordsStrict = L(o), this.reservedWordsStrictBind = L(o + " " + i.strictBind), this.input = String(t), this.containsEsc = !1, r ? (this.pos = r, this.lineStart = this.input.lastIndexOf("\n", r - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(C).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = _.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = "module" === e.sourceType, this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = {}, 0 === this.pos && e.allowHashBang && "#!" === this.input.slice(0, 2) && this.skipLineComment(2), this.scopeStack = [], this.enterScope(1), this.regexpState = null;},q = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 } };W.prototype.parse = function () {var e = this.options.program || this.startNode();return this.nextToken(), this.parseTopLevel(e);}, q.inFunction.get = function () {return (this.currentVarScope().flags & F) > 0;}, q.inGenerator.get = function () {return (this.currentVarScope().flags & j) > 0;}, q.inAsync.get = function () {return (this.currentVarScope().flags & U) > 0;}, q.allowSuper.get = function () {return (64 & this.currentThisScope().flags) > 0;}, q.allowDirectSuper.get = function () {return (128 & this.currentThisScope().flags) > 0;}, q.treatFunctionsAsVar.get = function () {return this.treatFunctionsAsVarInScope(this.currentScope());}, W.prototype.inNonArrowFunction = function () {return (this.currentThisScope().flags & F) > 0;}, W.extend = function () {for (var e = [], t = arguments.length; t--;) {e[t] = arguments[t];}for (var r = this, i = 0; i < e.length; i++) {r = e[i](r);}return r;}, W.parse = function (e, t) {return new this(t, e).parse();}, W.parseExpressionAt = function (e, t, r) {var i = new this(r, e, t);return i.nextToken(), i.parseExpression();}, W.tokenizer = function (e, t) {return new this(t, e);}, Object.defineProperties(W.prototype, q);var K = W.prototype,z = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;function Q() {this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;}K.strictDirective = function (e) {for (;;) {I.lastIndex = e, e += I.exec(this.input)[0].length;var t = z.exec(this.input.slice(e));if (!t) return !1;if ("use strict" === (t[1] || t[2])) return !0;e += t[0].length, I.lastIndex = e, e += I.exec(this.input)[0].length, ";" === this.input[e] && e++;}}, K.eat = function (e) {return this.type === e && (this.next(), !0);}, K.isContextual = function (e) {return this.type === _.name && this.value === e && !this.containsEsc;}, K.eatContextual = function (e) {return !!this.isContextual(e) && (this.next(), !0);}, K.expectContextual = function (e) {this.eatContextual(e) || this.unexpected();}, K.canInsertSemicolon = function () {return this.type === _.eof || this.type === _.braceR || C.test(this.input.slice(this.lastTokEnd, this.start));}, K.insertSemicolon = function () {if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;}, K.semicolon = function () {this.eat(_.semi) || this.insertSemicolon() || this.unexpected();}, K.afterTrailingComma = function (e, t) {if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;}, K.expect = function (e) {this.eat(e) || this.unexpected();}, K.unexpected = function (e) {this.raise(null != e ? e : this.start, "Unexpected token");}, K.checkPatternErrors = function (e, t) {if (e) {e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");var r = t ? e.parenthesizedAssign : e.parenthesizedBind;r > -1 && this.raiseRecoverable(r, "Parenthesized pattern");}}, K.checkExpressionErrors = function (e, t) {if (!e) return !1;var r = e.shorthandAssign,i = e.doubleProto;if (!t) return r >= 0 || i >= 0;r >= 0 && this.raise(r, "Shorthand property assignments are valid only in destructuring patterns"), i >= 0 && this.raiseRecoverable(i, "Redefinition of __proto__ property");}, K.checkYieldAwaitInDefaultParams = function () {this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");}, K.isSimpleAssignTarget = function (e) {return "ParenthesizedExpression" === e.type ? this.isSimpleAssignTarget(e.expression) : "Identifier" === e.type || "MemberExpression" === e.type;};var X = W.prototype;X.parseTopLevel = function (e) {var t = {};for (e.body || (e.body = []); this.type !== _.eof;) {var r = this.parseStatement(null, !0, t);e.body.push(r);}if (this.inModule) for (var i = 0, n = Object.keys(this.undefinedExports); i < n.length; i += 1) {var s = n[i];this.raiseRecoverable(this.undefinedExports[s].start, "Export '" + s + "' is not defined");}return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program");};var Z = { kind: "loop" },Y = { kind: "switch" };X.isLet = function (e) {if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;I.lastIndex = this.pos;var t = I.exec(this.input),r = this.pos + t[0].length,i = this.input.charCodeAt(r);if (91 === i) return !0;if (e) return !1;if (123 === i) return !0;if (f(i, !0)) {for (var n = r + 1; m(this.input.charCodeAt(n), !0);) {++n;}var s = this.input.slice(r, n);if (!a.test(s)) return !0;}return !1;}, X.isAsyncFunction = function () {if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;I.lastIndex = this.pos;var e = I.exec(this.input),t = this.pos + e[0].length;return !C.test(this.input.slice(this.pos, t)) && "function" === this.input.slice(t, t + 8) && (t + 8 === this.input.length || !m(this.input.charAt(t + 8)));}, X.parseStatement = function (e, t, r) {var i,n = this.type,s = this.startNode();switch (this.isLet(e) && (n = _._var, i = "let"), n) {case _._break:case _._continue:return this.parseBreakContinueStatement(s, n.keyword);case _._debugger:return this.parseDebuggerStatement(s);case _._do:return this.parseDoStatement(s);case _._for:return this.parseForStatement(s);case _._function:return e && (this.strict || "if" !== e && "label" !== e) && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(s, !1, !e);case _._class:return e && this.unexpected(), this.parseClass(s, !0);case _._if:return this.parseIfStatement(s);case _._return:return this.parseReturnStatement(s);case _._switch:return this.parseSwitchStatement(s);case _._throw:return this.parseThrowStatement(s);case _._try:return this.parseTryStatement(s);case _._const:case _._var:return i = i || this.value, e && "var" !== i && this.unexpected(), this.parseVarStatement(s, i);case _._while:return this.parseWhileStatement(s);case _._with:return this.parseWithStatement(s);case _.braceL:return this.parseBlock(!0, s);case _.semi:return this.parseEmptyStatement(s);case _._export:case _._import:if (this.options.ecmaVersion > 10 && n === _._import) {I.lastIndex = this.pos;var a = I.exec(this.input),o = this.pos + a[0].length;if (40 === this.input.charCodeAt(o)) return this.parseExpressionStatement(s, this.parseExpression());}return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), n === _._import ? this.parseImport(s) : this.parseExport(s, r);default:if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(s, !0, !e);var h = this.value,c = this.parseExpression();return n === _.name && "Identifier" === c.type && this.eat(_.colon) ? this.parseLabeledStatement(s, h, c, e) : this.parseExpressionStatement(s, c);}}, X.parseBreakContinueStatement = function (e, t) {var r = "break" === t;this.next(), this.eat(_.semi) || this.insertSemicolon() ? e.label = null : this.type !== _.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());for (var i = 0; i < this.labels.length; ++i) {var n = this.labels[i];if (null == e.label || n.name === e.label.name) {if (null != n.kind && (r || "loop" === n.kind)) break;if (e.label && r) break;}}return i === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, r ? "BreakStatement" : "ContinueStatement");}, X.parseDebuggerStatement = function (e) {return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");}, X.parseDoStatement = function (e) {return this.next(), this.labels.push(Z), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(_._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(_.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");}, X.parseForStatement = function (e) {this.next();var t = this.options.ecmaVersion >= 9 && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction) && this.eatContextual("await") ? this.lastTokStart : -1;if (this.labels.push(Z), this.enterScope(0), this.expect(_.parenL), this.type === _.semi) return t > -1 && this.unexpected(t), this.parseFor(e, null);var r = this.isLet();if (this.type === _._var || this.type === _._const || r) {var i = this.startNode(),n = r ? "let" : this.value;return this.next(), this.parseVar(i, !0, n), this.finishNode(i, "VariableDeclaration"), (this.type === _._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && 1 === i.declarations.length ? (this.options.ecmaVersion >= 9 && (this.type === _._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.parseForIn(e, i)) : (t > -1 && this.unexpected(t), this.parseFor(e, i));}var s = new Q(),a = this.parseExpression(!0, s);return this.type === _._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? (this.options.ecmaVersion >= 9 && (this.type === _._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.toAssignable(a, !1, s), this.checkLVal(a), this.parseForIn(e, a)) : (this.checkExpressionErrors(s, !0), t > -1 && this.unexpected(t), this.parseFor(e, a));}, X.parseFunctionStatement = function (e, t, r) {return this.next(), this.parseFunction(e, $ | (r ? 0 : ee), !1, t);}, X.parseIfStatement = function (e) {return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(_._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");}, X.parseReturnStatement = function (e) {return this.inFunction || this.options.allowReturnOutsideFunction || this.raise(this.start, "'return' outside of function"), this.next(), this.eat(_.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");}, X.parseSwitchStatement = function (e) {var t;this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(_.braceL), this.labels.push(Y), this.enterScope(0);for (var r = !1; this.type !== _.braceR;) {if (this.type === _._case || this.type === _._default) {var i = this.type === _._case;t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), i ? t.test = this.parseExpression() : (r && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), r = !0, t.test = null), this.expect(_.colon);} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));}return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");}, X.parseThrowStatement = function (e) {return this.next(), C.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");};var J = [];X.parseTryStatement = function (e) {if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === _._catch) {var t = this.startNode();if (this.next(), this.eat(_.parenL)) {t.param = this.parseBindingAtom();var r = "Identifier" === t.param.type;this.enterScope(r ? 32 : 0), this.checkLVal(t.param, r ? 4 : 2), this.expect(_.parenR);} else this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0);t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");}return e.finalizer = this.eat(_._finally) ? this.parseBlock() : null, e.handler || e.finalizer || this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");}, X.parseVarStatement = function (e, t) {return this.next(), this.parseVar(e, !1, t), this.semicolon(), this.finishNode(e, "VariableDeclaration");}, X.parseWhileStatement = function (e) {return this.next(), e.test = this.parseParenExpression(), this.labels.push(Z), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");}, X.parseWithStatement = function (e) {return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");}, X.parseEmptyStatement = function (e) {return this.next(), this.finishNode(e, "EmptyStatement");}, X.parseLabeledStatement = function (e, t, r, i) {for (var n = 0, s = this.labels; n < s.length; n += 1) {s[n].name === t && this.raise(r.start, "Label '" + t + "' is already declared");}for (var a = this.type.isLoop ? "loop" : this.type === _._switch ? "switch" : null, o = this.labels.length - 1; o >= 0; o--) {var h = this.labels[o];if (h.statementStart !== e.start) break;h.statementStart = this.start, h.kind = a;}return this.labels.push({ name: t, kind: a, statementStart: this.start }), e.body = this.parseStatement(i ? -1 === i.indexOf("label") ? i + "label" : i : "label"), this.labels.pop(), e.label = r, this.finishNode(e, "LabeledStatement");}, X.parseExpressionStatement = function (e, t) {return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");}, X.parseBlock = function (e, t) {for (void 0 === e && (e = !0), void 0 === t && (t = this.startNode()), t.body = [], this.expect(_.braceL), e && this.enterScope(0); !this.eat(_.braceR);) {var r = this.parseStatement(null);t.body.push(r);}return e && this.exitScope(), this.finishNode(t, "BlockStatement");}, X.parseFor = function (e, t) {return e.init = t, this.expect(_.semi), e.test = this.type === _.semi ? null : this.parseExpression(), this.expect(_.semi), e.update = this.type === _.parenR ? null : this.parseExpression(), this.expect(_.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");}, X.parseForIn = function (e, t) {var r = this.type === _._in;return this.next(), "VariableDeclaration" === t.type && null != t.declarations[0].init && (!r || this.options.ecmaVersion < 8 || this.strict || "var" !== t.kind || "Identifier" !== t.declarations[0].id.type) ? this.raise(t.start, (r ? "for-in" : "for-of") + " loop variable declaration may not have an initializer") : "AssignmentPattern" === t.type && this.raise(t.start, "Invalid left-hand side in for-loop"), e.left = t, e.right = r ? this.parseExpression() : this.parseMaybeAssign(), this.expect(_.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, r ? "ForInStatement" : "ForOfStatement");}, X.parseVar = function (e, t, r) {for (e.declarations = [], e.kind = r;;) {var i = this.startNode();if (this.parseVarId(i, r), this.eat(_.eq) ? i.init = this.parseMaybeAssign(t) : "const" !== r || this.type === _._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? "Identifier" === i.id.type || t && (this.type === _._in || this.isContextual("of")) ? i.init = null : this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : this.unexpected(), e.declarations.push(this.finishNode(i, "VariableDeclarator")), !this.eat(_.comma)) break;}return e;}, X.parseVarId = function (e, t) {e.id = this.parseBindingAtom(), this.checkLVal(e.id, "var" === t ? 1 : 2, !1);};var $ = 1,ee = 2;X.parseFunction = function (e, t, r, i) {this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !i) && (this.type === _.star && t & ee && this.unexpected(), e.generator = this.eat(_.star)), this.options.ecmaVersion >= 8 && (e.async = !!i), t & $ && (e.id = 4 & t && this.type !== _.name ? null : this.parseIdent(), !e.id || t & ee || this.checkLVal(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? 1 : 2 : 3));var n = this.yieldPos,s = this.awaitPos,a = this.awaitIdentPos;return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(G(e.async, e.generator)), t & $ || (e.id = this.type === _.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, r, !1), this.yieldPos = n, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(e, t & $ ? "FunctionDeclaration" : "FunctionExpression");}, X.parseFunctionParams = function (e) {this.expect(_.parenL), e.params = this.parseBindingList(_.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();}, X.parseClass = function (e, t) {this.next();var r = this.strict;this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);var i = this.startNode(),n = !1;for (i.body = [], this.expect(_.braceL); !this.eat(_.braceR);) {var s = this.parseClassElement(null !== e.superClass);s && (i.body.push(s), "MethodDefinition" === s.type && "constructor" === s.kind && (n && this.raise(s.start, "Duplicate constructor in the same class"), n = !0));}return e.body = this.finishNode(i, "ClassBody"), this.strict = r, this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");}, X.parseClassElement = function (e) {var t = this;if (this.eat(_.semi)) return null;var r = this.startNode(),i = function i(e, _i) {void 0 === _i && (_i = !1);var n = t.start,s = t.startLoc;return !!t.eatContextual(e) && (!(t.type === _.parenL || _i && t.canInsertSemicolon()) || (r.key && t.unexpected(), r.computed = !1, r.key = t.startNodeAt(n, s), r.key.name = e, t.finishNode(r.key, "Identifier"), !1));};r.kind = "method", r.static = i("static");var n = this.eat(_.star),s = !1;n || (this.options.ecmaVersion >= 8 && i("async", !0) ? (s = !0, n = this.options.ecmaVersion >= 9 && this.eat(_.star)) : i("get") ? r.kind = "get" : i("set") && (r.kind = "set")), r.key || this.parsePropertyName(r);var a = r.key,o = !1;return r.computed || r.static || !("Identifier" === a.type && "constructor" === a.name || "Literal" === a.type && "constructor" === a.value) ? r.static && "Identifier" === a.type && "prototype" === a.name && this.raise(a.start, "Classes may not have a static property named prototype") : ("method" !== r.kind && this.raise(a.start, "Constructor can't have get/set modifier"), n && this.raise(a.start, "Constructor can't be a generator"), s && this.raise(a.start, "Constructor can't be an async method"), r.kind = "constructor", o = e), this.parseClassMethod(r, n, s, o), "get" === r.kind && 0 !== r.value.params.length && this.raiseRecoverable(r.value.start, "getter should have no params"), "set" === r.kind && 1 !== r.value.params.length && this.raiseRecoverable(r.value.start, "setter should have exactly one param"), "set" === r.kind && "RestElement" === r.value.params[0].type && this.raiseRecoverable(r.value.params[0].start, "Setter cannot use rest params"), r;}, X.parseClassMethod = function (e, t, r, i) {return e.value = this.parseMethod(t, r, i), this.finishNode(e, "MethodDefinition");}, X.parseClassId = function (e, t) {this.type === _.name ? (e.id = this.parseIdent(), t && this.checkLVal(e.id, 2, !1)) : (!0 === t && this.unexpected(), e.id = null);}, X.parseClassSuper = function (e) {e.superClass = this.eat(_._extends) ? this.parseExprSubscripts() : null;}, X.parseExport = function (e, t) {if (this.next(), this.eat(_.star)) return this.expectContextual("from"), this.type !== _.string && this.unexpected(), e.source = this.parseExprAtom(), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");if (this.eat(_._default)) {var r;if (this.checkExport(t, "default", this.lastTokStart), this.type === _._function || (r = this.isAsyncFunction())) {var i = this.startNode();this.next(), r && this.next(), e.declaration = this.parseFunction(i, 4 | $, !1, r);} else if (this.type === _._class) {var n = this.startNode();e.declaration = this.parseClass(n, "nullableID");} else e.declaration = this.parseMaybeAssign(), this.semicolon();return this.finishNode(e, "ExportDefaultDeclaration");}if (this.shouldParseExportStatement()) e.declaration = this.parseStatement(null), "VariableDeclaration" === e.declaration.type ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id.name, e.declaration.id.start), e.specifiers = [], e.source = null;else {if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from")) this.type !== _.string && this.unexpected(), e.source = this.parseExprAtom();else {for (var s = 0, a = e.specifiers; s < a.length; s += 1) {var o = a[s];this.checkUnreserved(o.local), this.checkLocalExport(o.local);}e.source = null;}this.semicolon();}return this.finishNode(e, "ExportNamedDeclaration");}, X.checkExport = function (e, t, r) {e && (N(e, t) && this.raiseRecoverable(r, "Duplicate export '" + t + "'"), e[t] = !0);}, X.checkPatternExport = function (e, t) {var r = t.type;if ("Identifier" === r) this.checkExport(e, t.name, t.start);else if ("ObjectPattern" === r) for (var i = 0, n = t.properties; i < n.length; i += 1) {var s = n[i];this.checkPatternExport(e, s);} else if ("ArrayPattern" === r) for (var a = 0, o = t.elements; a < o.length; a += 1) {var h = o[a];h && this.checkPatternExport(e, h);} else "Property" === r ? this.checkPatternExport(e, t.value) : "AssignmentPattern" === r ? this.checkPatternExport(e, t.left) : "RestElement" === r ? this.checkPatternExport(e, t.argument) : "ParenthesizedExpression" === r && this.checkPatternExport(e, t.expression);}, X.checkVariableExport = function (e, t) {if (e) for (var r = 0, i = t; r < i.length; r += 1) {var n = i[r];this.checkPatternExport(e, n.id);}}, X.shouldParseExportStatement = function () {return "var" === this.type.keyword || "const" === this.type.keyword || "class" === this.type.keyword || "function" === this.type.keyword || this.isLet() || this.isAsyncFunction();}, X.parseExportSpecifiers = function (e) {var t = [],r = !0;for (this.expect(_.braceL); !this.eat(_.braceR);) {if (r) r = !1;else if (this.expect(_.comma), this.afterTrailingComma(_.braceR)) break;var i = this.startNode();i.local = this.parseIdent(!0), i.exported = this.eatContextual("as") ? this.parseIdent(!0) : i.local, this.checkExport(e, i.exported.name, i.exported.start), t.push(this.finishNode(i, "ExportSpecifier"));}return t;}, X.parseImport = function (e) {return this.next(), this.type === _.string ? (e.specifiers = J, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === _.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(e, "ImportDeclaration");}, X.parseImportSpecifiers = function () {var e = [],t = !0;if (this.type === _.name) {var r = this.startNode();if (r.local = this.parseIdent(), this.checkLVal(r.local, 2), e.push(this.finishNode(r, "ImportDefaultSpecifier")), !this.eat(_.comma)) return e;}if (this.type === _.star) {var i = this.startNode();return this.next(), this.expectContextual("as"), i.local = this.parseIdent(), this.checkLVal(i.local, 2), e.push(this.finishNode(i, "ImportNamespaceSpecifier")), e;}for (this.expect(_.braceL); !this.eat(_.braceR);) {if (t) t = !1;else if (this.expect(_.comma), this.afterTrailingComma(_.braceR)) break;var n = this.startNode();n.imported = this.parseIdent(!0), this.eatContextual("as") ? n.local = this.parseIdent() : (this.checkUnreserved(n.imported), n.local = n.imported), this.checkLVal(n.local, 2), e.push(this.finishNode(n, "ImportSpecifier"));}return e;}, X.adaptDirectivePrologue = function (e) {for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) {e[t].directive = e[t].expression.raw.slice(1, -1);}}, X.isDirectiveCandidate = function (e) {return "ExpressionStatement" === e.type && "Literal" === e.expression.type && "string" === typeof e.expression.value && ('"' === this.input[e.start] || "'" === this.input[e.start]);};var te = W.prototype;te.toAssignable = function (e, t, r) {if (this.options.ecmaVersion >= 6 && e) switch (e.type) {case "Identifier":this.inAsync && "await" === e.name && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");break;case "ObjectPattern":case "ArrayPattern":case "RestElement":break;case "ObjectExpression":e.type = "ObjectPattern", r && this.checkPatternErrors(r, !0);for (var i = 0, n = e.properties; i < n.length; i += 1) {var s = n[i];this.toAssignable(s, t), "RestElement" !== s.type || "ArrayPattern" !== s.argument.type && "ObjectPattern" !== s.argument.type || this.raise(s.argument.start, "Unexpected token");}break;case "Property":"init" !== e.kind && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);break;case "ArrayExpression":e.type = "ArrayPattern", r && this.checkPatternErrors(r, !0), this.toAssignableList(e.elements, t);break;case "SpreadElement":e.type = "RestElement", this.toAssignable(e.argument, t), "AssignmentPattern" === e.argument.type && this.raise(e.argument.start, "Rest elements cannot have a default value");break;case "AssignmentExpression":"=" !== e.operator && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);case "AssignmentPattern":break;case "ParenthesizedExpression":this.toAssignable(e.expression, t, r);break;case "MemberExpression":if (!t) break;default:this.raise(e.start, "Assigning to rvalue");} else r && this.checkPatternErrors(r, !0);return e;}, te.toAssignableList = function (e, t) {for (var r = e.length, i = 0; i < r; i++) {var n = e[i];n && this.toAssignable(n, t);}if (r) {var s = e[r - 1];6 === this.options.ecmaVersion && t && s && "RestElement" === s.type && "Identifier" !== s.argument.type && this.unexpected(s.argument.start);}return e;}, te.parseSpread = function (e) {var t = this.startNode();return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");}, te.parseRestBinding = function () {var e = this.startNode();return this.next(), 6 === this.options.ecmaVersion && this.type !== _.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");}, te.parseBindingAtom = function () {if (this.options.ecmaVersion >= 6) switch (this.type) {case _.bracketL:var e = this.startNode();return this.next(), e.elements = this.parseBindingList(_.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");case _.braceL:return this.parseObj(!0);}return this.parseIdent();}, te.parseBindingList = function (e, t, r) {for (var i = [], n = !0; !this.eat(e);) {if (n ? n = !1 : this.expect(_.comma), t && this.type === _.comma) i.push(null);else {if (r && this.afterTrailingComma(e)) break;if (this.type === _.ellipsis) {var s = this.parseRestBinding();this.parseBindingListItem(s), i.push(s), this.type === _.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.expect(e);break;}var a = this.parseMaybeDefault(this.start, this.startLoc);this.parseBindingListItem(a), i.push(a);}}return i;}, te.parseBindingListItem = function (e) {return e;}, te.parseMaybeDefault = function (e, t, r) {if (r = r || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(_.eq)) return r;var i = this.startNodeAt(e, t);return i.left = r, i.right = this.parseMaybeAssign(), this.finishNode(i, "AssignmentPattern");}, te.checkLVal = function (e, t, r) {switch (void 0 === t && (t = 0), e.type) {case "Identifier":2 === t && "let" === e.name && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (t ? "Binding " : "Assigning to ") + e.name + " in strict mode"), r && (N(r, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), r[e.name] = !0), 0 !== t && 5 !== t && this.declareName(e.name, t, e.start);break;case "MemberExpression":t && this.raiseRecoverable(e.start, "Binding member expression");break;case "ObjectPattern":for (var i = 0, n = e.properties; i < n.length; i += 1) {var s = n[i];this.checkLVal(s, t, r);}break;case "Property":this.checkLVal(e.value, t, r);break;case "ArrayPattern":for (var a = 0, o = e.elements; a < o.length; a += 1) {var h = o[a];h && this.checkLVal(h, t, r);}break;case "AssignmentPattern":this.checkLVal(e.left, t, r);break;case "RestElement":this.checkLVal(e.argument, t, r);break;case "ParenthesizedExpression":this.checkLVal(e.expression, t, r);break;default:this.raise(e.start, (t ? "Binding" : "Assigning to") + " rvalue");}};var re = W.prototype;re.checkPropClash = function (e, t, r) {if (!(this.options.ecmaVersion >= 9 && "SpreadElement" === e.type) && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {var i,n = e.key;switch (n.type) {case "Identifier":i = n.name;break;case "Literal":i = String(n.value);break;default:return;}var s = e.kind;if (this.options.ecmaVersion >= 6) "__proto__" === i && "init" === s && (t.proto && (r && r.doubleProto < 0 ? r.doubleProto = n.start : this.raiseRecoverable(n.start, "Redefinition of __proto__ property")), t.proto = !0);else {var a = t[i = "$" + i];if (a) ("init" === s ? this.strict && a.init || a.get || a.set : a.init || a[s]) && this.raiseRecoverable(n.start, "Redefinition of property");else a = t[i] = { init: !1, get: !1, set: !1 };a[s] = !0;}}}, re.parseExpression = function (e, t) {var r = this.start,i = this.startLoc,n = this.parseMaybeAssign(e, t);if (this.type === _.comma) {var s = this.startNodeAt(r, i);for (s.expressions = [n]; this.eat(_.comma);) {s.expressions.push(this.parseMaybeAssign(e, t));}return this.finishNode(s, "SequenceExpression");}return n;}, re.parseMaybeAssign = function (e, t, r) {if (this.isContextual("yield")) {if (this.inGenerator) return this.parseYield(e);this.exprAllowed = !1;}var i = !1,n = -1,s = -1,a = -1;t ? (n = t.parenthesizedAssign, s = t.trailingComma, a = t.shorthandAssign, t.parenthesizedAssign = t.trailingComma = t.shorthandAssign = -1) : (t = new Q(), i = !0);var o = this.start,h = this.startLoc;this.type !== _.parenL && this.type !== _.name || (this.potentialArrowAt = this.start);var c = this.parseMaybeConditional(e, t);if (r && (c = r.call(this, c, o, h)), this.type.isAssign) {var u = this.startNodeAt(o, h);return u.operator = this.value, u.left = this.type === _.eq ? this.toAssignable(c, !1, t) : c, i || Q.call(t), t.shorthandAssign = -1, this.checkLVal(c), this.next(), u.right = this.parseMaybeAssign(e), this.finishNode(u, "AssignmentExpression");}return i && this.checkExpressionErrors(t, !0), n > -1 && (t.parenthesizedAssign = n), s > -1 && (t.trailingComma = s), a > -1 && (t.shorthandAssign = a), c;}, re.parseMaybeConditional = function (e, t) {var r = this.start,i = this.startLoc,n = this.parseExprOps(e, t);if (this.checkExpressionErrors(t)) return n;if (this.eat(_.question)) {var s = this.startNodeAt(r, i);return s.test = n, s.consequent = this.parseMaybeAssign(), this.expect(_.colon), s.alternate = this.parseMaybeAssign(e), this.finishNode(s, "ConditionalExpression");}return n;}, re.parseExprOps = function (e, t) {var r = this.start,i = this.startLoc,n = this.parseMaybeUnary(t, !1);return this.checkExpressionErrors(t) ? n : n.start === r && "ArrowFunctionExpression" === n.type ? n : this.parseExprOp(n, r, i, -1, e);}, re.parseExprOp = function (e, t, r, i, n) {var s = this.type.binop;if (null != s && (!n || this.type !== _._in) && s > i) {var a = this.type === _.logicalOR || this.type === _.logicalAND,o = this.value;this.next();var h = this.start,c = this.startLoc,u = this.parseExprOp(this.parseMaybeUnary(null, !1), h, c, s, n),p = this.buildBinary(t, r, e, u, o, a);return this.parseExprOp(p, t, r, i, n);}return e;}, re.buildBinary = function (e, t, r, i, n, s) {var a = this.startNodeAt(e, t);return a.left = r, a.operator = n, a.right = i, this.finishNode(a, s ? "LogicalExpression" : "BinaryExpression");}, re.parseMaybeUnary = function (e, t) {var r,i = this.start,n = this.startLoc;if (this.isContextual("await") && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction)) r = this.parseAwait(), t = !0;else if (this.type.prefix) {var s = this.startNode(),a = this.type === _.incDec;s.operator = this.value, s.prefix = !0, this.next(), s.argument = this.parseMaybeUnary(null, !0), this.checkExpressionErrors(e, !0), a ? this.checkLVal(s.argument) : this.strict && "delete" === s.operator && "Identifier" === s.argument.type ? this.raiseRecoverable(s.start, "Deleting local variable in strict mode") : t = !0, r = this.finishNode(s, a ? "UpdateExpression" : "UnaryExpression");} else {if (r = this.parseExprSubscripts(e), this.checkExpressionErrors(e)) return r;for (; this.type.postfix && !this.canInsertSemicolon();) {var o = this.startNodeAt(i, n);o.operator = this.value, o.prefix = !1, o.argument = r, this.checkLVal(r), this.next(), r = this.finishNode(o, "UpdateExpression");}}return !t && this.eat(_.starstar) ? this.buildBinary(i, n, r, this.parseMaybeUnary(null, !1), "**", !1) : r;}, re.parseExprSubscripts = function (e) {var t = this.start,r = this.startLoc,i = this.parseExprAtom(e),n = "ArrowFunctionExpression" === i.type && ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd);if (this.checkExpressionErrors(e) || n) return i;var s = this.parseSubscripts(i, t, r);return e && "MemberExpression" === s.type && (e.parenthesizedAssign >= s.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= s.start && (e.parenthesizedBind = -1)), s;}, re.parseSubscripts = function (e, t, r, i) {for (var n = this.options.ecmaVersion >= 8 && "Identifier" === e.type && "async" === e.name && this.lastTokEnd === e.end && !this.canInsertSemicolon() && "async" === this.input.slice(e.start, e.end);;) {var s = this.parseSubscript(e, t, r, i, n);if (s === e || "ArrowFunctionExpression" === s.type) return s;e = s;}}, re.parseSubscript = function (e, t, r, i, n) {var s = this.eat(_.bracketL);if (s || this.eat(_.dot)) {var a = this.startNodeAt(t, r);a.object = e, a.property = s ? this.parseExpression() : this.parseIdent("never" !== this.options.allowReserved), a.computed = !!s, s && this.expect(_.bracketR), e = this.finishNode(a, "MemberExpression");} else if (!i && this.eat(_.parenL)) {var o = new Q(),h = this.yieldPos,c = this.awaitPos,u = this.awaitIdentPos;this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;var p = this.parseExprList(_.parenR, this.options.ecmaVersion >= 8, !1, o);if (n && !this.canInsertSemicolon() && this.eat(_.arrow)) return this.checkPatternErrors(o, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = h, this.awaitPos = c, this.awaitIdentPos = u, this.parseArrowExpression(this.startNodeAt(t, r), p, !0);this.checkExpressionErrors(o, !0), this.yieldPos = h || this.yieldPos, this.awaitPos = c || this.awaitPos, this.awaitIdentPos = u || this.awaitIdentPos;var l = this.startNodeAt(t, r);l.callee = e, l.arguments = p, e = this.finishNode(l, "CallExpression");} else if (this.type === _.backQuote) {var d = this.startNodeAt(t, r);d.tag = e, d.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(d, "TaggedTemplateExpression");}return e;}, re.parseExprAtom = function (e) {this.type === _.slash && this.readRegexp();var t,r = this.potentialArrowAt === this.start;switch (this.type) {case _._super:return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), t = this.startNode(), this.next(), this.type !== _.parenL || this.allowDirectSuper || this.raise(t.start, "super() call outside constructor of a subclass"), this.type !== _.dot && this.type !== _.bracketL && this.type !== _.parenL && this.unexpected(), this.finishNode(t, "Super");case _._this:return t = this.startNode(), this.next(), this.finishNode(t, "ThisExpression");case _.name:var i = this.start,n = this.startLoc,s = this.containsEsc,a = this.parseIdent(!1);if (this.options.ecmaVersion >= 8 && !s && "async" === a.name && !this.canInsertSemicolon() && this.eat(_._function)) return this.parseFunction(this.startNodeAt(i, n), 0, !1, !0);if (r && !this.canInsertSemicolon()) {if (this.eat(_.arrow)) return this.parseArrowExpression(this.startNodeAt(i, n), [a], !1);if (this.options.ecmaVersion >= 8 && "async" === a.name && this.type === _.name && !s) return a = this.parseIdent(!1), !this.canInsertSemicolon() && this.eat(_.arrow) || this.unexpected(), this.parseArrowExpression(this.startNodeAt(i, n), [a], !0);}return a;case _.regexp:var o = this.value;return (t = this.parseLiteral(o.value)).regex = { pattern: o.pattern, flags: o.flags }, t;case _.num:case _.string:return this.parseLiteral(this.value);case _._null:case _._true:case _._false:return (t = this.startNode()).value = this.type === _._null ? null : this.type === _._true, t.raw = this.type.keyword, this.next(), this.finishNode(t, "Literal");case _.parenL:var h = this.start,c = this.parseParenAndDistinguishExpression(r);return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(c) && (e.parenthesizedAssign = h), e.parenthesizedBind < 0 && (e.parenthesizedBind = h)), c;case _.bracketL:return t = this.startNode(), this.next(), t.elements = this.parseExprList(_.bracketR, !0, !0, e), this.finishNode(t, "ArrayExpression");case _.braceL:return this.parseObj(!1, e);case _._function:return t = this.startNode(), this.next(), this.parseFunction(t, 0);case _._class:return this.parseClass(this.startNode(), !1);case _._new:return this.parseNew();case _.backQuote:return this.parseTemplate();case _._import:return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected();default:this.unexpected();}}, re.parseExprImport = function () {var e = this.startNode();switch (this.next(), this.type) {case _.parenL:return this.parseDynamicImport(e);default:this.unexpected();}}, re.parseDynamicImport = function (e) {if (this.next(), e.source = this.parseMaybeAssign(), !this.eat(_.parenR)) {var t = this.start;this.eat(_.comma) && this.eat(_.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);}return this.finishNode(e, "ImportExpression");}, re.parseLiteral = function (e) {var t = this.startNode();return t.value = e, t.raw = this.input.slice(this.start, this.end), 110 === t.raw.charCodeAt(t.raw.length - 1) && (t.bigint = t.raw.slice(0, -1)), this.next(), this.finishNode(t, "Literal");}, re.parseParenExpression = function () {this.expect(_.parenL);var e = this.parseExpression();return this.expect(_.parenR), e;}, re.parseParenAndDistinguishExpression = function (e) {var t,r = this.start,i = this.startLoc,n = this.options.ecmaVersion >= 8;if (this.options.ecmaVersion >= 6) {this.next();var s,a = this.start,o = this.startLoc,h = [],c = !0,u = !1,p = new Q(),l = this.yieldPos,d = this.awaitPos;for (this.yieldPos = 0, this.awaitPos = 0; this.type !== _.parenR;) {if (c ? c = !1 : this.expect(_.comma), n && this.afterTrailingComma(_.parenR, !0)) {u = !0;break;}if (this.type === _.ellipsis) {s = this.start, h.push(this.parseParenItem(this.parseRestBinding())), this.type === _.comma && this.raise(this.start, "Comma is not permitted after the rest element");break;}h.push(this.parseMaybeAssign(!1, p, this.parseParenItem));}var f = this.start,m = this.startLoc;if (this.expect(_.parenR), e && !this.canInsertSemicolon() && this.eat(_.arrow)) return this.checkPatternErrors(p, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = l, this.awaitPos = d, this.parseParenArrowList(r, i, h);h.length && !u || this.unexpected(this.lastTokStart), s && this.unexpected(s), this.checkExpressionErrors(p, !0), this.yieldPos = l || this.yieldPos, this.awaitPos = d || this.awaitPos, h.length > 1 ? ((t = this.startNodeAt(a, o)).expressions = h, this.finishNodeAt(t, "SequenceExpression", f, m)) : t = h[0];} else t = this.parseParenExpression();if (this.options.preserveParens) {var g = this.startNodeAt(r, i);return g.expression = t, this.finishNode(g, "ParenthesizedExpression");}return t;}, re.parseParenItem = function (e) {return e;}, re.parseParenArrowList = function (e, t, r) {return this.parseArrowExpression(this.startNodeAt(e, t), r);};var ie = [];re.parseNew = function () {var e = this.startNode(),t = this.parseIdent(!0);if (this.options.ecmaVersion >= 6 && this.eat(_.dot)) {e.meta = t;var r = this.containsEsc;return e.property = this.parseIdent(!0), ("target" !== e.property.name || r) && this.raiseRecoverable(e.property.start, "The only valid meta property for new is new.target"), this.inNonArrowFunction() || this.raiseRecoverable(e.start, "new.target can only be used in functions"), this.finishNode(e, "MetaProperty");}var i = this.start,n = this.startLoc,s = this.type === _._import;return e.callee = this.parseSubscripts(this.parseExprAtom(), i, n, !0), s && "ImportExpression" === e.callee.type && this.raise(i, "Cannot use new with import()"), this.eat(_.parenL) ? e.arguments = this.parseExprList(_.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = ie, this.finishNode(e, "NewExpression");}, re.parseTemplateElement = function (e) {var t = e.isTagged,r = this.startNode();return this.type === _.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), r.value = { raw: this.value, cooked: null }) : r.value = { raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"), cooked: this.value }, this.next(), r.tail = this.type === _.backQuote, this.finishNode(r, "TemplateElement");}, re.parseTemplate = function (e) {void 0 === e && (e = {});var t = e.isTagged;void 0 === t && (t = !1);var r = this.startNode();this.next(), r.expressions = [];var i = this.parseTemplateElement({ isTagged: t });for (r.quasis = [i]; !i.tail;) {this.type === _.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(_.dollarBraceL), r.expressions.push(this.parseExpression()), this.expect(_.braceR), r.quasis.push(i = this.parseTemplateElement({ isTagged: t }));}return this.next(), this.finishNode(r, "TemplateLiteral");}, re.isAsyncProp = function (e) {return !e.computed && "Identifier" === e.key.type && "async" === e.key.name && (this.type === _.name || this.type === _.num || this.type === _.string || this.type === _.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === _.star) && !C.test(this.input.slice(this.lastTokEnd, this.start));}, re.parseObj = function (e, t) {var r = this.startNode(),i = !0,n = {};for (r.properties = [], this.next(); !this.eat(_.braceR);) {if (i) i = !1;else if (this.expect(_.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(_.braceR)) break;var s = this.parseProperty(e, t);e || this.checkPropClash(s, n, t), r.properties.push(s);}return this.finishNode(r, e ? "ObjectPattern" : "ObjectExpression");}, re.parseProperty = function (e, t) {var r,i,n,s,a = this.startNode();if (this.options.ecmaVersion >= 9 && this.eat(_.ellipsis)) return e ? (a.argument = this.parseIdent(!1), this.type === _.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(a, "RestElement")) : (this.type === _.parenL && t && (t.parenthesizedAssign < 0 && (t.parenthesizedAssign = this.start), t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)), a.argument = this.parseMaybeAssign(!1, t), this.type === _.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(a, "SpreadElement"));this.options.ecmaVersion >= 6 && (a.method = !1, a.shorthand = !1, (e || t) && (n = this.start, s = this.startLoc), e || (r = this.eat(_.star)));var o = this.containsEsc;return this.parsePropertyName(a), !e && !o && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(a) ? (i = !0, r = this.options.ecmaVersion >= 9 && this.eat(_.star), this.parsePropertyName(a, t)) : i = !1, this.parsePropertyValue(a, e, r, i, n, s, t, o), this.finishNode(a, "Property");}, re.parsePropertyValue = function (e, t, r, i, n, s, a, o) {if ((r || i) && this.type === _.colon && this.unexpected(), this.eat(_.colon)) e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, a), e.kind = "init";else if (this.options.ecmaVersion >= 6 && this.type === _.parenL) t && this.unexpected(), e.kind = "init", e.method = !0, e.value = this.parseMethod(r, i);else if (t || o || !(this.options.ecmaVersion >= 5) || e.computed || "Identifier" !== e.key.type || "get" !== e.key.name && "set" !== e.key.name || this.type === _.comma || this.type === _.braceR) this.options.ecmaVersion >= 6 && !e.computed && "Identifier" === e.key.type ? ((r || i) && this.unexpected(), this.checkUnreserved(e.key), "await" !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = n), e.kind = "init", t ? e.value = this.parseMaybeDefault(n, s, e.key) : this.type === _.eq && a ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start), e.value = this.parseMaybeDefault(n, s, e.key)) : e.value = e.key, e.shorthand = !0) : this.unexpected();else {(r || i) && this.unexpected(), e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(!1);var h = "get" === e.kind ? 0 : 1;if (e.value.params.length !== h) {var c = e.value.start;"get" === e.kind ? this.raiseRecoverable(c, "getter should have no params") : this.raiseRecoverable(c, "setter should have exactly one param");} else "set" === e.kind && "RestElement" === e.value.params[0].type && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");}}, re.parsePropertyName = function (e) {if (this.options.ecmaVersion >= 6) {if (this.eat(_.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(_.bracketR), e.key;e.computed = !1;}return e.key = this.type === _.num || this.type === _.string ? this.parseExprAtom() : this.parseIdent("never" !== this.options.allowReserved);}, re.initFunction = function (e) {e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);}, re.parseMethod = function (e, t, r) {var i = this.startNode(),n = this.yieldPos,s = this.awaitPos,a = this.awaitIdentPos;return this.initFunction(i), this.options.ecmaVersion >= 6 && (i.generator = e), this.options.ecmaVersion >= 8 && (i.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(64 | G(t, i.generator) | (r ? 128 : 0)), this.expect(_.parenL), i.params = this.parseBindingList(_.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(i, !1, !0), this.yieldPos = n, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(i, "FunctionExpression");}, re.parseArrowExpression = function (e, t, r) {var i = this.yieldPos,n = this.awaitPos,s = this.awaitIdentPos;return this.enterScope(16 | G(r, !1)), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!r), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1), this.yieldPos = i, this.awaitPos = n, this.awaitIdentPos = s, this.finishNode(e, "ArrowFunctionExpression");}, re.parseFunctionBody = function (e, t, r) {var i = t && this.type !== _.braceL,n = this.strict,s = !1;if (i) e.body = this.parseMaybeAssign(), e.expression = !0, this.checkParams(e, !1);else {var a = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);n && !a || (s = this.strictDirective(this.end)) && a && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list");var o = this.labels;this.labels = [], s && (this.strict = !0), this.checkParams(e, !n && !s && !t && !r && this.isSimpleParamList(e.params)), e.body = this.parseBlock(!1), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = o;}this.exitScope(), this.strict && e.id && this.checkLVal(e.id, 5), this.strict = n;}, re.isSimpleParamList = function (e) {for (var t = 0, r = e; t < r.length; t += 1) {if ("Identifier" !== r[t].type) return !1;}return !0;}, re.checkParams = function (e, t) {for (var r = {}, i = 0, n = e.params; i < n.length; i += 1) {var s = n[i];this.checkLVal(s, 1, t ? null : r);}}, re.parseExprList = function (e, t, r, i) {for (var n = [], s = !0; !this.eat(e);) {if (s) s = !1;else if (this.expect(_.comma), t && this.afterTrailingComma(e)) break;var a = void 0;r && this.type === _.comma ? a = null : this.type === _.ellipsis ? (a = this.parseSpread(i), i && this.type === _.comma && i.trailingComma < 0 && (i.trailingComma = this.start)) : a = this.parseMaybeAssign(!1, i), n.push(a);}return n;}, re.checkUnreserved = function (e) {var t = e.start,r = e.end,i = e.name;(this.inGenerator && "yield" === i && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && "await" === i && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), this.keywords.test(i) && this.raise(t, "Unexpected keyword '" + i + "'"), this.options.ecmaVersion < 6 && -1 !== this.input.slice(t, r).indexOf("\\")) || (this.strict ? this.reservedWordsStrict : this.reservedWords).test(i) && (this.inAsync || "await" !== i || this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + i + "' is reserved"));}, re.parseIdent = function (e, t) {var r = this.startNode();return this.type === _.name ? r.name = this.value : this.type.keyword ? (r.name = this.type.keyword, "class" !== r.name && "function" !== r.name || this.lastTokEnd === this.lastTokStart + 1 && 46 === this.input.charCodeAt(this.lastTokStart) || this.context.pop()) : this.unexpected(), this.next(), this.finishNode(r, "Identifier"), e || (this.checkUnreserved(r), "await" !== r.name || this.awaitIdentPos || (this.awaitIdentPos = r.start)), r;}, re.parseYield = function (e) {this.yieldPos || (this.yieldPos = this.start);var t = this.startNode();return this.next(), this.type === _.semi || this.canInsertSemicolon() || this.type !== _.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(_.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");}, re.parseAwait = function () {this.awaitPos || (this.awaitPos = this.start);var e = this.startNode();return this.next(), e.argument = this.parseMaybeUnary(null, !0), this.finishNode(e, "AwaitExpression");};var ne = W.prototype;ne.raise = function (e, t) {var r = R(this.input, e);t += " (" + r.line + ":" + r.column + ")";var i = new SyntaxError(t);throw i.pos = e, i.loc = r, i.raisedAt = this.pos, i;}, ne.raiseRecoverable = ne.raise, ne.curPosition = function () {if (this.options.locations) return new O(this.curLine, this.pos - this.lineStart);};var se = W.prototype,ae = function ae(e) {this.flags = e, this.var = [], this.lexical = [], this.functions = [];};se.enterScope = function (e) {this.scopeStack.push(new ae(e));}, se.exitScope = function () {this.scopeStack.pop();}, se.treatFunctionsAsVarInScope = function (e) {return e.flags & F || !this.inModule && 1 & e.flags;}, se.declareName = function (e, t, r) {var i = !1;if (2 === t) {var n = this.currentScope();i = n.lexical.indexOf(e) > -1 || n.functions.indexOf(e) > -1 || n.var.indexOf(e) > -1, n.lexical.push(e), this.inModule && 1 & n.flags && delete this.undefinedExports[e];} else if (4 === t) {this.currentScope().lexical.push(e);} else if (3 === t) {var s = this.currentScope();i = this.treatFunctionsAsVar ? s.lexical.indexOf(e) > -1 : s.lexical.indexOf(e) > -1 || s.var.indexOf(e) > -1, s.functions.push(e);} else for (var a = this.scopeStack.length - 1; a >= 0; --a) {var o = this.scopeStack[a];if (o.lexical.indexOf(e) > -1 && !(32 & o.flags && o.lexical[0] === e) || !this.treatFunctionsAsVarInScope(o) && o.functions.indexOf(e) > -1) {i = !0;break;}if (o.var.push(e), this.inModule && 1 & o.flags && delete this.undefinedExports[e], o.flags & H) break;}i && this.raiseRecoverable(r, "Identifier '" + e + "' has already been declared");}, se.checkLocalExport = function (e) {-1 === this.scopeStack[0].lexical.indexOf(e.name) && -1 === this.scopeStack[0].var.indexOf(e.name) && (this.undefinedExports[e.name] = e);}, se.currentScope = function () {return this.scopeStack[this.scopeStack.length - 1];}, se.currentVarScope = function () {for (var e = this.scopeStack.length - 1;; e--) {var t = this.scopeStack[e];if (t.flags & H) return t;}}, se.currentThisScope = function () {for (var e = this.scopeStack.length - 1;; e--) {var t = this.scopeStack[e];if (t.flags & H && !(16 & t.flags)) return t;}};var oe = function oe(e, t, r) {this.type = "", this.start = t, this.end = 0, e.options.locations && (this.loc = new M(e, r)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);},he = W.prototype;function ce(e, t, r, i) {return e.type = t, e.end = r, this.options.locations && (e.loc.end = i), this.options.ranges && (e.range[1] = r), e;}he.startNode = function () {return new oe(this, this.start, this.startLoc);}, he.startNodeAt = function (e, t) {return new oe(this, e, t);}, he.finishNode = function (e, t) {return ce.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);}, he.finishNodeAt = function (e, t, r, i) {return ce.call(this, e, t, r, i);};var ue = function ue(e, t, r, i, n) {this.token = e, this.isExpr = !!t, this.preserveSpace = !!r, this.override = i, this.generator = !!n;},pe = { b_stat: new ue("{", !1), b_expr: new ue("{", !0), b_tmpl: new ue("${", !1), p_stat: new ue("(", !1), p_expr: new ue("(", !0), q_tmpl: new ue("`", !0, !0, function (e) {return e.tryReadTemplateToken();}), f_stat: new ue("function", !1), f_expr: new ue("function", !0), f_expr_gen: new ue("function", !0, !1, null, !0), f_gen: new ue("function", !1, !1, null, !0) },le = W.prototype;le.initialContext = function () {return [pe.b_stat];}, le.braceIsBlock = function (e) {var t = this.curContext();return t === pe.f_expr || t === pe.f_stat || (e !== _.colon || t !== pe.b_stat && t !== pe.b_expr ? e === _._return || e === _.name && this.exprAllowed ? C.test(this.input.slice(this.lastTokEnd, this.start)) : e === _._else || e === _.semi || e === _.eof || e === _.parenR || e === _.arrow || (e === _.braceL ? t === pe.b_stat : e !== _._var && e !== _._const && e !== _.name && !this.exprAllowed) : !t.isExpr);}, le.inGeneratorContext = function () {for (var e = this.context.length - 1; e >= 1; e--) {var t = this.context[e];if ("function" === t.token) return t.generator;}return !1;}, le.updateContext = function (e) {var t,r = this.type;r.keyword && e === _.dot ? this.exprAllowed = !1 : (t = r.updateContext) ? t.call(this, e) : this.exprAllowed = r.beforeExpr;}, _.parenR.updateContext = _.braceR.updateContext = function () {if (1 !== this.context.length) {var e = this.context.pop();e === pe.b_stat && "function" === this.curContext().token && (e = this.context.pop()), this.exprAllowed = !e.isExpr;} else this.exprAllowed = !0;}, _.braceL.updateContext = function (e) {this.context.push(this.braceIsBlock(e) ? pe.b_stat : pe.b_expr), this.exprAllowed = !0;}, _.dollarBraceL.updateContext = function () {this.context.push(pe.b_tmpl), this.exprAllowed = !0;}, _.parenL.updateContext = function (e) {var t = e === _._if || e === _._for || e === _._with || e === _._while;this.context.push(t ? pe.p_stat : pe.p_expr), this.exprAllowed = !0;}, _.incDec.updateContext = function () {}, _._function.updateContext = _._class.updateContext = function (e) {!e.beforeExpr || e === _.semi || e === _._else || e === _._return && C.test(this.input.slice(this.lastTokEnd, this.start)) || (e === _.colon || e === _.braceL) && this.curContext() === pe.b_stat ? this.context.push(pe.f_stat) : this.context.push(pe.f_expr), this.exprAllowed = !1;}, _.backQuote.updateContext = function () {this.curContext() === pe.q_tmpl ? this.context.pop() : this.context.push(pe.q_tmpl), this.exprAllowed = !1;}, _.star.updateContext = function (e) {if (e === _._function) {var t = this.context.length - 1;this.context[t] === pe.f_expr ? this.context[t] = pe.f_expr_gen : this.context[t] = pe.f_gen;}this.exprAllowed = !0;}, _.name.updateContext = function (e) {var t = !1;this.options.ecmaVersion >= 6 && e !== _.dot && ("of" === this.value && !this.exprAllowed || "yield" === this.value && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;};var de = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",fe = de + " Extended_Pictographic",me = { 9: de, 10: fe, 11: "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic" },ge = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",xe = "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",ye = xe + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",ve = { 9: xe, 10: ye, 11: "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho" },be = {};function Se(e) {var t = be[e] = { binary: L(me[e] + " " + ge), nonBinary: { General_Category: L(ge), Script: L(ve[e]) } };t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;}Se(9), Se(10), Se(11);var _e = W.prototype,Ce = function Ce(e) {this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >= 9 ? "s" : ""), this.unicodeProperties = be[e.options.ecmaVersion >= 11 ? 11 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = [], this.backReferenceNames = [];};function ke(e) {return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));}function Ee(e) {return 36 === e || e >= 40 && e <= 43 || 46 === e || 63 === e || e >= 91 && e <= 94 || e >= 123 && e <= 125;}function we(e) {return e >= 65 && e <= 90 || e >= 97 && e <= 122;}function Ie(e) {return we(e) || 95 === e;}function Te(e) {return Ie(e) || Pe(e);}function Pe(e) {return e >= 48 && e <= 57;}function Ae(e) {return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;}function Ne(e) {return e >= 65 && e <= 70 ? e - 65 + 10 : e >= 97 && e <= 102 ? e - 97 + 10 : e - 48;}function Ve(e) {return e >= 48 && e <= 55;}Ce.prototype.reset = function (e, t, r) {var i = -1 !== r.indexOf("u");this.start = 0 | e, this.source = t + "", this.flags = r, this.switchU = i && this.parser.options.ecmaVersion >= 6, this.switchN = i && this.parser.options.ecmaVersion >= 9;}, Ce.prototype.raise = function (e) {this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);}, Ce.prototype.at = function (e) {var t = this.source,r = t.length;if (e >= r) return -1;var i = t.charCodeAt(e);return !this.switchU || i <= 55295 || i >= 57344 || e + 1 >= r ? i : (i << 10) + t.charCodeAt(e + 1) - 56613888;}, Ce.prototype.nextIndex = function (e) {var t = this.source,r = t.length;if (e >= r) return r;var i = t.charCodeAt(e);return !this.switchU || i <= 55295 || i >= 57344 || e + 1 >= r ? e + 1 : e + 2;}, Ce.prototype.current = function () {return this.at(this.pos);}, Ce.prototype.lookahead = function () {return this.at(this.nextIndex(this.pos));}, Ce.prototype.advance = function () {this.pos = this.nextIndex(this.pos);}, Ce.prototype.eat = function (e) {return this.current() === e && (this.advance(), !0);}, _e.validateRegExpFlags = function (e) {for (var t = e.validFlags, r = e.flags, i = 0; i < r.length; i++) {var n = r.charAt(i);-1 === t.indexOf(n) && this.raise(e.start, "Invalid regular expression flag"), r.indexOf(n, i + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag");}}, _e.validateRegExpPattern = function (e) {this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && e.groupNames.length > 0 && (e.switchN = !0, this.regexp_pattern(e));}, _e.regexp_pattern = function (e) {e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames.length = 0, e.backReferenceNames.length = 0, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");for (var t = 0, r = e.backReferenceNames; t < r.length; t += 1) {var i = r[t];-1 === e.groupNames.indexOf(i) && e.raise("Invalid named capture referenced");}}, _e.regexp_disjunction = function (e) {for (this.regexp_alternative(e); e.eat(124);) {this.regexp_alternative(e);}this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets");}, _e.regexp_alternative = function (e) {for (; e.pos < e.source.length && this.regexp_eatTerm(e);) {;}}, _e.regexp_eatTerm = function (e) {return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : !(e.switchU ? !this.regexp_eatAtom(e) : !this.regexp_eatExtendedAtom(e)) && (this.regexp_eatQuantifier(e), !0);}, _e.regexp_eatAssertion = function (e) {var t = e.pos;if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;if (e.eat(92)) {if (e.eat(66) || e.eat(98)) return !0;e.pos = t;}if (e.eat(40) && e.eat(63)) {var r = !1;if (this.options.ecmaVersion >= 9 && (r = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !r, !0;}return e.pos = t, !1;}, _e.regexp_eatQuantifier = function (e, t) {return void 0 === t && (t = !1), !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), !0);}, _e.regexp_eatQuantifierPrefix = function (e, t) {return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);}, _e.regexp_eatBracedQuantifier = function (e, t) {var r = e.pos;if (e.eat(123)) {var i = 0,n = -1;if (this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue), e.eat(125))) return -1 !== n && n < i && !t && e.raise("numbers out of order in {} quantifier"), !0;e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = r;}return !1;}, _e.regexp_eatAtom = function (e) {return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);}, _e.regexp_eatReverseSolidusAtomEscape = function (e) {var t = e.pos;if (e.eat(92)) {if (this.regexp_eatAtomEscape(e)) return !0;e.pos = t;}return !1;}, _e.regexp_eatUncapturingGroup = function (e) {var t = e.pos;if (e.eat(40)) {if (e.eat(63) && e.eat(58)) {if (this.regexp_disjunction(e), e.eat(41)) return !0;e.raise("Unterminated group");}e.pos = t;}return !1;}, _e.regexp_eatCapturingGroup = function (e) {if (e.eat(40)) {if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : 63 === e.current() && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;e.raise("Unterminated group");}return !1;}, _e.regexp_eatExtendedAtom = function (e) {return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);}, _e.regexp_eatInvalidBracedQuantifier = function (e) {return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;}, _e.regexp_eatSyntaxCharacter = function (e) {var t = e.current();return !!Ee(t) && (e.lastIntValue = t, e.advance(), !0);}, _e.regexp_eatPatternCharacters = function (e) {for (var t = e.pos, r = 0; -1 !== (r = e.current()) && !Ee(r);) {e.advance();}return e.pos !== t;}, _e.regexp_eatExtendedPatternCharacter = function (e) {var t = e.current();return !(-1 === t || 36 === t || t >= 40 && t <= 43 || 46 === t || 63 === t || 91 === t || 94 === t || 124 === t) && (e.advance(), !0);}, _e.regexp_groupSpecifier = function (e) {if (e.eat(63)) {if (this.regexp_eatGroupName(e)) return -1 !== e.groupNames.indexOf(e.lastStringValue) && e.raise("Duplicate capture group name"), void e.groupNames.push(e.lastStringValue);e.raise("Invalid group");}}, _e.regexp_eatGroupName = function (e) {if (e.lastStringValue = "", e.eat(60)) {if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;e.raise("Invalid capture group name");}return !1;}, _e.regexp_eatRegExpIdentifierName = function (e) {if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {for (e.lastStringValue += ke(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) {e.lastStringValue += ke(e.lastIntValue);}return !0;}return !1;}, _e.regexp_eatRegExpIdentifierStart = function (e) {var t = e.pos,r = e.current();return e.advance(), 92 === r && this.regexp_eatRegExpUnicodeEscapeSequence(e) && (r = e.lastIntValue), function (e) {return f(e, !0) || 36 === e || 95 === e;}(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);}, _e.regexp_eatRegExpIdentifierPart = function (e) {var t = e.pos,r = e.current();return e.advance(), 92 === r && this.regexp_eatRegExpUnicodeEscapeSequence(e) && (r = e.lastIntValue), function (e) {return m(e, !0) || 36 === e || 95 === e || 8204 === e || 8205 === e;}(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);}, _e.regexp_eatAtomEscape = function (e) {return !!(this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e)) || (e.switchU && (99 === e.current() && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);}, _e.regexp_eatBackReference = function (e) {var t = e.pos;if (this.regexp_eatDecimalEscape(e)) {var r = e.lastIntValue;if (e.switchU) return r > e.maxBackReference && (e.maxBackReference = r), !0;if (r <= e.numCapturingParens) return !0;e.pos = t;}return !1;}, _e.regexp_eatKGroupName = function (e) {if (e.eat(107)) {if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;e.raise("Invalid named reference");}return !1;}, _e.regexp_eatCharacterEscape = function (e) {return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);}, _e.regexp_eatCControlLetter = function (e) {var t = e.pos;if (e.eat(99)) {if (this.regexp_eatControlLetter(e)) return !0;e.pos = t;}return !1;}, _e.regexp_eatZero = function (e) {return 48 === e.current() && !Pe(e.lookahead()) && (e.lastIntValue = 0, e.advance(), !0);}, _e.regexp_eatControlEscape = function (e) {var t = e.current();return 116 === t ? (e.lastIntValue = 9, e.advance(), !0) : 110 === t ? (e.lastIntValue = 10, e.advance(), !0) : 118 === t ? (e.lastIntValue = 11, e.advance(), !0) : 102 === t ? (e.lastIntValue = 12, e.advance(), !0) : 114 === t && (e.lastIntValue = 13, e.advance(), !0);}, _e.regexp_eatControlLetter = function (e) {var t = e.current();return !!we(t) && (e.lastIntValue = t % 32, e.advance(), !0);}, _e.regexp_eatRegExpUnicodeEscapeSequence = function (e) {var t,r = e.pos;if (e.eat(117)) {if (this.regexp_eatFixedHexDigits(e, 4)) {var i = e.lastIntValue;if (e.switchU && i >= 55296 && i <= 56319) {var n = e.pos;if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {var s = e.lastIntValue;if (s >= 56320 && s <= 57343) return e.lastIntValue = 1024 * (i - 55296) + (s - 56320) + 65536, !0;}e.pos = n, e.lastIntValue = i;}return !0;}if (e.switchU && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && (t = e.lastIntValue) >= 0 && t <= 1114111) return !0;e.switchU && e.raise("Invalid unicode escape"), e.pos = r;}return !1;}, _e.regexp_eatIdentityEscape = function (e) {if (e.switchU) return !!this.regexp_eatSyntaxCharacter(e) || !!e.eat(47) && (e.lastIntValue = 47, !0);var t = e.current();return !(99 === t || e.switchN && 107 === t) && (e.lastIntValue = t, e.advance(), !0);}, _e.regexp_eatDecimalEscape = function (e) {e.lastIntValue = 0;var t = e.current();if (t >= 49 && t <= 57) {do {e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();} while ((t = e.current()) >= 48 && t <= 57);return !0;}return !1;}, _e.regexp_eatCharacterClassEscape = function (e) {var t = e.current();if (function (e) {return 100 === e || 68 === e || 115 === e || 83 === e || 119 === e || 87 === e;}(t)) return e.lastIntValue = -1, e.advance(), !0;if (e.switchU && this.options.ecmaVersion >= 9 && (80 === t || 112 === t)) {if (e.lastIntValue = -1, e.advance(), e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125)) return !0;e.raise("Invalid property name");}return !1;}, _e.regexp_eatUnicodePropertyValueExpression = function (e) {var t = e.pos;if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {var r = e.lastStringValue;if (this.regexp_eatUnicodePropertyValue(e)) {var i = e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e, r, i), !0;}}if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {var n = e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e, n), !0;}return !1;}, _e.regexp_validateUnicodePropertyNameAndValue = function (e, t, r) {N(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(r) || e.raise("Invalid property value");}, _e.regexp_validateUnicodePropertyNameOrValue = function (e, t) {e.unicodeProperties.binary.test(t) || e.raise("Invalid property name");}, _e.regexp_eatUnicodePropertyName = function (e) {var t = 0;for (e.lastStringValue = ""; Ie(t = e.current());) {e.lastStringValue += ke(t), e.advance();}return "" !== e.lastStringValue;}, _e.regexp_eatUnicodePropertyValue = function (e) {var t = 0;for (e.lastStringValue = ""; Te(t = e.current());) {e.lastStringValue += ke(t), e.advance();}return "" !== e.lastStringValue;}, _e.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {return this.regexp_eatUnicodePropertyValue(e);}, _e.regexp_eatCharacterClass = function (e) {if (e.eat(91)) {if (e.eat(94), this.regexp_classRanges(e), e.eat(93)) return !0;e.raise("Unterminated character class");}return !1;}, _e.regexp_classRanges = function (e) {for (; this.regexp_eatClassAtom(e);) {var t = e.lastIntValue;if (e.eat(45) && this.regexp_eatClassAtom(e)) {var r = e.lastIntValue;!e.switchU || -1 !== t && -1 !== r || e.raise("Invalid character class"), -1 !== t && -1 !== r && t > r && e.raise("Range out of order in character class");}}}, _e.regexp_eatClassAtom = function (e) {var t = e.pos;if (e.eat(92)) {if (this.regexp_eatClassEscape(e)) return !0;if (e.switchU) {var r = e.current();(99 === r || Ve(r)) && e.raise("Invalid class escape"), e.raise("Invalid escape");}e.pos = t;}var i = e.current();return 93 !== i && (e.lastIntValue = i, e.advance(), !0);}, _e.regexp_eatClassEscape = function (e) {var t = e.pos;if (e.eat(98)) return e.lastIntValue = 8, !0;if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;if (!e.switchU && e.eat(99)) {if (this.regexp_eatClassControlLetter(e)) return !0;e.pos = t;}return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);}, _e.regexp_eatClassControlLetter = function (e) {var t = e.current();return !(!Pe(t) && 95 !== t) && (e.lastIntValue = t % 32, e.advance(), !0);}, _e.regexp_eatHexEscapeSequence = function (e) {var t = e.pos;if (e.eat(120)) {if (this.regexp_eatFixedHexDigits(e, 2)) return !0;e.switchU && e.raise("Invalid escape"), e.pos = t;}return !1;}, _e.regexp_eatDecimalDigits = function (e) {var t = e.pos,r = 0;for (e.lastIntValue = 0; Pe(r = e.current());) {e.lastIntValue = 10 * e.lastIntValue + (r - 48), e.advance();}return e.pos !== t;}, _e.regexp_eatHexDigits = function (e) {var t = e.pos,r = 0;for (e.lastIntValue = 0; Ae(r = e.current());) {e.lastIntValue = 16 * e.lastIntValue + Ne(r), e.advance();}return e.pos !== t;}, _e.regexp_eatLegacyOctalEscapeSequence = function (e) {if (this.regexp_eatOctalDigit(e)) {var t = e.lastIntValue;if (this.regexp_eatOctalDigit(e)) {var r = e.lastIntValue;t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = 64 * t + 8 * r + e.lastIntValue : e.lastIntValue = 8 * t + r;} else e.lastIntValue = t;return !0;}return !1;}, _e.regexp_eatOctalDigit = function (e) {var t = e.current();return Ve(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);}, _e.regexp_eatFixedHexDigits = function (e, t) {var r = e.pos;e.lastIntValue = 0;for (var i = 0; i < t; ++i) {var n = e.current();if (!Ae(n)) return e.pos = r, !1;e.lastIntValue = 16 * e.lastIntValue + Ne(n), e.advance();}return !0;};var Le = function Le(e) {this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new M(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);},Oe = W.prototype;function Me(e) {return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));}Oe.next = function () {this.options.onToken && this.options.onToken(new Le(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();}, Oe.getToken = function () {return this.next(), new Le(this);}, "undefined" !== typeof Symbol && (Oe[Symbol.iterator] = function () {var e = this;return { next: function next() {var t = e.getToken();return { done: t.type === _.eof, value: t };} };}), Oe.curContext = function () {return this.context[this.context.length - 1];}, Oe.nextToken = function () {var e = this.curContext();return e && e.preserveSpace || this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length ? this.finishToken(_.eof) : e.override ? e.override(this) : void this.readToken(this.fullCharCodeAtPos());}, Oe.readToken = function (e) {return f(e, this.options.ecmaVersion >= 6) || 92 === e ? this.readWord() : this.getTokenFromCode(e);}, Oe.fullCharCodeAtPos = function () {var e = this.input.charCodeAt(this.pos);return e <= 55295 || e >= 57344 ? e : (e << 10) + this.input.charCodeAt(this.pos + 1) - 56613888;}, Oe.skipBlockComment = function () {var e,t = this.options.onComment && this.curPosition(),r = this.pos,i = this.input.indexOf("*/", this.pos += 2);if (-1 === i && this.raise(this.pos - 2, "Unterminated comment"), this.pos = i + 2, this.options.locations) for (k.lastIndex = r; (e = k.exec(this.input)) && e.index < this.pos;) {++this.curLine, this.lineStart = e.index + e[0].length;}this.options.onComment && this.options.onComment(!0, this.input.slice(r + 2, i), r, this.pos, t, this.curPosition());}, Oe.skipLineComment = function (e) {for (var t = this.pos, r = this.options.onComment && this.curPosition(), i = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !E(i);) {i = this.input.charCodeAt(++this.pos);}this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, r, this.curPosition());}, Oe.skipSpace = function () {e: for (; this.pos < this.input.length;) {var e = this.input.charCodeAt(this.pos);switch (e) {case 32:case 160:++this.pos;break;case 13:10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;case 10:case 8232:case 8233:++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);break;case 47:switch (this.input.charCodeAt(this.pos + 1)) {case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e;}break;default:if (!(e > 8 && e < 14 || e >= 5760 && w.test(String.fromCharCode(e)))) break e;++this.pos;}}}, Oe.finishToken = function (e, t) {this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());var r = this.type;this.type = e, this.value = t, this.updateContext(r);}, Oe.readToken_dot = function () {var e = this.input.charCodeAt(this.pos + 1);if (e >= 48 && e <= 57) return this.readNumber(!0);var t = this.input.charCodeAt(this.pos + 2);return this.options.ecmaVersion >= 6 && 46 === e && 46 === t ? (this.pos += 3, this.finishToken(_.ellipsis)) : (++this.pos, this.finishToken(_.dot));}, Oe.readToken_slash = function () {var e = this.input.charCodeAt(this.pos + 1);return this.exprAllowed ? (++this.pos, this.readRegexp()) : 61 === e ? this.finishOp(_.assign, 2) : this.finishOp(_.slash, 1);}, Oe.readToken_mult_modulo_exp = function (e) {var t = this.input.charCodeAt(this.pos + 1),r = 1,i = 42 === e ? _.star : _.modulo;return this.options.ecmaVersion >= 7 && 42 === e && 42 === t && (++r, i = _.starstar, t = this.input.charCodeAt(this.pos + 2)), 61 === t ? this.finishOp(_.assign, r + 1) : this.finishOp(i, r);}, Oe.readToken_pipe_amp = function (e) {var t = this.input.charCodeAt(this.pos + 1);return t === e ? this.finishOp(124 === e ? _.logicalOR : _.logicalAND, 2) : 61 === t ? this.finishOp(_.assign, 2) : this.finishOp(124 === e ? _.bitwiseOR : _.bitwiseAND, 1);}, Oe.readToken_caret = function () {return 61 === this.input.charCodeAt(this.pos + 1) ? this.finishOp(_.assign, 2) : this.finishOp(_.bitwiseXOR, 1);}, Oe.readToken_plus_min = function (e) {var t = this.input.charCodeAt(this.pos + 1);return t === e ? 45 !== t || this.inModule || 62 !== this.input.charCodeAt(this.pos + 2) || 0 !== this.lastTokEnd && !C.test(this.input.slice(this.lastTokEnd, this.pos)) ? this.finishOp(_.incDec, 2) : (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : 61 === t ? this.finishOp(_.assign, 2) : this.finishOp(_.plusMin, 1);}, Oe.readToken_lt_gt = function (e) {var t = this.input.charCodeAt(this.pos + 1),r = 1;return t === e ? (r = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2, 61 === this.input.charCodeAt(this.pos + r) ? this.finishOp(_.assign, r + 1) : this.finishOp(_.bitShift, r)) : 33 !== t || 60 !== e || this.inModule || 45 !== this.input.charCodeAt(this.pos + 2) || 45 !== this.input.charCodeAt(this.pos + 3) ? (61 === t && (r = 2), this.finishOp(_.relational, r)) : (this.skipLineComment(4), this.skipSpace(), this.nextToken());}, Oe.readToken_eq_excl = function (e) {var t = this.input.charCodeAt(this.pos + 1);return 61 === t ? this.finishOp(_.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2) : 61 === e && 62 === t && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(_.arrow)) : this.finishOp(61 === e ? _.eq : _.prefix, 1);}, Oe.getTokenFromCode = function (e) {switch (e) {case 46:return this.readToken_dot();case 40:return ++this.pos, this.finishToken(_.parenL);case 41:return ++this.pos, this.finishToken(_.parenR);case 59:return ++this.pos, this.finishToken(_.semi);case 44:return ++this.pos, this.finishToken(_.comma);case 91:return ++this.pos, this.finishToken(_.bracketL);case 93:return ++this.pos, this.finishToken(_.bracketR);case 123:return ++this.pos, this.finishToken(_.braceL);case 125:return ++this.pos, this.finishToken(_.braceR);case 58:return ++this.pos, this.finishToken(_.colon);case 63:return ++this.pos, this.finishToken(_.question);case 96:if (this.options.ecmaVersion < 6) break;return ++this.pos, this.finishToken(_.backQuote);case 48:var t = this.input.charCodeAt(this.pos + 1);if (120 === t || 88 === t) return this.readRadixNumber(16);if (this.options.ecmaVersion >= 6) {if (111 === t || 79 === t) return this.readRadixNumber(8);if (98 === t || 66 === t) return this.readRadixNumber(2);}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 126:return this.finishOp(_.prefix, 1);}this.raise(this.pos, "Unexpected character '" + Me(e) + "'");}, Oe.finishOp = function (e, t) {var r = this.input.slice(this.pos, this.pos + t);return this.pos += t, this.finishToken(e, r);}, Oe.readRegexp = function () {for (var e, t, r = this.pos;;) {this.pos >= this.input.length && this.raise(r, "Unterminated regular expression");var i = this.input.charAt(this.pos);if (C.test(i) && this.raise(r, "Unterminated regular expression"), e) e = !1;else {if ("[" === i) t = !0;else if ("]" === i && t) t = !1;else if ("/" === i && !t) break;e = "\\" === i;}++this.pos;}var n = this.input.slice(r, this.pos);++this.pos;var s = this.pos,a = this.readWord1();this.containsEsc && this.unexpected(s);var o = this.regexpState || (this.regexpState = new Ce(this));o.reset(r, n, a), this.validateRegExpFlags(o), this.validateRegExpPattern(o);var h = null;try {h = new RegExp(n, a);} catch (c) {}return this.finishToken(_.regexp, { pattern: n, flags: a, value: h });}, Oe.readInt = function (e, t) {for (var r = this.pos, i = 0, n = 0, s = null == t ? 1 / 0 : t; n < s; ++n) {var a = this.input.charCodeAt(this.pos),o = void 0;if ((o = a >= 97 ? a - 97 + 10 : a >= 65 ? a - 65 + 10 : a >= 48 && a <= 57 ? a - 48 : 1 / 0) >= e) break;++this.pos, i = i * e + o;}return this.pos === r || null != t && this.pos - r !== t ? null : i;}, Oe.readRadixNumber = function (e) {var t = this.pos;this.pos += 2;var r = this.readInt(e);return null == r && this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && 110 === this.input.charCodeAt(this.pos) ? (r = "undefined" !== typeof BigInt ? BigInt(this.input.slice(t, this.pos)) : null, ++this.pos) : f(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(_.num, r);}, Oe.readNumber = function (e) {var t = this.pos;e || null !== this.readInt(10) || this.raise(t, "Invalid number");var r = this.pos - t >= 2 && 48 === this.input.charCodeAt(t);r && this.strict && this.raise(t, "Invalid number"), r && /[89]/.test(this.input.slice(t, this.pos)) && (r = !1);var i = this.input.charCodeAt(this.pos);if (!r && !e && this.options.ecmaVersion >= 11 && 110 === i) {var n = this.input.slice(t, this.pos),s = "undefined" !== typeof BigInt ? BigInt(n) : null;return ++this.pos, f(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(_.num, s);}46 !== i || r || (++this.pos, this.readInt(10), i = this.input.charCodeAt(this.pos)), 69 !== i && 101 !== i || r || (43 !== (i = this.input.charCodeAt(++this.pos)) && 45 !== i || ++this.pos, null === this.readInt(10) && this.raise(t, "Invalid number")), f(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");var a = this.input.slice(t, this.pos),o = r ? parseInt(a, 8) : parseFloat(a);return this.finishToken(_.num, o);}, Oe.readCodePoint = function () {var e;if (123 === this.input.charCodeAt(this.pos)) {this.options.ecmaVersion < 6 && this.unexpected();var t = ++this.pos;e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, e > 1114111 && this.invalidStringToken(t, "Code point out of bounds");} else e = this.readHexChar(4);return e;}, Oe.readString = function (e) {for (var t = "", r = ++this.pos;;) {this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");var i = this.input.charCodeAt(this.pos);if (i === e) break;92 === i ? (t += this.input.slice(r, this.pos), t += this.readEscapedChar(!1), r = this.pos) : (E(i, this.options.ecmaVersion >= 10) && this.raise(this.start, "Unterminated string constant"), ++this.pos);}return t += this.input.slice(r, this.pos++), this.finishToken(_.string, t);};var Re = {};Oe.tryReadTemplateToken = function () {this.inTemplateElement = !0;try {this.readTmplToken();} catch (e) {if (e !== Re) throw e;this.readInvalidTemplateToken();}this.inTemplateElement = !1;}, Oe.invalidStringToken = function (e, t) {if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Re;this.raise(e, t);}, Oe.readTmplToken = function () {for (var e = "", t = this.pos;;) {this.pos >= this.input.length && this.raise(this.start, "Unterminated template");var r = this.input.charCodeAt(this.pos);if (96 === r || 36 === r && 123 === this.input.charCodeAt(this.pos + 1)) return this.pos !== this.start || this.type !== _.template && this.type !== _.invalidTemplate ? (e += this.input.slice(t, this.pos), this.finishToken(_.template, e)) : 36 === r ? (this.pos += 2, this.finishToken(_.dollarBraceL)) : (++this.pos, this.finishToken(_.backQuote));if (92 === r) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;else if (E(r)) {switch (e += this.input.slice(t, this.pos), ++this.pos, r) {case 13:10 === this.input.charCodeAt(this.pos) && ++this.pos;case 10:e += "\n";break;default:e += String.fromCharCode(r);}this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;} else ++this.pos;}}, Oe.readInvalidTemplateToken = function () {for (; this.pos < this.input.length; this.pos++) {switch (this.input[this.pos]) {case "\\":++this.pos;break;case "$":if ("{" !== this.input[this.pos + 1]) break;case "`":return this.finishToken(_.invalidTemplate, this.input.slice(this.start, this.pos));}}this.raise(this.start, "Unterminated template");}, Oe.readEscapedChar = function (e) {var t = this.input.charCodeAt(++this.pos);switch (++this.pos, t) {case 110:return "\n";case 114:return "\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return Me(this.readCodePoint());case 116:return "\t";case 98:return "\b";case 118:return "\v";case 102:return "\f";case 13:10 === this.input.charCodeAt(this.pos) && ++this.pos;case 10:return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";default:if (t >= 48 && t <= 55) {var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],i = parseInt(r, 8);return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), "0" === r && 56 !== t && 57 !== t || !this.strict && !e || this.invalidStringToken(this.pos - 1 - r.length, e ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(i);}return E(t) ? "" : String.fromCharCode(t);}}, Oe.readHexChar = function (e) {var t = this.pos,r = this.readInt(16, e);return null === r && this.invalidStringToken(t, "Bad character escape sequence"), r;}, Oe.readWord1 = function () {this.containsEsc = !1;for (var e = "", t = !0, r = this.pos, i = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {var n = this.fullCharCodeAtPos();if (m(n, i)) this.pos += n <= 65535 ? 1 : 2;else {if (92 !== n) break;this.containsEsc = !0, e += this.input.slice(r, this.pos);var s = this.pos;117 !== this.input.charCodeAt(++this.pos) && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;var a = this.readCodePoint();(t ? f : m)(a, i) || this.invalidStringToken(s, "Invalid Unicode escape"), e += Me(a), r = this.pos;}t = !1;}return e + this.input.slice(r, this.pos);}, Oe.readWord = function () {var e = this.readWord1(),t = _.name;return this.keywords.test(e) && (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + e), t = b[e]), this.finishToken(t, e);};var De = "7.1.0";function Be(e, t) {return W.parse(e, t);}function Fe(e, t, r) {return W.parseExpressionAt(e, t, r);}function He(e, t) {return W.tokenizer(e, t);}W.acorn = { Parser: W, version: De, defaultOptions: D, Position: O, SourceLocation: M, getLineInfo: R, Node: oe, TokenType: g, tokTypes: _, keywordTypes: b, TokContext: ue, tokContexts: pe, isIdentifierChar: m, isIdentifierStart: f, Token: Le, isNewLine: E, lineBreak: C, lineBreakG: k, nonASCIIwhitespace: w };}, function (e, t, r) {"use strict";var i = r(0);Object.defineProperty(t, "__esModule", { value: !0 }), t.Messages = t.InterruptThrowReferenceError = t.InterruptThrowSyntaxError = t.InterruptThrowError = t.ThrowTypeError = t.ThrowReferenceError = t.ThrowSyntaxError = t.ThrowError = void 0;var n = i(r(12)),s = i(r(13)),a = function (e) {function t() {return e.apply(this, arguments) || this;}return (0, n.default)(t, e), t;}((0, s.default)(Error));t.ThrowError = a;var o = function (e) {function t() {return e.apply(this, arguments) || this;}return (0, n.default)(t, e), t;}((0, s.default)(SyntaxError));t.ThrowSyntaxError = o;var h = function (e) {function t() {return e.apply(this, arguments) || this;}return (0, n.default)(t, e), t;}((0, s.default)(ReferenceError));t.ThrowReferenceError = h;var c = function (e) {function t() {return e.apply(this, arguments) || this;}return (0, n.default)(t, e), t;}((0, s.default)(TypeError));t.ThrowTypeError = c;var u = function (e) {function t() {return e.apply(this, arguments) || this;}return (0, n.default)(t, e), t;}(a);t.InterruptThrowError = u;var p = function (e) {function t() {return e.apply(this, arguments) || this;}return (0, n.default)(t, e), t;}(o);t.InterruptThrowSyntaxError = p;var l = function (e) {function t() {return e.apply(this, arguments) || this;}return (0, n.default)(t, e), t;}(h);t.InterruptThrowReferenceError = l;var d = { UnknownError: [3001, "%0", u], ExecutionTimeOutError: [3002, "Script execution timed out after %0ms", u], NodeTypeSyntaxError: [1001, "Unknown node type: %0", l], BinaryOperatorSyntaxError: [1002, "Unknown binary operator: %0", l], LogicalOperatorSyntaxError: [1003, "Unknown logical operator: %0", l], UnaryOperatorSyntaxError: [1004, "Unknown unary operator: %0", l], UpdateOperatorSyntaxError: [1005, "Unknown update operator: %0", l], ObjectStructureSyntaxError: [1006, "Unknown object structure: %0", l], AssignmentExpressionSyntaxError: [1007, "Unknown assignment expression: %0", l], VariableTypeSyntaxError: [1008, "Unknown variable type: %0", l], ParamTypeSyntaxError: [1009, "Unknown param type: %0", l], AssignmentTypeSyntaxError: [1010, "Unknown assignment type: %0", l], FunctionUndefinedReferenceError: [2001, "%0 is not a function", h], VariableUndefinedReferenceError: [2002, "%0 is not defined", h], IsNotConstructor: [2003, "%0 is not a constructor", c] };t.Messages = d;}, function (e, t) {e.exports = function (e, t) {e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;};}, function (e, t, r) {var i = r(14),n = r(4),s = r(15),a = r(3);function o(t) {var r = "function" === typeof Map ? new Map() : void 0;return e.exports = o = function o(e) {if (null === e || !s(e)) return e;if ("function" !== typeof e) throw new TypeError("Super expression must either be null or a function");if ("undefined" !== typeof r) {if (r.has(e)) return r.get(e);r.set(e, t);}function t() {return a(e, arguments, i(this).constructor);}return t.prototype = Object.create(e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), n(t, e);}, o(t);}e.exports = o;}, function (e, t) {function r(t) {return e.exports = r = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {return e.__proto__ || Object.getPrototypeOf(e);}, r(t);}e.exports = r;}, function (e, t) {e.exports = function (e) {return -1 !== Function.toString.call(e).indexOf("[native code]");};}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.default = void 0;var i = r(1);t.default = function (e, t, r) {return (0, i.runInContext)(e, t, r);};}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function () {for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {t[r] = arguments[r];}var n = t.pop();return (0, i.compileFunction)(n || "", t);};var i = r(1);}]);});

/***/ }),

/***/ 36:
/*!*****************************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/plateform/duanshi.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 37:
/*!************************************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/plateform/duanshi_active.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 38:
/*!*************************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/plateform/9.9.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 39:
/*!********************************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/plateform/9.9_active.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA8CAYAAADbl8wjAAAVGElEQVR4XrVbaZhU1bVd+9yaqxsaEJAhSgwOaRXBgq6uRjMSnz6TZ/ySaBDHgDFoIIqSwagBI+oXZh4+xAHzNA5RE18GPzOoMSZQPdCCRjoxkmhEBGXqsaqr6t6z3nduD1RVV1dXd5vbP/vWOfusc84e1l5XUMJDwINodEwnrVOpMJPAVAhGCeAhqSGqXQvfhdaveclXDtv23omNjYkShh72KwSs9pqaMdC6UkRmWpATNTBaESGtYAvQpjX2Avo1L/BKS2vrnnFNTe0DTSzFXiAgLaefXuENh6tFqfOoGRWR8STCAL0ioggQgA2gE8ARgE0AfptMJH4z5tVX35eu//1bHkYiI9stf8Sy+HlQYhRMwFHbLGMYgEyXbXJEwL8TfD6TyTw3ktwjjY3mfwWffoExO5GOxU60gUsAOY/ASUKUQ6QImKRA0oB+h5Q/k87jrXv2bJ343nsf6ukhoFKRyEcdr38ugPMhOAXEyOK2mfUzA3KvQGpJPJFoPvTi2DfeaCuETMFFMhLxtit/zPLiamqcC2A0RFTp204KkQRYL1APBFqP/EJKOL6ljG82LDGr5kx45BpQnw/IuMHaBrN55A6QD6VTySdH7dzZnD93H2DcOzsrdpayZAkEcwAJlWJw4XdoC/iaaL02oNTPJB5PDn0s985ayVgsqolvKZH/JMyVLnaCi87mAPw7qDckjhx5NP/k5ABjfEpiZmy6eHALRc4DJNjPggnzJ0K4twdSxEAHxE5L9C3+ePz3AjhDBaftzOqPi0/dpiBfoBhQCj10bRMRTVIVtc0NHHxDa7m9rK3559LUlO4ZMQeYjhkzJsIXuE2UzCOkrM+0pBaRD0C9lyIHux1uQIAxEEwiMQ4Qq6+5tAH+xgGWjojH/zYUYBiJHNPh9S4VUV8HpKKQbRAcEuBdEgchSBD0CzEawESIHAuIp/DvJA4nc32ovr5RuoKJ2emuh1On+hNjx14K4g6IOrbvnWOCwC4Qz2o6L3vIt5lKpcXv98GyjtMiZwvwHyCm9wNqC4B1nXTWjKmrax0MOETE2x71f8kS+RGFk/ueTqYA/BXgc5bWf4Bt/VPb7JSweDI2JnqEs6FwriZmiqiRBTYuIYIH7VTq9hGNjWbDjwLTWlV1kkdZ9wFyNvMcrYDtmniWwk1lWu9AXV27ALoXVDPO7NllyUzmNCjPtRB8sQ845lwLdhGcH4zHG3p2phSAkjNqjtcB3COQc42fyftNCtQvkrIuk0rUV+zc2drHtmnTQplAYGpGea6hYK4AI3PBJUXwlnKcb9xdV/fCMkC7J2bP5MnBMZOPW0DBMkDM0ct62Cnkzy3HvtPX0PDX7EnzF2XCaHs0eool1q0UXAiIP/sdAdsEXBdQaqVs3VowTPYZMxLxdng8F4vyrASQc5IFzBDygmh7ebCuzoDdr/8y/jMViZzg+HxLQXUp+vgodoLYYrc23zqyqemwC0xi1qyP0OO9XyBzcnbEdU6oE+obgrW19aXssjEgGY3OprLWm2uVE0pJc3/rLDqXB+rq3izltLSfFh2vytUGQgzQ3l7nSGqCu0i5KVy37YVSnLqxrWNWzRmwuFaJOjtvrSZXNdfxsnBt7Svi5gXV1edD1P8AMinvtHygwJsDBw78RHbvNve4pGf/tGnhsnB4oUBuBmRU7gHk+yJcFIz7nxG8VDQrNgvpjMU+QcgWAh/NO/5HRLAi2N5+r7z2WkdJhhlfWlnpS5SXXwpl3Q3I2Lz1Hgb190P79/9YWmKx0V7KzQQWQnJyFhPnfyN2ZmGooWFPqRP3vNcWjVYqZf0YxMzcjJRJEvdnOhM/KJRY5VziadPCHeHwYoF8F5ARvf8z0RHYZtvpBSO2b39jsLYla2qO15QHQH4mNzlkmuBPYdvfls5o9EQt6j5CPpm3gMNa87ayQwceGMxp6XXI0eiIJNQtEHVtTs7hhny+jHT6ilBj4zvFFtURiUwQn9+c5M+7hWz3Q+OrqFeHEolVgzktvb+PREIdXv8iAb4Hkawo5V71nV4bX5PO6uo5WtRmQk7I2S3y7wI919y3we6Ied844u4rei8gE3OcMPWb1M4l4fr67cXGbo/EThefPA6gMvsaCfiOtvm1cEP8xVL8XqE5EtHoWVTWI4BMybtOe4WyWDqqaxZCsDznvnU53efRmbwqvGPHe0MBxvwmFYudYkOeBOT0XD+D/YBzTai29tf9RTk3isRi5ziQLbnAmlQb29Pp1NyKxsZ/DNW2IzNqjvcF+CgoNTk3hTwkCncaYFZA5FoA2dlkCsJHbPI7I+Pxw0Od3FwF+PwPgfhcXnQ6BOjvvnfw4CMn9uPUTSHb6fVeomGtguCYoza4WfQvtcjC8m3bPhiqbW4m7fNtEMiXs6MdyBYK75eO6tgmEbcEKO+ZxCR0JNZ3HnR+NGb34LLUbENbq6rGKMu7RsivQsSX5TxbBLirNdG+8dh+IgqNH/D5rgPl+5LlBwRMEtySaW+/teIvfzkyVGCOTJ9e4Q+GlhEwJUZvTShAO8knpD1W85gCLmBuFd0smnc026lNw2HiTMTzECsg6koAgSzg20isSViyemw/iR4rK8sSIypuomCJ5Gyaa/j6Tjo/GmxpkQ3igdmzy0NaLxXI9XmHIqnJX0lHrOaZ7lS713CAh6Fxayjo2yIvvWSYuSE9POusUQlbrxCRKwlk70qbA72uU6mV/QFz1HB1PYHe09wVkbA6Ycma/n5birEG+M6Ro5Zo8MacVABICfic8TFPQ+T87B0l0KyglweBzcPhUNwTA9wJqCtyTwzaCL0uVKQ04OzZ5Ql3R3OBMWUFwXWJIqCWAsyhaHREyLK+Q8piAr1MggCdJJ+VZHXNFkIuyuU32ApiZai1ed1wmLfWSOQYj9e/lsDFkKPpPMBWQFaHWo6s6W/8Dyory8IjRnyLor4tucldQsDNqc7k7QMliMUA4vTpFYlA6HYRzM92I0J0UPAzaa+uWQXgapGjmaWQCS28L5NMLh/O5C6/EwiaqDQnOyoRbFaU25sznZv782FvTZkSGHfssVdC1IrswlZIQyY9ZWdS1/dQBKWckPx32mbMGGsFAusI+UpODdZ1Ih+WRCx2k6Z8V0TG5IRE8pdaDS8kpiKxUzI+/FSgpuXlMQcJLg23Nj+WzZrlJJimhovFvgCqTZCsqpqkKLwE8rJQPL53KKCY35g8xh/AwyTOziPRmwG9SRLV1RdR1Nr8JArADiuTviQwhFqkN/OtqjkPFjb3KU6p91tQ1/hrt/ab4JkxElU1MVh4hJCPZQMg4N9IPW+oWbk7dixWRchjyBsbxEGBc6cBJkpRDwA4Na963QeNhaG6bcb4QfO0XT6i4iYRLMkOh8YogX7LdtQVI+q3/qnYjnfOnHmC9vp+QqA6xzZDXcL5Xqi19eH+Tlyxcc01HT9hwgJCTMafzz/to8MbJRGJHAefbx2gvpBdqBk/A8H9qWRi2VD8TLK6eooDeUggn+jb3uBOTX1JeW3tX4stwDhvy+dbBcrcvAQxLeDTwVTn9bJjx4HBXidGIhMS3cUpsorTrk3jbrExX9yw6DiLIOo7eaW9KUqaFPj1UDy+bTCTG0Zw9OTJV0CU2ZFxuf6FhhJ9ASm5Mrxja9E6jFOmBBIFHDDc1gTe0uB14Xj8t4MpJA1/nIz6v0TFVYDK55/MuHELnG+IKmmvrv6kJeoh9q00kwrysE53Lg83Nu4rBRy39xONxqiU2elZ+afFzROg/9cGbi6lDkvHYjPSkMcEODmnwjbRSfh/6UzmexXbt/+zRNtUOhI71fbJKkA+iz78saFK+bR0qptcarN91qxjYXnWK5ELmUUfmp0B8IGibHBoPxiuqztQlPOtrPQlR4yYAZElgPwXIVnZdJfpBI8o8Lag3/9AKVl1S2VstGck7hLI5X3HYwvB+1U6/d/BxsZ3i9pmuGOlThWPdxEoF/flfF3rWhW4KqD1ehcY41uSVbELacm6fO4EXTztuwAeEZu/aE+0NI1tajIdxZ4ugeyeOtU7adSocbCsGCEXi6hzsrPJ3N3kO9rBVWX12/5QyhVw+9TR6BytrE0F6E3TXDtEwaPasX9W7jivobHR0Jw9wUJ2VVZ6poTDo0WpqCjrYk2cL2JKjAIdTGI/RC8MxeO/OtpXikbHd4i1SoCLchydi5xJHkyZgJeh8ScCu7XoFo9SWhwEbNGGiJohYs0B+LH87kBWfmRA3m6lU3MDg+BSGIuNTsDljL7Wt2XsbpzpU9Upyh9J+w0BDtuW5Xi19pHqWApOp2COEB+nFOmuAk3azlxc3tCw6ygwhniORj+lRZlTc3pB5YB7r9FhJu6WfDjsUkAcI5QwwVAxxYGAaRBP2pnUDYPJWt3WcVVVRCzvOpKxQk1800rRhGmcNQtwiGTG5bDJsRBVBrq29StMMHIVgr+mdr5RVldn5CtHH8PujwiHrwLVtwt3/HJy0275iRvkiupssk7MESGWBfe/d5+8/fagqnbD7neUV1wkCstAnDCQHOXonCXb1lUfJtrXGh65r9ohEjkm4fMtBuQaAGNLX3RJceGfop0rQnV1fy7l7fx3DkciI31e73wRtQR0+9Elbkgps3GvBS7wx+O/M0684MCJWGySAPM11QIIJxRshhecy1UamF6RVSBMO0bNJNpZEKqrM858SI9b/PmCl0PhGySOz63aBxqSGcC9TrltXhNgBLVWGpcFGre5PHK/iBu+lh7PuaKsrxKYJa6EC97Cu+QCYu70IQFND+rj+WWAyQoAvSbU0rJyOFSGGwuqqsYklXcORV9KSkyJlJH09XuCunzjIRD/ctVXeWqJHro0lEzeIt0iouIavMmxYHIyz4TI2YRUAzgJwHgxALniGDdiOSJinPF2ar4EwWkUzMvhULre22PRme+vq3u+lDA90N531zvTQM6GSDUhpsUynmBAZdkGgVFZvCLgCwCOY1dky2IS3Hxlv5DfDNZt+0WPZnDAO2ryCESjZa1an+y1rI8CajKFFSb3EYo2AYNavws4r1pKtWio9dKlduptkJkilNC/F62vHs41ygfLRCtUVppu5VSl1MccsSYpwLSEDfFu9G4dIPcJ8FoqkzkY8PvvBOXLBI6KDbq7mspOXxHIyqAHBKbHGGPErspK76nBoOdgIGAp25bRHg/R1qZ3JxL21JEjddLrvRCi1jKvweYSU+Dy4B5slneHJzcrdJJcgCIRD3w+z8HDhz2qoqLXNiQSNnbvtlPVs8/RwnsJfCQ7oLgcMriqo6VlTbbMtWRgBjraiTPOmMRQeKPktVO7kkO+7nOcy3z19a8ONM6/4/+cMWNsRyC4WgzFiqw2jmsc3lTavjJYX1+bfcU/FGD+AHiiVbELYcl6QiZkL+7DokmHCphxBR1Vsc+JJZuNj8lt9SKlycfC2l4q9fWHcuwe6oTZv3O5XX9wAwQX5IZ2lx74l6a+OlxbazQsWUnhhzHzwGOY8K4CQSP5mIds3+L+lO8BvK67Nsoh44Z9YohPeZLR9JepsLpPAQpmBHxKt+klZa/XvT/wMj7cN1xhQVXNeWJhI4Hj85JVR8hnkeS1oVf7csfDBsYwdVrURkCMUDorcXKLu30CfjMYj/9yKPTocGFKRKOTtVKrJU+N1TUu31caSwN26olC0vlhAXPg5JPLgxWjrxMlS/O5U7dghDwdtNM3SkPD/uEucrC/ZywWTGi5Cgo/yGcRuwvGZyWdWtyfRmfIwBimLhWNfsZR1moQp+WJjihG7qplUah+23PFCKTBLriU910dYFVNtdHasQ+L6Pq990C9pKm29pmZXR9h9HmGDIyrxFJqBSkX5PM3AnSAzoMZkeWl0JelLHYw77hiS8u7XARfZZ663VCrAv2oLXJzMRnJkIAx8g5Lea6H4LoC4kOjHm+gcFFo27btpUQil0GMxcbbQLnHtjuaGhr297eTAwHELonbtRS5EYIxuW0Xt1h8XYGLAvH4y8VsGzQweybHgqM/gktAVxM8qU/hRr3fqMtDCltKEQSYb44SHs9spdRZmjJBhAeUI3/0O6k/S2OjqXNKfoy6vWPs2C+JUbcbYr8PLcHDBFclDx/e2N/nOD2TDQoYE5oT1Z1GHXU3WJDlSynycZ2xbg43/mnAroIhxspDobkQtViAKSYHosvX8m2lsSawl0+UWkIYn9cRrfmsKKwAYQrfHLbOFUuTv1IpWRLcse1fA6FdMjBPAta50WjMo9QdhDqrMKchr4idXhxsaIgPdIWMg2yLRmdbou4BxDjvowvpKux2Uss1ofqtvR8+9LcYk68kZ8Zm0msEAPxUH/6oi7PeBeobSk00SwLG7RVV1VTRwg+E+DSzZWNuSmByFu6FYFlo375HS6Etu4Q7I28g1NJsYVDP4km2gPhh6wCqrq4krupMsTzfJ8ynRFmVc1e+YvKp/Zq4qyzRvqVU+euAwLi7EY1WUVm3dIsMj2rpeiYWOQTNe5xMamOpJHe3DMMkhnm9rG5oyDSFj4cd58b8OqYXvG5QYHlvBmi+r+rTxwLYLMR9zKTWldo0NOMPCEzzzJkn+Dy+FRR8seDEZIsIfyKOszpYX//WQHe35/9t02rGqRA3QdQFfTuC7k4bn/CUzqS/1R/YJrOlqDtE5Ct5GsIedBMknvHY8sPA9q2DUpAXZ/BMGI3WfJFKNgDIqZpdVIkOgM84TubusoaGpoH8SjZoPPnk8sTo0UsBdQOypF5HTwNbLfDuQEfHhv6OfzIa/TSV58d0q+bcp1sy9jvR9t3B+vq6wSaZRYF5c+pU/8Rjxl0OgalOc+QShic13xrQtu8KNTQYB9n7/VIpp8Z1vlVVZ1nKWiuipmd/CdLF+NHQkabOKvhtk9uhrKk5zyEeNJRm9pwCpEj9otbOqrL60MsDfcxRyN6BTkxPw/9eEif15gXmpFD/XhRWBuNxsxuD1s8YY1wNTdnIebDk64BLUvuFupPA3wDZ3JZof6w/HbD5fXM0GvGJ50GC03psc4lt8iVFtTJgd5pcqN9vq4tt4IA+pkur62aR89xvH4kjBF+EdjaG6ut3DBWUHqNMryhg+c6hks9BYTwc7hPh74Lk8zLAJ4JulivWQgoWABgndEWPf4S27wnWhxqGclJKTvBcTf/Mmebj7ytBVgJ4Xaf1T8teqTU94kFdn37zEPM9Znn5GNvnC1tat4U7Og6XqpRKnBGbhKDMg8I0OvyHx8k85du+3fi7Ydn2/0fkMqAdaImaAAAAAElFTkSuQmCC"

/***/ }),

/***/ 4:
/*!***********************************!*\
  !*** E:/前端/uniapp/财富乐/pages.json ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!*************************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/plateform/bao.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 41:
/*!********************************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/plateform/bao_active.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 412:
/*!*****************************************************************!*\
  !*** E:/前端/uniapp/财富乐/components/w-picker/areadata/areadata.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [{ value: '110000', label: '北京市', children: [{ value: "110100", label: "北京市", children: [{ value: "110101", label: "东城区" }, { value: "110102", label: "西城区" }, { value: "110105", label: "朝阳区" }, { value: "110106", label: "丰台区" }, { value: "110107", label: "石景山区" }, { value: "110108", label: "海淀区" }, { value: "110109", label: "门头沟区" }, { value: "110111", label: "房山区" }, { value: "110112", label: "通州区" }, { value: "110113", label: "顺义区" }, { value: "110114", label: "昌平区" }, { value: "110115", label: "大兴区" }, { value: "110116", label: "怀柔区" }, { value: "110117", label: "平谷区" }, { value: "110118", label: "密云区" }, { value: "110119", label: "延庆区" }] }] }, { value: '120000', label: '天津市', children: [{ value: "120100", label: "天津市", children: [{ value: "120101", label: "和平区" }, { value: "120102", label: "河东区" }, { value: "120103", label: "河西区" }, { value: "120104", label: "南开区" }, { value: "120105", label: "河北区" }, { value: "120106", label: "红桥区" }, { value: "120110", label: "东丽区" }, { value: "120111", label: "西青区" }, { value: "120112", label: "津南区" }, { value: "120113", label: "北辰区" }, { value: "120114", label: "武清区" }, { value: "120115", label: "宝坻区" }, { value: "120116", label: "滨海新区" }, { value: "120117", label: "宁河区" }, { value: "120118", label: "静海区" }, { value: "120119", label: "蓟州区" }] }] }, { value: '130000', label: '河北省', children: [{ value: "130100", label: "石家庄市", children: [{ value: "130102", label: "长安区" }, { value: "130104", label: "桥西区" }, { value: "130105", label: "新华区" }, { value: "130107", label: "井陉矿区" }, { value: "130108", label: "裕华区" }, { value: "130109", label: "藁城区" }, { value: "130110", label: "鹿泉区" }, { value: "130111", label: "栾城区" }, { value: "130121", label: "井陉县" }, { value: "130123", label: "正定县" }, { value: "130125", label: "行唐县" }, { value: "130126", label: "灵寿县" }, { value: "130127", label: "高邑县" }, { value: "130128", label: "深泽县" }, { value: "130129", label: "赞皇县" }, { value: "130130", label: "无极县" }, { value: "130131", label: "平山县" }, { value: "130132", label: "元氏县" }, { value: "130133", label: "赵县" }, { value: "130181", label: "辛集市" }, { value: "130183", label: "晋州市" }, { value: "130184", label: "新乐市" }, { value: "130172", label: "石家庄循环化工园区" }, { value: "130171", label: "石家庄高新技术产业开发区" }] }, { value: "130200", label: "唐山市", children: [{ value: "130202", label: "路南区" }, { value: "130203", label: "路北区" }, { value: "130204", label: "古冶区" }, { value: "130205", label: "开平区" }, { value: "130207", label: "丰南区" }, { value: "130208", label: "丰润区" }, { value: "130209", label: "曹妃甸区" }, { value: "130223", label: "滦县" }, { value: "130224", label: "滦南县" }, { value: "130225", label: "乐亭县" }, { value: "130227", label: "迁西县" }, { value: "130229", label: "玉田县" }, { value: "130281", label: "遵化市" }, { value: "130283", label: "迁安市" }, { value: "130271", label: "唐山市芦台经济技术开发区" }, { value: "130272", label: "唐山市汉沽管理区" }, { value: "130273", label: "唐山高新技术产业开发区" }, { value: "130274", label: "河北唐山海港经济开发区" }] }, { value: "130300", label: "秦皇岛市", children: [{ value: "130302", label: "海港区" }, { value: "130303", label: "山海关区" }, { value: "130304", label: "北戴河区" }, { value: "130321", label: "青龙满族自治县" }, { value: "130322", label: "昌黎县" }, { value: "130306", label: "抚宁区" }, { value: "130324", label: "卢龙县" }, { value: "130371", label: "秦皇岛市经济技术开发区" }, { value: "130372", label: "北戴河新区" }] }, { value: "130400", label: "邯郸市", children: [{ value: "130402", label: "邯山区" }, { value: "130403", label: "丛台区" }, { value: "130404", label: "复兴区" }, { value: "130406", label: "峰峰矿区" }, { value: "130421", label: "邯郸县" }, { value: "130423", label: "临漳县" }, { value: "130424", label: "成安县" }, { value: "130425", label: "大名县" }, { value: "130426", label: "涉县" }, { value: "130427", label: "磁县" }, { value: "130407", label: "肥乡区" }, { value: "130408", label: "永年区" }, { value: "130430", label: "邱县" }, { value: "130431", label: "鸡泽县" }, { value: "130432", label: "广平县" }, { value: "130433", label: "馆陶县" }, { value: "130434", label: "魏县" }, { value: "130435", label: "曲周县" }, { value: "130481", label: "武安市" }, { value: "130471", label: "邯郸经济技术开发区" }, { value: "130473", label: "邯郸冀南新区" }] }, { value: "130500", label: "邢台市", children: [{ value: "130502", label: "桥东区" }, { value: "130503", label: "桥西区" }, { value: "130521", label: "邢台县" }, { value: "130522", label: "临城县" }, { value: "130523", label: "内丘县" }, { value: "130524", label: "柏乡县" }, { value: "130525", label: "隆尧县" }, { value: "130526", label: "任县" }, { value: "130527", label: "南和县" }, { value: "130528", label: "宁晋县" }, { value: "130529", label: "巨鹿县" }, { value: "130530", label: "新河县" }, { value: "130531", label: "广宗县" }, { value: "130532", label: "平乡县" }, { value: "130533", label: "威县" }, { value: "130534", label: "清河县" }, { value: "130535", label: "临西县" }, { value: "130581", label: "南宫市" }, { value: "130582", label: "沙河市" }, { value: "130571", label: "河北邢台经济开发区" }] }, { value: "130600", label: "保定市", children: [{ value: "130602", label: "竞秀区" }, { value: "130606", label: "莲池区" }, { value: "130607", label: "满城区" }, { value: "130608", label: "清苑区" }, { value: "130623", label: "涞水县" }, { value: "130624", label: "阜平县" }, { value: "130609", label: "徐水区" }, { value: "130626", label: "定兴县" }, { value: "130627", label: "唐县" }, { value: "130628", label: "高阳县" }, { value: "130629", label: "容城县" }, { value: "130630", label: "涞源县" }, { value: "130631", label: "望都县" }, { value: "130632", label: "安新县" }, { value: "130633", label: "易县" }, { value: "130634", label: "曲阳县" }, { value: "130635", label: "蠡县" }, { value: "130636", label: "顺平县" }, { value: "130637", label: "博野县" }, { value: "130638", label: "雄县" }, { value: "130681", label: "涿州市" }, { value: "130682", label: "定州市" }, { value: "130683", label: "安国市" }, { value: "130684", label: "高碑店市" }, { value: "130671", label: "保定高新技术产业开发区" }, { value: "130672", label: "保定白沟新城" }] }, { value: "130700", label: "张家口市", children: [{ value: "130702", label: "桥东区" }, { value: "130703", label: "桥西区" }, { value: "130705", label: "宣化区" }, { value: "130706", label: "下花园区" }, { value: "130708", label: "万全区" }, { value: "130709", label: "崇礼区" }, { value: "130722", label: "张北县" }, { value: "130723", label: "康保县" }, { value: "130724", label: "沽源县" }, { value: "130725", label: "尚义县" }, { value: "130726", label: "蔚县" }, { value: "130727", label: "阳原县" }, { value: "130728", label: "怀安县" }, { value: "130730", label: "怀来县" }, { value: "130731", label: "涿鹿县" }, { value: "130732", label: "赤城县" }, { value: "130733", label: "崇礼县" }, { value: "130771", label: "张家口市高新技术产业开发区" }, { value: "130772", label: "张家口市察北管理区" }, { value: "130773", label: "张家口市塞北管理区" }] }, { value: "130800", label: "承德市", children: [{ value: "130802", label: "双桥区" }, { value: "130803", label: "双滦区" }, { value: "130804", label: "鹰手营子矿区" }, { value: "130821", label: "承德县" }, { value: "130822", label: "兴隆县" }, { value: "130881", label: "平泉市" }, { value: "130824", label: "滦平县" }, { value: "130825", label: "隆化县" }, { value: "130826", label: "丰宁满族自治县" }, { value: "130827", label: "宽城满族自治县" }, { value: "130828", label: "围场满族蒙古族自治县" }, { value: "130871", label: "承德高新技术产业开发区" }] }, { value: "130900", label: "沧州市", children: [{ value: "130902", label: "新华区" }, { value: "130903", label: "运河区" }, { value: "130921", label: "沧县" }, { value: "130922", label: "青县" }, { value: "130923", label: "东光县" }, { value: "130924", label: "海兴县" }, { value: "130925", label: "盐山县" }, { value: "130926", label: "肃宁县" }, { value: "130927", label: "南皮县" }, { value: "130928", label: "吴桥县" }, { value: "130929", label: "献县" }, { value: "130930", label: "孟村回族自治县" }, { value: "130981", label: "泊头市" }, { value: "130982", label: "任丘市" }, { value: "130983", label: "黄骅市" }, { value: "130984", label: "河间市" }, { value: "130971", label: "河北沧州经济开发区" }, { value: "130972", label: "沧州高新技术产业开发区" }, { value: "130973", label: "沧州渤海新区" }] }, { value: "131000", label: "廊坊市", children: [{ value: "131002", label: "安次区" }, { value: "131003", label: "广阳区" }, { value: "131022", label: "固安县" }, { value: "131023", label: "永清县" }, { value: "131024", label: "香河县" }, { value: "131025", label: "大城县" }, { value: "131026", label: "文安县" }, { value: "131028", label: "大厂回族自治县" }, { value: "131071", label: "廊坊经济技术开发区" }, { value: "131081", label: "霸州市" }, { value: "131082", label: "三河市" }] }, { value: "131100", label: "衡水市", children: [{ value: "131102", label: "桃城区" }, { value: "131121", label: "枣强县" }, { value: "131122", label: "武邑县" }, { value: "131123", label: "武强县" }, { value: "131124", label: "饶阳县" }, { value: "131125", label: "安平县" }, { value: "131126", label: "故城县" }, { value: "131127", label: "景县" }, { value: "131128", label: "阜城县" }, { value: "131103", label: "冀州区" }, { value: "131182", label: "深州市" }, { value: "131172", label: "衡水滨湖新区" }, { value: "131171", label: "河北衡水经济开发区" }] }] }, { value: '140000', label: '山西省', children: [{ value: "140100", label: "太原市", children: [{ value: "140105", label: "小店区" }, { value: "140106", label: "迎泽区" }, { value: "140107", label: "杏花岭区" }, { value: "140108", label: "尖草坪区" }, { value: "140109", label: "万柏林区" }, { value: "140110", label: "晋源区" }, { value: "140121", label: "清徐县" }, { value: "140122", label: "阳曲县" }, { value: "140123", label: "娄烦县" }, { value: "140181", label: "古交市" }, { value: "140171", label: "山西转型综合改革示范区" }] }, { value: "140200", label: "大同市", children: [{ value: "140202", label: "城区" }, { value: "140203", label: "矿区" }, { value: "140211", label: "南郊区" }, { value: "140212", label: "新荣区" }, { value: "140221", label: "阳高县" }, { value: "140222", label: "天镇县" }, { value: "140223", label: "广灵县" }, { value: "140224", label: "灵丘县" }, { value: "140225", label: "浑源县" }, { value: "140226", label: "左云县" }, { value: "140227", label: "大同县" }, { value: "140271", label: "山西大同经济开发区" }] }, { value: "140300", label: "阳泉市", children: [{ value: "140302", label: "城区" }, { value: "140303", label: "矿区" }, { value: "140311", label: "郊区" }, { value: "140321", label: "平定县" }, { value: "140322", label: "盂县" }, { value: "140371", label: "山西阳泉经济开发区" }] }, { value: "140400", label: "长治市", children: [{ value: "140421", label: "长治县" }, { value: "140423", label: "襄垣县" }, { value: "140424", label: "屯留县" }, { value: "140425", label: "平顺县" }, { value: "140426", label: "黎城县" }, { value: "140427", label: "壶关县" }, { value: "140428", label: "长子县" }, { value: "140429", label: "武乡县" }, { value: "140430", label: "沁县" }, { value: "140431", label: "沁源县" }, { value: "140481", label: "潞城市" }, { value: "140402", label: "城区" }, { value: "140411", label: "郊区" }, { value: "140471", label: "山西长治高新技术产业园区" }] }, { value: "140500", label: "晋城市", children: [{ value: "140502", label: "城区" }, { value: "140521", label: "沁水县" }, { value: "140522", label: "阳城县" }, { value: "140524", label: "陵川县" }, { value: "140525", label: "泽州县" }, { value: "140581", label: "高平市" }] }, { value: "140600", label: "朔州市", children: [{ value: "140602", label: "朔城区" }, { value: "140603", label: "平鲁区" }, { value: "140621", label: "山阴县" }, { value: "140622", label: "应县" }, { value: "140623", label: "右玉县" }, { value: "140624", label: "怀仁县" }, { value: "140671", label: "山西朔州经济开发区" }] }, { value: "140700", label: "晋中市", children: [{ value: "140702", label: "榆次区" }, { value: "140721", label: "榆社县" }, { value: "140722", label: "左权县" }, { value: "140723", label: "和顺县" }, { value: "140724", label: "昔阳县" }, { value: "140725", label: "寿阳县" }, { value: "140726", label: "太谷县" }, { value: "140727", label: "祁县" }, { value: "140728", label: "平遥县" }, { value: "140729", label: "灵石县" }, { value: "140781", label: "介休市" }] }, { value: "140800", label: "运城市", children: [{ value: "140802", label: "盐湖区" }, { value: "140821", label: "临猗县" }, { value: "140822", label: "万荣县" }, { value: "140823", label: "闻喜县" }, { value: "140824", label: "稷山县" }, { value: "140825", label: "新绛县" }, { value: "140826", label: "绛县" }, { value: "140827", label: "垣曲县" }, { value: "140828", label: "夏县" }, { value: "140829", label: "平陆县" }, { value: "140830", label: "芮城县" }, { value: "140881", label: "永济市" }, { value: "140882", label: "河津市" }] }, { value: "140900", label: "忻州市", children: [{ value: "140902", label: "忻府区" }, { value: "140921", label: "定襄县" }, { value: "140922", label: "五台县" }, { value: "140923", label: "代县" }, { value: "140924", label: "繁峙县" }, { value: "140925", label: "宁武县" }, { value: "140926", label: "静乐县" }, { value: "140927", label: "神池县" }, { value: "140928", label: "五寨县" }, { value: "140929", label: "岢岚县" }, { value: "140930", label: "河曲县" }, { value: "140931", label: "保德县" }, { value: "140932", label: "偏关县" }, { value: "140981", label: "原平市" }, { value: "140971", label: "五台山风景名胜区" }] }, { value: "141000", label: "临汾市", children: [{ value: "141002", label: "尧都区" }, { value: "141021", label: "曲沃县" }, { value: "141022", label: "翼城县" }, { value: "141023", label: "襄汾县" }, { value: "141024", label: "洪洞县" }, { value: "141025", label: "古县" }, { value: "141026", label: "安泽县" }, { value: "141027", label: "浮山县" }, { value: "141028", label: "吉县" }, { value: "141029", label: "乡宁县" }, { value: "141030", label: "大宁县" }, { value: "141031", label: "隰县" }, { value: "141032", label: "永和县" }, { value: "141033", label: "蒲县" }, { value: "141034", label: "汾西县" }, { value: "141081", label: "侯马市" }, { value: "141082", label: "霍州市" }] }, { value: "141100", label: "吕梁市", children: [{ value: "141102", label: "离石区" }, { value: "141121", label: "文水县" }, { value: "141122", label: "交城县" }, { value: "141123", label: "兴县" }, { value: "141124", label: "临县" }, { value: "141125", label: "柳林县" }, { value: "141126", label: "石楼县" }, { value: "141127", label: "岚县" }, { value: "141128", label: "方山县" }, { value: "141129", label: "中阳县" }, { value: "141130", label: "交口县" }, { value: "141181", label: "孝义市" }, { value: "141182", label: "汾阳市" }] }] }, { value: '150000', label: '内蒙古', children: [{ value: "150100", label: "呼和浩特市", children: [{ value: "150102", label: "新城区" }, { value: "150103", label: "回民区" }, { value: "150104", label: "玉泉区" }, { value: "150105", label: "赛罕区" }, { value: "150121", label: "土默特左旗" }, { value: "150122", label: "托克托县" }, { value: "150123", label: "和林格尔县" }, { value: "150124", label: "清水河县" }, { value: "150125", label: "武川县" }, { value: "150171", label: "呼和浩特金海工业园区" }, { value: "150172", label: "呼和浩特经济技术开发区" }] }, { value: "150200", label: "包头市", children: [{ value: "150202", label: "东河区" }, { value: "150203", label: "昆都仑区" }, { value: "150204", label: "青山区" }, { value: "150205", label: "石拐区" }, { value: "150206", label: "白云矿区" }, { value: "150207", label: "九原区" }, { value: "150221", label: "土默特右旗" }, { value: "150222", label: "固阳县" }, { value: "150223", label: "达尔罕茂明安联合旗" }, { value: "150271", label: "包头稀土高新技术产业开发区" }] }, { value: "150300", label: "乌海市", children: [{ value: "150302", label: "海勃湾区" }, { value: "150303", label: "海南区" }, { value: "150304", label: "乌达区" }] }, { value: "150400", label: "赤峰市", children: [{ value: "150402", label: "红山区" }, { value: "150403", label: "元宝山区" }, { value: "150404", label: "松山区" }, { value: "150421", label: "阿鲁科尔沁旗" }, { value: "150422", label: "巴林左旗" }, { value: "150423", label: "巴林右旗" }, { value: "150424", label: "林西县" }, { value: "150425", label: "克什克腾旗" }, { value: "150426", label: "翁牛特旗" }, { value: "150428", label: "喀喇沁旗" }, { value: "150429", label: "宁城县" }, { value: "150430", label: "敖汉旗" }] }, { value: "150500", label: "通辽市", children: [{ value: "150502", label: "科尔沁区" }, { value: "150521", label: "科尔沁左翼中旗" }, { value: "150522", label: "科尔沁左翼后旗" }, { value: "150523", label: "开鲁县" }, { value: "150524", label: "库伦旗" }, { value: "150525", label: "奈曼旗" }, { value: "150526", label: "扎鲁特旗" }, { value: "150581", label: "霍林郭勒市" }, { value: "150571", label: "通辽经济技术开发区" }] }, { value: "150600", label: "鄂尔多斯市", children: [{ value: "150602", label: "东胜区" }, { value: "150621", label: "达拉特旗" }, { value: "150622", label: "准格尔旗" }, { value: "150623", label: "鄂托克前旗" }, { value: "150624", label: "鄂托克旗" }, { value: "150625", label: "杭锦旗" }, { value: "150626", label: "乌审旗" }, { value: "150627", label: "伊金霍洛旗" }, { value: "150603", label: "康巴什区" }] }, { value: "150700", label: "呼伦贝尔市", children: [{ value: "150702", label: "海拉尔区" }, { value: "150721", label: "阿荣旗" }, { value: "150722", label: "莫力达瓦达斡尔族自治旗" }, { value: "150723", label: "鄂伦春自治旗" }, { value: "150724", label: "鄂温克族自治旗" }, { value: "150725", label: "陈巴尔虎旗" }, { value: "150726", label: "新巴尔虎左旗" }, { value: "150727", label: "新巴尔虎右旗" }, { value: "150781", label: "满洲里市" }, { value: "150782", label: "牙克石市" }, { value: "150783", label: "扎兰屯市" }, { value: "150784", label: "额尔古纳市" }, { value: "150785", label: "根河市" }, { value: "150703", label: "扎赉诺尔区" }] }, { value: "150800", label: "巴彦淖尔市", children: [{ value: "150802", label: "临河区" }, { value: "150821", label: "五原县" }, { value: "150822", label: "磴口县" }, { value: "150823", label: "乌拉特前旗" }, { value: "150824", label: "乌拉特中旗" }, { value: "150825", label: "乌拉特后旗" }, { value: "150826", label: "杭锦后旗" }] }, { value: "150900", label: "乌兰察布市", children: [{ value: "150902", label: "集宁区" }, { value: "150921", label: "卓资县" }, { value: "150922", label: "化德县" }, { value: "150923", label: "商都县" }, { value: "150924", label: "兴和县" }, { value: "150925", label: "凉城县" }, { value: "150926", label: "察哈尔右翼前旗" }, { value: "150927", label: "察哈尔右翼中旗" }, { value: "150928", label: "察哈尔右翼后旗" }, { value: "150929", label: "四子王旗" }, { value: "150981", label: "丰镇市" }] }, { value: "152200", label: "兴安盟", children: [{ value: "152201", label: "乌兰浩特市" }, { value: "152202", label: "阿尔山市" }, { value: "152221", label: "科尔沁右翼前旗" }, { value: "152222", label: "科尔沁右翼中旗" }, { value: "152223", label: "扎赉特旗" }, { value: "152224", label: "突泉县" }] }, { value: "152500", label: "锡林郭勒盟", children: [{ value: "152501", label: "二连浩特市" }, { value: "152502", label: "锡林浩特市" }, { value: "152522", label: "阿巴嘎旗" }, { value: "152523", label: "苏尼特左旗" }, { value: "152524", label: "苏尼特右旗" }, { value: "152525", label: "东乌珠穆沁旗" }, { value: "152526", label: "西乌珠穆沁旗" }, { value: "152527", label: "太仆寺旗" }, { value: "152528", label: "镶黄旗" }, { value: "152529", label: "正镶白旗" }, { value: "152530", label: "正蓝旗" }, { value: "152531", label: "多伦县" }, { value: "152571", label: "乌拉盖管委会" }] }, { value: "152900", label: "阿拉善盟", children: [{ value: "152921", label: "阿拉善左旗" }, { value: "152922", label: "阿拉善右旗" }, { value: "152923", label: "额济纳旗" }, { value: "152971", label: "内蒙古阿拉善经济开发区" }] }] }, { value: '210000', label: '辽宁省', children: [{ value: "210100", label: "沈阳市", children: [{ value: "210102", label: "和平区" }, { value: "210103", label: "沈河区" }, { value: "210104", label: "大东区" }, { value: "210105", label: "皇姑区" }, { value: "210106", label: "铁西区" }, { value: "210111", label: "苏家屯区" }, { value: "210112", label: "东陵区" }, { value: "210113", label: "新城子区" }, { value: "210114", label: "于洪区" }, { value: "210115", label: "辽中区" }, { value: "210123", label: "康平县" }, { value: "210124", label: "法库县" }, { value: "210181", label: "新民市" }, { value: "210112", label: "浑南区" }, { value: "210113", label: "沈北新区" }] }, { value: "210200", label: "大连市", children: [{ value: "210202", label: "中山区" }, { value: "210203", label: "西岗区" }, { value: "210204", label: "沙河口区" }, { value: "210211", label: "甘井子区" }, { value: "210212", label: "旅顺口区" }, { value: "210213", label: "金州区" }, { value: "210224", label: "长海县" }, { value: "210251", label: "开发区" }, { value: "210281", label: "瓦房店市" }, { value: "210214", label: "普兰店区" }, { value: "210283", label: "庄河市" }] }, { value: "210300", label: "鞍山市", children: [{ value: "210302", label: "铁东区" }, { value: "210303", label: "铁西区" }, { value: "210304", label: "立山区" }, { value: "210311", label: "千山区" }, { value: "210321", label: "台安县" }, { value: "210323", label: "岫岩满族自治县" }, { value: "210381", label: "海城市" }] }, { value: "210400", label: "抚顺市", children: [{ value: "210402", label: "新抚区" }, { value: "210403", label: "东洲区" }, { value: "210404", label: "望花区" }, { value: "210411", label: "顺城区" }, { value: "210421", label: "抚顺县" }, { value: "210422", label: "新宾满族自治县" }, { value: "210423", label: "清原满族自治县" }] }, { value: "210500", label: "本溪市", children: [{ value: "210502", label: "平山区" }, { value: "210503", label: "溪湖区" }, { value: "210504", label: "明山区" }, { value: "210505", label: "南芬区" }, { value: "210521", label: "本溪满族自治县" }, { value: "210522", label: "桓仁满族自治县" }] }, { value: "210600", label: "丹东市", children: [{ value: "210602", label: "元宝区" }, { value: "210603", label: "振兴区" }, { value: "210604", label: "振安区" }, { value: "210624", label: "宽甸满族自治县" }, { value: "210681", label: "东港市" }, { value: "210682", label: "凤城市" }] }, { value: "210700", label: "锦州市", children: [{ value: "210702", label: "古塔区" }, { value: "210703", label: "凌河区" }, { value: "210711", label: "太和区" }, { value: "210726", label: "黑山县" }, { value: "210727", label: "义县" }, { value: "210781", label: "凌海市" }, { value: "210782", label: "北镇市" }] }, { value: "210800", label: "营口市", children: [{ value: "210802", label: "站前区" }, { value: "210803", label: "西市区" }, { value: "210804", label: "鲅鱼圈区" }, { value: "210811", label: "老边区" }, { value: "210881", label: "盖州市" }, { value: "210882", label: "大石桥市" }] }, { value: "210900", label: "阜新市", children: [{ value: "210902", label: "海州区" }, { value: "210903", label: "新邱区" }, { value: "210904", label: "太平区" }, { value: "210905", label: "清河门区" }, { value: "210911", label: "细河区" }, { value: "210921", label: "阜新蒙古族自治县" }, { value: "210922", label: "彰武县" }] }, { value: "211000", label: "辽阳市", children: [{ value: "211002", label: "白塔区" }, { value: "211003", label: "文圣区" }, { value: "211004", label: "宏伟区" }, { value: "211005", label: "弓长岭区" }, { value: "211011", label: "太子河区" }, { value: "211021", label: "辽阳县" }, { value: "211081", label: "灯塔市" }] }, { value: "211100", label: "盘锦市", children: [{ value: "211102", label: "双台子区" }, { value: "211103", label: "兴隆台区" }, { value: "211121", label: "大洼县" }, { value: "211122", label: "盘山县" }] }, { value: "211200", label: "铁岭市", children: [{ value: "211202", label: "银州区" }, { value: "211204", label: "清河区" }, { value: "211221", label: "铁岭县" }, { value: "211223", label: "西丰县" }, { value: "211224", label: "昌图县" }, { value: "211281", label: "调兵山市" }, { value: "211282", label: "开原市" }] }, { value: "211300", label: "朝阳市", children: [{ value: "211302", label: "双塔区" }, { value: "211303", label: "龙城区" }, { value: "211321", label: "朝阳县" }, { value: "211322", label: "建平县" }, { value: "211324", label: "喀喇沁左翼蒙古族自治县" }, { value: "211381", label: "北票市" }, { value: "211382", label: "凌源市" }] }, { value: "211400", label: "葫芦岛市", children: [{ value: "211402", label: "连山区" }, { value: "211403", label: "龙港区" }, { value: "211404", label: "南票区" }, { value: "211421", label: "绥中县" }, { value: "211422", label: "建昌县" }, { value: "211481", label: "兴城市" }] }] }, { value: '220000', label: '吉林省', children: [{ value: "220100", label: "长春市", children: [{ value: "220102", label: "南关区" }, { value: "220103", label: "宽城区" }, { value: "220104", label: "朝阳区" }, { value: "220105", label: "二道区" }, { value: "220106", label: "绿园区" }, { value: "220112", label: "双阳区" }, { value: "220122", label: "农安县" }, { value: "220181", label: "九台市" }, { value: "220182", label: "榆树市" }, { value: "220183", label: "德惠市" }, { value: "220171", label: "长春经济技术开发区" }, { value: "220172", label: "长春净月高新技术产业开发区" }, { value: "220173", label: "长春高新技术产业开发区" }, { value: "220174", label: "长春汽车经济技术开发区" }] }, { value: "220200", label: "吉林市", children: [{ value: "220202", label: "昌邑区" }, { value: "220203", label: "龙潭区" }, { value: "220204", label: "船营区" }, { value: "220211", label: "丰满区" }, { value: "220221", label: "永吉县" }, { value: "220281", label: "蛟河市" }, { value: "220282", label: "桦甸市" }, { value: "220283", label: "舒兰市" }, { value: "220284", label: "磐石市" }, { value: "220271", label: "吉林经济开发区" }, { value: "220272", label: "吉林高新技术产业开发区" }, { value: "220273", label: "吉林中国新加坡食品区" }] }, { value: "220300", label: "四平市", children: [{ value: "220302", label: "铁西区" }, { value: "220303", label: "铁东区" }, { value: "220322", label: "梨树县" }, { value: "220323", label: "伊通满族自治县" }, { value: "220381", label: "公主岭市" }, { value: "220382", label: "双辽市" }] }, { value: "220400", label: "辽源市", children: [{ value: "220402", label: "龙山区" }, { value: "220403", label: "西安区" }, { value: "220421", label: "东丰县" }, { value: "220422", label: "东辽县" }] }, { value: "220500", label: "通化市", children: [{ value: "220502", label: "东昌区" }, { value: "220503", label: "二道江区" }, { value: "220521", label: "通化县" }, { value: "220523", label: "辉南县" }, { value: "220524", label: "柳河县" }, { value: "220581", label: "梅河口市" }, { value: "220582", label: "集安市" }] }, { value: "220600", label: "白山市", children: [{ value: "220602", label: "八道江区" }, { value: "220621", label: "抚松县" }, { value: "220622", label: "靖宇县" }, { value: "220623", label: "长白朝鲜族自治县" }, { value: "220605", label: "江源区" }, { value: "220681", label: "临江市" }, { value: "220602", label: "浑江区" }] }, { value: "220700", label: "松原市", children: [{ value: "220702", label: "宁江区" }, { value: "220721", label: "前郭尔罗斯蒙古族自治县" }, { value: "220722", label: "长岭县" }, { value: "220723", label: "乾安县" }, { value: "220781", label: "扶余市" }, { value: "220771", label: "吉林松原经济开发区" }] }, { value: "220800", label: "白城市", children: [{ value: "220802", label: "洮北区" }, { value: "220821", label: "镇赉县" }, { value: "220822", label: "通榆县" }, { value: "220881", label: "洮南市" }, { value: "220882", label: "大安市" }, { value: "220871", label: "吉林白城经济开发区" }] }, { value: "222400", label: "延边朝鲜族自治州", children: [{ value: "222401", label: "延吉市" }, { value: "222402", label: "图们市" }, { value: "222403", label: "敦化市" }, { value: "222404", label: "珲春市" }, { value: "222405", label: "龙井市" }, { value: "222406", label: "和龙市" }, { value: "222424", label: "汪清县" }, { value: "222426", label: "安图县" }] }] }, { value: '230000', label: '黑龙江省', children: [{ value: "230100", label: "哈尔滨市", children: [{ value: "230102", label: "道里区" }, { value: "230103", label: "南岗区" }, { value: "230104", label: "道外区" }, { value: "230110", label: "香坊区" }, { value: "230107", label: "动力区" }, { value: "230108", label: "平房区" }, { value: "230109", label: "松北区" }, { value: "230111", label: "呼兰区" }, { value: "230123", label: "依兰县" }, { value: "230124", label: "方正县" }, { value: "230125", label: "宾县" }, { value: "230126", label: "巴彦县" }, { value: "230127", label: "木兰县" }, { value: "230128", label: "通河县" }, { value: "230129", label: "延寿县" }, { value: "230112", label: "阿城区" }, { value: "230113", label: "双城区" }, { value: "230183", label: "尚志市" }, { value: "230184", label: "五常市" }] }, { value: "230200", label: "齐齐哈尔市", children: [{ value: "230202", label: "龙沙区" }, { value: "230203", label: "建华区" }, { value: "230204", label: "铁锋区" }, { value: "230205", label: "昂昂溪区" }, { value: "230206", label: "富拉尔基区" }, { value: "230207", label: "碾子山区" }, { value: "230208", label: "梅里斯达斡尔族区" }, { value: "230221", label: "龙江县" }, { value: "230223", label: "依安县" }, { value: "230224", label: "泰来县" }, { value: "230225", label: "甘南县" }, { value: "230227", label: "富裕县" }, { value: "230229", label: "克山县" }, { value: "230230", label: "克东县" }, { value: "230231", label: "拜泉县" }, { value: "230281", label: "讷河市" }] }, { value: "230300", label: "鸡西市", children: [{ value: "230302", label: "鸡冠区" }, { value: "230303", label: "恒山区" }, { value: "230304", label: "滴道区" }, { value: "230305", label: "梨树区" }, { value: "230306", label: "城子河区" }, { value: "230307", label: "麻山区" }, { value: "230321", label: "鸡东县" }, { value: "230381", label: "虎林市" }, { value: "230382", label: "密山市" }] }, { value: "230400", label: "鹤岗市", children: [{ value: "230402", label: "向阳区" }, { value: "230403", label: "工农区" }, { value: "230404", label: "南山区" }, { value: "230405", label: "兴安区" }, { value: "230406", label: "东山区" }, { value: "230407", label: "兴山区" }, { value: "230421", label: "萝北县" }, { value: "230422", label: "绥滨县" }] }, { value: "230500", label: "双鸭山市", children: [{ value: "230502", label: "尖山区" }, { value: "230503", label: "岭东区" }, { value: "230505", label: "四方台区" }, { value: "230506", label: "宝山区" }, { value: "230521", label: "集贤县" }, { value: "230522", label: "友谊县" }, { value: "230523", label: "宝清县" }, { value: "230524", label: "饶河县" }] }, { value: "230600", label: "大庆市", children: [{ value: "230602", label: "萨尔图区" }, { value: "230603", label: "龙凤区" }, { value: "230604", label: "让胡路区" }, { value: "230605", label: "红岗区" }, { value: "230606", label: "大同区" }, { value: "230621", label: "肇州县" }, { value: "230622", label: "肇源县" }, { value: "230623", label: "林甸县" }, { value: "230624", label: "杜尔伯特蒙古族自治县" }, { value: "230671", label: "大庆高新技术产业开发区" }] }, { value: "230700", label: "伊春市", children: [{ value: "230702", label: "伊春区" }, { value: "230703", label: "南岔区" }, { value: "230704", label: "友好区" }, { value: "230705", label: "西林区" }, { value: "230706", label: "翠峦区" }, { value: "230707", label: "新青区" }, { value: "230708", label: "美溪区" }, { value: "230709", label: "金山屯区" }, { value: "230710", label: "五营区" }, { value: "230711", label: "乌马河区" }, { value: "230712", label: "汤旺河区" }, { value: "230713", label: "带岭区" }, { value: "230714", label: "乌伊岭区" }, { value: "230715", label: "红星区" }, { value: "230716", label: "上甘岭区" }, { value: "230722", label: "嘉荫县" }, { value: "230781", label: "铁力市" }] }, { value: "230800", label: "佳木斯市", children: [{ value: "230803", label: "向阳区" }, { value: "230804", label: "前进区" }, { value: "230805", label: "东风区" }, { value: "230811", label: "郊区" }, { value: "230822", label: "桦南县" }, { value: "230826", label: "桦川县" }, { value: "230828", label: "汤原县" }, { value: "230833", label: "抚远市" }, { value: "230881", label: "同江市" }, { value: "230882", label: "富锦市" }] }, { value: "230900", label: "七台河市", children: [{ value: "230902", label: "新兴区" }, { value: "230903", label: "桃山区" }, { value: "230904", label: "茄子河区" }, { value: "230921", label: "勃利县" }] }, { value: "231000", label: "牡丹江市", children: [{ value: "231002", label: "东安区" }, { value: "231003", label: "阳明区" }, { value: "231004", label: "爱民区" }, { value: "231005", label: "西安区" }, { value: "231086", label: "东宁市" }, { value: "231025", label: "林口县" }, { value: "231081", label: "绥芬河市" }, { value: "231083", label: "海林市" }, { value: "231084", label: "宁安市" }, { value: "231085", label: "穆棱市" }, { value: "231071", label: "牡丹江经济技术开发区" }] }, { value: "231100", label: "黑河市", children: [{ value: "231102", label: "爱辉区" }, { value: "231121", label: "嫩江县" }, { value: "231123", label: "逊克县" }, { value: "231124", label: "孙吴县" }, { value: "231181", label: "北安市" }, { value: "231182", label: "五大连池市" }] }, { value: "231200", label: "绥化市", children: [{ value: "231202", label: "北林区" }, { value: "231221", label: "望奎县" }, { value: "231222", label: "兰西县" }, { value: "231223", label: "青冈县" }, { value: "231224", label: "庆安县" }, { value: "231225", label: "明水县" }, { value: "231226", label: "绥棱县" }, { value: "231281", label: "安达市" }, { value: "231282", label: "肇东市" }, { value: "231283", label: "海伦市" }] }, { value: "232700", label: "大兴安岭地区", children: [{ value: "232721", label: "呼玛县" }, { value: "232722", label: "塔河县" }, { value: "232723", label: "漠河县" }, { value: "232701", label: "加格达奇区" }, { value: "232704", label: "呼中区" }, { value: "232703", label: "新林区" }] }] }, { value: '310000', label: '上海市', children: [{ value: '310100', label: '上海市', children: [{ value: "310101", label: "黄浦区" }, { value: "310104", label: "徐汇区" }, { value: "310105", label: "长宁区" }, { value: "310106", label: "静安区" }, { value: "310107", label: "普陀区" }, { value: "310109", label: "虹口区" }, { value: "310110", label: "杨浦区" }, { value: "310112", label: "闵行区" }, { value: "310113", label: "宝山区" }, { value: "310114", label: "嘉定区" }, { value: "310115", label: "浦东新区" }, { value: "310116", label: "金山区" }, { value: "310117", label: "松江区" }, { value: "310118", label: "青浦区" }, { value: "310120", label: "奉贤区" }, { value: "310151", label: "崇明区" }] }] }, { value: '320000', label: '江苏省', children: [{ value: "320100", label: "南京市", children: [{ value: "320102", label: "玄武区" }, { value: "320104", label: "秦淮区" }, { value: "320105", label: "建邺区" }, { value: "320106", label: "鼓楼区" }, { value: "320111", label: "浦口区" }, { value: "320113", label: "栖霞区" }, { value: "320114", label: "雨花台区" }, { value: "320115", label: "江宁区" }, { value: "320116", label: "六合区" }, { value: "320117", label: "溧水区" }, { value: "320118", label: "高淳区" }] }, { value: "320200", label: "无锡市", children: [{ value: "320205", label: "锡山区" }, { value: "320206", label: "惠山区" }, { value: "320211", label: "滨湖区" }, { value: "320281", label: "江阴市" }, { value: "320282", label: "宜兴市" }, { value: "320213", label: "梁溪区" }, { value: "320214", label: "新吴区" }] }, { value: "320300", label: "徐州市", children: [{ value: "320302", label: "鼓楼区" }, { value: "320303", label: "云龙区" }, { value: "320305", label: "贾汪区" }, { value: "320311", label: "泉山区" }, { value: "320321", label: "丰县" }, { value: "320322", label: "沛县" }, { value: "320324", label: "睢宁县" }, { value: "320381", label: "新沂市" }, { value: "320382", label: "邳州市" }, { value: "320371", label: "徐州经济技术开发区" }] }, { value: "320400", label: "常州市", children: [{ value: "320402", label: "天宁区" }, { value: "320404", label: "钟楼区" }, { value: "320411", label: "新北区" }, { value: "320412", label: "武进区" }, { value: "320481", label: "溧阳市" }, { value: "320413", label: "金坛区" }] }, { value: "320500", label: "苏州市", children: [{ value: "320505", label: "虎丘区" }, { value: "320506", label: "吴中区" }, { value: "320507", label: "相城区" }, { value: "320581", label: "常熟市" }, { value: "320582", label: "张家港市" }, { value: "320583", label: "昆山市" }, { value: "320509", label: "吴江区" }, { value: "320585", label: "太仓市" }, { value: "320508", label: "姑苏区" }, { value: "320571", label: "苏州工业园区" }] }, { value: "320600", label: "南通市", children: [{ value: "320602", label: "崇川区" }, { value: "320611", label: "港闸区" }, { value: "320612", label: "通州区" }, { value: "320621", label: "海安县" }, { value: "320623", label: "如东县" }, { value: "320681", label: "启东市" }, { value: "320682", label: "如皋市" }, { value: "320684", label: "海门市" }, { value: "320671", label: "南通经济技术开发区" }] }, { value: "320700", label: "连云港市", children: [{ value: "320703", label: "连云区" }, { value: "320706", label: "海州区" }, { value: "320707", label: "赣榆区" }, { value: "320722", label: "东海县" }, { value: "320723", label: "灌云县" }, { value: "320724", label: "灌南县" }, { value: "320771", label: "连云港经济技术开发区" }, { value: "320772", label: "连云港高新技术产业开发区" }] }, { value: "320800", label: "淮安市", children: [{ value: "320804", label: "淮阴区" }, { value: "320812", label: "清江浦区" }, { value: "320826", label: "涟水县" }, { value: "320813", label: "洪泽区" }, { value: "320830", label: "盱眙县" }, { value: "320831", label: "金湖县" }, { value: "320803", label: "淮安区" }, { value: "320871", label: "淮安经济技术开发区" }] }, { value: "320900", label: "盐城市", children: [{ value: "320902", label: "亭湖区" }, { value: "320903", label: "盐都区" }, { value: "320921", label: "响水县" }, { value: "320922", label: "滨海县" }, { value: "320904", label: "大丰区" }, { value: "320923", label: "阜宁县" }, { value: "320924", label: "射阳县" }, { value: "320925", label: "建湖县" }, { value: "320981", label: "东台市" }, { value: "320971", label: "盐城经济技术开发区" }] }, { value: "321000", label: "扬州市", children: [{ value: "321002", label: "广陵区" }, { value: "321003", label: "邗江区" }, { value: "321011", label: "维扬区" }, { value: "321023", label: "宝应县" }, { value: "321081", label: "仪征市" }, { value: "321084", label: "高邮市" }, { value: "321012", label: "江都区" }, { value: "321071", label: "扬州经济技术开发区" }] }, { value: "321100", label: "镇江市", children: [{ value: "321102", label: "京口区" }, { value: "321111", label: "润州区" }, { value: "321112", label: "丹徒区" }, { value: "321181", label: "丹阳市" }, { value: "321182", label: "扬中市" }, { value: "321183", label: "句容市" }, { value: "321171", label: "镇江新区" }] }, { value: "321200", label: "泰州市", children: [{ value: "321202", label: "海陵区" }, { value: "321203", label: "高港区" }, { value: "321281", label: "兴化市" }, { value: "321282", label: "靖江市" }, { value: "321283", label: "泰兴市" }, { value: "321204", label: "姜堰区" }, { value: "321271", label: "泰州医药高新技术产业开发区" }] }, { value: "321300", label: "宿迁市", children: [{ value: "321302", label: "宿城区" }, { value: "321311", label: "宿豫区" }, { value: "321322", label: "沭阳县" }, { value: "321323", label: "泗阳县" }, { value: "321324", label: "泗洪县" }] }] }, { value: '330000', label: '浙江省', children: [{ value: "330100", label: "杭州市", children: [{ value: "330102", label: "上城区" }, { value: "330103", label: "下城区" }, { value: "330104", label: "江干区" }, { value: "330105", label: "拱墅区" }, { value: "330106", label: "西湖区" }, { value: "330108", label: "滨江区" }, { value: "330109", label: "萧山区" }, { value: "330110", label: "余杭区" }, { value: "330122", label: "桐庐县" }, { value: "330127", label: "淳安县" }, { value: "330182", label: "建德市" }, { value: "330111", label: "富阳区" }, { value: "330112", label: "临安区" }, { value: "330186", label: "其它区" }] }, { value: "330200", label: "宁波市", children: [{ value: "330203", label: "海曙区" }, { value: "330205", label: "江北区" }, { value: "330206", label: "北仑区" }, { value: "330211", label: "镇海区" }, { value: "330212", label: "鄞州区" }, { value: "330225", label: "象山县" }, { value: "330226", label: "宁海县" }, { value: "330281", label: "余姚市" }, { value: "330282", label: "慈溪市" }, { value: "330213", label: "奉化区" }] }, { value: "330300", label: "温州市", children: [{ value: "330302", label: "鹿城区" }, { value: "330303", label: "龙湾区" }, { value: "330304", label: "瓯海区" }, { value: "330305", label: "洞头区" }, { value: "330324", label: "永嘉县" }, { value: "330326", label: "平阳县" }, { value: "330327", label: "苍南县" }, { value: "330328", label: "文成县" }, { value: "330329", label: "泰顺县" }, { value: "330381", label: "瑞安市" }, { value: "330382", label: "乐清市" }, { value: "330371", label: "温州经济技术开发区" }] }, { value: "330400", label: "嘉兴市", children: [{ value: "330402", label: "南湖区" }, { value: "330411", label: "秀洲区" }, { value: "330421", label: "嘉善县" }, { value: "330424", label: "海盐县" }, { value: "330481", label: "海宁市" }, { value: "330482", label: "平湖市" }, { value: "330483", label: "桐乡市" }] }, { value: "330500", label: "湖州市", children: [{ value: "330502", label: "吴兴区" }, { value: "330503", label: "南浔区" }, { value: "330521", label: "德清县" }, { value: "330522", label: "长兴县" }, { value: "330523", label: "安吉县" }] }, { value: "330600", label: "绍兴市", children: [{ value: "330602", label: "越城区" }, { value: "330621", label: "柯桥区" }, { value: "330681", label: "诸暨市" }, { value: "330604", label: "上虞区" }, { value: "330683", label: "嵊州市" }, { value: "330624", label: "新昌县" }] }, { value: "330700", label: "金华市", children: [{ value: "330702", label: "婺城区" }, { value: "330703", label: "金东区" }, { value: "330723", label: "武义县" }, { value: "330726", label: "浦江县" }, { value: "330727", label: "磐安县" }, { value: "330781", label: "兰溪市" }, { value: "330782", label: "义乌市" }, { value: "330783", label: "东阳市" }, { value: "330784", label: "永康市" }] }, { value: "330800", label: "衢州市", children: [{ value: "330802", label: "柯城区" }, { value: "330803", label: "衢江区" }, { value: "330822", label: "常山县" }, { value: "330824", label: "开化县" }, { value: "330825", label: "龙游县" }, { value: "330881", label: "江山市" }] }, { value: "330900", label: "舟山市", children: [{ value: "330902", label: "定海区" }, { value: "330903", label: "普陀区" }, { value: "330921", label: "岱山县" }, { value: "330922", label: "嵊泗县" }] }, { value: "331000", label: "台州市", children: [{ value: "331002", label: "椒江区" }, { value: "331003", label: "黄岩区" }, { value: "331004", label: "路桥区" }, { value: "331083", label: "玉环市" }, { value: "331022", label: "三门县" }, { value: "331023", label: "天台县" }, { value: "331024", label: "仙居县" }, { value: "331081", label: "温岭市" }, { value: "331082", label: "临海市" }] }, { value: "331100", label: "丽水市", children: [{ value: "331102", label: "莲都区" }, { value: "331121", label: "青田县" }, { value: "331122", label: "缙云县" }, { value: "331123", label: "遂昌县" }, { value: "331124", label: "松阳县" }, { value: "331125", label: "云和县" }, { value: "331126", label: "庆元县" }, { value: "331127", label: "景宁畲族自治县" }, { value: "331181", label: "龙泉市" }] }] }, { value: '340000', label: '安徽省', children: [{ value: "340100", label: "合肥市", children: [{ value: "340111", label: "包河区" }, { value: "340104", label: "蜀山区" }, { value: "340103", label: "庐阳区" }, { value: "340102", label: "瑶海区" }, { value: "340171", label: "合肥高新技术产业开发区" }, { value: "340172", label: "合肥经济技术开发区" }, { value: "340173", label: "合肥新站高新技术产业开发区" }, { value: "340121", label: "长丰县" }, { value: "340122", label: "肥东县" }, { value: "340123", label: "肥西县" }, { value: "340124", label: "庐江县" }, { value: "340181", label: "巢湖市" }] }, { value: "340200", label: "芜湖市", children: [{ value: "340202", label: "镜湖区" }, { value: "340203", label: "弋江区" }, { value: "340207", label: "鸠江区" }, { value: "340208", label: "三山区" }, { value: "340221", label: "芜湖县" }, { value: "340222", label: "繁昌县" }, { value: "340223", label: "南陵县" }, { value: "340225", label: "无为县" }, { value: "340272", label: "安徽芜湖长江大桥经济开发区" }, { value: "340271", label: "芜湖经济技术开发区" }] }, { value: "340300", label: "蚌埠市", children: [{ value: "340302", label: "龙子湖区" }, { value: "340303", label: "蚌山区" }, { value: "340304", label: "禹会区" }, { value: "340311", label: "淮上区" }, { value: "340321", label: "怀远县" }, { value: "340322", label: "五河县" }, { value: "340323", label: "固镇县" }, { value: "340371", label: "蚌埠市高新技术开发区" }, { value: "340372	", label: "蚌埠市经济开发区" }] }, { value: "340400", label: "淮南市", children: [{ value: "340402", label: "大通区" }, { value: "340403", label: "田家庵区" }, { value: "340404", label: "谢家集区" }, { value: "340405", label: "八公山区" }, { value: "340406", label: "潘集区" }, { value: "340421", label: "凤台县" }, { value: "340422", label: "寿县" }] }, { value: "340500", label: "马鞍山市", children: [{ value: "340503", label: "花山区" }, { value: "340504", label: "雨山区" }, { value: "340521", label: "当涂县" }, { value: "340506", label: "博望区" }, { value: "340522", label: "含山县" }, { value: "340523", label: "和县" }] }, { value: "340600", label: "淮北市", children: [{ value: "340602", label: "杜集区" }, { value: "340603", label: "相山区" }, { value: "340604", label: "烈山区" }, { value: "340621", label: "濉溪县" }] }, { value: "340700", label: "铜陵市", children: [{ value: "340705", label: "铜官区" }, { value: "340706", label: "义安区" }, { value: "340711", label: "郊区" }, { value: "340722", label: "枞阳县" }] }, { value: "340800", label: "安庆市", children: [{ value: "340802", label: "迎江区" }, { value: "340803", label: "大观区" }, { value: "340811", label: "宜秀区" }, { value: "340822", label: "怀宁县" }, { value: "340824", label: "潜山县" }, { value: "340825", label: "太湖县" }, { value: "340826", label: "宿松县" }, { value: "340827", label: "望江县" }, { value: "340828", label: "岳西县" }, { value: "340881", label: "桐城市" }, { value: "340871", label: "安徽安庆经济开发区" }] }, { value: "341000", label: "黄山市", children: [{ value: "341002", label: "屯溪区" }, { value: "341003", label: "黄山区" }, { value: "341004", label: "徽州区" }, { value: "341021", label: "歙县" }, { value: "341022", label: "休宁县" }, { value: "341023", label: "黟县" }, { value: "341024", label: "祁门县" }] }, { value: "341100", label: "滁州市", children: [{ value: "341102", label: "琅琊区" }, { value: "341103", label: "南谯区" }, { value: "341122", label: "来安县" }, { value: "341124", label: "全椒县" }, { value: "341125", label: "定远县" }, { value: "341126", label: "凤阳县" }, { value: "341181", label: "天长市" }, { value: "341182", label: "明光市" }, { value: "341171", label: "苏滁现代产业园" }, { value: "341172", label: "滁州经济技术开发区" }] }, { value: "341200", label: "阜阳市", children: [{ value: "341202", label: "颍州区" }, { value: "341203", label: "颍东区" }, { value: "341204", label: "颍泉区" }, { value: "341221", label: "临泉县" }, { value: "341222", label: "太和县" }, { value: "341225", label: "阜南县" }, { value: "341226", label: "颍上县" }, { value: "341282", label: "界首市" }, { value: "341272", label: "阜阳经济技术开发区" }, { value: "341271", label: "阜阳合肥现代产业园区" }] }, { value: "341300", label: "宿州市", children: [{ value: "341302", label: "埇桥区" }, { value: "341321", label: "砀山县" }, { value: "341322", label: "萧县" }, { value: "341323", label: "灵璧县" }, { value: "341324", label: "泗县" }, { value: "341371", label: "宿州马鞍山现代产业园区" }, { value: "341372", label: "宿州经济技术开发区" }] }, { value: "341500", label: "六安市", children: [{ value: "341502", label: "金安区" }, { value: "341503", label: "裕安区" }, { value: "341504", label: "叶集区" }, { value: "341522", label: "霍邱县" }, { value: "341523", label: "舒城县" }, { value: "341524", label: "金寨县" }, { value: "341525", label: "霍山县" }] }, { value: "341600", label: "亳州市", children: [{ value: "341602", label: "谯城区" }, { value: "341621", label: "涡阳县" }, { value: "341622", label: "蒙城县" }, { value: "341623", label: "利辛县" }] }, { value: "341700", label: "池州市", children: [{ value: "341702", label: "贵池区" }, { value: "341721", label: "东至县" }, { value: "341722", label: "石台县" }, { value: "341723", label: "青阳县" }] }, { value: "341800", label: "宣城市", children: [{ value: "341802", label: "宣州区" }, { value: "341821", label: "郎溪县" }, { value: "341822", label: "广德县" }, { value: "341823", label: "泾县" }, { value: "341824", label: "绩溪县" }, { value: "341825", label: "旌德县" }, { value: "341881", label: "宁国市" }, { value: "341871", label: "宣城市经济开发区" }] }] }, { value: '350000', label: '福建省', children: [{ value: "350100", label: "福州市", children: [{ value: "350102", label: "鼓楼区" }, { value: "350103", label: "台江区" }, { value: "350104", label: "仓山区" }, { value: "350105", label: "马尾区" }, { value: "350111", label: "晋安区" }, { value: "350121", label: "闽侯县" }, { value: "350122", label: "连江县" }, { value: "350123", label: "罗源县" }, { value: "350124", label: "闽清县" }, { value: "350125", label: "永泰县" }, { value: "350128", label: "平潭县" }, { value: "350181", label: "福清市" }, { value: "350182", label: "长乐市" }] }, { value: "350200", label: "厦门市", children: [{ value: "350203", label: "思明区" }, { value: "350205", label: "海沧区" }, { value: "350206", label: "湖里区" }, { value: "350211", label: "集美区" }, { value: "350212", label: "同安区" }, { value: "350213", label: "翔安区" }] }, { value: "350300", label: "莆田市", children: [{ value: "350302", label: "城厢区" }, { value: "350303", label: "涵江区" }, { value: "350304", label: "荔城区" }, { value: "350305", label: "秀屿区" }, { value: "350322", label: "仙游县" }] }, { value: "350400", label: "三明市", children: [{ value: "350402", label: "梅列区" }, { value: "350403", label: "三元区" }, { value: "350421", label: "明溪县" }, { value: "350423", label: "清流县" }, { value: "350424", label: "宁化县" }, { value: "350425", label: "大田县" }, { value: "350426", label: "尤溪县" }, { value: "350427", label: "沙县" }, { value: "350428", label: "将乐县" }, { value: "350429", label: "泰宁县" }, { value: "350430", label: "建宁县" }, { value: "350481", label: "永安市" }] }, { value: "350500", label: "泉州市", children: [{ value: "350502", label: "鲤城区" }, { value: "350503", label: "丰泽区" }, { value: "350504", label: "洛江区" }, { value: "350505", label: "泉港区" }, { value: "350521", label: "惠安县" }, { value: "350524", label: "安溪县" }, { value: "350525", label: "永春县" }, { value: "350526", label: "德化县" }, { value: "350527", label: "金门县" }, { value: "350581", label: "石狮市" }, { value: "350582", label: "晋江市" }, { value: "350583", label: "南安市" }] }, { value: "350600", label: "漳州市", children: [{ value: "350602", label: "芗城区" }, { value: "350603", label: "龙文区" }, { value: "350622", label: "云霄县" }, { value: "350623", label: "漳浦县" }, { value: "350624", label: "诏安县" }, { value: "350625", label: "长泰县" }, { value: "350626", label: "东山县" }, { value: "350627", label: "南靖县" }, { value: "350628", label: "平和县" }, { value: "350629", label: "华安县" }, { value: "350681", label: "龙海市" }] }, { value: "350700", label: "南平市", children: [{ value: "350702", label: "延平区" }, { value: "350721", label: "顺昌县" }, { value: "350722", label: "浦城县" }, { value: "350723", label: "光泽县" }, { value: "350724", label: "松溪县" }, { value: "350725", label: "政和县" }, { value: "350781", label: "邵武市" }, { value: "350782", label: "武夷山市" }, { value: "350783", label: "建瓯市" }, { value: "350703", label: "建阳区" }] }, { value: "350800", label: "龙岩市", children: [{ value: "350802", label: "新罗区" }, { value: "350821", label: "长汀县" }, { value: "350803", label: "永定区" }, { value: "350823", label: "上杭县" }, { value: "350824", label: "武平县" }, { value: "350825", label: "连城县" }, { value: "350881", label: "漳平市" }] }, { value: "350900", label: "宁德市", children: [{ value: "350902", label: "蕉城区" }, { value: "350921", label: "霞浦县" }, { value: "350922", label: "古田县" }, { value: "350923", label: "屏南县" }, { value: "350924", label: "寿宁县" }, { value: "350925", label: "周宁县" }, { value: "350926", label: "柘荣县" }, { value: "350981", label: "福安市" }, { value: "350982", label: "福鼎市" }] }] }, { value: '360000', label: '江西省', children: [{ value: "360100", label: "南昌市", children: [{ value: "360102", label: "东湖区" }, { value: "360103", label: "西湖区" }, { value: "360104", label: "青云谱区" }, { value: "360105", label: "湾里区" }, { value: "360111", label: "青山湖区" }, { value: "360121", label: "南昌县" }, { value: "360112", label: "新建区" }, { value: "360123", label: "安义县" }, { value: "360124", label: "进贤县" }] }, { value: "360200", label: "景德镇市", children: [{ value: "360202", label: "昌江区" }, { value: "360203", label: "珠山区" }, { value: "360222", label: "浮梁县" }, { value: "360281", label: "乐平市" }] }, { value: "360300", label: "萍乡市", children: [{ value: "360302", label: "安源区" }, { value: "360313", label: "湘东区" }, { value: "360321", label: "莲花县" }, { value: "360322", label: "上栗县" }, { value: "360323", label: "芦溪县" }] }, { value: "360400", label: "九江市", children: [{ value: "360402", label: "濂溪区" }, { value: "360403", label: "浔阳区" }, { value: "360404", label: "柴桑区" }, { value: "360423", label: "武宁县" }, { value: "360424", label: "修水县" }, { value: "360425", label: "永修县" }, { value: "360426", label: "德安县" }, { value: "360428", label: "都昌县" }, { value: "360429", label: "湖口县" }, { value: "360430", label: "彭泽县" }, { value: "360481", label: "瑞昌市" }, { value: "360482", label: "共青城市" }, { value: "360483", label: "庐山市" }] }, { value: "360500", label: "新余市", children: [{ value: "360502", label: "渝水区" }, { value: "360521", label: "分宜县" }] }, { value: "360600", label: "鹰潭市", children: [{ value: "360602", label: "月湖区" }, { value: "360622", label: "余江县" }, { value: "360681", label: "贵溪市" }] }, { value: "360700", label: "赣州市", children: [{ value: "360702", label: "章贡区" }, { value: "360704", label: "赣县区" }, { value: "360722", label: "信丰县" }, { value: "360723", label: "大余县" }, { value: "360724", label: "上犹县" }, { value: "360725", label: "崇义县" }, { value: "360726", label: "安远县" }, { value: "360727", label: "龙南县" }, { value: "360728", label: "定南县" }, { value: "360729", label: "全南县" }, { value: "360730", label: "宁都县" }, { value: "360731", label: "于都县" }, { value: "360732", label: "兴国县" }, { value: "360733", label: "会昌县" }, { value: "360734", label: "寻乌县" }, { value: "360735", label: "石城县" }, { value: "360781", label: "瑞金市" }, { value: "360703", label: "南康区" }] }, { value: "360800", label: "吉安市", children: [{ value: "360802", label: "吉州区" }, { value: "360803", label: "青原区" }, { value: "360821", label: "吉安县" }, { value: "360822", label: "吉水县" }, { value: "360823", label: "峡江县" }, { value: "360824", label: "新干县" }, { value: "360825", label: "永丰县" }, { value: "360826", label: "泰和县" }, { value: "360827", label: "遂川县" }, { value: "360828", label: "万安县" }, { value: "360829", label: "安福县" }, { value: "360830", label: "永新县" }, { value: "360881", label: "井冈山市" }] }, { value: "360900", label: "宜春市", children: [{ value: "360902", label: "袁州区" }, { value: "360921", label: "奉新县" }, { value: "360922", label: "万载县" }, { value: "360923", label: "上高县" }, { value: "360924", label: "宜丰县" }, { value: "360925", label: "靖安县" }, { value: "360926", label: "铜鼓县" }, { value: "360981", label: "丰城市" }, { value: "360982", label: "樟树市" }, { value: "360983", label: "高安市" }] }, { value: "361000", label: "抚州市", children: [{ value: "361002", label: "临川区" }, { value: "361021", label: "南城县" }, { value: "361022", label: "黎川县" }, { value: "361023", label: "南丰县" }, { value: "361024", label: "崇仁县" }, { value: "361025", label: "乐安县" }, { value: "361026", label: "宜黄县" }, { value: "361027", label: "金溪县" }, { value: "361028", label: "资溪县" }, { value: "361003", label: "东乡区" }, { value: "361030", label: "广昌县" }] }, { value: "361100", label: "上饶市", children: [{ value: "361102", label: "信州区" }, { value: "361121", label: "上饶县" }, { value: "361103", label: "广丰区" }, { value: "361123", label: "玉山县" }, { value: "361124", label: "铅山县" }, { value: "361125", label: "横峰县" }, { value: "361126", label: "弋阳县" }, { value: "361127", label: "余干县" }, { value: "361128", label: "鄱阳县" }, { value: "361129", label: "万年县" }, { value: "361130", label: "婺源县" }, { value: "361181", label: "德兴市" }] }] }, { value: '370000', label: '山东省', children: [{ value: "370100", label: "济南市", children: [{ value: "370102", label: "历下区" }, { value: "370103", label: "市中区" }, { value: "370104", label: "槐荫区" }, { value: "370105", label: "天桥区" }, { value: "370112", label: "历城区" }, { value: "370113", label: "长清区" }, { value: "370124", label: "平阴县" }, { value: "370125", label: "济阳县" }, { value: "370126", label: "商河县" }, { value: "370114", label: "章丘区" }, { value: "370171", label: "济南高新技术产业开发区" }] }, { value: "370200", label: "青岛市", children: [{ value: "370202", label: "市南区" }, { value: "370203", label: "市北区" }, { value: "370211", label: "黄岛区" }, { value: "370212", label: "崂山区" }, { value: "370213", label: "李沧区" }, { value: "370214", label: "城阳区" }, { value: "370281", label: "胶州市" }, { value: "370215", label: "即墨区" }, { value: "370283", label: "平度市" }, { value: "370285", label: "莱西市" }, { value: "370271", label: "青岛高新技术产业开发区" }] }, { value: "370300", label: "淄博市", children: [{ value: "370302", label: "淄川区" }, { value: "370303", label: "张店区" }, { value: "370304", label: "博山区" }, { value: "370305", label: "临淄区" }, { value: "370306", label: "周村区" }, { value: "370321", label: "桓台县" }, { value: "370322", label: "高青县" }, { value: "370323", label: "沂源县" }] }, { value: "370400", label: "枣庄市", children: [{ value: "370402", label: "市中区" }, { value: "370403", label: "薛城区" }, { value: "370404", label: "峄城区" }, { value: "370405", label: "台儿庄区" }, { value: "370406", label: "山亭区" }, { value: "370481", label: "滕州市" }] }, { value: "370500", label: "东营市", children: [{ value: "370502", label: "东营区" }, { value: "370503", label: "河口区" }, { value: "370521", label: "垦利县" }, { value: "370522", label: "利津县" }, { value: "370523", label: "广饶县" }, { value: "370589", label: "西城区" }, { value: "370571", label: "东营经济技术开发区" }, { value: "370572", label: "东营港经济开发区" }] }, { value: "370600", label: "烟台市", children: [{ value: "370602", label: "芝罘区" }, { value: "370611", label: "福山区" }, { value: "370612", label: "牟平区" }, { value: "370613", label: "莱山区" }, { value: "370634", label: "长岛县" }, { value: "370681", label: "龙口市" }, { value: "370682", label: "莱阳市" }, { value: "370683", label: "莱州市" }, { value: "370684", label: "蓬莱市" }, { value: "370685", label: "招远市" }, { value: "370686", label: "栖霞市" }, { value: "370687", label: "海阳市" }, { value: "370671", label: "烟台高新技术产业开发区" }, { value: "370672", label: "烟台经济技术开发区" }] }, { value: "370700", label: "潍坊市", children: [{ value: "370702", label: "潍城区" }, { value: "370703", label: "寒亭区" }, { value: "370704", label: "坊子区" }, { value: "370705", label: "奎文区" }, { value: "370724", label: "临朐县" }, { value: "370725", label: "昌乐县" }, { value: "370772", label: "潍坊滨海经济技术开发区" }, { value: "370781", label: "青州市" }, { value: "370782", label: "诸城市" }, { value: "370783", label: "寿光市" }, { value: "370784", label: "安丘市" }, { value: "370785", label: "高密市" }, { value: "370786", label: "昌邑市" }] }, { value: "370800", label: "济宁市", children: [{ value: "370811", label: "任城区" }, { value: "370826", label: "微山县" }, { value: "370827", label: "鱼台县" }, { value: "370828", label: "金乡县" }, { value: "370829", label: "嘉祥县" }, { value: "370830", label: "汶上县" }, { value: "370831", label: "泗水县" }, { value: "370832", label: "梁山县" }, { value: "370881", label: "曲阜市" }, { value: "370812", label: "兖州区" }, { value: "370883", label: "邹城市" }, { value: "370871", label: "济宁高新技术产业开发区" }] }, { value: "370900", label: "泰安市", children: [{ value: "370902", label: "泰山区" }, { value: "370903", label: "岱岳区" }, { value: "370921", label: "宁阳县" }, { value: "370923", label: "东平县" }, { value: "370982", label: "新泰市" }, { value: "370983", label: "肥城市" }] }, { value: "371000", label: "威海市", children: [{ value: "371002", label: "环翠区" }, { value: "371003", label: "文登区" }, { value: "371082", label: "荣成市" }, { value: "371083", label: "乳山市" }, { value: "371071", label: "威海火炬高技术产业开发区" }, { value: "371072", label: "威海经济技术开发区" }, { value: "371073", label: "威海临港经济技术开发区" }] }, { value: "371100", label: "日照市", children: [{ value: "371102", label: "东港区" }, { value: "371103", label: "岚山区" }, { value: "371121", label: "五莲县" }, { value: "371122", label: "莒县" }, { value: "371171", label: "日照经济技术开发区" }, { value: "371172", label: "日照国际海洋城" }] }, { value: "371200", label: "莱芜市", children: [{ value: "371202", label: "莱城区" }, { value: "371203", label: "钢城区" }] }, { value: "371300", label: "临沂市", children: [{ value: "371302", label: "兰山区" }, { value: "371311", label: "罗庄区" }, { value: "371312", label: "河东区" }, { value: "371321", label: "沂南县" }, { value: "371322", label: "郯城县" }, { value: "371323", label: "沂水县" }, { value: "371324", label: "兰陵县" }, { value: "371325", label: "费县" }, { value: "371326", label: "平邑县" }, { value: "371327", label: "莒南县" }, { value: "371328", label: "蒙阴县" }, { value: "371329", label: "临沭县" }, { value: "371371", label: "临沂高新技术产业开发区" }, { value: "371373", label: "临沂临港经济开发区" }, { value: "371372", label: "临沂经济技术开发区" }] }, { value: "371400", label: "德州市", children: [{ value: "371402", label: "德城区" }, { value: "371403", label: "陵城区" }, { value: "371422", label: "宁津县" }, { value: "371423", label: "庆云县" }, { value: "371424", label: "临邑县" }, { value: "371425", label: "齐河县" }, { value: "371426", label: "平原县" }, { value: "371427", label: "夏津县" }, { value: "371428", label: "武城县" }, { value: "371481", label: "乐陵市" }, { value: "371482", label: "禹城市" }, { value: "371471", label: "德州经济技术开发区" }, { value: "371472", label: "德州运河经济开发区" }] }, { value: "371500", label: "聊城市", children: [{ value: "371502", label: "东昌府区" }, { value: "371521", label: "阳谷县" }, { value: "371522", label: "莘县" }, { value: "371523", label: "茌平县" }, { value: "371524", label: "东阿县" }, { value: "371525", label: "冠县" }, { value: "371526", label: "高唐县" }, { value: "371581", label: "临清市" }] }, { value: "371600", label: "滨州市", children: [{ value: "371602", label: "滨城区" }, { value: "371621", label: "惠民县" }, { value: "371622", label: "阳信县" }, { value: "371623", label: "无棣县" }, { value: "371603", label: "沾化区" }, { value: "371625", label: "博兴县" }, { value: "371626", label: "邹平县" }] }, { value: "371700", label: "菏泽市", children: [{ value: "371702", label: "牡丹区" }, { value: "371721", label: "曹县" }, { value: "371722", label: "单县" }, { value: "371723", label: "成武县" }, { value: "371724", label: "巨野县" }, { value: "371725", label: "郓城县" }, { value: "371726", label: "鄄城县" }, { value: "371727", label: "定陶区" }, { value: "371728", label: "东明县" }, { value: "371771", label: "菏泽经济技术开发区" }, { value: "371772", label: "菏泽高新技术开发区" }] }] }, { value: '410000', label: '河南省', children: [{ value: "410100", label: "郑州市", children: [{ value: "410102", label: "中原区" }, { value: "410103", label: "二七区" }, { value: "410104", label: "管城回族区" }, { value: "410105", label: "金水区" }, { value: "410106", label: "上街区" }, { value: "410108", label: "惠济区" }, { value: "410122", label: "中牟县" }, { value: "410181", label: "巩义市" }, { value: "410182", label: "荥阳市" }, { value: "410183", label: "新密市" }, { value: "410184", label: "新郑市" }, { value: "410185", label: "登封市" }, { value: "410171", label: "郑州经济技术开发区" }, { value: "410172", label: "郑州高新技术产业开发区" }, { value: "410173", label: "郑州航空港经济综合实验区" }] }, { value: "410200", label: "开封市", children: [{ value: "410202", label: "龙亭区" }, { value: "410203", label: "顺河回族区" }, { value: "410204", label: "鼓楼区" }, { value: "410205", label: "禹王台区" }, { value: "410211", label: "金明区" }, { value: "410221", label: "杞县" }, { value: "410222", label: "通许县" }, { value: "410223", label: "尉氏县" }, { value: "410225", label: "兰考县" }, { value: "410212", label: "祥符区" }] }, { value: "410300", label: "洛阳市", children: [{ value: "410302", label: "老城区" }, { value: "410303", label: "西工区" }, { value: "410304", label: "廛河回族区" }, { value: "410305", label: "涧西区" }, { value: "410306", label: "吉利区" }, { value: "410307", label: "洛龙区" }, { value: "410322", label: "孟津县" }, { value: "410323", label: "新安县" }, { value: "410324", label: "栾川县" }, { value: "410325", label: "嵩县" }, { value: "410326", label: "汝阳县" }, { value: "410327", label: "宜阳县" }, { value: "410328", label: "洛宁县" }, { value: "410329", label: "伊川县" }, { value: "410381", label: "偃师市" }, { value: "410371", label: "洛阳高新技术产业开发区" }, { value: "471005", label: "其它区" }] }, { value: "410400", label: "平顶山市", children: [{ value: "410402", label: "新华区" }, { value: "410403", label: "卫东区" }, { value: "410404", label: "石龙区" }, { value: "410411", label: "湛河区" }, { value: "410421", label: "宝丰县" }, { value: "410422", label: "叶县" }, { value: "410423", label: "鲁山县" }, { value: "410425", label: "郏县" }, { value: "410481", label: "舞钢市" }, { value: "410482", label: "汝州市" }, { value: "410471", label: "平顶山高新技术产业开发区" }, { value: "410472", label: "平顶山市新城区" }] }, { value: "410500", label: "安阳市", children: [{ value: "410502", label: "文峰区" }, { value: "410503", label: "北关区" }, { value: "410505", label: "殷都区" }, { value: "410506", label: "龙安区" }, { value: "410522", label: "安阳县" }, { value: "410523", label: "汤阴县" }, { value: "410526", label: "滑县" }, { value: "410527", label: "内黄县" }, { value: "410581", label: "林州市" }, { value: "410571", label: "安阳高新技术产业开发区" }] }, { value: "410600", label: "鹤壁市", children: [{ value: "410602", label: "鹤山区" }, { value: "410603", label: "山城区" }, { value: "410611", label: "淇滨区" }, { value: "410621", label: "浚县" }, { value: "410622", label: "淇县" }, { value: "410671", label: "鹤壁经济技术开发区" }] }, { value: "410700", label: "新乡市", children: [{ value: "410702", label: "红旗区" }, { value: "410703", label: "卫滨区" }, { value: "410704", label: "凤泉区" }, { value: "410711", label: "牧野区" }, { value: "410721", label: "新乡县" }, { value: "410724", label: "获嘉县" }, { value: "410725", label: "原阳县" }, { value: "410726", label: "延津县" }, { value: "410727", label: "封丘县" }, { value: "410728", label: "长垣县" }, { value: "410781", label: "卫辉市" }, { value: "410782", label: "辉县市" }, { value: "410771", label: "新乡高新技术产业开发区" }, { value: "410773", label: "新乡市平原城乡一体化示范区" }, { value: "410772", label: "新乡经济技术开发区" }] }, { value: "410800", label: "焦作市", children: [{ value: "410802", label: "解放区" }, { value: "410803", label: "中站区" }, { value: "410804", label: "马村区" }, { value: "410811", label: "山阳区" }, { value: "410821", label: "修武县" }, { value: "410822", label: "博爱县" }, { value: "410823", label: "武陟县" }, { value: "410825", label: "温县" }, { value: "410882", label: "沁阳市" }, { value: "410883", label: "孟州市" }, { value: "410871", label: "焦作城乡一体化示范区" }] }, { value: "410900", label: "濮阳市", children: [{ value: "410902", label: "华龙区" }, { value: "410922", label: "清丰县" }, { value: "410923", label: "南乐县" }, { value: "410926", label: "范县" }, { value: "410927", label: "台前县" }, { value: "410928", label: "濮阳县" }, { value: "410971", label: "河南濮阳工业园区" }, { value: "410972", label: "濮阳经济技术开发区" }] }, { value: "411000", label: "许昌市", children: [{ value: "411002", label: "魏都区" }, { value: "411003", label: "建安区" }, { value: "411024", label: "鄢陵县" }, { value: "411025", label: "襄城县" }, { value: "411081", label: "禹州市" }, { value: "411082", label: "长葛市" }, { value: "411071", label: "许昌经济技术开发区" }] }, { value: "411100", label: "漯河市", children: [{ value: "411102", label: "源汇区" }, { value: "411103", label: "郾城区" }, { value: "411104", label: "召陵区" }, { value: "411121", label: "舞阳县" }, { value: "411122", label: "临颍县" }, { value: "411171", label: "漯河经济技术开发区" }] }, { value: "411200", label: "三门峡市", children: [{ value: "411202", label: "湖滨区" }, { value: "411221", label: "渑池县" }, { value: "411222", label: "陕县" }, { value: "411224", label: "卢氏县" }, { value: "411281", label: "义马市" }, { value: "411282", label: "灵宝市" }, { value: "411203", label: "陕州区" }, { value: "411271", label: "河南三门峡经济开发区" }] }, { value: "411300", label: "南阳市", children: [{ value: "411302", label: "宛城区" }, { value: "411303", label: "卧龙区" }, { value: "411321", label: "南召县" }, { value: "411322", label: "方城县" }, { value: "411323", label: "西峡县" }, { value: "411324", label: "镇平县" }, { value: "411325", label: "内乡县" }, { value: "411326", label: "淅川县" }, { value: "411327", label: "社旗县" }, { value: "411328", label: "唐河县" }, { value: "411329", label: "新野县" }, { value: "411330", label: "桐柏县" }, { value: "411381", label: "邓州市" }, { value: "411371", label: "南阳高新技术产业开发区" }, { value: "411372", label: "南阳市城乡一体化示范区" }] }, { value: "411400", label: "商丘市", children: [{ value: "411402", label: "梁园区" }, { value: "411403", label: "睢阳区" }, { value: "411421", label: "民权县" }, { value: "411422", label: "睢县" }, { value: "411423", label: "宁陵县" }, { value: "411424", label: "柘城县" }, { value: "411425", label: "虞城县" }, { value: "411426", label: "夏邑县" }, { value: "411481", label: "永城市" }, { value: "411471", label: "豫东综合物流产业聚集区" }, { value: "411472", label: "河南商丘经济开发" }] }, { value: "411500", label: "信阳市", children: [{ value: "411502", label: "浉河区" }, { value: "411503", label: "平桥区" }, { value: "411521", label: "罗山县" }, { value: "411522", label: "光山县" }, { value: "411523", label: "新县" }, { value: "411524", label: "商城县" }, { value: "411525", label: "固始县" }, { value: "411526", label: "潢川县" }, { value: "411527", label: "淮滨县" }, { value: "411528", label: "息县" }, { value: "411571", label: "信阳高新技术产业开发区" }] }, { value: "411600", label: "周口市", children: [{ value: "411602", label: "川汇区" }, { value: "411621", label: "扶沟县" }, { value: "411622", label: "西华县" }, { value: "411623", label: "商水县" }, { value: "411624", label: "沈丘县" }, { value: "411625", label: "郸城县" }, { value: "411626", label: "淮阳县" }, { value: "411627", label: "太康县" }, { value: "411628", label: "鹿邑县" }, { value: "411681", label: "项城市" }, { value: "411671", label: "河南周口经济开发区" }] }, { value: "411700", label: "驻马店市", children: [{ value: "411702", label: "驿城区" }, { value: "411721", label: "西平县" }, { value: "411722", label: "上蔡县" }, { value: "411723", label: "平舆县" }, { value: "411724", label: "正阳县" }, { value: "411725", label: "确山县" }, { value: "411726", label: "泌阳县" }, { value: "411727", label: "汝南县" }, { value: "411628", label: "遂平县" }, { value: "411729", label: "新蔡县" }, { value: "411771", label: "河南驻马店经济开发区" }] }] }, { value: '420000', label: '湖北省', children: [{ value: "420100", label: "武汉市", children: [{ value: "420101", label: "市辖区" }, { value: "420102", label: "江岸区" }, { value: "420103", label: "江汉区" }, { value: "420104", label: "硚口区" }, { value: "420105", label: "汉阳区" }, { value: "420106", label: "武昌区" }, { value: "420107", label: "青山区" }, { value: "420111", label: "洪山区" }, { value: "420112", label: "东西湖区" }, { value: "420113", label: "汉南区" }, { value: "420114", label: "蔡甸区" }, { value: "420115", label: "江夏区" }, { value: "420116", label: "黄陂区" }, { value: "420117", label: "新洲区" }] }, { value: "420200", label: "黄石市", children: [{ value: "420201", label: "市辖区" }, { value: "420202", label: "黄石港区" }, { value: "420203", label: "西塞山区" }, { value: "420204", label: "下陆区" }, { value: "420205", label: "铁山区" }, { value: "420222", label: "阳新县" }, { value: "420281", label: "大冶市" }] }, { value: "420300", label: "十堰市", children: [{ value: "420301", label: "市辖区" }, { value: "420302", label: "茅箭区" }, { value: "420303", label: "张湾区" }, { value: "420304", label: "郧阳区" }, { value: "420322", label: "郧西县" }, { value: "420323", label: "竹山县" }, { value: "420324", label: "竹溪县" }, { value: "420325", label: "房县" }, { value: "420381", label: "丹江口市" }] }, { value: "420500", label: "宜昌市", children: [{ value: "420501", label: "市辖区" }, { value: "420502", label: "西陵区" }, { value: "420503", label: "伍家岗区" }, { value: "420504", label: "点军区" }, { value: "420505", label: "猇亭区" }, { value: "420506", label: "夷陵区" }, { value: "420525", label: "远安县" }, { value: "420526", label: "兴山县" }, { value: "420527", label: "秭归县" }, { value: "420528", label: "长阳土家族自治县" }, { value: "420529", label: "五峰土家族自治县" }, { value: "420581", label: "宜都市" }, { value: "420582", label: "当阳市" }, { value: "420583", label: "枝江市" }] }, { value: "420600", label: "襄阳市", children: [{ value: "420601", label: "市辖区" }, { value: "420602", label: "襄城区" }, { value: "420606", label: "樊城区" }, { value: "420607", label: "襄州区" }, { value: "420624", label: "南漳县" }, { value: "420625", label: "谷城县" }, { value: "420626", label: "保康县" }, { value: "420682", label: "老河口市" }, { value: "420683", label: "枣阳市" }, { value: "420684", label: "宜城市" }] }, { value: "420700", label: "鄂州市", children: [{ value: "420701", label: "市辖区" }, { value: "420702", label: "梁子湖区" }, { value: "420703", label: "华容区" }, { value: "420704", label: "鄂城区" }] }, { value: "420800", label: "荆门市", children: [{ value: "420801", label: "市辖区" }, { value: "420802", label: "东宝区" }, { value: "420804", label: "掇刀区" }, { value: "420821", label: "京山县" }, { value: "420822", label: "沙洋县" }, { value: "420881", label: "钟祥市" }] }, { value: "420900", label: "孝感市", children: [{ value: "420901", label: "市辖区" }, { value: "420902", label: "孝南区" }, { value: "420921", label: "孝昌县" }, { value: "420922", label: "大悟县" }, { value: "420923", label: "云梦县" }, { value: "420981", label: "应城市" }, { value: "420982", label: "安陆市" }, { value: "420984", label: "汉川市" }] }, { value: "421000", label: "荆州市", children: [{ value: "421001", label: "市辖区" }, { value: "421002", label: "沙市区" }, { value: "421003", label: "荆州区" }, { value: "421022", label: "公安县" }, { value: "421023", label: "监利县" }, { value: "421024", label: "江陵县" }, { value: "421071", label: "荆州经济技术开发区" }, { value: "421081", label: "石首市" }, { value: "421083", label: "洪湖市" }, { value: "421087", label: "松滋市" }] }, { value: "421100", label: "黄冈市", children: [{ value: "421101", label: "市辖区" }, { value: "421102", label: "黄州区" }, { value: "421121", label: "团风县" }, { value: "421122", label: "红安县" }, { value: "421123", label: "罗田县" }, { value: "421124", label: "英山县" }, { value: "421125", label: "浠水县" }, { value: "421126", label: "蕲春县" }, { value: "421127", label: "黄梅县" }, { value: "421171", label: "龙感湖管理区" }, { value: "421181", label: "麻城市" }, { value: "421182", label: "武穴市" }] }, { value: "421200", label: "咸宁市", children: [{ value: "421201", label: "市辖区" }, { value: "421202", label: "咸安区" }, { value: "421221", label: "嘉鱼县" }, { value: "421222", label: "通城县" }, { value: "421223", label: "崇阳县" }, { value: "421224", label: "通山县" }, { value: "421281", label: "赤壁市" }] }, { value: "421300", label: "随州市", children: [{ value: "421301", label: "市辖区" }, { value: "421303", label: "曾都区" }, { value: "421321", label: "随县" }, { value: "421381", label: "广水市" }] }, { value: "422800", label: "恩施土家族苗族自治州", children: [{ value: "422801", label: "恩施市" }, { value: "422802", label: "利川市" }, { value: "422822", label: "建始县" }, { value: "422823", label: "巴东县" }, { value: "422825", label: "宣恩县" }, { value: "422826", label: "咸丰县" }, { value: "422827", label: "来凤县" }, { value: "422828", label: "鹤峰县" }] }, { value: "429000", label: "省直辖县级行政区划", children: [{ value: "429004", label: "仙桃市" }, { value: "429005", label: "潜江市" }, { value: "429006", label: "天门市" }, { value: "429021", label: "神农架林区" }] }] }, { value: '430000', label: '湖南省', children: [{ value: "430100", label: "长沙市", children: [{ value: "430101", label: "市辖区" }, { value: "430102", label: "芙蓉区" }, { value: "430103", label: "天心区" }, { value: "430104", label: "岳麓区" }, { value: "430105", label: "开福区" }, { value: "430111", label: "雨花区" }, { value: "430112", label: "望城区" }, { value: "430121", label: "长沙县" }, { value: "430181", label: "浏阳市" }, { value: "430182", label: "宁乡市" }] }, { value: "430200", label: "株洲市", children: [{ value: "430201", label: "市辖区" }, { value: "430202", label: "荷塘区" }, { value: "430203", label: "芦淞区" }, { value: "430204", label: "石峰区" }, { value: "430211", label: "天元区" }, { value: "430221", label: "株洲县" }, { value: "430223", label: "攸县" }, { value: "430224", label: "茶陵县" }, { value: "430225", label: "炎陵县" }, { value: "430271", label: "云龙示范区" }, { value: "430281", label: "醴陵市" }] }, { value: "430300", label: "湘潭市", children: [{ value: "430301", label: "市辖区" }, { value: "430302", label: "雨湖区" }, { value: "430304", label: "岳塘区" }, { value: "430321", label: "湘潭县" }, { value: "430371", label: "湖南湘潭高新技术产业园区" }, { value: "430372", label: "湘潭昭山示范区" }, { value: "430373", label: "湘潭九华示范区" }, { value: "430381", label: "湘乡市" }, { value: "430382", label: "韶山市" }] }, { value: "430400", label: "衡阳市", children: [{ value: "430401", label: "市辖区" }, { value: "430405", label: "珠晖区" }, { value: "430406", label: "雁峰区" }, { value: "430407", label: "石鼓区" }, { value: "430408", label: "蒸湘区" }, { value: "430412", label: "南岳区" }, { value: "430421", label: "衡阳县" }, { value: "430422", label: "衡南县" }, { value: "430423", label: "衡山县" }, { value: "430424", label: "衡东县" }, { value: "430426", label: "祁东县" }, { value: "430471", label: "衡阳综合保税区" }, { value: "430472", label: "湖南衡阳高新技术产业园区" }, { value: "430473", label: "湖南衡阳松木经济开发区" }, { value: "430481", label: "耒阳市" }, { value: "430482", label: "常宁市" }] }, { value: "430500", label: "邵阳市", children: [{ value: "430501", label: "市辖区" }, { value: "430502", label: "双清区" }, { value: "430503", label: "大祥区" }, { value: "430511", label: "北塔区" }, { value: "430521", label: "邵东县" }, { value: "430522", label: "新邵县" }, { value: "430523", label: "邵阳县" }, { value: "430524", label: "隆回县" }, { value: "430525", label: "洞口县" }, { value: "430527", label: "绥宁县" }, { value: "430528", label: "新宁县" }, { value: "430529", label: "城步苗族自治县" }, { value: "430581", label: "武冈市" }] }, { value: "430600", label: "岳阳市", children: [{ value: "430601", label: "市辖区" }, { value: "430602", label: "岳阳楼区" }, { value: "430603", label: "云溪区" }, { value: "430611", label: "君山区" }, { value: "430621", label: "岳阳县" }, { value: "430623", label: "华容县" }, { value: "430624", label: "湘阴县" }, { value: "430626", label: "平江县" }, { value: "430671", label: "岳阳市屈原管理区" }, { value: "430681", label: "汨罗市" }, { value: "430682", label: "临湘市" }] }, { value: "430700", label: "常德市", children: [{ value: "430701", label: "市辖区" }, { value: "430702", label: "武陵区" }, { value: "430703", label: "鼎城区" }, { value: "430721", label: "安乡县" }, { value: "430722", label: "汉寿县" }, { value: "430723", label: "澧县" }, { value: "430724", label: "临澧县" }, { value: "430725", label: "桃源县" }, { value: "430726", label: "石门县" }, { value: "430771", label: "常德市西洞庭管理区" }, { value: "430781", label: "津市市" }] }, { value: "430800", label: "张家界市", children: [{ value: "430801", label: "市辖区" }, { value: "430802", label: "永定区" }, { value: "430811", label: "武陵源区" }, { value: "430821", label: "慈利县" }, { value: "430822", label: "桑植县" }] }, { value: "430900", label: "益阳市", children: [{ value: "430901", label: "市辖区" }, { value: "430902", label: "资阳区" }, { value: "430903", label: "赫山区" }, { value: "430921", label: "南县" }, { value: "430922", label: "桃江县" }, { value: "430923", label: "安化县" }, { value: "430971", label: "益阳市大通湖管理区" }, { value: "430972", label: "湖南益阳高新技术产业园区" }, { value: "430981", label: "沅江市" }] }, { value: "431000", label: "郴州市", children: [{ value: "431001", label: "市辖区" }, { value: "431002", label: "北湖区" }, { value: "431003", label: "苏仙区" }, { value: "431021", label: "桂阳县" }, { value: "431022", label: "宜章县" }, { value: "431023", label: "永兴县" }, { value: "431024", label: "嘉禾县" }, { value: "431025", label: "临武县" }, { value: "431026", label: "汝城县" }, { value: "431027", label: "桂东县" }, { value: "431028", label: "安仁县" }, { value: "431081", label: "资兴市" }] }, { value: "431100", label: "永州市", children: [{ value: "431101", label: "市辖区" }, { value: "431102", label: "零陵区" }, { value: "431103", label: "冷水滩区" }, { value: "431121", label: "祁阳县" }, { value: "431122", label: "东安县" }, { value: "431123", label: "双牌县" }, { value: "431124", label: "道县" }, { value: "431125", label: "江永县" }, { value: "431126", label: "宁远县" }, { value: "431127", label: "蓝山县" }, { value: "431128", label: "新田县" }, { value: "431129", label: "江华瑶族自治县" }, { value: "431171", label: "永州经济技术开发区" }, { value: "431172", label: "永州市金洞管理区" }, { value: "431173", label: "永州市回龙圩管理区" }] }, { value: "431200", label: "怀化市", children: [{ value: "431201", label: "市辖区" }, { value: "431202", label: "鹤城区" }, { value: "431221", label: "中方县" }, { value: "431222", label: "沅陵县" }, { value: "431223", label: "辰溪县" }, { value: "431224", label: "溆浦县" }, { value: "431225", label: "会同县" }, { value: "431226", label: "麻阳苗族自治县" }, { value: "431227", label: "新晃侗族自治县" }, { value: "431228", label: "芷江侗族自治县" }, { value: "431229", label: "靖州苗族侗族自治县" }, { value: "431230", label: "通道侗族自治县" }, { value: "431271", label: "怀化市洪江管理区" }, { value: "431281", label: "洪江市" }] }, { value: "431300", label: "娄底市", children: [{ value: "431301", label: "市辖区" }, { value: "431302", label: "娄星区" }, { value: "431321", label: "双峰县" }, { value: "431322", label: "新化县" }, { value: "431381", label: "冷水江市" }, { value: "431382", label: "涟源市" }] }, { value: "433100", label: "湘西土家族苗族自治州", children: [{ value: "433101", label: "吉首市" }, { value: "433122", label: "泸溪县" }, { value: "433123", label: "凤凰县" }, { value: "433124", label: "花垣县" }, { value: "433125", label: "保靖县" }, { value: "433126", label: "古丈县" }, { value: "433127", label: "永顺县" }, { value: "433130", label: "龙山县" }, { value: "433172", label: "湖南吉首经济开发区" }, { value: "433173", label: "湖南永顺经济开发区" }] }] }, { value: '440000', label: '广东省', children: [{ value: "440100", label: "广州市", children: [{ value: "440101", label: "市辖区" }, { value: "440103", label: "荔湾区" }, { value: "440104", label: "越秀区" }, { value: "440105", label: "海珠区" }, { value: "440106", label: "天河区" }, { value: "440111", label: "白云区" }, { value: "440112", label: "黄埔区" }, { value: "440113", label: "番禺区" }, { value: "440114", label: "花都区" }, { value: "440115", label: "南沙区" }, { value: "440117", label: "从化区" }, { value: "440118", label: "增城区" }] }, { value: "440200", label: "韶关市", children: [{ value: "440201", label: "市辖区" }, { value: "440203", label: "武江区" }, { value: "440204", label: "浈江区" }, { value: "440205", label: "曲江区" }, { value: "440222", label: "始兴县" }, { value: "440224", label: "仁化县" }, { value: "440229", label: "翁源县" }, { value: "440232", label: "乳源瑶族自治县" }, { value: "440233", label: "新丰县" }, { value: "440281", label: "乐昌市" }, { value: "440282", label: "南雄市" }] }, { value: "440300", label: "深圳市", children: [{ value: "440301", label: "市辖区" }, { value: "440303", label: "罗湖区" }, { value: "440304", label: "福田区" }, { value: "440305", label: "南山区" }, { value: "440306", label: "宝安区" }, { value: "440307", label: "龙岗区" }, { value: "440308", label: "盐田区" }, { value: "440309", label: "龙华区" }, { value: "440310", label: "坪山区" }] }, { value: "440400", label: "珠海市", children: [{ value: "440401", label: "市辖区" }, { value: "440402", label: "香洲区" }, { value: "440403", label: "斗门区" }, { value: "440404", label: "金湾区" }] }, { value: "440500", label: "汕头市", children: [{ value: "440501", label: "市辖区" }, { value: "440507", label: "龙湖区" }, { value: "440511", label: "金平区" }, { value: "440512", label: "濠江区" }, { value: "440513", label: "潮阳区" }, { value: "440514", label: "潮南区" }, { value: "440515", label: "澄海区" }, { value: "440523", label: "南澳县" }] }, { value: "440600", label: "佛山市", children: [{ value: "440601", label: "市辖区" }, { value: "440604", label: "禅城区" }, { value: "440605", label: "南海区" }, { value: "440606", label: "顺德区" }, { value: "440607", label: "三水区" }, { value: "440608", label: "高明区" }] }, { value: "440700", label: "江门市", children: [{ value: "440701", label: "市辖区" }, { value: "440703", label: "蓬江区" }, { value: "440704", label: "江海区" }, { value: "440705", label: "新会区" }, { value: "440781", label: "台山市" }, { value: "440783", label: "开平市" }, { value: "440784", label: "鹤山市" }, { value: "440785", label: "恩平市" }] }, { value: "440800", label: "湛江市", children: [{ value: "440801", label: "市辖区" }, { value: "440802", label: "赤坎区" }, { value: "440803", label: "霞山区" }, { value: "440804", label: "坡头区" }, { value: "440811", label: "麻章区" }, { value: "440823", label: "遂溪县" }, { value: "440825", label: "徐闻县" }, { value: "440881", label: "廉江市" }, { value: "440882", label: "雷州市" }, { value: "440883", label: "吴川市" }] }, { value: "440900", label: "茂名市", children: [{ value: "440901", label: "市辖区" }, { value: "440902", label: "茂南区" }, { value: "440904", label: "电白区" }, { value: "440981", label: "高州市" }, { value: "440982", label: "化州市" }, { value: "440983", label: "信宜市" }] }, { value: "441200", label: "肇庆市", children: [{ value: "441201", label: "市辖区" }, { value: "441202", label: "端州区" }, { value: "441203", label: "鼎湖区" }, { value: "441204", label: "高要区" }, { value: "441223", label: "广宁县" }, { value: "441224", label: "怀集县" }, { value: "441225", label: "封开县" }, { value: "441226", label: "德庆县" }, { value: "441284", label: "四会市" }] }, { value: "441300", label: "惠州市", children: [{ value: "441301", label: "市辖区" }, { value: "441302", label: "惠城区" }, { value: "441303", label: "惠阳区" }, { value: "441322", label: "博罗县" }, { value: "441323", label: "惠东县" }, { value: "441324", label: "龙门县" }] }, { value: "441400", label: "梅州市", children: [{ value: "441401", label: "市辖区" }, { value: "441402", label: "梅江区" }, { value: "441403", label: "梅县区" }, { value: "441422", label: "大埔县" }, { value: "441423", label: "丰顺县" }, { value: "441424", label: "五华县" }, { value: "441426", label: "平远县" }, { value: "441427", label: "蕉岭县" }, { value: "441481", label: "兴宁市" }] }, { value: "441500", label: "汕尾市", children: [{ value: "441501", label: "市辖区" }, { value: "441502", label: "城区" }, { value: "441521", label: "海丰县" }, { value: "441523", label: "陆河县" }, { value: "441581", label: "陆丰市" }] }, { value: "441600", label: "河源市", children: [{ value: "441601", label: "市辖区" }, { value: "441602", label: "源城区" }, { value: "441621", label: "紫金县" }, { value: "441622", label: "龙川县" }, { value: "441623", label: "连平县" }, { value: "441624", label: "和平县" }, { value: "441625", label: "东源县" }] }, { value: "441700", label: "阳江市", children: [{ value: "441701", label: "市辖区" }, { value: "441702", label: "江城区" }, { value: "441704", label: "阳东区" }, { value: "441721", label: "阳西县" }, { value: "441781", label: "阳春市" }] }, { value: "441800", label: "清远市", children: [{ value: "441801", label: "市辖区" }, { value: "441802", label: "清城区" }, { value: "441803", label: "清新区" }, { value: "441821", label: "佛冈县" }, { value: "441823", label: "阳山县" }, { value: "441825", label: "连山壮族瑶族自治县" }, { value: "441826", label: "连南瑶族自治县" }, { value: "441881", label: "英德市" }, { value: "441882", label: "连州市" }] }, { value: "441900", label: "东莞市" }, { value: "442000", label: "中山市" }, { value: "445100", label: "潮州市", children: [{ value: "445101", label: "市辖区" }, { value: "445102", label: "湘桥区" }, { value: "445103", label: "潮安区" }, { value: "445122", label: "饶平县" }] }, { value: "445200", label: "揭阳市", children: [{ value: "445201", label: "市辖区" }, { value: "445202", label: "榕城区" }, { value: "445203", label: "揭东区" }, { value: "445222", label: "揭西县" }, { value: "445224", label: "惠来县" }, { value: "445281", label: "普宁市" }] }, { value: "445300", label: "云浮市", children: [{ value: "445301", label: "市辖区" }, { value: "445302", label: "云城区" }, { value: "445303", label: "云安区" }, { value: "445321", label: "新兴县" }, { value: "445322", label: "郁南县" }, { value: "445381", label: "罗定市" }] }] }, { value: '450000', label: '广西壮族', children: [{ value: "450100", label: "南宁市", children: [{ value: "450101", label: "市辖区" }, { value: "450102", label: "兴宁区" }, { value: "450103", label: "青秀区" }, { value: "450105", label: "江南区" }, { value: "450107", label: "西乡塘区" }, { value: "450108", label: "良庆区" }, { value: "450109", label: "邕宁区" }, { value: "450110", label: "武鸣区" }, { value: "450123", label: "隆安县" }, { value: "450124", label: "马山县" }, { value: "450125", label: "上林县" }, { value: "450126", label: "宾阳县" }, { value: "450127", label: "横县" }] }, { value: "450200", label: "柳州市", children: [{ value: "450201", label: "市辖区" }, { value: "450202", label: "城中区" }, { value: "450203", label: "鱼峰区" }, { value: "450204", label: "柳南区" }, { value: "450205", label: "柳北区" }, { value: "450206", label: "柳江区" }, { value: "450222", label: "柳城县" }, { value: "450223", label: "鹿寨县" }, { value: "450224", label: "融安县" }, { value: "450225", label: "融水苗族自治县" }, { value: "450226", label: "三江侗族自治县" }] }, { value: "450300", label: "桂林市", children: [{ value: "450301", label: "市辖区" }, { value: "450302", label: "秀峰区" }, { value: "450303", label: "叠彩区" }, { value: "450304", label: "象山区" }, { value: "450305", label: "七星区" }, { value: "450311", label: "雁山区" }, { value: "450312", label: "临桂区" }, { value: "450321", label: "阳朔县" }, { value: "450323", label: "灵川县" }, { value: "450324", label: "全州县" }, { value: "450325", label: "兴安县" }, { value: "450326", label: "永福县" }, { value: "450327", label: "灌阳县" }, { value: "450328", label: "龙胜各族自治县" }, { value: "450329", label: "资源县" }, { value: "450330", label: "平乐县" }, { value: "450331", label: "荔浦县" }, { value: "450332", label: "恭城瑶族自治县" }] }, { value: "450400", label: "梧州市", children: [{ value: "450401", label: "市辖区" }, { value: "450403", label: "万秀区" }, { value: "450405", label: "长洲区" }, { value: "450406", label: "龙圩区" }, { value: "450421", label: "苍梧县" }, { value: "450422", label: "藤县" }, { value: "450423", label: "蒙山县" }, { value: "450481", label: "岑溪市" }] }, { value: "450500", label: "北海市", children: [{ value: "450501", label: "市辖区" }, { value: "450502", label: "海城区" }, { value: "450503", label: "银海区" }, { value: "450512", label: "铁山港区" }, { value: "450521", label: "合浦县" }] }, { value: "450600", label: "防城港市", children: [{ value: "450601", label: "市辖区" }, { value: "450602", label: "港口区" }, { value: "450603", label: "防城区" }, { value: "450621", label: "上思县" }, { value: "450681", label: "东兴市" }] }, { value: "450700", label: "钦州市", children: [{ value: "450701", label: "市辖区" }, { value: "450702", label: "钦南区" }, { value: "450703", label: "钦北区" }, { value: "450721", label: "灵山县" }, { value: "450722", label: "浦北县" }] }, { value: "450800", label: "贵港市", children: [{ value: "450801", label: "市辖区" }, { value: "450802", label: "港北区" }, { value: "450803", label: "港南区" }, { value: "450804", label: "覃塘区" }, { value: "450821", label: "平南县" }, { value: "450881", label: "桂平市" }] }, { value: "450900", label: "玉林市", children: [{ value: "450901", label: "市辖区" }, { value: "450902", label: "玉州区" }, { value: "450903", label: "福绵区" }, { value: "450921", label: "容县" }, { value: "450922", label: "陆川县" }, { value: "450923", label: "博白县" }, { value: "450924", label: "兴业县" }, { value: "450981", label: "北流市" }] }, { value: "451000", label: "百色市", children: [{ value: "451001", label: "市辖区" }, { value: "451002", label: "右江区" }, { value: "451021", label: "田阳县" }, { value: "451022", label: "田东县" }, { value: "451023", label: "平果县" }, { value: "451024", label: "德保县" }, { value: "451026", label: "那坡县" }, { value: "451027", label: "凌云县" }, { value: "451028", label: "乐业县" }, { value: "451029", label: "田林县" }, { value: "451030", label: "西林县" }, { value: "451031", label: "隆林各族自治县" }, { value: "451081", label: "靖西市" }] }, { value: "451100", label: "贺州市", children: [{ value: "451101", label: "市辖区" }, { value: "451102", label: "八步区" }, { value: "451103", label: "平桂区" }, { value: "451121", label: "昭平县" }, { value: "451122", label: "钟山县" }, { value: "451123", label: "富川瑶族自治县" }] }, { value: "451200", label: "河池市", children: [{ value: "451201", label: "市辖区" }, { value: "451202", label: "金城江区" }, { value: "451203", label: "宜州区" }, { value: "451221", label: "南丹县" }, { value: "451222", label: "天峨县" }, { value: "451223", label: "凤山县" }, { value: "451224", label: "东兰县" }, { value: "451225", label: "罗城仫佬族自治县" }, { value: "451226", label: "环江毛南族自治县" }, { value: "451227", label: "巴马瑶族自治县" }, { value: "451228", label: "都安瑶族自治县" }, { value: "451229", label: "大化瑶族自治县" }] }, { value: "451300", label: "来宾市", children: [{ value: "451301", label: "市辖区" }, { value: "451302", label: "兴宾区" }, { value: "451321", label: "忻城县" }, { value: "451322", label: "象州县" }, { value: "451323", label: "武宣县" }, { value: "451324", label: "金秀瑶族自治县" }, { value: "451381", label: "合山市" }] }, { value: "451400", label: "崇左市", children: [{ value: "451401", label: "市辖区" }, { value: "451402", label: "江州区" }, { value: "451421", label: "扶绥县" }, { value: "451422", label: "宁明县" }, { value: "451423", label: "龙州县" }, { value: "451424", label: "大新县" }, { value: "451425", label: "天等县" }, { value: "451481", label: "凭祥市" }] }] }, { value: '460000', label: '海南省', children: [{ value: "460100", label: "海口市", children: [{ value: "460101", label: "市辖区" }, { value: "460105", label: "秀英区" }, { value: "460106", label: "龙华区" }, { value: "460107", label: "琼山区" }, { value: "460108", label: "美兰区" }] }, { value: "460200", label: "三亚市", children: [{ value: "460201", label: "市辖区" }, { value: "460202", label: "海棠区" }, { value: "460203", label: "吉阳区" }, { value: "460204", label: "天涯区" }, { value: "460205", label: "崖州区" }] }, { value: "460300", label: "三沙市", children: [{ value: "460321", label: "西沙群岛" }, { value: "460322", label: "南沙群岛" }, { value: "460323", label: "中沙群岛的岛礁及其海域" }] }, { value: "460400", label: "儋州市" }, { value: "469000", label: "省直辖县级行政区划", children: [{ value: "469001", label: "五指山市" }, { value: "469002", label: "琼海市" }, { value: "469005", label: "文昌市" }, { value: "469006", label: "万宁市" }, { value: "469007", label: "东方市" }, { value: "469021", label: "定安县" }, { value: "469022", label: "屯昌县" }, { value: "469023", label: "澄迈县" }, { value: "469024", label: "临高县" }, { value: "469025", label: "白沙黎族自治县" }, { value: "469026", label: "昌江黎族自治县" }, { value: "469027", label: "乐东黎族自治县" }, { value: "469028", label: "陵水黎族自治县" }, { value: "469029", label: "保亭黎族苗族自治县" }, { value: "469030", label: "琼中黎族苗族自治县" }] }] }, { value: '500000', label: '重庆', children: [{ value: "500100", label: "市辖区", children: [{ value: "500101", label: "万州区" }, { value: "500102", label: "涪陵区" }, { value: "500103", label: "渝中区" }, { value: "500104", label: "大渡口区" }, { value: "500105", label: "江北区" }, { value: "500106", label: "沙坪坝区" }, { value: "500107", label: "九龙坡区" }, { value: "500108", label: "南岸区" }, { value: "500109", label: "北碚区" }, { value: "500110", label: "綦江区" }, { value: "500111", label: "大足区" }, { value: "500112", label: "渝北区" }, { value: "500113", label: "巴南区" }, { value: "500114", label: "黔江区" }, { value: "500115", label: "长寿区" }, { value: "500116", label: "江津区" }, { value: "500117", label: "合川区" }, { value: "500118", label: "永川区" }, { value: "500119", label: "南川区" }, { value: "500120", label: "璧山区" }, { value: "500151", label: "铜梁区" }, { value: "500152", label: "潼南区" }, { value: "500153", label: "荣昌区" }, { value: "500154", label: "开州区" }, { value: "500155", label: "梁平区" }, { value: "500156", label: "武隆区" }] }, { value: "500200", label: "县", children: [{ value: "500229", label: "城口县" }, { value: "500230", label: "丰都县" }, { value: "500231", label: "垫江县" }, { value: "500233", label: "忠县" }, { value: "500235", label: "云阳县" }, { value: "500236", label: "奉节县" }, { value: "500237", label: "巫山县" }, { value: "500238", label: "巫溪县" }, { value: "500240", label: "石柱土家族自治县" }, { value: "500241", label: "秀山土家族苗族自治县" }, { value: "500242", label: "酉阳土家族苗族自治县" }, { value: "500243", label: "彭水苗族土家族自治县" }] }] }, { value: '510000', label: '四川省', children: [{ value: "510100", label: "成都市", children: [{ value: "510101", label: "市辖区" }, { value: "510104", label: "锦江区" }, { value: "510105", label: "青羊区" }, { value: "510106", label: "金牛区" }, { value: "510107", label: "武侯区" }, { value: "510108", label: "成华区" }, { value: "510112", label: "龙泉驿区" }, { value: "510113", label: "青白江区" }, { value: "510114", label: "新都区" }, { value: "510115", label: "温江区" }, { value: "510116", label: "双流区" }, { value: "510117", label: "郫都区" }, { value: "510121", label: "金堂县" }, { value: "510129", label: "大邑县" }, { value: "510131", label: "蒲江县" }, { value: "510132", label: "新津县" }, { value: "510181", label: "都江堰市" }, { value: "510182", label: "彭州市" }, { value: "510183", label: "邛崃市" }, { value: "510184", label: "崇州市" }, { value: "510185", label: "简阳市" }] }, { value: "510300", label: "自贡市", children: [{ value: "510301", label: "市辖区" }, { value: "510302", label: "自流井区" }, { value: "510303", label: "贡井区" }, { value: "510304", label: "大安区" }, { value: "510311", label: "沿滩区" }, { value: "510321", label: "荣县" }, { value: "510322", label: "富顺县" }] }, { value: "510400", label: "攀枝花市", children: [{ value: "510401", label: "市辖区" }, { value: "510402", label: "东区" }, { value: "510403", label: "西区" }, { value: "510411", label: "仁和区" }, { value: "510421", label: "米易县" }, { value: "510422", label: "盐边县" }] }, { value: "510500", label: "泸州市", children: [{ value: "510501", label: "市辖区" }, { value: "510502", label: "江阳区" }, { value: "510503", label: "纳溪区" }, { value: "510504", label: "龙马潭区" }, { value: "510521", label: "泸县" }, { value: "510522", label: "合江县" }, { value: "510524", label: "叙永县" }, { value: "510525", label: "古蔺县" }] }, { value: "510600", label: "德阳市", children: [{ value: "510601", label: "市辖区" }, { value: "510603", label: "旌阳区" }, { value: "510604", label: "罗江区" }, { value: "510623", label: "中江县" }, { value: "510681", label: "广汉市" }, { value: "510682", label: "什邡市" }, { value: "510683", label: "绵竹市" }] }, { value: "510700", label: "绵阳市", children: [{ value: "510701", label: "市辖区" }, { value: "510703", label: "涪城区" }, { value: "510704", label: "游仙区" }, { value: "510705", label: "安州区" }, { value: "510722", label: "三台县" }, { value: "510723", label: "盐亭县" }, { value: "510725", label: "梓潼县" }, { value: "510726", label: "北川羌族自治县" }, { value: "510727", label: "平武县" }, { value: "510781", label: "江油市" }] }, { value: "510800", label: "广元市", children: [{ value: "510801", label: "市辖区" }, { value: "510802", label: "利州区" }, { value: "510811", label: "昭化区" }, { value: "510812", label: "朝天区" }, { value: "510821", label: "旺苍县" }, { value: "510822", label: "青川县" }, { value: "510823", label: "剑阁县" }, { value: "510824", label: "苍溪县" }] }, { value: "510900", label: "遂宁市", children: [{ value: "510901", label: "市辖区" }, { value: "510903", label: "船山区" }, { value: "510904", label: "安居区" }, { value: "510921", label: "蓬溪县" }, { value: "510922", label: "射洪县" }, { value: "510923", label: "大英县" }] }, { value: "511000", label: "内江市", children: [{ value: "511001", label: "市辖区" }, { value: "511002", label: "市中区" }, { value: "511011", label: "东兴区" }, { value: "511024", label: "威远县" }, { value: "511025", label: "资中县" }, { value: "511071", label: "内江经济开发区" }, { value: "511083", label: "隆昌市" }] }, { value: "511100", label: "乐山市", children: [{ value: "511101", label: "市辖区" }, { value: "511102", label: "市中区" }, { value: "511111", label: "沙湾区" }, { value: "511112", label: "五通桥区" }, { value: "511113", label: "金口河区" }, { value: "511123", label: "犍为县" }, { value: "511124", label: "井研县" }, { value: "511126", label: "夹江县" }, { value: "511129", label: "沐川县" }, { value: "511132", label: "峨边彝族自治县" }, { value: "511133", label: "马边彝族自治县" }, { value: "511181", label: "峨眉山市" }] }, { value: "511300", label: "南充市", children: [{ value: "511301", label: "市辖区" }, { value: "511302", label: "顺庆区" }, { value: "511303", label: "高坪区" }, { value: "511304", label: "嘉陵区" }, { value: "511321", label: "南部县" }, { value: "511322", label: "营山县" }, { value: "511323", label: "蓬安县" }, { value: "511324", label: "仪陇县" }, { value: "511325", label: "西充县" }, { value: "511381", label: "阆中市" }] }, { value: "511400", label: "眉山市", children: [{ value: "511401", label: "市辖区" }, { value: "511402", label: "东坡区" }, { value: "511403", label: "彭山区" }, { value: "511421", label: "仁寿县" }, { value: "511423", label: "洪雅县" }, { value: "511424", label: "丹棱县" }, { value: "511425", label: "青神县" }] }, { value: "511500", label: "宜宾市", children: [{ value: "511501", label: "市辖区" }, { value: "511502", label: "翠屏区" }, { value: "511503", label: "南溪区" }, { value: "511521", label: "宜宾县" }, { value: "511523", label: "江安县" }, { value: "511524", label: "长宁县" }, { value: "511525", label: "高县" }, { value: "511526", label: "珙县" }, { value: "511527", label: "筠连县" }, { value: "511528", label: "兴文县" }, { value: "511529", label: "屏山县" }] }, { value: "511600", label: "广安市", children: [{ value: "511601", label: "市辖区" }, { value: "511602", label: "广安区" }, { value: "511603", label: "前锋区" }, { value: "511621", label: "岳池县" }, { value: "511622", label: "武胜县" }, { value: "511623", label: "邻水县" }, { value: "511681", label: "华蓥市" }] }, { value: "511700", label: "达州市", children: [{ value: "511701", label: "市辖区" }, { value: "511702", label: "通川区" }, { value: "511703", label: "达川区" }, { value: "511722", label: "宣汉县" }, { value: "511723", label: "开江县" }, { value: "511724", label: "大竹县" }, { value: "511725", label: "渠县" }, { value: "511771", label: "达州经济开发区" }, { value: "511781", label: "万源市" }] }, { value: "511800", label: "雅安市", children: [{ value: "511801", label: "市辖区" }, { value: "511802", label: "雨城区" }, { value: "511803", label: "名山区" }, { value: "511822", label: "荥经县" }, { value: "511823", label: "汉源县" }, { value: "511824", label: "石棉县" }, { value: "511825", label: "天全县" }, { value: "511826", label: "芦山县" }, { value: "511827", label: "宝兴县" }] }, { value: "511900", label: "巴中市", children: [{ value: "511901", label: "市辖区" }, { value: "511902", label: "巴州区" }, { value: "511903", label: "恩阳区" }, { value: "511921", label: "通江县" }, { value: "511922", label: "南江县" }, { value: "511923", label: "平昌县" }, { value: "511971", label: "巴中经济开发区" }] }, { value: "512000", label: "资阳市", children: [{ value: "512001", label: "市辖区" }, { value: "512002", label: "雁江区" }, { value: "512021", label: "安岳县" }, { value: "512022", label: "乐至县" }] }, { value: "513200", label: "阿坝藏族羌族自治州", children: [{ value: "513201", label: "马尔康市" }, { value: "513221", label: "汶川县" }, { value: "513222", label: "理县" }, { value: "513223", label: "茂县" }, { value: "513224", label: "松潘县" }, { value: "513225", label: "九寨沟县" }, { value: "513226", label: "金川县" }, { value: "513227", label: "小金县" }, { value: "513228", label: "黑水县" }, { value: "513230", label: "壤塘县" }, { value: "513231", label: "阿坝县" }, { value: "513232", label: "若尔盖县" }, { value: "513233", label: "红原县" }] }, { value: "513300", label: "甘孜藏族自治州", children: [{ value: "513301", label: "康定市" }, { value: "513322", label: "泸定县" }, { value: "513323", label: "丹巴县" }, { value: "513324", label: "九龙县" }, { value: "513325", label: "雅江县" }, { value: "513326", label: "道孚县" }, { value: "513327", label: "炉霍县" }, { value: "513328", label: "甘孜县" }, { value: "513329", label: "新龙县" }, { value: "513330", label: "德格县" }, { value: "513331", label: "白玉县" }, { value: "513332", label: "石渠县" }, { value: "513333", label: "色达县" }, { value: "513334", label: "理塘县" }, { value: "513335", label: "巴塘县" }, { value: "513336", label: "乡城县" }, { value: "513337", label: "稻城县" }, { value: "513338", label: "得荣县" }] }, { value: "513400", label: "凉山彝族自治州", children: [{ value: "513401", label: "西昌市" }, { value: "513422", label: "木里藏族自治县" }, { value: "513423", label: "盐源县" }, { value: "513424", label: "德昌县" }, { value: "513425", label: "会理县" }, { value: "513426", label: "会东县" }, { value: "513427", label: "宁南县" }, { value: "513428", label: "普格县" }, { value: "513429", label: "布拖县" }, { value: "513430", label: "金阳县" }, { value: "513431", label: "昭觉县" }, { value: "513432", label: "喜德县" }, { value: "513433", label: "冕宁县" }, { value: "513434", label: "越西县" }, { value: "513435", label: "甘洛县" }, { value: "513436", label: "美姑县" }, { value: "513437", label: "雷波县" }] }] }, { value: '520000', label: '贵州省', children: [{ value: "520100", label: "贵阳市", children: [{ value: "520101", label: "市辖区" }, { value: "520102", label: "南明区" }, { value: "520103", label: "云岩区" }, { value: "520111", label: "花溪区" }, { value: "520112", label: "乌当区" }, { value: "520113", label: "白云区" }, { value: "520115", label: "观山湖区" }, { value: "520121", label: "开阳县" }, { value: "520122", label: "息烽县" }, { value: "520123", label: "修文县" }, { value: "520181", label: "清镇市" }] }, { value: "520200", label: "六盘水市", children: [{ value: "520201", label: "钟山区" }, { value: "520203", label: "六枝特区" }, { value: "520221", label: "水城县" }, { value: "520281", label: "盘州市" }] }, { value: "520300", label: "遵义市", children: [{ value: "520301", label: "市辖区" }, { value: "520302", label: "红花岗区" }, { value: "520303", label: "汇川区" }, { value: "520304", label: "播州区" }, { value: "520322", label: "桐梓县" }, { value: "520323", label: "绥阳县" }, { value: "520324", label: "正安县" }, { value: "520325", label: "道真仡佬族苗族自治县" }, { value: "520326", label: "务川仡佬族苗族自治县" }, { value: "520327", label: "凤冈县" }, { value: "520328", label: "湄潭县" }, { value: "520329", label: "余庆县" }, { value: "520330", label: "习水县" }, { value: "520381", label: "赤水市" }, { value: "520382", label: "仁怀市" }] }, { value: "520400", label: "安顺市", children: [{ value: "520401", label: "市辖区" }, { value: "520402", label: "西秀区" }, { value: "520403", label: "平坝区" }, { value: "520422", label: "普定县" }, { value: "520423", label: "镇宁布依族苗族自治县" }, { value: "520424", label: "关岭布依族苗族自治县" }, { value: "520425", label: "紫云苗族布依族自治县" }] }, { value: "520500", label: "毕节市", children: [{ value: "520501", label: "市辖区" }, { value: "520502", label: "七星关区" }, { value: "520521", label: "大方县" }, { value: "520522", label: "黔西县" }, { value: "520523", label: "金沙县" }, { value: "520524", label: "织金县" }, { value: "520525", label: "纳雍县" }, { value: "520526", label: "威宁彝族回族苗族自治县" }, { value: "520527", label: "赫章县" }] }, { value: "520600", label: "铜仁市", children: [{ value: "520601", label: "市辖区" }, { value: "520602", label: "碧江区" }, { value: "520603", label: "万山区" }, { value: "520621", label: "江口县" }, { value: "520622", label: "玉屏侗族自治县" }, { value: "520623", label: "石阡县" }, { value: "520624", label: "思南县" }, { value: "520625", label: "印江土家族苗族自治县" }, { value: "520626", label: "德江县" }, { value: "520627", label: "沿河土家族自治县" }, { value: "520628", label: "松桃苗族自治县" }] }, { value: "522300", label: "黔西南布依族苗族自治州", children: [{ value: "522301", label: "兴义市" }, { value: "522322", label: "兴仁县" }, { value: "522323", label: "普安县" }, { value: "522324", label: "晴隆县" }, { value: "522325", label: "贞丰县" }, { value: "522326", label: "望谟县" }, { value: "522327", label: "册亨县" }, { value: "522328", label: "安龙县" }] }, { value: "522600", label: "黔东南苗族侗族自治州", children: [{ value: "522601", label: "凯里市" }, { value: "522622", label: "黄平县" }, { value: "522623", label: "施秉县" }, { value: "522624", label: "三穗县" }, { value: "522625", label: "镇远县" }, { value: "522626", label: "岑巩县" }, { value: "522627", label: "天柱县" }, { value: "522628", label: "锦屏县" }, { value: "522629", label: "剑河县" }, { value: "522630", label: "台江县" }, { value: "522631", label: "黎平县" }, { value: "522632", label: "榕江县" }, { value: "522633", label: "从江县" }, { value: "522634", label: "雷山县" }, { value: "522635", label: "麻江县" }, { value: "522636", label: "丹寨县" }] }, { value: "522700", label: "黔南布依族苗族自治州", children: [{ value: "522701", label: "都匀市" }, { value: "522702", label: "福泉市" }, { value: "522722", label: "荔波县" }, { value: "522723", label: "贵定县" }, { value: "522725", label: "瓮安县" }, { value: "522726", label: "独山县" }, { value: "522727", label: "平塘县" }, { value: "522728", label: "罗甸县" }, { value: "522729", label: "长顺县" }, { value: "522730", label: "龙里县" }, { value: "522731", label: "惠水县" }, { value: "522732", label: "三都水族自治县" }] }] }, { value: '530000', label: '云南省', children: [{ value: "530100", label: "昆明市", children: [{ value: "530101", label: "市辖区" }, { value: "530102", label: "五华区" }, { value: "530103", label: "盘龙区" }, { value: "530111", label: "官渡区" }, { value: "530112", label: "西山区" }, { value: "530113", label: "东川区" }, { value: "530114", label: "呈贡区" }, { value: "530115", label: "晋宁区" }, { value: "530124", label: "富民县" }, { value: "530125", label: "宜良县" }, { value: "530126", label: "石林彝族自治县" }, { value: "530127", label: "嵩明县" }, { value: "530128", label: "禄劝彝族苗族自治县" }, { value: "530129", label: "寻甸回族彝族自治县" }, { value: "530181", label: "安宁市" }] }, { value: "530300", label: "曲靖市", children: [{ value: "530301", label: "市辖区" }, { value: "530302", label: "麒麟区" }, { value: "530303", label: "沾益区" }, { value: "530321", label: "马龙县" }, { value: "530322", label: "陆良县" }, { value: "530323", label: "师宗县" }, { value: "530324", label: "罗平县" }, { value: "530325", label: "富源县" }, { value: "530326", label: "会泽县" }, { value: "530381", label: "宣威市" }] }, { value: "530400", label: "玉溪市", children: [{ value: "530401", label: "市辖区" }, { value: "530402", label: "红塔区" }, { value: "530403", label: "江川区" }, { value: "530422", label: "澄江县" }, { value: "530423", label: "通海县" }, { value: "530424", label: "华宁县" }, { value: "530425", label: "易门县" }, { value: "530426", label: "峨山彝族自治县" }, { value: "530427", label: "新平彝族傣族自治县" }, { value: "530428", label: "元江哈尼族彝族傣族自治县" }] }, { value: "530500", label: "保山市", children: [{ value: "530501", label: "市辖区" }, { value: "530502", label: "隆阳区" }, { value: "530521", label: "施甸县" }, { value: "530523", label: "龙陵县" }, { value: "530524", label: "昌宁县" }, { value: "530581", label: "腾冲市" }] }, { value: "530600", label: "昭通市", children: [{ value: "530601", label: "市辖区" }, { value: "530602", label: "昭阳区" }, { value: "530621", label: "鲁甸县" }, { value: "530622", label: "巧家县" }, { value: "530623", label: "盐津县" }, { value: "530624", label: "大关县" }, { value: "530625", label: "永善县" }, { value: "530626", label: "绥江县" }, { value: "530627", label: "镇雄县" }, { value: "530628", label: "彝良县" }, { value: "530629", label: "威信县" }, { value: "530630", label: "水富县" }] }, { value: "530700", label: "丽江市", children: [{ value: "530701", label: "市辖区" }, { value: "530702", label: "古城区" }, { value: "530721", label: "玉龙纳西族自治县" }, { value: "530722", label: "永胜县" }, { value: "530723", label: "华坪县" }, { value: "530724", label: "宁蒗彝族自治县" }] }, { value: "530800", label: "普洱市", children: [{ value: "530801", label: "市辖区" }, { value: "530802", label: "思茅区" }, { value: "530821", label: "宁洱哈尼族彝族自治县" }, { value: "530822", label: "墨江哈尼族自治县" }, { value: "530823", label: "景东彝族自治县" }, { value: "530824", label: "景谷傣族彝族自治县" }, { value: "530825", label: "镇沅彝族哈尼族拉祜族自治县" }, { value: "530826", label: "江城哈尼族彝族自治县" }, { value: "530827", label: "孟连傣族拉祜族佤族自治县" }, { value: "530828", label: "澜沧拉祜族自治县" }, { value: "530829", label: "西盟佤族自治县" }] }, { value: "530900", label: "临沧市", children: [{ value: "530901", label: "市辖区" }, { value: "530902", label: "临翔区" }, { value: "530921", label: "凤庆县" }, { value: "530922", label: "云县" }, { value: "530923", label: "永德县" }, { value: "530924", label: "镇康县" }, { value: "530925", label: "双江拉祜族佤族布朗族傣族自治县" }, { value: "530926", label: "耿马傣族佤族自治县" }, { value: "530927", label: "沧源佤族自治县" }] }, { value: "532300", label: "楚雄彝族自治州", children: [{ value: "532301", label: "楚雄市" }, { value: "532322", label: "双柏县" }, { value: "532323", label: "牟定县" }, { value: "532324", label: "南华县" }, { value: "532325", label: "姚安县" }, { value: "532326", label: "大姚县" }, { value: "532327", label: "永仁县" }, { value: "532328", label: "元谋县" }, { value: "532329", label: "武定县" }, { value: "532331", label: "禄丰县" }] }, { value: "532500", label: "红河哈尼族彝族自治州", children: [{ value: "532501", label: "个旧市" }, { value: "532502", label: "开远市" }, { value: "532503", label: "蒙自市" }, { value: "532504", label: "弥勒市" }, { value: "532523", label: "屏边苗族自治县" }, { value: "532524", label: "建水县" }, { value: "532525", label: "石屏县" }, { value: "532527", label: "泸西县" }, { value: "532528", label: "元阳县" }, { value: "532529", label: "红河县" }, { value: "532530", label: "金平苗族瑶族傣族自治县" }, { value: "532531", label: "绿春县" }, { value: "532532", label: "河口瑶族自治县" }] }, { value: "532600", label: "文山壮族苗族自治州", children: [{ value: "532601", label: "文山市" }, { value: "532622", label: "砚山县" }, { value: "532623", label: "西畴县" }, { value: "532624", label: "麻栗坡县" }, { value: "532625", label: "马关县" }, { value: "532626", label: "丘北县" }, { value: "532627", label: "广南县" }, { value: "532628", label: "富宁县" }] }, { value: "532800", label: "西双版纳傣族自治州", children: [{ value: "532801", label: "景洪市" }, { value: "532822", label: "勐海县" }, { value: "532823", label: "勐腊县" }] }, { value: "532900", label: "大理白族自治州", children: [{ value: "532901", label: "大理市" }, { value: "532922", label: "漾濞彝族自治县" }, { value: "532923", label: "祥云县" }, { value: "532924", label: "宾川县" }, { value: "532925", label: "弥渡县" }, { value: "532926", label: "南涧彝族自治县" }, { value: "532927", label: "巍山彝族回族自治县" }, { value: "532928", label: "永平县" }, { value: "532929", label: "云龙县" }, { value: "532930", label: "洱源县" }, { value: "532931", label: "剑川县" }, { value: "532932", label: "鹤庆县" }] }, { value: "533100", label: "德宏傣族景颇族自治州", children: [{ value: "533102", label: "瑞丽市" }, { value: "533103", label: "芒市" }, { value: "533122", label: "梁河县" }, { value: "533123", label: "盈江县" }, { value: "533124", label: "陇川县" }] }, { value: "533300", label: "怒江傈僳族自治州", children: [{ value: "533301", label: "泸水市" }, { value: "533323", label: "福贡县" }, { value: "533324", label: "贡山独龙族怒族自治县" }, { value: "533325", label: "兰坪白族普米族自治县" }] }, { value: "533400", label: "迪庆藏族自治州", children: [{ value: "533401", label: "香格里拉市" }, { value: "533422", label: "德钦县" }, { value: "533423", label: "维西傈僳族自治县" }] }] }, { value: '540000', label: '西藏', children: [{ value: "540100", label: "拉萨市", children: [{ value: "540101", label: "市辖区" }, { value: "540102", label: "城关区" }, { value: "540103", label: "堆龙德庆区" }, { value: "540121", label: "林周县" }, { value: "540122", label: "当雄县" }, { value: "540123", label: "尼木县" }, { value: "540124", label: "曲水县" }, { value: "540126", label: "达孜县" }, { value: "540127", label: "墨竹工卡县" }, { value: "540171", label: "格尔木藏青工业园区" }, { value: "540172", label: "拉萨经济技术开发区" }, { value: "540173", label: "西藏文化旅游创意园区" }, { value: "540174", label: "达孜工业园区" }] }, { value: "540200", label: "日喀则市", children: [{ value: "540202", label: "桑珠孜区" }, { value: "540221", label: "南木林县" }, { value: "540222", label: "江孜县" }, { value: "540223", label: "定日县" }, { value: "540224", label: "萨迦县" }, { value: "540225", label: "拉孜县" }, { value: "540226", label: "昂仁县" }, { value: "540227", label: "谢通门县" }, { value: "540228", label: "白朗县" }, { value: "540229", label: "仁布县" }, { value: "540230", label: "康马县" }, { value: "540231", label: "定结县" }, { value: "540232", label: "仲巴县" }, { value: "540233", label: "亚东县" }, { value: "540234", label: "吉隆县" }, { value: "540235", label: "聂拉木县" }, { value: "540236", label: "萨嘎县" }, { value: "540237", label: "岗巴县" }] }, { value: "540300", label: "昌都市", children: [{ value: "540302", label: "卡若区" }, { value: "540321", label: "江达县" }, { value: "540322", label: "贡觉县" }, { value: "540323", label: "类乌齐县" }, { value: "540324", label: "丁青县" }, { value: "540325", label: "察雅县" }, { value: "540326", label: "八宿县" }, { value: "540327", label: "左贡县" }, { value: "540328", label: "芒康县" }, { value: "540329", label: "洛隆县" }, { value: "540330", label: "边坝县" }] }, { value: "540400", label: "林芝市", children: [{ value: "540402", label: "巴宜区" }, { value: "540421", label: "工布江达县" }, { value: "540422", label: "米林县" }, { value: "540423", label: "墨脱县" }, { value: "540424", label: "波密县" }, { value: "540425", label: "察隅县" }, { value: "540426", label: "朗县" }] }, { value: "540500", label: "山南市", children: [{ value: "540501", label: "市辖区" }, { value: "540502", label: "乃东区" }, { value: "540521", label: "扎囊县" }, { value: "540522", label: "贡嘎县" }, { value: "540523", label: "桑日县" }, { value: "540524", label: "琼结县" }, { value: "540525", label: "曲松县" }, { value: "540526", label: "措美县" }, { value: "540527", label: "洛扎县" }, { value: "540528", label: "加查县" }, { value: "540529", label: "隆子县" }, { value: "540530", label: "错那县" }, { value: "540531", label: "浪卡子县" }] }, { value: "542400", label: "那曲地区", children: [{ value: "542421", label: "那曲县" }, { value: "542422", label: "嘉黎县" }, { value: "542423", label: "比如县" }, { value: "542424", label: "聂荣县" }, { value: "542425", label: "安多县" }, { value: "542426", label: "申扎县" }, { value: "542427", label: "索县" }, { value: "542428", label: "班戈县" }, { value: "542429", label: "巴青县" }, { value: "542430", label: "尼玛县" }, { value: "542431", label: "双湖县" }] }, { value: "542500", label: "阿里地区", children: [{ value: "542521", label: "普兰县" }, { value: "542522", label: "札达县" }, { value: "542523", label: "噶尔县" }, { value: "542524", label: "日土县" }, { value: "542525", label: "革吉县" }, { value: "542526", label: "改则县" }, { value: "542527", label: "措勤县" }] }] }, { value: '610000', label: '陕西省', children: [{ value: "610100", label: "西安市", children: [{ value: "610101", label: "市辖区" }, { value: "610102", label: "新城区" }, { value: "610103", label: "碑林区" }, { value: "610104", label: "莲湖区" }, { value: "610111", label: "灞桥区" }, { value: "610112", label: "未央区" }, { value: "610113", label: "雁塔区" }, { value: "610114", label: "阎良区" }, { value: "610115", label: "临潼区" }, { value: "610116", label: "长安区" }, { value: "610117", label: "高陵区" }, { value: "610118", label: "鄠邑区" }, { value: "610122", label: "蓝田县" }, { value: "610124", label: "周至县" }] }, { value: "610200", label: "铜川市", children: [{ value: "610201", label: "市辖区" }, { value: "610202", label: "王益区" }, { value: "610203", label: "印台区" }, { value: "610204", label: "耀州区" }, { value: "610222", label: "宜君县" }] }, { value: "610300", label: "宝鸡市", children: [{ value: "610301", label: "市辖区" }, { value: "610302", label: "渭滨区" }, { value: "610303", label: "金台区" }, { value: "610304", label: "陈仓区" }, { value: "610322", label: "凤翔县" }, { value: "610323", label: "岐山县" }, { value: "610324", label: "扶风县" }, { value: "610326", label: "眉县" }, { value: "610327", label: "陇县" }, { value: "610328", label: "千阳县" }, { value: "610329", label: "麟游县" }, { value: "610330", label: "凤县" }, { value: "610331", label: "太白县" }] }, { value: "610400", label: "咸阳市", children: [{ value: "610401", label: "市辖区" }, { value: "610402", label: "秦都区" }, { value: "610403", label: "杨陵区" }, { value: "610404", label: "渭城区" }, { value: "610422", label: "三原县" }, { value: "610423", label: "泾阳县" }, { value: "610424", label: "乾县" }, { value: "610425", label: "礼泉县" }, { value: "610426", label: "永寿县" }, { value: "610427", label: "彬县" }, { value: "610428", label: "长武县" }, { value: "610429", label: "旬邑县" }, { value: "610430", label: "淳化县" }, { value: "610431", label: "武功县" }, { value: "610481", label: "兴平市" }] }, { value: "610500", label: "渭南市", children: [{ value: "610501", label: "市辖区" }, { value: "610502", label: "临渭区" }, { value: "610503", label: "华州区" }, { value: "610522", label: "潼关县" }, { value: "610523", label: "大荔县" }, { value: "610524", label: "合阳县" }, { value: "610525", label: "澄城县" }, { value: "610526", label: "蒲城县" }, { value: "610527", label: "白水县" }, { value: "610528", label: "富平县" }, { value: "610581", label: "韩城市" }, { value: "610582", label: "华阴市" }] }, { value: "610600", label: "延安市", children: [{ value: "610601", label: "市辖区" }, { value: "610602", label: "宝塔区" }, { value: "610603", label: "安塞区" }, { value: "610621", label: "延长县" }, { value: "610622", label: "延川县" }, { value: "610623", label: "子长县" }, { value: "610625", label: "志丹县" }, { value: "610626", label: "吴起县" }, { value: "610627", label: "甘泉县" }, { value: "610628", label: "富县" }, { value: "610629", label: "洛川县" }, { value: "610630", label: "宜川县" }, { value: "610631", label: "黄龙县" }, { value: "610632", label: "黄陵县" }] }, { value: "610700", label: "汉中市", children: [{ value: "610701", label: "市辖区" }, { value: "610702", label: "汉台区" }, { value: "610703", label: "南郑区" }, { value: "610722", label: "城固县" }, { value: "610723", label: "洋县" }, { value: "610724", label: "西乡县" }, { value: "610725", label: "勉县" }, { value: "610726", label: "宁强县" }, { value: "610727", label: "略阳县" }, { value: "610728", label: "镇巴县" }, { value: "610729", label: "留坝县" }, { value: "610730", label: "佛坪县" }] }, { value: "610800", label: "榆林市", children: [{ value: "610801", label: "市辖区" }, { value: "610802", label: "榆阳区" }, { value: "610803", label: "横山区" }, { value: "610822", label: "府谷县" }, { value: "610824", label: "靖边县" }, { value: "610825", label: "定边县" }, { value: "610826", label: "绥德县" }, { value: "610827", label: "米脂县" }, { value: "610828", label: "佳县" }, { value: "610829", label: "吴堡县" }, { value: "610830", label: "清涧县" }, { value: "610831", label: "子洲县" }, { value: "610881", label: "神木市" }] }, { value: "610900", label: "安康市", children: [{ value: "610901", label: "市辖区" }, { value: "610902", label: "汉滨区" }, { value: "610921", label: "汉阴县" }, { value: "610922", label: "石泉县" }, { value: "610923", label: "宁陕县" }, { value: "610924", label: "紫阳县" }, { value: "610925", label: "岚皋县" }, { value: "610926", label: "平利县" }, { value: "610927", label: "镇坪县" }, { value: "610928", label: "旬阳县" }, { value: "610929", label: "白河县" }] }, { value: "611000", label: "商洛市", children: [{ value: "611001", label: "市辖区" }, { value: "611002", label: "商州区" }, { value: "611021", label: "洛南县" }, { value: "611022", label: "丹凤县" }, { value: "611023", label: "商南县" }, { value: "611024", label: "山阳县" }, { value: "611025", label: "镇安县" }, { value: "611026", label: "柞水县" }] }] }, { value: '620000', label: '甘肃省', children: [{ value: "620100", label: "兰州市", children: [{ value: "620101", label: "市辖区" }, { value: "620102", label: "城关区" }, { value: "620103", label: "七里河区" }, { value: "620104", label: "西固区" }, { value: "620105", label: "安宁区" }, { value: "620111", label: "红古区" }, { value: "620121", label: "永登县" }, { value: "620122", label: "皋兰县" }, { value: "620123", label: "榆中县" }, { value: "620171", label: "兰州新区" }] }, { value: "620200", label: "嘉峪关市", children: [{ value: "620201", label: "市辖区" }] }, { value: "620300", label: "金昌市", children: [{ value: "620301", label: "市辖区" }, { value: "620302", label: "金川区" }, { value: "620321", label: "永昌县" }] }, { value: "620400", label: "白银市", children: [{ value: "620401", label: "市辖区" }, { value: "620402", label: "白银区" }, { value: "620403", label: "平川区" }, { value: "620421", label: "靖远县" }, { value: "620422", label: "会宁县" }, { value: "620423", label: "景泰县" }] }, { value: "620500", label: "天水市", children: [{ value: "620501", label: "市辖区" }, { value: "620502", label: "秦州区" }, { value: "620503", label: "麦积区" }, { value: "620521", label: "清水县" }, { value: "620522", label: "秦安县" }, { value: "620523", label: "甘谷县" }, { value: "620524", label: "武山县" }, { value: "620525", label: "张家川回族自治县" }] }, { value: "620600", label: "武威市", children: [{ value: "620601", label: "市辖区" }, { value: "620602", label: "凉州区" }, { value: "620621", label: "民勤县" }, { value: "620622", label: "古浪县" }, { value: "620623", label: "天祝藏族自治县" }] }, { value: "620700", label: "张掖市", children: [{ value: "620701", label: "市辖区" }, { value: "620702", label: "甘州区" }, { value: "620721", label: "肃南裕固族自治县" }, { value: "620722", label: "民乐县" }, { value: "620723", label: "临泽县" }, { value: "620724", label: "高台县" }, { value: "620725", label: "山丹县" }] }, { value: "620800", label: "平凉市", children: [{ value: "620801", label: "市辖区" }, { value: "620802", label: "崆峒区" }, { value: "620821", label: "泾川县" }, { value: "620822", label: "灵台县" }, { value: "620823", label: "崇信县" }, { value: "620824", label: "华亭县" }, { value: "620825", label: "庄浪县" }, { value: "620826", label: "静宁县" }, { value: "620871", label: "平凉工业园区" }] }, { value: "620900", label: "酒泉市", children: [{ value: "620901", label: "市辖区" }, { value: "620902", label: "肃州区" }, { value: "620921", label: "金塔县" }, { value: "620922", label: "瓜州县" }, { value: "620923", label: "肃北蒙古族自治县" }, { value: "620924", label: "阿克塞哈萨克族自治县" }, { value: "620981", label: "玉门市" }, { value: "620982", label: "敦煌市" }] }, { value: "621000", label: "庆阳市", children: [{ value: "621001", label: "市辖区" }, { value: "621002", label: "西峰区" }, { value: "621021", label: "庆城县" }, { value: "621022", label: "环县" }, { value: "621023", label: "华池县" }, { value: "621024", label: "合水县" }, { value: "621025", label: "正宁县" }, { value: "621026", label: "宁县" }, { value: "621027", label: "镇原县" }] }, { value: "621100", label: "定西市", children: [{ value: "621101", label: "市辖区" }, { value: "621102", label: "安定区" }, { value: "621121", label: "通渭县" }, { value: "621122", label: "陇西县" }, { value: "621123", label: "渭源县" }, { value: "621124", label: "临洮县" }, { value: "621125", label: "漳县" }, { value: "621126", label: "岷县" }] }, { value: "621200", label: "陇南市", children: [{ value: "621201", label: "市辖区" }, { value: "621202", label: "武都区" }, { value: "621221", label: "成县" }, { value: "621222", label: "文县" }, { value: "621223", label: "宕昌县" }, { value: "621224", label: "康县" }, { value: "621225", label: "西和县" }, { value: "621226", label: "礼县" }, { value: "621227", label: "徽县" }, { value: "621228", label: "两当县" }] }, { value: "622900", label: "临夏回族自治州", children: [{ value: "622901", label: "临夏市" }, { value: "622921", label: "临夏县" }, { value: "622922", label: "康乐县" }, { value: "622923", label: "永靖县" }, { value: "622924", label: "广河县" }, { value: "622925", label: "和政县" }, { value: "622926", label: "东乡族自治县" }, { value: "622927", label: "积石山保安族东乡族撒拉族自治县" }] }, { value: "623000", label: "甘南藏族自治州", children: [{ value: "623001", label: "合作市" }, { value: "623021", label: "临潭县" }, { value: "623022", label: "卓尼县" }, { value: "623023", label: "舟曲县" }, { value: "623024", label: "迭部县" }, { value: "623025", label: "玛曲县" }, { value: "623026", label: "碌曲县" }, { value: "623027", label: "夏河县" }] }] }, { value: '630000', label: '青海省', children: [{ value: "630100", label: "西宁市", children: [{ value: "630101", label: "市辖区" }, { value: "630102", label: "城东区" }, { value: "630103", label: "城中区" }, { value: "630104", label: "城西区" }, { value: "630105", label: "城北区" }, { value: "630121", label: "大通回族土族自治县" }, { value: "630122", label: "湟中县" }, { value: "630123", label: "湟源县" }] }, { value: "630200", label: "海东市", children: [{ value: "630202", label: "乐都区" }, { value: "630203", label: "平安区" }, { value: "630222", label: "民和回族土族自治县" }, { value: "630223", label: "互助土族自治县" }, { value: "630224", label: "化隆回族自治县" }, { value: "630225", label: "循化撒拉族自治县" }] }, { value: "632200", label: "海北藏族自治州", children: [{ value: "632221", label: "门源回族自治县" }, { value: "632222", label: "祁连县" }, { value: "632223", label: "海晏县" }, { value: "632224", label: "刚察县" }] }, { value: "632300", label: "黄南藏族自治州", children: [{ value: "632321", label: "同仁县" }, { value: "632322", label: "尖扎县" }, { value: "632323", label: "泽库县" }, { value: "632324", label: "河南蒙古族自治县" }] }, { value: "632500", label: "海南藏族自治州", children: [{ value: "632521", label: "共和县" }, { value: "632522", label: "同德县" }, { value: "632523", label: "贵德县" }, { value: "632524", label: "兴海县" }, { value: "632525", label: "贵南县" }] }, { value: "632600", label: "果洛藏族自治州", children: [{ value: "632621", label: "玛沁县" }, { value: "632622", label: "班玛县" }, { value: "632623", label: "甘德县" }, { value: "632624", label: "达日县" }, { value: "632625", label: "久治县" }, { value: "632626", label: "玛多县" }] }, { value: "632700", label: "玉树藏族自治州", children: [{ value: "632701", label: "玉树市" }, { value: "632722", label: "杂多县" }, { value: "632723", label: "称多县" }, { value: "632724", label: "治多县" }, { value: "632725", label: "囊谦县" }, { value: "632726", label: "曲麻莱县" }] }, { value: "632800", label: "海西蒙古族藏族自治州", children: [{ value: "632801", label: "格尔木市" }, { value: "632802", label: "德令哈市" }, { value: "632821", label: "乌兰县" }, { value: "632822", label: "都兰县" }, { value: "632823", label: "天峻县" }, { value: "632857", label: "大柴旦行政委员会" }, { value: "632858", label: "冷湖行政委员会" }, { value: "632859", label: "茫崖行政委员会" }] }] }, { value: '640000', label: '宁夏', children: [{ value: "640100", label: "银川市", children: [{ value: "640101", label: "市辖区" }, { value: "640104", label: "兴庆区" }, { value: "640105", label: "西夏区" }, { value: "640106", label: "金凤区" }, { value: "640121", label: "永宁县" }, { value: "640122", label: "贺兰县" }, { value: "640181", label: "灵武市" }] }, { value: "640200", label: "石嘴山市", children: [{ value: "640201", label: "市辖区" }, { value: "640202", label: "大武口区" }, { value: "640205", label: "惠农区" }, { value: "640221", label: "平罗县" }] }, { value: "640300", label: "吴忠市", children: [{ value: "640301", label: "市辖区" }, { value: "640302", label: "利通区" }, { value: "640303", label: "红寺堡区" }, { value: "640323", label: "盐池县" }, { value: "640324", label: "同心县" }, { value: "640381", label: "青铜峡市" }] }, { value: "640400", label: "固原市", children: [{ value: "640401", label: "市辖区" }, { value: "640402", label: "原州区" }, { value: "640422", label: "西吉县" }, { value: "640423", label: "隆德县" }, { value: "640424", label: "泾源县" }, { value: "640425", label: "彭阳县" }] }, { value: "640500", label: "中卫市", children: [{ value: "640501", label: "市辖区" }, { value: "640502", label: "沙坡头区" }, { value: "640521", label: "中宁县" }, { value: "640522", label: "海原县" }] }] }, { value: '650000', label: '新疆', children: [{ value: "650100", label: "乌鲁木齐市", children: [{ value: "650101", label: "市辖区" }, { value: "650102", label: "天山区" }, { value: "650103", label: "沙依巴克区" }, { value: "650104", label: "新市区" }, { value: "650105", label: "水磨沟区" }, { value: "650106", label: "头屯河区" }, { value: "650107", label: "达坂城区" }, { value: "650109", label: "米东区" }, { value: "650121", label: "乌鲁木齐县" }, { value: "650171", label: "乌鲁木齐经济技术开发区" }, { value: "650172", label: "乌鲁木齐高新技术产业开发区" }] }, { value: "650200", label: "克拉玛依市", children: [{ value: "650201", label: "市辖区" }, { value: "650202", label: "独山子区" }, { value: "650203", label: "克拉玛依区" }, { value: "650204", label: "白碱滩区" }, { value: "650205", label: "乌尔禾区" }] }, { value: "650400", label: "吐鲁番市", children: [{ value: "650402", label: "高昌区" }, { value: "650421", label: "鄯善县" }, { value: "650422", label: "托克逊县" }] }, { value: "650500", label: "哈密市", children: [{ value: "650502", label: "伊州区" }, { value: "650521", label: "巴里坤哈萨克自治县" }, { value: "650522", label: "伊吾县" }] }, { value: "652300", label: "昌吉回族自治州", children: [{ value: "652301", label: "昌吉市" }, { value: "652302", label: "阜康市" }, { value: "652323", label: "呼图壁县" }, { value: "652324", label: "玛纳斯县" }, { value: "652325", label: "奇台县" }, { value: "652327", label: "吉木萨尔县" }, { value: "652328", label: "木垒哈萨克自治县" }] }, { value: "652700", label: "博尔塔拉蒙古自治州", children: [{ value: "652701", label: "博乐市" }, { value: "652702", label: "阿拉山口市" }, { value: "652722", label: "精河县" }, { value: "652723", label: "温泉县" }] }, { value: "652800", label: "巴音郭楞蒙古自治州", children: [{ value: "652801", label: "库尔勒市" }, { value: "652822", label: "轮台县" }, { value: "652823", label: "尉犁县" }, { value: "652824", label: "若羌县" }, { value: "652825", label: "且末县" }, { value: "652826", label: "焉耆回族自治县" }, { value: "652827", label: "和静县" }, { value: "652828", label: "和硕县" }, { value: "652829", label: "博湖县" }, { value: "652871", label: "库尔勒经济技术开发区" }] }, { value: "652900", label: "阿克苏地区", children: [{ value: "652901", label: "阿克苏市" }, { value: "652922", label: "温宿县" }, { value: "652923", label: "库车县" }, { value: "652924", label: "沙雅县" }, { value: "652925", label: "新和县" }, { value: "652926", label: "拜城县" }, { value: "652927", label: "乌什县" }, { value: "652928", label: "阿瓦提县" }, { value: "652929", label: "柯坪县" }] }, { value: "653000", label: "克孜勒苏柯尔克孜自治州", children: [{ value: "653001", label: "阿图什市" }, { value: "653022", label: "阿克陶县" }, { value: "653023", label: "阿合奇县" }, { value: "653024", label: "乌恰县" }] }, { value: "653100", label: "喀什地区", children: [{ value: "653101", label: "喀什市" }, { value: "653121", label: "疏附县" }, { value: "653122", label: "疏勒县" }, { value: "653123", label: "英吉沙县" }, { value: "653124", label: "泽普县" }, { value: "653125", label: "莎车县" }, { value: "653126", label: "叶城县" }, { value: "653127", label: "麦盖提县" }, { value: "653128", label: "岳普湖县" }, { value: "653129", label: "伽师县" }, { value: "653130", label: "巴楚县" }, { value: "653131", label: "塔什库尔干塔吉克自治县" }] }, { value: "653200", label: "和田地区", children: [{ value: "653201", label: "和田市" }, { value: "653221", label: "和田县" }, { value: "653222", label: "墨玉县" }, { value: "653223", label: "皮山县" }, { value: "653224", label: "洛浦县" }, { value: "653225", label: "策勒县" }, { value: "653226", label: "于田县" }, { value: "653227", label: "民丰县" }] }, { value: "654000", label: "伊犁哈萨克自治州", children: [{ value: "654002", label: "伊宁市" }, { value: "654003", label: "奎屯市" }, { value: "654004", label: "霍尔果斯市" }, { value: "654021", label: "伊宁县" }, { value: "654022", label: "察布查尔锡伯自治县" }, { value: "654023", label: "霍城县" }, { value: "654024", label: "巩留县" }, { value: "654025", label: "新源县" }, { value: "654026", label: "昭苏县" }, { value: "654027", label: "特克斯县" }, { value: "654028", label: "尼勒克县" }] }, { value: "654200", label: "塔城地区", children: [{ value: "654201", label: "塔城市" }, { value: "654202", label: "乌苏市" }, { value: "654221", label: "额敏县" }, { value: "654223", label: "沙湾县" }, { value: "654224", label: "托里县" }, { value: "654225", label: "裕民县" }, { value: "654226", label: "和布克赛尔蒙古自治县" }] }, { value: "654300", label: "阿勒泰地区", children: [{ value: "654301", label: "阿勒泰市" }, { value: "654321", label: "布尔津县" }, { value: "654322", label: "富蕴县" }, { value: "654323", label: "福海县" }, { value: "654324", label: "哈巴河县" }, { value: "654325", label: "青河县" }, { value: "654326", label: "吉木乃县" }] }, { value: "659000", label: "自治区直辖县级行政区划", children: [{ value: "659001", label: "石河子市" }, { value: "659002", label: "阿拉尔市" }, { value: "659003", label: "图木舒克市" }, { value: "659004", label: "五家渠市" }, { value: "659006", label: "铁门关市" }] }] }, { value: '660000', label: '台湾省', children: [{ value: "660100", label: "台北市", children: [{ value: "660101", label: "中正区" }, { value: "660102", label: "大同区" }, { value: "660103", label: "中山区" }, { value: "660104", label: "松山区" }, { value: "660105", label: "大安区" }, { value: "660106", label: "万华区" }, { value: "660107", label: "信义区" }, { value: "660108", label: "士林区" }, { value: "660109", label: "北投区" }, { value: "660110", label: "内湖区" }, { value: "660111", label: "南港区" }, { value: "660112", label: "文山区" }] }, { value: "660200", label: "高雄市", children: [{ value: "660201", label: "新兴区" }, { value: "660202", label: "前金区" }, { value: "660203", label: "芩雅区" }, { value: "660204", label: "盐埕区" }, { value: "660205", label: "鼓山区" }, { value: "660206", label: "旗津区" }, { value: "660207", label: "前镇区" }, { value: "660208", label: "三民区" }, { value: "660209", label: "左营区" }, { value: "660210", label: "楠梓区" }, { value: "660211", label: "小港区" }] }, { value: "660300", label: "台南市", children: [{ value: "660301", label: "中西区" }, { value: "660302", label: "东区" }, { value: "660303", label: "南区" }, { value: "660304", label: "北区" }, { value: "660305", label: "安平区" }, { value: "660306", label: "安南区" }] }, { value: "660400", label: "台中市", children: [{ value: "660401", label: "中区" }, { value: "660402", label: "东区" }, { value: "660403", label: "南区" }, { value: "660404", label: "西区" }, { value: "660405", label: "北区" }, { value: "660406", label: "北屯区" }, { value: "660407", label: "西屯区" }, { value: "660408", label: "南屯区" }] }, { value: "660500", label: "金门县", children: [{ value: "660501", label: "金门县" }] }, { value: "660600", label: "南投县", children: [{ value: "660601", label: "南投县" }] }, { value: "660700", label: "基隆市", children: [{ value: "660701", label: "仁爱区" }, { value: "660702", label: "信义区" }, { value: "660703", label: "中正区" }, { value: "660704", label: "中山区" }, { value: "660705", label: "安乐区" }, { value: "660706", label: "暖暖区" }, { value: "660707", label: "七堵区" }] }, { value: "660800", label: "新竹市", children: [{ value: "660801", label: "东区" }, { value: "660802", label: "北区" }, { value: "660803", label: "香山区" }] }, { value: "660900", label: "嘉义市", children: [{ value: "660901", label: "东区" }, { value: "660902", label: "西区" }] }, { value: "661000", label: "新北市", children: [{ value: "661001", label: "新北市" }] }, { value: "661100", label: "宜兰县", children: [{ value: "661100", label: "宜兰县" }] }, { value: "661200", label: "新竹县", children: [{ value: "661201", label: "新竹县" }] }, { value: "661300", label: "桃园县", children: [{ value: "661301", label: "桃园县" }] }, { value: "661400", label: "苗栗县", children: [{ value: "661401", label: "苗栗县" }] }, { value: "661500", label: "彰化县", children: [{ value: "661501", label: "彰化县" }] }, { value: "661600", label: "嘉义县", children: [{ value: "661601", label: "嘉义县" }] }, { value: "661700", label: "云林县", children: [{ value: "661701", label: "云林县" }] }, { value: "661800", label: "屏东县", children: [{ value: "661801", label: "屏东县" }] }, { value: "661900", label: "台东县", children: [{ value: "661901", label: "台东县" }] }, { value: "662000", label: "花莲县", children: [{ value: "662001", label: "花莲县" }] }, { value: "662100", label: "澎湖县", children: [{ value: "662101", label: "澎湖县" }] }] }, { value: '670000', label: '香港', children: [{ value: "670100", label: "香港岛", children: [{ value: "670101", label: "中西区" }, { value: "670102", label: "湾仔区" }, { value: "670103", label: "东区" }, { value: "670104", label: "南区" }] }, { value: "670200", label: "九龙半岛", children: [{ value: "670201", label: "九龙城区" }, { value: "670202", label: "油尖旺区" }, { value: "670203", label: "深水埗区" }, { value: "670204", label: "黄大仙区" }, { value: "670205", label: "观塘区" }] }, { value: "670300", label: "新界", children: [{ value: "670301", label: "北区" }, { value: "670302", label: "大埔区" }, { value: "670303", label: "沙田区" }, { value: "670304", label: "西贡区" }, { value: "670305", label: "元朗区" }, { value: "670306", label: "屯门区" }, { value: "670307", label: "荃湾区" }, { value: "670308", label: "葵青区" }, { value: "670309", label: "离岛区" }] }] }, { value: '680000', label: '澳门', children: [{ value: "680100", label: "澳门半岛", children: [{ value: "680101", label: "花地玛堂区" }, { value: "680102", label: "圣安多尼堂区" }, { value: "680103", label: "大堂区" }, { value: "680104", label: "望德堂区" }, { value: "680105", label: "风顺堂区" }] }, { value: "680200", label: "离岛", children: [{ value: "680201", label: "嘉模堂区" }, { value: "680202", label: "圣方济各堂区" }] }] }];var _default = cityData;exports.default = _default;

/***/ }),

/***/ 42:
/*!*************************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/plateform/che.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 43:
/*!********************************************************************!*\
  !*** E:/前端/uniapp/财富乐/static/images/home/plateform/che_active.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map