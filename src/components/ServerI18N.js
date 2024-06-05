'use server'

import * as React from 'react'

import I18NConfig from "../config/I18NConfig";
import renderChildren from "./js/renderChildren";
import _I18NResolver from "./_I18NResolver";
import generateHash from './js/generateHash';
import { markedForExclude } from './js/checkPrimitives';

const addGeneralTranslationIdentifierRecursively = (child, indexObj) => {
    if (React.isValidElement(child)) {
        const currentID = indexObj.index;
        indexObj.index = indexObj.index + 1;
        const { props } = child;
        if (props?.children) {
            return React.cloneElement(child, {
                ...props,
                generaltranslation: currentID,
                children: React.Children.map(props.children, (nestedChild) =>
                    addGeneralTranslationIdentifierRecursively(nestedChild, indexObj)
                )
            });
        } else {
            return React.cloneElement(child, {
                ...props,
                generaltranslation: currentID
            });
        }
    }
    return child;
};

const sanitizeChildren = (children) => {
    return React.Children.map(children, child => {
        if (markedForExclude(child)) {
            return React.createElement('span', {
                generaltranslation: child.props.generaltranslation,
                excludeI18N: true
            })
        } else {
            return child;
        }
    })
};

export default async function ServerI18N({ 
    children, userLanguage, ...metadata
}) {

    const translationRequired = I18NConfig.translationRequired(userLanguage);

    if (!translationRequired || !children) {
        return (
            <>
                {children}
            </>
        )
    }

    let indexObj = { index: 0 };
    children = React.Children.map(children, child => {
        return addGeneralTranslationIdentifierRecursively(child, indexObj)
    });

    const I18NData = null // await I18NConfig.getI18NData(userLanguage);

    const sanitizedChildren = sanitizeChildren(children);
    const hash = await generateHash(sanitizedChildren);

    const newTranslationRequired = I18NData ? I18NData[hash] ? false : true : true;

    if (!newTranslationRequired) {
        return (
            <>
                {renderChildren(children, I18NData?.[hash])}
            </>
        )
    }

    const I18NChildrenPromise = I18NConfig.translateReact({ content: sanitizedChildren, hash, userLanguage, ...metadata });

    return (
        <>
            <_I18NResolver promise={I18NChildrenPromise}>{children}</_I18NResolver>
        </>
    )

}