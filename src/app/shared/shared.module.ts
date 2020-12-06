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
import { PrintableSectionComponent } from './components/printable-section/printable-section.component';
import { NgxPrintModule } from 'ngx-print';
import { BreadCrumComponent } from './components/bread-crum/bread-crum.component';
import { NavigationLayoutComponent } from './components/navigation-layout/navigation-layout.component';
import { AcordionComponent } from './components/acordion/acordion.component';


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
    ErrorMessageComponent,
    PrintableSectionComponent,
    BreadCrumComponent,
    NavigationLayoutComponent,
    AcordionComponent
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
    ErrorMessageComponent,
    PrintableSectionComponent,
    BreadCrumComponent,
    NavigationLayoutComponent,
    AcordionComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  entryComponents: [
    ControlErrorComponent
  ]
})
export class SharedModule {
}
