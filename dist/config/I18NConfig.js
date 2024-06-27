"use strict";
// I18NConfig.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const generaltranslation_1 = __importStar(require("generaltranslation"));
const placeholderCache_1 = __importDefault(require("./placeholderCache")); // replace with import { cache } from 'react' when it is released
const fetchI18NSheet_1 = __importDefault(require("./remote/fetchI18NSheet"));
const getI18NSheet_1 = __importDefault(require("./local/getI18NSheet"));
const getDefaultFromEnv_1 = __importDefault(require("./local/getDefaultFromEnv"));
const getConfigData_1 = __importDefault(require("./local/getConfigData"));
const getI18NSheetFromCache = (0, placeholderCache_1.default)(fetchI18NSheet_1.default);
const getI18NSheetFromFile = (0, placeholderCache_1.default)(getI18NSheet_1.default);
class I18NConfiguration {
    constructor(_a = {}) {
        var { apiKey, projectID, userLanguage = '', defaultLanguage = 'en', maxConcurrentRequests = 3, batchInterval = 25, baseURL = "https://prod.gtx.dev", cacheURL = "https://json.gtx.dev", I18NSheets = {} } = _a, metadata = __rest(_a, ["apiKey", "projectID", "userLanguage", "defaultLanguage", "maxConcurrentRequests", "batchInterval", "baseURL", "cacheURL", "I18NSheets"]);
        // User-settable
        this.apiKey = apiKey || (0, getDefaultFromEnv_1.default)('GT_API_KEY');
        this.projectID = projectID || (0, getDefaultFromEnv_1.default)('GT_PROJECT_ID');
        this.userLanguage = userLanguage;
        this.defaultLanguage = defaultLanguage;
        this.cacheURL = cacheURL;
        this.baseURL = baseURL;
        this.I18NSheets = I18NSheets;
        this.gt = new generaltranslation_1.default({ projectID: this.projectID, apiKey: this.apiKey, defaultLanguage: this.defaultLanguage, baseURL: this.baseURL });
        this.metadata = Object.assign({ projectID: this.projectID, defaultLanguage: this.defaultLanguage }, metadata);
        // Batching
        this.maxConcurrentRequests = maxConcurrentRequests;
        this.batchInterval = batchInterval;
        this._queue = [];
        this._activeRequests = 0;
        this._startBatching();
    }
    // ----- DEFAULT LANGUAGE ----- //
    getDefaultLanguage() {
        return this.defaultLanguage;
    }
    // ----- TRANSLATION REQUIRED ----- //
    translationRequired(userLanguage) {
        return (this.projectID && userLanguage && !(0, generaltranslation_1.isSameLanguage)(this.defaultLanguage, userLanguage))
            ? true : false;
    }
    // ----- I18N JSON CACHING ----- //
    getI18NSheet(userLanguage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.I18NSheets[userLanguage]) {
                return yield getI18NSheetFromFile(this.I18NSheets[userLanguage]);
            }
            return (yield getI18NSheetFromCache(this.cacheURL, this.projectID, userLanguage)) || {};
        });
    }
    // ----- REACT TRANSLATION ----- //
    translateChildren(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._queue.push({ params, resolve, reject });
            });
        });
    }
    _sendBatchReactRequest(batch) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            this._activeRequests++;
            try {
                // Combine batch into a request array to be sent to the endpoint
                // batch looks like: [{ children, targetLanguage, ...props }]
                const targetLanguage = ((_b = (_a = batch === null || batch === void 0 ? void 0 : batch[0]) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.targetLanguage) || this.defaultLanguage;
                const content = batch.map(item => (Object.assign({}, item.params)));
                const I18NData = ((_c = (yield this.gt.translateReactChildren({
                    content: content,
                    targetLanguage: targetLanguage,
                    metadata: this.metadata
                }))) === null || _c === void 0 ? void 0 : _c.translation) || {};
                batch.forEach((item, index) => {
                    item.resolve(I18NData[index]);
                });
            }
            catch (error) {
                batch.forEach(item => item.reject(error));
            }
            finally {
                this._activeRequests--;
            }
        });
    }
    // ----- SORTING AND BATCHING ----- //
    _startBatching() {
        setInterval(() => {
            if (this._queue.length > 0 && this._activeRequests < this.maxConcurrentRequests) {
                this._sendBatchReactRequest(this._queue);
                this._queue = [];
            }
        }, this.batchInterval);
    }
}
const I18NConfig = new I18NConfiguration((0, getConfigData_1.default)());
exports.default = I18NConfig;
//# sourceMappingURL=I18NConfig.js.map