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
exports.default = fetchI18NSheet;
function fetchI18NSheet(cacheURL, projectID, userLanguage) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${cacheURL}/${projectID}/${userLanguage}`);
            const I18NSheet = yield response.json();
            if (Object.keys(I18NSheet).length > 0) {
                return I18NSheet;
            }
        }
        catch (error) {
            console.error(error);
        }
        return null;
    });
}
//# sourceMappingURL=fetchI18NSheet.js.map