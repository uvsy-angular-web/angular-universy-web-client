import {Component, OnInit} from '@angular/core';
import {Contact} from '../../../../models/contact.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  contacts: Contact[];

  constructor() {
  }

  ngOnInit() {
    this.initializeContacts();
  }

  private initializeContacts() {
    this.contacts = [
      new Contact(
        'Camila Alejandra',
        'Corrales',
        'Quality Assurance',
        'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-128.png'
      ),
      new Contact(
        'Guido',
        'Henry',
        'Developer',
        'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-128.png'
      ),
      new Contact(
        'Lorena Soledad',
        'Ledesma',
        'Scrum Master',
        'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png'
      ),
      new Contact(
        'Maximiliano',
        'Pomar',
        'UX/UI Designer',
        'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-128.png'
      ),
      new Contact(
        'Gonzalo',
        'Saad',
        'Developer',
        'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-128.png'
      )
    ];
  }

}
