import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.css']
})
export class CommissionListComponent implements OnInit {
  @Input() commissions = [];
  addCommissionBtnTxt = 'Agregar comisión';
  commissionsRowTitle = 'Comisiones';
  noRowMessage = 'No se cargó ninguna comisión';
  accionsRowTitle = 'Acciones';
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
