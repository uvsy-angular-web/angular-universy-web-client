import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SystemConfigService} from './system/system-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject} from '../../shared/models/subject.model';
import {ProgramService} from './program.service';
import {CareerService} from './career.service';
import {LocalStorageService} from './local-storage.service';

const ENDPOINT_SUBJECTS = '/universy/institution/subjects';
const CURRENT_SUBJECT_KEY = 'current-subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient,
              private systemConfigService: SystemConfigService) {
  }

  public addSubject(subject: Subject) {
    const body = {
      programCode: ProgramService.getCurrentProgram().uuid,
      name: subject.name,
      level: subject.level,
      correlatives: subject.correlatives ? subject.correlatives : [],
      careerKey: CareerService.getCurrentCareer().careerKey,
    };
    const baseUrl = SubjectService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.put(baseUrl + ENDPOINT_SUBJECTS, body, {headers});
  }

  public updateSubject(subject: Subject) {
    const body = {
      subjectCode: subject.subjectCode,
      programCode: ProgramService.getCurrentProgram().uuid,
      name: subject.name,
      level: subject.level,
      correlatives: subject.correlatives ? subject.correlatives : [],
      careerKey: CareerService.getCurrentCareer().careerKey,
    };
    const baseUrl = SubjectService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.post(baseUrl + ENDPOINT_SUBJECTS, body, {headers});
  }

  getSubjects(): Observable<Subject[]> {
    const baseUrl = SubjectService.getBaseUrl();
    const headers = this.getHeaders();

    const currentProgramCode = ProgramService.getCurrentProgram().uuid;
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
    const currentProgramCode = ProgramService.getCurrentProgram().uuid;
    const params = new HttpParams()
      .set('programCode', currentProgramCode)
      .set('subjectCode', subject.subjectCode.toString());

    return this.http.delete(baseUrl + ENDPOINT_SUBJECTS, {headers, params});
  }

  private getHeaders() {
    return this.systemConfigService.getHeader();
  }

  public static sortSubjectsByLevel(subjects: Subject[]) {
    if (subjects) {
      subjects.sort(SubjectService.isSubjectLevelGreater);
    }
    return subjects;
  }

  private static isSubjectLevelGreater(subjectA: Subject, subjectB: Subject) {
    if (subjectA.level < subjectB.level) {
      return -1;
    }
    if (subjectA.level > subjectB.level) {
      return 1;
    }
    return 0;
  }

  private static getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }

  public static setCurrentSubject(subject: Subject) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_SUBJECT_KEY, subject);
  }

  public static getCurrentSubject(): Subject {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_SUBJECT_KEY) as Subject;
  }
}
