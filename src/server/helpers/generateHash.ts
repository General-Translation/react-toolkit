export default async function generateHash(message: any): Promise<string> {
    if (!message) return '';
    else if (typeof message === 'object') message = JSON.stringify(message);
    else if (Array.isArray(message)) message = JSON.stringify(message);
    const msgBuffer = new TextEncoder().encode(message as any);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};