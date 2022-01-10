import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public updates: SwUpdate,) {
  }

  ngOnInit(): void {
  }

  reload() {
    this.updates.activateUpdate().then(() => document.location.reload());
    window.location.reload();
  }
}
