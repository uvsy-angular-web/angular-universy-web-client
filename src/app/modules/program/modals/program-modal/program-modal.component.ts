import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Program} from '../../../../shared/models/program.model';
import {ButtonText} from '../../../../shared/enums/button-text.enum';

const DEFAULT_DAY_INIT_FROM = '01';
const DEFAULT_MONTH_INIT_FROM = '01';
const INIT_OF_YEAR_IN_STRING = 6;
const EMPTY_YEAR = '';


@Component({
  selector: 'app-add-program-modal',
  templateUrl: './program-modal.component.html',
  styleUrls: ['./program-modal.component.css']
})
export class ProgramModalComponent implements OnInit {

  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Input() program: Program;
  @Output() confirmEvent: EventEmitter<Program> = new EventEmitter();
  form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction(): void {
    if (this.form.valid) {
      this.program.name = this.name.value;
      this.program.validFrom = this.getValidFromDate();
      this.confirmEvent.emit(this.program);
      this.activeModal.dismiss();
    }
  }

  private getValidFromDate() {
    return `${DEFAULT_DAY_INIT_FROM}/${DEFAULT_MONTH_INIT_FROM}/${this.yearFrom.value}`;
  }

  private createForm(): void {
    const yearFrom = this.program.validFrom ? this.program.validFrom.substring(INIT_OF_YEAR_IN_STRING) : EMPTY_YEAR;
    this.form = this.formBuilder.group({
      name: new FormControl(this.program.name, ProgramModalComponent._getValidatorsForCareerName()),
      yearFrom: new FormControl(yearFrom, ProgramModalComponent._getValidatorsForYearFrom())
    });
  }

  public get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  public get yearFrom(): FormControl {
    return this.form.get('yearFrom') as FormControl;
  }

  private static _getValidatorsForCareerName(): Validators {
    return Validators.compose([
      Validators.maxLength(35),
      Validators.required
    ]);
  }

  private static _getValidatorsForYearFrom(): Validators {
    const currentYear = new Date().getFullYear();
    return Validators.compose(
      [
        Validators.maxLength(4),
        Validators.required,
        Validators.min(1920),
        Validators.max(currentYear)
      ]);
  }
}
