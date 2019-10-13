import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanRoutingModule} from './plan-routing.module';
import {ProgramComponent} from './pages/plan/program.component';
import {PlanEditComponent} from './pages/plan-edit/plan-edit.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {ProgramModalComponent} from './components/program-modal/program-modal.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ProgramComponent,
    PlanEditComponent,
    ProgramModalComponent,
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ProgramModalComponent
  ]
})
export class PlanModule {
}
