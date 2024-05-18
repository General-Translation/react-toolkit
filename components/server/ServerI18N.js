'use server'

import React from 'react';

import GT, { getLanguageName } from 'generaltranslation';
import _I18NStringResolver from './_I18NStringResolver';
const defaultDriver = new GT()

function deepMerge(obj1, obj2) {
    for (let key in obj2) {
        if (obj2[key] instanceof Object && key in obj1) {
            obj1[key] = deepMerge(obj1[key], obj2[key]);
        } else {
            obj1[key] = obj2[key];
        }
    }
    return obj1;
}

export default async function ServerI18N({
    children,
    projectID = '',
    defaultLanguage = 'en',
    forceUserLanguage = '',
    i18nTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul'],
    excludeTags = ["ExcludeI18N"],
    remoteSource = true,
    gt = defaultDriver,
    ...languageJSONs
}) {

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
                return `<${type?.displayName || type?.name || type}>${currentChildren}</${type?.displayName || type?.name || type}>`;
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
        const I18NStrings = I18NData[html];
        if (typeof child === 'string' && !I18NStrings?.[child]) {
            newStrings[html] = newStrings[html] || [];
            const strings = newStrings[html];
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

    let newTranslations;

    if (Object.keys(newStrings).length > 0) {
        newTranslations = gt.translateHTML({
            projectID,
            userLanguage,
            defaultLanguage,
            content: newStrings
        })
        /*if (typeof newTranslations === 'object') {
           translations = deepMerge(newTranslations, I18NData);
        }*/
    };

    // RENDER

    // Go through and replace strings
    const renderStrings = (child, html) => {
        if (typeof child === 'string') {
            if (translations?.[html]?.[child]) {
                return translations[html][child]
            } 
            else if (newStrings?.[html]?.includes(child)) {
                return <_I18NStringResolver html={html} I18NPromise={newTranslations}>{child}</_I18NStringResolver>
            }
            else {
                return child;
            }
        }
        else if (React.isValidElement(child)) {
            const { type, props } = child;
            if (excludeI18N(type)) {
                return child;
            } else {
                if (props.children) {
                    return React.cloneElement(child, {
                        ...props,
                        children: React.Children.toArray(props.children).map(currentChild => renderStrings(currentChild, html))
                    });
                }
                else {
                    return child;
                }
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
                return renderStrings(child, html)
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

    const I18NChildren = renderChildren(children);

    return (
        <>
            {I18NChildren}
        </>
    )
    
}