"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cache;
class PlaceholderCache {
    constructor() {
        this.cache = new Map();
    }
    set(functionKey, argsKey, value) {
        if (!this.cache.has(functionKey)) {
            this.cache.set(functionKey, new Map());
        }
        this.cache.get(functionKey).set(argsKey, value);
    }
    get(functionKey, argsKey) {
        var _a;
        return (_a = this.cache.get(functionKey)) === null || _a === void 0 ? void 0 : _a.get(argsKey);
    }
    has(functionKey, argsKey) {
        return this.cache.has(functionKey) && this.cache.get(functionKey).has(argsKey);
    }
}
const placeholderCache = new PlaceholderCache();
function cache(f) {
    const functionKey = f.toString();
    return function (...args) {
        const argsKey = JSON.stringify(args);
        if (!placeholderCache.has(functionKey, argsKey)) {
            try {
                const result = f(...args);
                placeholderCache.set(functionKey, argsKey, result);
                return result;
            }
            catch (error) {
                throw new Error(`Error executing function: ${error}`);
            }
        }
        return placeholderCache.get(functionKey, argsKey);
    };
}
//# sourceMappingURL=placeholderCache.js.map