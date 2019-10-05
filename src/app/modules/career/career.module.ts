import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerRoutingModule} from './career-routing.module';
import {MyCareersComponent} from './pages/my-career/my-careers.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [MyCareersComponent, ModalComponent],
  imports: [
    CommonModule,
    CareerRoutingModule
  ],

})
export class CareerModule {
}
