import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramRoutingModule} from './program-routing.module';
import {ProgramComponent} from './pages/program/program.component.';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {ProgramModalComponent} from './components/program-modal/program-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PostProgramModalComponent} from './components/post-program-modal/post-program-modal.component';

@NgModule({
  declarations: [
    ProgramComponent,
    ProgramModalComponent,
    PostProgramModalComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ProgramModalComponent,
    PostProgramModalComponent
  ]
})
export class ProgramModule {
}
