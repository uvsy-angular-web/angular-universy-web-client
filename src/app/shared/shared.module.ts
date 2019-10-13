import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddItemComponent} from './components/add-item/add-item.component';
import { ModuleTitleComponent } from './components/module-title/module-title.component';


@NgModule({
  declarations: [
    AddItemComponent,
    ModuleTitleComponent
  ],
  exports: [
    AddItemComponent,
    ModuleTitleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
