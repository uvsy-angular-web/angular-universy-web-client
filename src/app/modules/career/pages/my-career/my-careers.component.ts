import {Component, OnInit} from '@angular/core';
import {InstitutionService} from '../../../../core/services/institution.service';
import {Career, Institution, Institutions} from '../../../../shared/models/career.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CareerModalComponent} from '../../components/career-modal/career-modal.component';
import {CareerService} from '../../../../core/services/career.service';


@Component({
  selector: 'app-my-careers',
  templateUrl: './my-careers.component.html',
  styleUrls: ['./my-careers.component.css']
})

export class MyCareersComponent implements OnInit {
  public;
  institution: Institution = new Institution();

  constructor(
    private institutionService: InstitutionService,
    private careerService: CareerService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this._getCareers();
  }

  private _getCareers() {
    this.institutionService.getInstitution().subscribe(
      (institution: Institution) => {
        if (institution) {
          this.institution = institution;
        }
      }
    );
  }

  public openNewCareerModal() {
    const modalRef = this.modalService.open(CareerModalComponent);
    modalRef.componentInstance.title = 'Agregar carrera';
    modalRef.componentInstance.confirmButtonText = 'Agregar';
    modalRef.componentInstance.confirmEvent.subscribe((career) => {
      this.addCareer(career);
    });
  }

  private addCareer(career: Career) {
    this.careerService.addCareer(career, this.institution);
  }


}
