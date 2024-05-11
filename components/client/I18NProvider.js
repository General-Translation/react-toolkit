'use client'

import React from 'react';
import { getLanguageName, getUserLanguage } from 'generaltranslation';
import { createContext, useEffect, useState, useContext } from 'react'
import _I18NComponent from './_I18NComponent';

function createChildrenString(children) {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const { type, props } = child;
        let currentChildren = '';
        if (props.i18n !== "false") {
            Object.entries(props)
            .map(([key, value]) => {
                if (key === 'children') {
                    currentChildren += createChildrenString(value);
                    return ''
                }
            })
            .join('');
        }
        return `<${type.displayName || type.name || type}>${currentChildren}</${type.displayName || type.name || type}>`;
      }
      return child?.toString() || '';
    }).join('');
}

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

    const [I18NData, setI18NData] = useState(null);
    useEffect(() => {
        const fetchI18NData = async () => {
            if (userLanguage in languageJSONs) {
                setI18NData(languageJSONs[userLanguage]);
            }
            else {
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
    }, [projectID, translationRequired, userLanguage])

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
                                        projectID={projectID} 
                                        htmlAsString={childrenAsString} 
                                        I18NStrings={I18NData?.[childrenAsString]}
                                        defaultLanguage={defaultLanguage}
                                        userLanguage={userLanguage}
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
    }

    // Gets internationalized content
    // Tries first for local data, then for remote
    

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
                children
            }
        </I18NContext.Provider>
    )
}