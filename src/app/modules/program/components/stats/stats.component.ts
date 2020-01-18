import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  @Input() subjectCount: number;
  @Input() levelCount: number;

  levelCountTitle = 'Cantidad de niveles';
  subjectCountTitle = 'Cantidad de materias';

  constructor() { }

  ngOnInit() {
  }

}
