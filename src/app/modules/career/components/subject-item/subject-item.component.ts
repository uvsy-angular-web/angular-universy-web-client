import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { RATING_PERCENTAGE_MULTIPLIER, SubjectStat } from 'src/app/models/subject-stat.model';

@Component({
  selector: 'app-subject-item',
  templateUrl: './subject-item.component.html',
  styleUrls: ['./subject-item.component.css']
})
export class SubjectItemComponent implements OnInit {
  isOptativeMessage = 'Optativa';
  @Input() active = false;
  @Input() subject: SubjectStat;
  @Output() subjectSelected: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this._calculateProgressPercentage();
  }

  selectSubject() {
    this.subjectSelected.emit();
  }

  private _calculateProgressPercentage() {
    this.subject.ratingPercentage = this.subject.rating * RATING_PERCENTAGE_MULTIPLIER;
  }
}
