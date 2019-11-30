import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {InformationModalComponent} from './components/error-modal/information-modal.component';
import {NameEditComponent} from './components/name-edit/name-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmActionModalComponent} from './components/confirm-action-modal/confirm-action-modal.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    InformationModalComponent,
    NameEditComponent,
    ConfirmActionModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [
    InformationModalComponent,
    NameEditComponent,
    ConfirmActionModalComponent
  ]
})

export class ModalModule {
}
