import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './pages/program/program.component.';
import { ProgramStatsComponent } from './pages/program-stats/program-stats.component';


const routes: Routes = [
  { path: '', component: ProgramComponent },
  {
    path: 'subject',
    loadChildren: () => import('src/app/modules/subject/subject.module').then(mod => mod.SubjectModule)
  },
  {
    path: 'stats',
    component: ProgramStatsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {
}
