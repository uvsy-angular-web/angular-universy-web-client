import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services/system/navigation.service';



@Component({
  selector: 'app-bread-crum',
  templateUrl: './bread-crum.component.html',
  styleUrls: ['./bread-crum.component.css']
})
export class BreadCrumComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.generateLocations();
  }

  private generateLocations(){
    const currentPath = this.navigationService.getCurrentLocations();
    console.log(currentPath)
  }

}
