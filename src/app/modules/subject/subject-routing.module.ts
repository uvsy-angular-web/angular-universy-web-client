import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from './pages/subject/subject.component';

const routes: Routes = [
  {path: '', component: SubjectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
