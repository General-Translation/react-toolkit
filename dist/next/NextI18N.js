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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NextI18N;
const jsx_runtime_1 = require("react/jsx-runtime");
const headerFunctions_1 = require("./headerFunctions");
const ServerI18N_1 = __importDefault(require("../server/ServerI18N"));
const I18NConfig_1 = __importDefault(require("../config/I18NConfig"));
function NextI18N(_a) {
    return __awaiter(this, void 0, void 0, function* () {
        var { children } = _a, metadata = __rest(_a, ["children"]);
        const userLanguage = (yield (0, headerFunctions_1.getUserLanguageNext)()) || I18NConfig_1.default.getDefaultLanguage();
        const domain = (yield (0, headerFunctions_1.getDomainNext)()) || "";
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: /* @ts-expect-error Server Component */ (0, jsx_runtime_1.jsx)(ServerI18N_1.default, Object.assign({ userLanguage: userLanguage, domain: domain }, metadata, { children: children })) }));
    });
}
//# sourceMappingURL=NextI18N.js.map