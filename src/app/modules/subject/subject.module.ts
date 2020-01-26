import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {SubjectComponent} from './pages/subject/subject.component';
import {SubjectRoutingModule} from './subject-routing.module';
import { CorrelativeListComponent } from './components/correlative-list/correlative-list.component';


@NgModule({
  declarations: [
    SubjectComponent,
    CorrelativeListComponent,
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
