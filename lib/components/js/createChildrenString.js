"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChildrenString = exports.ComponentNamer = void 0;
var React = _interopRequireWildcard(require("react"));
var _checkPrimitives = require("./checkPrimitives");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var voidElements = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];
var ComponentNamer = exports.ComponentNamer = /*#__PURE__*/function () {
  function ComponentNamer() {
    _classCallCheck(this, ComponentNamer);
    this.counter = 0;
    // this.greekLetters = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];
  }
  return _createClass(ComponentNamer, [{
    key: "getNext",
    value: function getNext() {
      // const index = this.counter % this.greekLetters.length;
      // const letter = this.greekLetters[index];       
      this.counter++;
      // return letter;
      return "C".concat(this.counter);
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
var createChildrenString = exports.createChildrenString = function createChildrenString(children, componentNamer) {
  return React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      var type = child.type,
        props = child.props;
      if ((0, _checkPrimitives.markedForExclude)(type)) {
        return "<var></var>";
      } else {
        if (voidElements.includes(type)) {
          return "<".concat(type, ">");
        }
        var tag = getTagName(child, componentNamer);
        if (props !== null && props !== void 0 && props.children) {
          var currentChildren = createChildrenString(props.children, componentNamer);
          return "<".concat(tag, ">").concat(currentChildren, "</").concat(tag, ">");
        } else {
          return "<".concat(tag, " />");
        }
      }
    } else if (typeof child === 'string') {
      return escapeHTML(child);
    }
  }).join('');
};