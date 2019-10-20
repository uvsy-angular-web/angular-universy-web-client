import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {SubjectModalComponent} from './subject-modal/subject-modal.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [
    SubjectModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    SubjectModalComponent,
  ]
})
export class SubjectModalModule { }
