import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramRoutingModule} from './program-routing.module';
import {CareerComponent} from '../career/pages/career/career.component';
import {ProgramComponent} from './pages/program/program.component.';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {ProgramModalComponent} from './components/program-modal/program-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SubjectModalComponent } from '../subject/components/subject-modal/subject-modal.component';

@NgModule({
  declarations: [
    ProgramComponent,
    ProgramModalComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ProgramModalComponent
  ]
})
export class ProgramModule {
}
