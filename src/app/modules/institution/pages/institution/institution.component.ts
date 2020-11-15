import { Component, OnInit } from '@angular/core';
import { Career } from '../../../../models/career.model';
import { CareerService } from '../../../../core/services/career.service';
import { CareerModalService } from '../../../career/modals/career-modal.service';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { NavigationService } from '../../../../core/services/system/navigation.service';
import { ModalService } from 'src/app/modals/modal.service';


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})

export class InstitutionComponent implements OnInit {
  careers: Career[] = [];

  constructor(
    private careerService: CareerService,
    private navigationService: NavigationService,
    private careerModalService: CareerModalService,
  ) {
  }

  ngOnInit(): void {
    this.getCareers();
  }
  private getCareers() {
    this.careerService.getAllCareers().subscribe(
      (careers: Career[]) => this.careers = careers);
  }

  public openNewCareerModal() {
    this.careerModalService.openEditCareerNameModal(
      'Agregar carrera',
      ButtonText.Add,
    ).subscribe(
      (career: Career) => this.addCareer(career)
    );
  }

  public navigateToCareerPage(career: Career) {
    CareerService.setCurrentCareer(career);
    this.navigationService.navigateToCareerPage();
  }

  private addCareer(career: Career) {
    this.careerService.addCareer(career).subscribe(
      () => {
        this.getCareers();
      }, ((error) => {
        this.careerModalService.showError('Ocurrió un error tratando de agregar una nueva carrera.');
        console.error(error.message);
      })
    );
  }


}
