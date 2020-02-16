import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerRoutingModule} from './career-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CareerComponent} from './pages/career/career.component';
import { CareerStatsComponent } from './pages/career-stats/career-stats.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CareerComponent,
    CareerStatsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CareerRoutingModule,
    SharedModule,
  ],
})

export class CareerModule {
}
