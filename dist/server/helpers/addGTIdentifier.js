"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addGTIdentifier;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Exclude_1 = __importDefault(require("../../primitives/Exclude"));
const validateProps = (props) => {
    var _a;
    if (typeof ((_a = props === null || props === void 0 ? void 0 : props.generaltranslation) === null || _a === void 0 ? void 0 : _a.id) === 'number') {
        const error = `Nesting of I18N components is not permitted. This prevents components from being translated twice.`;
        throw new Error(error);
    }
};
function addGTIdentifier(children) {
    let indexObject = { index: 0 };
    const createGTProp = (options) => {
        indexObject.index += 1;
        let result = { id: indexObject.index };
        if (options === null || options === void 0 ? void 0 : options.label) {
            result.label = options.label;
        }
        if (options === null || options === void 0 ? void 0 : options.transformation) {
            result.transformation = options.transformation;
        }
        return result;
    };
    const handleValidReactElement = (child) => {
        const { type, props } = child;
        validateProps(props);
        let generaltranslation = createGTProp();
        const transformation = (type === null || type === void 0 ? void 0 : type.transformationGT) || '';
        if (transformation) {
            generaltranslation.transformation = transformation;
            if (typeof props.label === 'string') {
                generaltranslation.label = props.label;
            }
        }
        let newProps = Object.assign(Object.assign({}, props), { generaltranslation: generaltranslation });
        if (props === null || props === void 0 ? void 0 : props.children) {
            newProps.children = addIdentifierRecursively(props.children);
        }
        return react_1.default.cloneElement(child, newProps);
    };
    const handleVariable = (child) => {
        let generaltranslation = createGTProp({ transformation: "exclude" });
        const excludeChildren = Object.values(child)[0] || '';
        return react_1.default.cloneElement((0, jsx_runtime_1.jsx)(Exclude_1.default, {}), { generaltranslation: generaltranslation }, excludeChildren);
    };
    const handleSingleChild = (child) => {
        if (react_1.default.isValidElement(child))
            return handleValidReactElement(child);
        else if (typeof child === 'object')
            return handleVariable(child);
        return child;
    };
    const addIdentifierRecursively = (children) => {
        if (Array.isArray(children)) {
            return children.map(child => handleSingleChild(child));
        }
        return handleSingleChild(children);
    };
    const taggedChildren = addIdentifierRecursively(children);
    return taggedChildren;
}
//# sourceMappingURL=addGTIdentifier.js.map