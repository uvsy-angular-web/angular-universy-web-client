import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './control-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./control-error.component.css']
})
export class ControlErrorComponent implements OnInit {
  message;
  hide = true;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  public setErrorMessage(message) {
    if (message !== this.message) {
      this.message = message;
      this.hide = !message;
      this.cdr.detectChanges();
    }
  }
}
