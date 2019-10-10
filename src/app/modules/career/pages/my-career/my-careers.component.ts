import {Component, OnInit} from '@angular/core';
import {InstitutionService} from '../../../../core/services/institution.service';
import {Career, Institution} from '../../../../shared/models/career.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CareerModalComponent} from '../../components/career-modal/career-modal.component';
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
    this._getCareers();
  }

  private _getCareers() {
    this.institutionService.getInstitution().subscribe(
      (institution: Institution) => {
        if (institution) {
          this.institution = institution;
        }
      }
    );
  }

  public openNewCareerModal() {
    const modalRef = this.modalService.open(CareerModalComponent);
    modalRef.componentInstance.title = 'Agregar carrera';
    modalRef.componentInstance.confirmButtonText = 'Agregar';
    modalRef.componentInstance.confirmEvent.subscribe((career) => {
      this.addCareer(career);
    });
  }

  public navigateToPlanPage(career: Career) {
    this.router.navigate(['/plan', career.careerKey.institutionKey, career.careerKey.careerCode]);
  }

  private addCareer(career: Career) {
    this.careerService.addCareer(career, this.institution).subscribe(
      () => {
        this._getCareers();
      }, ((error) => {
        this.notificationService.showError(error);
      })
    );

  }


}
