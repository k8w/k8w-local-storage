import LocalStorage_Weapp from './platform/LocalStorage_Weapp';
import ILocalStorage from './ILocalStorage';
import LocalStorage_Browser from './platform/LocalStorage_Browser';

/** 同时支持H5和微信的LocalStorage 暂时只实现了微信 */
let LocalStorage: ILocalStorage;
if (typeof wx == 'object' && wx.setStorage) {
    LocalStorage = LocalStorage_Weapp;
}
else if (typeof localStorage !== 'undefined') {
    LocalStorage = LocalStorage_Browser;
}
else {
    throw new Error('Can not find a implement for LocalStorage at current platfor.')
}
export default LocalStorage;