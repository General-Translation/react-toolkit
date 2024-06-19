import * as React from 'react'

import I18NConfig from "../config/I18NConfig";
import renderChildren from "../js/renderChildren";
import _I18NResolver from "./_I18NResolver.js";
import generateHash from '../js/generateHash';
import addGTIdentifier from '../js/addGTIdentifier';
import writeChildrenAsObjects from '../js/writeChildrenAsObjects';

const ServerI18N = async ({ 
    children, userLanguage, ...props
}) => {

    const translationRequired = children && I18NConfig.translationRequired(userLanguage);

    if (!translationRequired) {
        return (
            <>
                {children}
            </>
        )
    }

    children = addGTIdentifier(children);

    const I18NSheet = await I18NConfig.getI18NSheet(userLanguage);

    const childrenAsObjects = writeChildrenAsObjects(children);

    const hash = await generateHash(childrenAsObjects);

    const newTranslationRequired = I18NSheet?.[hash] ? false : true;
    if (!newTranslationRequired) {
        const I18NChildren = renderChildren(children, I18NSheet?.[hash]);
        return (
            <>
                {I18NChildren}
            </>
        )
    }

    const I18NChildrenPromise = I18NConfig.translateChildren({ content: childrenAsObjects, targetLanguage: userLanguage, ...props });
    
    const renderMethod = I18NConfig.getRenderMethod();
    if (renderMethod === "replace") { 
        // default render method
        // - returns default language site immediately
        // - replaces text with translation when it is ready
        return (
            <> 
                <_I18NResolver promise={I18NChildrenPromise}>{children}</_I18NResolver>
            </>
        )
    }
    if (renderMethod === "hang") {
        // alternate render method
        // - renders page only when translation is ready
        const I18NChildren = renderChildren(children, await I18NChildrenPromise);
        return (
            <>
                {I18NChildren}
            </>
        )
    }

    return (
        // fallback render method
        // - returns default language site unchanged
        <>
            {children}
        </>
    )

}

export default ServerI18N;