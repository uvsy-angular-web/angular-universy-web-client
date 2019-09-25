import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './components/core/top-nav-bar/top-nav-bar.component';
import { ContactComponent } from './components/core/contact/contact.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { HomeComponent } from './components/core/home/home.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { CareerComponent } from './components/career/career.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    InstitutionComponent,
    CareerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
