"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ExcludeI18N", {
  enumerable: true,
  get: function get() {
    return _ExcludeI18N["default"];
  }
});
Object.defineProperty(exports, "I18N", {
  enumerable: true,
  get: function get() {
    return _I18N["default"];
  }
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
var _NextI18N = _interopRequireDefault(require("./components/next/NextI18N"));
var _ServerI18N = _interopRequireDefault(require("./components/server/ServerI18N"));
var _I18N = _interopRequireDefault(require("./components/primitives/I18N"));
var _ExcludeI18N = _interopRequireDefault(require("./components/primitives/ExcludeI18N"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }