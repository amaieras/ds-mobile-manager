import {AbstractControl, ValidatorFn} from "@angular/forms";

export function phoneNumberValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenPhone': {value: control.value}} : null;
  };
}
