'use client'

import React from 'react'

import { useEffect, useState } from "react";
import renderChildren from "./js/renderChildren";
import { ComponentNamer } from "./js/createChildrenString";

export default function _I18NResolver({
    children, promise, html
}) {

    const [translation, setTranslation] = useState(null);

    useEffect(() => {
        const resolveI18NPromise = async () => {
            const I18NData = await promise;
            if (I18NData?.[html]) {
                setTranslation(renderChildren(children, I18NData?.[html], new ComponentNamer()));
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
