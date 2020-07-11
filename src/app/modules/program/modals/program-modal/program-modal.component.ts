import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Program } from '../../../../models/program.model';
import { ButtonText } from '../../../../shared/enums/button-text.enum';

const DEFAULT_DAY_INIT_FROM = 1;
const DEFAULT_MONTH_INIT_FROM = 1;
const INIT_OF_YEAR_IN_STRING = 6;
const EMPTY_YEAR = '';
const REG_EX_CAREER_NAME = '^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+)*$';

const CAREER_NAME_MAX_LENGTH = 35;

const AMOUNT_VALIDATORS_MAX_LENGHT = 3;
const AMOUNT_VALIDATORS_MIN_VALUE = 0;
const AMOUNT_VALIDATORS_MAX_VALUE = 999;
const ZERO_AMOUNT_VALUE = 0;

const YEAR_FROM_MAX_LENGTH = 4;
const YEAR_FROM_MIN_YEAR = 1920;
const YEAR_FROM_MAX_YEAR = 2060;


@Component({
  selector: 'app-add-program-modal',
  templateUrl: './program-modal.component.html',
  styleUrls: ['./program-modal.component.css']
})
export class ProgramModalComponent implements OnInit {
  nameInputText = 'Nombre';
  yearFromInputText = 'Año de inicio';
  optativeQuestionText = '¿ Requiere materias optativas ?';
  requiresOptativesText = 'Si';
  doesNotRequiresOptativesText = 'No';
  showsOptativesErrorMessage = false;
  optativesErrorMessage = '* Debe ingresar al menos un campo en requerimientos.';
  amountOfHoursInputText = 'Cantidad de horas: ';
  amountOfPointsInputText = 'Cantidad de puntos: ';
  amountOfSubjectInputText = 'Cantidad de materias: ';
  form: FormGroup;
  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Input() program: Program = new Program();
  @Output() confirmEvent: EventEmitter<Program> = new EventEmitter();

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._createForm();
  }

  cancelAction(): void {
    this.activeModal.dismiss();
  }

  confirmAction(): void {
    if (this._isFormValid()) {
      this._updatesProgram();
      this.confirmEvent.emit(this.program);
      this.activeModal.dismiss();
    }
  }


  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get yearFrom(): FormControl {
    return this.form.get('yearFrom') as FormControl;
  }

  get requiresOptatives(): FormControl {
    return this.form.get('requiresOptatives') as FormControl;
  }

  get hours(): FormControl {
    return this.form.get('hours') as FormControl;
  }

  get points(): FormControl {
    return this.form.get('points') as FormControl;
  }

  get amountOfSubjects(): FormControl {
    return this.form.get('amountOfSubjects') as FormControl;
  }

  private _isFormValid() {
    return this._areAmountsValid() && this.form.valid;
  }

  private _areAmountsValid(): boolean {
    const atLeastOneAmountLoaded =
      this.hours.value > 0 ||
      this.points.value > 0 ||
      this.amountOfSubjects.value > 0;

    if (!atLeastOneAmountLoaded) {
      this.showsOptativesErrorMessage = true;
      return false;
    }

    return true;
  }

  private _updatesProgram() {
    this.program = this.program ? this.program : new Program();
    this.program.name = this.name.value;
    this.program.validFrom = this._getValidFromDate();
    this._updatesOptativeRequirement();
  }

  private _updatesOptativeRequirement() {
    if (this.requiresOptatives.value) {
      this.program.hours = +this.hours.value;
      this.program.points = +this.points.value;
      this.program.amountOfSubjects = +this.amountOfSubjects.value;
    } else {
      this.program.hours = ZERO_AMOUNT_VALUE;
      this.program.amountOfSubjects = ZERO_AMOUNT_VALUE;
      this.program.points = ZERO_AMOUNT_VALUE;
    }
  }

  private _getValidFromDate(): number {
    const date = new Date(this.yearFrom.value, DEFAULT_MONTH_INIT_FROM, DEFAULT_DAY_INIT_FROM);
    return date.getTime();
  }

  private _createForm(): void {
    const yearFrom = this.program.validFrom ? new Date(this.program.validFrom).getFullYear() : EMPTY_YEAR;

    const requiresOptatives =
      this.program.hours ||
      this.program.points ||
      this.program.amountOfSubjects;

    this.form = this.formBuilder.group({
      name: new FormControl(this.program.name, ProgramModalComponent._getValidatorsForCareerName()),
      yearFrom: new FormControl(yearFrom, ProgramModalComponent._getValidatorsForYearFrom()),
      requiresOptatives: new FormControl(requiresOptatives != null, Validators.required),
      hours: new FormControl(this.program.hours, ProgramModalComponent._getAmountOfValidators()),
      points: new FormControl(this.program.points, ProgramModalComponent._getAmountOfValidators()),
      amountOfSubjects: new FormControl(this.program.amountOfSubjects, ProgramModalComponent._getAmountOfValidators()),
    });
  }

  private static _getAmountOfValidators(): Validators {
    return Validators.compose([
      Validators.maxLength(AMOUNT_VALIDATORS_MAX_LENGHT),
      Validators.max(AMOUNT_VALIDATORS_MAX_VALUE),
      Validators.min(AMOUNT_VALIDATORS_MIN_VALUE),
    ]);
  }

  private static _getValidatorsForCareerName(): Validators {
    return Validators.compose([
      Validators.maxLength(CAREER_NAME_MAX_LENGTH),
      Validators.required,
      Validators.pattern(REG_EX_CAREER_NAME)
    ]);
  }

  private static _getValidatorsForYearFrom(): Validators {
    return Validators.compose(
      [
        Validators.maxLength(YEAR_FROM_MAX_LENGTH),
        Validators.required,
        Validators.min(YEAR_FROM_MIN_YEAR),
        Validators.max(YEAR_FROM_MAX_YEAR)
      ]);
  }

}
