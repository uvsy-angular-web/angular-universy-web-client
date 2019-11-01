import {Injectable} from '@angular/core';
import {SubjectModalComponent} from './subject-modal/subject-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../shared/enums/button-text.enum';
import {SubjectCorrelativesComponent} from './subject-correlatives/subject-correlatives.component';
import {Correlative} from '../../../models/correlative.modal';
import {Subject} from '../../../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectModalService {

  constructor(private modalService: NgbModal) {
  }

  public openNewSubjectModal() {
    const modalRef = this.modalService.open(SubjectModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Agregar Materia';
    modalRef.componentInstance.confirmButtonText = ButtonText.Add;
    return modalRef.componentInstance.confirmEvent;
  }
  public openEditSubjectModal(subject: Subject) {
    const modalRef = this.modalService.open(SubjectModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Modificar Materia';
    modalRef.componentInstance.subject = subject;
    modalRef.componentInstance.confirmButtonText = ButtonText.Edit;
    return modalRef.componentInstance.confirmEvent;
  }

  public openSubjectCorrelatives(correlatives: Correlative[] = [], level: number) {
    const modalRef = this.modalService.open(SubjectCorrelativesComponent, {backdrop: 'static', size: 'lg'});
    modalRef.componentInstance.title = 'Administrar Correlativas';
    modalRef.componentInstance.level = level;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
    modalRef.componentInstance.correlatives = correlatives;
    return modalRef.componentInstance.confirmEvent;
  }
}
