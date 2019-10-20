import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ButtonText} from '../../../enums/button-text.enum';
import {ColSize} from '../../../enums/col-size.enum';
const SMALL_SIZE_TEXT_LENGHT = 15;
const MEDIUM_SIZE_TEXT_LENGHT = 25;
@Component({
  selector: 'app-career-modal',
  templateUrl: './name-edit.component.html',
})
export class NameEditComponent implements OnInit {
  @Input() title: string;
  @Input() itemText: string;
  @Input() confirmButtonText: ButtonText;
  @Input() maxLength;
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForm();
    this.calculateColForInputSize();
  }

  private calculateColForInputSize(): string {
    if (this.maxLength <= SMALL_SIZE_TEXT_LENGHT) {
      return  ColSize.SMALL;
    } else if (this.maxLength <= MEDIUM_SIZE_TEXT_LENGHT) {
      return ColSize.MEDIUM;
    } else {
      return ColSize.LARGE;
    }
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

  private createForm(): void {
    this.form = this.formBuilder.group({
      itemText: new FormControl(this.itemText, NameEditComponent._getValidatorsForCareerName())
    });
  }

  public get itemTextControl(): FormControl {
    return this.form.get('itemText') as FormControl;
  }

  private static _getValidatorsForCareerName(): Validators {
    return Validators.compose(
      [
        Validators.maxLength(35),
        Validators.required]);
  }
}
