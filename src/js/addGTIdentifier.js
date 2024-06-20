import * as React from 'react'
import markedForExclude from './markedForExclude';

const checkProps = (props) => {
    if (typeof props?.generaltranslation?.id === 'number') {
        const error = `Nesting of I18N components is not permitted. This prevents components from being translated twice.`
        throw new Error(error)
    }
}

export default function addGTIdentifier(children, indexObject) {
    if (!indexObject) indexObject = { index: 0 };
    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            indexObject.index += 1; // index starting at 1, only increments for valid elements
            let generaltranslation = { id: indexObject.index };
            const { type, props } = child;
            checkProps(props);
            if (props?.children && !markedForExclude(type)) {
                return React.cloneElement(child, {
                    ...props,
                    generaltranslation: generaltranslation,
                    children: addGTIdentifier(props.children, indexObject)
                });
            } else {
                return React.cloneElement(child, {
                    ...props,
                    generaltranslation: generaltranslation
                });       
            }
        }
        return child;
    })
}