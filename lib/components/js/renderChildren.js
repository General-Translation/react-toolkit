"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderChildren;
var React = _interopRequireWildcard(require("react"));
var _checkPrimitives = require("./checkPrimitives");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// source and target are both initially single objects
function renderChildren(source, target) {
  if (!target) return source;
  return target.map(function (targetChild, index) {
    if (typeof targetChild === 'string') {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, targetChild);
    } else {
      var matchingSource = source.find(function (component) {
        var _component$props, _component$props2, _targetChild$props;
        return typeof (component === null || component === void 0 || (_component$props = component.props) === null || _component$props === void 0 ? void 0 : _component$props.generaltranslation) === 'number' && (component === null || component === void 0 || (_component$props2 = component.props) === null || _component$props2 === void 0 ? void 0 : _component$props2.generaltranslation) === (targetChild === null || targetChild === void 0 || (_targetChild$props = targetChild.props) === null || _targetChild$props === void 0 ? void 0 : _targetChild$props.generaltranslation);
      });
      if ( /*#__PURE__*/React.isValidElement(matchingSource)) {
        if (matchingSource.props.children && targetChild.props.children) {
          return /*#__PURE__*/React.cloneElement(matchingSource, _objectSpread(_objectSpread({}, matchingSource.props), {}, {
            children: renderChildren(matchingSource.props.children, targetChild.props.children)
          }));
        }
        return matchingSource;
      }
    }
  });
}