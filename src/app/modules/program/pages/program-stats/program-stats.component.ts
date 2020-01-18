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
  subjectCount: number = 45;
  levelCount: number = 4;
  subjectsRow: SubjectsRow[] = [
    new SubjectsRow(1, 'Matematica superior I', 0),
    new SubjectsRow(2, 'Matematica superior II', 1),
    new SubjectsRow(3, 'Matematica superior III', 2),
    new SubjectsRow(4, 'Matematica superior IV', 3),
  ];

  constructor() { }

  ngOnInit() {
  }

}

class SubjectsRow {
  level: number;
  name: string;
  corelativesCount: number;

  constructor(level: number, name: string, corelativesCount: number) {
    this.level = level;
    this.name = name;
    this.corelativesCount = corelativesCount;
  }
}
