import { Component, Input, OnChanges } from '@angular/core';
import { GraphItem } from 'src/app/shared/components/graph-bar/graph-bar.component';
import { Career } from 'src/app/models/career.model';
import { SubjectReport } from 'src/app/models/subject-report.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { CourseStat } from 'src/app/models/course-stat.model';
import { SubjectStat } from 'src/app/models/subject-stat.model';
import { ProgramService } from 'src/app/core/services/program.service';

@Component({
  selector: 'app-subject-stat',
  templateUrl: './subject-stat.component.html',
  styleUrls: ['./subject-stat.component.css']
})
export class SubjectStatComponent implements OnChanges {
  @Input()
  public career: Career;
  @Input()
  public subjectStat: SubjectStat;
  public subjectReport: SubjectReport;
  public subjectLabel = 'Materia: ';
  public subjectRateTxt = 'Valoración general';
  public dificultGraphTitle = 'Dificultad por curso';
  public overallGraphTitle = 'Valoración general por curso';
  public wouldTakeAgainGraphTitle = 'Cursos elegidos por los estudiantes';
  public dificultGraphLeyend = '*Gráfico de dificultad valorada por curso';
  public overallGraphLeyend = '*Gráfico de valoración general por curso';
  public wouldTakeAgainGraphLeyend = '*Gráfico de recomendación por curso';
  public hasCourseStats = false;
  public noStatsAvaiableMessage = 'Esta materia no tiene comisiones cargadas';
  public noSubjectSelected = 'Debes seleccionar una materia en el panel de la izquierda';
  public dificultsItems = [];
  public overallItems = [];
  public wouldTakeAgainItems = [];
  public printStyle = {
    a: { opacity: 0 },
    button: { opacity: 0 },
  };
  public printButtonText = 'Imprimir';
  public totalSubjectRatingText = '/5';
  public printTitle: string;
  constructor(private subjectService: SubjectService) { }

  public ngOnChanges() {
    this.getSubjectReport();
    this.buildPrintTitle();
  }

  private buildPrintTitle() {
    const currentProgram = ProgramService.getCurrentProgram();
    this.printTitle = `Estadísticas de valoración por materia \n - ${currentProgram.name} -`;
  }

  private generateGraphItems() {
    this.dificultsItems = [];
    this.overallItems = [];
    this.wouldTakeAgainItems = [];
    if (this.subjectReport.courses && this.subjectReport.courses.length > 0) {
      this.subjectReport.courses
        .sort(CourseStat.orderByAscendingCommissionName)
        .forEach(
          (courseStat: CourseStat) => {
            if (courseStat.commissionName) {
              const dificultyItem =
                new GraphItem(courseStat.commissionName, Math.floor(courseStat.difficulty));
              const overallItem =
                new GraphItem(courseStat.commissionName, Math.floor(courseStat.rating));
              const wouldTakeAgainItem =
                new GraphItem(courseStat.commissionName, Math.floor(courseStat.wouldTakeAgain));

              this.dificultsItems.push(dificultyItem);
              this.overallItems.push(overallItem);
              this.wouldTakeAgainItems.push(wouldTakeAgainItem);
            }
          });
    }
    this.hasCourseStats = this.dificultsItems.length > 0 &&
      this.overallItems.length > 0 &&
      this.wouldTakeAgainItems.length > 0;

  }

  private getSubjectReport() {
    if (this.subjectStat) {
      this.subjectService
        .getSubjectReportById(this.subjectStat.subjectId)
        .subscribe(
          (subjectReport: SubjectReport) => {
            this.subjectReport = subjectReport;
            this.generateGraphItems();
          }
        );
    }
  }
}
