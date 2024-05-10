'use client'

import React from 'react';

import { getLanguageName, getUserLanguage } from 'generaltranslation';
import { createContext, useEffect, useState, useContext } from 'react'
import I18NComponent from './I18NComponent';

const I18NContext = createContext();
export const useI18NContext = () => useContext(I18NContext);

export default function I18NProvider({
    children,
    projectID = '',
    defaultLanguage = 'en',
    userLanguage = '',
    i18nTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    streaming = false,
    ...languageJSONs
}) {

    userLanguage = userLanguage ? userLanguage : getUserLanguage({ defaultLanguage });
    const translationRequired = (getLanguageName(userLanguage) !== getLanguageName(defaultLanguage));

    const [I18NData, setI18NData] = useState(null);
    useEffect(() => {
        const fetchI18NData = async () => {
            if (userLanguage in languageJSONs) {
                setI18NData(languageJSONs[userLanguage])
            } else {
                try {
                    const response = await fetch(`https://json.gtx.dev/${projectID}/${userLanguage}.json`);
                    const data = await response.json();
                    setI18NData(data);
                } catch (error) {
                    console.log('@generaltranslation/gt-react: No current internationalization found. One will be created dynamically based on your project settings.');
                    setI18NData({});
                }
            }
        }
        if (translationRequired) {
            fetchI18NData()
        }
    }, [projectID, translationRequired, userLanguage, languageJSONs])

    // Gets internationalized content
    // Tries first for local data, then for remote
    const getI18N = async ({ children }) => {
        
        // Parse children for strings to translate
        // Gets I18N data for children of I18NChildren
        // If there is none, creates via server and returns it
        // Text should stream where possible?
        // Returns a component
        // Rules for deciding what to translate:
        // 1. Translate all <h> and <p> tags except those marked with i18n false
        // 2. Translate all additional tags marked with i18n true
        // 3. Return all other components unchanged
        
        // Return component

        return (
            <>
                {
                    React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            // Implementing the rules based on element type and props
                            const { type, props } = child;
                            if ((i18nTags.includes(type) && props.i18n !== false) || props.i18n === true) {
                                // Return translated data if it can be got from I18NData, using a I18NComponent
                                // Else generate it, using an NewI18NComponent
                            }
                            // Return all other components unchanged
                            else return child;
                        }
                        return child;
                    })
                }
            </>
        )
    }

    return (
        <I18NContext.Provider
            value = {{
                defaultLanguage,
                userLanguage,
                translationRequired,
                getI18N
            }}
        >
            {
                (!translationRequired || I18NData) &&
                {children}
            }
        </I18NContext.Provider>
    )
}