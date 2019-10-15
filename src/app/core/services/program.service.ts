import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Career, Institution, Institutions} from '../../shared/models/career.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SystemConfigService} from './config/system-config.service';
import {Program} from '../../shared/models/program.model';
import {CareerService} from './career.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private programSource = new BehaviorSubject<Program>(new Program());  // TODO. Stop Hardcoding the key
  public currentProgram = this.programSource.asObservable();

  constructor(private http: HttpClient,
              private careerService: CareerService,
              private systemConfigService: SystemConfigService) {
  }


  public setCurrentProgam(program: Program) {
    this.programSource.next(program);
  }

  public getCurrentProgam(): Program {
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
    return this.http.put(baseUrl + '/universy/institution/programs', body, {headers});
  }

  public getPrograms(): Observable<Program[]> {
    const baseUrl = SystemConfigService.getBaseUrl();
    const headers = this.systemConfigService.getHeader();
    const currentCareerKey = this.careerService.getCurrentCareer().careerKey;
    const params = new HttpParams()
      .set('institutionKey', currentCareerKey.institutionKey)
      .set('careerCode', currentCareerKey.careerCode);
    return this.http.get(baseUrl + '/universy/institution/programs', {headers, params})
      .map((data: any) => {
          return data.programs;
        }
      );
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
    return this.http.put(baseUrl + '/universy/institution/programs', body, {headers});
  }

  public publishProgram(program: Program) {
    const body = {
      careerKey: this.careerService.getCurrentCareer().careerKey,
      uuid: program.uuid,
    };
    const baseUrl = ProgramService._getBaseUrl();
    const headers = this._getHeaders();
    return this.http.post(baseUrl + '/universy/institution/programs/publish', body, {headers});
  }

  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }
}
