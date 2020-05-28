import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CustomTitleComponent } from './components/custom-title/custom-title.component';
import { ControlErrorComponent } from './control-error/control-error/control-error.component';
import { ControlErrorsDirective } from './control-error/directives/control-error.directive';
import { FormSubmitDirective } from './control-error/directives/form.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomToggleComponent } from './components/custom-toggle/custom-toggle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoItemMessageComponent } from './components/no-item-message/no-item-message.component';
import { TableActionsComponent } from './components/table/table-actions/table-actions.component';
import { ModalHeaderComponent } from './components/modals/modal-header/modal-header.component';
import { ModalConfirmFooterComponent } from './components/modals/modal-confirm-footer/modal-confirm-footer.component';
import { ModalRepeatedWordsFooterComponent } from './components/modals/modal-repeated-words-footer/modal-repeated-words-footer.component';
import { GraphBarComponent } from './components/graph-bar/graph-bar.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';


@NgModule({
  declarations: [
    AddItemComponent,
    CustomTitleComponent,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorComponent,
    CustomToggleComponent,
    NoItemMessageComponent,
    TableActionsComponent,
    ModalHeaderComponent,
    ModalConfirmFooterComponent,
    ModalRepeatedWordsFooterComponent,
    GraphBarComponent,
    ErrorMessageComponent
  ],
  exports: [
    GraphBarComponent,
    AddItemComponent,
    CustomTitleComponent,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorComponent,
    CustomToggleComponent,
    NoItemMessageComponent,
    TableActionsComponent,
    ModalHeaderComponent,
    ModalConfirmFooterComponent,
    ModalRepeatedWordsFooterComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ControlErrorComponent
  ]
})
export class SharedModule {
}
