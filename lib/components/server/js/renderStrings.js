"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderStrings = exports.createChildrenString = exports.ComponentNamer = void 0;
var React = _interopRequireWildcard(require("react"));
var _checkPrimitives = require("./checkPrimitives");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ComponentNamer = exports.ComponentNamer = /*#__PURE__*/function () {
  function ComponentNamer() {
    _classCallCheck(this, ComponentNamer);
    this.counter = 0;
    this.greekLetters = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];
  }
  return _createClass(ComponentNamer, [{
    key: "getNext",
    value: function getNext() {
      var index = this.counter % this.greekLetters.length;
      var letter = this.greekLetters[index];
      this.counter++;
      return letter;
    }
  }]);
}();
var getTagName = function getTagName(child, componentNamer) {
  if (!child) return '';
  var type = child.type,
    props = child.props;
  if (type !== null && type !== void 0 && type.displayName) return type === null || type === void 0 ? void 0 : type.displayName;
  if (type !== null && type !== void 0 && type.name) return type === null || type === void 0 ? void 0 : type.name;
  if (typeof type === 'string') return type;
  if (props !== null && props !== void 0 && props.href) return 'a';
  return componentNamer.getNext();
};
function escapeHTML(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function reverseEscapeHTML(string) {
  return string.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
var createChildrenString = exports.createChildrenString = function createChildrenString(children, componentNamer) {
  return React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      var type = child.type,
        props = child.props;
      var currentChildren = '';
      if ((0, _checkPrimitives.markedForExclude)(type)) {
        return "{variable}";
      } else {
        if (props !== null && props !== void 0 && props.children) {
          Object.entries(props).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            if (key === 'children') {
              currentChildren += createChildrenString(value, componentNamer);
              return '';
            }
          }).join('');
          var tag = getTagName(child, componentNamer);
          return "<".concat(tag, ">").concat(currentChildren, "</").concat(tag, ">");
        }
      }
    } else if (typeof child === 'string') {
      return escapeHTML(child);
    }
  }).join('');
};
var renderStrings = exports.renderStrings = function renderStrings(child, translationArray) {
  if (!translationArray) {
    return child;
  }
  ;
  if (typeof child === 'string') {
    return (translationArray === null || translationArray === void 0 ? void 0 : translationArray[0]) || child;
  }
  if ( /*#__PURE__*/React.isValidElement(child)) {
    var type = child.type,
      props = child.props;
    if ((0, _checkPrimitives.markedForExclude)(type)) {
      return child;
    } else if (props.children) {
      var validChildren = {};
      React.Children.forEach(props.children, function (currentChild) {
        if ( /*#__PURE__*/React.isValidElement(currentChild)) {
          var html = createChildrenString(currentChild, new ComponentNamer());
          validChildren[html] = currentChild;
        }
      });
      if (translationArray && Array.isArray(translationArray) && translationArray.length > 0) {
        return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, props), {}, {
          children: translationArray.map(function (item, index) {
            if (typeof item === 'string') {
              return /*#__PURE__*/React.createElement(React.Fragment, {
                key: index
              }, reverseEscapeHTML(item));
            } else {
              // (typeof item === 'object')
              var key = Object.keys(item)[0]; // only one attribute here
              return /*#__PURE__*/React.createElement(React.Fragment, {
                key: index
              }, renderStrings(validChildren[key], item[key]));
            }
          })
        }));
      } else return child;
    }
  }

  // else
  return child;
};