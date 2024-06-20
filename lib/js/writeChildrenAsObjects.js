"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = writeChildrenAsObjects;
var React = _interopRequireWildcard(require("react"));
var _markedForExclude = _interopRequireDefault(require("./markedForExclude"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var getTagName = function getTagName(child) {
  var _props$generaltransla;
  if (!child) return '';
  var type = child.type,
    props = child.props;
  if (type !== null && type !== void 0 && type.displayName) return type === null || type === void 0 ? void 0 : type.displayName;
  if (type !== null && type !== void 0 && type.name) return type === null || type === void 0 ? void 0 : type.name;
  if (typeof type === 'string') return type;
  if (props !== null && props !== void 0 && props.href) return 'a';
  if (props !== null && props !== void 0 && (_props$generaltransla = props.generaltranslation) !== null && _props$generaltransla !== void 0 && _props$generaltransla.id) return "C".concat(props.generaltranslation.id);
  return 'function';
};
var writeChildAsObject = function writeChildAsObject(child) {
  if ( /*#__PURE__*/React.isValidElement(child)) {
    var type = child.type,
      props = child.props;
    var finalProps = {};
    if (props.children && !(0, _markedForExclude["default"])(type)) {
      finalProps.children = React.Children.map(props.children, function (nestedChild) {
        return writeChildAsObject(nestedChild);
      });
    }
    if (props.generaltranslation) {
      finalProps.generaltranslation = props.generaltranslation;
    }
    return {
      type: getTagName(child),
      props: finalProps
    };
  }
  return child;
};
function writeChildrenAsObjects(children) {
  return React.Children.map(children, function (child) {
    return writeChildAsObject(child);
  });
}