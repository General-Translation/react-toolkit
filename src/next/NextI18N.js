'use server'

import React from 'react'

import { getDomainNext, getUserLanguageNext } from "./headerFunctions";
import I18NConfig from "../config/I18NConfig";
import ServerI18N from '../components/ServerI18N';
import { headers } from 'next/headers'

export default async function NextI18N({ 
    children, ...props
}) {

    const userLanguage = getUserLanguageNext();
    const domain = getDomainNext() || "";

    if (!I18NConfig.userLanguage) {
        I18NConfig.set({
            userLanguage: userLanguage,
            domain: domain,
        })
    } else {
        I18NConfig.set({
            domain: domain
        })
    }
    const headerList = headers();
    console.log(headerList.get('accept-language'))

    return (
        <ServerI18N {...props}>
            {children}
        </ServerI18N>
    )

}