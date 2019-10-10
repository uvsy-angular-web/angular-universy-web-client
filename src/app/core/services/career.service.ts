import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './config/system-config.service';
import {Career, Institution} from '../../shared/models/career.model';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient, private systemConfigService: SystemConfigService) {
  }

  addCareer(career: Career, institution: Institution) {
    const body = {
      institutionKey: institution.institutionKey,
      careerName: career.careerName
    };
    const baseUrl = CareerService._getBaseUrl();
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
