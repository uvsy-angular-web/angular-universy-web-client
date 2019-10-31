import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CareerComponent} from './pages/career/career.component';

const routes: Routes = [
  {path: '', component: CareerComponent},
  {
    path: 'program',
    loadChildren: () => import('../program/program.module').then(mod => mod.ProgramModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule {
}
