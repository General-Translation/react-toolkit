import React from 'react'

import { getDomainNext, getUserLanguageNext } from "./headerFunctions";
import ServerI18N from '../server/ServerI18N';

export default function NextI18N({ 
    children, ...metadata
}) {

    const userLanguage = getUserLanguageNext();
    const domain = getDomainNext() || "";

    return (
        <ServerI18N userLanguage={userLanguage} domain={domain} {...metadata}>
            {children}
        </ServerI18N>
    )

}