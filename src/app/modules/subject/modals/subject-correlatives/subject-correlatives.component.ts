import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {Subject} from '../../../../models/subject.model';
import {FormGroup} from '@angular/forms';
import {SubjectService} from '../../../../core/services/subject.service';
import {Correlative, CorrelativeCondition, CorrelativeRestriction, CorrelativeState} from '../../../../models/correlative.modal';

const FIRST_LEVEL = 1;

@Component({
  selector: 'app-subject-correlatives',
  templateUrl: './subject-correlatives.component.html',
  styleUrls: ['./subject-correlatives.component.css']
})
export class SubjectCorrelativesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private subjectService: SubjectService) {
  }

  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Input() subject: Subject;
  @Output() confirmEvent: EventEmitter<Correlative[]> = new EventEmitter();
  subjects: Subject[] = [];
  form: FormGroup;
  correlativeState = CorrelativeState;

  ngOnInit() {
    this.getSubjects();
  }

  public showTable() {
    return this.subjects.length > 0;
  }

  public emitCorrelatives() {
    const correlatives: Correlative[] = [];
    /*    this.subjectsWithCorrelativeState.forEach(
          (subjectWithCorrelative) => {
            const correlative = SubjectCorrelativesComponent.getCorrelative(subjectWithCorrelative);
            if (correlative) {
              correlatives.push(correlative);
            }
          }
        );*/
    this.confirmEvent.emit(correlatives);
    this.activeModal.close();
  }

  public changeCorrelativeToTake(subject: Subject, state: CorrelativeState) {
    // subject.correlativeState = state;
  }


  public changeCorrelativeToApprove(subject: Subject, state: CorrelativeState) {
    // subject.correlativeState = state;
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public isToTakeRegularChecked(subject: Subject): boolean {
    return subject.correlatives.find(
      (correlative) => {
        return correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE &&
          correlative.correlativeCondition === CorrelativeCondition.REGULAR;
      }
    ) != null;
  }

  public isToTakeApprovedChecked(subject: Subject): boolean {
    return subject.correlatives.find(
      (correlative) => {
        return correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE &&
          correlative.correlativeCondition === CorrelativeCondition.APPROVED;
      }
    ) != null;
  }

  public isToApproveChecked(subject: Subject): boolean {
    return subject.correlatives.find(
      (correlative) => {
        return correlative.correlativeRestriction === CorrelativeRestriction.TO_APPROVE &&
          correlative.correlativeCondition === CorrelativeCondition.APPROVED;
      }
    ) != null;
  }

  public isNoCorrelativeChecked(subject: Subject): boolean {
    return subject.correlatives === [];
  }

  public isSubjectInFirstLevel() {
    return this.subject.level !== FIRST_LEVEL;
  }

  private getSubjects() {
    this.subjectService.getSubjects().subscribe(
      (subjects) => {
        this.subjects = subjects;
        this.prepareSubjects();
      }
    );
  }

  private prepareSubjects() {
    this.filterSubjectsByLevel();
    this.filterCorrelatives();
    this.sortSubjectsByLevel();
  }

  private filterCorrelatives() {
    this.subjects.forEach(
      (subjects) => {
        subjects.correlatives.filter(
          (correlative) => {
            return correlative.subjectCode === this.subject.subjectCode;
          }
        );
      }
    );
  }

  private filterSubjectsByLevel() {
    this.subjects = this.subjects.filter((subject) => {
      return this.isSubjectLevelLowerThatActual(subject);
    });
  }

  private isSubjectLevelLowerThatActual(subject) {
    return subject.level < this.subject.level;
  }

  private sortSubjectsByLevel() {
    this.subjects = SubjectService.sortSubjectsByLevel(this.subjects);
  }

}
