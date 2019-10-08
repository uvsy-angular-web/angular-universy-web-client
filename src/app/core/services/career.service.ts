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


  getCareers() {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this._getHeaders();
    const params = new HttpParams()
      .set('institutionKey', 'FRC'); // TODO: change this, dont harcodear
    this.http.get(baseUrl + '/universy/institution', {headers, params}).subscribe(
      (value) => {
        console.log(value);
      }
    );
  }

  addCareer(career: Career, institution: Institution) {
    const body = {
      institutionKey: institution.institutionKey,
      careerName: career.careerName
    };
    const baseUrl = CareerService._getBaseUrl();
    const headers = this._getHeaders();
    this.http.put(baseUrl + '/universy/institution/careers', body, {headers}).subscribe(
      (value) => {
        console.log(value);
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
