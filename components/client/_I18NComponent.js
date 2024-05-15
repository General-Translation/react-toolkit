'use client'

import React, { useEffect, useState } from 'react';
import { useI18NContext } from './I18NProvider';
import fetchManager from '../../js/fetchManager';

export default function _I18NComponent({ children, htmlAsString, I18NStrings }) {
    const { projectID, userLanguage, defaultLanguage } = useI18NContext();
    const [I18NChildren, setI18NChildren] = useState(null);

    useEffect(() => {
        const gatherStrings = (node, strings) => {
            if (typeof node === 'string') {
                if (!I18NStrings?.[node]) {
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
                    const params = {
                        projectID,
                        html: htmlAsString,
                        strings: stringsToTranslate,
                        defaultLanguage,
                        userLanguage
                    };
                    const result = await fetchManager.fetchTranslations(params);
                    if (typeof result === 'object') {
                        translations = { ...translations, ...result };
                    }
                } catch (error) {
                    console.error('Error creating new translations:', error);
                    translations = { ...Object.fromEntries(stringsToTranslate.map(s => [s, s])), ...translations };
                }
            }

            const translated = await Promise.all(
                React.Children.toArray(children).map(child => translateNodes(child, translations))
            );
            setI18NChildren(translated);
        };

        processChildren();
    }, [children, I18NStrings]);

    return (
        <> 
            {I18NChildren}
        </>
    );
}