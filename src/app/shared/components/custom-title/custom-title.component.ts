import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationService} from '../../../core/services/system/navigation.service';

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

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  public navigateToPreviousPage() {
    this.navigationService.navigateToPreviousPage();
  }

  public editItemAction() {
    this.editItem.emit();
  }

  public deleteItemAction() {
    this.deleteItem.emit();
  }

}
