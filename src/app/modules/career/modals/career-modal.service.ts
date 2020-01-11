import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InformationModalComponent} from '../../../modals/components/error-modal/information-modal.component'
import {CareerModalComponent} from './career-modal/career-modal.component';
import {ButtonText} from '../../../shared/enums/button-text.enum';
import {ConfirmActionModalComponent} from '../../../modals/components/confirm-action-modal/confirm-action-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CareerModalService {

  constructor(private modalService: NgbModal) {
  }

  showError(errorMessage: string) {
    const modalRef = this.modalService.open(InformationModalComponent);
    modalRef.componentInstance.title = '¡Ocurrió un error!';
    modalRef.componentInstance.message = errorMessage;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
  }

  inform(title: string, message: string) {
    const modalRef = this.modalService.open(InformationModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
  }

  openEditCareerNameModal(title: string, confirmButtonText: ButtonText, itemText = '') {
    const modalRef = this.modalService.open(CareerModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.itemText = itemText;
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
