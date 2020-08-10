import { Injectable } from '@angular/core';
import { ProgramModalComponent } from './program-modal/program-modal.component';
import { Program } from '../../../models/program.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonText } from '../../../shared/enums/button-text.enum';
import { PublishProgramModalComponent } from './publish-program-modal/publish-program-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ProgramModalService {

  constructor(private modalService: NgbModal) {
  }

  public openEditProgramModal(program = new Program()) {
    const modalRef = this.modalService.open(ProgramModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = 'Editar plan';
    modalRef.componentInstance.isProgramPublished = program.active;
    modalRef.componentInstance.confirmButtonText = ButtonText.Edit;
    modalRef.componentInstance.program = program;
    return modalRef.componentInstance.confirmEvent;
  }

  public openConfirmPublishModal() {
    const modalRef = this.modalService.open(PublishProgramModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = 'Publicar Plan';
    modalRef.componentInstance.confirmButtonText = ButtonText.Publish;
    return modalRef.componentInstance.confirmEvent;
  }

  public openNewProgramModal() {
    const modalRef = this.modalService.open(ProgramModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = 'Agregar plan';
    modalRef.componentInstance.confirmButtonText = ButtonText.Add;
    modalRef.componentInstance.program = new Program();
    return modalRef.componentInstance.confirmEvent;
  }


}
