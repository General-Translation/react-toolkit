'use server'

import { headers } from 'next/headers'
import { getLanguageName } from 'generaltranslation';
import React from 'react';

export default async function NextI18N({
    children,
    projectID = '',
    defaultLanguage = 'en',
    forceUserLanguage = '',
    i18nTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    excludeTags = ["ExcludeI18N"],
    remoteSource = true,
    ...languageJSONs
}) {
    
    const languages = headers()?.get('accept-language');
    const userLanguage = forceUserLanguage || languages?.split(',')?.[0]?.slice(0, 2) || defaultLanguage;
    
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
            console.log(error)
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

    const createChildrenString = (children) => {
        return React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            const { type, props } = child;
            let currentChildren = '';
            if (excludeI18N(type)) {
                return `{variable}`
            } else {
                Object.entries(props)
                .map(([key, value]) => {
                    if (key === 'children') {
                        currentChildren += createChildrenString(value);
                        return ''
                    }
                })
                .join('');
                return `<${type.displayName || type?.name || type}>${currentChildren}</${type?.displayName || type?.name || type}>`;
            }
          }
          return child?.toString() || '';
        }).join('');
    }

    // CHECKS

    const excludeI18N = (type) => {
        if (excludeTags.includes(type)) return true;
        if (excludeTags.includes(type?.name)) return true;
        else return false;
    };
    const includeI18N = (type) => {
        if (i18nTags.includes(type)) return true;
        if (i18nTags.includes(type?.name)) return true;
        else return false;
    };
    const markedForI18N = (type) => type?.name === 'I18N';

    // TRAVERSE FOR NEW TRANSLATIONS

    const newStrings = {}

    // Go through and collate strings
    const traverseStrings = (child, html) => {
        const strings = newStrings[html];
        const I18NStrings = I18NData[html];
        if (typeof child === 'string' && !I18NStrings?.[child]) {
            strings.push(child);
        } 
        else if (React.isValidElement(child)) {
            const { type, props } = child;
            if (!excludeI18N(type)) {
                React.Children.forEach(props.children, currentChild => {
                    return traverseStrings(currentChild, html);
                });
            }
        }
    }

    // Go through I18Ns for matching children
    const traverseI18N = (child) => {
        if (React.isValidElement(child)) {   
            const { type, props } = child;
            if (excludeI18N(type)) {
                return;
            } 
            else if (includeI18N(type)) {
                const html = createChildrenString(child);
                newStrings[html] = newStrings[html] || [];
                traverseStrings(child, html);
            } 
            else {
                React.Children.forEach(props.children, currentChild => {
                    return traverseI18N(currentChild)
                });
            }
        }
    }

    // Go through and find I18Ns, ignoring ExcludeI18Ns
    const traverseChildren = (child) => {
        if (React.isValidElement(child)) {   
            const { type, props } = child;
            if (excludeI18N(type)) {
                return;
            } 
            else if (markedForI18N(type)) {
                React.Children.forEach(props.children, currentChild => {
                    return traverseI18N(currentChild)
                    /*if (typeof currentChild === 'string') {
                        newStrings[currentChild] = [currentChild];
                    } else {
                        return traverseI18N(currentChild)
                    }*/
                });
            } 
            else {
                React.Children.forEach(props.children, currentChild => {
                    return traverseChildren(currentChild)
                });
            }
        }
    }

    traverseChildren(children);
    
    // TRANSLATE MISSING STRINGS

    let translations = I18NData;
    try {
        const response = await fetch();
        const result = await response.json();
        translations = { ...I18NData, ...result };
    } catch (error) {
        console.log(error);
    }
    
    // RENDER

    // Go through and replace strings
    const renderStrings = (child, I18NStrings) => {
        if (typeof child === 'string') {
            return I18NStrings?.[child] || child;
        }
        else if (React.isValidElement(child)) {
            const { type, props } = child;
            if (excludeI18N(type)) {
                return child;
            } else {
                return React.cloneElement(child, {
                    ...props,
                    children: React.Children.toArray(props.children).map(currentChild => renderStrings(currentChild, I18NStrings))
                });
            }
        } 
        else {
            return child;
        }
    }

    // Go through and replace in appropriate tags
    const renderI18N = (child) => {
        if (React.isValidElement(child)) {   
            const { type, props } = child;
            if (excludeI18N(type)) {
                return child;
            } 
            else if (includeI18N(type)) {
                const html = createChildrenString(child);
                return renderStrings(child, translations[html])
            } 
            else {
                return React.cloneElement(child, {
                    ...props,
                    children: React.Children.toArray(props.children).map(currentChild => renderI18N(currentChild))
                });
            }
        } 
        else {
            return child;
        }
    }

    // Go through and find I18Ns, ignoring ExcludeI18Ns
    const renderChildren = (child) => {
        if (React.isValidElement(child)) {
            const { type, props } = child;
            if (excludeI18N(type)) {
                return child;
            }
            else if (markedForI18N(type)) {
                return renderI18N(child);
            }
            else {
                return React.cloneElement(child, {
                    ...props,
                    children: React.Children.toArray(props.children).map(currentChild => renderChildren(currentChild))
                });
            }
        } else {
            return child;
        }
    }

    const I18NChildren = React.Children.toArray(children).map(child => renderChildren(child));

    return (
        <>
            {I18NChildren}
        </>
    )
    
}