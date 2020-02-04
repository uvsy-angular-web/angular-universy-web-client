import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-program-summary',
  templateUrl: './program-summary.component.html',
  styleUrls: ['./program-summary.component.css']
})
export class ProgramSummaryComponent implements OnInit {
  subjects: Subject[] = [];
  componentTitle = 'Correlativas cargadas';
  levelText = 'Nivel: ';
  correlativesTitle = 'Correlativas';
  correlativeCountText = 'Materias cargadas con correlativas:';
  printButtonText = 'Imprimir';
  correlativesCount = 0;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.getCurrentSubjects();
  }
  
  printPage() {
    alert('ASDDAS');
  }

  private getCurrentSubjects() {
    this.subjectService.getSubjects().subscribe(
      (subjects: Subject[]) => {
        this.subjects = subjects;
        this.calculateCorrelativesCount();
      }
    );
  }

  private calculateCorrelativesCount() {
    this.subjects.forEach(
      (subject: Subject) => {
        if (subject.correlatives.length > 0) {
          this.correlativesCount++;
        }
      }
    )
  }
}
