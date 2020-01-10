import {Injectable} from '@angular/core';
import {SystemConfigService} from './system/system-config.service';
import {HttpClient} from '@angular/common/http';
import {InstitutionService} from './institution.service';
import {LocalStorageService} from './local-storage.service';
import {Career} from '../../models/career.model';
import { SimilarWordService } from './validator/repeated-text.service';

const ENDPOINT_CAREERS = '/universy/institution/careers';
const CURRENT_CAREER_KEY = 'current-career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient,
              private systemConfigService: SystemConfigService,
              private similarWordService: SimilarWordService) {
  }

  updateCareer(career: Career) {
    const body = {
      institutionKey: InstitutionService.getCurrentInstitution().institutionKey,
      career
    };
    const baseUrl = CareerService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.post(baseUrl + ENDPOINT_CAREERS, body, {headers});
  }

  addCareer(careerName: string) {
    const body = {
      institutionKey: InstitutionService.getCurrentInstitution().institutionKey,
      careerName
    };
    const baseUrl = CareerService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.put(baseUrl + ENDPOINT_CAREERS, body, {headers});
  }

  public checkIfCarrerExist(careerName: string): string[] {
    const EMPTY_LIST = [];
    const currentInstitution = InstitutionService.getCurrentInstitution();

    if (currentInstitution && currentInstitution.careers) {
      const careerNames = currentInstitution.careers.map( (career: Career) => career.careerName);
      const similarCareerNames = this.similarWordService.getSimilarWords(careerNames, careerName);
      return similarCareerNames.length > 0 ? similarCareerNames : EMPTY_LIST;
    }

    return EMPTY_LIST;
  }

  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }

  public static setCurrentCareer(career: Career) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_CAREER_KEY, career);
  }

  public static getCurrentCareer(): Career {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_CAREER_KEY) as Career;
  }

}
