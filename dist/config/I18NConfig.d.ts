import GT from 'generaltranslation';
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
declare class I18NConfiguration {
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
    constructor({ apiKey, projectID, userLanguage, defaultLanguage, maxConcurrentRequests, batchInterval, baseURL, cacheURL, I18NSheets, ...metadata }?: I18NConfigurationParams);
    getDefaultLanguage(): string;
    translationRequired(userLanguage: string): boolean;
    getI18NSheet(userLanguage: string): Promise<Record<string, any>>;
    translateChildren(params: any): Promise<any>;
    private _sendBatchReactRequest;
    private _startBatching;
}
declare const I18NConfig: I18NConfiguration;
export default I18NConfig;
//# sourceMappingURL=I18NConfig.d.ts.map