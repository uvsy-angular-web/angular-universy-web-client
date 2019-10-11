import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanComponent} from './pages/plan/plan.component';
import {PlanEditComponent} from './pages/plan-edit/plan-edit.component';


const routes: Routes = [
  {path: '', component: PlanComponent},
  {path: 'plan-edit', component: PlanEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {
}
