// I18NConfig.js

import fs from 'fs';
import path from 'path';
import GT, { getLanguageName } from "generaltranslation";
import I18NManager from "./I18NManager";

function getDefaultFromEnv(VARIABLE) {
    if (typeof process !== 'undefined' && process?.env?.[VARIABLE]) {
        return process.env[VARIABLE];
    }
    return '';
}

class I18NConfiguration {
    constructor({ apiKey, projectID, page, defaultLanguage, userLanguage, remoteSource, gt, ...metadata } = {}) {
        // User-settable
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.page = page || 'default',
        this.defaultLanguage = defaultLanguage || 'en';
        this.remoteSource = remoteSource ?? true;
        this.gt = gt || new GT({ projectID: this.projectID, apiKey: this.apiKey, defaultLanguage: this.defaultLanguage });
        this.metadata = { ...metadata }
        // Internal
        this._I18NData = null;
        this._I18NDataPromise = null;
        this._I18NManager = new I18NManager({ gt: this.gt })
    }

    static fromFile(filePath = null) {
        const defaultFilePath = path.resolve(process.cwd(), 'gt_config.json');
        const configPath = filePath || getDefaultFromEnv('GT_CONFIG_PATH') || defaultFilePath;
        let configData = {};
        try {
            const configContent = fs.readFileSync(configPath, 'utf-8');
            configData = JSON.parse(configContent);
        } catch (error) {
            console.warn('@generaltranslation/react: No I18N config detected. Defaulting to standard settings.')
        }
        return new I18NConfiguration(configData);
    }

    translationRequired(userLanguage) {
        return (this.projectID && this.page && userLanguage && (getLanguageName(userLanguage) !== getLanguageName(this.defaultLanguage))) 
        ? true : false;
    } 

    async getI18NData(userLanguage) {
        if (this._I18NData) {
            return this._I18NData;
        }

        if (this._I18NDataPromise) {
            return this._I18NDataPromise;
        }

        this._I18NDataPromise = (async () => {
            let I18NData = {};
            if (this.remoteSource) {
                try {
                    const response = await fetch(`https://json.gtx.dev/${this.projectID}/${this.page}/${userLanguage}`);
                    I18NData = await response.json();
                } catch (error) {
                    console.error(error);
                    this._I18NData = {};
                }
            } else if (userLanguage in this.metadata) {
                Object.assign(I18NData, this.metadata[userLanguage]);
            }
            this._I18NData = I18NData;  // Save fetched data
            this._I18NDataPromise = null; // Reset the promise
            return I18NData;
        })();

        return this._I18NDataPromise;
    }

    async translate({ htmlString, userLanguage, ...metadata }) {
        return await this._I18NManager.translateHTML({ htmlString, userLanguage, ...metadata });
    }

}

const I18NConfig = I18NConfiguration.fromFile();

export default I18NConfig;