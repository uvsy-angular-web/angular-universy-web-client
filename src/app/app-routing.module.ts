import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeModule} from "./modules/home/home.module";


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'career',
    loadChildren: () => import('./modules/career/career.module').then(mod => mod.CareerModule)
  },
  {
    path: 'institution',
    loadChildren: () => import('./modules/institution/institution.module').then(mod => mod.InstitutionModule)
  },
  {
    path: 'contact-info',
    loadChildren: () => import('./modules/contact-info/contact-info.module').then(mod => mod.ContactInfoModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
