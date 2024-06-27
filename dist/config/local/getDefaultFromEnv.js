"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDefaultFromEnv;
function getDefaultFromEnv(VARIABLE) {
    var _a;
    if (typeof process !== 'undefined' && ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a[VARIABLE])) {
        return process.env[VARIABLE];
    }
    return '';
}
//# sourceMappingURL=getDefaultFromEnv.js.map