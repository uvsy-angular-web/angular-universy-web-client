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
import {ModalModule} from './modals/modal.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CourseModalModule} from './modules/course/modals/course-modal.module';
<<<<<<< HEAD
import {CareerModalModule} from './modules/career/modals/career-modal.module';
=======
import {AuthGuard} from './shared/guards/auth.guard';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
>>>>>>> 4224ef4a9db2da4ccc9e9fe0a01ccdd659deb1bf

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
    ModalModule,
    SubjectModalModule,
    CourseModalModule,
    BrowserModule,
    NgbModule,
    MatProgressSpinnerModule,
    CareerModalModule
  ],
  providers: [
    AuthGuard,
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
