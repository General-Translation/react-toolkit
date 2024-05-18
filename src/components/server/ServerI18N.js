'use server'

import * as React from 'react'

import GT, { getLanguageName } from 'generaltranslation';
import { markedForExclude, markedForI18N } from './js/checkPrimitives';
import _I18NStringResolver from './_I18NStringResolver';
import { createChildrenString, renderStrings } from './js/renderStrings';

const defaultDriver = new GT()

export default async function ServerI18N({
    children,
    projectID = '',
    defaultLanguage = 'en',
    forceUserLanguage = '',
    i18nTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul'],
    remoteSource = true,
    gt = defaultDriver,
    ...languageJSONs
}) {

    console.log(children)

    const userLanguage = forceUserLanguage || defaultLanguage;
    const translationRequired = projectID && (getLanguageName(userLanguage) !== getLanguageName(defaultLanguage)) ? true : false;

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
            const response = await fetch(`https://json.gtx.dev/${projectID}/${userLanguage}`);
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

    if (userLanguage in languageJSONs) {
        I18NData ? languageJSONs[userLanguage] : { ...I18NData, ...languageJSONs[userLanguage] };
    }

    // CREATE HTML STRING FOR IDENTIFICATION

    // CHECKS

    const shouldI18N = (type) => {
        if (i18nTags.includes(type)) return true;
        if (i18nTags.includes(type?.name)) return true;
        else return false;
    };

    // TRAVERSE FOR NEW HTML TO TRANSLATE

    const htmlStrings = [];

    const traverseI18N = (child) => {
        if (React.isValidElement(child)) {   
            const { type, props } = child;
            if (!markedForExclude(type)) {
                if (shouldI18N(type)) {
                    const html = createChildrenString(child);
                    if (!I18NData?.[html]) {
                        htmlStrings.push(html);
                    };
                } else {
                    React.Children.forEach(props.children, currentChild => {
                        return traverseI18N(currentChild)
                    });
                }
            } 
        }
    }

    const traverseChildren = (child) => {
        if (React.isValidElement(child)) {   
            const { type, props } = child;
            if (!markedForExclude(type)) {
                if (markedForI18N(type)) {
                    React.Children.forEach(props.children, currentChild => {
                        return traverseI18N(currentChild)
                    });
                } else {
                    React.Children.forEach(props.children, currentChild => {
                        return traverseChildren(currentChild)
                    });
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
        translations = gt.translateHTML({
            projectID,
            userLanguage,
            defaultLanguage,
            content: htmlStrings
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

    const renderI18N = (child) => {
        if (React.isValidElement(child)) {   
            const { type, props } = child;
            if (markedForExclude(type)) {
                return child;
            } 
            else if (shouldI18N(type)) {
                const html = createChildrenString(child);
                if (I18NData?.[html]) {
                    return renderStrings(child, I18NData?.[html]);
                } else {
                    return <_I18NStringResolver promise={translations} html={html}>{child}</_I18NStringResolver>
                };
            } 
            else {
                if (props.children) {
                    return React.cloneElement(child, {
                        ...props,
                        children: React.Children.toArray(props.children).map(currentChild => renderI18N(currentChild))
                    });
                }
                else {
                    return child;
                }
            }
        } else {
            return child;
        }
    }

    const renderChildren = (child) => {
        if (React.isValidElement(child)) {
            const { type, props } = child;
            if (markedForExclude(type)) {
                return child;
            }
            else if (markedForI18N(type)) {
                return renderI18N(child);
            }
            else {
                if (props.children) {
                    return React.cloneElement(child, {
                        ...props,
                        children: React.Children.toArray(props.children).map(currentChild => renderChildren(currentChild))
                    });
                }
                else {
                    return child;
                }
            }
        } else {
            return child;
        }
    }

    const I18NChildren = React.Children.toArray(children).map(child => renderChildren(child))

    return (
        <>
            {I18NChildren}
        </>
    )
    
}

global.React = React;