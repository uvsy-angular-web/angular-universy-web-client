import {Injectable} from '@angular/core';
import {ProgramModalComponent} from './program-modal/program-modal.component';
import {Program} from '../../../shared/models/program.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../shared/enums/button-text.enum';

@Injectable({
  providedIn: 'root'
})
export class ProgramModalService {

  constructor(private modalService: NgbModal) {
  }

  public openEditProgramModal(title: string, confirmButtonText: ButtonText, program = new Program()) {
    const modalRef = this.modalService.open(ProgramModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.confirmButtonText = confirmButtonText;
    modalRef.componentInstance.program = program;
    return modalRef.componentInstance.confirmEvent;
  }

  public openConfirmPublishModal(title: string, confirmButtonText: ButtonText) {
    const modalRef = this.modalService.open(ProgramModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.confirmButtonText = confirmButtonText;
    return modalRef.componentInstance.confirmEvent;
  }


}
