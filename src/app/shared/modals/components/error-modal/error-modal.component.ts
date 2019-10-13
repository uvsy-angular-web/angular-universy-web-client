import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../enums/button-text.enum';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  @Input() message: string;
  confirmationButtonText = ButtonText.Accept;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  public closeModal(): void {
    this.activeModal.dismiss();
  }
}
