import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {Correlative, Subject} from '../../../../shared/models/subject.model';
import {FormGroup} from '@angular/forms';
import {SubjectService} from '../../../../core/services/subject.service';

@Component({
  selector: 'app-subject-correlatives',
  templateUrl: './subject-correlatives.component.html',
  styleUrls: ['./subject-correlatives.component.css']
})
export class SubjectCorrelativesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private subjectService: SubjectService,
  ) {
  }

  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Input() correlatives: Correlative[];
  @Output() confirmEvent: EventEmitter<Correlative[]> = new EventEmitter();
  subjects: Subject[];
  subjectsWithCorrelativeState: SubjectWithCorrelativeState[] = [];
  form: FormGroup;
  correlativeState = CorrelativeState;

  ngOnInit() {
    this.getSubjects();
  }


  public emitCorrelatives() {
    const correlatives: Correlative[] = [];
    this.subjectsWithCorrelativeState.forEach(
      (subjectWithCorrelative) => {
        const correlative = SubjectCorrelativesComponent.getCorrelative(subjectWithCorrelative);
        if (correlative) {
          correlatives.push(correlative);
        }
      }
    );
    this.confirmEvent.emit(correlatives);
    this.activeModal.close();
  }

  public changeCorrelativeState(subject: SubjectWithCorrelativeState, state: CorrelativeState) {
    subject.correlativeState = state;
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public isToTakeRegularChecked(subject: SubjectWithCorrelativeState): boolean {
    return subject.correlativeState === CorrelativeState.TO_TAKE_REGULAR;
  }

  public isToTakeApprovedChecked(subject: SubjectWithCorrelativeState): boolean {
    return subject.correlativeState === CorrelativeState.TO_TAKE_APPROVED;
  }

  public isToAproveChecked(subject: SubjectWithCorrelativeState): boolean {
    return subject.correlativeState === CorrelativeState.TO_APPROVE;
  }

  public isNoCorrelativeChecked(subject: SubjectWithCorrelativeState): boolean {
    return subject.correlativeState === CorrelativeState.NO_CORRELATIVE;
  }

  private getSubjects() {
    this.subjectService.getSubjects().subscribe(
      (subjects) => {
        this.subjects = subjects;
        this.getSubjectsWithCorrelativeState();
      }
    );
    // this.filtrateSubjects();

  }

  private getSubjectsWithCorrelativeState() {
    this.subjects.forEach(
      (subject) => {
        const correlative = this.correlatives.find((cor) => {
          return cor.subjectCode === subject.subjectCode;
        });
        const correlativeState = SubjectCorrelativesComponent.getCorrelativeState(correlative);
        this.subjectsWithCorrelativeState.push(
          new SubjectWithCorrelativeState(subject, correlativeState)
        );
      }
    );
    this.subjectsWithCorrelativeState.sort((subject) => subject.subject.level);
  }


  private static getCorrelative(subjectWithCorrelative: SubjectWithCorrelativeState): Correlative {
    const subjectCode = subjectWithCorrelative.subject.subjectCode;
    if (subjectWithCorrelative.correlativeState === CorrelativeState.TO_TAKE_REGULAR) {
      return new Correlative(
        subjectCode,
        CorrelativeRestriction.TO_TAKE,
        CorrelativeCondition.REGULAR,
      );
    }
    if (subjectWithCorrelative.correlativeState === CorrelativeState.TO_TAKE_APPROVED) {
      return new Correlative(
        subjectCode,
        CorrelativeRestriction.TO_TAKE,
        CorrelativeCondition.APPROVED,
      );
    }
    if ((subjectWithCorrelative.correlativeState === CorrelativeState.TO_APPROVE)) {
      return new Correlative(
        subjectCode,
        CorrelativeRestriction.TO_APPROVE,
        CorrelativeCondition.APPROVED,
      );
    }
    return null;
  }

  private static getCorrelativeState(correlative: Correlative): CorrelativeState {
    if (correlative) {
      if (correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE) {
        if (correlative.correlativeCondition === CorrelativeCondition.REGULAR) {
          return CorrelativeState.TO_TAKE_REGULAR;
        } else {
          return CorrelativeState.TO_TAKE_APPROVED;
        }
      } else if (correlative.correlativeRestriction === CorrelativeRestriction.TO_APPROVE) {
        return CorrelativeState.TO_APPROVE;
      }
    }
    return CorrelativeState.NO_CORRELATIVE;
  }

}

class SubjectWithCorrelativeState {
  subject: Subject;
  correlativeState: CorrelativeState;

  constructor(subject: Subject, correlativeState: CorrelativeState) {
    this.subject = subject;
    this.correlativeState = correlativeState;
  }
}

export enum CorrelativeState {
  TO_TAKE_REGULAR = 1,
  TO_TAKE_APPROVED = 2,
  TO_APPROVE = 3,
  NO_CORRELATIVE = 4,
}

export enum CorrelativeCondition {
  REGULAR = 'REGULAR',
  APPROVED = 'APPROVED'
}

export enum CorrelativeRestriction {
  TO_TAKE = 'TO_TAKE',
  TO_APPROVE = 'TO_APPROVE'
}
