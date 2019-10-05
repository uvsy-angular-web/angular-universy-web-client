import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyCareersComponent} from './pages/my-career/my-careers.component';

const routes: Routes = [
  {path: '', component: MyCareersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule {
}
