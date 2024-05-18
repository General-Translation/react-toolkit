"use strict";
'use server';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ServerI18N;
var React = _interopRequireWildcard(require("react"));
var _generaltranslation = _interopRequireWildcard(require("generaltranslation"));
var _I18NStringResolver2 = _interopRequireDefault(require("./_I18NStringResolver"));
var _excluded = ["children", "projectID", "defaultLanguage", "forceUserLanguage", "i18nTags", "excludeTags", "remoteSource", "gt"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
function deepMerge(obj1, obj2) {
  for (var key in obj2) {
    if (obj2[key] instanceof Object && key in obj1) {
      obj1[key] = deepMerge(obj1[key], obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
}
function ServerI18N(_x) {
  return _ServerI18N.apply(this, arguments);
}
function _ServerI18N() {
  _ServerI18N = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var children, _ref$projectID, projectID, _ref$defaultLanguage, defaultLanguage, _ref$forceUserLanguag, forceUserLanguage, _ref$i18nTags, i18nTags, _ref$excludeTags, excludeTags, _ref$remoteSource, remoteSource, _ref$gt, gt, languageJSONs, userLanguage, translationRequired, I18NData, response, createChildrenString, excludeI18N, includeI18N, markedForI18N, newStrings, traverseStrings, traverseI18N, traverseChildren, translations, newTranslations, renderStrings, renderI18N, renderChildren, I18NChildren;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          children = _ref.children, _ref$projectID = _ref.projectID, projectID = _ref$projectID === void 0 ? '' : _ref$projectID, _ref$defaultLanguage = _ref.defaultLanguage, defaultLanguage = _ref$defaultLanguage === void 0 ? 'en' : _ref$defaultLanguage, _ref$forceUserLanguag = _ref.forceUserLanguage, forceUserLanguage = _ref$forceUserLanguag === void 0 ? '' : _ref$forceUserLanguag, _ref$i18nTags = _ref.i18nTags, i18nTags = _ref$i18nTags === void 0 ? ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul'] : _ref$i18nTags, _ref$excludeTags = _ref.excludeTags, excludeTags = _ref$excludeTags === void 0 ? ["ExcludeI18N"] : _ref$excludeTags, _ref$remoteSource = _ref.remoteSource, remoteSource = _ref$remoteSource === void 0 ? true : _ref$remoteSource, _ref$gt = _ref.gt, gt = _ref$gt === void 0 ? defaultDriver : _ref$gt, languageJSONs = _objectWithoutProperties(_ref, _excluded);
          userLanguage = forceUserLanguage || defaultLanguage;
          translationRequired = projectID && (0, _generaltranslation.getLanguageName)(userLanguage) !== (0, _generaltranslation.getLanguageName)(defaultLanguage) ? true : false;
          if (translationRequired) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", /*#__PURE__*/React.createElement(React.Fragment, null, children));
        case 5:
          if (!remoteSource) {
            _context.next = 19;
            break;
          }
          _context.prev = 6;
          _context.next = 9;
          return fetch("https://json.gtx.dev/".concat(projectID, "/").concat(userLanguage));
        case 9:
          response = _context.sent;
          _context.next = 12;
          return response.json();
        case 12:
          I18NData = _context.sent;
          _context.next = 19;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](6);
          console.error(_context.t0);
          return _context.abrupt("return", /*#__PURE__*/React.createElement(React.Fragment, null, children));
        case 19:
          if (userLanguage in languageJSONs) {
            I18NData ? languageJSONs[userLanguage] : _objectSpread(_objectSpread({}, I18NData), languageJSONs[userLanguage]);
          }

          // CREATE HTML STRING FOR IDENTIFICATION
          createChildrenString = function createChildrenString(children) {
            return React.Children.map(children, function (child) {
              if ( /*#__PURE__*/React.isValidElement(child)) {
                var type = child.type,
                  props = child.props;
                var currentChildren = '';
                if (excludeI18N(type)) {
                  return "{variable}";
                } else {
                  Object.entries(props).map(function (_ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2),
                      key = _ref3[0],
                      value = _ref3[1];
                    if (key === 'children') {
                      currentChildren += createChildrenString(value);
                      return '';
                    }
                  }).join('');
                  return "<".concat((type === null || type === void 0 ? void 0 : type.displayName) || (type === null || type === void 0 ? void 0 : type.name) || type, ">").concat(currentChildren, "</").concat((type === null || type === void 0 ? void 0 : type.displayName) || (type === null || type === void 0 ? void 0 : type.name) || type, ">");
                }
              }
              return (child === null || child === void 0 ? void 0 : child.toString()) || '';
            }).join('');
          }; // CHECKS
          excludeI18N = function excludeI18N(type) {
            if (excludeTags.includes(type)) return true;
            if (excludeTags.includes(type === null || type === void 0 ? void 0 : type.name)) return true;else return false;
          };
          includeI18N = function includeI18N(type) {
            if (i18nTags.includes(type)) return true;
            if (i18nTags.includes(type === null || type === void 0 ? void 0 : type.name)) return true;else return false;
          };
          markedForI18N = function markedForI18N(type) {
            return (type === null || type === void 0 ? void 0 : type.name) === 'I18N';
          }; // TRAVERSE FOR NEW TRANSLATIONS
          newStrings = {}; // Go through and collate strings
          traverseStrings = function traverseStrings(child, html) {
            var I18NStrings = I18NData[html];
            if (typeof child === 'string' && !(I18NStrings !== null && I18NStrings !== void 0 && I18NStrings[child])) {
              newStrings[html] = newStrings[html] || [];
              var strings = newStrings[html];
              strings.push(child);
            } else if ( /*#__PURE__*/React.isValidElement(child)) {
              var type = child.type,
                props = child.props;
              if (!excludeI18N(type)) {
                React.Children.forEach(props.children, function (currentChild) {
                  return traverseStrings(currentChild, html);
                });
              }
            }
          }; // Go through I18Ns for matching children
          traverseI18N = function traverseI18N(child) {
            if ( /*#__PURE__*/React.isValidElement(child)) {
              var type = child.type,
                props = child.props;
              if (excludeI18N(type)) {
                return;
              } else if (includeI18N(type)) {
                var html = createChildrenString(child);
                traverseStrings(child, html);
              } else {
                React.Children.forEach(props.children, function (currentChild) {
                  return traverseI18N(currentChild);
                });
              }
            }
          }; // Go through and find I18Ns, ignoring ExcludeI18Ns
          traverseChildren = function traverseChildren(child) {
            if ( /*#__PURE__*/React.isValidElement(child)) {
              var type = child.type,
                props = child.props;
              if (excludeI18N(type)) {
                return;
              } else if (markedForI18N(type)) {
                React.Children.forEach(props.children, function (currentChild) {
                  return traverseI18N(currentChild);
                  /*if (typeof currentChild === 'string') {
                      newStrings[currentChild] = [currentChild];
                  } else {
                      return traverseI18N(currentChild)
                  }*/
                });
              } else {
                React.Children.forEach(props.children, function (currentChild) {
                  return traverseChildren(currentChild);
                });
              }
            }
          };
          traverseChildren(children);

          // TRANSLATE MISSING STRINGS
          translations = I18NData;
          console.log(translations);
          if (Object.keys(newStrings).length > 0) {
            console.log('New translations required!');
            newTranslations = gt.translateHTML({
              projectID: projectID,
              userLanguage: userLanguage,
              defaultLanguage: defaultLanguage,
              content: newStrings
            });
            console.log(newTranslations);
            /*if (typeof newTranslations === 'object') {
               translations = deepMerge(newTranslations, I18NData);
            }*/
          }
          ;

          // RENDER

          // Go through and replace strings
          renderStrings = function renderStrings(child, html) {
            if (typeof child === 'string') {
              var _translations$html, _newStrings$html;
              if (translations !== null && translations !== void 0 && (_translations$html = translations[html]) !== null && _translations$html !== void 0 && _translations$html[child]) {
                return translations[html][child];
              } else if (newStrings !== null && newStrings !== void 0 && (_newStrings$html = newStrings[html]) !== null && _newStrings$html !== void 0 && _newStrings$html.includes(child)) {
                return /*#__PURE__*/React.createElement(_I18NStringResolver2["default"], {
                  html: html,
                  I18NPromise: newTranslations
                }, child);
              } else {
                return child;
              }
            } else if ( /*#__PURE__*/React.isValidElement(child)) {
              var type = child.type,
                props = child.props;
              if (excludeI18N(type)) {
                return child;
              } else {
                if (props.children) {
                  return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, props), {}, {
                    children: React.Children.toArray(props.children).map(function (currentChild) {
                      return renderStrings(currentChild, html);
                    })
                  }));
                } else {
                  return child;
                }
              }
            } else {
              return child;
            }
          }; // Go through and replace in appropriate tags
          renderI18N = function renderI18N(child) {
            if ( /*#__PURE__*/React.isValidElement(child)) {
              var type = child.type,
                props = child.props;
              if (excludeI18N(type)) {
                return child;
              } else if (includeI18N(type)) {
                var html = createChildrenString(child);
                return renderStrings(child, html);
              } else {
                if (props.children) {
                  return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, props), {}, {
                    children: React.Children.toArray(props.children).map(function (currentChild) {
                      return renderI18N(currentChild);
                    })
                  }));
                } else {
                  return child;
                }
              }
            } else {
              return child;
            }
          }; // Go through and find I18Ns, ignoring ExcludeI18Ns
          renderChildren = function renderChildren(child) {
            if ( /*#__PURE__*/React.isValidElement(child)) {
              var type = child.type,
                props = child.props;
              if (excludeI18N(type)) {
                return child;
              } else if (markedForI18N(type)) {
                return renderI18N(child);
              } else {
                if (props.children) {
                  return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, props), {}, {
                    children: React.Children.toArray(props.children).map(function (currentChild) {
                      return renderChildren(currentChild);
                    })
                  }));
                } else {
                  return child;
                }
              }
            } else {
              return child;
            }
          };
          I18NChildren = renderChildren(children);
          return _context.abrupt("return", /*#__PURE__*/React.createElement(React.Fragment, null, I18NChildren));
        case 38:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[6, 15]]);
  }));
  return _ServerI18N.apply(this, arguments);
}
global.React = React;