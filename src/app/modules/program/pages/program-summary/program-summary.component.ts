import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';

const NO_SUBJECT_LENGTH = 0;

@Component({
  selector: 'app-program-summary',
  templateUrl: './program-summary.component.html',
  styleUrls: ['./program-summary.component.css']
})
export class ProgramSummaryComponent implements OnInit {
  @Input() isInsideComponent = false;
  @Input() subjects: Subject[] = [];
  componentTitle = 'Correlativas cargadas';
  levelText = 'Nivel: ';
  correlativesTitle = 'Correlativas';
  correlativeCountText = 'Materias cargadas con correlativas:';
  printButtonText = 'Imprimir';
  correlativesCount = 0;
  printStyle = {
    i: { opacity: 0 },
    button: { opacity: 0 }
  };
  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.getCurrentSubjects();
  }

  private getCurrentSubjects() {
    if (this.subjects.length === NO_SUBJECT_LENGTH) {
      this.subjectService.getSubjects().subscribe(
        (subjects: Subject[]) => {
          this.subjects = subjects;
          this.calculateCorrelativesCount();
        }
      );
    } else {
      this.calculateCorrelativesCount();
    }
  }

  private calculateCorrelativesCount() {
    this.subjects.forEach(
      (subject: Subject) => {
        if (subject.correlatives.length > 0) {
          this.correlativesCount++;
        }
      }
    );
  }
}
