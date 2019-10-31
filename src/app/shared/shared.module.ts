import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddItemComponent} from './components/add-item/add-item.component';
import {ModuleTitleComponent} from './components/module-title/module-title.component';
import {ControlErrorComponent} from './control-error/control-error/control-error.component';
import {ControlErrorsDirective} from './control-error/directives/control-error.directive';
import {FormSubmitDirective} from './control-error/directives/form.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomToggleComponent} from './components/custom-toggle/custom-toggle.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AddItemComponent,
    ModuleTitleComponent,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorComponent,
    CustomToggleComponent
  ],
  exports: [
    AddItemComponent,
    ModuleTitleComponent,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorComponent,
    CustomToggleComponent
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
