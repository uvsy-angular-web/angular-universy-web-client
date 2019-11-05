import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseModalService} from '../../modals/course-modal.service';
import {Professor} from '../../../../models/professor.model';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {
  @Input() professors: Professor[] = [];
  @Output() professorAdded: EventEmitter<Professor> = new EventEmitter<Professor>();
  @Output() professorDeleted: EventEmitter<Professor> = new EventEmitter<Professor>();
  noProfessorMessage = 'El período no posee profesores todavía, haz click en Agregar Profesor';
  addProfessorButtonTitle = 'Agregar Profesor';

  constructor(
    private courseModalService: CourseModalService) {
  }

  public ngOnInit() {
  }

  public openNewScheduleModal() {
    this.courseModalService.openNewProfessorModal().subscribe(
      (professor) => this.professorAdded.emit(professor)
    );
  }

  public editProfessor() {

  }

  public deleteProfessor(professor) {
    this.professorDeleted.emit(professor);
  }

}
