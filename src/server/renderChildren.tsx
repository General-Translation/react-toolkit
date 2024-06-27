import React, { ReactElement, ReactNode } from 'react'
import _I18NResolver from './resolvers/_I18NResolver';
import I18NConfig from '../config/I18NConfig';

type TargetElement = Record<string, any>
type TargetChild = TargetElement | string;
type Target = TargetChild | TargetChild[];

const renderElement = (sourceElement: ReactElement, targetElement: TargetElement): ReactElement => {
    const { props } = sourceElement;
    if (props?.children) {
        // check branches
        // exclude should work like this because the target doesn't have children, but it might be worth a dedicated check
        // if undiscovered branch, return <_I18NResolver promise={translationFunction()}>{children}</_I18NResolver>
        return React.cloneElement(sourceElement, {
            ...props,
            children: renderChildren(props.children, targetElement?.props?.children)
        });
    }
    return sourceElement;
}

export default async function renderChildren(
    source: ReactNode, 
    target?: Target | null
): Promise<ReactNode> {

    if (!source || !target) return source;

    if (typeof target === 'string') {
        return target;
    }

    if (!Array.isArray(target)) {
        if (React.isValidElement(source)) {
            return renderElement(source, target);
        }
    }
    
    if (Array.isArray(source) && Array.isArray(target)) {

        // find matching components based on ID
        const findMatchingSource = (targetElement: TargetElement): ReactElement | undefined => {
            return source.find(sourceChild => {
                if (React.isValidElement(sourceChild)) {
                    const { props }: any = sourceChild;
                    if (props?.generaltranslation?.id !== undefined) {
                        const sourceID = props.generaltranslation.id;
                        const targetID = targetElement?.props?.generaltranslation?.id;
                        return sourceID === targetID;
                    }
                }
                return false;
            });
        }

        return target.map(targetChild => {
            if (typeof targetChild === 'string') {
                return targetChild;
            }
            else {
                const matchingSource = findMatchingSource(targetChild);
                if (React.isValidElement(matchingSource)) {
                    return renderElement(matchingSource, targetChild);
                }
            }
        })
    }
    
    return source;
}