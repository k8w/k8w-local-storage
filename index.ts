import { LocalStorageBrowser } from './platform/LocalStorageBrowser';
import { LocalStorageMiniapp } from './platform/LocalStorageMiniApp';
import { BaseLocalStorage } from './platform/BaseLocalStorage';

declare let wx: any;
declare let qq: any;
declare let tt: any;

export class LocalStorage {
    keyPrefix = '';

    private static _instance?: BaseLocalStorage;
    static get instance(): BaseLocalStorage {
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
}