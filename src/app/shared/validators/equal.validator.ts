import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function equalValidator(controlToCompareName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlToCompare = control.root.get(controlToCompareName);
    const isEqual =
      controlToCompare && controlToCompare.value === control.value;
    return !isEqual ? { equal: true, value: control.value } : null;
  };
}
