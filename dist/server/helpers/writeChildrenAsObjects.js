"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeChildrenAsObjects;
const react_1 = __importDefault(require("react"));
const isExcluded = (props) => { var _a; return ((_a = props === null || props === void 0 ? void 0 : props.generaltranslation) === null || _a === void 0 ? void 0 : _a.transformation) === "exclude"; };
const getTagName = (child) => {
    var _a;
    if (!child)
        return '';
    const { type, props } = child;
    if (type && typeof type === 'function') {
        if ('displayName' in type && typeof type.displayName === 'string' && type.displayName)
            return type.displayName;
        if ('name' in type && typeof type.name === 'string' && type.name)
            return type.name;
    }
    if (type && typeof type === 'string')
        return type;
    if (props === null || props === void 0 ? void 0 : props.href)
        return 'a';
    if ((_a = props === null || props === void 0 ? void 0 : props.generaltranslation) === null || _a === void 0 ? void 0 : _a.id)
        return `C${props.generaltranslation.id}`;
    return 'function';
};
const handleValidReactElement = (child) => {
    const { props } = child;
    let newProps = {};
    if (props.children && !isExcluded(props)) {
        newProps.children = writeChildrenAsObjects(props.children);
    }
    if (props.generaltranslation) {
        newProps.generaltranslation = props.generaltranslation;
    }
    return {
        type: getTagName(child),
        props: newProps
    };
};
const handleSingleChild = (child) => {
    if (react_1.default.isValidElement(child))
        return handleValidReactElement(child);
    return child;
};
function writeChildrenAsObjects(children) {
    if (Array.isArray(children)) {
        return children.map(child => handleSingleChild(child));
    }
    return handleSingleChild(children);
}
//# sourceMappingURL=writeChildrenAsObjects.js.map