import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Subject} from '../../../../shared/models/subject.model';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {ProgramModalComponent} from '../../components/program-modal/program-modal.component';
import {Program} from '../../../../shared/models/program.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProgramService} from '../../../../core/services/program.service';
import {SubjectService} from '../../../../core/services/subject.service';
import {SubjectModalComponent} from '../../components/subject-modal/subject-modal.component';


@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.css']
})
export class PlanEditComponent implements OnInit {
  program: Program;
  subjects: Subject[];


  constructor(private location: Location,
              private programService: ProgramService,
              private notificationService: NotificationService,
              private subjectService: SubjectService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.program = this.programService.getCurrentProgam();
    this.getSubjects();
  }

  public openEditProgramModal() {
    const modalRef = this.modalService.open(ProgramModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Editar plan';
    modalRef.componentInstance.confirmButtonText = 'Editar';
    modalRef.componentInstance.program = this.program;
    modalRef.componentInstance.confirmEvent.subscribe(
      (editedProgram: Program) => this.editProgram(editedProgram.name)
    );
  }

  public openNewSubjectModal() {
    const modalRef = this.modalService.open(SubjectModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Agregar carrera';
    modalRef.componentInstance.confirmButtonText = 'Agregar';
    modalRef.componentInstance.confirmEvent.subscribe(
      (newSubject: Program) => this.addSubject(newSubject)
    );
  }

  private addSubject(careerName) {
    this.subjectService.addSubject(careerName).subscribe(
      () => {
        this.getSubjects();
      }, ((error) => {
        this.notificationService.showError(error);
      })
    );
  }

  private editProgram(programName: string) {
    if (programName) {
      this.program.name = programName;
      this.programService.updateProgram(this.program).subscribe(
        () => {
          this.programService.setCurrentProgam(this.program);
        }, ((error) => {
          this.notificationService.showError('Ocurrió un error tratando de modificar el plan');
          console.error(error);
        })
      );
    }
  }

  private getSubjects() {
    this.subjectService.getSubjects().subscribe(
      (subjects: Subject[]) => {
        this.subjects = subjects;
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de obtener las materias del plan');
        console.error(error);
      })
    );
  }
}
