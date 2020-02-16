import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerRoutingModule} from './career-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CareerComponent} from './pages/career/career.component';
import { CareerStatsComponent } from './pages/career-stats/career-stats.component';

@NgModule({
  declarations: [
    CareerComponent,
    CareerStatsComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    SharedModule,
  ],
})

export class CareerModule {
}
