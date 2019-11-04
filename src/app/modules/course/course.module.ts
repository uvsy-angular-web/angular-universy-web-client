import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import {CourseComponent} from './pages/course/course.component';
import {SharedModule} from '../../shared/shared.module';
import { PeriodComponent } from './components/period/period.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { ProfessorsComponent } from './components/teachers/professors.component';

@NgModule({
  declarations: [
    CourseComponent,
    PeriodComponent,
    SchedulesComponent,
    ProfessorsComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ]
})
export class CourseModule { }
