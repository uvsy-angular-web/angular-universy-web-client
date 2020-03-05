import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { GraphItem } from 'src/app/shared/components/graph-bar/graph-bar.component';

@Component({
  selector: 'app-subject-stat',
  templateUrl: './subject-stat.component.html',
  styleUrls: ['./subject-stat.component.css']
})
export class SubjectStatComponent implements OnInit {
  @Input() subject: Subject;
  @Input() subjectRate = 4.2;
  subjectRateTxt = 'Valoración general';
  dificultGraphTitle = 'Dificultad';
  overallGraphTitle = 'Valoración';
  wouldTakeAgainGraphTitle = 'Volveria a cursar';

  dificultsItems = [
    new GraphItem('1k1', Math.floor(Math.random() * 5)),
    new GraphItem('1k2', Math.floor(Math.random() * 5)),
    new GraphItem('1k3', Math.floor(Math.random() * 5)),
    new GraphItem('1k4', Math.floor(Math.random() * 5)),
    new GraphItem('1k5', Math.floor(Math.random() * 5)),
    new GraphItem('1k6', Math.floor(Math.random() * 5)),
    new GraphItem('1k7', Math.floor(Math.random() * 5)),
  ];
  overallItems = [
    new GraphItem('1k1', Math.floor(Math.random() * 5)),
    new GraphItem('1k2', Math.floor(Math.random() * 5)),
    new GraphItem('1k3', Math.floor(Math.random() * 5)),
    new GraphItem('1k4', Math.floor(Math.random() * 5)),
    new GraphItem('1k5', Math.floor(Math.random() * 5)),
    new GraphItem('1k6', Math.floor(Math.random() * 5)),
    new GraphItem('1k7', Math.floor(Math.random() * 5)),
  ];
  wouldTakeAgainItems = [
    new GraphItem('1k1', Math.floor(Math.random() * 100)),
    new GraphItem('1k2', Math.floor(Math.random() * 100)),
    new GraphItem('1k3', Math.floor(Math.random() * 100)),
    new GraphItem('1k4', Math.floor(Math.random() * 100)),
    new GraphItem('1k5', Math.floor(Math.random() * 100)),
    new GraphItem('1k6', Math.floor(Math.random() * 100)),
    new GraphItem('1k7', Math.floor(Math.random() * 100)),
  ];



  constructor() { }

  ngOnInit() {
  }

}
