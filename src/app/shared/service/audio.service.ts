import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  endingAudio: HTMLAudioElement = new Audio();
  startingAudio: HTMLAudioElement = new Audio();

  constructor() {
    this.endingAudio.src = '../../../assets/sounds/mario.mp3';
    this.startingAudio.src = '../../../assets/sounds/countdown.mp3';
  }

  async playEnding() {
    this.endingAudio.load();
    await this.endingAudio.play();
  }

  async playStarting() {
    this.startingAudio.load();
    await this.startingAudio.play();
  }
}
