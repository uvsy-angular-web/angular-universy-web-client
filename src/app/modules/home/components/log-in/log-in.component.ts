import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { User } from '../../../../models/user.model';

const USERNAME_MAX_LENGHT = 150;
const PASSWORD_MAX_LENGHT = 25;

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService) {
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

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  login() {
    if (this.form.valid) {
      const username = this.username.value.toLowerCase();
      const password = this.password.value;
      const user = new User(username, password);
      this.authService.login(user);
    }
  }

  static getValidators(maxLength: number) {
    return Validators.compose([Validators.required, Validators.maxLength(maxLength)]);
  }
}
