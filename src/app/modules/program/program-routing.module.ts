import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProgramComponent} from './pages/program/program.component.';


const routes: Routes = [
  {path: '', component: ProgramComponent},
  {
    path: 'subject',
    loadChildren: () => import('src/app/modules/subject/subject.module').then(mod => mod.SubjectModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {
}
