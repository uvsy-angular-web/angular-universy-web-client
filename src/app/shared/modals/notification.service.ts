import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';
import {NameEditComponent} from './components/name-edit/name-edit.component';
import {ButtonText} from '../enums/button-text.enum';
import {ConfirmActionModalComponent} from './components/confirm-action-modal/confirm-action-modal.component';

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

  openEditNameModal(title: string, confirmButtonText: ButtonText, itemText = '', maxLength = 45) {
    const modalRef = this.modalService.open(NameEditComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.itemText = itemText;
    modalRef.componentInstance.maxLength = maxLength;
    modalRef.componentInstance.confirmButtonText = confirmButtonText;
    return modalRef.componentInstance.confirmEvent;
  }

  openConfirmModal(title: string, message = '', confirmationQuestion = '', confirmationButtonText: ButtonText) {
    const modalRef = this.modalService.open(ConfirmActionModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.confirmationQuestion = confirmationQuestion;
    modalRef.componentInstance.confirmationButtonText = confirmationButtonText;
    return modalRef.componentInstance.confirmEvent;
  }

}
