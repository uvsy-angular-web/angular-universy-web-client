import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-post-program-modal',
  templateUrl: './post-program-modal.component.html',
  styleUrls: ['./post-program-modal.component.css']
})
export class PostProgramModalComponent implements OnInit {

  @Input() title: string;
  
  constructor(
    public activeModal: NgbActiveModal) {
  }


  ngOnInit() {
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

}
