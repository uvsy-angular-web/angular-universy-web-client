import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerRoutingModule} from './career-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {CareerComponent} from './pages/career/career.component';


@NgModule({
  declarations: [
    CareerComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    NgbModule,
    NgbModule.forRoot(),
    SharedModule
  ],
})

export class CareerModule {
}
