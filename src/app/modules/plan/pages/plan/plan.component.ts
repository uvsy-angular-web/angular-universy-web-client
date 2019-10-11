import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Career} from '../../../../shared/models/career.model';
import {CareerService} from '../../../../core/services/career.service';

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
              private router: Router) {
  }

  ngOnInit() {
    this.careerService.currentCareer
      .subscribe((serviceCareer) => this.career = serviceCareer
      );
  }

  public navigateToViewPlanPage(plan) {
    this.router.navigate(['/plan',]);
  }

  public navigateCareerPage() {
    this.router.navigate(['/career']);
  }

  public editCareerName() {
    /*    this.careerService.addCareer(career, this.institution).subscribe(
          () => {
            this._getCareers();
          }, ((error) => {
            this.notificationService.showError(error);
          })
        );*/

  }
}
