import {Component, OnInit} from '@angular/core';
import {CareerService} from '../../../../core/services/career.service';
import {InstitutionService} from '../../../../core/services/institution.service';
import {Career, Institutions} from '../../../../shared/models/career.model';

const FIRST_INSTITUTION_INDEX = 0;

@Component({
  selector: 'app-my-careers',
  templateUrl: './my-careers.component.html',
  styleUrls: ['./my-careers.component.css']
})

export class MyCareersComponent implements OnInit {
  public;
  careers: Career[] = [];

  constructor(private institutionService: InstitutionService) {
  }

  ngOnInit(): void {
    this._getCareers();
    // this._addProgram();
  }

  private _getCareers() {
    this.institutionService.getCareers().subscribe(
      (institution: Institutions) => {
        if (institution) {
          this.careers = institution.institutions[FIRST_INSTITUTION_INDEX].careers;
          // TODO: Change this ir order to get only the institution that correspond
        }
      }
    );
  }

  private _addProgram() {
    this.institutionService.addProgram();
  }

}
