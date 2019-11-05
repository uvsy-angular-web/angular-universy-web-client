import {Component, Input, OnInit} from '@angular/core';
import {CourseModalService} from '../../modals/course-modal.service';
import {Professor} from '../../../../models/professor.model';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {
  @Input() professors: Professor[] = [];
  noProfessorMessage = 'El período no posee profesores todavía, haz click en Agregar Profesor';
  addProfessorButtonTitle = 'Agregar Profesor';

  constructor(private courseModalService: CourseModalService) {
  }

  openNewScheduleModal() {
    this.courseModalService.openNewProfessorModal().subscribe(
      (professor) => this.professors.push(professor)
    );
  }

  ngOnInit() {
  }

}
