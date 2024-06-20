"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addGTIdentifier;
var React = _interopRequireWildcard(require("react"));
var _markedForExclude = _interopRequireDefault(require("./markedForExclude"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var checkProps = function checkProps(props) {
  var _props$generaltransla;
  if (typeof (props === null || props === void 0 || (_props$generaltransla = props.generaltranslation) === null || _props$generaltransla === void 0 ? void 0 : _props$generaltransla.id) === 'number') {
    var error = "Nesting of I18N components is not permitted. This prevents components from being translated twice.";
    throw new Error(error);
  }
};
function addGTIdentifier(children, indexObject) {
  if (!indexObject) indexObject = {
    index: 0
  };
  return React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      indexObject.index += 1; // index starting at 1, only increments for valid elements
      var generaltranslation = {
        id: indexObject.index
      };
      var type = child.type,
        props = child.props;
      checkProps(props);
      if (props !== null && props !== void 0 && props.children && !(0, _markedForExclude["default"])(type)) {
        return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, props), {}, {
          generaltranslation: generaltranslation,
          children: addGTIdentifier(props.children, indexObject)
        }));
      } else {
        return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, props), {}, {
          generaltranslation: generaltranslation
        }));
      }
    }
    return child;
  });
}