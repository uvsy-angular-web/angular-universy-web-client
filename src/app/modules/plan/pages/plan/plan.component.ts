import { Component, OnInit } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  planes= [
    { name: 'Plan1', validfrom: 2008, validto: 2020 , published: true},
    { name: 'Plan2', validfrom: 2020, validto: 2100 , published: false},
  ]

  constructor() { }

  ngOnInit() {
  }

}
