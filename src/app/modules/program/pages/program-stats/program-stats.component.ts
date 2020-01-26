import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program.model';
import { Route } from 'src/app/core/services/system/routes/routes.enum';
import { ProgramModalService } from '../../modals/program-modal.service';
import { ModalService } from 'src/app/modals/modal.service';
import { ProgramService } from 'src/app/core/services/program.service';
import { NavigationService } from 'src/app/core/services/system/navigation.service';
import { CareerService } from 'src/app/core/services/career.service';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';

const FIRST_INDEX = 0;

@Component({
  selector: 'app-program-stats',
  templateUrl: './program-stats.component.html',
  styleUrls: ['./program-stats.component.css']
})
export class ProgramStatsComponent implements OnInit {
  program: Program;
  title: string = 'Publicar Plan';
  backNavigationRoute: Route = Route.CAREER;
  // programName: string = 'Plan 2008';
  programName: string;
  // careerName: string = 'Ingenierìa Quìmica';
  careerName: string;
  tableTitle: string = 'Materias Cargadas';
  subjectCount: number = 45;
  levelCount: number = 4;
  programStatsRow: ProgramStatsRow[] = [
    new ProgramStatsRow(1, 'Matematica superior I', 0),
    new ProgramStatsRow(2, 'Matematica superior II', 1),
    new ProgramStatsRow(3, 'Matematica superior III', 2),
    new ProgramStatsRow(4, 'Matematica superior IV', 3),
  ];
  subjects: Subject[];

  constructor(
    private programModalService: ProgramModalService,
    private programService: ProgramService,
    private subjectService: SubjectService,
    private navigationService: NavigationService,
    private notificationService: ModalService) { }

  ngOnInit() {
    this.initVariables();
  }

  getSubjectCount(): number {
    return this.subjectCount;
  }

  getLevelCount() {
    return this.levelCount;
  }

  openConfirmPublishModal(program: Program) {
    this.programModalService.openConfirmPublishModal().subscribe(
      (confirm) => {
        if (confirm) {
          // TODO: add the link to the real program
          // this.publishProgram(program);
        }
      }
    );
  }
  private initVariables() {
    // init program;
    this.program = ProgramService.getCurrentProgram();
    this.programName = this.program.name;

    // init career
    this.careerName = CareerService.getCurrentCareer().careerName;

    // init subjects
    this.subjectService.getSubjects().subscribe(
      (subjects: Subject[]) => {
        if (subjects) {
          this.subjects = subjects;
          this.subjectCount = this.subjects.length;
          this.calculateLevelCount();
        }
      }
    );
  }

  private calculateLevelCount() {
    const levelsSorted = this.subjects.map((sbj: Subject) => sbj.level).sort();
    const distinctFunction = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const levelsFiltered = levelsSorted.filter(distinctFunction);
    this.levelCount = levelsFiltered.length;
  }

  private publishProgram(program: Program) {
    this.programService.publishProgram(program).subscribe(
      () => {
        this.navigationService.navigateToRoute(this.backNavigationRoute);
      }, (error) => {
        this.notificationService.showError('Ocurrió un problema tratando de publicar el plan');
        console.error(error);
      }
    );
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
