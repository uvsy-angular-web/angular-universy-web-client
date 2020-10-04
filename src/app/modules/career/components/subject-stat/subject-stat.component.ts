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
        .sort(this.orderByAscendingCommissionName)
        .forEach(
          (courseStat: CourseStat) => {
            const dificultyItem =
              new GraphItem(courseStat.commissionName, Math.floor(courseStat.difficulty * 100));
            const overallItem =
              new GraphItem(courseStat.commissionName, Math.floor(courseStat.rating * 100));
            const wouldTakeAgainItem =
              new GraphItem(courseStat.commissionName, Math.floor(courseStat.wouldTakeAgain));

            this.dificultsItems.push(dificultyItem);
            this.dificultsItems.push(overallItem);
            this.dificultsItems.push(wouldTakeAgainItem);
          });
    }

  }

  private orderByAscendingCommissionName(a: CourseStat, b: CourseStat) {
    if (a.commissionName < b.commissionName) {
      return -1;
    }
    if (a.commissionName > b.commissionName) {
      return 1;
    }
    return 0;
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
