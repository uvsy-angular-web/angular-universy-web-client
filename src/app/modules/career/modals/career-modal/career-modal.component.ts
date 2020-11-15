import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { ColSize } from '../../../../shared/enums/col-size.enum';
import { CareerService } from 'src/app/core/services/career.service';

@Component({
  selector: 'app-career-modal',
  templateUrl: './career-modal.component.html',
  styleUrls: ['./career-modal.component.css']
})
export class CareerModalComponent implements OnInit {
  @Input() title: string;
  @Input() careerName: string;
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
      this.confirmEvent.emit(this.careerNameControl.value);
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
      careerName: new FormControl(this.careerName, this.getValidatorsForCareerName())
    });
  }

  public get careerNameControl(): FormControl {
    return this.form.get('careerName') as FormControl;
  }

  private getValidatorsForCareerName(): Validators {
    return Validators.compose(
      [
        Validators.maxLength(45),
        Validators.required,
        Validators.pattern('^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+)*$')
      ]);
  }


}
