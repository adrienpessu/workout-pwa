import {Injectable} from '@angular/core';
import {PrefsInterface} from '../interface/prefs.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

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

  getConsecutiveDays() {
    const item = localStorage.getItem('consecutive-days');
    if (item && item.length > 0) {
      const consecutiveDays = JSON.parse(item);
      if (consecutiveDays.length > 0) {
        return consecutiveDays.length;
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
    return 0;
  }

  addConsecutiveDays() {
    const item = localStorage.getItem('each-practice');
    let consecutiveDays = [];
    if (item && item.length > 0) {
      consecutiveDays = JSON.parse(item);
      if (!consecutiveDays) {
        consecutiveDays = [];
      }
    }
    consecutiveDays.push(new Date());

    localStorage.setItem('each-practice', JSON.stringify(consecutiveDays));
  }

}
