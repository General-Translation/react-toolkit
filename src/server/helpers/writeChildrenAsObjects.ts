import React, { ReactNode, ReactElement } from 'react'

type Child = ReactNode;
type Children = ReactNode;

const isExcluded = (props?: any): boolean => props?.generaltranslation?.transformation === "exclude";

const getTagName = (child: ReactElement): string => {
    if (!child) return '';
    const { type, props } = child;
    if (type && typeof type === 'function') {
        if ('displayName' in type && typeof type.displayName === 'string' && type.displayName) return type.displayName;
        if ('name' in type && typeof type.name === 'string' && type.name) return type.name;
    }
    if (type && typeof type === 'string') return type;
    if (props?.href) return 'a';
    if (props?.generaltranslation?.id) return `C${props.generaltranslation.id}`;
    return 'function';
};

const handleValidReactElement = (child: ReactElement) => {
    const { props } = child;
    let newProps: any = {};
    if (props.children && !isExcluded(props)) {
        newProps.children = writeChildrenAsObjects(props.children)
    }
    if (props.generaltranslation) {
        newProps.generaltranslation = props.generaltranslation;
    }
    return {
        type: getTagName(child),
        props: newProps
    }
}

const handleSingleChild = (child: Child) => {
    if (React.isValidElement(child)) return handleValidReactElement(child);
    return child;
}

export default function writeChildrenAsObjects(children: Children) {
    if (Array.isArray(children)) {
        return children.map(child => handleSingleChild(child))
    }
    return handleSingleChild(children)
}