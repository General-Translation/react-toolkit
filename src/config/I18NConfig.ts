// I18NConfig.ts

import GT, { isSameLanguage } from 'generaltranslation';
import cache from './placeholderCache'; // replace with import { cache } from 'react' when it is released
import fetchI18NSheet from './remote/fetchI18NSheet';
import getI18NSheet from './local/getI18NSheet';
import getDefaultFromEnv from './local/getDefaultFromEnv';
import getConfigData from './local/getConfigData';

const getI18NSheetFromCache = cache(fetchI18NSheet);
const getI18NSheetFromFile = cache(getI18NSheet);

interface I18NConfigurationParams {
    apiKey?: string;
    projectID?: string;
    userLanguage?: string;
    defaultLanguage?: string;
    maxConcurrentRequests?: number;
    batchInterval?: number;
    baseURL?: string;
    cacheURL?: string;
    I18NSheets?: Record<string, string>;
    [key: string]: any;
}

class I18NConfiguration {
    apiKey: string;
    projectID: string;
    userLanguage: string;
    defaultLanguage: string;
    cacheURL: string;
    baseURL: string;
    I18NSheets: Record<string, string>;
    gt: GT;
    metadata: Record<string, any>;
    maxConcurrentRequests: number;
    batchInterval: number;
    _queue: Array<any>;
    _activeRequests: number;

    constructor({
        apiKey,
        projectID,
        userLanguage = '',
        defaultLanguage = 'en',
        maxConcurrentRequests = 3,
        batchInterval = 25,
        baseURL = "https://prod.gtx.dev",
        cacheURL = "https://json.gtx.dev",
        I18NSheets = {},
        ...metadata
    }: I18NConfigurationParams = {}) {
        // User-settable
        this.apiKey = apiKey || getDefaultFromEnv('GT_API_KEY');
        this.projectID = projectID || getDefaultFromEnv('GT_PROJECT_ID');
        this.userLanguage = userLanguage;
        this.defaultLanguage = defaultLanguage;
        this.cacheURL = cacheURL;
        this.baseURL = baseURL;
        this.I18NSheets = I18NSheets;
        this.gt = new GT({ projectID: this.projectID, apiKey: this.apiKey, defaultLanguage: this.defaultLanguage, baseURL: this.baseURL });
        this.metadata = { projectID: this.projectID, defaultLanguage: this.defaultLanguage, ...metadata };
        // Batching
        this.maxConcurrentRequests = maxConcurrentRequests;
        this.batchInterval = batchInterval;
        this._queue = [];
        this._activeRequests = 0;
        this._startBatching();
    }

    // ----- DEFAULT LANGUAGE ----- //

    getDefaultLanguage(): string {
        return this.defaultLanguage;
    }

    // ----- TRANSLATION REQUIRED ----- //

    translationRequired(userLanguage: string): boolean {
        return (this.projectID && userLanguage && !isSameLanguage(this.defaultLanguage, userLanguage)) 
        ? true : false;
    }

    // ----- I18N JSON CACHING ----- //

    async getI18NSheet(userLanguage: string): Promise<Record<string, any>> {
        if (this.I18NSheets[userLanguage]) {
            return await getI18NSheetFromFile(this.I18NSheets[userLanguage]);
        }
        return await getI18NSheetFromCache(this.cacheURL, this.projectID, userLanguage) || {};
    }

    // ----- REACT TRANSLATION ----- //

    async translateChildren(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._queue.push({ params, resolve, reject });
        });
    }

    private async _sendBatchReactRequest(batch: Array<any>): Promise<void> {
        this._activeRequests++;
        try {
            // Combine batch into a request array to be sent to the endpoint
            // batch looks like: [{ children, targetLanguage, ...props }]
            const targetLanguage = batch?.[0]?.params?.targetLanguage || this.defaultLanguage;
            const content = batch.map(item => ({ ...item.params }));
            const I18NData = (await this.gt.translateReactChildren({
                content: content,
                targetLanguage: targetLanguage,
                metadata: this.metadata
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

    private _startBatching(): void {
        setInterval(() => {
            if (this._queue.length > 0 && this._activeRequests < this.maxConcurrentRequests) {
                this._sendBatchReactRequest(this._queue);
                this._queue = [];
            }
        }, this.batchInterval);
    }
}

const I18NConfig = new I18NConfiguration(getConfigData());

export default I18NConfig;
