import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/core/contact/contact.component';
import { HomeComponent } from 'src/app/components/core/home/home.component';
import { InstitutionComponent } from './components/institution/institution.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'institution' , component: InstitutionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
