import { Component, OnInit, Input } from '@angular/core';
import { GraphItem } from 'src/app/shared/components/graph-bar/graph-bar.component';
import { Career } from 'src/app/models/career.model';
import { SubjectStat } from 'src/app/models/program-report.model';
import { CourseStat, SubjectReport } from 'src/app/models/subject-report.model';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-subject-stat',
  templateUrl: './subject-stat.component.html',
  styleUrls: ['./subject-stat.component.css']
})
export class SubjectStatComponent implements OnInit {
  @Input() career: Career;
  @Input() subjectStat: SubjectStat;
  subjectReport: SubjectReport;
  subjectLabel = 'Materia: ';
  subjectRateTxt = 'Valoración general';
  dificultGraphTitle = 'Dificultad por curso';
  overallGraphTitle = 'Valoración general por curso';
  wouldTakeAgainGraphTitle = 'Cursos elegidos por los estudiantes';
  hasCourseStats = false;
  noStatsAvaiableMessage = 'Parece que todavia no han valorado las comisiones';
  dificultsItems = [];
  overallItems = [];
  wouldTakeAgainItems = [];

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
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
