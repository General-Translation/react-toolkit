import * as React from 'react'
import markedForExclude from './markedForExclude';

const getTagName = (child) => {
    if (!child) return '';
    const { type, props } = child;
    if (type?.displayName) return type?.displayName;
    if (type?.name) return type?.name;
    if (typeof type === 'string') return type;
    if (props?.href) return 'a';
    if (props?.generaltranslation?.id) return `C${props.generaltranslation.id}`
    return 'function';
}

const writeChildAsObject = (child) => {
    if (React.isValidElement(child)) {
        const { type, props } = child;
        let finalProps = {};
        if (props.children && !markedForExclude(type)) {
            finalProps.children = React.Children.map(props.children, nestedChild => writeChildAsObject(nestedChild))
        }
        if (props.generaltranslation) {
            finalProps.generaltranslation = props.generaltranslation;
        }
        return {
            type: getTagName(child),
            props: finalProps
        }
    }
    return child;
}

export default function writeChildrenAsObjects(children) {
    return React.Children.map(children, child => writeChildAsObject(child))
}