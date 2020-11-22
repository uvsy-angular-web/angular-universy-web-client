import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { InstitutionReport } from 'src/app/models/institution-report.model';

@Component({
  selector: 'app-institution-stats',
  templateUrl: './institution-stats.component.html',
  styleUrls: ['./institution-stats.component.css']
})
export class InstitutionStatsComponent implements OnInit {
  title = 'Estadisticas generales de las carreras';
  institutionReport: InstitutionReport;
  printButtonText = 'Imprimir';

  constructor(private institutionServicce: InstitutionService) { }

  ngOnInit() {
    this.getInstitutionReport();
  }

  private getInstitutionReport() {
    this.institutionServicce.getCurrentInstitutionReport()
      .subscribe(
        (institutionReport: InstitutionReport) =>
          this.institutionReport = institutionReport
      );
  }

}
