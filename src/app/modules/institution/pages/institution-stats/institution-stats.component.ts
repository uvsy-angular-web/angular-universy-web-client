import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/models/career.model';
import { InstitutionService } from 'src/app/core/services/institution.service';

@Component({
  selector: 'app-institution-stats',
  templateUrl: './institution-stats.component.html',
  styleUrls: ['./institution-stats.component.css']
})
export class InstitutionStatsComponent implements OnInit {
  title = 'Mis estadisticas';
  careerListTxt = 'Mis carreras';
  institution: Institution;
  constructor() { }

  ngOnInit() {
    this.getCurrentInstitution();
  }

  private getCurrentInstitution() {
    this.institution = InstitutionService.getCurrentInstitution();
  }
}
