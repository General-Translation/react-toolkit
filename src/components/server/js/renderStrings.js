import * as React from 'react'
import { markedForExclude } from './checkPrimitives';

export const createChildrenString = (children) => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const { type, props } = child;
        let currentChildren = '';
        if (markedForExclude(type)) {
            return `{variable}`
        } else {
            Object.entries(props)
            .map(([key, value]) => {
                if (key === 'children') {
                    currentChildren += createChildrenString(value);
                    return ''
                }
            })
            .join('');
            return `<${type?.displayName || type?.name || ''}>${currentChildren}</${type?.displayName || type?.name || ''}>`;
        }
      }
      return child?.toString() || '';
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
                    const html = createChildrenString(currentChild);
                    validChildren[html] = currentChild;
                }
            });
            return React.cloneElement(child, {
                ...props,
                children: translationArray.map(item => {
                    if (typeof item === 'string') {
                        return item;
                    } 
                    else { // (typeof item === 'object')
                        const key = Object.keys(item)[0]; // only one attribute here
                        return renderStrings(validChildren[key], item[key])
                    }
                })
            });
        } 
    }

    // else
    return child;
}