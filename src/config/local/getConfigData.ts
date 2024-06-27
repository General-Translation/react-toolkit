import fs from 'fs';
import path from 'path';
import getDefaultFromEnv from './getDefaultFromEnv';

export default function getConfigData(): Record<string, any> {
    const filename: string = getDefaultFromEnv("GT_CONFIG_FILEPATH") || 'gt_config.json';
    const filepath: string = path.resolve(process.cwd(), filename);
    let data: Record<string, any> = {};
    try {
        const file: string = fs.readFileSync(filepath, 'utf-8');
        data = JSON.parse(file);
    } catch (error) {
        console.warn('@generaltranslation/react: No I18N config readable. Defaulting to standard settings.');
    }
    return data;
}
