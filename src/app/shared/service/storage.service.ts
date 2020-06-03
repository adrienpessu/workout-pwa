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
      const days = JSON.parse(item);
      if (days.length > 0) {
        const daysDate = days.map(d => new Date(d));
        const date30jours = new Date();
        date30jours.setDate(date30jours.getDate() - 30);

        const last30Days = daysDate.filter(currentDate => currentDate.getTime() >= date30jours.getTime());
        const consecutive = daysDate.sort((a, b) => b - a);
        console.log(consecutive);
        let consecutiveDays = 0;
        if (consecutive.length > 0) {
          consecutiveDays++;
          let last = consecutive[0];
          last.setHours(0, 0, 0, 0);
          let index = 1;
          let stillConsecutive = true;
          while (index < consecutive.length && stillConsecutive) {
            const currentDate = consecutive[index];
            currentDate.setHours(0, 0, 0, 0);

            if ((last.getTime() - currentDate.getTime()) === (1000 * 60 * 60 * 24)
              || (last.getTime() - currentDate.getTime()) === 0) {
              consecutiveDays++;
            } else {
              stillConsecutive = false;
            }
            index++;
            last = currentDate;
          }
        }

        return {total: days.length, last30: last30Days.length, consecutive: consecutiveDays};
      }
    }
    return {total: 0, last30: 0, consecutive: 0};
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
    return {total: 0, last30: 0, consecutive: 0};
  }

}
