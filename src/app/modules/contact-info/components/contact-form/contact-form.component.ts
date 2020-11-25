import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/core/services/email.service';
import { NavigationService } from 'src/app/core/services/system/navigation.service';
import { ModalService } from 'src/app/modals/modal.service';
import { REG_EXP_ONLY_LETTERS_AND_NUMBERS } from 'src/app/shared/control-error/errors';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailSender: EmailService,
    private notificationService: ModalService,
    private navigationService: NavigationService) {
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

  get institutionName(): FormControl {
    return this.form.get('institutionName') as FormControl;
  }

  get comment(): FormControl {
    return this.form.get('comment') as FormControl;
  }

  sendEmail() {
    if (this.form.valid) {
      const institutionEmail = this.institutionEmail.value.toLowerCase();
      const institutionName = this.institutionName.value;
      const comment = this.comment.value;
      this.emailSender.sendEmail(institutionName, institutionEmail, comment).then(
        () => {
          this.notificationService.inform(
            '¡Todo listo!',
            'En los próximos días te estaremos contactando con la información de tu cuenta. Gracias por confiar en nuestro equipo.',
          );
          this.navigationService.navigateToHomePage();
        }
      );
    }
  }

  static getValidators(maxLength: number) {
    return Validators.compose([Validators.required, Validators.maxLength(maxLength), Validators.email]);
  }
}
