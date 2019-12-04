import {InjectionToken} from '@angular/core';

const REG_EXP_ONLY_LETTERS = '^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]*$';
const REG_EXP_ONLY_LETTERS_AND_NUMBERS = '^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_]+)*$'
export const defaultErrors = {
  required: () => `El campo es requerido.`,
  pattern: ({requiredPattern}) => {
    if (requiredPattern === REG_EXP_ONLY_LETTERS) {
      return 'Ingresar solo letras';
    }
    else if (requiredPattern === REG_EXP_ONLY_LETTERS_AND_NUMBERS) {
      return 'Ingresar solo Letras y/o Números. No se acepta campo vacío.';
    }
  },
  minlength: ({requiredLength}) => `Como mínimo debe tener ${requiredLength}.`,
  maxlength: ({requiredLength}) => `No debe superar los ${requiredLength} caracteres.`,
  min: ({min}) => `El valor mínimo es ${min}.`,
  max: ({max}) => `El valor máximo es ${max}.`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
