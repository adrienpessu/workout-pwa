import {Component, HostListener, OnInit} from '@angular/core';
import {StorageService} from '../shared/service/storage.service';

@Component({
  selector: 'app-pushup',
  templateUrl: './pushup.component.html',
  styleUrls: ['./pushup.component.scss']
})
export class PushupComponent implements OnInit {

  completedDays = 0;
  today = 0;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.completedDays = this.storageService.numberOf100pushupsDays();
    this.today = this.storageService.numberOf100pushupsToday();
  }

  plus(toAdd: number) {
    this.today += toAdd;
    this.storageService.addPushup(toAdd);
    this.completedDays = this.storageService.numberOf100pushupsDays();
  }

  reset() {
    this.today = 0;
    this.storageService.reset();
    this.completedDays = this.storageService.numberOf100pushupsDays();
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    if (!document.hidden) {
      this.completedDays = this.storageService.numberOf100pushupsDays();
      this.today = this.storageService.numberOf100pushupsToday();
    }
  }

}
