import { Component, OnInit, Input } from '@angular/core';
import { Program } from 'src/app/models/program.model';

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent implements OnInit {
  @Input() program: Program;
  subjectCount = 35;
  subjectCountTxt = 'Materias';
  overallRate = 4.5;
  overallRateTxt = 'Valuación general';
  constructor() { }

  ngOnInit() {
  }

}
