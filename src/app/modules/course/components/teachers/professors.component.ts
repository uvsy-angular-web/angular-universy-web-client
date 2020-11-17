import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseModalService} from '../../modals/course-modal.service';
import {Professor} from '../../../../models/professor.model';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {ModalService} from '../../../../modals/modal.service';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {
  @Input() professors: Professor[] = [];
  @Output() professorAdded: EventEmitter<Professor> = new EventEmitter<Professor>();
  @Output() professorEdited: EventEmitter<Professor> = new EventEmitter<Professor>();
  @Output() professorDeleted: EventEmitter<Professor> = new EventEmitter<Professor>();
  noProfessorMessage = 'El período no posee profesores todavía, haz click en Agregar Profesor';
  addProfessorButtonTitle = 'Agregar Profesor';

  constructor(
    private courseModalService: CourseModalService,  private modalService: ModalService) {
  }

  public ngOnInit() {
  }

  public openNewScheduleModal() {
    this.courseModalService.openNewProfessorModal().subscribe(
      (professor) => this.professorAdded.emit(professor)
    );
  }

  public editProfessor(professor: Professor) {
    this.courseModalService.openEditProfessorModal(professor).subscribe(
      (professorEdited) => this.professorEdited.emit(professorEdited)
    );
  }

  public deleteProfessor(professor: Professor) {
    this.modalService.openConfirmModal(
      'Eliminar Profesor',
      'Usted está por eliminar un Profesor.',
      '¿Desea continuar?',
      ButtonText.Delete
    ).subscribe(
      () => {
        this.professorDeleted.emit(professor);
      }
    );
  }
}
