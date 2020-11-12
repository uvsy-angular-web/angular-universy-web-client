import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { InstitutionReport } from 'src/app/models/institution-report.model';

@Component({
  selector: 'app-institution-stats',
  templateUrl: './institution-stats.component.html',
  styleUrls: ['./institution-stats.component.css']
})
export class InstitutionStatsComponent implements OnInit {
  title = 'Mis estadisticas';
  institutionReport: InstitutionReport;
  printButtonText = 'Imprimir';
  printStyle = {
    i: { opacity: 0 },
    button: { opacity: 0 }
  };
  constructor(private institutionServicce: InstitutionService) { }

  ngOnInit() {
    this.getInstitutionReport();
  }

  private getInstitutionReport() {
    this.institutionServicce.getCurrentInstitutionReport()
      .subscribe(
        (institutionReport: InstitutionReport) =>
          this.institutionReport = institutionReport
      )
  }

}
