import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import {PlanComponent} from './pages/plan/plan.component';
import { PlanEditComponent } from './pages/plan-edit/plan-edit.component';

@NgModule({
  declarations: [
    PlanComponent,
    PlanEditComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule
  ]
})
export class PlanModule { }