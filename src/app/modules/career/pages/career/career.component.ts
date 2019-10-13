import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Career} from '../../../../shared/models/career.model';
import {CareerService} from '../../../../core/services/career.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InstitutionService} from '../../../../core/services/institution.service';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {Program} from '../../../../shared/models/program.model';
import {ProgramModalComponent} from '../../../program/modals/program-modal/program-modal.component';
import {ProgramService} from '../../../../core/services/program.service';
import {Location} from '@angular/common';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {ProgramModalService} from '../../../program/modals/program-modal.service';


@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  career: Career;
  programs: Program[] = [];


  constructor(private route: ActivatedRoute,
              private careerService: CareerService,
              private programService: ProgramService,
              private location: Location,
              private programModalService: ProgramModalService,
              private institutionService: InstitutionService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.career = this.careerService.getCurrentCareer();
    this.getPrograms();
  }

  public async navigateToProgramPage(program: Program) {
    this.programService.setCurrentProgam(program);
    await this.router.navigate(['institution/career/program']);
  }

  public openEditCareerModal() {
    this.notificationService.openEditNameModal(
      'Modificar carrera',
      'Modificar',
      this.career.careerName
    ).subscribe(
      (newCareerName) => this.editCareer(newCareerName)
    );
  }

  public openNewProgramModal() {
    this.programModalService.openNewProgramModal().subscribe(
      (newProgram: Program) => this.addProgram(newProgram)
    );
  }


  public openConfirmPublishModal() {
    this.programModalService.openConfirmPublishModal().subscribe(
      (action) => {
        console.log('Desa publicar el plan');
        // TODO: Implement publish plan action
      }
    );
  }

  public showAddProgram(): boolean {
    return this.programs.length === 0 && !this.isThereProgramNotPublished();
  }

  private isThereProgramNotPublished() {
    return this.programs.find((program: Program) => program.published === false);
  }

  private addProgram(newProgram: Program) {
    if (newProgram) {
      this.programService.addProgram(newProgram).subscribe(
        () => {
          this.getPrograms();
        }, ((error) => {
          this.notificationService.showError('Ocurrió un error tratando de agregar un nuevo plan.');
          console.error(error);
        })
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

  private editCareer(careerName: string) {
    if (careerName) {
      this.career.careerName = careerName;
      this.careerService.updateCareer(this.career).subscribe(
        () => {
          this.careerService.setCurrentCareer(this.career);
        }, ((error) => {
          this.notificationService.showError('Ocurrió un error tratando de modificar la carrera');
          console.error(error);
        })
      );
    }
  }
}
