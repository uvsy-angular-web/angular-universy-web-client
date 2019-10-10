import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanComponent } from './pages/plan/plan.component';
import { PlanEditComponent } from './pages/plan-edit/plan-edit.component';


const routes: Routes = [
  {path: ':institutionKey/:careerCode', component: PlanComponent},
  {path: 'plan-edit/:planCode', component: PlanEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
