'use server'

import React from 'react'

import { getDomainNext, getUserLanguageNext } from "./headerFunctions";
import I18NConfig from "../config/I18NConfig";
import ServerI18N from '../components/ServerI18N';

export default async function NextI18N({ 
    children, ...props
}) {

    const userLanguage = I18NConfig.userLanguage || getUserLanguageNext();
    const domain = getDomainNext() || "";

    I18NConfig.set({
        userLanguage: userLanguage,
        domain: domain,
    })

    return (
        <ServerI18N {...props}>
            {children}
        </ServerI18N>
    )

}