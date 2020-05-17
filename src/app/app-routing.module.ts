import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StepComponent} from './step/step.component';


const routes: Routes = [
  {path: '', component: StepComponent},
  {path: ':id', component: StepComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
