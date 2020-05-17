import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() {
  }

  openSnackBar(key?: string, refresh?: boolean) {
    window.alert(key);
  }

}
