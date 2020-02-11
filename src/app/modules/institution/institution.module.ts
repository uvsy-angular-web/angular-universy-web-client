import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InstitutionRoutingModule} from './institution-routing.module';
import {InstitutionComponent} from './pages/institution/institution.component';
import {SharedModule} from '../../shared/shared.module';
import { InstitutionStatsComponent } from './pages/institution-stats/institution-stats.component';
import { CareerStatsCardComponent } from './components/career-stats-card/career-stats-card.component';


@NgModule({
  declarations: [
    InstitutionComponent,
    InstitutionStatsComponent,
    CareerStatsCardComponent,
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    SharedModule,
  ],
})
export class InstitutionModule {
}
