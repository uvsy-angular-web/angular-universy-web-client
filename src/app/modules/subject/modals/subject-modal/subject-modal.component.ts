import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Program} from '../../../../shared/models/program.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from '../../../../shared/models/subject.model';

@Component({
  selector: 'app-career-modal',
  templateUrl: './subject-modal.component.html',
  styleUrls: ['./subject-modal.component.css']
})
export class SubjectModalComponent implements OnInit {
  @Input() title: string;
  @Input() confirmButtonText: string;
  @Input() subject = new Subject();

  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  levels = [1, 2, 3, 4, 5];

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
      this.subject.name = this.name.value;
      this.subject.level = this.level.value;
      this.confirmEvent.emit(this.subject);
      this.activeModal.dismiss();
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(this.subject.name, SubjectModalComponent._getValidatorsForCareerName()),
      level: new FormControl(this.subject.level, Validators.required)
    });
  }

  public get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  public get level(): FormControl {
    return this.form.get('level') as FormControl;
  }

  private static _getValidatorsForCareerName(): Validators {
    return Validators.compose([
      Validators.maxLength(35),
      Validators.required
    ]);
  }

}
