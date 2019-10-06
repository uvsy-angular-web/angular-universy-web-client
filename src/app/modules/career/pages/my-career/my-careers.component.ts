import {Component, OnInit} from '@angular/core';
import {CareerService} from '../../../../core/services/career.service';

@Component({
  selector: 'app-my-careers',
  templateUrl: './my-careers.component.html',
  styleUrls: ['./my-careers.component.css']
})
export class MyCareersComponent implements OnInit {

  careers = [
    {name: 'Ingeniería en Sistemas de Información'},
    {name: 'Ingeniería Industrial'},
    {name: 'Ingeniería Química'},
  ];

  constructor(private careerService: CareerService) {
  }

  ngOnInit(): void {
    this._getCareers();
    this._addProgram();
  }

  private _getCareers() {
    this.careerService.getCareers();
  }
  private _addProgram() {
    this.careerService.addProgram();
  }

}
