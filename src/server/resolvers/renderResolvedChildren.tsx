'use client'

import React, { ReactElement, ReactNode } from 'react'

type TargetElement = Record<string, any>
type TargetChild = TargetElement | string;
type Target = TargetChild | TargetChild[];

const renderElement = (sourceElement: ReactElement, targetElement: TargetElement): ReactElement => {
    const { props } = sourceElement;
    if (props?.children) {
        // check branches
        // exclude should work like this because the target doesn't have children, but it might be worth a dedicated check
        return React.cloneElement(sourceElement, {
            ...props,
            children: renderResolvedChildren(props.children, targetElement?.props?.children)
        });
    }
    return sourceElement;
}

export default function renderResolvedChildren(
    source: ReactNode, 
    target?: Target | null
): ReactNode {

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

        // catch complex components which lose their added props
        // only relevant on the client side
        const complex = source.filter(sourceChild => {
            if (React.isValidElement(sourceChild)) {
                const { props }: any = sourceChild;
                if (!props.generaltranslation) {
                    return sourceChild;
                }
            }
        });

        return target.map(targetChild => {
            if (typeof targetChild === 'string') {
                return targetChild;
            }
            else {
                const matchingSource = findMatchingSource(targetChild);
                if (React.isValidElement(matchingSource)) {
                    return renderElement(matchingSource, targetChild);
                }
                if (complex.length > 0) {
                    return complex.shift()
                }
            }
        })
    }
    
    return source;
}