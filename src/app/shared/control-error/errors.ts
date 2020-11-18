import {InjectionToken} from '@angular/core';

export const REG_EXP_ONLY_NUMBERS = '^[0-9]*$';
export const REG_EXP_ONLY_UPPERCASE_LETTERS = '^[A-Z]*$';
export const REG_EXP_ONLY_LETTERS = '^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0_/*.:-]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0_/*.:-]+)*$';
export const REG_EXP_ONLY_LETTERS_AND_NUMBERS = '^[a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_/*.:-]+( [a-zA-ZzÑñÁáÉéÍíÓóÚúÜü0-9_/*.:-]+)*$'

export const defaultErrors = {
  required: () => `El campo es requerido.`,
  pattern: ({requiredPattern}) => {
    if (requiredPattern === REG_EXP_ONLY_UPPERCASE_LETTERS) {
      return 'Ingresar solo letras en mayúscula.';
    } else if (requiredPattern === REG_EXP_ONLY_LETTERS) {
      return 'Ingresar solo caracteres válidos';
    } else if (requiredPattern === REG_EXP_ONLY_NUMBERS) {
      return 'Ingresar solo números';
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
