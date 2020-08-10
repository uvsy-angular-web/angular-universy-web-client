import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Program } from '../../../../models/program.model';
import { ButtonText } from '../../../../shared/enums/button-text.enum';

const REG_EX_CAREER_NAME = '^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+)*$';

const CAREER_NAME_MAX_LENGTH = 35;

const AMOUNT_VALIDATORS_MIN_VALUE = 0;
const AMOUNT_VALIDATORS_MAX_VALUE = 999;
const ZERO_AMOUNT_VALUE = 0;

const YEAR_FROM_MAX_LENGTH = 4;
const YEAR_FROM_MIN_YEAR = 1900;
const YEAR_FROM_MAX_YEAR = 2100;

const SHOW_YEAR_TO_INITIAL_VALUE = true;

@Component({
  selector: 'app-add-program-modal',
  templateUrl: './program-modal.component.html',
  styleUrls: ['./program-modal.component.css']
})
export class ProgramModalComponent implements OnInit {
  nameInputText = 'Nombre';
  setUndefinedYearToText = 'No especificar fin';
  yearFromInputText = 'Año de inicio';
  labelSeparator = '-';
  yearToInputText = 'Año de fin';
  yearToDefaultText = 'Indefinido';
  optativeQuestionText = '¿ Requiere materias optativas ?';
  requiresOptativesText = 'Si';
  doesNotRequiresOptativesText = 'No';
  showsOptativesErrorMessage = false;
  optativesErrorMessage = '* Debe ingresar al menos un campo en requerimientos.';
  amountOfHoursInputText = 'Cantidad de horas: ';
  amountOfPointsInputText = 'Cantidad de puntos: ';
  undefinedYearToText = 'Indefinido';
  showYearToInput = SHOW_YEAR_TO_INITIAL_VALUE;
  form: FormGroup;
  @Input() title: string;
  @Input() isProgramPublished = false;
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

  get yearTo(): FormControl {
    return this.form.get('yearTo') as FormControl;
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

  get setUndefinedYearTo(): FormControl {
    return this.form.get('setUndefinedYearTo') as FormControl;
  }

  private _isFormValid() {
    let areAmountsValid = true;

    const noAmountLoaded =
      this.hours.value === 0 &&
      this.points.value === 0;

    if (noAmountLoaded && this.requiresOptatives.value) {
      this.showsOptativesErrorMessage = true;
      areAmountsValid = false;
    }

    return areAmountsValid && this.form.valid;
  }

  private _updatesProgram() {
    this.program = this.program ? this.program : new Program();
    this.program.name = this.name.value;
    this.program.yearFrom = this.yearFrom.value;
    this.program.yearTo = this.yearTo.value;
    this._updatesOptativeRequirement();
  }

  private _updatesOptativeRequirement() {
    if (this.requiresOptatives.value) {
      this.program.hours = +this.hours.value;
      this.program.points = +this.points.value;
    } else {
      this.program.hours = ZERO_AMOUNT_VALUE;
    }
  }

  private _createForm(): void {
    const requiresOptatives =
      this.program.hours ||
      this.program.points;

    this.form = this.formBuilder.group({
      setUndefinedYearTo: new FormControl(!SHOW_YEAR_TO_INITIAL_VALUE),
      name: new FormControl(this.program.name, Validators.compose(ProgramModalComponent._getValidatorsForCareerName())),
      yearFrom: new FormControl(this.program.yearFrom, Validators.compose(ProgramModalComponent._getValidatorsForYearFrom())),
      yearTo: new FormControl(this.program.yearTo, Validators.compose(this._getValidatorsForYearTo())),
      requiresOptatives: new FormControl(requiresOptatives != null, Validators.required),
      hours: new FormControl(this.program.hours, Validators.compose(ProgramModalComponent._getAmountOfValidators())),
      points: new FormControl(this.program.points, Validators.compose(ProgramModalComponent._getAmountOfValidators()))
    });

    this.configureForm()
  }

  private configureForm() {
    this.yearFrom.valueChanges.subscribe(
      value => {
        this.yearTo.setValidators(
          this._getValidatorsForYearTo(value)
        );
        this.yearTo.updateValueAndValidity();
      }
    );

    this.setUndefinedYearTo.valueChanges.subscribe(
      value => {
        this.showYearToInput = value;
        this.yearTo.setValue(null);
      }
    );

    if (this.isProgramPublished) {
      this.name.disable();
      this.yearFrom.disable();
      this.requiresOptatives.disable();
      this.hours.disable();
      this.points.disable();
    }
  }

  private _getValidatorsForYearTo(minValue = YEAR_FROM_MIN_YEAR): ValidatorFn[] {
    return [
      Validators.min(minValue),
      Validators.max(YEAR_FROM_MAX_YEAR)
    ];
  }

  private static _getAmountOfValidators(): ValidatorFn[] {
    return [
      Validators.max(AMOUNT_VALIDATORS_MAX_VALUE),
      Validators.min(AMOUNT_VALIDATORS_MIN_VALUE),
    ];
  }

  private static _getValidatorsForCareerName(): ValidatorFn[] {
    return [
      Validators.maxLength(CAREER_NAME_MAX_LENGTH),
      Validators.required,
      Validators.pattern(REG_EX_CAREER_NAME)
    ];
  }

  private static _getValidatorsForYearFrom(): ValidatorFn[] {
    return [
      Validators.maxLength(YEAR_FROM_MAX_LENGTH),
      Validators.required,
      Validators.min(YEAR_FROM_MIN_YEAR),
      Validators.max(YEAR_FROM_MAX_YEAR)
    ];
  }

}
