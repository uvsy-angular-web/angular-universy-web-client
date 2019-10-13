import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {NotificationModule} from './shared/modals/notification.module';
import {SharedModule} from './shared/shared.module';
import {ProgramModalModule} from './modules/program/modals/program-modal.module';
import {SubjectModalModule} from './modules/subject/modals/subject-modal.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    ProgramModalModule,
    SubjectModalModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {
}
