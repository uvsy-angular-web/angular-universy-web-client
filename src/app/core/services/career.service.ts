import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './config/system-config.service';
import {Modules} from '../../shared/models/modules.enum';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient, private systemConfigService: SystemConfigService) {
  }


  getCareers() {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const params = new HttpParams()
      .set('institutionKey', 'FRC');
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
      name: 'Program What',
      validFrom: '26/03/2020'
    };
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    this.http.put(baseUrl + '/universy/institution/programs', body, {headers}).subscribe(
      (value) => {
        console.log(value);
      }
    );
  }
}
