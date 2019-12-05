import {Component, OnInit} from '@angular/core';
import {InstitutionService} from '../../../../core/services/institution.service';
import {Career, Institution} from '../../../../models/career.model';
import {CareerService} from '../../../../core/services/career.service';
import {CareerModalService} from '../../../career/modals/career-modal.service';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {NavigationService} from '../../../../core/services/system/navigation.service';


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})

export class InstitutionComponent implements OnInit {
  institution: Institution = new Institution();

  constructor(
    private institutionService: InstitutionService,
    private careerService: CareerService,
    private navigationService: NavigationService,
    private notificationService: CareerModalService) {
  }

  ngOnInit(): void {
    this.getCareers();
  }
  private getCareers() {
    this.institutionService.getInstitution().subscribe(
      (institution: Institution) => {
        if (institution) {
          this.institution = institution;
          InstitutionService.setCurrentInstitution(institution);
        }
      }
    );
  }

  public openNewCareerModal() {
    this.notificationService.openEditCareerNameModal(
      'Agregar carrera',
      ButtonText.Add,
    ).subscribe(
      (newCareerName) => this.addCareer(newCareerName)
    );
  }

  public navigateToCareerPage(career: Career) {
    CareerService.setCurrentCareer(career);
    this.navigationService.navigateToCareerPage();
  }

  private addCareer(careerName) {
    this.careerService.addCareer(careerName).subscribe(
      () => {
        this.getCareers();
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de agregar una nueva carrera.');
        console.error(error.message);
      })
    );
  }


}
