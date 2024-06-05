import { headers } from 'next/headers'

export function getUserLanguageNext() {
    const headerList = headers();
    return headerList?.get('accept-language')?.split('/')?.[0].split(',')[0];
}

export function getDomainNext() {
    const headerList = headers();
    return headerList.get('host');
}