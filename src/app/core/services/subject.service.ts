import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SystemConfigService} from './system/system-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {InstitutionService} from './institution.service';
import {Subject} from '../../shared/models/subject.model';
import {ProgramService} from './program.service';
import {CareerService} from './career.service';
const ENDPOINT_SUBJECTS = '/universy/institution/subjects'
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjectSource = new BehaviorSubject<Subject>(new Subject());
  public currentSubject = this.subjectSource.asObservable();

  constructor(private http: HttpClient,
              private systemConfigService: SystemConfigService,
              private programService: ProgramService,
              private careerService: CareerService) {
  }

  public setCurrentSubject(subject: Subject) {
    this.subjectSource.next(subject);
  }

  public getCurrentSubject(): Subject {
    let subject;
    this.currentSubject
      .subscribe((serviceCareer) => subject = serviceCareer);
    return subject;
  }

  public addSubject(subject: Subject) {
    const body = {
      programCode: this.programService.getCurrentProgam().uuid,
      name: subject.name,
      level: subject.level,
      correlatives: subject.correlatives ? subject.correlatives : [],
      careerKey: this.careerService.getCurrentCareer().careerKey,
    };
    const baseUrl = SubjectService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.put(baseUrl + ENDPOINT_SUBJECTS, body, {headers});
  }

  getSubjects(): Observable<Subject[]> {
    const baseUrl = SubjectService.getBaseUrl();
    const headers = this.getHeaders();

    const currentProgramCode = this.programService.getCurrentProgam().uuid;
    const params = new HttpParams()
      .set('programCode', currentProgramCode);

    return this.http.get(baseUrl + ENDPOINT_SUBJECTS, {headers, params})
      .map((data: any) => {
          return data.subjects;
        }
      );
  }

  deleteSubject(subject: Subject) {
    const baseUrl = SubjectService.getBaseUrl();
    const headers = this.getHeaders();
    const currentProgramCode = this.programService.getCurrentProgam().uuid;
    const params = new HttpParams()
      .set('programCode', currentProgramCode)
      .set('subjectCode', subject.subjectCode.toString());

    return this.http.delete(baseUrl + ENDPOINT_SUBJECTS, {headers, params});
  }

  private getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }
}
