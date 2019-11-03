import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {Period} from '../../../../models/period.model';
import {Month, TimeService} from '../../../../core/services/time.service';

@Component({
  selector: 'app-period-modal',
  templateUrl: './period-modal.component.html',
  styleUrls: ['./period-modal.component.css']
})
export class PeriodModalComponent implements OnInit {
  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Input() period = new Period();

  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  months: Month[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForm();
    this.getListOfMonths();
  }

  private getListOfMonths() {
    this.months = TimeService.getListOfMonths();
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction(): void {
    if (this.form.valid) {
      this.period.beginMonth = this.beginMonth.value;
      this.period.endMonth = this.endMonth.value;
      this.confirmEvent.emit(this.period);
      this.activeModal.dismiss();
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      beginMonth: new FormControl(this.period.beginMonth, Validators.required),
      endMonth: new FormControl(this.period.endMonth, Validators.required)
    });
  }

  public get beginMonth(): FormControl {
    return this.form.get('beginMonth') as FormControl;
  }

  public get endMonth(): FormControl {
    return this.form.get('endMonth') as FormControl;
  }

}
