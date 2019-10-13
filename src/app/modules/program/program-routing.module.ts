import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProgramComponent} from './pages/program/program.component.';


const routes: Routes = [
  {path: '', component: ProgramComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {
}
