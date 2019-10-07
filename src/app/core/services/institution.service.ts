import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './config/system-config.service';
import {Institutions} from '../../shared/models/career.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient, private systemConfigService: SystemConfigService) {
  }


  getCareers(): Observable<Institutions> {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const params = new HttpParams()
      .set('institutionKey', 'FRC');
    return this.http.get<Institutions>(baseUrl + '/universy/institution', {headers, params});
  }

  addProgram() {
    const body = {
      careerKey: {
        institutionKey: 'FRC',
        careerCode: 'K'
      },
      name: '21:14-PUT',
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
