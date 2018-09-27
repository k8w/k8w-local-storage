export default interface ILocalStorage {
    // 同步
    setItem(key: string, value: unknown): void;
    getItem<T=unknown>(key: string): T | null;
    removeItem(key: string): void;
    clear(): void;

    // 异步
    setItemAsync(key: string, value: unknown): Promise<void>;
    getItemAsync<T=unknown>(key: string): Promise<T | null>;
    removeItemAsync(key: string): Promise<void>;
    clearAsync(): Promise<void>;
}