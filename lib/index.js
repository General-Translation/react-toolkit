"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NextI18N", {
  enumerable: true,
  get: function get() {
    return _NextI18N["default"];
  }
});
Object.defineProperty(exports, "ServerI18N", {
  enumerable: true,
  get: function get() {
    return _ServerI18N["default"];
  }
});
Object.defineProperty(exports, "getDomainNext", {
  enumerable: true,
  get: function get() {
    return _headerFunctions.getDomainNext;
  }
});
Object.defineProperty(exports, "getUserLanguageNext", {
  enumerable: true,
  get: function get() {
    return _headerFunctions.getUserLanguageNext;
  }
});
Object.defineProperty(exports, "intl", {
  enumerable: true,
  get: function get() {
    return _intl["default"];
  }
});
var _NextI18N = _interopRequireDefault(require("./next/NextI18N"));
var _ServerI18N = _interopRequireDefault(require("./components/ServerI18N"));
var _intl = _interopRequireDefault(require("./functions/intl/intl"));
var _headerFunctions = require("./next/headerFunctions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }