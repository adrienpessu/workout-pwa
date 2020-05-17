import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  constructor() {
  }

  getSteps() {
    return [
      {
        duration: 60,
        title: 'Planche'
      },
      {
        duration: 2,
        title: 'Repos'
      },
      {
        duration: 3,
        title: 'Planche côté gauche'
      },
      {
        duration: 2,
        title: 'Repos'
      }
    ];
  }
}
