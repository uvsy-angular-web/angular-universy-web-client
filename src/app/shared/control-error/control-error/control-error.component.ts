import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl: './control-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./control-error.component.css']
})
export class ControlErrorComponent implements OnInit {
  message;
  hide = true;

  @Input() set text(value) {
    if (value !== this.message) {
      this.message = value;
      this.hide = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
