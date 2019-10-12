import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  public closeModal(): void {
    this.activeModal.dismiss();
  }
}
