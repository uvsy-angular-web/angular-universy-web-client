import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';
import {NameEditComponent} from './name-edit/name-edit.component';
import {Career} from '../models/career.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private modalService: NgbModal) {
  }

  showError(errorMessage: string) {
    const modalRef = this.modalService.open(ErrorModalComponent);
    modalRef.componentInstance.message = errorMessage;
  }

  openEditNameModal(title: string, confirmButtonText: string, itemText = '') {
    const modalRef = this.modalService.open(NameEditComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.confirmButtonText = confirmButtonText;
    modalRef.componentInstance.itemText = itemText;
    return modalRef.componentInstance.confirmEvent;
  }
}
