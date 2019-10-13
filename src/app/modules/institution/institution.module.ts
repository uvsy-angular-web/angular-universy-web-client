import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InstitutionRoutingModule} from './institution-routing.module';
import {InstitutionComponent} from './pages/institution/institution.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    InstitutionComponent
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    SharedModule
  ],
})
export class InstitutionModule {
}
