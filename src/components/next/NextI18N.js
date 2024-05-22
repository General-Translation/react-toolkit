'use server'

import { getDomainNext, getUserLanguageNext } from '../../functions/next/headerFunctions';
import ServerI18N from '../server/ServerI18N';

export default async function NextI18N({
    children,
    forceUserLanguage = '',
    ...other
}) {

    const userLanguage = forceUserLanguage || getUserLanguageNext() || defaultLanguage;
    const domain = getDomainNext() || "";

    return (
        <ServerI18N 
            forceUserLanguage={userLanguage}
            url={domain}
            {...other}
        >
            {children}
        </ServerI18N>
    )
    
}