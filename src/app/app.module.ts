import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StatsComponent } from './stats/stats.component';
import { CtrlComponent } from './ctrl/ctrl.component';
import { PrefsComponent } from './prefs/prefs.component';

@NgModule({
  declarations: [
    AppComponent,
    CtrlComponent,
    PrefsComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
