// I18NConfig.js

import fs from 'fs';
import path from 'path';
import GT, { isSameLanguage } from "generaltranslation";
import { cache } from 'react';
import fetchI18NSheet from './fetchI18NSheet';

const getI18NSheetFromCache = cache(fetchI18NSheet);

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
        defaultLanguage = 'en', 
        remoteSource = true, 
        maxConcurrentRequests = 3,
        batchInterval = 25,
        baseURL = "https://prod.gtx.dev",
        cacheURL = "https://json.gtx.dev",
        renderMethod = "replace", // "replace", "hang", "subtle"
        ...metadata 
    } = {}) {
        // User-settable
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.defaultLanguage = defaultLanguage;
        this.remoteSource = remoteSource;
        this.cacheURL = cacheURL;
        this.baseURL = baseURL;
        this.renderMethod = renderMethod;
        this.gt = new GT({ projectID: this.projectID, apiKey: this.apiKey, defaultLanguage: this.defaultLanguage, baseURL: this.baseURL });
        this.metadata = { projectID: this.projectID, ...metadata }
        // Batching
        this.maxConcurrentRequests = maxConcurrentRequests,
        this.batchInterval = batchInterval,
        this._queue = [];
        this._activeRequests = 0;
        this._startBatching();
    }

    // ----- GET RENDER METHOD ----- //

    getRenderMethod() {
        return this.renderMethod;
    }

    // ----- TRANSLATION REQUIRED ----- //

    translationRequired(userLanguage) {
        return (this.projectID && userLanguage && !isSameLanguage(this.defaultLanguage, userLanguage)) 
        ? true : false;
    } 

    // ----- I18N JSON CACHING ----- //

    async getI18NSheet(userLanguage) {
        if (this.remoteSource) {
            const I18NSheet = await getI18NSheetFromCache(this.cacheURL, this.projectID, userLanguage)
            return I18NSheet;
        }
        if (this.metadata[userLanguage]) {
            return this.metadata[userLanguage];
        }
    }

    // ----- REACT TRANSLATION ----- //

    async translateChildren(params) {
        return new Promise((resolve, reject) => {
            this._queue.push({params, resolve, reject });
        });
    }

    async _sendBatchReactRequest(batch) {
        this._activeRequests++;
        try {
            // Combine batch into a request array to be sent to the endpoint
            // batch looks like: [{ content, hash, targetLanguage, ...props }]
            const targetLanguage = batch?.[0]?.params?.targetLanguage || this.defaultLanguage;
            const content = batch.map(item => item.params.content)
            const I18NData = (await this.gt.translateReactChildren({
                content: content,
                targetLanguage: targetLanguage,
                ...this.metadata
            }))?.translation || {};
            batch.forEach((item, index) => {
                item.resolve(I18NData[index]);
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

const configData = (() => {
    const filename = getDefaultFromEnv("GT_CONFIG_FILEPATH") || 'gt_config.json';
    const filepath = path.resolve(process.cwd(), filename);
    let data = {};
    try {
        const file = fs.readFileSync(filepath, 'utf-8');
        data = JSON.parse(file);
    } catch (error) {
        console.warn('@generaltranslation/react: No I18N config readable. Defaulting to standard settings.');
    }
    return data;
})();

const I18NConfig = new I18NConfiguration(configData);

export default I18NConfig;