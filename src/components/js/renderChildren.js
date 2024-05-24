import * as React from 'react'
import { markedForExclude } from './checkPrimitives';
import { createChildrenString } from './createChildrenString';

function reverseEscapeHTML(string) {
    return string.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// Child must be a single child
export default function renderChildren(child, translationArray, componentNamer) {

    if (!translationArray) {
        return child;
    }

    if (typeof child === 'string') {
        return translationArray?.[0] || child;
    }

    if (React.isValidElement(child)) {
        
        const { type, props } = child;
        if (markedForExclude(type)) {
            return child;
        } 
        if (props.children) {
            if (translationArray && Array.isArray(translationArray) && translationArray.length > 0) {
                const validChildren = new Map();
                React.Children.forEach(props.children, currentChild => {
                    if (React.isValidElement(currentChild)) {
                        const html = createChildrenString(currentChild, componentNamer);
                        validChildren.set(html, currentChild)
                    }
                });
                return React.cloneElement(child, {
                    ...props,
                    children: translationArray.map((item, index) => {
                        if (typeof item === 'string') {
                            return <React.Fragment key={index}>{reverseEscapeHTML(item)}</React.Fragment>;
                        }
                        else if (item && typeof item === 'object') {
                            const key = Object.keys(item)[0]; // the only key
                            if (key) {
                                if (item[key]?.length > 0) {
                                    const validItem = validChildren.get(key);
                                    validChildren.delete(key);
                                    return <React.Fragment key={index}>{renderChildren(validItem, item[key], componentNamer)}</React.Fragment>
                                }
                                const validChildrenIterator = validChildren.keys();
                                const firstChildKey = validChildrenIterator.next().value;
                                const firstChildValue = validChildren.get(firstChildKey);
                                validChildren.delete(firstChildKey);
                                return <React.Fragment key={index}>{firstChildValue}</React.Fragment>;
                            }
                        }
                    })
                });
            }
        }
    }

    // default
    return child;
}