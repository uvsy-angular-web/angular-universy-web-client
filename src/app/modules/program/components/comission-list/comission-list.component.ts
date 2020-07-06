import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comission-list',
  templateUrl: './comission-list.component.html',
  styleUrls: ['./comission-list.component.css']
})
export class ComissionListComponent implements OnInit {
  addComissionBtnTxt = 'Agregar comisión';
  comissionsRowTitle = 'Comisiones';
  @Input() comissions = [];
  noRowMessage = 'No se cargó ninguna comisión';

  constructor() { }

  ngOnInit() {
  }

}
