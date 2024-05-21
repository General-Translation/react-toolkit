import * as React from 'react'
import { markedForExclude } from './checkPrimitives';

export class ComponentNamer {
    constructor() {
        this.counter = 0;
        this.greekLetters = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];
    }
    getNext() {
        const index = this.counter % this.greekLetters.length;
        const letter = this.greekLetters[index];       
        this.counter++;
        return letter;
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

export const createChildrenString = (children, componentNamer) => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const { type, props } = child;
        let currentChildren = '';
        if (markedForExclude(type)) {
            return `{variable}`
        } else {
            if (props?.children) {
                Object.entries(props)
                .map(([key, value]) => {
                if (key === 'children') {
                    currentChildren += createChildrenString(value, componentNamer);
                    return ''
                }
                })
                .join('');
                const tag = getTagName(child, componentNamer);
                return `<${tag}>${currentChildren}</${tag}>`;
            }
        }
      } else if (typeof child === 'string') {
        return child;
      }
    }).join('');
}

export const renderStrings = (child, translationArray) => {
        
    if (!translationArray) {
        return child;
    };

    if (React.isValidElement(child)) {
        const { type, props } = child;
        if (markedForExclude(type)) {
            return child;
        } 
        else if (props.children) {
            const validChildren = {};
            React.Children.forEach(props.children, currentChild => {
                if (React.isValidElement(currentChild)) {
                    const html = createChildrenString(currentChild, new ComponentNamer());
                    validChildren[html] = currentChild;
                }
            });
            if (translationArray && Array.isArray(translationArray) && translationArray.length > 0) {
                return React.cloneElement(child, {
                    ...props,
                    children: translationArray.map((item, index) => {
                        if (typeof item === 'string') {
                            return <React.Fragment key={index}>{item}</React.Fragment>;
                        } 
                        else { // (typeof item === 'object')
                            const key = Object.keys(item)[0]; // only one attribute here
                            return <React.Fragment key={index}>{renderStrings(validChildren[key], item[key])}</React.Fragment>
                        }
                    })
                });
            }
            else return child;
        } 
    }

    // else
    return child;
}