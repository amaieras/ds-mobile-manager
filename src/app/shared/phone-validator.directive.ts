import {FormControl} from '@angular/forms';

export function isValidPhoneNumber(input: FormControl) {
  const isValidPhoneFormat = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/.test(input.value);
  return isValidPhoneFormat ? null : {formatIsOk: true};
}


