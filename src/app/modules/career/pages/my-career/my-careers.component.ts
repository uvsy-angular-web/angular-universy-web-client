import {Component, OnInit} from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-my-careers',
  templateUrl: './my-careers.component.html',
  styleUrls: ['./my-careers.component.css']
})
export class MyCareersComponent implements OnInit {

  careers = [
    {name: 'Ingeniería en Sistemas de Información'},
    {name: 'Ingeniería Industrial'},
    {name: 'Ingeniería Química'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
