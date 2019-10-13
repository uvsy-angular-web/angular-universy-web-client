import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Program} from '../../../../shared/models/program.model';


@Component({
  selector: 'app-post-program-modal',
  templateUrl: './publish-program-modal.component.html',
  styleUrls: ['./publish-program-modal.component.css']
})
export class PublishProgramModalComponent implements OnInit {

  @Input() title: string;
  @Output() confirmEvent: EventEmitter<Program> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal) {
  }


  ngOnInit() {
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction() {
    this.confirmEvent.emit();
  }

}
