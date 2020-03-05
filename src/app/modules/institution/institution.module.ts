import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InstitutionRoutingModule} from './institution-routing.module';
import {InstitutionComponent} from './pages/institution/institution.component';
import {SharedModule} from '../../shared/shared.module';
import { InstitutionStatsComponent } from './pages/institution-stats/institution-stats.component';
import { CareerStatsCardComponent } from './components/career-stats-card/career-stats-card.component';
import { ProgramItemComponent } from './components/program-item/program-item.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    InstitutionComponent,
    InstitutionStatsComponent,
    CareerStatsCardComponent,
    ProgramItemComponent,
  ],
  imports: [
    NgxPrintModule,
    NgxMasonryModule,
    CommonModule,
    InstitutionRoutingModule,
    SharedModule,
  ],
})
export class InstitutionModule {
}
