import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Professor} from '../../../../models/professor.model';

const MAX_LENGTH = 55;

@Component({
  selector: 'app-professor-modal',
  templateUrl: './professor-modal.component.html',
  styleUrls: ['./professor-modal.component.css']
})
export class ProfessorModalComponent implements OnInit {
  @Input() title: string;
  @Input() professor = new Professor();
  @Input() confirmButtonText: ButtonText;
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction(): void {
    if (this.form.valid) {
      this.professor.name = this.name.value;
      this.professor.lastName = this.lastName.value;
      this.confirmEvent.emit(this.professor);
      this.activeModal.dismiss();
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(this.professor.name, ProfessorModalComponent.getValidators()),
      lastName: new FormControl(this.professor.lastName, ProfessorModalComponent.getValidators())
    });
  }

  public get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  public get lastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  private static getValidators(): Validators {
    return Validators.compose(
      [
        Validators.maxLength(MAX_LENGTH),
        Validators.required,
        Validators.pattern('^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]*$')]);
  }
}
