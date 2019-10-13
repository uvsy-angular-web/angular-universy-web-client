import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopNavBarComponent} from './top-nav-bar/top-nav-bar.component';
import {FooterComponent} from './footer/footer.component';
import {CareerService} from './services/career.service';
import {SystemConfigService} from './services/config/system-config.service';
import { LoaderComponent } from './loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material';


@NgModule({
  declarations: [
    TopNavBarComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    TopNavBarComponent,
    FooterComponent,
    LoaderComponent
  ],
  providers: [
    CareerService,
    SystemConfigService,
  ]
})
export class CoreModule {
}
