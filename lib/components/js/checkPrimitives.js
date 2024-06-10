"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markedForExclude = void 0;
var markedForExclude = exports.markedForExclude = function markedForExclude(type) {
  return (type === null || type === void 0 ? void 0 : type.markedForExclude) === true;
};