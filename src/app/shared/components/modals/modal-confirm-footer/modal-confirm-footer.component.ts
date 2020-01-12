import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ButtonText } from 'src/app/shared/enums/button-text.enum';

@Component({
  selector: 'app-modal-confirm-footer',
  templateUrl: './modal-confirm-footer.component.html',
  styleUrls: ['./modal-confirm-footer.component.css']
})
export class ModalConfirmFooterComponent implements OnInit {

  @Input() confirmButtonText: ButtonText;

  @Output() cancelAction = new EventEmitter();
  @Output() confirmAction = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onConfirmAction() {
    this.confirmAction.next();
  }

  onCancelAction() {
    this.confirmAction.next();
  }
}
