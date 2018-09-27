import ILocalStorage from "../ILocalStorage";

/**
 * 使用wx.xxStorage接口实现的LocalStorage
 */
const LocalStorage_Weapp: ILocalStorage = {
    // 同步
    setItem(key: string, value: any): void {
        return wx.setStorageSync(key, JSON.stringify(value))
    },
    getItem<T=any>(key: string): T | null {
        let raw = wx.getStorageSync(key);
        try {
            if (raw == null || raw == '') {
                return null;
            }
            else {
                return JSON.parse(raw);
            }
        }
        catch (e) {
            console.warn('Parse JSON Error when getItem from localStorage: ' + key, raw, e)
            return null;
        }
    },
    removeItem(key: string): void {
        wx.removeStorageSync(key)
    },
    clear(): void {
        wx.clearStorageSync()
    },

    // 异步
    setItemAsync(key: string, value: any): Promise<void> {
        return new Promise((rs, rj) => {
            wx.setStorage({
                key: key,
                data: JSON.stringify(value),
                success: (res: any) => {
                    rs(res);
                },
                fail: (error: any) => {
                    rj(error);
                }
            })
        })
    },
    getItemAsync<T=any>(key: string): Promise<T | null> {
        return new Promise((rs, rj) => {
            wx.getStorage({
                key: key,
                success: (res: any) => {
                    try {
                        if (res == null || res == '') {
                            rs(null);
                        }
                        else {
                            rs(JSON.parse(res.data));
                        }
                    }
                    catch (e) {
                        console.warn('Parse JSON Error when getItemAsync from localStorage: ' + key, res, e)
                        rs(null)
                    }
                },
                fail: (error: any) => {
                    if (error.errMsg !== 'getStorage:fail data not found') {
                        console.error('LocalStorage.getItem ERROR:', error)
                    }
                    rs(null);
                }
            })
        })
    },
    removeItemAsync(key: string): Promise<void> {
        return new Promise((rs, rj) => {
            wx.removeStorage({
                key: key,
                success: (res: any) => {
                    rs(res);
                },
                fail: (error: any) => {
                    rj(error);
                }
            })
        })
    },
    clearAsync(): Promise<void> {
        return wx.clearStorage()
    }
}
export default LocalStorage_Weapp;