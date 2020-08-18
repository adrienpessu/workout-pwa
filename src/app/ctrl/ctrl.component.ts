import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ctrl',
  templateUrl: './ctrl.component.html',
  styleUrls: ['./ctrl.component.scss']
})
export class CtrlComponent implements OnInit {

  @Input() currentStepIndex: number = 0;
  @Input() paused: boolean;
  @Input() started: boolean;

  @Output() triggerPause = new EventEmitter<boolean>();
  @Output() triggerReset = new EventEmitter<boolean>();
  @Output() triggerStart = new EventEmitter<boolean>();
  @Output() triggerNext = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
