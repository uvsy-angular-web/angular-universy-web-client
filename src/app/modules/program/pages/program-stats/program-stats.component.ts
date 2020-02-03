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
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/models/course.model';

const FIRST_INDEX = 0;

export class ProgramStatsRow {
  level: number;
  name: string;
  courseCount: number;
  courses: Course[];

  constructor(level: number, name: string, courses: Course[]) {
    this.level = level;
    this.name = name;
    this.courses = courses;
    this.courseCount = courses.length;
  }
}

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
  subjectCount: number;
  levelCount: number;
  programStatsRow: ProgramStatsRow[] = [];
  subjects: Subject[] = [];

  constructor(
    private programModalService: ProgramModalService,
    private programService: ProgramService,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private navigationService: NavigationService,
    private notificationService: ModalService) { }

  ngOnInit() {
    this.initVariables();
  }

  navigateToProgramSummaryPage() {
    this.navigationService.navigateToRoute(Route.PROGRAM_SUMMARY)
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
    this.initProgram();
    this.initCareer();
    this.initSubjects();
  }

  private initProgram() {
    this.program = ProgramService.getCurrentProgram();
    this.programName = this.program.name;

  }
  private initCareer() {
    this.careerName = CareerService.getCurrentCareer().careerName;

  }
  private initSubjects() {
    this.subjectService.getSubjects().subscribe(
      (subjects: Subject[]) => {
        if (subjects) {
          this.subjects = subjects;
          this.subjectCount = this.subjects.length;
          this.calculateLevelCount();
          this.generateProgramStatsRow();
        }
      }
    );

  }
  private generateProgramStatsRow() {
    if (this.subjects) {
      this.subjects.forEach(
        (sbj) => {
          this.courseService.getCoursesBySubject(sbj)
            .subscribe((courses: Course[]) => {
              const newRow = new ProgramStatsRow(sbj.level, sbj.name, courses);
              this.programStatsRow.push(newRow);
              this.programStatsRow.sort((a, b) => a.level - b.level);
            });
        }
      );
    }
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

