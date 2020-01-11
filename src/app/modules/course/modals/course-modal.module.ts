import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeriodModalComponent} from './period-modal/period-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import { ScheduleModalComponent } from './schedule-modal/schedule-modal.component';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfessorModalComponent } from './professor-modal/professor-modal.component';
import { CourseModalComponent } from './course-modal/course-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PeriodModalComponent,
    ScheduleModalComponent,
    ProfessorModalComponent,
    CourseModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    NgbTimepickerModule
  ],
  entryComponents: [
    PeriodModalComponent,
    ScheduleModalComponent,
    ProfessorModalComponent
  ]
})
export class CourseModalModule {
}
