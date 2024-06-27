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
exports.default = getI18NSheet;
const fs_1 = require("fs");
function getI18NSheet(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield fs_1.promises.readFile(filepath, 'utf-8');
            return JSON.parse(file);
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
//# sourceMappingURL=getI18NSheet.js.map