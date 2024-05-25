// I18NConfig.js

import fs from 'fs';
import path from 'path';
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
        page, 
        defaultLanguage, 
        remoteSource, 
        maxConcurrentRequests = 3,
        batchInterval = 25,
        ...metadata 
    } = {}) {
        // User-settable
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.page = page || 'default',
        this.defaultLanguage = defaultLanguage || 'en';
        this.remoteSource = remoteSource ?? true;
        this.gt = new GT({ projectID: this.projectID, apiKey: this.apiKey, defaultLanguage: this.defaultLanguage });
        this.metadata = { ...metadata }
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
        return (this.projectID && this.page && userLanguage && (getLanguageName(userLanguage) !== getLanguageName(this.defaultLanguage))) 
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

    // ----- HTML TRANSLATION ----- //

    async translateHTML(params) {
        return new Promise((resolve, reject) => {
            this._queue.push({ params, resolve, reject });
        });
    }

    async _sendBatchHTMLRequest(batch) {
        this._activeRequests++;
        try {
            // Combine batch into a request array to be sent to the endpoint
            // array of HTML strings and language, like:
            // [{ html: '', userLanguage: ''}]
            const htmlStrings = batch.map(item => item.params.html);
            const I18NData = await this.gt.translateHTML({
                content: htmlStrings,
                page: I18NConfig.page,
                userLanguage: batch[0].params.userLanguage,
                defaultLanguage: I18NConfig.defaultLanguage,
                ...I18NConfig.metadata
            })
            batch.forEach((item, index) => {
                item.resolve(I18NData);
            });
        } catch (error) {
            batch.forEach(item => item.reject(error));
        } finally {
            this._activeRequests--;
        }
    }

    // ----- STRING TRANSLATION ----- //

    async translateString(params) {
        return new Promise((resolve, reject) => {
            this._queue.push({ params, resolve, reject });
        });
    }

    async _sendBatchStringRequest(batch) {
        this._activeRequests++;
        try {
            // Batch looks like:
            // [{ string: '', userLanguage: '' }]
            // Combine strings into a request array to be sent to the endpoint
            const contentArray = batch.map(item => item.params.string);
            const translationArray = await this.gt.translateMany(contentArray, batch[0].params.userLanguage)
            batch.forEach((item, index) => {
                item.resolve(translationArray[index]);
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
                const htmlBatch = [];
                const stringBatch = [];
                for (const item of this._queue) {
                    if (item?.params?.html) {
                        htmlBatch.push(item);
                    }
                    else if (item?.params?.string) {
                        stringBatch.push(item);
                    }
                }
                if (htmlBatch.length > 1) {
                    this._sendBatchHTMLRequest(htmlBatch);
                }
                if (stringBatch.length > 1) {
                    this._sendBatchStringRequest(stringBatch);
                }
                this._queue = [];
            }
        }, this.batchInterval);
    }

}

const I18NConfig = I18NConfiguration.fromFile();

export default I18NConfig;