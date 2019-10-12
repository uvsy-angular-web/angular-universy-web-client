import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanRoutingModule} from './plan-routing.module';
import {PlanComponent} from './pages/plan/plan.component';
import {PlanEditComponent} from './pages/plan-edit/plan-edit.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PlanComponent,
    PlanEditComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    NgbModule.forRoot()
  ]
})
export class PlanModule {
}
