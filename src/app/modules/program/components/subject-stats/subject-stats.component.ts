import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subject-stats',
  templateUrl: './subject-stats.component.html',
  styleUrls: ['./subject-stats.component.css']
})
export class SubjectStatsComponent implements OnInit {
  @Input() subjectName: string = 'Matemática Discreta';
  @Input() courseNameList: string[] = ['1k2', '1k3', '1k4', '1k5', '1k2'];

  courseListTitle = 'Comisiones';
  corelativesTitle = 'Correlativas';
  
  constructor() { }

  ngOnInit() {
  }

}
