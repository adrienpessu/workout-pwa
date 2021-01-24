import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {StepInterface} from '../interface/step.interface';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  constructor() {
  }

  private getStepsDev(): StepInterface[] {
    return [
      {
        duration: 5,
        title: 'Planche',
        countdown: true
      },
      {
        duration: 5,
        title: 'Planche 2',
        countdown: true,
        rest: 4
      },
      {
        duration: 5,
        title: 'étirement',
        countdown: true
      }];
  }


  getDefaultsSteps() {
    return [
      {
        duration: 60,
        title: 'Planche',
        countdown: true,
        rest: 20
      },
      {
        duration: 30,
        title: 'Planche côté gauche',
        rest: 20
      },
      {
        duration: 30,
        title: 'Planche côté droit',
        rest: 20
      },
      {
        duration: 50,
        title: 'Planche bras tendus',
        rest: 20
      },
      {
        duration: 30,
        title: 'Planche bras tendus côté gauche',
        rest: 20
      },
      {
        duration: 30,
        title: 'Planche bras tendu côté droit',
        rest: 20
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
