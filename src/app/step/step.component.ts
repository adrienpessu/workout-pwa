import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, switchMap, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {StepsService} from '../shared/service/steps.service';
import {interval, of, Subscription} from 'rxjs';
import {ErrorService} from '../shared/service/error.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  stepLabel: string;
  countDownStart: number;

  currentStepIndex: number;
  numberOfSteps: number;
  started = false;

  public audio: HTMLAudioElement;

  constructor(
    private errorService: ErrorService,
    private route: ActivatedRoute,
    public router: Router,
    private stepsService: StepsService) {
    this.audio = new Audio();
    this.audio.src = '../../../assets/sounds/mario.mp3';
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        if (params.has('id')) {
          return of(+params.get('id'));
        } else {
          return of(0);
        }
      })
    ).subscribe((result: number) => {
      if (result === 0) {
        this.started = false;
      } else {
        this.started = true;
        const steps = this.stepsService.getSteps();
        this.numberOfSteps = steps.length;
        this.currentStepIndex = result;
        if (this.currentStepIndex <= this.numberOfSteps) {
          const currentStep = steps[result - 1];
          const time = currentStep.duration;
          this.countDownStart = time;
          this.stepLabel = currentStep.title;
          this.subscriptions.push(interval(1000)
            .pipe(take(time),
              map((v) => (time - 1) - v))
            .subscribe((v) => {
              this.countDownStart = v;
              if (v === 0) {
                this.currentStepIndex++;
                this.audio.load();
                this.audio.play().then(response => this.router.navigate(['/' + +this.currentStepIndex]));
              }
            }));
        }
      }

    }, error => this.errorService.openSnackBar());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
