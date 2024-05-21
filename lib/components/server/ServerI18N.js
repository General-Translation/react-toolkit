"use strict";
'use server';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ServerI18N;
var React = _interopRequireWildcard(require("react"));
var _generaltranslation = _interopRequireWildcard(require("generaltranslation"));
var _checkPrimitives = require("./js/checkPrimitives");
var _I18NStringResolver2 = _interopRequireDefault(require("./_I18NStringResolver"));
var _renderStrings = require("./js/renderStrings");
var _excluded = ["children", "projectID", "page", "defaultLanguage", "forceUserLanguage", "remoteSource", "gt"];
var _process;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var defaultDriver = new _generaltranslation["default"]();
var defaultProjectID = typeof process !== 'undefined' ? (_process = process) === null || _process === void 0 || (_process = _process.env) === null || _process === void 0 ? void 0 : _process.GT_PROJECT_ID : '';
function ServerI18N(_x) {
  return _ServerI18N.apply(this, arguments);
}
function _ServerI18N() {
  _ServerI18N = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var children, projectID, _ref$page, page, _ref$defaultLanguage, defaultLanguage, _ref$forceUserLanguag, forceUserLanguage, _ref$remoteSource, remoteSource, _ref$gt, gt, metadata, userLanguage, translationRequired, I18NData, response, htmlStrings, traverseChildren, translations, metadataToSend, renderChildren, I18NChildren;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          children = _ref.children, projectID = _ref.projectID, _ref$page = _ref.page, page = _ref$page === void 0 ? 'default' : _ref$page, _ref$defaultLanguage = _ref.defaultLanguage, defaultLanguage = _ref$defaultLanguage === void 0 ? 'en' : _ref$defaultLanguage, _ref$forceUserLanguag = _ref.forceUserLanguage, forceUserLanguage = _ref$forceUserLanguag === void 0 ? '' : _ref$forceUserLanguag, _ref$remoteSource = _ref.remoteSource, remoteSource = _ref$remoteSource === void 0 ? true : _ref$remoteSource, _ref$gt = _ref.gt, gt = _ref$gt === void 0 ? defaultDriver : _ref$gt, metadata = _objectWithoutProperties(_ref, _excluded);
          if (!projectID) projectID = defaultProjectID;
          userLanguage = forceUserLanguage || defaultLanguage;
          translationRequired = projectID && page && (0, _generaltranslation.getLanguageName)(userLanguage) !== (0, _generaltranslation.getLanguageName)(defaultLanguage) ? true : false;
          if (translationRequired) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", /*#__PURE__*/React.createElement(React.Fragment, null, children));
        case 6:
          if (!remoteSource) {
            _context.next = 20;
            break;
          }
          _context.prev = 7;
          _context.next = 10;
          return fetch("https://json.gtx.dev/".concat(projectID, "/").concat(page, "/").concat(userLanguage));
        case 10:
          response = _context.sent;
          _context.next = 13;
          return response.json();
        case 13:
          I18NData = _context.sent;
          _context.next = 20;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](7);
          console.error(_context.t0);
          return _context.abrupt("return", /*#__PURE__*/React.createElement(React.Fragment, null, children));
        case 20:
          if (userLanguage in metadata) {
            I18NData ? metadata[userLanguage] : _objectSpread(_objectSpread({}, I18NData), metadata[userLanguage]);
          }

          // TRAVERSE FOR NEW HTML TO TRANSLATE
          htmlStrings = [];
          traverseChildren = function traverseChildren(child) {
            if ( /*#__PURE__*/React.isValidElement(child)) {
              var type = child.type,
                props = child.props;
              if (!(0, _checkPrimitives.markedForExclude)(type)) {
                if (props.children) {
                  if ((0, _checkPrimitives.markedForI18N)(type)) {
                    return React.Children.forEach(props.children, function (currentChild) {
                      var html = (0, _renderStrings.createChildrenString)(currentChild, new _renderStrings.ComponentNamer());
                      if (!I18NData[html]) {
                        htmlStrings.push(html);
                      }
                      ;
                    });
                  } else {
                    return React.Children.forEach(props.children, function (currentChild) {
                      return traverseChildren(currentChild);
                    });
                  }
                }
              }
            }
          };
          React.Children.forEach(children, function (child) {
            traverseChildren(child); // every child is searched sequentially
          });

          // TRANSLATE MISSING HTML

          if (htmlStrings.length > 0) {
            metadataToSend = {};
            if (metadata.hasOwnProperty('url')) {
              metadataToSend.url = metadata.url;
            }
            console.log(JSON.stringify(_objectSpread({
              projectID: projectID,
              page: page,
              userLanguage: userLanguage,
              defaultLanguage: defaultLanguage,
              content: htmlStrings
            }, metadataToSend)));
            translations = gt.translateHTML(_objectSpread({
              projectID: projectID,
              page: page,
              userLanguage: userLanguage,
              defaultLanguage: defaultLanguage,
              content: htmlStrings
            }, metadataToSend));
          }
          ;

          // RENDERING

          // an example of what the I18NData const could look like
          // (translations is just the latest additions to I18NData, so it looks similar)
          /* 
              {
                  "<p><b>Ron's <i>ill</i></b> mother</p>": [
                      "La madre",
                      {
                          "<b>Ron's <i>ill</i></b>":
                          [
                              {
                                  "<i>ill</i>": [
                                      "enferma"
                                  ]
                              },
                              "de Ron"
                          ]
                      }
                  ]
              }
          */
          renderChildren = function renderChildren(child) {
            if ( /*#__PURE__*/React.isValidElement(child)) {
              var type = child.type,
                props = child.props;
              if ((0, _checkPrimitives.markedForExclude)(type)) {
                return child;
              }
              if (props.children) {
                if ((0, _checkPrimitives.markedForI18N)(type)) {
                  React.Children.forEach(props.children, function (currentChild) {
                    var _I18NData;
                    var html = (0, _renderStrings.createChildrenString)(currentChild, new _renderStrings.ComponentNamer());
                    if ((_I18NData = I18NData) !== null && _I18NData !== void 0 && _I18NData[html]) {
                      var _I18NData2;
                      return (0, _renderStrings.renderStrings)(currentChild, (_I18NData2 = I18NData) === null || _I18NData2 === void 0 ? void 0 : _I18NData2[html]);
                    } else {
                      return /*#__PURE__*/React.createElement(_I18NStringResolver2["default"], {
                        promise: translations,
                        html: html
                      }, currentChild);
                    }
                    ;
                  });
                }
                return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, props), {}, {
                  children: React.Children.toArray(props.children).map(function (currentChild, index) {
                    return /*#__PURE__*/React.createElement(React.Fragment, {
                      key: index
                    }, renderChildren(currentChild));
                  })
                }));
              }
            }
            return child;
          };
          I18NChildren = React.Children.toArray(children).map(function (child, index) {
            return /*#__PURE__*/React.createElement(React.Fragment, {
              key: index
            }, renderChildren(child));
          });
          return _context.abrupt("return", /*#__PURE__*/React.createElement(React.Fragment, null, I18NChildren));
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 16]]);
  }));
  return _ServerI18N.apply(this, arguments);
}
global.React = React;