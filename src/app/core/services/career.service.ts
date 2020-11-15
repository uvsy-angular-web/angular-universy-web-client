import { Injectable } from '@angular/core';
import { InstitutionService } from './institution.service';
import { LocalStorageService } from './local-storage.service';
import { Career } from '../../models/career.model';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { Endpoint } from 'src/app/models/endpoint.model';
import { Observable } from 'rxjs';

const CURRENT_CAREER_KEY = 'current-career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private endpoint = new Endpoint(EndpointName.CAREERS, EndpointName.INSTITUTIONS);

  constructor(
    private crudEndpointService: CRUDEndpointsService) {
  }

  activateCareer(career: Career, active: boolean) {
    career.active = active;
    return this.crudEndpointService.update(this.endpoint, career.id, career);
  }

  updateCareer(career: Career) {
    return this.crudEndpointService.update(this.endpoint, career.id, career);
  }

  addCareer(career: Career) {
    const institutionId = this.getInstitutionId();

    return this.crudEndpointService.createOnParent(institutionId, this.endpoint, career);
  }

  getAllCareers(): Observable<Career[]> {
    const institutionId = this.getInstitutionId();

    return this.crudEndpointService.getAllFromParent(institutionId, this.endpoint);
  }

  getCareersNames(): Observable<string[]> {
    return this.getAllCareers().map(
      (careers: Career[]) => careers.map((career: Career) => career.name)
    );
  }

  private getInstitutionId(): string {
    return InstitutionService.getCurrentInstitution().id;
  }

  public static setCurrentCareer(career: Career) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_CAREER_KEY, career);
  }

  public static getCurrentCareer(): Career {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_CAREER_KEY) as Career;
  }

}
