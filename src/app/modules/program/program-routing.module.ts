import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './pages/program/program.component';
import { ProgramStatsComponent } from './pages/program-stats/program-stats.component';
import { ProgramSummaryComponent } from './pages/program-summary/program-summary.component';


const routes: Routes = [
  {
    path: '',
    component: ProgramComponent
  },
  {
    path: 'stats',
    component: ProgramStatsComponent
  },
  {
    path: 'stats/summary',
    component: ProgramSummaryComponent
  },
  {
    path: 'subject',
    loadChildren: () => import('src/app/modules/subject/subject.module').then(mod => mod.SubjectModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {
}
