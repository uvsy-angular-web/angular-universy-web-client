import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InstitutionRoutingModule} from "./modules/institution/institution-routing.module";
import {CareerRoutingModule} from "./modules/career/career-routing.module";
import {HomeRoutingModule} from "./modules/home/home-routing.module";
import {ContactInfoRoutingModule} from "./modules/contact-info/contact-info-routing.module";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
