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
exports.default = ServerI18N;
const jsx_runtime_1 = require("react/jsx-runtime");
const I18NConfig_1 = __importDefault(require("../config/I18NConfig"));
const _I18NResolver_js_1 = __importDefault(require("./resolvers/_I18NResolver.js"));
const addGTIdentifier_js_1 = __importDefault(require("./helpers/addGTIdentifier.js"));
const writeChildrenAsObjects_js_1 = __importDefault(require("./helpers/writeChildrenAsObjects.js"));
const generateHash_js_1 = __importDefault(require("./helpers/generateHash.js"));
const renderChildren_1 = __importDefault(require("./renderChildren"));
function ServerI18N(_a) {
    return __awaiter(this, void 0, void 0, function* () {
        var { children, userLanguage } = _a, metadata = __rest(_a, ["children", "userLanguage"]);
        const translationRequired = (children && I18NConfig_1.default.translationRequired(userLanguage)) ? true : false;
        if (!translationRequired) {
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
        }
        const I18NSheetPromise = I18NConfig_1.default.getI18NSheet(userLanguage);
        const taggedChildren = (0, addGTIdentifier_js_1.default)(children);
        const childrenAsObjects = (0, writeChildrenAsObjects_js_1.default)(taggedChildren);
        const hash = yield (0, generateHash_js_1.default)(childrenAsObjects);
        const I18NSheet = yield I18NSheetPromise;
        const translationExists = I18NSheet[hash] ? true : false;
        if (translationExists) {
            const I18NChildren = yield (0, renderChildren_1.default)(taggedChildren, I18NSheet[hash]);
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: I18NChildren }));
        }
        const I18NChildrenPromise = I18NConfig_1.default.translateChildren(Object.assign({ children: childrenAsObjects, targetLanguage: userLanguage }, metadata));
        // RENDERING
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(_I18NResolver_js_1.default, { promise: I18NChildrenPromise, children: taggedChildren }) }));
    });
}
//# sourceMappingURL=ServerI18N.js.map