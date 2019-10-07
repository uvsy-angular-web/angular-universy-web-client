import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './config/system-config.service';

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
  addProgram() {
    const body = {
      careerKey: {
        institutionKey: 'FRC',
        careerCode: 'K'
      },
      uuid: '2937c937-e435-490e-85cf-9f7790d3a699',
      name: 'Plan 2003',
      validFrom: '26/03/2008'
    };
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    this.http.post(baseUrl + '/universy/institution/programs', body, {headers}).subscribe(
      (value) => {
        console.log(value);
      }
    );
  }
  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }
}
