import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {Subject} from '../../../../shared/models/subject.model';
import {FormGroup} from '@angular/forms';
import {SubjectService} from '../../../../core/services/subject.service';

@Component({
  selector: 'app-subject-correlatives',
  templateUrl: './subject-correlatives.component.html',
  styleUrls: ['./subject-correlatives.component.css']
})
export class SubjectCorrelativesComponent implements OnInit {
  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  subjects: Subject[];
  correlativesXSubjects: CorrelativeXSubject[] = [];
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private subjectService: SubjectService,
  ) {
  }

  ngOnInit() {
    this.getSubjects();
  }

  private getSubjects() {
    this.subjectService.getSubjects().subscribe(
      (subjects) => {
        this.subjects = subjects;
        this.createCorrelativeXCourseSubjects();
      }
    );
    // this.filtrateSubjects();

  }

  private createCorrelativeXCourseSubjects() {
    if (this.subjects) {
      this.subjects.forEach(
        (subject) => {
          // TODO: implement fill this
          const correlativeXSubject = new CorrelativeXSubject(subject, true, false);
          this.correlativesXSubjects.push(correlativeXSubject);
        }
      );
    }
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

}

class CorrelativeXSubject {
  subject: Subject;
  correlativeRestriction: boolean;
  correlativeCondition: boolean;

  constructor(subject?: Subject, correlativeRestriction?: boolean, correlativeCondition?: boolean) {
    this.subject = subject;
    this.correlativeRestriction = correlativeRestriction;
    this.correlativeCondition = correlativeCondition;
  }
}
