import {Injectable} from '@angular/core';
import {Career, Institution, Institutions} from '../../shared/models/career.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {SystemConfigService} from './config/system-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {InstitutionService} from './institution.service';
import {Program} from '../../shared/models/program.model';

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
    return this.http.put(baseUrl + '/universy/institution/careers', body, {headers});
  }

  public addProgram(program: Program) {
    const body = {
      careerKey: this.getCurrentCareer().careerKey,
      name: program.name,
      validFrom: program.validFrom
    };
    const baseUrl = CareerService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.put(baseUrl + '/universy/institution/programs', body, {headers});
  }

  getPrograms(): Observable<Program[]> {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const params = new HttpParams();
    params.append('institutionKey', this.getCurrentCareer().careerKey.institutionKey);
    params.append('careerCode', this.getCurrentCareer().careerKey.careerCode);
    return this.http.get(baseUrl + '/universy/institution/programs', {headers, params})
      .map((data: any) => {
          return data.programs;
        }
      );
  }

  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }

}
