import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './pages/program/program.component.';
import { SharedModule } from '../../shared/shared.module';
import { ProgramStatsComponent } from './pages/program-stats/program-stats.component';
import { SubjectsTableComponent } from './components/subjects-table/subjects-table.component';
import { StatsComponent } from './components/stats/stats.component';
import { SubjectStatsComponent } from './components/subject-stats/subject-stats.component';
import { ProgramSummaryComponent } from './pages/program-summary/program-summary.component';
import { SubjectModule } from '../subject/subject.module';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    ProgramComponent,
    ProgramStatsComponent,
    SubjectsTableComponent,
    StatsComponent,
    SubjectStatsComponent,
    ProgramSummaryComponent,
  ],
  imports: [
    NgxPrintModule,
    CommonModule,
    ProgramRoutingModule,
    SubjectModule,
    SharedModule,
  ]
})
export class ProgramModule {
}
