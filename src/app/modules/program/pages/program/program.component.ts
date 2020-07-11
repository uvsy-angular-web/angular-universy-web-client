import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../../models/subject.model';
import { ModalService } from '../../../../modals/modal.service';
import { Program } from '../../../../models/program.model';
import { ProgramService } from '../../../../core/services/program.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { ProgramModalService } from '../../modals/program-modal.service';
import { SubjectModalService } from '../../../subject/modals/subject-modal.service';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { NavigationService } from '../../../../core/services/system/navigation.service';

export class SubjectsXLevel {
  level: number;
  subjects: Subject[];

  constructor(level: number, subjects: Subject[]) {
    this.level = level;
    this.subjects = subjects;
  }
}

const INITIAL_LEVEL = 1;
const NO_SUBJECTS_LEVEL_NO_PUBLISHED = 'Aun no agregaste ninguna materia al nivel.';
const NO_SUBJECTS_LEVEL_PUBLISHED = 'No existen materias para este nivel.';
const ERROR_ON_SUBJECT_MODAL = 'Ocurrió un error tratando de abrir el modal de materia';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  optativeHeader = 'Optativa';
  addSubjectText = 'Agregar materia';
  addOptativeSubjectText = 'Agregar materia optativa';
  program: Program;
  subjects: Subject[];
  subjectsXLevel: SubjectsXLevel[] = [];
  noSubjectOnLevelMessage: string;
  showAddSubjectButton: boolean;
  constructor(
    private programService: ProgramService,
    private navigationService: NavigationService,
    private notificationService: ModalService,
    private programModalService: ProgramModalService,
    private subjectModalService: SubjectModalService,
    private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.program = ProgramService.getCurrentProgram();
    this.showAddSubjectButton = !this.isProgramPublished();
    this.getSubjects();
    this.fillSubjectOnLevelMessage();
  }

  private fillSubjectOnLevelMessage() {
    this.noSubjectOnLevelMessage = this.program.active ?
      NO_SUBJECTS_LEVEL_PUBLISHED :
      NO_SUBJECTS_LEVEL_NO_PUBLISHED;
  }

  public openEditProgramModal() {
    this.programModalService.openEditProgramModal(
      this.program
    ).subscribe(
      (editedProgram: Program) => this.editProgram(editedProgram.name)
    );
  }

  public openNewSubjectModal() {
    try {
      const isProgramPublished = ProgramService.getCurrentProgram().active;
      this.subjectModalService.openNewSubjectModal(isProgramPublished).subscribe(
        (newSubject: Program) => this.addSubject(newSubject)
      );
    } catch (_) {
      this.notificationService.showError(ERROR_ON_SUBJECT_MODAL);
    }
  }

  public openDeleteProgramModal() {
    this.notificationService.openConfirmModal(
      'Eliminar plan',
      'Se eliminará el plan y todas las materias que hayan sido cargadas.',
      '¿ Está seguro que desea eliminarlo ?',
      ButtonText.Delete
    ).subscribe(
      () => {
        this.deleteProgram();
      }
    );
  }

  private deleteProgram() {
    if (!this.program.active) {
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
    SubjectService.setCurrentSubject(subject);
    this.navigationService.navigateToSubjectPage();
  }

  public canEditProgram(): boolean {
    return !this.program.active;
  }

  private addSubject(careerName) {
    this.subjectService.addSubject(careerName).subscribe(
      () => {
        this.getSubjects();
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de agregar una materia');
        console.error(error.message);
      })
    );
  }

  private editProgram(programName: string) {
    if (programName) {
      this.program.name = programName;
      this.programService.updateProgram(this.program).subscribe(
        () => {
          ProgramService.setCurrentProgram(this.program);
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
    this.subjects.forEach((subject) => {
      if (subject.level === level) {
        subjectsXLevel.subjects.push(subject);
      }
    });
    return subjectsXLevel;
  }

  public isProgramPublished() {
    return this.program.active;
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
}
