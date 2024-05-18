"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ExcludeI18N = function ExcludeI18N(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children);
};
ExcludeI18N.markedForExclude = true;
var _default = exports["default"] = ExcludeI18N;