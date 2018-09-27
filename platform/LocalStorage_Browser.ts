import ILocalStorage from "../ILocalStorage";

/**
 * 使用浏览器原生接口实现的LocalStorage
 */
const LocalStorage_Browser: ILocalStorage = {
    // 同步
    setItem(key: string, value: unknown): void {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem<T=unknown>(key: string): T | null {
        try {
            let raw = localStorage.getItem(key);
            if (raw == null) {
                return null;
            }
            else {
                return JSON.parse(raw);
            }
        }
        catch (e) {
            console.warn('Parse JSON Error when getItem from localStorage: ' + key, localStorage.getItem(key), e)
            return null;
        }
    },
    removeItem(key: string): void {
        localStorage.removeItem(key);
    },
    clear(): void {
        localStorage.clear();
    },

    // 异步
    setItemAsync(key: string, value: unknown) {
        return new Promise((rs, rj) => {
            try {
                LocalStorage_Browser.setItem(key, value);
                rs();
            }
            catch (e) {
                rj(e);
            }
        })
    },
    getItemAsync<T=unknown>(key: string): Promise<T | null> {
        return new Promise((rs, rj) => {
            try {
                rs(LocalStorage_Browser.getItem(key));
            }
            catch (e) {
                rj(e);
            }
        })
    },
    removeItemAsync(key: string): Promise<void> {
        return new Promise((rs, rj) => {
            try {
                LocalStorage_Browser.removeItem(key)
                rs();
            }
            catch (e) {
                rj(e);
            }
        })
    },
    clearAsync(): Promise<void> {
        return new Promise((rs, rj) => {
            try {
                LocalStorage_Browser.clear()
                rs();
            }
            catch (e) {
                rj(e);
            }
        })
    }
}
export default LocalStorage_Browser;