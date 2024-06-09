"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.H1 = H1;
exports.H2 = H2;
exports.H3 = H3;
exports.H4 = H4;
exports.H5 = H5;
exports.H6 = H6;
exports.OL = OL;
exports.Paragraph = Paragraph;
exports.UL = UL;
var _react = _interopRequireDefault(require("react"));
var _NextI18N = _interopRequireDefault(require("./NextI18N"));
var _excluded = ["children"],
  _excluded2 = ["children"],
  _excluded3 = ["children"],
  _excluded4 = ["children"],
  _excluded5 = ["children"],
  _excluded6 = ["children"],
  _excluded7 = ["children"],
  _excluded8 = ["children"],
  _excluded9 = ["children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
// <p> tag
function Paragraph(_ref) {
  var children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement("p", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}

// <h1> tag
function H1(_ref2) {
  var children = _ref2.children,
    props = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/_react["default"].createElement("h1", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}

// <h2> tag
function H2(_ref3) {
  var children = _ref3.children,
    props = _objectWithoutProperties(_ref3, _excluded3);
  return /*#__PURE__*/_react["default"].createElement("h2", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}

// <h3> tag
function H3(_ref4) {
  var children = _ref4.children,
    props = _objectWithoutProperties(_ref4, _excluded4);
  return /*#__PURE__*/_react["default"].createElement("h3", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}

// <h4> tag
function H4(_ref5) {
  var children = _ref5.children,
    props = _objectWithoutProperties(_ref5, _excluded5);
  return /*#__PURE__*/_react["default"].createElement("h4", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}

// <h5> tag
function H5(_ref6) {
  var children = _ref6.children,
    props = _objectWithoutProperties(_ref6, _excluded6);
  return /*#__PURE__*/_react["default"].createElement("h5", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}

// <h6> tag
function H6(_ref7) {
  var children = _ref7.children,
    props = _objectWithoutProperties(_ref7, _excluded7);
  return /*#__PURE__*/_react["default"].createElement("h6", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}

// <ol> tag
function OL(_ref8) {
  var children = _ref8.children,
    props = _objectWithoutProperties(_ref8, _excluded8);
  return /*#__PURE__*/_react["default"].createElement("ol", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}

// <ul> tag
function UL(_ref9) {
  var children = _ref9.children,
    props = _objectWithoutProperties(_ref9, _excluded9);
  return /*#__PURE__*/_react["default"].createElement("ul", props, /*#__PURE__*/_react["default"].createElement(_NextI18N["default"], null, children));
}