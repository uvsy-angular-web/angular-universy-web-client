import { Injectable } from '@angular/core';
import { InstitutionService } from '../institution.service';
import { Institution } from 'src/app/models/career.model';
import * as compareTwoStrings from 'string-similarity';
@Injectable({
  providedIn: 'root'
})
export class RepeatedTextService {

  constructor(private institutionService: InstitutionService) { }

  public validateCareerName() {
    const careers = this.getCareersList();
    // careers.forEach(element => {
    // });
    // return compareTwoStrings.compareTwoStrings('healed', 'sealed');
    console.log(compareTwoStrings);
  }

  private getCareersList() {
    let careers = null;
    this.institutionService.getInstitution().subscribe((institution: Institution) => {
      careers = institution.careers;
    });
    return careers;
  }
}
