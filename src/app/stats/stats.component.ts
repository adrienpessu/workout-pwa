import {Component, OnChanges, OnInit} from '@angular/core';
import {StorageService} from '../shared/service/storage.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stats: any = {};

  constructor(private storageService: StorageService) {}

  clearStats() {
    this.stats = this.storageService.clear();
  }

  ngOnInit(): void {
    this.stats = this.storageService.stats();
  }

}
