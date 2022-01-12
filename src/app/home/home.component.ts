import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../shared/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    const pathPref = this.storageService.getPathPref();
  }

  navigateTo(path: string) {
    this.storageService.setPathPref(path);
    this.router.navigate([path]);
  }
}
