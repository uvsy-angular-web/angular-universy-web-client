import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './config/system-config.service';
import {Career, Institution, Institutions} from '../../shared/models/career.model';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/map';

const FIRST_INSTITUTION_INDEX = 0;

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient, private systemConfigService: SystemConfigService) {
  }


  getInstitution(): Observable<Institution> {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const params = new HttpParams()
      .set('institutionKey', 'FRC'); // TODO. Stop Hardcoding the key
    return this.http.get(baseUrl + '/universy/institution', {headers, params})
      .map((institutions: Institutions) => {
          return institutions.institutions[FIRST_INSTITUTION_INDEX];
        }
      );
  }

  addCareer(career: Career, institution: Institution) {
    const body = {
      institutionKey: institution.institutionKey,
      careerName: career.careerName
    };
    const baseUrl = InstitutionService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.put(baseUrl + '/universy/institution/careers', body, {headers});
  }

  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }
}
