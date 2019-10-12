import {Component, OnInit} from '@angular/core';
import {InstitutionService} from '../../../../core/services/institution.service';
import {Career, Institution} from '../../../../shared/models/career.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NameEditComponent} from '../../../../shared/modals/components/name-edit/name-edit.component';
import {CareerService} from '../../../../core/services/career.service';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-my-careers',
  templateUrl: './my-careers.component.html',
  styleUrls: ['./my-careers.component.css']
})

export class MyCareersComponent implements OnInit {
  public;
  institution: Institution = new Institution();

  constructor(
    private institutionService: InstitutionService,
    private careerService: CareerService,
    private notificationService: NotificationService,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getCareers();
  }

  private getCareers() {
    this.institutionService.getInstitution().subscribe(
      (institution: Institution) => {
        if (institution) {
          this.institution = institution;
        }
      }
    );
  }

  public openNewCareerModal() {
    this.notificationService.openEditNameModal(
      'Agregar carrera',
      'Agregar',
    ).subscribe(
      (newCareerName) => this.addCareer(newCareerName)
    );

  }

  public navigateToPlanPage(career: Career) {
    this.careerService.setCurrentCareer(career);
    this.router.navigate(['career/plan']);
  }

  private addCareer(careerName) {
    this.institutionService.addCareer(careerName, this.institution).subscribe(
      () => {
        // this._getCareers();
      }, ((error) => {
        this.notificationService.showError(error);
      })
    );
  }


}
