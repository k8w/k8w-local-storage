import ILocalStorage from "../ILocalStorage";

/**
 * 使用wx.xxStorage接口实现的LocalStorage
 */
const LocalStorage_Weapp: ILocalStorage = {
    // 同步
    setItem(key: string, value: any): void {
        return wx.setStorageSync(key, value)
    },
    getItem<T=any>(key: string): T | null {
        return wx.getStorageSync(key)
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
                data: value,
                success: (res:any) => {
                    rs(res);
                },
                fail: (error:any) => {
                    rj(error);
                }
            })
        })
    },
    getItemAsync<T=any>(key: string): Promise<T | null> {
        return new Promise((rs, rj) => {
            wx.getStorage({
                key: key,
                success: (res:any) => {
                    rs(res);
                },
                fail: (error:any) => {
                    rj(error);
                }
            })
        })
    },
    removeItemAsync(key: string): Promise<void> {
        return new Promise((rs, rj) => {
            wx.removeStorage({
                key: key,
                success: (res:any) => {
                    rs(res);
                },
                fail: (error:any) => {
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