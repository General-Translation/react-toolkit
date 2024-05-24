"use strict";
'use server';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDomainNext = getDomainNext;
exports.getUserLanguageNext = getUserLanguageNext;
var _headers = require("next/headers");
function getUserLanguageNext() {
  var _headerList$get;
  var headerList = (0, _headers.headers)();
  return headerList === null || headerList === void 0 || (_headerList$get = headerList.get('accept-language')) === null || _headerList$get === void 0 || (_headerList$get = _headerList$get.split('/')) === null || _headerList$get === void 0 ? void 0 : _headerList$get[0].split(',')[0];
}
function getDomainNext() {
  var headerList = (0, _headers.headers)();
  return headerList.get('host');
}