export default async function generateHash(message) {
    if (typeof message !== 'object') return null;
    const msgBuffer = new TextEncoder().encode(JSON.stringify(message));
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};