import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/models/institution.model';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { Career } from 'src/app/models/career.model';
import { CareerService } from 'src/app/core/services/career.service';

@Component({
  selector: 'app-institution-stats',
  templateUrl: './institution-stats.component.html',
  styleUrls: ['./institution-stats.component.css']
})
export class InstitutionStatsComponent implements OnInit {
  title = 'Mis estadisticas';
  careers: Career[] = [];
  printButtonText = 'Imprimir';
  printStyle = {
    i: { opacity: 0 },
    button: { opacity: 0 }
  };
  constructor(private careerService: CareerService) { }

  ngOnInit() {
    this.getCurrentCareers();
  }

  private getCurrentCareers() {
    this.careerService.getAllCareers()
      .subscribe(
        (careers: Career[]) => this.careers = careers
    );
  }
}
