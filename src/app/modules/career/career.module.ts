import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerRoutingModule} from './career-routing.module';
import {MyCareersComponent} from './pages/my-career/my-careers.component';


@NgModule({
  declarations: [MyCareersComponent],
  imports: [
    CommonModule,
    CareerRoutingModule
  ],

})
export class CareerModule {
}
