import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramRoutingModule} from './program-routing.module';
import {ProgramComponent} from './pages/program/program.component.';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProgramComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    SharedModule,
  ]
})
export class ProgramModule {
}
