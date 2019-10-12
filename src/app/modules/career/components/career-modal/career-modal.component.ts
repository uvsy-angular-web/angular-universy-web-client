import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Career} from '../../../../shared/models/career.model';

@Component({
  selector: 'app-career-modal',
  templateUrl: './career-modal.component.html',
})
export class CareerModalComponent implements OnInit {
  @Input() title;
  @Input() career = new Career();
  @Input() confirmButtonText;
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this._createForm();
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction(): void {
    if (this.form.valid) {
      this.career.careerName = this.careerName.value;
      this.confirmEvent.emit(this.career);
      this.activeModal.dismiss();
    }
  }

  private _createForm(): void {
    this.form = this.formBuilder.group({
      careerName: new FormControl(this.career.careerName, CareerModalComponent._getValidatorsForCareerName())
    });
  }

  public get careerName(): FormControl {
    return this.form.get('careerName') as FormControl;
  }

  private static _getValidatorsForCareerName(): Validators {
    return Validators.compose([Validators.maxLength(35), Validators.required]);
  }
}
