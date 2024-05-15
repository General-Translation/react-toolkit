// FetchManager.js
class FetchManager {
    constructor() {
        this.isFetching = false;
        this.queue = [];
        this.activeRequests = 0;
        this.maxConcurrentRequests = 3;
    }

    async fetchTranslations(params) {
        if (this.activeRequests >= this.maxConcurrentRequests) {
            return new Promise((resolve, reject) => {
                this.queue.push({ params, resolve, reject });
            });
        }

        this.activeRequests++;
        try {
            const response = await fetch('api/generaltranslation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            const result = await response.json();
            this.activeRequests--;
            this.processQueue();
            return result;
        } catch (error) {
            this.activeRequests--;
            this.processQueue();
            throw error;
        }
    }

    processQueue() {
        while (this.queue.length > 0 && this.activeRequests < this.maxConcurrentRequests) {
            const { params, resolve, reject } = this.queue.shift();
            this.fetchTranslations(params).then(resolve).catch(reject);
        }
    }
}

const fetchManager = new FetchManager();
export default fetchManager;
