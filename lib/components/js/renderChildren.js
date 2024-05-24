"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderChildren;
var React = _interopRequireWildcard(require("react"));
var _checkPrimitives = require("./checkPrimitives");
var _createChildrenString = require("./createChildrenString");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function reverseEscapeHTML(string) {
  return string.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// Child must be a single child
function renderChildren(child, translationArray, componentNamer) {
  if (!translationArray) {
    return child;
  }
  if (typeof child === 'string') {
    return (translationArray === null || translationArray === void 0 ? void 0 : translationArray[0]) || child;
  }
  if ( /*#__PURE__*/React.isValidElement(child)) {
    var type = child.type,
      props = child.props;
    if ((0, _checkPrimitives.markedForExclude)(type)) {
      return child;
    }
    if (props.children) {
      if (translationArray && Array.isArray(translationArray) && translationArray.length > 0) {
        var validChildren = new Map();
        React.Children.forEach(props.children, function (currentChild) {
          if ( /*#__PURE__*/React.isValidElement(currentChild)) {
            var html = (0, _createChildrenString.createChildrenString)(currentChild, componentNamer);
            validChildren.set(html, currentChild);
          }
        });
        return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, props), {}, {
          children: translationArray.map(function (item, index) {
            if (typeof item === 'string') {
              return /*#__PURE__*/React.createElement(React.Fragment, {
                key: index
              }, reverseEscapeHTML(item));
            } else if (item && _typeof(item) === 'object') {
              var key = Object.keys(item)[0]; // the only key
              if (key) {
                var _item$key;
                if (((_item$key = item[key]) === null || _item$key === void 0 ? void 0 : _item$key.length) > 0) {
                  var validItem = validChildren.get(key);
                  validChildren["delete"](key);
                  return /*#__PURE__*/React.createElement(React.Fragment, {
                    key: index
                  }, renderChildren(validItem, item[key], componentNamer));
                }
                var validChildrenIterator = validChildren.keys();
                var firstChildKey = validChildrenIterator.next().value;
                var firstChildValue = validChildren.get(firstChildKey);
                validChildren["delete"](firstChildKey);
                return /*#__PURE__*/React.createElement(React.Fragment, {
                  key: index
                }, firstChildValue);
              }
            }
          })
        }));
      }
    }
  }

  // default
  return child;
}