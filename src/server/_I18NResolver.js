'use client'

// deprecated

import React from 'react'
import { useEffect, useState } from "react";
import renderChildren from '../js/renderChildren';

export default function _I18NResolver({
    children, promise
}) {

    const [currentChildren, setCurrentChildren] = useState(children);

    useEffect(() => {
        const resolveI18NPromise = async () => {
            const I18NChildren = await promise;
            if (I18NChildren) {
                setCurrentChildren(renderChildren(children, I18NChildren));
            };
        }
        resolveI18NPromise();
    }, [promise])

    return (
        <>
            {currentChildren}
        </>
    )

}
