import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {SubjectModalComponent} from './subject-modal/subject-modal.component';


@NgModule({
  declarations: [
    SubjectModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  entryComponents: [
    SubjectModalComponent,
  ]
})
export class SubjectModalModule { }
