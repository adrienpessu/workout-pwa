import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  constructor() {
  }

  getStepsDev() {
    return [{
      duration: 3,
      title: 'Planche',
      countdown: true
    },
      {
        duration: 3,
        title: 'Planche 2'
      },
      {
        duration: 3,
        title: 'étirement',
        countdown: true
      }];
  }


  getDefaultsSteps() {
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
        title: 'Étirement 🐍',
        countdown: true
      }
    ];
  }

  getSteps() {
    if (environment.production) {
      return this.getDefaultsSteps();
    } else {
      return this.getStepsDev();
    }
  }
}
