import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../enums/button-text.enum';

@Component({
  selector: 'app-error-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.css']
})
export class InformationModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() confirmButtonText: ButtonText;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  public closeModal(): void {
    this.activeModal.dismiss();
  }
}
