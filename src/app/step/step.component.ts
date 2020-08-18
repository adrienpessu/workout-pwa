import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay, map, repeatWhen, take, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {StepsService} from '../shared/service/steps.service';
import {interval, Subject, Subscription} from 'rxjs';
import {ErrorService} from '../shared/service/error.service';
import {SwUpdate} from '@angular/service-worker';
import {StepInterface} from '../shared/interface/step.interface';
import {AudioService} from '../shared/service/audio.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnDestroy {

  readonly stop = new Subject<boolean>();
  readonly start = new Subject<boolean>();
  readonly reset = new Subject<boolean>();
  readonly next = new Subject<number>();

  currentCount: number;
  currentStepIndex: number = 0;
  hideCounter: boolean = false;
  hideRefresh = false;
  lastCount: number = 0;
  nextStepLabel: string;
  numberOfSteps: number = 1;
  paused = false;
  subscription: Subscription;
  started = false;
  steps: StepInterface[] = [];
  stepLabel: string;


  constructor(
    private audioService: AudioService,
    private errorService: ErrorService,
    public updates: SwUpdate,
    private route: ActivatedRoute,
    private stepsService: StepsService
  ) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.steps = this.stepsService.getSteps();
    const steps = this.stepsService.getSteps();
    this.numberOfSteps = steps.length;

    this.start.subscribe(async (resume: boolean = false) => {
      if (resume) {
        await this.newTimer(this.lastCount, false, this.steps[this.currentStepIndex].rest);
      } else {
        this.currentStepIndex = 0;
        this.stepLabel = this.steps[0].title;
        if (this.steps[1] && this.steps[1].title) {
          this.nextStepLabel = this.steps[1].title;
        } else {
          this.nextStepLabel = '';
        }

        await this.newTimer(this.steps[0].duration, this.steps[0].countdown, this.steps[0].rest);
      }
      this.started = true;
    });

    this.next.subscribe(async (index: number) => {
      await this.audioService.playEnding();
      this.currentStepIndex = index;
      if (index === this.steps.length) {
        this.started = false;
        return;
      }
      if (this.steps[index]) {
        this.stepLabel = this.steps[index].title;
        if (this.steps[index + 1] && this.steps[index + 1].title) {
          this.nextStepLabel = this.steps[index + 1].title;
        } else {
          this.nextStepLabel = '';
        }
        await this.newTimer(this.steps[index].duration, this.steps[index].countdown, this.steps[index].rest);
      }
    });

    this.reset.subscribe(() => {
      this.ngOnDestroy();
      this.started = false;
    });
  }

  onNext(value: number) {
    this.next.next(value);
  }

  onPaused(value: boolean) {
    this.paused = value;
    if (value) {
      this.stop.next();
      this.lastCount = this.currentCount;
    } else {
      this.start.next(true);
    }
  }

  onReset() {
    this.reset.next();
  }

  onStart(value: boolean) {
    this.start.next(value);
  }

  reload() {
    this.hideRefresh = true;
    this.updates.activateUpdate().then(() => document.location.reload());
    this.hideRefresh = false;
    window.location.reload();
  }

  private async newTimer(time: number, countDown?: boolean, rest: number = 0) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.currentCount = time;

    const totalTime = time + rest;

    let delayCount = 0;
    if (countDown) {
      delayCount = 3000;
      this.hideCounter = true;
      await this.audioService.playStarting();
    }

    let breakSound = false;

    this.subscription = interval(1000) // 1 second
      .pipe(
        take(totalTime), // number of time
        repeatWhen(() => this.start), // to manage restart when paused
        takeUntil(this.stop), // to stop when paused
        delay(delayCount),
        map(value => totalTime - value - 1) // to invert the count to have a countdown
      )
      .subscribe(async value => {
        this.hideCounter = false;
        const restPoint = value - rest < 0;
        if (!restPoint) {
          this.currentCount = value - rest;
        } else {
          this.stepLabel = 'Break';
          this.currentCount = value;
        }

        if (rest > 0 && restPoint && !breakSound) {
          await this.audioService.playEnding();
          breakSound = true;
        }

        if (value === 0) {
          this.next.next(this.currentStepIndex + 1);
        }
      }, (err) => {
        console.error(err);
      });
    return this.subscription;
  }
}
