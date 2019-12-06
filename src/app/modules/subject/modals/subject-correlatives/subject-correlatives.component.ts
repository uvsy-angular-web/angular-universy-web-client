import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {Subject} from '../../../../models/subject.model';
import {FormGroup} from '@angular/forms';
import {SubjectService} from '../../../../core/services/subject.service';
import {Correlative, CorrelativeCondition, CorrelativeRestriction} from '../../../../models/correlative.model';

const FIRST_LEVEL = 1;
const ONE_CORRELATIVE_TO_DELETE = 1;
const NO_CORRELATIVE_FOUND = undefined;

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
  @Input() readOnly = false;
  @Output() confirmEvent: EventEmitter<Correlative[]> = new EventEmitter();
  subject: Subject;
  subjects: Subject[] = [];
  form: FormGroup;

  ngOnInit() {
    this.getSubjects();
    this.getCurrentSubject();
  }

  private getCurrentSubject() {
    this.subject = SubjectService.getCurrentSubject();
  }

  public showTable() {
    return this.subjects.length > 0;
  }

  public emitCorrelatives() {
    this.confirmEvent.emit(this.subject.correlatives);
    this.activeModal.close();
  }

  public changeCorrelativeToTakeRegular(subject: Subject) {
    this.removePreviousToTakeCorrelative(subject);
    this.addCorrelativeToTakeRegular(subject);
  }

  public changeCorrelativeToTakeApproved(subject: Subject) {
    this.removePreviousToTakeCorrelative(subject);
    this.addCorrelativeToTakeApproved(subject);
  }

  private removePreviousToTakeCorrelative(subject: Subject) {
    const correlative = this.getCorrelativeToTakeBySubject(subject);
    if (correlative) {
      this.removeCorrelativeOfTheList(correlative);
    }
  }

  public changeCorrelativeToApprove(subject: Subject) {
    const correlative = this.getCorrelativeToApprove(subject);
    if (correlative) {
      this.removeCorrelativeOfTheList(correlative);
    } else {
      this.addCorrelativeToApprove(subject);
    }
  }

  private getCorrelativeToApprove(subject: Subject) {
    return this.subject.correlatives.find(
      (correlative) =>
        correlative.subjectCode === subject.subjectCode &&
        correlative.correlativeRestriction === CorrelativeRestriction.TO_APPROVE
    );
  }

  private getCorrelativeToTakeBySubject(subject: Subject) {
    return this.subject.correlatives.find(
      (correlative) =>
        (correlative.subjectCode === subject.subjectCode &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE));
  }

  private addCorrelativeToTakeRegular(subject: Subject) {
    this.addCorrelative(subject, CorrelativeRestriction.TO_TAKE, CorrelativeCondition.REGULAR);
  }

  private addCorrelativeToTakeApproved(subject: Subject) {
    this.addCorrelative(subject, CorrelativeRestriction.TO_TAKE, CorrelativeCondition.APPROVED);
  }

  private addCorrelativeToApprove(subject: Subject) {
    this.addCorrelative(subject, CorrelativeRestriction.TO_APPROVE, CorrelativeCondition.APPROVED);
  }

  private addCorrelative(subject: Subject, correlativeRestriction: CorrelativeRestriction, correlativeCondition: CorrelativeCondition) {
    const newCorrelative = new Correlative(
      subject.name,
      subject.subjectCode,
      correlativeRestriction,
      correlativeCondition);
    this.subject.correlatives.push(newCorrelative);
  }

  private removeCorrelativeOfTheList(correlative) {
    const index = this.subject.correlatives.indexOf(correlative);
    this.subject.correlatives.splice(index, ONE_CORRELATIVE_TO_DELETE);
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public isToTakeRegularChecked(subject: Subject): boolean {
    return this.subject.correlatives.find(
      (correlative) => {
        return correlative.subjectCode === subject.subjectCode &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE &&
          correlative.correlativeCondition === CorrelativeCondition.REGULAR;
      }
    ) !== NO_CORRELATIVE_FOUND;
  }

  public isToTakeApprovedChecked(subject: Subject): boolean {
    return this.subject.correlatives.find(
      (correlative) => {
        return correlative.subjectCode === subject.subjectCode &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE &&
          correlative.correlativeCondition === CorrelativeCondition.APPROVED;
      }
    ) !== NO_CORRELATIVE_FOUND;
  }

  public isToApproveChecked(subject: Subject): boolean {
    return this.subject.correlatives.find(
      (correlative) => {
        return correlative.subjectCode === subject.subjectCode &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_APPROVE &&
          correlative.correlativeCondition === CorrelativeCondition.APPROVED;
      }
    ) !== NO_CORRELATIVE_FOUND;
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
      return this.isSubjectLevelLowerThatActual(subject) &&
        this.isCurrentSubjectNotIncluded(subject);
    });
  }

  private isCurrentSubjectNotIncluded(subject) {
    return subject.subjectCode !== this.subject.subjectCode;
  }

  private isSubjectLevelLowerThatActual(subject) {
    return subject.level <= this.subject.level;
  }

  private sortSubjectsByLevel() {
    this.subjects = SubjectService.sortSubjectsByLevel(this.subjects);
  }

}
