import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ButtonText} from '../../../shared/enums/button-text.enum';
import {ColSize} from '../../../shared/enums/col-size.enum';
import { CareerService } from 'src/app/core/services/career.service';
import { REG_EXP_ONLY_LETTERS_AND_NUMBERS } from 'src/app/shared/control-error/errors';

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
  @Input() maxLength: number;
  @Input() removesPatternValidation = false;
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;
  public similarCareers = [];

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private careerService: CareerService) {
  }

  public ngOnInit(): void {
    this.createForm();
    this.calculateColForInputSize();
  }

  calculateColForInputSize(): string {
    if (this.maxLength <= SMALL_SIZE_TEXT_LENGHT) {
      return ColSize.SMALL;
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
      itemText: new FormControl(this.itemText, this.getValidatorsForCareerName())
    });
  }

  public get itemTextControl(): FormControl {
    return this.form.get('itemText') as FormControl;
  }

  private  getValidatorsForCareerName(): Validators {
    const validations =[
      Validators.maxLength(this.maxLength),
      Validators.required,
    ]

    if(!this.removesPatternValidation){
      Validators.pattern(REG_EXP_ONLY_LETTERS_AND_NUMBERS)
    }

    return Validators.compose(validations);
  }
}
