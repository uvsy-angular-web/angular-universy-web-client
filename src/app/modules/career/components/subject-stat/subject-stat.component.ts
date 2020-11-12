import { Component, OnInit, Input } from '@angular/core';
import { GraphItem } from 'src/app/shared/components/graph-bar/graph-bar.component';
import { Career } from 'src/app/models/career.model';
import { SubjectReport } from 'src/app/models/subject-report.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { CourseStat } from 'src/app/models/course-stat.model';
import { SubjectStat } from 'src/app/models/subject-stat.model';

@Component({
  selector: 'app-subject-stat',
  templateUrl: './subject-stat.component.html',
  styleUrls: ['./subject-stat.component.css']
})
export class SubjectStatComponent implements OnInit {
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
  public hasCourseStats = false;
  public noStatsAvaiableMessage = 'Parece que todavia no han valorado las comisiones';
  public dificultsItems = [];
  public overallItems = [];
  public wouldTakeAgainItems = [];

  constructor(private subjectService: SubjectService) { }

  public ngOnInit() {
    this.getSubjectReport();
  }

  private generateGraphItems() {
    if (this.subjectReport.courses && this.subjectReport.courses.length > 0) {
      this.subjectReport.courses
        .sort(CourseStat.orderByAscendingCommissionName)
        .forEach(
          (courseStat: CourseStat) => {
            const dificultyItem =
              new GraphItem(courseStat.commissionName, Math.floor(courseStat.difficulty * 100));
            const overallItem =
              new GraphItem(courseStat.commissionName, Math.floor(courseStat.rating * 100));
            const wouldTakeAgainItem =
              new GraphItem(courseStat.commissionName, Math.floor(courseStat.wouldTakeAgain));

            this.dificultsItems.push(dificultyItem);
            this.overallItems.push(overallItem);
            this.wouldTakeAgainItems.push(wouldTakeAgainItem);
          });

      this.hasCourseStats = this.dificultsItems.length > 0 &&
        this.overallItems.length > 0 &&
        this.wouldTakeAgainItems.length > 0
    }

  }

  private getSubjectReport() {
    this.subjectService
      .getSubjectReportById(this.subjectStat.subjectId)
      .subscribe(
        (subjectReport: SubjectReport) => {
          this.subjectReport = subjectReport
          this.generateGraphItems();
        }
      )
  }
}
