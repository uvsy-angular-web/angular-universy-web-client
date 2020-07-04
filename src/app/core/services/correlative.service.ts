import { Injectable } from '@angular/core';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { Endpoint } from 'src/app/models/endpoint.model';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from './subject.service';
import { Correlative } from 'src/app/models/correlative.model';

const CURRENT_PROGRAM_KEY = 'current-program';

@Injectable({
  providedIn: 'root'
})
export class CorrelativeService {
  private endpoint = new Endpoint(EndpointName.CORRELATIVES, EndpointName.SUBJECT);

  constructor(
    private crudEndpointService: CRUDEndpointsService) {
  }

  getCorrelatives(subject: Subject) {
    const subjectId = this.getSubjectId();

    return this.crudEndpointService.getAllFromParent(subjectId, this.endpoint);
  }

  updateCorrelative(correlative: Correlative) {
    return this.crudEndpointService.update(this.endpoint, correlative.id, correlative);
  }

  deleteCorrelative(correlative: Correlative) {
    return this.crudEndpointService.delete(this.endpoint, correlative.id);
  }

  addCorrelative(correlative: Correlative) {
    const parentId = this.getSubjectId();

    return this.crudEndpointService.createOnParent(parentId, this.endpoint, correlative);
  }


  private getSubjectId(): string {
    const currentSubject = SubjectService.getCurrentSubject();
    return currentSubject.id;
  }

}
