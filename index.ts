import LocalStorage_Weapp from './implements/LocalStorage_Weapp';
import ILocalStorage from './ILocalStorage';
import LocalStorage_Browser from './implements/LocalStorage_Browser';

/** 同时支持H5和微信的LocalStorage 暂时只实现了微信 */
let LocalStorage: ILocalStorage;
if (typeof wx !== 'undefined') {
    LocalStorage = LocalStorage_Weapp;
}
else if (typeof localStorage !== 'undefined') {
    LocalStorage = LocalStorage_Browser;
}
else {
    throw new Error('Can not find a implement for LocalStorage at current platfor.')
}
export default LocalStorage;