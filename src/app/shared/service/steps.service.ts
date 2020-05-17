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
        duration: 20,
        title: 'Repos'
      },
      {
        duration: 30,
        title: 'Planche côté gauche'
      },
      {
        duration: 20,
        title: 'Repos'
      },
      {
        duration: 30,
        title: 'Planche côté droit'
      },
      {
        duration: 20,
        title: 'Repos'
      },
      {
        duration: 50,
        title: 'Planche bras tendus'
      },
      {
        duration: 20,
        title: 'Repos'
      },
      {
        duration: 30,
        title: 'Planche bras tendus côté gauche'
      },
      {
        duration: 20,
        title: 'Repos'
      },
      {
        duration: 30,
        title: 'Planche bras tendu côté droit'
      },
      {
        duration: 20,
        title: 'Repos'
      },
      {
        duration: 50,
        title: 'Planche'
      },
      {
        duration: 30,
        title: 'Étirement 🐍'
      }
    ];
  }
}
