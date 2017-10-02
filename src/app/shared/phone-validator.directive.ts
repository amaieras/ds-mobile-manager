import {FormControl} from "@angular/forms";

export function isOkPhoneFormat(input: FormControl) {
  const isOkPhoneFormat = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/.test(input.value);
  return isOkPhoneFormat ? null : {formatIsOk: true};
}
