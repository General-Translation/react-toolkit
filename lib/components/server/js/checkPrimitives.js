"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markedForI18N = exports.markedForExclude = void 0;
var markedForI18N = exports.markedForI18N = function markedForI18N(type) {
  return (type === null || type === void 0 ? void 0 : type.markedForI18N) === true;
};
var markedForExclude = exports.markedForExclude = function markedForExclude(type) {
  return (type === null || type === void 0 ? void 0 : type.markedForExclude) === true;
};