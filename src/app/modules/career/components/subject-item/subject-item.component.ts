import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SubjectStat } from 'src/app/models/program-report.model';
const PERCENTAGE_CONSTANT = 20;

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
  progress = 0;
  constructor() { }

  ngOnInit() {
    this.calculateProgress();
  }

  selectSubject() {
    this.subjectSelected.emit();
  }

  private calculateProgress() {
    this.progress = this.subject.rating * PERCENTAGE_CONSTANT;
  }
}
