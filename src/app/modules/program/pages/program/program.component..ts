import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Subject} from '../../../../shared/models/subject.model';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {Program} from '../../../../shared/models/program.model';
import {ProgramService} from '../../../../core/services/program.service';
import {SubjectService} from '../../../../core/services/subject.service';
import {ProgramModalService} from '../../modals/program-modal.service';
import {SubjectModalService} from '../../../subject/modals/subject-modal.service';
import {Router} from '@angular/router';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {NavigationService} from '../../../../core/services/system/navigation.service';

const INITIAL_LEVEL = 1;

@Component({
  selector: 'app-plan-edit',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  program: Program;
  subjects: Subject[];
  subjectsXLevel: SubjectsXLevel[] = [];

  constructor(private location: Location,
              private programService: ProgramService,
              private navigationService: NavigationService,
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

  public openDeleteProgramModal() {
    this.notificationService.openConfirmModal(
      'Eliminar plan',
      'Se eliminara el plan y todas las materias que hayan sido cargadas.',
      '¿ Esta seguro que desea eliminarlo ?',
      ButtonText.Delete
    ).subscribe(
      (confirm) => {
        this.deleteProgram();
      }
    );
  }

  private deleteProgram() {
    if (!this.program.published) {
      this.programService.deleteProgram(this.program).subscribe(
        () => {
          this.navigationService.navigateToCareerPage();
        },
        (error) => {
          this.notificationService.showError('Ocurrió un error intentando borrar el plan.');
          console.error(error);
        });
    }
  }

  public navigateToSubjectView(subject: Subject) {
    this.subjectService.setCurrentSubject(subject);
    this.navigationService.navigateToSubjectPage();
  }

  public canEditProgram(): boolean {
    return !this.program.published;
  }

  private addSubject(careerName) {
    this.subjectService.addSubject(careerName).subscribe(
      () => {
        this.getSubjects();
      }, ((error) => {
        this.notificationService.showError('Ocurrio un error tratando de agregar una materia');
        console.error(error.message);
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
        if (subjects) {
          this.subjects = subjects;
          this.generateLevels();
        }
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de obtener las materias del plan');
        console.error(error);
      })
    );
  }

  private generateLevels() {
    this.subjectsXLevel = [];
    const maximumLevel = this.getMaximumLevel();
    for (let level = INITIAL_LEVEL; level <= maximumLevel; level++) {
      const subjectsXLevel = this.getLevelSubjects(level);
      this.subjectsXLevel.push(subjectsXLevel);
    }
  }

  private getLevelSubjects(level) {
    const subjectsXLevel = new SubjectsXLevel(level, []);
    this.subjects.forEach((subject, index, list) => {
      if (subject.level === level) {
        subjectsXLevel.subjects.push(subject);
        // ProgramComponent.removeSubjectFromList(list, index);
      }
    });
    return subjectsXLevel;
  }


  private getMaximumLevel() {
    let maximumLevel = 1;
    this.subjects.forEach((subject) => {
      if (subject.level > maximumLevel) {
        maximumLevel = subject.level;
      }
    });
    return maximumLevel;
  }

  private static removeSubjectFromList(lista, index) {
    lista.splice(index, 1);
  }
}

export class SubjectsXLevel {
  level: number;
  subjects: Subject[];

  constructor(level: number, subjects: Subject[]) {
    this.level = level;
    this.subjects = subjects;
  }
}
