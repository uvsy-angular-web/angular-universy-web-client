import {Injectable} from '@angular/core';
import {Career} from '../../models/career.model';
import {BehaviorSubject} from 'rxjs';
import {SystemConfigService} from './system/system-config.service';
import {HttpClient} from '@angular/common/http';
import {InstitutionService} from './institution.service';

const ENDPOINT_CAREERS = '/universy/institution/careers';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private careerSource = new BehaviorSubject<Career>(new Career());
  public currentCareer = this.careerSource.asObservable();

  constructor(private http: HttpClient,
              private systemConfigService: SystemConfigService,
              private institutionService: InstitutionService) {
  }

  public setCurrentCareer(career: Career) {
    this.careerSource.next(career);
  }

  public getCurrentCareer(): Career {
    let career;
    this.currentCareer
      .subscribe((serviceCareer) => career = serviceCareer);
    return career;
  }


  updateCareer(career: Career) {
    const body = {
      institutionKey: this.institutionService.getCurrentInstitution().institutionKey,
      career
    };
    const baseUrl = CareerService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.post(baseUrl + ENDPOINT_CAREERS, body, {headers});
  }

  addCareer(careerName: string) {
    const body = {
      institutionKey: this.institutionService.getCurrentInstitution().institutionKey,
      careerName
    };
    const baseUrl = CareerService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.put(baseUrl + ENDPOINT_CAREERS, body, {headers});
  }


  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }

}
