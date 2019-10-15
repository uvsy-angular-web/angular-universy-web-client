import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';
import {NameEditComponent} from './components/name-edit/name-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ConfirmActionModalComponent } from './components/confirm-action-modal/confirm-action-modal.component';


@NgModule({
  declarations: [
    ErrorModalComponent,
    NameEditComponent,
    ConfirmActionModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  entryComponents: [
    ErrorModalComponent,
    NameEditComponent,
    ConfirmActionModalComponent
  ]
})

export class NotificationModule {
}
