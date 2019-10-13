import {Injectable} from '@angular/core';
import {SubjectModalComponent} from './subject-modal/subject-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../shared/enums/button-text.enum';

@Injectable({
  providedIn: 'root'
})
export class SubjectModalService {

  constructor(private modalService: NgbModal) {
  }

  public openNewSubjectModal() {
    const modalRef = this.modalService.open(SubjectModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Agregar carrera';
    modalRef.componentInstance.confirmButtonText = ButtonText.Confirm;
    return modalRef.componentInstance.confirmEvent;
  }
}
