'use server'

import { headers } from 'next/headers'
import ServerI18N from '../server/ServerI18N';

export default async function NextI18N({
    children,
    projectID = '',
    defaultLanguage = 'en',
    forceUserLanguage = '',
    i18nTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul'],
    excludeTags = ["ExcludeI18N"],
    remoteSource = true,
    ...languageJSONs
}) {
    
    const languages = headers()?.get('accept-language');
    const userLanguage = forceUserLanguage || languages?.split(',')?.[0]?.slice(0, 2) || defaultLanguage;

    return (
        <ServerI18N 
            forceUserLanguage={userLanguage}
            projectID={projectID}
            defaultLanguage={defaultLanguage}
            i18nTags={i18nTags}
            excludeTags={excludeTags}
            remoteSource={remoteSource}
            {...languageJSONs}
        >
            {children}
        </ServerI18N>
    )
    
}