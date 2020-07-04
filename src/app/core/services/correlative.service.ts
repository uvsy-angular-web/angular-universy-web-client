import { Injectable } from '@angular/core';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { Endpoint } from 'src/app/models/endpoint.model';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from './subject.service';
import { Correlative } from 'src/app/models/correlative.model';
import { ModalService } from 'src/app/modals/modal.service';

const CURRENT_CORRELATIVES_KEY = 'current-correlatives';

@Injectable({
  providedIn: 'root'
})
export class CorrelativeService {
  private endpoint = new Endpoint(EndpointName.CORRELATIVES, EndpointName.SUBJECT);

  constructor(
    private crudEndpointService: CRUDEndpointsService,
    private notificationService: ModalService,
  ) { }

  getCorrelatives(subject: Subject) {
    const subjectId = subject ? subject.id : this.getSubjectId();

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

  updatesCorrelativeList(subject: Subject, newCorrelatives: Correlative[]) {
    try {
      const currentCorrelatives = this.getCorrelatives(subject);
      currentCorrelatives.forEach(
        (currentCorrelative) => this.deleteCorrelative(currentCorrelative)
      );
      newCorrelatives.forEach(
        (newCorrelative) => this.addCorrelative(newCorrelative)
      );
    } catch (e) {
      this.notificationService.showError('Ocurrió un error tratando de actualizar las correlativas');
    }
  }

  private getSubjectId(): string {
    const currentSubject = SubjectService.getCurrentSubject();
    return currentSubject.id;
  }

}
