export default async function fetchI18NSheet(cacheURL: string, projectID: string, userLanguage: string): Promise<Record<string, any> | null> {
    try {
        const response = await fetch(`${cacheURL}/${projectID}/${userLanguage}`);
        const I18NSheet = await response.json();
        if (Object.keys(I18NSheet).length > 0) {
            return I18NSheet;
        }
    } catch (error) {
        console.error(error);
    }
    return null;
}
