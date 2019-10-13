import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Career} from '../../../../shared/models/career.model';
import {CareerService} from '../../../../core/services/career.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InstitutionService} from '../../../../core/services/institution.service';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {Program} from '../../../../shared/models/program.model';
import {ProgramModalComponent} from '../../components/program-modal/program-modal.component';
import {ProgramService} from '../../../../core/services/program.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  career: Career;
  programs: Program[] = [];


  constructor(private route: ActivatedRoute,
              private careerService: CareerService,
              private programService: ProgramService,
              private modalService: NgbModal,
              private location: Location,
              private institutionService: InstitutionService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.career = this.careerService.getCurrentCareer();
    this.getPrograms();
  }

  public async navigateToEditProgramPage(program: Program) {
    this.programService.setCurrentProgam(program);
    await this.router.navigate(['career/plan/plan-edit']);
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

  public openNewPlanModal() {
    const modalRef = this.modalService.open(ProgramModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Agregar plan';
    modalRef.componentInstance.confirmButtonText = 'Agregar';
    modalRef.componentInstance.confirmEvent.subscribe(
      (newProgram: Program) => this.addProgram(newProgram)
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
