import {Injectable} from '@angular/core';
import {PrefsInterface} from '../interface/prefs.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly _key = 'each-practice';

  constructor() {
  }

  getPrefs(): PrefsInterface {
    const item = localStorage.getItem('prefs');
    if (item && item.length > 0) {
      return JSON.parse(item);
    }
    return {
      volumeOn: true
    };
  }

  setPrefs(prefs: PrefsInterface) {
    localStorage.setItem('prefs', JSON.stringify(prefs));
  }

  stats(): { total: number, last30: number, consecutive: number } {
    const item = localStorage.getItem(this._key);
    if (item && item.length > 0) {
      const consecutiveDays = JSON.parse(item);
      if (consecutiveDays.length > 0) {
        return { total: consecutiveDays.length, last30: 0, consecutive: 0 };
        //   const yesterday = new Date();
        //   yesterday.setDate(yesterday.getDate() - 1);
        //   const last = new Date(consecutiveDays[length - 1]);
        //   if (last.getDate() === yesterday.getDate() &&
        //     last.getMonth() === yesterday.getMonth() &&
        //     last.getFullYear() === yesterday.getFullYear()) {
        //     return consecutiveDays.length;
        //   }
      }
    }
    return { total: 0, last30: 0, consecutive: 0 };
  }

  addConsecutiveDays() {
    const item = localStorage.getItem(this._key);
    let consecutiveDays = [];
    if (item && item.length > 0) {
      consecutiveDays = JSON.parse(item);
      if (!consecutiveDays) {
        consecutiveDays = [];
      }
    }
    consecutiveDays.push(new Date());

    localStorage.setItem(this._key, JSON.stringify(consecutiveDays));
  }

  clear() {
    localStorage.removeItem(this._key);
    return { total: 0, last30: 0, consecutive: 0 };
  }

}
