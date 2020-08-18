import {Component, OnInit} from '@angular/core';
import {PrefsInterface} from '../shared/interface/prefs.interface';
import {StorageService} from '../shared/service/storage.service';

@Component({
  selector: 'app-prefs',
  templateUrl: './prefs.component.html',
  styleUrls: ['./prefs.component.scss']
})
export class PrefsComponent implements OnInit {

  prefs: PrefsInterface;

  constructor(private storageService: StorageService) {
    this.prefs = this.storageService.getPrefs();
  }

  ngOnInit(): void {
  }

  triggerVolume() {
    this.prefs.volumeOn = !this.prefs.volumeOn;
    this.storageService.setPrefs(this.prefs);
  }

}
