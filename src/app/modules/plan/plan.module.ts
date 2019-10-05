import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import {PlanComponent} from './pages/plan/plan.component';

@NgModule({
  declarations: [
    PlanComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule
  ]
})
export class PlanModule { }