import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from '../../../../models/subject.model';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { SubjectService } from 'src/app/core/services/subject.service';
import { AVAIABLE_LEVELS } from 'src/app/models/level';
import { REG_EXP_ONLY_LETTERS_AND_NUMBERS } from 'src/app/shared/control-error/errors';
const AMOUNT_VALIDATORS_MAX_LENGHT = 3;
const AMOUNT_VALIDATORS_MIN_VALUE = 0;
const AMOUNT_VALIDATORS_MAX_VALUE = 999;

@Component({
  selector: 'app-career-modal',
  templateUrl: './subject-modal.component.html',
  styleUrls: ['./subject-modal.component.css']
})
export class SubjectModalComponent implements OnInit {
  optativeQuestionText = '¿ Es Optativa ?';
  isOptativeText = 'Si';
  isNotOptativeText = 'No';
  showsOptativesErrorMessage = false;
  optativesErrorMessage = '* Debe ingresar al menos un campo en requerimientos.';
  hoursInputText = 'Cantidad de horas: ';
  pointsInputText = 'Cantidad de puntos: ';
  @Input() isProgramPublished = false;
  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Input() subject = new Subject();

  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  levels = AVAIABLE_LEVELS;
  subjectsName: string[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService) {
  }

  public ngOnInit(): void {
    this.createForm();
    this.getSubjectNames();
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction(): void {
    if (this._isFormValid()) {
      const newSubject = this._createSubject();
      this.confirmEvent.emit(newSubject);
      this.activeModal.dismiss();
    }
  }

  private _isFormValid(): boolean {
    return this.form.valid && this._areAmountsValid();
  }

  private _areAmountsValid(): boolean {
    if (this.isOptative.value) {
      const atLeastOneAmountLoaded = this.hours.value !== 0 || this.points.value !== 0;

      this.showsOptativesErrorMessage = !atLeastOneAmountLoaded;
      return atLeastOneAmountLoaded;
    } else {
      return true;
    }
  }

  private _createSubject(): Subject {
    const newSubject: Subject = { ...this.subject };
    newSubject.name = this.name.value;
    newSubject.level = this.level.value;
    newSubject.optative = this.isOptative.value;
    if (newSubject.optative) {
      newSubject.hours = this.hours.value;
      newSubject.points = this.points.value;
    }
    return newSubject;
  }

  public getSubjectNames(): void {
    this.subjectService.getSubjectsName().subscribe(
      (names) => {
        this.subjectsName = names;
      }
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(this.subject.name, SubjectModalComponent._getValidatorsForCareerName()),
      level: new FormControl(this.subject.level, Validators.required),
      isOptative: new FormControl(this.subject.optative === true, Validators.required),
      hours: new FormControl(this.subject.hours, SubjectModalComponent._getAmountOfValidators()),
      points: new FormControl(this.subject.points, SubjectModalComponent._getAmountOfValidators()),
    });

    if (this.isProgramPublished) {
      this.isOptative.setValue(true);
      this.isOptative.disable();
    }
  }

  private static _getAmountOfValidators(): Validators {
    return Validators.compose([
      Validators.maxLength(AMOUNT_VALIDATORS_MAX_LENGHT),
      Validators.min(AMOUNT_VALIDATORS_MIN_VALUE),
      Validators.max(AMOUNT_VALIDATORS_MAX_VALUE),
    ]);
  }

  public get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get level(): FormControl {
    return this.form.get('level') as FormControl;
  }

  get isOptative(): FormControl {
    return this.form.get('isOptative') as FormControl;
  }

  get hours(): FormControl {
    return this.form.get('hours') as FormControl;
  }

  get points(): FormControl {
    return this.form.get('points') as FormControl;
  }

  private static _getValidatorsForCareerName(): Validators {
    return Validators.compose([
      Validators.maxLength(50),
      Validators.required,
      Validators.pattern(REG_EXP_ONLY_LETTERS_AND_NUMBERS)
    ]);
  }

}
