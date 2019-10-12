import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Career} from '../../models/career.model';

@Component({
  selector: 'app-career-modal',
  templateUrl: './name-edit.component.html',
})
export class NameEditComponent implements OnInit {
  @Input() title: string;
  @Input() itemText: string;
  @Input() confirmButtonText: string;
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
      this.confirmEvent.emit(this.itemTextControl.value);
      this.activeModal.dismiss();
    }
  }

  private _createForm(): void {
    this.form = this.formBuilder.group({
      itemText: new FormControl(this.itemText, NameEditComponent._getValidatorsForCareerName())
    });
  }

  public get itemTextControl(): FormControl {
    return this.form.get('itemText') as FormControl;
  }

  private static _getValidatorsForCareerName(): Validators {
    return Validators.compose([Validators.maxLength(35), Validators.required]);
  }
}
