/** Input price cannot be a string */
import {AbstractControl, ValidatorFn} from "@angular/forms";

export function forbiddenStringInput(priceRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = priceRe.test(control.value);
    return forbidden ? {'forbiddenStringInput': {value: control.value}} : null;
  };
}
