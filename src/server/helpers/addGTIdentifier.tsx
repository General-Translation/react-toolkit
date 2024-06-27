import React, { ReactNode, ReactElement } from 'react'
import Exclude from '../../primitives/Exclude';

type Child = ReactNode | Record<string, any>;
type Children = Child[] | Child;
type GTProp = {
    id: number,
    label?: string,
    transformation?: string
}

const validateProps = (props: any) => {
    if (typeof props?.generaltranslation?.id === 'number') {
        const error = `Nesting of I18N components is not permitted. This prevents components from being translated twice.`
        throw new Error(error)
    }
}

export default function addGTIdentifier(children: Children) {

    let indexObject: { index: number } = { index: 0 };

    const createGTProp = (options?: Record<string, any>): GTProp => {
        indexObject.index += 1;
        let result: GTProp = { id: indexObject.index }
        if (options?.label) {
            result.label = options.label;
        }
        if (options?.transformation) {
            result.transformation = options.transformation;
        }
        return result;
    }

    const handleValidReactElement = (child: ReactElement) => {
        const { type, props } = child;
        validateProps(props);
        let generaltranslation = createGTProp(); 
        const transformation: string = (type as any)?.transformationGT || '';
        if (transformation) {
            generaltranslation.transformation = transformation;
            if (typeof props.label === 'string') {
                generaltranslation.label = props.label;
            }
        }
        let newProps = {
            ...props,
            generaltranslation: generaltranslation
        };
        if (props?.children) {
            newProps.children = addIdentifierRecursively(props.children);
        }
        return React.cloneElement(child, newProps);
    }

    const handleVariable = (child: Record<string, any>) => {
        let generaltranslation = createGTProp({ transformation: "exclude" });
        const excludeChildren: ReactNode = Object.values(child)[0] || '';
        return React.cloneElement(<Exclude></Exclude>, { generaltranslation: generaltranslation }, excludeChildren)
    }

    const handleSingleChild = (child: Child) => {
        if (React.isValidElement(child)) return handleValidReactElement(child)
        else if (typeof child === 'object') return handleVariable(child as Record<string, any>);
        return child;
    }

    const addIdentifierRecursively = (children: any) => {
        if (Array.isArray(children)) {
            return children.map(child => handleSingleChild(child))
        }
        return handleSingleChild(children);
    }

    const taggedChildren = addIdentifierRecursively(children);

    return taggedChildren;

}
