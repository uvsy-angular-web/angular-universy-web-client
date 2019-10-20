import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import {CourseComponent} from './pages/course/course.component';

@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
