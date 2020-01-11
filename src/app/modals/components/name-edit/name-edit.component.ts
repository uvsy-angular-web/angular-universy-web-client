import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ButtonText} from '../../../shared/enums/button-text.enum';
import {ColSize} from '../../../shared/enums/col-size.enum';
import { CareerService } from 'src/app/core/services/career.service';

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
  public similarCareers = [];

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private careerService: CareerService) {
  }

  public ngOnInit(): void {
    this.createForm();
    this.calculateColForInputSize();
  }

  private calculateColForInputSize(): string {
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
      // TODO: remove this once you pull from master
      this.similarCareers = this.careerService.checkIfCarrerExist(this.itemTextControl.value);
      if (this.similarCareers.length === 0) {
         this.confirmEvent.emit(this.itemTextControl.value);
         this.activeModal.dismiss();
      }
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
    return Validators.compose(
      [
        Validators.maxLength(this.maxLength),
        Validators.required,
        Validators.pattern('^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+)*$')
      ]);
  }
}
