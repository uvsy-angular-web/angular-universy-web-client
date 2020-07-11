import { Injectable } from '@angular/core';
import { SubjectModalComponent } from './subject-modal/subject-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonText } from '../../../shared/enums/button-text.enum';
import { SubjectCorrelativesComponent } from './subject-correlatives/subject-correlatives.component';
import { Subject } from '../../../models/subject.model';
import { Correlative } from '../../../models/correlative.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectModalService {

  constructor(private modalService: NgbModal) {
  }

  public openNewSubjectModal(isProgramPublished?: boolean) {
    const modalRef = this.modalService.open(SubjectModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = 'Agregar Materia';
    modalRef.componentInstance.isProgramPublished = isProgramPublished;
    modalRef.componentInstance.confirmButtonText = ButtonText.Add;
    return modalRef.componentInstance.confirmEvent;
  }

  public openEditSubjectModal(subject: Subject, isProgramPublished?: boolean) {
    const modalRef = this.modalService.open(SubjectModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = 'Modificar Materia';
    modalRef.componentInstance.subject = subject;
    modalRef.componentInstance.isProgramPublished = isProgramPublished;
    modalRef.componentInstance.confirmButtonText = ButtonText.Edit;
    return modalRef.componentInstance.confirmEvent;
  }

  public openModifySubjectCorrelatives(selectedSubject: Subject, correlatives: Correlative[]) {
    const modalRef = this.modalService.open(SubjectCorrelativesComponent, { backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.title = 'Administrar Correlativas';
    modalRef.componentInstance.subject = selectedSubject;
    modalRef.componentInstance.correlatives = correlatives;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
    return modalRef.componentInstance.confirmEvent;
  }

  public openViewSubjectCorrelatives(selectedSubject: Subject, correlatives: Correlative[]) {
    const modalRef = this.modalService.open(SubjectCorrelativesComponent, { backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.title = 'Ver Correlativas';
    modalRef.componentInstance.subject = selectedSubject;
    modalRef.componentInstance.correlatives = correlatives;
    modalRef.componentInstance.readOnly = true;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
    return modalRef.componentInstance.confirmEvent;
  }
}
