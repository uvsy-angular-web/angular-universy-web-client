import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Subject} from '../../../../shared/models/subject.model';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {ProgramModalComponent} from '../../modals/program-modal/program-modal.component';
import {Program} from '../../../../shared/models/program.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProgramService} from '../../../../core/services/program.service';
import {SubjectService} from '../../../../core/services/subject.service';
import {SubjectModalComponent} from '../../../subject/modals/subject-modal/subject-modal.component';
import {ProgramModalService} from '../../modals/program-modal.service';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {SubjectModalService} from '../../../subject/modals/subject-modal.service';


@Component({
  selector: 'app-plan-edit',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  program: Program;
  subjects: Subject[];


  constructor(private location: Location,
              private programService: ProgramService,
              private notificationService: NotificationService,
              private programModalService: ProgramModalService,
              private subjectModalService: SubjectModalService,
              private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.program = this.programService.getCurrentProgam();
    this.getSubjects();
  }

  public openEditProgramModal() {
    this.programModalService.openEditProgramModal(
      this.program
    ).subscribe(
      (editedProgram: Program) => this.editProgram(editedProgram.name)
    );
  }

  public openNewSubjectModal() {
    this.subjectModalService.openNewSubjectModal().subscribe(
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
