import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerRoutingModule} from './career-routing.module';
import {MyCareersComponent} from './pages/my-career/my-careers.component';
import {NameEditComponent} from '../../shared/modals/name-edit/name-edit.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    MyCareersComponent,
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    NgbModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    SharedModule
  ],
})

export class CareerModule {
}
