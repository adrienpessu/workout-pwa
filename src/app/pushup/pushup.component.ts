import {Component, OnInit} from '@angular/core';
import {StorageService} from '../shared/service/storage.service';

@Component({
  selector: 'app-pushup',
  templateUrl: './pushup.component.html',
  styleUrls: ['./pushup.component.scss']
})
export class PushupComponent implements OnInit {

  completedDays = 0;
  today = 0;

  constructor(private storageServerice: StorageService) {
  }

  ngOnInit(): void {
    this.completedDays = this.storageServerice.numberOf100pushupsDays();
    this.completedDays = this.storageServerice.numberOf100pushupsToday();
  }

  plus(toAdd: number) {
    this.today += toAdd;
  }

  reset() {
    this.today = 0;
  }

}
