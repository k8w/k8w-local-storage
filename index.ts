import { LocalStorageMiniapp } from './platform/LocalStorageMiniApp';
import { LocalStorageBrowser } from './platform/LocalStorageBrowser';

declare let wx: any;
declare let qq: any;
declare let tt: any;

export abstract class LocalStorage {
    keyPrefix: string = '';

    private static _instance?: LocalStorage;
    static get instance(): LocalStorage {
        if (!this._instance) {
            if (typeof wx == 'object' && wx.setStorage) {
                this._instance = new LocalStorageMiniapp(wx);
            }
            else if (typeof qq == 'object' && qq.setStorage) {
                this._instance = new LocalStorageMiniapp(qq);
            }
            else if (typeof tt == 'object' && tt.setStorage) {
                this._instance = new LocalStorageMiniapp(tt);
            }
            else if ('localStorage' in window) {
                this._instance = new LocalStorageBrowser();
            }
            else {
                throw new Error('Can not find a implement for LocalStorage at current platfor.')
            }
        }
        return this._instance;
    }

    abstract getItem<T = unknown>(key: string): T | undefined;
    abstract setItem(key: string, value: any): void;
    abstract removeItem(key: string): void;
    abstract clear(): void;
    abstract keys(): string[];
}