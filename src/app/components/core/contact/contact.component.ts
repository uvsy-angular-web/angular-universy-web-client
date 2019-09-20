import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts = [
    { name: 'Camila Alejandra', lastname: 'Corrales', img: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-128.png', rol:'Quality Assurance'},
    { name: 'Guido', lastname: 'Henry' , img: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-128.png', rol: 'Developed'},
    { name: 'Lorena Soledad', lastname: 'Ledesma', img:'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png', rol:'Scrum Master'},
    { name: 'Maximiliano', lastname: 'Pomar', img: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-128.png', rol: 'UX/UI Designer'},
    { name: 'Gonzalo Alejandro', lastname: 'Saad', img: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-128.png', rol:'Developed'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
