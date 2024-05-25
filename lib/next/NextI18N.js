"use strict";
'use server';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NextI18N;
var _react = _interopRequireDefault(require("react"));
var _headerFunctions = require("./headerFunctions");
var _ServerI18N = _interopRequireDefault(require("../components/ServerI18N"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function NextI18N(_ref) {
  var children = _ref.children;
  var userLanguage = (0, _headerFunctions.getUserLanguageNext)();
  var domain = (0, _headerFunctions.getDomainNext)() || "";
  return /*#__PURE__*/_react["default"].createElement(_ServerI18N["default"], {
    userLanguage: userLanguage,
    domain: domain
  }, children);
}