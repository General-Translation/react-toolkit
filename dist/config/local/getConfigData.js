"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getConfigData;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getDefaultFromEnv_1 = __importDefault(require("./getDefaultFromEnv"));
function getConfigData() {
    const filename = (0, getDefaultFromEnv_1.default)("GT_CONFIG_FILEPATH") || 'gt_config.json';
    const filepath = path_1.default.resolve(process.cwd(), filename);
    let data = {};
    try {
        const file = fs_1.default.readFileSync(filepath, 'utf-8');
        data = JSON.parse(file);
    }
    catch (error) {
        console.warn('@generaltranslation/react: No I18N config readable. Defaulting to standard settings.');
    }
    return data;
}
//# sourceMappingURL=getConfigData.js.map