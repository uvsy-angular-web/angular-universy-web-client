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
  @Input() correlatives: Correlative[];
  @Input() subjects: Subject[] = [];

  toTakeText = 'Para cursar';
  toApproveText = 'Para Rendir';
  takeText = 'Regular';
  approveText = 'Aprobada';
  levelText = 'Nvl.: ';

  atLeastOneCorrelative = false;

  ngOnInit() {
  }

  getSubjectInfo(subject: Subject) {
    return subject.name + ' Nivel: ' + subject.level;
  }
  isToTakeRegularChecked(subject: Subject): boolean {
    const isToTakeRegularChecked = this.correlatives.find(
      (correlative) => {
        return correlative.correlativeSubjectId === subject.id &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE &&
          correlative.correlativeCondition === CorrelativeCondition.REGULAR;
      }
    ) !== NO_CORRELATIVE_FOUND;
    this.checkAtLeastOneCorrelative(isToTakeRegularChecked);
    return isToTakeRegularChecked;
  }

  isToTakeApprovedChecked(subject: Subject): boolean {
    const isToTakeApprovedChecked = this.correlatives.find(
      (correlative) => {
        return correlative.correlativeSubjectId === subject.id &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_TAKE &&
          correlative.correlativeCondition === CorrelativeCondition.APPROVED;
      }
    ) !== NO_CORRELATIVE_FOUND;
    this.checkAtLeastOneCorrelative(isToTakeApprovedChecked);
    return isToTakeApprovedChecked;
  }

  isToApproveChecked(subject: Subject): boolean {
    const isToApproveChecked = this.correlatives.find(
      (correlative) => {
        return correlative.correlativeSubjectId === subject.id &&
          correlative.correlativeRestriction === CorrelativeRestriction.TO_APPROVE &&
          correlative.correlativeCondition === CorrelativeCondition.APPROVED;
      }
    ) !== NO_CORRELATIVE_FOUND;
    this.checkAtLeastOneCorrelative(isToApproveChecked);
    return isToApproveChecked;
  }

  private checkAtLeastOneCorrelative(value: boolean) {
    this.atLeastOneCorrelative = value || this.atLeastOneCorrelative;
  }

}
