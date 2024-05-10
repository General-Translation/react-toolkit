'use client'

import { getLanguageName, getUserLanguage } from 'generaltranslation';
import { createContext, useEffect, useState, useContext } from 'react'
import I18NChildren from './I18NChildren';

const I18NContext = createContext();
export const useI18NContext = () => useContext(I18NContext);

export default function I18NProvider({
    children,
    projectID = '',
    defaultLanguage = 'en',
    userLanguage = '',
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
        
        /*
        if (content in I18NData) {
            return I18NData[content];
        }
        else {
            try {
                const response = await fetch('/api/generaltranslation/internationalize', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        projectID: projectID,
                        defaultLanguage: defaultLanguage,
                        userLanguage: userLanguage,
                        content: content,
                        metadata: metadata
                    })
                });
                const data = await response.json();
                setI18NData(prev => { return {...prev, ...data } });
                return data[content];
            } catch (error) {
                console.error(error);
                return content;
            }
        }
        */
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