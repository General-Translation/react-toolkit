import { promises } from 'fs';

export default async function getI18NSheet(filepath: string) {
    try {
        const file = await promises.readFile(filepath, 'utf-8');
        return JSON.parse(file);
    } catch (error) {
        console.error(error);
        return null;
    }
}