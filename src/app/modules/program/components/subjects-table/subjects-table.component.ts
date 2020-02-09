import { Component, OnInit, Input } from '@angular/core';
import { ProgramStatsRow } from '../../pages/program-stats/program-stats.component';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.css']
})
export class SubjectsTableComponent implements OnInit {

  @Input() title: string;
  @Input() programStatsRow: ProgramStatsRow[] = [];

  levelRowTitle = 'Nivel';
  nameRowTitle = 'Materia';
  courseCountRowTitle = 'Cantidad de comisiones';
  noRowMessage = 'No se cargo ninguna materia';

  constructor() { }

  ngOnInit() {
  }

}
