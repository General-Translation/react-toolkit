"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = renderResolvedChildren;
const react_1 = __importDefault(require("react"));
const renderElement = (sourceElement, targetElement) => {
    var _a;
    const { props } = sourceElement;
    if (props === null || props === void 0 ? void 0 : props.children) {
        // check branches
        // exclude should work like this because the target doesn't have children, but it might be worth a dedicated check
        return react_1.default.cloneElement(sourceElement, Object.assign(Object.assign({}, props), { children: renderResolvedChildren(props.children, (_a = targetElement === null || targetElement === void 0 ? void 0 : targetElement.props) === null || _a === void 0 ? void 0 : _a.children) }));
    }
    return sourceElement;
};
function renderResolvedChildren(source, target) {
    if (!source || !target)
        return source;
    if (typeof target === 'string') {
        return target;
    }
    if (!Array.isArray(target)) {
        if (react_1.default.isValidElement(source)) {
            return renderElement(source, target);
        }
    }
    if (Array.isArray(source) && Array.isArray(target)) {
        // find matching components based on ID
        const findMatchingSource = (targetElement) => {
            return source.find(sourceChild => {
                var _a, _b, _c;
                if (react_1.default.isValidElement(sourceChild)) {
                    const { props } = sourceChild;
                    if (((_a = props === null || props === void 0 ? void 0 : props.generaltranslation) === null || _a === void 0 ? void 0 : _a.id) !== undefined) {
                        const sourceID = props.generaltranslation.id;
                        const targetID = (_c = (_b = targetElement === null || targetElement === void 0 ? void 0 : targetElement.props) === null || _b === void 0 ? void 0 : _b.generaltranslation) === null || _c === void 0 ? void 0 : _c.id;
                        return sourceID === targetID;
                    }
                }
                return false;
            });
        };
        // catch complex components which lose their added props
        // only relevant on the client side
        const complex = source.filter(sourceChild => {
            if (react_1.default.isValidElement(sourceChild)) {
                const { props } = sourceChild;
                if (!props.generaltranslation) {
                    return sourceChild;
                }
            }
        });
        return target.map(targetChild => {
            if (typeof targetChild === 'string') {
                return targetChild;
            }
            else {
                const matchingSource = findMatchingSource(targetChild);
                if (react_1.default.isValidElement(matchingSource)) {
                    return renderElement(matchingSource, targetChild);
                }
                if (complex.length > 0) {
                    return complex.shift();
                }
            }
        });
    }
    return source;
}
//# sourceMappingURL=renderResolvedChildren.js.map