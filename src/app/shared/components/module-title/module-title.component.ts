import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-module-title',
  templateUrl: './module-title.component.html',
  styleUrls: ['./module-title.component.css']
})
export class ModuleTitleComponent implements OnInit {

  @Input() title: string;
  @Input() showDeleteButton = true;
  @Input() showEditButton = true;
  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  public navigateToPreviousPage() {
    this.location.back();
  }

  public editItemAction() {
    this.editItem.emit();
  }

  public deleteItemAction() {
    this.deleteItem.emit();
  }

}
