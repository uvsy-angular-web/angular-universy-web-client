import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InformationModalComponent} from './components/error-modal/information-modal.component';
import {NameEditComponent} from './components/name-edit/name-edit.component';
import {ButtonText} from '../shared/enums/button-text.enum';
import {ConfirmActionModalComponent} from './components/confirm-action-modal/confirm-action-modal.component';

const DEFAULT_ERROR_TITLE = '¡Ocurrió un error!';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {
  }

  showError(errorMessage: string, title = DEFAULT_ERROR_TITLE) {
    const modalRef = this.modalService.open(InformationModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = errorMessage;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
  }

  inform(title: string, message: string) {
    const modalRef = this.modalService.open(InformationModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
  }

  openEditNameModal(title: string, confirmButtonText: ButtonText, itemText = '', maxLength = 45, removesPatternValidation = false) {
    const modalRef = this.modalService.open(NameEditComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.itemText = itemText;
    modalRef.componentInstance.maxLength = maxLength;
    modalRef.componentInstance.removesPatternValidation = removesPatternValidation;
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
