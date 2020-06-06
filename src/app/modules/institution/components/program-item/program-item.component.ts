import { Component, OnInit, Input } from '@angular/core';
import { Program } from 'src/app/models/program.model';

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent implements OnInit {
  @Input() program: Program;
  @Input() subjectCount = 35;
  @Input() subjectCountTxt = 'Materias';
  @Input() optativeSubjectCount = 5;
  @Input() optativeSubjectCountTxt = 'Optativas';
  @Input() overallRate = 4.5;
  overallRateTxt = 'Valuación general';
  constructor() { }

  ngOnInit() {
  }

}
