import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopNavBarComponent} from './top-nav-bar/top-nav-bar.component';
import {FooterComponent} from './footer/footer.component';
import {CareerService} from './services/career.service';


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
  ],
  providers: [
    CareerService
  ]
})
export class CoreModule {
}
