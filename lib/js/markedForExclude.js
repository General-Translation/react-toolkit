"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = markedForExclude;
function markedForExclude(type) {
  return (type === null || type === void 0 ? void 0 : type.markedForExclude) === true;
}
;