'use server'

import * as React from 'react'

import I18NConfig from "../config/I18NConfig";
import { ComponentNamer, createChildrenString } from './js/createChildrenString';
import renderChildren from "./js/renderChildren";
import _I18NResolver from "./_I18NResolver";

export default async function ServerI18N({ 
    children, userLanguage, ...metadata
}) {

    const translationRequired = I18NConfig.translationRequired(userLanguage);

    if (!translationRequired) {
        return (
            <>
                {children}
            </>
        )
    }
    
    const I18NData = await I18NConfig.getI18NData(userLanguage);

    const html = createChildrenString(children, new ComponentNamer());

    const newTranslationRequired = I18NData?.[html] ? false : true;

    // wrap children if necessary so that it is only one child
    children = React.Children.count(children) === 1 ? children : <React.Fragment>{children}</React.Fragment>;

    if (!newTranslationRequired) {
        return (
            <>
                {renderChildren(children, I18NData?.[html], new ComponentNamer())}
            </>
        )
    }

    const newTranslations = I18NConfig.translateHTML({ html, userLanguage, ...metadata }); // returns a promise

    return (
        <>
            <_I18NResolver promise={newTranslations} html={html}>{children}</_I18NResolver>
        </>
    )

}