'use client'

import React from 'react'
import { useEffect, useState } from "react";
import renderResolvedChildren from './renderResolvedChildren';

export default function _I18NResolver({
    children, promise, ...props
}: any) {

    const [currentChildren, setCurrentChildren] = useState(children);

    useEffect(() => {
        const resolveI18NPromise = async () => {
            const I18NChildren = await promise;
            if (I18NChildren) {
                setCurrentChildren(renderResolvedChildren(children, I18NChildren))
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
