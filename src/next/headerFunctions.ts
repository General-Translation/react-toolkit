let headers: (() => Headers) | null = null;

async function loadNextHeaders() {
    try {
        const nextHeaders = require('next/headers');
        headers = nextHeaders.headers as (() => Headers);
    } catch (error) {
        console.warn('next/headers is not available. Running in non-Next.js environment.');
        headers = null;
    }
}

export async function getUserLanguageNext(): Promise<string | null> {
    if (!headers) await loadNextHeaders();
    if (headers) {
        const headerList = headers();
        const acceptLanguage = headerList.get('accept-language');
        return acceptLanguage?.split('/')[0].split(',')[0] || null;
    } else {
        return null;
    }
}

export async function getDomainNext(): Promise<string | null> {
    if (!headers) await loadNextHeaders();
    if (headers) {
        const headerList = headers();
        return headerList.get('host') || null;
    } else {
        return null;
    }
}
