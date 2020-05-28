import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SystemConfigService } from './system/system-config.service';
import { Program } from '../../models/program.model';
import { CareerService } from './career.service';
import { LocalStorageService } from './local-storage.service';
import { Career } from 'src/app/models/career.model';

const ENDPOINT_PROGRAMS = '/universy/institution/programs';
const ENDPOINT_PROGRAMS_PUBLISH = ENDPOINT_PROGRAMS + '/publish';
const CURRENT_PROGRAM_KEY = 'current-program';
const INTITUTION_KEY = 'institutionKey';
const CAREER_CODE = 'careerCode';
const UUID = 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(
    private http: HttpClient,
    private systemConfigService: SystemConfigService) {
  }


  public addProgram(program: Program) {
    const body = { ...program };
    body.careerKey = CareerService.getCurrentCareer().careerKey;

    const baseUrl = ProgramService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.put(baseUrl + ENDPOINT_PROGRAMS, body, { headers });
  }

  public getPrograms(): Observable<Program[]> {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const currentCareerKey = CareerService.getCurrentCareer().careerKey;
    const params = new HttpParams()
      .set(INTITUTION_KEY, currentCareerKey.institutionKey)
      .set(CAREER_CODE, currentCareerKey.careerCode);
    return this.http.get(baseUrl + ENDPOINT_PROGRAMS, { headers, params })
      .map((data: any) => {
        return data.programs;
      }
      );
  }

  public getProgramsByCareer(career: Career): Observable<Program[]> {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const params = new HttpParams()
      .set(INTITUTION_KEY, career.careerKey.institutionKey)
      .set(CAREER_CODE, career.careerKey.careerCode);
    return this.http.get(baseUrl + ENDPOINT_PROGRAMS, { headers, params })
      .map((data: any) => {
        return data.programs;
      }
      );
  }

  public deleteProgram(program: Program) {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const currentCareerKey = CareerService.getCurrentCareer().careerKey;
    const params = new HttpParams()
      .set(INTITUTION_KEY, currentCareerKey.institutionKey)
      .set(CAREER_CODE, currentCareerKey.careerCode)
      .set(UUID, program.uuid);
    return this.http.delete(baseUrl + ENDPOINT_PROGRAMS, { headers, params });
  }

  public updateProgram(program: Program) {
    const body = { ...program };
    body.careerKey = CareerService.getCurrentCareer().careerKey;

    const baseUrl = ProgramService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.post(baseUrl + ENDPOINT_PROGRAMS, body, { headers });
  }

  public publishProgram(program: Program) {
    const body = {
      careerKey: CareerService.getCurrentCareer().careerKey,
      uuid: program.uuid,
    };
    const baseUrl = ProgramService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.post(baseUrl + ENDPOINT_PROGRAMS_PUBLISH, body, { headers });
  }

  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }


  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }

  public static setCurrentProgram(program: Program) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_PROGRAM_KEY, program);
  }

  public static getCurrentProgram(): Program {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_PROGRAM_KEY) as Program;
  }
}
