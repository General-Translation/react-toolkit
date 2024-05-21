'use server'

import * as React from 'react'

import GT, { getLanguageName } from 'generaltranslation';
import { markedForExclude, markedForI18N } from './js/checkPrimitives';
import _I18NStringResolver from './_I18NStringResolver';
import { ComponentNamer, createChildrenString, renderStrings } from './js/renderStrings';

const defaultDriver = new GT()
const defaultProjectID = (typeof process !== 'undefined' ? process?.env?.GT_PROJECT_ID : '')

export default async function ServerI18N({
    children,
    projectID,
    page = 'default',
    defaultLanguage = 'en',
    forceUserLanguage = '',
    remoteSource = true,
    gt = defaultDriver,
    ...metadata
}) {

    if (!projectID) projectID = defaultProjectID;
    
    const userLanguage = forceUserLanguage || defaultLanguage;
    const translationRequired = projectID && page && (getLanguageName(userLanguage) !== getLanguageName(defaultLanguage)) ? true : false;

    if (!translationRequired) {
        return (
            <>
                {children}
            </>
        )
    }

    let I18NData;

    if (remoteSource) {
        try {
            const response = await fetch(`https://json.gtx.dev/${projectID}/${page}/${userLanguage}`);
            I18NData = await response.json();
        } catch (error) {
            console.error(error)
            return (
                <>
                    {children}
                </>
            )
        }
    }

    if (userLanguage in metadata) {
        I18NData ? metadata[userLanguage] : { ...I18NData, ...metadata[userLanguage] };
    }

    // TRAVERSE FOR NEW HTML TO TRANSLATE

    const htmlStrings = [];

    const traverseChildren = (child) => {
        if (React.isValidElement(child)) {   
            const { type, props } = child;
            if (!markedForExclude(type)) {
                if (props.children) {
                    if (markedForI18N(type)) {
                        return React.Children.forEach(props.children, currentChild => {
                            const html = createChildrenString(currentChild, new ComponentNamer());
                            if (!I18NData[html]) {
                                htmlStrings.push(html);
                            };
                        });
                    } else {
                        return React.Children.forEach(props.children, currentChild => {
                            return traverseChildren(currentChild)
                        });
                    }
                }
            } 
            
        }
    }

    React.Children.forEach(children, child => {
        traverseChildren(child); // every child is searched sequentially
    });
    
    // TRANSLATE MISSING HTML

    let translations;
    if (htmlStrings.length > 0) {

        let metadataToSend = {};

        if (metadata.hasOwnProperty('url')) {
            metadataToSend.url = metadata.url;
        }

        console.log(JSON.stringify({
            projectID,
            page,
            userLanguage,
            defaultLanguage,
            content: htmlStrings,
            ...metadataToSend
        }))

        translations = gt.translateHTML({
            projectID,
            page,
            userLanguage,
            defaultLanguage,
            content: htmlStrings,
            ...metadataToSend
        });
    };

    // RENDERING

    // an example of what the I18NData const could look like
    // (translations is just the latest additions to I18NData, so it looks similar)
    /* 
        {
            "<p><b>Ron's <i>ill</i></b> mother</p>": [
                "La madre",
                {
                    "<b>Ron's <i>ill</i></b>":
                    [
                        {
                            "<i>ill</i>": [
                                "enferma"
                            ]
                        },
                        "de Ron"
                    ]
                }
            ]
        }
    */

    const renderChildren = (child) => {
        if (React.isValidElement(child)) {
            const { type, props } = child;
            if (markedForExclude(type)) {
                return child;
            }
            if (props.children) {
                if (markedForI18N(type)) {
                    React.Children.forEach(props.children, currentChild => {
                        const html = createChildrenString(currentChild, new ComponentNamer());
                        if (I18NData?.[html]) {
                            return renderStrings(currentChild, I18NData?.[html]);
                        } else {
                            return <_I18NStringResolver promise={translations} html={html}>{currentChild}</_I18NStringResolver>
                        };
                    });
                }
                return React.cloneElement(child, {
                    ...props,
                    children: React.Children.toArray(props.children).map((currentChild, index) => {
                        return <React.Fragment key={index}>{renderChildren(currentChild)}</React.Fragment>
                    })
                });
                    
            }
        }
        return child;
    }

    const I18NChildren = React.Children.toArray(children).map((child, index) => {
        return <React.Fragment key={index}>{renderChildren(child)}</React.Fragment>
    })

    return (
        <>
            {I18NChildren}
        </>
    )
    
}

global.React = React;