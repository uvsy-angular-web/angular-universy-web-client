import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { ColSize } from '../../../../shared/enums/col-size.enum';
import { CareerService } from 'src/app/core/services/career.service';
import { Career } from 'src/app/models/career.model';

@Component({
  selector: 'app-career-modal',
  templateUrl: './career-modal.component.html',
  styleUrls: ['./career-modal.component.css']
})
export class CareerModalComponent implements OnInit {
  @Input() title: string;
  @Input() career: Career = new Career();
  @Input() confirmButtonText: ButtonText;
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  careerNames: string[];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private careerService: CareerService) {
  }


  public ngOnInit(): void {
    this.createForm();
    this.calculateColForInputSize();
    this.getCareerNames();
  }

  calculateColForInputSize(): string {
    return ColSize.MEDIUM;
  }

  public cancelAction(): void {
    this.activeModal.dismiss();
  }

  public confirmAction(): void {
    if (this.form.valid) {
      this.career.name = this.careerNameControl.value
      this.career.codename = this.codenameControl.value
      this.confirmEvent.emit(this.career);
      this.activeModal.dismiss();
    }
  }

  private getCareerNames() {
    this.careerService.getCareersNames().subscribe(
      (careerNames: string[]) => this.careerNames = careerNames
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      careerName: new FormControl(this.career.name, this.getValidatorsForCareerName()),
      codename: new FormControl(this.career.codename, this.getValidatorsForCodeName())
    });
  }

  public get careerNameControl(): FormControl {
    return this.form.get('careerName') as FormControl;
  }

  public get codenameControl(): FormControl {
    return this.form.get('codename') as FormControl;
  }

  private getValidatorsForCareerName(): Validators {
    return Validators.compose(
      [
        Validators.maxLength(45),
        Validators.required,
        Validators.pattern('^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+)*$')
      ]);
  }
  private getValidatorsForCodeName(): Validators {
    return Validators.compose(
      [
        Validators.maxLength(3),
        Validators.required,
      ]);
  }


}
