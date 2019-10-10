import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  planes = [
    {name: 'Plan1', validfrom: 2008, validto: 2020, published: true},
    {name: 'Plan2', validfrom: 2020, validto: 2100, published: false},
  ]; // TODO: add class PLAN

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const careerCode = this.route.snapshot.paramMap.get('careerCode');
    console.log(careerCode);
  }

  public navigateToViewPlanPage(plan) {
    this.router.navigate(['/plan', 'asdsads']);
  }
  public navigateCareerPage() {
    this.router.navigate(['/career']);
  }
}
