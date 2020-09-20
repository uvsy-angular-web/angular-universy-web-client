import { Component, OnInit, Input } from '@angular/core';
import { ProgramStat } from 'src/app/models/career-stat.model';
import { Program } from 'src/app/models/program.model';

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent implements OnInit {
  @Input() programStat: ProgramStat;
  subjectCount = 0;
  subjectCountTxt = 'Materias';
  optativeSubjectCount = 0;
  optativeSubjectCountTxt = 'Optativas';
  overallRate = 0;
  overallRateTxt = 'Valuación general';
  constructor() { }

  ngOnInit() {
    this.subjectCount = this.programStat.amountOfSubjects;
    this.optativeSubjectCount = this.programStat.amountOfOptatives;
    this.overallRate = this.programStat.rating;
  }

}
