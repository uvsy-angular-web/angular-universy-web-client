import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {ColSize} from '../../../../shared/enums/col-size.enum';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent implements OnInit {
  @Input() title: string;
  @Input() itemText: string;
  @Input() confirmButtonText: ButtonText;
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  
  public ngOnInit(): void {
    this.createForm();
    this.calculateColForInputSize();
  }

  private calculateColForInputSize(): string {
    return ColSize.MEDIUM;
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction(): void {
    if (this.form.valid) {
      this.confirmEvent.emit(this.itemTextControl.value);
      this.activeModal.dismiss();
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
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+)*$')
      ]);
  }

}
