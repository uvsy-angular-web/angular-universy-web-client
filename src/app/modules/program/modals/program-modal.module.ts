import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgramModalComponent} from './program-modal/program-modal.component';
import {PublishProgramModalComponent} from './publish-program-modal/publish-program-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ProgramModalComponent,
    PublishProgramModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    ProgramModalComponent,
    PublishProgramModalComponent
  ]
})
export class ProgramModalModule {
}
