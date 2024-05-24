// I18NConfig.js

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
        this.userLanguage = userLanguage || defaultLanguage;
        this.remoteSource = remoteSource ?? true;
        this.gt = gt || new GT({ projectID: this.projectID, apiKey: this.apiKey, defaultLanguage: this.defaultLanguage });
        this.metadata = { ...metadata }
        // Internal
        this._I18NData = null;
        this._I18NDataPromise = null;
        this._I18NManager = new I18NManager({ gt: this.gt })
    }

    set(parameters) {
        Object.assign(this, parameters);
        if (parameters.apiKey || parameters.projectID || parameters.defaultLanguage) {
            this.gt = new GT({
                projectID: this.projectID,
                apiKey: this.apiKey,
                defaultLanguage: this.defaultLanguage
            });
            this._I18NManager = new I18NManager({ gt: this.gt });
        }
    }

    get translationRequired() {
        return (this.projectID && this.page && (getLanguageName(this.userLanguage) !== getLanguageName(this.defaultLanguage))) 
        ? true : false;
    } 

    async getI18NData() {
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
                    const response = await fetch(`https://json.gtx.dev/${this.projectID}/${this.page}/${this.userLanguage}`);
                    I18NData = await response.json();
                } catch (error) {
                    console.error(error);
                    this._I18NData = {};
                }
            } else if (this.userLanguage in this.metadata) {
                Object.assign(I18NData, this.metadata[this.userLanguage]);
            }
            this._I18NData = I18NData;  // Save fetched data
            this._I18NDataPromise = null; // Reset the promise
            return I18NData;
        })();

        return this._I18NDataPromise;
    }

    async translate({ htmlString }) {
        return await this._I18NManager.translateHTML({ htmlString });
    }

}

const I18NConfig = new I18NConfiguration();

export default I18NConfig;