'use client'

import React from 'react';
import { getLanguageName, getUserLanguage } from 'generaltranslation';
import { createContext, useEffect, useState, useContext } from 'react'
import createChildrenString from '../../js/createChildrenString';

import _I18NComponent from './_I18NComponent';

const I18NContext = createContext();
export const useI18NContext = () => useContext(I18NContext);

export default function I18NProvider({
    children,
    projectID = '',
    defaultLanguage = 'en',
    userLanguage = '',
    i18nTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ...languageJSONs
}) {

    userLanguage = userLanguage ? userLanguage : getUserLanguage({ defaultLanguage });
    const translationRequired = projectID && (getLanguageName(userLanguage) !== getLanguageName(defaultLanguage)) ? true : false;

    // Gets internationalized content
    // Tries first for local data, then for remote
    const [I18NData, setI18NData] = useState(null);
    useEffect(() => {
        const fetchI18NData = async () => {
            if (userLanguage in languageJSONs) {
                setI18NData(languageJSONs[userLanguage]);
            }
            else {
                try {
                    const response = await fetch(`https://json.gtx.dev/${projectID}/${userLanguage}`);
                    const data = await response.json();
                    setI18NData(data);
                } catch (error) {
                    console.log('@generaltranslation/react: No current internationalization found. One will be created dynamically based on your project settings.');
                    setI18NData({});
                }
            }
        }
        if (translationRequired) {
            fetchI18NData()
        }
    }, [projectID, translationRequired, userLanguage])

    // Create the appropriate children
    const getI18N = (children) => {
        return (
            <>
                {
                    React.Children.map(children, child => {
                        if (React.isValidElement(child)) {   
                            // Implementing the rules based on element type and props
                            const { type, props } = child;
                            if ((i18nTags.includes(type) && props?.i18n !== "false") || props?.i18n === "true") {
                                const childrenAsString = createChildrenString(child);
                                return (
                                    <_I18NComponent 
                                        htmlAsString={childrenAsString} 
                                        I18NStrings={I18NData?.[childrenAsString]}
                                    >
                                        { child }
                                    </_I18NComponent>
                                );
                            }
                            else if (props?.children) return recursiveGetI18N(props.children)
                            // Base case, return unchanged
                            else return child;
                        } else {
                            return child;
                        }
                    })
                }
            </>
        )
    };
    
    return (
        <I18NContext.Provider
            value = {{
                defaultLanguage,
                userLanguage,
                translationRequired,
                projectID,
                I18NData,
                getI18N
            }}
        >
            {
                (!translationRequired || I18NData) &&
                children
            }
        </I18NContext.Provider>
    )
}