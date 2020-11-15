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
import { Commission } from 'src/app/models/commission.model';
import { CommissionService } from 'src/app/core/services/commission.service';
import { Level } from 'src/app/models/level';

const INITIAL_LEVEL = 1;
const NO_SUBJECTS_LEVEL_NO_PUBLISHED = 'Aun no agregaste ninguna materia al nivel.';
const NO_SUBJECTS_LEVEL_PUBLISHED = 'No existen materias para este nivel.';
const ERROR_ON_SUBJECT_MODAL = 'Ocurrió un error tratando de abrir el modal de materia';
const ADD_COMMISSION_MODAL_TITLE = 'Agregar comisión';
const EDIT_COMMISSION_MODAL_TITLE = 'Modificar comisión';
const DELETE_COMMISSION_MODAL_TITLE = 'Borrar comisión';
const DELETE_COMMISSION_MODAL_MESSAGE = 'Usted esta por eliminar una comisión, se perdera toda información cargada a la misma.';
const DELETE_COMMISSION_MODAL_QUESTION = '¿ Desea continuar ?';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  optativeHeader = 'Optativa';
  addSubjectText = 'Agregar materia';
  levelText = 'Nivel';
  addOptativeSubjectText = 'Agregar materia optativa';
  program: Program;
  subjects: Subject[] = [];
  levels: Level[] = [];
  commissions: Commission[] = [];
  noSubjectOnLevelMessage: string;
  showAddSubjectButton: boolean;
  constructor(
    private programService: ProgramService,
    private navigationService: NavigationService,
    private commissionService: CommissionService,
    private notificationService: ModalService,
    private programModalService: ProgramModalService,
    private subjectModalService: SubjectModalService,
    private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.program = ProgramService.getCurrentProgram();
    this.showAddSubjectButton = !this.isProgramPublished();
    this.getData();
    this.fillSubjectOnLevelMessage();
  }

  addCommission(level: number) {
    this.notificationService.openEditNameModal(
      ADD_COMMISSION_MODAL_TITLE,
      ButtonText.Add)
      .subscribe(
        (name: string) => {
          const newCommission = new Commission();
          newCommission.name = name;
          newCommission.level = level;
          this.commissionService
            .addCommission(newCommission, this.program)
            .subscribe(
              () => this.getData()
            );
        }
      );
  }

  editCommission(commission: Commission) {
    this.notificationService.openEditNameModal(
      EDIT_COMMISSION_MODAL_TITLE,
      ButtonText.Edit,
      commission.name)
      .subscribe(
        (newName: string) => {
          commission.name = newName;
          this.commissionService
            .updateCommission(commission)
            .subscribe(
              () => this.getData()
            );
        }
      );
  }

  deleteCommission(commission: Commission) {
    this.notificationService.openConfirmModal(
      DELETE_COMMISSION_MODAL_TITLE,
      DELETE_COMMISSION_MODAL_MESSAGE,
      DELETE_COMMISSION_MODAL_QUESTION,
      ButtonText.Delete)
      .subscribe(
        (confirm) => {
          if (confirm) {
            this.commissionService
              .deleteCommission(commission)
              .subscribe(
                () => this.getData()
              );
          }
        }
      );
  }

  openEditProgramModal() {
    this.programModalService.openEditProgramModal(
      this.program
    ).subscribe(
      (editedProgram: Program) => this.editProgram(editedProgram)
    );
  }

  openNewSubjectModal() {
    try {
      const isProgramPublished = ProgramService.getCurrentProgram().active;
      this.subjectModalService.openNewSubjectModal(isProgramPublished).subscribe(
        (newSubject: Subject) => this.addSubject(newSubject)
      );
    } catch (_) {
      this.notificationService.showError(ERROR_ON_SUBJECT_MODAL);
    }
  }

  openDeleteProgramModal() {
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

  navigateToSubjectView(subject: Subject) {
    SubjectService.setCurrentSubject(subject);
    this.navigationService.navigateToSubjectPage();
  }

  canEditProgram(): boolean {
    return !this.program.active;
  }

  isProgramPublished() {
    return this.program.active;
  }

  private fillSubjectOnLevelMessage() {
    this.noSubjectOnLevelMessage = this.program.active ?
      NO_SUBJECTS_LEVEL_PUBLISHED :
      NO_SUBJECTS_LEVEL_NO_PUBLISHED;
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

  private addSubject(newSubject) {
    this.subjectService.validateOptativeSubject(newSubject).subscribe(
      (isValid: boolean) => {
        if (isValid) {
          this.subjectService.addSubject(newSubject).subscribe(
            () => this.getData()
            ,
            (error) => {
              this.notificationService.showError('Ocurrió un error tratando de agregar una materia');
              console.error(error.message);
            }
          );
        }
      }
    );

  }

  private editProgram(editedProgram) {
    if (editedProgram) {
      this.programService.updateProgram(editedProgram).subscribe(
        () => {
          ProgramService.setCurrentProgram(editedProgram);
          this.program = editedProgram;
        }
      );
    }
  }

  private getData() {
    this.subjectService.getSubjects().subscribe(
      (subjects: Subject[]) => {
        this.subjects = subjects;
        this.getCommissions();
      }
    );
  }

  private getCommissions() {
    this.commissionService.getCommissions(this.program).subscribe(
      (commissions: Commission[]) => {
        this.commissions = commissions;
        this.generateLevels();
      }
    );
  }

  private generateLevels() {
    this.levels = [];
    const subjectstMaxLevel = this.getMaximumLevel(this.subjects);
    const commissionsMaxLevel = this.getMaximumLevel(this.commissions);
    const maximumLevel = Math.max(subjectstMaxLevel, commissionsMaxLevel);
    for (let level = INITIAL_LEVEL; level <= maximumLevel; level++) {
      const subjects = this.subjects.filter((subject) => this.isCurrentLevel(subject, level));
      const commissions = this.commissions.filter((commission) => this.isCurrentLevel(commission, level));
      const newLevel = new Level();
      newLevel.levelNumber = level;
      newLevel.subjects = subjects;
      newLevel.commissions = commissions;
      this.levels.push(newLevel);
    }
  }

  private isCurrentLevel(object, level) {
    return object.level === level;
  }

  private getMaximumLevel(list: any[]) {
    let maximumLevel = 1;
    list.forEach((object: any) => {
      if (object.level > maximumLevel) {
        maximumLevel = object.level;
      }
    });
    return maximumLevel;
  }
}
