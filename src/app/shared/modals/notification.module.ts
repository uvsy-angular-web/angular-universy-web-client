import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';


@NgModule({
  declarations: [
    ErrorModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    ErrorModalComponent
  ]
})

export class NotificationModule {
}
