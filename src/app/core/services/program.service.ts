import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './system/system-config.service';
import {Program} from '../../models/program.model';
import {CareerService} from './career.service';

const ENDPOINT_PROGRAMS = '/universy/institution/programs';
const ENDPOINT_PROGRAMS_PUBLISH = ENDPOINT_PROGRAMS + '/publish';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private programSource = new BehaviorSubject<Program>(new Program());
  public currentProgram = this.programSource.asObservable();

  constructor(private http: HttpClient,
              private careerService: CareerService,
              private systemConfigService: SystemConfigService) {
  }


  public setCurrentProgram(program: Program) {
    this.programSource.next(program);
  }

  public getCurrentProgram(): Program {
    let program;
    this.currentProgram
      .subscribe((serviceProgram) => program = serviceProgram);
    return program;
  }

  public addProgram(program: Program) {
    const body = {
      careerKey: this.careerService.getCurrentCareer().careerKey,
      name: program.name,
      validFrom: program.validFrom
    };
    const baseUrl = ProgramService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.put(baseUrl + ENDPOINT_PROGRAMS, body, {headers});
  }

  public getPrograms(): Observable<Program[]> {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const currentCareerKey = this.careerService.getCurrentCareer().careerKey;
    const params = new HttpParams()
      .set('institutionKey', currentCareerKey.institutionKey)
      .set('careerCode', currentCareerKey.careerCode);
    return this.http.get(baseUrl + ENDPOINT_PROGRAMS, {headers, params})
      .map((data: any) => {
          return data.programs;
        }
      );
  }

  public deleteProgram(program: Program) {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const currentCareerKey = this.careerService.getCurrentCareer().careerKey;
    const params = new HttpParams()
      .set('institutionKey', currentCareerKey.institutionKey)
      .set('careerCode', currentCareerKey.careerCode)
      .set('uuid', program.uuid);
    return this.http.delete(baseUrl + ENDPOINT_PROGRAMS, {headers, params});
  }

  public updateProgram(program: Program) {
    const body = {
      careerKey: this.careerService.getCurrentCareer().careerKey,
      uuid: program.uuid,
      name: program.name,
      validFrom: program.validFrom
    };
    const baseUrl = ProgramService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.post(baseUrl + ENDPOINT_PROGRAMS, body, {headers});
  }

  public publishProgram(program: Program) {
    const body = {
      careerKey: this.careerService.getCurrentCareer().careerKey,
      uuid: program.uuid,
    };
    const baseUrl = ProgramService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.post(baseUrl + ENDPOINT_PROGRAMS_PUBLISH, body, {headers});
  }

  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }
}
