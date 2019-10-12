import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';
import {NameEditComponent} from './components/name-edit/name-edit.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ErrorModalComponent,
    NameEditComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  entryComponents: [
    ErrorModalComponent,
    NameEditComponent
  ]
})

export class NotificationModule {
}
