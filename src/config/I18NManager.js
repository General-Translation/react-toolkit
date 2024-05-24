import GT from 'generaltranslation'
import I18NConfig from './I18NConfig';

export default class I18NManager {
    constructor({
        maxConcurrentRequests = 3,
        batchInterval = 100,
        gt = null,
    } = {}) {
        this.isFetching = false;
        this.queue = [];
        this.activeRequests = 0;
        this.maxConcurrentRequests = maxConcurrentRequests;
        this.batchInterval = batchInterval;
        if (!gt) {
            this.gt = new GT();
        } else {
            this.gt = gt;
        }
        this.startBatching();
    }

    async translateHTML(params) {
        return new Promise((resolve, reject) => {
            this.queue.push({ params, resolve, reject });
        });
    }

    async sendBatchRequest(batch) {
        this.activeRequests++;
        try {
            // Combine batch into a request array to be sent to the endpoint
            // Array of htmlStrings
            const htmlStrings = batch.map(item => item.params.htmlString);
            const I18NData = await this.gt.translateHTML({
                content: htmlStrings,
                page: I18NConfig.page,
                userLanguage: I18NConfig.userLanguage,
                defaultLanguage: I18NConfig.defaultLanguage,
                ...I18NConfig.metadata
            })
            batch.forEach((item, index) => {
                item.resolve(I18NData);
            });
        } catch (error) {
            batch.forEach(item => item.reject(error));
        } finally {
            this.activeRequests--;
        }
    }

    startBatching() {
        setInterval(() => {
            if (this.queue.length > 0 && this.activeRequests < this.maxConcurrentRequests) {
                const batch = this.queue.splice(0, this.queue.length);
                this.sendBatchRequest(batch);
            }
        }, this.batchInterval);
    }
}