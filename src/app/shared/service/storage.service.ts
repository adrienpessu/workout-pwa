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

}
