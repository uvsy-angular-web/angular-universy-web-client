import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Career} from '../../../../shared/models/career.model';
import {CareerService} from '../../../../core/services/career.service';
import {NameEditComponent} from '../../../../shared/modals/name-edit/name-edit.component';
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
  programs = [
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

  public openNewPlanModal() {

  }

  public navigateToViewPlanPage(plan) {
    this.router.navigate(['/plan']);
  }

  public navigateCareerPage() {
    this.router.navigate(['/career']);
  }


  public openEditCareerModal() {
    this.notificationService.openEditNameModal(
      'Modificar carrera',
      'Modificar',
      this.career.careerName
    ).subscribe(
      (newCareerName) => this.editCareer(newCareerName)
    );

  }

  public showAddProgram(): boolean {
    return this.programs.length > 0 && !this.isThereProgramNotPublished();
  }

  private isThereProgramNotPublished() {
    return this.programs.find((program) => program.published === false);
  }

  private editCareer(careerName: string) {
    if (careerName) {
      this.career.careerName = careerName;
      this.careerService.updateCareer(this.career).subscribe(
        () => {
          this.careerService.setCurrentCareer(this.career);
        }, ((error) => {
          this.notificationService.showError('Ocurrió un error tratando de modificar la carrera');
          console.error(error);
        })
      );
    }
  }
}
