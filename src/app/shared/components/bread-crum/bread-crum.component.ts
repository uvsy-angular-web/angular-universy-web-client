import { Component, OnInit } from '@angular/core';
import { BreadcrumService } from 'src/app/core/services/system/breadcrum.service';
import { BreadCrum } from 'src/app/models/breadcrum.model';



@Component({
  selector: 'app-bread-crum',
  templateUrl: './bread-crum.component.html',
  styleUrls: ['./bread-crum.component.css']
})
export class BreadCrumComponent implements OnInit {
  breadcrums: BreadCrum[];
  title = 'Mapa';

  constructor(private breadcrumService: BreadcrumService) { }

  ngOnInit() {
    this.generateLocations();
  }

  private generateLocations() {
    this.breadcrums = this.breadcrumService.getCurrentBreadcrums();
  }

}
