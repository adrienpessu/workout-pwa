import {Injectable} from '@angular/core';
import {PrefsInterface} from '../interface/prefs.interface';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  endingAudio: HTMLAudioElement = new Audio();
  startingAudio: HTMLAudioElement = new Audio();
  prefs: PrefsInterface;

  constructor(private storageService: StorageService) {
    this.endingAudio.src = '../../../assets/sounds/mario.mp3';
    this.startingAudio.src = '../../../assets/sounds/countdown.mp3';

    this.prefs = this.storageService.getPrefs();
  }

  async playEnding() {
    if (this.prefs.volumeOn) {
      this.endingAudio.load();
      await this.endingAudio.play();
    }
  }

  async playStarting() {
    debugger;
    if (this.prefs.volumeOn) {
      this.startingAudio.load();
      await this.startingAudio.play();
    }
  }
}
