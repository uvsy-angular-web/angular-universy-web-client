import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstitutionComponent} from './pages/institution/institution.component';


const routes: Routes = [
  {path: '', component: InstitutionComponent},
  {
    path: 'career',
    loadChildren: () => import('src/app/modules/career/career.module').then(mod => mod.CareerModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionRoutingModule {
}
