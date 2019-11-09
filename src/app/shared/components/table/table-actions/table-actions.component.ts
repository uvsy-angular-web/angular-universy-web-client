import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.css']
})
export class TableActionsComponent implements OnInit {
  @Output() editAction = new EventEmitter();
  @Output() deleteAction = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public editActionPressed() {
    this.editAction.next();
  }

  public deleteActionPressed() {
    this.deleteAction.next();
  }
}
