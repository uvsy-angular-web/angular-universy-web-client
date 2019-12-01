import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

const USERNAME_MAX_LENGHT = 15;
const PASSWORD_MAX_LENGHT = 8;

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: new FormControl(null, LogInComponent.getValidators(USERNAME_MAX_LENGHT)),
      password: new FormControl(null, LogInComponent.getValidators(PASSWORD_MAX_LENGHT))
    });
  }

  static getValidators(maxLength: number) {
    return Validators.compose([Validators.required, Validators.maxLength(maxLength)]);
  }
}
