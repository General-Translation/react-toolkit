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

    let indexObj = { index: 1 };
    children = React.Children.map(children, child => {
        return addGeneralTranslationIdentifierRecursively(child, indexObj)
    });

    const I18NData = null // await I18NConfig.getI18NData(userLanguage);

    const hash = await generateHash(children);

    const newTranslationRequired = I18NData ? I18NData[hash] ? false : true : true;

    if (!newTranslationRequired) {
        return (
            <>
                {renderChildren(children, I18NData?.[hash])}
            </>
        )
    }

    const I18NChildrenPromise = I18NConfig.translateReact({ content: children, hash, userLanguage, ...metadata });

    return (
        <>
            <_I18NResolver promise={I18NChildrenPromise}>{children}</_I18NResolver>
        </>
    )

}