export default interface ILocalStorage {
    // 同步
    setItem(key: string, value: any): void;
    getItem<T=any>(key: string): T | null;
    removeItem(key: string): void;
    clear(): void;

    // 异步
    setItemAsync(key: string, value: any): Promise<void>;
    getItemAsync<T=any>(key: string): Promise<T | null>;
    removeItemAsync(key: string): Promise<void>;
    clearAsync(): Promise<void>;
}