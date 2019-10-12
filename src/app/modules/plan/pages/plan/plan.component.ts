import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Career} from '../../../../shared/models/career.model';
import {CareerService} from '../../../../core/services/career.service';
import {CareerModalComponent} from '../../../career/components/career-modal/career-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InstitutionService} from '../../../../core/services/institution.service';
import {NotificationService} from '../../../../shared/modals/notification.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  career: Career;
  planes = [
    {name: 'Plan1', validfrom: 2008, validto: 2020, published: true},
    {name: 'Plan2', validfrom: 2020, validto: 2100, published: false},
  ]; // TODO: add class PLAN

  constructor(private route: ActivatedRoute,
              private careerService: CareerService,
              private modalService: NgbModal,
              private institutionService: InstitutionService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.career = this.careerService.getCurrentCareer();
  }

  public navigateToViewPlanPage(plan) {
    this.router.navigate(['/plan']);
  }

  public navigateCareerPage() {
    this.router.navigate(['/career']);
  }


  public openEditCareerModal() {
    const modalRef = this.modalService.open(CareerModalComponent);
    modalRef.componentInstance.title = 'Modificar carrera';
    modalRef.componentInstance.confirmButtonText = 'Modificar';
    modalRef.componentInstance.career = this.career;
    modalRef.componentInstance.confirmEvent.subscribe((career: Career) => {
      this.editCareer(career.careerName);
    });
  }

  private editCareer(careerName: string) {
    this.career.careerName = careerName;
    this.careerService.updateCareer(this.career).subscribe(
      () => {
        this.careerService.setCurrentCareer(this.career);
      }, ((error) => {
        this.notificationService.showError('Ocurrio un error tratando de modificar la carrera');
        console.error(error);
      })
    );
  }
}
