import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-custom-toggle',
  templateUrl: './custom-toggle.component.html',
  styleUrls: ['./custom-toggle.component.css']
})
export class CustomToggleComponent implements OnInit {
  form: FormGroup;
  @Input() activated = true;
  @Output() toggleChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.setEmitActionsEvent();
  }

  private createForm() {
    this.form = this.fb.group({
      activate: new FormControl(this.activated)
    });
  }

  private get activate(): FormControl {
    return this.form.get('activate') as FormControl;
  }

  private setEmitActionsEvent() {
    this.activate.valueChanges.subscribe((value: boolean) => {
      this.toggleChanged.emit(value);
    });
  }
}
