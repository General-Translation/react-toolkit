"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLanguageNext = getUserLanguageNext;
exports.getDomainNext = getDomainNext;
let headers = null;
function loadNextHeaders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nextHeaders = require('next/headers');
            headers = nextHeaders.headers;
        }
        catch (error) {
            console.warn('next/headers is not available. Running in non-Next.js environment.');
            headers = null;
        }
    });
}
function getUserLanguageNext() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!headers)
            yield loadNextHeaders();
        if (headers) {
            const headerList = headers();
            const acceptLanguage = headerList.get('accept-language');
            return (acceptLanguage === null || acceptLanguage === void 0 ? void 0 : acceptLanguage.split('/')[0].split(',')[0]) || null;
        }
        else {
            return null;
        }
    });
}
function getDomainNext() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!headers)
            yield loadNextHeaders();
        if (headers) {
            const headerList = headers();
            return headerList.get('host') || null;
        }
        else {
            return null;
        }
    });
}
//# sourceMappingURL=headerFunctions.js.map