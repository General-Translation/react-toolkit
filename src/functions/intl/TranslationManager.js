import GT from 'generaltranslation'

export class TranslationManager {
    constructor({
        maxConcurrentRequests = 3,
        batchInterval = 200,
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

    async translate(params) {
        return new Promise((resolve, reject) => {
            this.queue.push({ params, resolve, reject });
        });
    }

    async sendBatchRequest(batch) {
        this.activeRequests++;
        try {
            // Combine batch into a request array to be sent to the endpoint
            // looking like: [{ content: params.string, language: params.language}]
            const contentArray = batch.map(item => item.params.string);
            const translationArray = await this.gt.translateMany(contentArray, batch[0].params.language)
            batch.forEach((item, index) => {
                item.resolve(translationArray[index]);
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

const defaultTranslationManager = new TranslationManager();

export default defaultTranslationManager;