import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent {
  @Input() currentCount: number;
  @Input() currentStepIndex: number;
  @Input() hideCounter: boolean;
  @Input() nextStepLabel: boolean;
  @Input() numberOfSteps: number;
  @Input() started: boolean;
  @Input() stepLabel: any;

  constructor() {
  }

}
