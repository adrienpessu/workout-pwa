import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {StorageService} from './shared/service/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public updates: SwUpdate, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    const path = this.storageService.getPathPref();
    if (path) {
      this.router.navigate([path]);
    }
  }

  navigateTo(path: string) {
    this.storageService.setPathPref(path);
    this.router.navigate([path]);
  }

  reload() {
    this.updates.activateUpdate().then(() => document.location.reload());
    window.location.reload();
  }
}
