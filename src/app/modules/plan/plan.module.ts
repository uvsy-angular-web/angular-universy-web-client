import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanRoutingModule} from './plan-routing.module';
import {ProgramComponent} from './pages/plan/program.component';
import {PlanEditComponent} from './pages/plan-edit/plan-edit.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {ProgramModalComponent} from './components/add-program-modal/program-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PostProgramModalComponent } from './components/post-program-modal/post-program-modal.component';

@NgModule({
  declarations: [
    ProgramComponent,
    PlanEditComponent,
    ProgramModalComponent,
    PostProgramModalComponent,
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ProgramModalComponent,
    PostProgramModalComponent
  ]
})
export class PlanModule {
}
