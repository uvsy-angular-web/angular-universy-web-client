import { Component, OnInit, Input } from '@angular/core';
import { Career } from 'src/app/models/career.model';

@Component({
  selector: 'app-career-stats-card',
  templateUrl: './career-stats-card.component.html',
  styleUrls: ['./career-stats-card.component.css']
})
export class CareerStatsCardComponent implements OnInit {
  @Input() career: Career;
  subjectCount = 35;
  subjectCountTxt = 'Materias';
  overallRate = 4.5;
  overallRateTxt = 'Evaluación general';

  constructor() { }

  ngOnInit() {
  }

}
