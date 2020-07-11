import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/models/institution.model';
import { InstitutionService } from 'src/app/core/services/institution.service';

@Component({
  selector: 'app-institution-stats',
  templateUrl: './institution-stats.component.html',
  styleUrls: ['./institution-stats.component.css']
})
export class InstitutionStatsComponent implements OnInit {
  title = 'Mis estadisticas';
  institution: Institution;
  printButtonText = 'Imprimir';
  printStyle = {
    i: { opacity: 0 },
    button: { opacity: 0 }
  };
  constructor(private institutionService: InstitutionService) { }

  ngOnInit() {
    this.getCurrentInstitution();
  }

  private getCurrentInstitution() {
    this.institution = this.institutionService.getCurrentInstitution();
  }
}
