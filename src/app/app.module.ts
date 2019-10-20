import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {ProgramModalModule} from './modules/program/modals/program-modal.module';
import {SubjectModalModule} from './modules/subject/modals/subject-modal.module';
import {MatProgressSpinnerModule} from '@angular/material';
import {LoaderService} from './core/services/system/loader.service';
import {LoaderInterceptor} from './core/interceptors/loader.interceptor';
import {NotificationModule} from './shared/modals/notification.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    ProgramModalModule,
    NotificationModule,
    SubjectModalModule,
    BrowserModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
