import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramRoutingModule} from './program-routing.module';
import {ProgramComponent} from './pages/program/program.component.';
import {SharedModule} from '../../shared/shared.module';
import { ProgramStatsComponent } from './pages/program-stats/program-stats.component';
import { SubjectsTableComponent } from './components/subjects-table/subjects-table.component';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [
    ProgramComponent,
    ProgramStatsComponent,
    SubjectsTableComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    SharedModule,
  ]
})
export class ProgramModule {
}
