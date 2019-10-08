import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerRoutingModule} from './career-routing.module';
import {MyCareersComponent} from './pages/my-career/my-careers.component';
import {CareerModalComponent} from './components/career-modal/career-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MyCareersComponent,
    CareerModalComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule, NgbModule,
    NgbModule.forRoot(), ReactiveFormsModule
  ],
  entryComponents: [CareerModalComponent]
})

export class CareerModule {
}
