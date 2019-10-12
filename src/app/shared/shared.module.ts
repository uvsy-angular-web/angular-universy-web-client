import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddItemComponent} from './components/add-item/add-item.component';


@NgModule({
  declarations: [
    AddItemComponent
  ],
  exports: [
    AddItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
