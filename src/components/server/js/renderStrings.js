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
            const tag = type?.displayName || type?.name || ((typeof type !== Error) ? type?.toString() : '' || '')
            return `<${tag}>${currentChildren}</${tag}>`;
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
            } else if (typeof translationArray === 'string') {
                return React.cloneElement(child, {
                    ...props,
                    children: translationArray
                });
            }
            else return child;
            
        } 
    }

    // else
    return child;
}