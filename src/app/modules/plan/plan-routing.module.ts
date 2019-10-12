import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProgramComponent} from './pages/plan/program.component';
import {PlanEditComponent} from './pages/plan-edit/plan-edit.component';


const routes: Routes = [
  {path: '', component: ProgramComponent},
  {path: 'plan-edit', component: PlanEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {
}
