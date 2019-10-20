import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddItemComponent} from './components/add-item/add-item.component';
import {ModuleTitleComponent} from './components/module-title/module-title.component';
import {ControlErrorComponent} from './control-error/control-error/control-error.component';
import {ControlErrorsDirective} from './control-error/directives/control-error.directive';
import {FormSubmitDirective} from './control-error/directives/form.directive';


@NgModule({
  declarations: [
    AddItemComponent,
    ModuleTitleComponent,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorComponent
  ],
  exports: [
    AddItemComponent,
    ModuleTitleComponent,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    ControlErrorComponent
  ]
})
export class SharedModule {
}
