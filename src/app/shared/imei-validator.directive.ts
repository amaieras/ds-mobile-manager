/** IMEI has exactly 14 digits */
import {AbstractControl, ValidatorFn} from "@angular/forms";

export function imeiValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenIMEI': {value: control.value}} : null;
  };
}
