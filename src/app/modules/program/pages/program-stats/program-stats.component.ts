import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program.model';
import { Route } from 'src/app/core/services/system/routes/routes.enum';

@Component({
  selector: 'app-program-stats',
  templateUrl: './program-stats.component.html',
  styleUrls: ['./program-stats.component.css']
})
export class ProgramStatsComponent implements OnInit {
  program: Program;
  title: string = 'Publicar Plan';
  backNavigationRoute: Route = Route.CAREER;
  programName: string = 'Plan 2008';
  careerName: string = 'Ingenierìa Quìmica';
  tableTitle: string = 'Materias Cargadas';
  subjectCount: number = 45;
  levelCount: number = 4;
  programStatsRow: ProgramStatsRow[] = [
    new ProgramStatsRow(1, 'Matematica superior I', 0),
    new ProgramStatsRow(2, 'Matematica superior II', 1),
    new ProgramStatsRow(3, 'Matematica superior III', 2),
    new ProgramStatsRow(4, 'Matematica superior IV', 3),
  ];

  constructor() { }

  ngOnInit() {
  }

}

export class ProgramStatsRow {
  level: number;
  name: string;
  courseCount: number;

  constructor(level: number, name: string, courseCount: number) {
    this.level = level;
    this.name = name;
    this.courseCount = courseCount;
  }
}
