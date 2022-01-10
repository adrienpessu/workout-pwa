import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StatsComponent} from './stats/stats.component';
import {CtrlComponent} from './ctrl/ctrl.component';
import {PrefsComponent} from './prefs/prefs.component';
import {StepsComponent} from './steps/steps.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {PlankComponent} from './plank/plank.component';
import {PushupComponent} from './pushup/pushup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pushup', component: PushupComponent},
  {path: 'plank', component: PlankComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CtrlComponent,
    PrefsComponent,
    StatsComponent,
    StepsComponent,
    HomeComponent,
    PlankComponent,
    PushupComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
