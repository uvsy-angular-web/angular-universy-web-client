import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Correlative } from 'src/app/models/correlative.model';
import { CorrelativeService } from 'src/app/core/services/correlative.service';

const NO_SUBJECT_LENGTH = 0;

@Component({
  selector: 'app-program-summary',
  templateUrl: './program-summary.component.html',
  styleUrls: ['./program-summary.component.css']
})
export class ProgramSummaryComponent implements OnInit {
  @Input() isInsideComponent = false;
  @Input() subjects: Subject[] = [];
  @Input() correlatives: Correlative[] = [];
  componentTitle = 'Correlativas cargadas';
  levelText = 'Nivel: ';
  correlativesTitle = 'Correlativas';
  correlativeCountText = 'Materias cargadas con correlativas:';
  printButtonText = 'Imprimir';
  correlativeListTitle = 'Ver lista de correlativas';
  correlativesCount = 0;
  printStyle = {
    i: { opacity: 0 },
    button: { opacity: 0 }
  };
  constructor(
    private subjectService: SubjectService,
    private correlativeService: CorrelativeService) { }

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
        this.correlativeService.getCorrelatives(subject)
          .subscribe(
            (correlatives: Correlative[]) => {
              subject.correlatives = correlatives;
              if (subject.correlatives.length > 0) { this.correlativesCount++; }
            }
          );
      }
    );
  }
}
