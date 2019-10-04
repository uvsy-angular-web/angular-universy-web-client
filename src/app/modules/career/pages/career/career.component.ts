import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  careers = [
    { name: 'Ingeniería en Sistemas de Información' },
    { name: 'Ingeniería Industrial' },
   ];

  constructor() { }

  ngOnInit() {
  }
}
