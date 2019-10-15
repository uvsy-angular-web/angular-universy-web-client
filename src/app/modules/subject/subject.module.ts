import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {SubjectComponent} from './pages/subject/subject.component';
import {SubjectRoutingModule} from './subject-routing.module';


@NgModule({
  declarations: [
    SubjectComponent,
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
  ]
})
export class SubjectModule {
}
