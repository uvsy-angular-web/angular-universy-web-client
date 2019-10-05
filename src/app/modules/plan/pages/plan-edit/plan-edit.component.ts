import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.css']
})
export class PlanEditComponent implements OnInit {

  levels = [
    { name: 'Nivel 1', 
      subjects: [ 
        { name: 'Análisis Matemático I'},
        { name: 'Matemática Discreta'},
        { name: 'Álgebra y Geometría Analítica'},
        { name: 'Algoritmos y Estructuras de Datos'},
        { name: 'Arquitectura de Computadores'},
        { name: 'Otra por aqui'},
        { name: 'Otra mas aca'}
    ] }, 
    { name: 'Nivel 2' }, 
    { name: 'Nivel 3' }
  ]

  

  constructor() { }

  ngOnInit() {
  }

}
