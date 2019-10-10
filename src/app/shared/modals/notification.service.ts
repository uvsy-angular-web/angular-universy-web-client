import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';

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
}
