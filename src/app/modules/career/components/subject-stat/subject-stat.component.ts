import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';

@Component({
  selector: 'app-subject-stat',
  templateUrl: './subject-stat.component.html',
  styleUrls: ['./subject-stat.component.css']
})
export class SubjectStatComponent implements OnInit {
  @Input() subject: Subject;
  @Input() subjectRate = 4.2;
  subjectRateTxt = 'Valoración general';

  constructor() { }

  ngOnInit() {
  }

}
