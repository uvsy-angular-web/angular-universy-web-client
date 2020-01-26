import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SubjectModalComponent} from './subject-modal/subject-modal.component';
import {SharedModule} from '../../../shared/shared.module';
import { SubjectCorrelativesComponent } from './subject-correlatives/subject-correlatives.component';
import { SubjectModule } from '../subject.module';


@NgModule({
  declarations: [
    SubjectModalComponent,
    SubjectCorrelativesComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    SubjectModule,
  ],
  entryComponents: [
    SubjectCorrelativesComponent,
    SubjectModalComponent,
  ]
})
export class SubjectModalModule { }
