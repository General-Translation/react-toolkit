'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { renderStrings } from './js/renderStrings';

// children is always just a single child!
export default function _I18NStringResolver({
    children, promise, html
}) {

    const [translation, setTranslation] = useState(null);

    useEffect(() => {
        const resolveI18NPromise = async () => {
            const I18NData = await promise;
            if (I18NData?.[html]) {
                setTranslation(renderStrings(children, I18NData?.[html]));
            }
        }
        resolveI18NPromise();
    }, [promise])

    return (
        <>
            {
                (translation ? true : false)
                ?
                translation
                :
                children
            }
        </>
    )
}