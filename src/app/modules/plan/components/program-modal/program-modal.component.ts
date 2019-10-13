import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Program} from '../../../../shared/models/program.model';

const DEFAULT_DAY_INIT_FROM = '01';
const DEFAULT_MONTH_INIT_FROM = '01';


@Component({
  selector: 'app-add-program-modal',
  templateUrl: './program-modal.component.html',
  styleUrls: ['./program-modal.component.css']
})
export class ProgramModalComponent implements OnInit {

  @Input() title: string;
  @Input() itemText: string;
  @Input() program = new Program();
  @Output() confirmEvent: EventEmitter<Program> = new EventEmitter();
  form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this._createForm();
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

  private _createForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(this.itemText, ProgramModalComponent._getValidatorsForCareerName()),
      yearFrom: new FormControl(this.itemText, ProgramModalComponent._getValidatorsForYearFrom())
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
