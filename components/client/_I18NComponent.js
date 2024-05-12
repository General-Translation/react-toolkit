'use client'

import React from 'react'
import { useEffect, useState } from "react"

export default function _I18NComponent({
    children, projectID, htmlAsString, I18NStrings, defaultLanguage, userLanguage
}) {

    // I18N component
    // Parse children for strings to translate
    // Replaces string with I18NStrings[string]
    // If there is none, fetches a new string via API

    const [I18NChildren, setI18NChildren] = useState(null)

    useEffect(() => {
        
        const gatherStrings = (node, strings) => {
            if (typeof node === 'string') {
                if (!I18NStrings?.[node] && !strings.includes(node)) {
                    strings.push(node);
                }
            } else if (React.isValidElement(node)) {
                React.Children.forEach(node.props.children, child => {
                    if (node?.props?.i18n !== "false") return gatherStrings(child, strings);
                });
            }
        };

        const translateNodes = async (node, translations) => {
            if (typeof node === 'string') {
                return translations[node] || node;
            } else if (React.isValidElement(node)) {
                return React.cloneElement(node, {
                    ...node.props,
                    children: await Promise.all(
                        React.Children.toArray(node.props.children).map(child => translateNodes(child, translations))
                    )
                });
            } else {
                return node;
            }
        };

        const processChildren = async () => {
            
            let stringsToTranslate = [];
            gatherStrings(children, stringsToTranslate);

            let translations = { ...I18NStrings };
            if (stringsToTranslate.length > 0) {
                try {
                    const response = await fetch('api/generaltranslation', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            projectID: projectID,
                            html: htmlAsString,
                            strings: stringsToTranslate,
                            defaultLanguage: defaultLanguage,
                            userLanguage: userLanguage
                        })
                    });
                    const result = await response.json();
                    translations = { ...translations, ...result };
                } catch (error) {
                    console.error('Error creating new translations:', error);
                    translations = { ...Object.fromEntries(strings.map(s => [s, s])), ...translations };
                }
            }
            const translated = await Promise.all(
                React.Children.toArray(children).map(child => translateNodes(child, translations))
            );
            setI18NChildren(translated);
        };

        processChildren();
    }, [children, I18NStrings])

    return (
        <> 
            {
                (I18NChildren ? true : false) &&
                I18NChildren
            }
        </>
    )

}