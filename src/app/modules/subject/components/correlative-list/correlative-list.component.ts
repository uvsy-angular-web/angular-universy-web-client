import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { Subject } from '../../../../models/subject.model';
import { FormGroup } from '@angular/forms';
import { SubjectService } from '../../../../core/services/subject.service';
import { Correlative, CorrelativeCondition, CorrelativeRestriction } from '../../../../models/correlative.model';

const NO_CORRELATIVE_FOUND = undefined;

@Component({
  selector: 'app-correlative-list',
  templateUrl: './correlative-list.component.html',
  styleUrls: ['./correlative-list.component.css']
})
export class CorrelativeListComponent implements OnInit {


  constructor() {
  }

  @Input() subject: Subject;
  @Input() subjects: Subject[] = [];

  toTakeText = 'Para cursar';
  toApproveText = 'Para Rendir';
  takeText = 'Regular';
  approveText = 'Aprobada';
  levelText = 'Nvl.: ';

  ngOnInit() {
  }

  getSubjectInfo(subject: Subject) {
    return subject.name + ' Nivel: ' + subject.level;
  }
  isToTakeRegularChecked(subject: Subject): boolean {
    return this.subject.correlatives.find(
      (correlative) => {
        return correlative.subjectCode === subject.subjectCode &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE &&
          correlative.correlativeCondition === CorrelativeCondition.REGULAR;
      }
    ) !== NO_CORRELATIVE_FOUND;
  }

  isToTakeApprovedChecked(subject: Subject): boolean {
    return this.subject.correlatives.find(
      (correlative) => {
        return correlative.subjectCode === subject.subjectCode &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE &&
          correlative.correlativeCondition === CorrelativeCondition.APPROVED;
      }
    ) !== NO_CORRELATIVE_FOUND;
  }

  isToApproveChecked(subject: Subject): boolean {
    return this.subject.correlatives.find(
      (correlative) => {
        return correlative.subjectCode === subject.subjectCode &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_APPROVE &&
          correlative.correlativeCondition === CorrelativeCondition.APPROVED;
      }
    ) !== NO_CORRELATIVE_FOUND;
  }


}
