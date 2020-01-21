import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from '../../../../models/subject.model';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-career-modal',
  templateUrl: './subject-modal.component.html',
  styleUrls: ['./subject-modal.component.css']
})
export class SubjectModalComponent implements OnInit {
  @Input() title: string;
  @Input() confirmButtonText: ButtonText;
  @Input() subject = new Subject();

  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  levels = [1, 2, 3, 4, 5];
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

    if (this.form.valid) {
      this.subject.name = this.name.value;
      this.subject.level = this.level.value;
      this.confirmEvent.emit(this.subject);
      this.activeModal.dismiss();
    }
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
      Validators.maxLength(50),
      Validators.required,
      Validators.pattern('^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+)*$')
    ]);
  }

}
