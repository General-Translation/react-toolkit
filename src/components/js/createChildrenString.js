import * as React from 'react'
import { markedForExclude } from './checkPrimitives';

const voidElements = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
];

export class ComponentNamer {
    constructor() {
        this.counter = 0;
        // this.greekLetters = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];
    }
    getNext() {
        // const index = this.counter % this.greekLetters.length;
        // const letter = this.greekLetters[index];       
        this.counter++;
        // return letter;
        return `C${this.counter}`
    }
}

const getTagName = (child, componentNamer) => {
    if (!child) return '';
    const { type, props } = child;
    if (type?.displayName) return type?.displayName;
    if (type?.name) return type?.name;
    if (typeof type === 'string') return type;
    if (props?.href) return 'a';
    return componentNamer.getNext();
}

function escapeHTML(string) {
    return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const createChildrenString = (children, componentNamer) => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const { type, props } = child;
        if (markedForExclude(type)) {
            return `<var></var>`
        } else {
            if (voidElements.includes(type)) {
                return `<${type}>`
            }
            const tag = getTagName(child, componentNamer);
            if (props?.children) {
                const currentChildren = createChildrenString(props.children, componentNamer);
                return `<${tag}>${currentChildren}</${tag}>`;
            } else {
                return `<${tag} />`;
            }
        }
      } else if (typeof child === 'string') {
        return escapeHTML(child);
      }
    }).join('');
}