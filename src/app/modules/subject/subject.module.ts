import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubjectModalComponent} from './components/subject-modal/subject-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SubjectModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SubjectModalComponent,
  ]
})
export class SubjectModule { }
