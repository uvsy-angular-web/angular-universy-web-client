import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramRoutingModule} from './program-routing.module';
import {ProgramComponent} from './pages/program/program.component.';
import {SharedModule} from '../../shared/shared.module';
import {ProgramModalModule} from './modals/program-modal.module';

@NgModule({
  declarations: [
    ProgramComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    SharedModule,
    ProgramModalModule,
  ]
})
export class ProgramModule {
}
