import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {SubjectComponent} from './pages/subject/subject.component';
import {SubjectModalModule} from './modals/subject-modal.module';


@NgModule({
  declarations: [
    SubjectComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class SubjectModule {
}
