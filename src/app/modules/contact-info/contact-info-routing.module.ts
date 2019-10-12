import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactInfoComponent} from './pages/contact-info/contact-info.component';


const routes: Routes = [
  {path: '', component: ContactInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactInfoRoutingModule {
}
