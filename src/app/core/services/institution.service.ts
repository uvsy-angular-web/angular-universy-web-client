import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './config/system-config.service';
import {Institution, Institutions} from '../../shared/models/career.model';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs-compat/add/operator/map';

const FIRST_INSTITUTION_INDEX = 0;
const MOCKED_INSTITUTION_KEY = 'FRC';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private institutionSource = new BehaviorSubject<Institution>(new Institution(MOCKED_INSTITUTION_KEY));  // TODO. Stop Hardcoding the key
  public currentInstitution = this.institutionSource.asObservable();

  constructor(private http: HttpClient,
              private systemConfigService: SystemConfigService) {
  }


  getInstitution(): Observable<Institution> {
    const baseUrl = InstitutionService._getBaseUrl();
    const headers = this._getHeaders();

    const institutionKey = this.getCurrentInstitution().institutionKey;
    const params = new HttpParams()
      .set('institutionKey', institutionKey);

    return this.http.get(baseUrl + '/universy/institution', {headers, params})
      .map((institutions: Institutions) => {
          return institutions.institutions[FIRST_INSTITUTION_INDEX];
        }
      );
  }


  public setCurrentInstitution(institution: Institution) {
    this.institutionSource.next(institution);
  }

  public getCurrentInstitution(): Institution {
    let institution;
    this.institutionSource
      .subscribe((serviceInstitution) => institution = serviceInstitution);
    return institution;
  }

  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }
}
