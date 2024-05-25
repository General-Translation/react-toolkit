'use server'

import React from 'react'

import { getDomainNext, getUserLanguageNext } from "./headerFunctions";
import ServerI18N from '../components/ServerI18N';

export default function NextI18N({ 
    children
}) {

    const userLanguage = getUserLanguageNext();
    const domain = getDomainNext() || "";

    return (
        <ServerI18N userLanguage={userLanguage} domain={domain}>
            {children}
        </ServerI18N>
    )

}