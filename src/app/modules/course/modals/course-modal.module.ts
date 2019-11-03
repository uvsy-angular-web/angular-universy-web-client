import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeriodModalComponent} from './period-modal/period-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [
    PeriodModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    PeriodModalComponent,
  ]
})
export class CourseModalModule {
}
