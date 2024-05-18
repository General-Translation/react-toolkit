'use client'

import React, { useCallback } from 'react';
import { getLanguageName } from 'generaltranslation';
import { createContext, useEffect, useState, useContext } from 'react'

const I18NContext = createContext();
export const useI18NContext = () => useContext(I18NContext);

export default function I18NProvider({
    children,
    projectID = '',
    defaultLanguage = 'en',
    forceUserLanguage = '',
    i18nTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul'],
    excludeTags = ["ExcludeI18N"],
    remoteSource = true,
    ...languageJSONs
}) {

    // PARAMETERS

    const [userLanguage, setUserLanguage] = useState(forceUserLanguage);
    const [translationRequired, setTranslationRequired] = useState(projectID ? true : false);
    useEffect(() => {
        const getUserLanguage = () => {
            let newUserLanguage = '';
            if (typeof window !== 'undefined') {
                newUserLanguage = window.navigator.language.split("-")[0];
            } else if (typeof navigator !== 'undefined') {
                newUserLanguage = navigator.language.split("-")[0];
            } else {
                newUserLanguage = defaultLanguage;
            }
            setUserLanguage(newUserLanguage);
            setTranslationRequired(projectID && (getLanguageName(newUserLanguage) !== getLanguageName(defaultLanguage)));
        }
        if (!userLanguage) {
            getUserLanguage()
        } else {
            setTranslationRequired(projectID && (getLanguageName(newUserLanguage) !== getLanguageName(defaultLanguage)));
        }
    }, [projectID, defaultLanguage]);

    // FETCH EXISTING TRANSLATION SHEET

    // Gets internationalized content
    // Tries first for local data, then for remote
    const [I18NData, setI18NData] = useState(null);
    useEffect(() => {
        const fetchI18NData = async () => {
            let data = {};
            if (remoteSource) {
                try {
                    const response = await fetch(`https://json.gtx.dev/${projectID}/${userLanguage}`);
                    data = await response.json();
                } catch (error) {
                    console.log('@generaltranslation/react: No current internationalization found. One will be created dynamically based on your project settings.');
                }
            }
            if (userLanguage in languageJSONs) {
                data = { ...data, ...languageJSONs[userLanguage] };
            }
            if (typeof data === 'object') { 
                setI18NData(data);
            } else {
                setI18NData({})
            }
        }
        if (translationRequired && userLanguage) {
            fetchI18NData()
        }
    }, [projectID, translationRequired, userLanguage]);

    // CHECKS

    const excludeI18N = useCallback((type) => {
        if (excludeTags.includes(type)) return true;
        if (excludeTags.includes(type?.name)) return true;
        else return false;
    }, []);
    const includeI18N = useCallback((type) => {
        if (i18nTags.includes(type)) return true;
        if (i18nTags.includes(type?.name)) return true;
        else return false;
    }, []);
    const markedForI18N = useCallback((type) => type?.name === 'I18N', []);

    // CREATE HTML STRING FOR IDENTIFICATION

    const createChildrenString = useCallback((children) => {
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
    }, [excludeI18N]);

    const [I18NChildren, setI18NChildren] = useState()

    // RENDER

    // Go through and replace strings
    const renderStrings = useCallback((child, I18NStrings) => {
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
    }, [excludeI18N])

    // Go through and replace in appropriate tags
    const renderI18N = useCallback((child) => {
        if (React.isValidElement(child)) {   
            const { type, props } = child;
            if (excludeI18N(type)) {
                return child;
            } 
            else if (includeI18N(type)) {
                const html = createChildrenString(child);
                return renderStrings(child, I18NData[html])
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
    }, [excludeI18N, includeI18N, createChildrenString, renderStrings, I18NData]);

    // Go through and find I18Ns, ignoring ExcludeI18Ns
    const renderChildren = useCallback((child) => {
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
    }, [excludeI18N, markedForI18N, renderI18N]);
    
    useEffect(() => {
        setI18NChildren(renderChildren(children));
    }, [children, I18NData])

    // IMPORTANT!
    // Children should not load without I18NData
    // I18NData should not exist without userLanguage
    
    return (
        <I18NContext.Provider
            value = {{
                projectID,
                defaultLanguage,
                userLanguage,
                translationRequired,
                I18NData
            }}
        >
            {
                translationRequired
                ?
                I18NChildren ? I18NChildren : <></>
                :
                children
            }
        </I18NContext.Provider>
    )
}