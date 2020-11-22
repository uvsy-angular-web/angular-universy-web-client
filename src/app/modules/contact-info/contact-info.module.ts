import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from './pages/contact-info/contact-info.component';
import { ContactInfoRoutingModule } from './contact-info-routing.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ContactInfoComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ContactInfoRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ContactInfoModule {
}
