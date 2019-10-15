import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonText} from '../../../enums/button-text.enum';
import {FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.css']
})
export class ConfirmActionModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() confirmationQuestion: string;
  @Input() confirmationButtonText: ButtonText;
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  public closeModal(): void {
    this.activeModal.dismiss();
  }

  public confirmAction() {
    this.confirmEvent.emit(true);
    this.activeModal.dismiss();
  }
  public cancelAction() {
    this.activeModal.dismiss();
  }

  public isDeleteModal() {
    return this.confirmationButtonText === ButtonText.Delete;
  }
}
