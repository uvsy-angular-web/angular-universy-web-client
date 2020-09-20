import { Injectable } from '@angular/core';
import { SystemConfigService } from './system/system-config.service';
import { HttpClient } from '@angular/common/http';
import { InstitutionService } from './institution.service';
import { LocalStorageService } from './local-storage.service';
import { Career } from '../../models/career.model';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { Endpoint } from 'src/app/models/endpoint.model';
import { Observable } from 'rxjs';
import { CareerStat } from 'src/app/models/career-stat.model';
import { NavigationService } from './system/navigation.service';
import { Route } from './system/routes/routes.enum';

const CURRENT_CAREER_KEY = 'current-career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private endpoint = new Endpoint(EndpointName.CAREERS, EndpointName.INSTITUTIONS);

  constructor(
    private navigationService: NavigationService,
    private crudEndpointService: CRUDEndpointsService) {
  }

  activateCareer(career: Career) {
    return this.crudEndpointService.activate(this.endpoint, career.id);
  }

  updateCareer(career: Career) {
    return this.crudEndpointService.update(this.endpoint, career.id, career);
  }

  addCareer(careerName: string) {
    const institutionId = this.getInstitutionId();

    const career = new Career();
    career.name = careerName;

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

  getCareerById(careerId: string): Observable<Career> {
    return this.crudEndpointService.get(this.endpoint, careerId);
  };

  navigateToCareerState(careerId: string) {
    this.getCareerById(careerId).subscribe(
      (career: Career) => {
        CareerService.setCurrentCareer(career);
        this.navigationService.navigateToRoute(Route.CAREER_STATS);
      }
    )
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
