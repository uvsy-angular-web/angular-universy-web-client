import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerRoutingModule} from './career-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CareerComponent} from './pages/career/career.component';
//import { ModalsComponent } from './../../modals/modals.component';
import { CareerModalComponent } from './modals/career-modal/career-modal.component';


@NgModule({
  declarations: [
    CareerComponent,
    //ModalsComponent,
    CareerModalComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    SharedModule,
  ],
})

export class CareerModule {
}
