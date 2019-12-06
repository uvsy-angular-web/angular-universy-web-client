import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';


const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'institution',
    canActivate : [AuthGuard],
    loadChildren: () => import('./modules/institution/institution.module').then(mod => mod.InstitutionModule)
  },
  {
    path: 'contact-info',
    canActivate : [AuthGuard],
    loadChildren: () => import('./modules/contact-info/contact-info.module').then(mod => mod.ContactInfoModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
