'use client'

import { useState, useEffect } from 'react';

// children should just be a string
export default function _I18NStringResolver({
    children, html, I18NPromise
}) {

    const [translation, setTranslation] = useState(null)

    useEffect(() => {
        const resolveI18NPromise = async () => {
            const I18NData = await I18NPromise;
            setTranslation(I18NData?.[html]?.[children])
        }
        resolveI18NPromise();
    }, [I18NPromise])

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