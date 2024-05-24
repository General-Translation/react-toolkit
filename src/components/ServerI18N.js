'use server'

import * as React from 'react'

import I18NConfig from "../config/I18NConfig";
import { ComponentNamer, createChildrenString } from './js/createChildrenString';
import renderChildren from "./js/renderChildren";
import _I18NResolver from "./_I18NResolver";

export default async function ServerI18N({ 
    children, ...props
}) {

    const translationRequired = I18NConfig.translationRequired;

    console.log('translation required:', translationRequired)
    if (!translationRequired) {
        return (
            <React.Fragment {...props}>
                {children}
            </React.Fragment>
        )
    }

    console.log('fetching I18N data...')
    const I18NData = await I18NConfig.getI18NData();

    const htmlString = createChildrenString(children, new ComponentNamer());

    const newTranslationRequired = I18NData?.[htmlString] ? false : true;

    // wrap children if necessary so that it is only one child
    children = React.Children.count(children) === 1 ? children : <React.Fragment>{children}</React.Fragment>;

    if (!newTranslationRequired) {
        return (
            <React.Fragment {...props}>
                {renderChildren(children, I18NData?.[htmlString], new ComponentNamer())}
            </React.Fragment>
        )
    }

    const newTranslations = I18NConfig.translate({ htmlString }); // returns a promise

    return (
        <React.Fragment {...props}>
            <_I18NResolver promise={newTranslations} htmlString={htmlString}>{children}</_I18NResolver>
        </React.Fragment>
    )

}