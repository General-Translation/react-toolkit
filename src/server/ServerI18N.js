import * as React from 'react'

import I18NConfig from "../config/I18NConfig";
import renderChildren from "../components/js/renderChildren";
import _I18NResolver from "../components/_I18NResolver";
import generateHash from '../components/js/generateHash';

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

const sanitizeChild = (child) => {
    if (React.isValidElement(child)) {
        const { type, props } = child;
        if (props) {
            let finalProps = {};
            if (props.children) {
                finalProps.children = React.Children.map(props.children, nestedChild => sanitizeChild(nestedChild))
            }
            if (props.generaltranslation) {
                finalProps.generaltranslation = props.generaltranslation;
            }
            return {
                type: typeof type === 'string' ? type : 'function',
                props: finalProps
            }
        }
        return {
            type: type,
        }
    }
    return child;
}


export default async function ServerI18N({ 
    children, userLanguage, ...props
}) {

    const translationRequired = I18NConfig.translationRequired(userLanguage);

    if (!translationRequired || !children) {
        return (
            <>
                {children}
            </>
        )
    }

    let indexObj = { index: 1 };
    children = React.Children.map(children, child => addGeneralTranslationIdentifierRecursively(child, indexObj));

    const I18NData = await I18NConfig.getI18NData(userLanguage);

    const sanitizedChildren = React.Children.map(children, child => sanitizeChild(child))
    const hash = await generateHash(sanitizedChildren);

    const newTranslationRequired = I18NData?.[hash] ? false : true;
    if (!newTranslationRequired) {
        return (
            <>
                {renderChildren(children, I18NData?.[hash])}
            </>
        )
    }

    const I18NChildrenPromise = I18NConfig.translateChildren({ content: sanitizedChildren, targetLanguage: userLanguage, ...props });

    return (
        <>
            <_I18NResolver promise={I18NChildrenPromise}>{children}</_I18NResolver>
        </>
    )

}