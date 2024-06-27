import React, { ReactNode } from 'react'

import I18NConfig from "../config/I18NConfig";
import _I18NResolver from "./resolvers/_I18NResolver.js";
import addGTIdentifier from './helpers/addGTIdentifier.js';
import writeChildrenAsObjects from './helpers/writeChildrenAsObjects.js';
import generateHash from './helpers/generateHash.js';
import renderChildren from './renderChildren';

interface ServerI18NProps {
    children: ReactNode;
    userLanguage: string;
    metadata: Record<string, any>,
    [key: string]: any; // This allows additional metadata props with any key and type
}

export default async function ServerI18N({ 
    children, userLanguage, ...metadata
}: ServerI18NProps) {

    const translationRequired: boolean = (children && I18NConfig.translationRequired(userLanguage)) ? true : false;
    if (!translationRequired) {
        return (
            <>
                {children}
            </>
        )
    }

    const I18NSheetPromise = I18NConfig.getI18NSheet(userLanguage);

    const taggedChildren = addGTIdentifier(children);

    const childrenAsObjects = writeChildrenAsObjects(taggedChildren);

    const hash: string = await generateHash(childrenAsObjects);
    const I18NSheet: Record<string, any> = await I18NSheetPromise;

    const translationExists: boolean = I18NSheet[hash] ? true : false;

    if (translationExists) {
        const I18NChildren = await renderChildren(taggedChildren, I18NSheet[hash]);
        return (
            <>
                {I18NChildren}
            </>
        )
    }

    const I18NChildrenPromise = I18NConfig.translateChildren({ children: childrenAsObjects, targetLanguage: userLanguage, ...metadata });

    // RENDERING
    return (
        <> 
            <_I18NResolver promise={I18NChildrenPromise}>{taggedChildren}</_I18NResolver>
        </>
    )
    
}