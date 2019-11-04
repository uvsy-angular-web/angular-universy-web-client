import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-custom-title',
  templateUrl: './custom-title.component.html',
  styleUrls: ['./custom-title.component.css']
})
export class CustomTitleComponent implements OnInit {

  @Input() title: string;
  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  @Input() showDeleteButton = true;
  @Input() showEditButton = true;
  @Input() showNavigationArrow = true;

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
