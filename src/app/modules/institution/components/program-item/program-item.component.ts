import { Component, OnInit, Input } from '@angular/core';
import { ProgramStat } from 'src/app/models/program-stat.model';

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent implements OnInit {
  @Input() program: ProgramStat;
  subjectCountTxt = 'Materias';
  optativeSubjectCountTxt = 'Optativas';
  overallRateTxt = 'Valoración general promedio';
  overallRateTotalText = '/5'

  constructor() { }

  ngOnInit() {

  }

}
