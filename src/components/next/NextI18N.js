'use server'

import { headers } from 'next/headers'
import ServerI18N from '../server/ServerI18N';

export default async function NextI18N({
    children,
    forceUserLanguage = '',
    ...other
}) {

    const headerList = headers();
    
    const languages = headerList?.get('accept-language');
    const userLanguage = forceUserLanguage || languages?.split('/')?.[0]?.slice(0, 2) || defaultLanguage;

    return (
        <ServerI18N 
            forceUserLanguage={userLanguage}
            {...other}
        >
            {children}
        </ServerI18N>
    )
    
}