import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
const PERCENTAGE_CONSTANT = 20;

@Component({
  selector: 'app-subject-item',
  templateUrl: './subject-item.component.html',
  styleUrls: ['./subject-item.component.css']
})
export class SubjectItemComponent implements OnInit {
  @Input() active = false;
  @Input() subject: Subject;
  @Input() subjectRate = Math.floor(Math.random() * 5) + 0 ;
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
    this.progress = this.subjectRate * PERCENTAGE_CONSTANT;
  }
}
