import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';

@Component({
  selector: 'app-subject-item',
  templateUrl: './subject-item.component.html',
  styleUrls: ['./subject-item.component.css']
})
export class SubjectItemComponent implements OnInit {
  @Input() active = false;
  @Input() subject: Subject;
  @Output() subjectSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectSubject() {
    this.subjectSelected.emit();
  }
}
