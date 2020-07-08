import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {SubjectComponent} from './pages/subject/subject.component';
import {SubjectRoutingModule} from './subject-routing.module';
import { CorrelativeListComponent } from './components/correlative-list/correlative-list.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';


@NgModule({
  declarations: [
    SubjectComponent,
    CorrelativeListComponent,
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
  ],
  exports: [
    CorrelativeListComponent
  ]
})
export class SubjectModule {
}
