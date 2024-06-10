// I18NConfig.js

import fs from 'fs';
import GT, { getLanguageName } from "generaltranslation";

function getDefaultFromEnv(VARIABLE) {
    if (typeof process !== 'undefined' && process?.env?.[VARIABLE]) {
        return process.env[VARIABLE];
    }
    return '';
}

class I18NConfiguration {
    constructor({ 
        apiKey, 
        projectID,
        defaultLanguage, 
        remoteSource, 
        maxConcurrentRequests = 3,
        batchInterval = 50,
        baseURL = "https://prod.gtx.dev",
        ...metadata 
    } = {}) {
        // User-settable
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.defaultLanguage = defaultLanguage || 'en';
        this.remoteSource = typeof remoteSource === 'boolean' ? remoteSource : true;
        this.gt = new GT({ projectID: this.projectID, apiKey: this.apiKey, defaultLanguage: this.defaultLanguage });
        this.baseURL = baseURL;
        this.metadata = { projectID: this.projectID, ...metadata }
        // Batching
        this.maxConcurrentRequests = maxConcurrentRequests,
        this.batchInterval = batchInterval,
        this._queue = [];
        this._activeRequests = 0;
        this._startBatching()
        // Internal
        this._I18NData = null;
        this._I18NDataPromise = null;
        this._currentLanguage = '';
        
    }

    static fromFile(filepath = null) {
        let configData = {};
        const configPath = filepath || getDefaultFromEnv('GT_CONFIG_PATH');
        if (configPath) {
            try {
                const configContent = fs.readFileSync(configPath, 'utf-8');
                configData = JSON.parse(configContent);
            } catch (error) {
                console.warn('@generaltranslation/react: No I18N config detected. Defaulting to standard settings.')
            }
        }
        return new I18NConfiguration(configData);
    }

    // ----- TRANSLATION REQUIRED ----- //

    translationRequired(userLanguage) {
        return (this.projectID && userLanguage && (getLanguageName(userLanguage) !== getLanguageName(this.defaultLanguage))) 
        ? true : false;
    } 

    // ----- I18N JSON CACHING ----- //

    clearLanguageCache() {
        this._I18NData = null;
        this._I18NDataPromise = null;
    }

    async getI18NData(userLanguage) {

        if (userLanguage !== this._currentLanguage) {
            this.clearLanguageCache();
            this._currentLanguage = userLanguage;
        }

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
                    const response = await fetch(`https://json.gtx.dev/${this.projectID}/${userLanguage}`, { cache: 'no-store' });
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

    // ----- HTML TRANSLATION ----- //

    async translateReact(request) {
        return new Promise((resolve, reject) => {
            const params = { ...this.metadata, ...request }
            this._queue.push({params, resolve, reject });
        });
    }

    async _sendBatchReactRequest(batch) {
        this._activeRequests++;
        try {
            // Combine batch into a request array to be sent to the endpoint
            // batch looks like: [{ content, hash, userLanguage, ...metadata }]
            let I18NData = {};
            try {
                const response = await fetch(`${this.baseURL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'gtx-api-key': this.apiKey,
                    },
                    body: JSON.stringify(batch.map(item => item.params))
                });
                I18NData = await response.json();
            } catch (error) {
                console.error(error)
            }
            batch.forEach((item, index) => {
                item.resolve(I18NData[item?.params?.hash]);
            });
        } catch (error) {
            batch.forEach(item => item.reject(error));
        } finally {
            this._activeRequests--;
        }
    }

    // ----- SORTING AND BATCHING ----- //

    _startBatching() {
        setInterval(() => {
            if (this._queue.length > 0 && this._activeRequests < this.maxConcurrentRequests) {
                this._sendBatchReactRequest(this._queue);
                this._queue = [];
            }
        }, this.batchInterval);
    }

}

const I18NConfig = I18NConfiguration.fromFile('gt_config.json');

export default I18NConfig;