class PlaceholderCache {
    private cache: Map<string, Map<string, any>>;

    constructor() {
        this.cache = new Map();
    }

    set(functionKey: string, argsKey: string, value: any): void {
        if (!this.cache.has(functionKey)) {
            this.cache.set(functionKey, new Map());
        }
        this.cache.get(functionKey)!.set(argsKey, value);
    }

    get(functionKey: string, argsKey: string): any | undefined {
        return this.cache.get(functionKey)?.get(argsKey);
    }

    has(functionKey: string, argsKey: string): boolean {
        return this.cache.has(functionKey) && this.cache.get(functionKey)!.has(argsKey);
    }
}

const placeholderCache = new PlaceholderCache();

export default function cache<T extends (...args: any[]) => any>(f: T): (...args: Parameters<T>) => ReturnType<T> {
    const functionKey = f.toString();
    return function(...args: Parameters<T>): ReturnType<T> {
        const argsKey = JSON.stringify(args);
        if (!placeholderCache.has(functionKey, argsKey)) {
            try {
                const result = f(...args);
                placeholderCache.set(functionKey, argsKey, result);
                return result;
            } catch (error) {
                throw new Error(`Error executing function: ${error}`);
            }
        }
        return placeholderCache.get(functionKey, argsKey) as ReturnType<T>;
    };
}
