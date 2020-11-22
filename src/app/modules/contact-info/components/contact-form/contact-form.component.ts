import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { REG_EXP_ONLY_LETTERS_AND_NUMBERS } from 'src/app/shared/control-error/errors';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      institutionEmail: new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(45),
          Validators.email])),
      institutionName: new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(45),
          Validators.pattern(REG_EXP_ONLY_LETTERS_AND_NUMBERS)])),
      comment: new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(REG_EXP_ONLY_LETTERS_AND_NUMBERS)]))
    });
  }

  get institutionEmail(): FormControl {
    return this.form.get('institutionEmail') as FormControl;
  }

  get comment(): FormControl {
    return this.form.get('comment') as FormControl;
  }

  sendEmail() {
    if (this.form.valid) {
      const institutionEmail = this.institutionEmail.value.toLowerCase();
      const comment = this.comment.value;
      alert('valid');
    }
  }

  static getValidators(maxLength: number) {
    return Validators.compose([Validators.required, Validators.maxLength(maxLength), Validators.email]);
  }
}
