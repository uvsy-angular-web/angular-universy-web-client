import { Component, OnInit } from '@angular/core';
import { Career } from '../../../../models/career.model';
import { CareerService } from '../../../../core/services/career.service';
import { ModalService } from '../../../../modals/modal.service';
import { Program } from '../../../../models/program.model';
import { ProgramService } from '../../../../core/services/program.service';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { ProgramModalService } from '../../../program/modals/program-modal.service';
import { NavigationService } from '../../../../core/services/system/navigation.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  career: Career;
  programs: Program[] = [];


  constructor(
    private careerService: CareerService,
    private programService: ProgramService,
    private navigationService: NavigationService,
    private programModalService: ProgramModalService,
    private notificationService: ModalService) {
  }

  ngOnInit() {
    this.career = CareerService.getCurrentCareer();
    this.getPrograms();
  }

  public getStateOfCareer(): boolean {
    return this.career.active;
  }

  public async navigateToProgramPage(program: Program) {
    ProgramService.setCurrentProgram(program);
    this.navigationService.navigateToProgramPage();
  }

  public async navigateToProgramStats(program: Program) {
    ProgramService.setCurrentProgram(program);
    this.navigationService.navigateToProgramStats();
  }

  public editStateOfCareer(state: boolean) {
    if (state) {
      this.activateCareer();
      // TODO: Adds inactivate career
    }
  }

  public openEditCareerModal() {
    this.notificationService.openEditNameModal(
      'Modificar carrera',
      ButtonText.Edit,
      '',
    ).subscribe(
      (newCareerName) => this.editCareerName(newCareerName)
    );
  }

  public openNewProgramModal() {
    this.programModalService.openNewProgramModal().subscribe(
      (newProgram: Program) => this.addProgram(newProgram)
    );
  }


  public showAddProgram(): boolean {
    return this.programs.length === 0 || !this.isThereProgramNotPublished();
  }

  private isThereProgramNotPublished() {
    return this.programs.find((program: Program) => program.active === false);
  }

  private addProgram(newProgram: Program) {
    if (newProgram) {
      this.programService.addProgram(newProgram).subscribe(
        () => {
          this.getPrograms();
        }
      );
    }
  }

  private getPrograms() {
    this.programService.getPrograms().subscribe(
      (programs: Program[]) => {
        this.programs = programs;
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de obtener los planes de la carrera');
        console.error(error);
      })
    );
  }

  private editCareerName(careerName: string) {
    if (careerName) {
      this.career.name = careerName;
      this.updateCareer();
    }
  }

  private updateCareer() {
    this.careerService.updateCareer(this.career).subscribe(
      () => {
        CareerService.setCurrentCareer(this.career);
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de modificar la carrera');
        console.error(error);
      })
    );
  }

  private activateCareer() {
    this.careerService.activateCareer(this.career).subscribe(
      () => {
        CareerService.setCurrentCareer(this.career);
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de activar la carrera');
        console.error(error);
      })
    );
  }
}
