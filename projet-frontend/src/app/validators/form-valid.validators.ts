import { FormControl, ValidationErrors } from '@angular/forms';

export class FormValidValidators {

 // whitespace validation
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {

    // check if string only contains whitespace
    if (control.value != null && control.value.trim().length === 0) {

      // invalid, return error object
      return { notOnlyWhitespace: true };
    }

    // valid, return null
    return null;
  }

  static noSpecialCharacters(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (value == null || value === '') return null;

    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;

    if (!regex.test(value)) {
      return { symbols: true };
    }

    return null;
  }
}