import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationService } from '../../../core/services/system/navigation.service';
import { Route } from 'src/app/core/services/system/routes/routes.enum';
import { BreadcrumService } from 'src/app/core/services/system/breadcrum.service';

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
  @Input() showCurrentLocation = true;
  @Input() backNavigationRoute: Route;
  currentLocationLabel: string;
  constructor(private navigationService: NavigationService, private breadcrumService: BreadcrumService) {
  }

  ngOnInit() {
    this.getCurrentLocationLabel()
  }

  public navigateToPreviousPage() {
    if (this.backNavigationRoute) {
      this.navigationService.navigateToRoute(this.backNavigationRoute);
    } else {
      this.navigationService.navigateToPreviousPage();
    }
  }

  public editItemAction() {
    this.editItem.emit();
  }

  public deleteItemAction() {
    this.deleteItem.emit();
  }

  private getCurrentLocationLabel() {
    this.currentLocationLabel =  this.breadcrumService.getCurrentLocationLabel()
  }

}
