import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, map, mergeMap, switchMap, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {StepsService} from '../shared/service/steps.service';
import {forkJoin, from, interval, of, ReplaySubject, Subscription} from 'rxjs';
import {ErrorService} from '../shared/service/error.service';
import {StorageService} from '../shared/service/storage.service';
import {PrefsInterface} from '../shared/interface/prefs.interface';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  stepLabel: string;
  nextStepLabel: string;
  countDownStart: number;

  currentStepIndex: number;
  numberOfSteps: number;
  started = false;

  paused = false;
  consecutiveDays = 0;

  prefs: PrefsInterface;

  next = new ReplaySubject();

  public endingAudio: HTMLAudioElement = new Audio();
  public startingAudio: HTMLAudioElement = new Audio();

  constructor(
    private errorService: ErrorService,
    private route: ActivatedRoute,
    public router: Router,
    private stepsService: StepsService,
    private storageService: StorageService
  ) {
    this.prefs = this.storageService.getPrefs();
    this.endingAudio.src = '../../../assets/sounds/mario.mp3';
    this.startingAudio.src = '../../../assets/sounds/countdown.mp3';
  }

  ngOnInit(): void {
    this.consecutiveDays = this.storageService.getConsecutiveDays();
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

        if (this.started && (this.currentStepIndex - 1) === this.numberOfSteps) {
          this.storageService.addConsecutiveDays();
        }

        if (this.currentStepIndex <= this.numberOfSteps) {
          const currentStep = steps[result - 1];
          const time = currentStep.duration;
          this.countDownStart = time;
          this.stepLabel = currentStep.title;
          if (steps[result] && steps[result].title) {
            this.nextStepLabel = steps[result].title;
          } else {
            this.nextStepLabel = '';
          }

          if (currentStep.countdown && this.prefs.volumeOn) {
            this.next.next(time);
          } else {
            this.timer(time);
          }
        } else {
          this.nextStepLabel = '';
        }
      }

    }, error => this.errorService.openSnackBar());

    this.next.pipe(
      mergeMap(time => forkJoin([of(time), this.startingAudio.play(), interval(1000).pipe(take(3))]))
    ).subscribe(time => this.timer(<number> time[0]));

  }

  private timer(time: number) {
    this.subscriptions.push(interval(1000)
      .pipe(filter(s => !this.paused), take(time),
        map((v) => (time - 1) - v))
      .subscribe((v) => {
        this.countDownStart = v;
        if (v === 0) {
          this.currentStepIndex++;
          this.endingAudio.load();
          if (this.prefs.volumeOn) {
            from(this.endingAudio.play()).subscribe(response => this.router.navigate(['/' + +this.currentStepIndex]));
          } else {
            this.router.navigate(['/' + +this.currentStepIndex]);
          }
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  triggerVolume() {
    this.prefs.volumeOn = !this.prefs.volumeOn;
    this.storageService.setPrefs(this.prefs);
  }

  refresh() {
    window.location.reload();
  }

}
