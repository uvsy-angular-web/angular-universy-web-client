import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './system/system-config.service';
import {Institution, Institutions} from '../../shared/models/career.model';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/map';
import {LocalStorageService} from './local-storage.service';

const FIRST_INSTITUTION_INDEX = 0;
const MOCKED_INSTITUTION_KEY = 'FRC';
const ENDPOINT_INSTITUTION = '/universy/institution';
const CURRENT_INSTITUTION_KEY = 'current-institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient,
              private systemConfigService: SystemConfigService) {
  }


  getInstitution(): Observable<Institution> {
    const baseUrl = InstitutionService._getBaseUrl();
    const headers = this._getHeaders();

    const institutionKey = InstitutionService.getCurrentInstitution().institutionKey;
    const params = new HttpParams()
      .set('institutionKey', institutionKey);

    return this.http.get(baseUrl + ENDPOINT_INSTITUTION, {headers, params})
      .map((institutions: Institutions) => {
          return institutions.institutions[FIRST_INSTITUTION_INDEX];
        }
      );
  }

  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }

  public static setCurrentInstitution(institution: Institution) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_INSTITUTION_KEY, institution);
  }

  public static getCurrentInstitution(): Institution {
    let institution = LocalStorageService.getObjectFromInLocalStorage(CURRENT_INSTITUTION_KEY) as Institution;
    if (!institution) {
      institution = this.getMockedInstitution(institution);
    }
    return institution;
  }

  private static getMockedInstitution(institution) {
    institution = new Institution();
    institution.institutionKey = MOCKED_INSTITUTION_KEY;
    InstitutionService.setCurrentInstitution(institution);
    return institution;
  }
}
