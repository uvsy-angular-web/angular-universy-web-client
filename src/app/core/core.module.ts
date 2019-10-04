import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopNavBarComponent} from './top-nav-bar/top-nav-bar.component';
import {FooterComponent} from './footer/footer.component';
import {CareerComponent} from '../modules/career/pages/career/career.component';


@NgModule({
  declarations: [
    TopNavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopNavBarComponent,
    FooterComponent
  ]
})
export class CoreModule {
}
