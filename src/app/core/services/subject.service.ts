import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject.model';
import { ProgramService } from './program.service';
import { LocalStorageService } from './local-storage.service';
import { Program } from 'src/app/models/program.model';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { Endpoint } from 'src/app/models/endpoint.model';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { ModalService } from 'src/app/modals/modal.service';
import { SubjectReport } from 'src/app/models/subject-report.model';

const CURRENT_SUBJECT_KEY = 'current-subject';
const GET_SUBJECTS_ERROR = 'Ocurrió un error tratando de obtener las materias del plan';
const GET_SUBJECTS_REPORT_ERROR = 'Ocurrió un error tratando de obtener las estadisticas de la materia';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private endpoint = new Endpoint(EndpointName.SUBJECT, EndpointName.PROGRAMS);

  constructor(
    private crudEndpointService: CRUDEndpointsService,
    private notificationService: ModalService) {
  }

  addSubject(subject: Subject) {
    const parentId = this.getParentId();
    subject.codename = 'WEB';
    return this.crudEndpointService.createOnParent(parentId, this.endpoint, subject);
  }

  updateSubject(subject: Subject) {
    return this.crudEndpointService.update(this.endpoint, subject.id, subject);
  }

  getSubjectsByProgram(program: Program): Observable<Subject[]> {
    return this.crudEndpointService.getAllFromParent(program.id, this.endpoint);
  }

  getSubjects(): Observable<Subject[]> {
    try {
      const parentId = this.getParentId();

      return this.crudEndpointService.getAllFromParent(parentId, this.endpoint);
    } catch (e) {
      this.notificationService.showError(GET_SUBJECTS_ERROR);
    }
  }

  getSubjectReportById(subjectId): Observable<SubjectReport> {
    try {
      return this.crudEndpointService.getReport(this.endpoint, subjectId);
    } catch (e) {
      this.notificationService.showError(GET_SUBJECTS_REPORT_ERROR);
    }
  }

  getSubjectsName(): Observable<string[]> {
    return this.getSubjects().map((subjects) => {
      return subjects.map((subject: Subject) => subject.name);
    });
  }

  deleteSubject(subject: Subject) {
    return this.crudEndpointService.delete(this.endpoint, subject.id);
  }

  private getParentId(): string {
    return ProgramService.getCurrentProgram().id;
  }

  static getCurrentSubject(): Subject {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_SUBJECT_KEY) as Subject;
  }

  static setCurrentSubject(subject: Subject) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_SUBJECT_KEY, subject);
  }

  static sortSubjectsByLevel(subjects: Subject[]) {
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

}
