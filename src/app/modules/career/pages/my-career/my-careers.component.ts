import {Component, OnInit} from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-my-careers',
  templateUrl: './my-careers.component.html',
  styleUrls: ['./my-careers.component.css']
})
export class MyCareersComponent implements OnInit {

  careers = [
    {careerName: 'Ingeniería en Sistemas de Información', active: true},
    {careerName: 'Ingeniería Industrial', active: false},
    {careerName: 'Ingeniería Química', active: true},
    {careerName: 'Otra Ingeniería capaz', active: false},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
