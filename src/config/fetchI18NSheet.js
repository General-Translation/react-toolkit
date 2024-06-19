export default async function fetchI18NSheet(cacheURL, projectID, userLanguage) {
    try {
        const response = await fetch(`${cacheURL}/${projectID}/${userLanguage}`, { cache: 'no-store' });
        const I18NSheet = await response.json();
        if (Object.keys(I18NSheet).length > 0) {
            return I18NSheet;
        }
    } catch (error) {
        console.error(error);
    }
    return null;
}