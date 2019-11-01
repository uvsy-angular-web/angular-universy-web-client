import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {EMPTY, merge, Observable} from 'rxjs';
import {FormSubmitDirective} from './form.directive';
import {ControlErrorComponent} from '../control-error/control-error.component';
import {FORM_ERRORS} from '../errors';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Directive({
  selector: '[appControlError]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  ref: ComponentRef<ControlErrorComponent>;
  submit$: Observable<Event>;
  @Input() customErrors = {};

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Inject(FORM_ERRORS) private errors,
    @Optional() @Host() private form: FormSubmitDirective,
    private controlDir: NgControl) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    merge(
      this.submit$,
      this.control.valueChanges
    ).pipe(
      untilDestroyed(this)).subscribe(() => {
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey];
        const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
        this.setError(text);
      } else if (this.ref) {
        this.setError(null);
      }
    });
  }

  get control() {
    return this.controlDir.control;
  }

  setError(errorMessage: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.vcr.createComponent(factory);
    }
    this.ref.instance.setErrorMessage(errorMessage);
  }

  ngOnDestroy() {
  }
}
