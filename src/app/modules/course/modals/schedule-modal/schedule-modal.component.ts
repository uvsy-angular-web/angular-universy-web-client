import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {Schedule} from '../../../../models/period.model';
import {TimeService} from '../../../../core/services/time.service';
import {ComboBoxItem} from '../../../../shared/models/combo-box.model';

@Component({
  selector: 'app-period-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css']
})
export class ScheduleModalComponent implements OnInit {
  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Input() schedule = new Schedule();

  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  days: ComboBoxItem[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForm();
    this.getListOfDays();
  }

  private getListOfDays() {
    this.days = TimeService.getListOfDays();
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction(): void {
    if (this.form.valid) {
      this.schedule.beginTime = TimeService.getTimeNumber(this.beginTime.value);
      this.schedule.endTime = TimeService.getTimeNumber(this.endTime.value);
      this.schedule.classroom = this.classroom.value;
      this.schedule.dayOfWeek = this.dayOfWeek.value;
      this.confirmEvent.emit(this.schedule);
      this.activeModal.dismiss();
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      beginTime: new FormControl(TimeService.getTime(this.schedule.beginTime), Validators.required),
      endTime: new FormControl(TimeService.getTime(this.schedule.endTime), Validators.required),
      dayOfWeek: new FormControl(this.schedule.dayOfWeek, Validators.required),
      classroom: new FormControl(this.schedule.classroom, Validators.required)
    });
  }

  public get beginTime(): FormControl {
    return this.form.get('beginTime') as FormControl;
  }

  public get endTime(): FormControl {
    return this.form.get('endTime') as FormControl;
  }

  public get dayOfWeek(): FormControl {
    return this.form.get('dayOfWeek') as FormControl;
  }

  public get classroom(): FormControl {
    return this.form.get('classroom') as FormControl;
  }

}
