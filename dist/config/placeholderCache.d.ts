export default function cache<T extends (...args: any[]) => any>(f: T): (...args: Parameters<T>) => ReturnType<T>;
//# sourceMappingURL=placeholderCache.d.ts.map