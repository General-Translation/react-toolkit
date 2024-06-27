import React, { ReactNode } from 'react';

import { getDomainNext, getUserLanguageNext } from "./headerFunctions";
import ServerI18N from '../server/ServerI18N';
import I18NConfig from '../config/I18NConfig';

interface NextI18NProps {
    children: ReactNode;
    [key: string]: any; // This allows additional metadata props with any key and type
}

export default async function NextI18N({ children, ...metadata }: NextI18NProps) {
    
    const userLanguage: string = (await getUserLanguageNext()) || I18NConfig.getDefaultLanguage();
    const domain: string = (await getDomainNext()) || "";

    return (
        <>
            {/* @ts-expect-error Server Component */
                <ServerI18N userLanguage={userLanguage} domain={domain} {...metadata}>
                    {children}
                </ServerI18N>
            }
        </>
    );
}